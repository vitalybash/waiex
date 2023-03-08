from django.db import models


class Skill(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    owner = models.CharField(max_length=255)  # ID исполнителя, которому принадлежит данная карточка умений
    stack = models.CharField(max_length=255)  # Список технологий, которые представлены в данной карточке
