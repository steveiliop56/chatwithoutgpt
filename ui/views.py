from django.shortcuts import render, HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from colorama import Fore

# Create your views here.

com = "manual" # could also be discord for discord backend.

def index(request):
    return render(request, "ui/index.html")

def manual(text, session_id):
    print(Fore.GREEN + f"Received message {text} with session id {session_id}!")
    message = input(Fore.BLUE + "Please enter what you want to respond: " + Fore.RESET)
    return message

@csrf_exempt
def get_message(request):
    global com
    session_id = request.GET.get('session_id', '')
    text = request.GET.get('text', '')
    if com == "manual":
        message = manual(text, session_id)
    else:
        pass
    data = {
        'message': message
    }
    return JsonResponse(data)