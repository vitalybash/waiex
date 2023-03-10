from django.db import models


class Executor(models.Model):  # Модель исполнителя
    avatar = models.ImageField(upload_to='avatar', verbose_name='аватар пользователя')
    name = models.CharField(max_length=256, verbose_name='Имя исполнителя')
    surname = models.CharField(max_length=256, verbose_name='Фамилия исполнителя')
    age = models.IntegerField(default=0, verbose_name='Возраст исполнителя')
    skills = models.ForeignKey('Skill', on_delete=models.CASCADE, verbose_name='Навыки исполнителя',
                               related_name='skill')
    info = models.CharField(max_length=1024, verbose_name='Общая информация о исполнителе')
    reviews = models.ForeignKey('Reviews', on_delete=models.CASCADE, related_name='review',
                                verbose_name='Отзывы исполнителя', blank=True)
    reviews_count = models.IntegerField(default=0, verbose_name='Кол-во отзывов')

    def rating(self):
        """Функция подсчета рейтинга"""
        queryset = self.reviews.all().aggregate(
            rating=round(models.Sum('estimation') / self.reviews_count, 1))
        return float(queryset["rating"])


class Reviews(models.Model):  # Модель отзывов
    author = models.OneToOneField('Заказчик', on_delete=models.CASCADE, related_name='authors',
                                  verbose_name='Автор отзыва')
    text = models.CharField(max_length=5096, verbose_name='Текст отзыва')
    estimation = models.IntegerField(default=0, verbose_name='Оценка')


class Skill(models.Model):  # Модель услуг
    image = models.ImageField(upload_to='image', verbose_name='фотография услуги')
    title = models.CharField(max_length=256, verbose_name='Заголовок услуги')
    description = models.TextField(max_length=1024, verbose_name='Описание услуги')
    stack = models.CharField(max_length=512, verbose_name='Стек технологии')
    price = models.IntegerField(default=None, verbose_name='Цена услуги')
