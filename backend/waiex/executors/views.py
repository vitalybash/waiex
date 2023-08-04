import json
import os
import django

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponse
from django.urls import reverse
from django.views import View
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
import jwt
from rest_framework import viewsets, status, response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Skill, CustomUser, Reviews, Order, File
from .serializers import SkillSerializer, UserSerializer, ReviewSerializer, OrderSerializer, RegistrationSerializer, \
    LoginSerializer, FileSerializer, EmailVerificationSerializer
from .utils import Util

from .renders import UserJSONRenderer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_crazy_service.settings')
django.setup()


class SkillsViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer

    def get_queryset(self):
        queryset = Skill.objects.all()
        title = self.request.query_params.get('title')
        price = self.request.query_params.get('price')
        stack = self.request.query_params.get('stack')
        if title != None:
            queryset = queryset.filter(title__contains=title)  # фильтрация по наличию искомой фразы в названии услуги
        if stack != None:
            queryset = queryset.filter(stack__contains=stack)  # фильтрация по стеку услуги(временно только 1 значение)
        if price != None:
            price = tuple(map(int, price.split('-')))
            queryset = queryset.filter(
                price__range=price)  # фильтрация по диапазону цен(временно только 1 диапазон формата (min, max) )
        return queryset

    @action(methods=['get'], detail=True)
    def get_users_skills(self, request, pk=None):
        queryset = Skill.objects.filter(author=pk)
        serializer_class = SkillSerializer(queryset, many=True)
        return Response(serializer_class.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all()
        title = self.request.query_params.get('title')
        price = self.request.query_params.get('price')
        stack = self.request.query_params.get('stack')
        kind = self.request.query_params.get('kind')
        if title != None:
            queryset = queryset.filter(title__contains=title)  # фильтрация по наличию искомой фразы в названии заказа
        if stack != None:
            queryset = queryset.filter(stack__contains=stack)  # фильтрация по стеку услуги(временно только 1 значение)
        if price != None:
            price = tuple(map(int, price.split('-')))
            queryset = queryset.filter(
                price__range=price)  # фильтрация по диапазону цен(временно только 1 диапазон формата (min, max) )
        if kind != None:
            queryset = queryset.filter(kind__contains=kind)  # фильтрация по типу заказа
        return queryset

    @action(methods=['get'], detail=True)
    def get_users_order(self, request, pk=None):
        queryset = Order.objects.filter(customer=pk)
        serializer_class = OrderSerializer(queryset, many=True)
        return Response(serializer_class.data)


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class RegistrationAPIView(APIView):
    """
    Разрешить всем пользователям (аутентифицированным и нет) доступ к данному эндпоинту.
    """
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    renderer_classes = (UserJSONRenderer,)

    def post(self, request):
        user = request.data.get('user', {})

        # Паттерн создания сериализатора, валидации и сохранения - довольно
        # стандартный, и его можно часто увидеть в реальных проектах.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = serializer.data

        user_email = CustomUser.objects.get(email=user['email'])
        tokens = RefreshToken.for_user(user_email).access_token
        current_site = get_current_site(request).domain
        relative_link = reverse('email-verefy')
        absurl = 'htttp://' + current_site + relative_link + '?token' + str(tokens)
        email_body = 'Привет,' + user['username'] + 'нажми на эту ссылку для подтверждения почты' + absurl
        data = {'email_body': email_body, 'to_email': user['email'],
                'email_subject': 'Verify your email'}

        Util.send_email(data=data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class VerifyEmail(GenericAPIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, options={"verify_signature": False})
            print(payload)
            user = CustomUser.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return response.Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return response.Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return response.Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {})

        # Обратите внимание, что мы не вызываем метод save() сериализатора, как
        # делали это для регистрации. Дело в том, что в данном случае нам
        # нечего сохранять. Вместо этого, метод validate() делает все нужное.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
