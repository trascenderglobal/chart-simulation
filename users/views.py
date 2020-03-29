from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login as do_login
from django.contrib.auth import logout as do_logout
from sympy import Symbol, solve
from django.http import JsonResponse
import json


def welcome(request):
    if request.user.is_authenticated:
        return render(request, "users/welcome.html")
    return redirect('/login')


def register(request):
    form = UserCreationForm()
    if request.method == "POST":
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            if user is not None:
                do_login(request, user)
                return redirect('/')
    form.fields['username'].help_text = None
    form.fields['password1'].help_text = None
    form.fields['password2'].help_text = None
    return render(request, "users/register.html", {'form': form})


def logout(request):
    do_logout(request)
    return redirect('/')

def login(request):
    return render( request,"users/login.html")

def welcome_back(request):
        return render(request, "users/welcome_back.html")

def welcome_back_student(request):
        return render(request, "users/welcome_back_student.html")
def select_chart(request):
        return render(request, "users/select_chart.html")
def project_to_load(request):
        return render(request, "users/project_to_load.html")
def upload(request):
            return render(request, "users/upload.html")
def select_chart_teacher(request):
        return render(request, "users/select_chart_teacher.html",)
def chart_type(request):
        return render(request, "users/chart_type.html")
def select_chart_column(request):
        return render(request, "users/select_chart_column.html")
def upload_new_data(request):
        return render(request, "users/upload_new_data.html")
def dependent_variable(request):
        return render(request, "users/dependent_variable.html")
def set_chart(request):
        return render(request, "users/set_chart.html")
def modify_variable(request):
        return render(request, "users/modify_variable.html")


def solve_equation(request):

        x = Symbol('x')
        aux_array = {}
        cont = 0
        operations = json.loads(request.GET['operations'])
        matrix = json.loads(request.GET['matrix'])
        number_dp = request.GET['number_dp']
        
        print(number_dp)
        
        for opr in operations:                
                cont = cont + 1
                aux_array.update({
                        opr[2] : str(solve(opr[1]))                        
                })                                
                matrix.update({
                        opr[0] : aux_array
                })
                print(cont)
                if int(number_dp) == cont:
                        aux_array = {}
                        cont = 0
        
        data = {
                'matrix': matrix   
        }        
        
        return JsonResponse(data)

def recalculate(request):
        x = Symbol('x')
        operations = json.loads(request.GET['operations'])
        matrix = json.loads(request.GET['matrix'])

        for opr in operations:
                matrix[opr[0]][opr[2]] = str(solve(opr[1]))
                
        data = {
                'matrix': matrix   
        }        
        
        return JsonResponse(data)

def calc_keeping_metric(request):

        operations = json.loads(request.GET['operations'])
        matrix = json.loads(request.GET['matrix'])

        for opr in operations:
                
                for var in opr[3]:
                        opr[1] = opr[1].replace(var,str(matrix[var][opr[2]]), 1)

                matrix[opr[0]][opr[2]] = str(solve(opr[1])).replace('[','').replace(']','')
                
        data = {
                'matrix': matrix   
        }        
        
        return JsonResponse(data)

