from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('p/<path:link>/', views.p, name='p'),
    path('g/', views.g)
]