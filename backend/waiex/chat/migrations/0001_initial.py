# Generated by Django 4.1.7 on 2023-05-09 16:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('history', models.CharField(max_length=5096, verbose_name='История общения')),
                ('first', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='Участник 1+', to=settings.AUTH_USER_MODEL)),
                ('second', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='Участник 2+', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
