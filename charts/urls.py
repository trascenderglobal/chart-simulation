from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
import users.views

from .views import HomeView, get_data, ChartData
from rest_framework.authtoken import views
from django.conf.urls.static import static


urlpatterns = [    
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^api/data/$', get_data, name='api-data'),
    url(r'^api/chart/data/$', ChartData.as_view()),
    url(r'^admin/', admin.site.urls),
] 

urlpatterns += [
    url(r'^api/auth', include('rest_framework.urls', namespace='rest_framework') ),
    url(r'^api/', include('chartapp.urls',) ),
    url(r'^api/', include('users.urls',) ),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
