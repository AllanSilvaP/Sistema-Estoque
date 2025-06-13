from rest_framework import serializers
from .models import Produto, Categoria, LocalEstocagem, Lote, Entrada, Saida

class CategoriaSerializes(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProdutoSerializers(serializers.ModelSerializer):
    categoria = CategoriaSerializes()
    ativo = serializers.BooleanField(default=True, required=False)
    class Meta:
        model = Produto
        fields = '__all__'
        
class LocalEstocagemSerializers(serializers.ModelSerializer):
    class Meta:
        model = LocalEstocagem
        fields = '__all__'
        
class LoteReadSerializers(serializers.ModelSerializer):
    produto = ProdutoSerializers()
    armazenado_em = LocalEstocagemSerializers()
    
    class Meta:
        model = Lote
        fields = '__all__'
        
class LoteWriteSerializers(serializers.ModelSerializer):
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
    