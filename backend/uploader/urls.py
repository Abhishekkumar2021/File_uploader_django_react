from django.urls import path
from . import views

urlpatterns = [
    path('files/', views.FileView.as_view(), name= 'files_list'),
]