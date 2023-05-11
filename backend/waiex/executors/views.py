import json
import os
import django
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Skill, CustomUser, Reviews, Order, File
from .serializers import SkillSerializer, UserSerializer, ReviewSerializer, OrderSerializer, RegistrationSerializer, \
    LoginSerializer, FileSerializer

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

        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
