from django.contrib import admin
from django.conf.urls import url
from django.urls import path
from users import views

urlpatterns = [

    # Sección para usuarios
    # path('login', views.login),
    url(r'^login/$', views.login, name='login'),
    url(r'^welcome_back/$', views.welcome_back, name='welcome_back'),
    url(r'^welcome_student/$', views.welcome_back_student, name='welcome_back_student'),
    url(r'^select_chart/$', views.select_chart, name='select_chart'),
    url(r'^project_to_load/$', views.project_to_load, name='project_to_load'),
    url(r'^upload/$', views.upload, name='upload'),
    url(r'^select_chart_teacher/$', views.select_chart_teacher, name='select_chart_teacher'),   
    url(r'^chart_type/$', views.chart_type, name='chart_type'),
    url(r'^select_chart_column/$', views.select_chart_column, name='select_chart_column'),
    url(r'^upload_new_data/$', views.upload_new_data, name='upload_new_data'),
    url(r'^dependent_variable/$', views.dependent_variable, name='dependent_variable'), 
    url(r'^set_chart/$', views.set_chart, name='set_chart'),  
    url(r'^modify_variable/$', views.modify_variable, name='modify_variable'),  
    url(r'^solve_equation/$', views.solve_equation, name='solve_equation'), 
    url(r'^recalculate/$', views.recalculate, name='recalculate'), 
    url(r'^calc_keeping_metric/$', views.calc_keeping_metric, name='calc_keeping_metric'), 
]
