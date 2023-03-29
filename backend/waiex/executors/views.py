import json
import os
import django
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Skill, CustomUser, Reviews, Order
from .serializers import SkillSerializer, UserSerializer, ReviewSerializer, OrderSerializer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_crazy_service.settings')
django.setup()


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    @action(methods=['get'], detail=True, url_path='user_skill')
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

    @action(methods=['get'], detail=False, url_path='order')
    def abc(self, request, ):
        a = str(request).split('/')[-1][1:-2]
        return Response(a)

