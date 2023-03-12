from rest_framework import viewsets
from .models import Skill, CustomUser
from .serializers import SkillSerializer, UserSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
