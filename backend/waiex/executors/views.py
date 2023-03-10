from rest_framework import viewsets
from .models import Skill
from .serializers import SkillSerializer


class SkillsViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
