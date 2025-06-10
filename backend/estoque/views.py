from rest_framework import viewsets
from .models import Produto, Categoria, LocalEstocagem, Lote, Entrada, Saida
from .serializers import ProdutoSerializers, CategoriaSerializes, LocalEstocagemSerializers, LoteSerializers, EntradaSerializers, SaidaSerializers

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
    serializer_class = LoteSerializers
    
class EntradaViewSet(viewsets.ModelViewSet):
    queryset = Entrada.objects.all()
    serializer_class = EntradaSerializers
    
class SaidaViewSet(viewsets.ModelViewSet):
    queryset = Saida.objects.all()
    serializer_class = SaidaSerializers
    
