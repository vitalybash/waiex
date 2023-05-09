from django.shortcuts import render
import json
import os
import django
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Chat
from .serializers import ChatSerializer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_crazy_service.settings')
django.setup()


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    @action(methods=['post'], detail=True, url_path='new_msg')
    def get_users_skills(self, request, pk=None):
        queryset = Chat.objects.filter(customer=pk)
        serializer_class = ChatSerializer(queryset, many=True)
        return Response(serializer_class.data)
