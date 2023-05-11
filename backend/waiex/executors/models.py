from django.db import models
import jwt
from django.contrib.auth.models import PermissionsMixin
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from executors.managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(default='', verbose_name='Почта пользователя', unique=True)
    password = models.CharField(default='', max_length=1024)
    avatar = models.ImageField(upload_to='avatar', verbose_name='аватар пользователя')
    username = models.CharField(max_length=256, default='', verbose_name='Короткое имя исполнителя')
    name = models.CharField(max_length=256, default='', verbose_name='Имя исполнителя')
    surname = models.CharField(max_length=256, default='', verbose_name='Фамилия исполнителя')
    age = models.IntegerField(default=0, verbose_name='Возраст исполнителя')
    info = models.CharField(max_length=1024, default='', verbose_name='Общая информация о исполнителе')
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

    def __str__(self):
        """ Строковое представление модели (отображается в консоли) """
        return self.email

    @property
    def token(self):
        """
        Позволяет получить токен пользователя путем вызова user.token, вместо
        user._generate_jwt_token(). Декоратор @property выше делает это
        возможным. token называется "динамическим свойством".
        """
        return self._generate_jwt_token()

    def get_full_name(self):
        """
        Этот метод требуется Django для таких вещей, как обработка электронной
        почты. Обычно это имя фамилия пользователя, но поскольку мы не
        используем их, будем возвращать username.
        """
        return self.username

    def get_short_name(self):
        """ Аналогично методу get_full_name(). """
        return self.username

    def _generate_jwt_token(self):
        """
        Генерирует веб-токен JSON, в котором хранится идентификатор этого
        пользователя, срок действия токена составляет 1 день от создания
        """
        dt = datetime.now() + timedelta(days=1)
        # return dt.strftime('%s')
        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.strftime('%S'))
        }, settings.SECRET_KEY, algorithm='HS256')
        return token


class Reviews(models.Model):  # Модель отзывов
    user_from = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.CASCADE, related_name='review_author',
                                  verbose_name='Автор отзыва')
    user_to = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.CASCADE, related_name='user_to',
                                   verbose_name='Адресат отзыва')
    text = models.CharField(max_length=5096, verbose_name='Текст отзыва')
    estimation = models.IntegerField(default=0, verbose_name='Оценка')


class Skill(models.Model):  # Модель услуг
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='card_author',
                              verbose_name='Автор карточки')
    image = models.ImageField(upload_to='image', verbose_name='фотография услуги')
    title = models.CharField(max_length=256, verbose_name='Заголовок услуги')
    description = models.TextField(max_length=1024, verbose_name='Описание услуги')
    stack = models.CharField(max_length=512, verbose_name='Стек технологии')
    price = models.IntegerField(default=0, verbose_name='Цена услуги')

class File(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='files/order')

class Order(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None, related_name='order_customer')
    executor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None, related_name='order_executor')

    title = models.CharField(max_length=256, verbose_name='Заголовок заказа')
    description = models.TextField(max_length=1024, verbose_name='Описание заказа')
    kind = models.CharField(max_length=256, blank=True ,verbose_name='Тип заказа')  # тип это тг бот/сайт/игра/скрипт и др.
    # заполняется нейронкой

    stack = models.CharField(max_length=512, blank=True, verbose_name='Стек технологии')
    price = models.IntegerField(default=0, blank=True, verbose_name='Цена услуги')
    deadline = models.CharField(max_length=64 ,default='Не указано', null=True, verbose_name='Срок выполнения заказа')
    status = models.CharField(max_length=32, default='Создан', verbose_name='Статус заказа')  # создан/в работе/завершен/истек срок
    file = models.FileField(upload_to='files/order', blank=True)



class UserManager(BaseUserManager):
    """
    Django требует, чтобы кастомные пользователи определяли свой собственный
    класс Manager. Унаследовавшись от BaseUserManager, мы получаем много того
    же самого кода, который Django использовал для создания User (для демонстрации).
    """

    def create_user(self, username, email, password=None):
        """ Создает и возвращает пользователя с имэйлом, паролем и именем. """
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        """ Создает и возввращет пользователя с привилегиями суперадмина. """
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
