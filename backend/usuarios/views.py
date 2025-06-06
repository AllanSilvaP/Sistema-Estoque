from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Usuario, Grupo
from .serializers import UsuarioSerializer, GrupoSerializer

class UsuarioCreateView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class GrupoViewSet(viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer
