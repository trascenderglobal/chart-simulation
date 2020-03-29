from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import View

from rest_framework.views import APIView
from rest_framework.response import Response
import json


User = get_user_model()

class HomeView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'users/login.html', {"customers": 10})



def get_data(request, *args, **kwargs):
    with open('projects/project_test.json') as file:
        data = json.load(file)

    return JsonResponse(data) # http response
    


class ChartData(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        qs_count = User.objects.all().count()
        labels = ["Users", "Blue", "Yellow", "Green", "Purple", "Orange"]
        default_items = [qs_count, 23, 2, 3, 12, 2]
        data = {
                "labels": labels,
                "default": default_items,
        }
        return Response(data)

