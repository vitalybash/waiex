from rest_framework import serializers
from .models import Skill, CustomUser


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'email',
            'avatar',
            'name',
            'surname',
            'age',
            'info',
            'reviews_count',
            'review_autor',
            'user_to',
            'card_autor',
        ]
