from django.shortcuts import render, HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request, "ui/index.html")

@csrf_exempt
def get_message(request):
    session_id = request.GET.get('session_id', '')
    text = request.GET.get('text', '')
    message = "Hello, you sent a GET request with session id {} and text {}".format(session_id, text)
    data = {
        'message': message
    }
    return JsonResponse(data)