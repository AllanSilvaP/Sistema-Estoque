from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from estoque.serializers import LocalEstocagemSerializers
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioCreateView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name="Admin").exists():
            return Usuario.objects.all()
        elif user.groups.filter(name="Gerenciador Local").exists():
            return Usuario.objects.filter(local=user.local)
        elif user.groups.filter(name__in=["Auditor", "Operador Local"]).exists():
            return Usuario.objects.filter(id=user.id)
        return Usuario.objects.none()
    
class UsuarioMeView(APIView):
    permission_classes = [IsAuthenticated]
    local = LocalEstocagemSerializers(read_only=True)

    def get(self, request):
        usuario = request.user
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)