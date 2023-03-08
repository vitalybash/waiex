from django.db import models
# from ..skills.models import Skill


class Executor(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    skills = models.CharField(max_length=255)