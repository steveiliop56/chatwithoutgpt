from django.shortcuts import render, HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request, "ui/index.html")

def get_response(message):
    # Generate a response from the chatbot based on the user's message
    response = "Hello!"

    # Return the bot response
    return response


@csrf_exempt
def get_message(request):
    if request.method == 'POST':
        message = json.loads(request.body)['message']
        print(message)
        bot_message = get_response(message)
        return JsonResponse({'bot_message': bot_message})
    else:
        return JsonResponse({'error': 'Invalid request method'})
