from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Room, Topic, Message
from .forms import RoomForm
from .serializer import RoomSerializer, TopicSerializer, MessageSerializer, UserSerializer

# Create your views here.


@api_view(['GET', 'PUT', 'POST'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/room/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a specific room'
        },
        {
            'Endpoint': '/profile/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a specific profile'
        },
        {
            'Endpoint': '/create-room/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates a room'
        },
    ]

    return Response(routes)


@api_view(['GET', 'POST'])
def loginPage(request):
    page = 'login'
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'User does not exist')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Username or password does not exist')

    context = {'page': page}
    return render(request, 'base/login_register.html', context)


def logOutUser(request):
    logout(request)
    return redirect('home')


@api_view(['GET', 'POST'])
def registerUser(request):
    form = UserCreationForm()

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'An error occurred during registration')

    return render(request, 'base/login_register.html', {'form': form})


@api_view(['GET', 'POST'])
def home(request):
    q = request.GET.get('q') if request.GET.get('q') != None else ''

    # i makes the filter case insensible
    rooms = Room.objects.filter(
        Q(topic__name__icontains=q) |
        Q(name__icontains=q) |
        Q(description__icontains=q)
    )

    topics = Topic.objects.all()
    room_count = rooms.count()
    room_messages = Message.objects.filter(Q(room__topic__name__icontains=q))

    room_serializer = RoomSerializer(rooms, many=True)
    topic_serializer = TopicSerializer(topics, many=True)
    message_serializer = MessageSerializer(room_messages, many=True)

    context = {'rooms': room_serializer.data, 'topics': topic_serializer.data,
               'room_count': room_count, 'room_messages': message_serializer.data}

    # return render(request, 'base/home.html', context)
    return Response(context)


@api_view(['GET', 'POST'])
def room(request, pk):
    room = Room.objects.get(id=pk)
    room_messages = room.message_set.all().order_by('-created')
    participants = room.participants.all()

    if request.method == 'POST':
        room_messages = Message.objects.create(
            user=request.user,
            room=room,
            body=request.POST.get('body'),
        )
        room.participants.add(request.user)
        return redirect('room', pk=room.id)

    room_serializer = RoomSerializer(room)
    message_serializer = MessageSerializer(room_messages, many=True)
    participant_serializer = UserSerializer(participants, many=True)

    # 'room' : room

    context = {'room': room_serializer.data, 'room_messages': message_serializer.data,
               'participants': participant_serializer.data}
    # return render(request, 'base/room.html', context)
    return Response(context)


@api_view(['GET'])
def userProfile(request, pk):
    user = User.objects.get(id=pk)
    rooms = user.room_set.all()
    room_messages = user.message_set.all()
    topics = Topic.objects.all()

    user_serializer = UserSerializer(user)
    room_serializer = RoomSerializer(rooms, many=True)
    message_serializer = MessageSerializer(room_messages, many=True)
    topic_serializer = TopicSerializer(topics, many=True)

    context = {'user': user_serializer.data, 'rooms': room_serializer.data,
               'room_messages': message_serializer.data, 'topics': topic_serializer.data}
    return Response(context)


@api_view(['GET', 'POST'])
@login_required(login_url='/login')
def createRoom(request):
    form = RoomForm()
    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            room = form.save(commit=False)
            room.host = request.user
            room.save()
            room.participants.add(request.user)
            return redirect('home')

    context = {'roomform': form}
    return render(request, 'base/room_form.html', context)


@api_view(['GET', 'POST'])
@login_required(login_url='/login')
def updateRoom(request, pk):
    room = Room.objects.get(id=pk)
    if request.user != room.host:
        return HttpResponse('You are not allowed here')

    form = RoomForm(instance=room)
    if request.method == 'POST':
        form = RoomForm(request.POST, instance=room)
        if form.is_valid:
            form.save()
            return redirect('home')

    context = {'roomform': form}
    return render(request, 'base/room_form.html', context)


@api_view(['GET', 'POST'])
@login_required(login_url='/login')
def deleteRoom(request, pk):
    room = Room.objects.get(id=pk)
    if request.user != room.host:
        return HttpResponse('You are not allowed here')

    if request.method == 'POST':
        room.delete()
        return redirect('home')
    return render(request, 'base/delete.html', {'obj': room})


@api_view(['GET', 'POST'])
@login_required(login_url='/login')
def deleteMessage(request, pk):
    message = Message.objects.get(id=pk)
    if request.user != message.user:
        return HttpResponse('You are not allowed here')

    if request.method == 'POST':
        message.delete()
        return redirect('home')
    return render(request, 'base/delete.html', {'obj': room})
