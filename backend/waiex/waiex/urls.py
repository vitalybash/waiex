"""waiex URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from executors.views import SkillsViewSet, UserViewSet, ReviewViewSet, OrderViewSet, RegistrationAPIView
from chat.views import ChatViewSet

router = routers.DefaultRouter()
router.register(r'skills', SkillsViewSet, 'foobar-detail')
router.register(r'user', UserViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'orders', OrderViewSet, 'foobar-detail')
router.register(r'chat', ChatViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('orders/<int:pk>/user_order/', OrderViewSet.as_view({'get': 'get_users_order'})),
    path('skills/<int:pk>/user_skill/', SkillsViewSet.as_view({'get': 'get_users_skills'})),
    path('registration/', include('executors.urls', namespace='authentication')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += router.urls
