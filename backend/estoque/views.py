from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Produto, Categoria, LocalEstocagem, Lote, Entrada, Saida
from .serializers import ProdutoSerializers, CategoriaSerializes, LocalEstocagemSerializers, LoteWriteSerializers, LoteReadSerializers, EntradaSerializers, SaidaSerializers

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializes
class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializers
    
class LocalEstocagemViewSet(viewsets.ModelViewSet):
    queryset = LocalEstocagem.objects.all()
    serializer_class = LocalEstocagemSerializers
    
class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all()
    
    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return LoteWriteSerializers
        return LoteReadSerializers
    
class EntradaViewSet(viewsets.ModelViewSet):
    queryset = Entrada.objects.all()
    serializer_class = EntradaSerializers
    
class SaidaViewSet(viewsets.ModelViewSet):
    queryset = Saida.objects.all()
    serializer_class = SaidaSerializers
    
