from django.db import models
from executors.models import CustomUser


class Chat(models.Model):
    first = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None, related_name='Участник 1+')
    second = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None, related_name='Участник 2+')

    history = models.CharField(max_length=5096, verbose_name='История общения')


class Message(models.Model):
    username = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "chat_message"
        ordering = ('timestamp',)
