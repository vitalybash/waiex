from django.contrib import admin
from .models import Reviews,Skill, CustomUser
class SkillAdmin(admin.ModelAdmin):
    list_display = ['id', 'title',]


class ReviewsAdmin(admin.ModelAdmin):
    list_display = ['id',]


admin.site.register(Skill, SkillAdmin)
admin.site.register(CustomUser)
admin.site.register(Reviews, ReviewsAdmin)
