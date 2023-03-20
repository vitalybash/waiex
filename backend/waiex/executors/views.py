from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Skill, CustomUser, Reviews
from .serializers import SkillSerializer, UserSerializer, ReviewSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    @action(methods=['GET'])
    def get_users_skills(self, request, pk=None):
        return Skill.objects.filter(autor=pk)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewSerializer

