# Generated by Django 4.1.7 on 2023-05-17 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('history', models.CharField(max_length=5096, verbose_name='История общения')),
            ],
        ),
    ]
