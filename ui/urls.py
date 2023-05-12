from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_message/', views.get_message, name='index'),
]
