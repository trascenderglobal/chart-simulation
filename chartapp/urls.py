from django.conf.urls import url
from chartapp.views import *

urlpatterns = [
    url(r'^projects/$', ProjectList.as_view(), name='projects'),
]