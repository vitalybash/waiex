# Generated by Django 4.1.7 on 2023-05-17 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('executors', '0005_delete_file'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=128)),
                ('file', models.FileField(upload_to='files/order')),
            ],
        ),
        migrations.RemoveField(
            model_name='order',
            name='file',
        ),
        migrations.AddField(
            model_name='order',
            name='file',
            field=models.ManyToManyField(blank=True, to='executors.file'),
        ),
    ]
