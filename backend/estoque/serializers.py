from rest_framework import serializers
from .models import Produto, Categoria, LocalEstocagem, Lote, Entrada, Saida

class CategoriaSerializes(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProdutoSerializers(serializers.ModelSerializer):
    class Meta:
        ativo = serializers.BooleanField(default=True, required=False)
        model = Produto
        fields = '__all__'
        
class LocalEstocagemSerializers(serializers.ModelSerializer):
    class Meta:
        model = LocalEstocagem
        fields = '__all__'
        
class LoteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Lote
        fields = '__all__'
        
class EntradaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Entrada
        fields = '__all__'
        
class SaidaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Saida
        fields = '__all__'
    