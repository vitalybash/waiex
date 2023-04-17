import json
import os
import django
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Skill, CustomUser, Reviews, Order
from .serializers import SkillSerializer, UserSerializer, ReviewSerializer, OrderSerializer, RegistrationSerializer

from .renders import UserJSONRenderer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_crazy_service.settings')
django.setup()


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

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
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    
    @action(methods=['get'], detail=True)
    def get_users_order(self, request, pk=None):
        queryset = Order.objects.filter(customer=pk)
        serializer_class = OrderSerializer(queryset, many=True)
        return Response(serializer_class.data)


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