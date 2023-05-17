# Generated by Django 4.1.7 on 2023-06-03 13:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(default='', max_length=254, unique=True, verbose_name='Почта пользователя')),
                ('password', models.CharField(default='', max_length=1024)),
                ('avatar', models.ImageField(upload_to='avatar', verbose_name='аватар пользователя')),
                ('username', models.CharField(default='', max_length=256, verbose_name='Короткое имя исполнителя')),
                ('name', models.CharField(default='', max_length=256, verbose_name='Имя исполнителя')),
                ('surname', models.CharField(default='', max_length=256, verbose_name='Фамилия исполнителя')),
                ('age', models.IntegerField(default=0, verbose_name='Возраст исполнителя')),
                ('info', models.CharField(default='', max_length=1024, verbose_name='Общая информация о исполнителе')),
                ('reviews_count', models.IntegerField(default=0, verbose_name='Кол-во отзывов')),
                ('is_active', models.BooleanField(default=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=128)),
                ('file', models.FileField(upload_to='files/order')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='image', verbose_name='фотография услуги')),
                ('title', models.CharField(max_length=256, verbose_name='Заголовок услуги')),
                ('description', models.TextField(max_length=1024, verbose_name='Описание услуги')),
                ('stack', models.CharField(max_length=512, verbose_name='Стек технологии')),
                ('price', models.IntegerField(default=0, verbose_name='Цена услуги')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='card_author', to=settings.AUTH_USER_MODEL, verbose_name='Автор карточки')),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=5096, verbose_name='Текст отзыва')),
                ('estimation', models.IntegerField(default=0, verbose_name='Оценка')),
                ('user_from', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='review_author', to=settings.AUTH_USER_MODEL, verbose_name='Автор отзыва')),
                ('user_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_to', to=settings.AUTH_USER_MODEL, verbose_name='Адресат отзыва')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, verbose_name='Заголовок заказа')),
                ('description', models.TextField(max_length=1024, verbose_name='Описание заказа')),
                ('kind', models.CharField(blank=True, max_length=256, null=True, verbose_name='Тип заказа')),
                ('stack', models.CharField(blank=True, max_length=512, null=True, verbose_name='Стек технологии')),
                ('price', models.IntegerField(blank=True, default=0, null=True, verbose_name='Цена услуги')),
                ('deadline', models.CharField(blank=True, default='Не указано', max_length=64, null=True, verbose_name='Срок выполнения заказа')),
                ('status', models.CharField(default='Создан', max_length=32, verbose_name='Статус заказа')),
                ('customer', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='order_customer', to=settings.AUTH_USER_MODEL)),
                ('executor', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_executor', to=settings.AUTH_USER_MODEL)),
                ('file', models.ManyToManyField(blank=True, null=True, to='executors.file')),
            ],
        ),
    ]
