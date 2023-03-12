from django.contrib import admin
from .models import Executor, Reviews,Skill

class SkillAdmin(admin.ModelAdmin):
    list_display = ['id', 'title',]


class ExecutorAdmin(admin.ModelAdmin):
    list_display = ['id', 'name',]


class ReviewsAdmin(admin.ModelAdmin):
    list_display = ['id',]


admin.site.register(Skill, SkillAdmin)
admin.site.register(Executor, ExecutorAdmin)
admin.site.register(Reviews, ReviewsAdmin)
