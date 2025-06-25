from rest_framework import serializers
from .models import Produto, Categoria, LocalEstocagem, Lote, Entrada, Saida

class CategoriaSerializes(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProdutoReadSerializers(serializers.ModelSerializer):
    categoria = CategoriaSerializes()
    ativo = serializers.BooleanField(default=True, required=False)
    class Meta:
        model = Produto
        fields = '__all__'
        
class ProdutoWriteSerializers(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    class Meta:
        model = Produto
        fields = '__all__'
        
class LocalEstocagemSerializers(serializers.ModelSerializer):
    class Meta:
        model = LocalEstocagem
        fields = '__all__'
        
class LoteReadSerializers(serializers.ModelSerializer):
    produto = ProdutoReadSerializers()
    armazenado_em = LocalEstocagemSerializers()
    
    class Meta:
        model = Lote
        fields = '__all__'
        
class LoteWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Lote
        fields = '__all__'

class LoteResumoSerializer(serializers.ModelSerializer):
    produto = ProdutoReadSerializers()
    class Meta:
        model = Lote
        fields = ['id', 'numero_lote', 'produto']
        
class EntradaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Entrada
        fields = '__all__'
        
class SaidaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Saida
        fields = '__all__'
    