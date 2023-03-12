from rest_framework import serializers
from .models import Skill, CustomUser


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = [
            'id',
            'image',
            'title',
            'description',
            'stack',
            'price',
            'skill',
        ]

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = "__all__"
