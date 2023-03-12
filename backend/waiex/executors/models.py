from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser

from executors.managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(default='', verbose_name='Почта пользователя', unique=True)
    password = models.CharField(default='', max_length=1024)
    avatar = models.ImageField(upload_to='avatar', verbose_name='аватар пользователя')
    name = models.CharField(max_length=256, default='', verbose_name='Имя исполнителя')
    surname = models.CharField(max_length=256, default='', verbose_name='Фамилия исполнителя')
    skills = models.ForeignKey('Skill', blank=True, null=True ,on_delete=models.CASCADE, verbose_name='карточка',
                               related_name='skill')
    age = models.IntegerField(default=0, verbose_name='Возраст исполнителя')
    info = models.CharField(max_length=1024, default='', verbose_name='Общая информация о исполнителе')
    reviews = models.ForeignKey('Reviews', on_delete=models.CASCADE, null=True, related_name='review',
                                verbose_name='Отзывы исполнителя', blank=True)
    reviews_count = models.IntegerField(default=0, verbose_name='Кол-во отзывов')
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'password']

    def rating(self):
        """Функция подсчета рейтинга"""
        queryset = self.reviews.objects.all().aggregate(
            rating=round(models.Sum('estimation') / self.reviews_count, 1))
        return float(queryset["rating"])


class Reviews(models.Model):  # Модель отзывов
    """author = models.OneToOneField('Заказчик', on_delete=models.CASCADE, related_name='authors',
                                  verbose_name='Автор отзыва')"""
    text = models.CharField(max_length=5096, verbose_name='Текст отзыва')
    estimation = models.IntegerField(default=0, verbose_name='Оценка')


class Skill(models.Model):  # Модель услуг
    image = models.ImageField(upload_to='image', verbose_name='фотография услуги')
    title = models.CharField(max_length=256, verbose_name='Заголовок услуги')
    description = models.TextField(max_length=1024, verbose_name='Описание услуги')
    stack = models.CharField(max_length=512, verbose_name='Стек технологии')
    price = models.IntegerField(default=0, verbose_name='Цена услуги')


