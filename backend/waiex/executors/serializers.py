from rest_framework import serializers
from .models import Skill, CustomUser, Reviews, Order


class SkillSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
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
            'review_author',
            'user_to',
            'card_author',
        ]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    file = serializers.FileField(max_length=None, use_url=True)
    class Meta:
        model = Order
        fields = "__all__"
