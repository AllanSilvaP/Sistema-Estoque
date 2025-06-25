from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated
from .models import Produto, Categoria, LocalEstocagem, Lote, Entrada, Saida
from .serializers import ProdutoWriteSerializers, ProdutoReadSerializers, CategoriaSerializes, LocalEstocagemSerializers, LoteWriteSerializers, LoteReadSerializers, EntradaSerializers, SaidaSerializers

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    serializer_class = CategoriaSerializes

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return ProdutoWriteSerializers
        return ProdutoReadSerializers
    
class LocalEstocagemViewSet(viewsets.ModelViewSet):
    queryset = LocalEstocagem.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    serializer_class = LocalEstocagemSerializers
    
class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return LoteWriteSerializers
        return LoteReadSerializers
    
class EntradaViewSet(viewsets.ModelViewSet):
    queryset = Entrada.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    serializer_class = EntradaSerializers
    
class SaidaViewSet(viewsets.ModelViewSet):
    queryset = Saida.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    serializer_class = SaidaSerializers
    
