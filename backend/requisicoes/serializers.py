from rest_framework import serializers
from .models import Requisicao
from estoque.serializers import LocalEstocagemSerializers
from usuarios.serializers import UsuarioSerializer


class RequisicaoReadSerializers(serializers.ModelSerializer):
    solicitante = UsuarioSerializer(read_only=True)
    local_origem = LocalEstocagemSerializers(read_only=True)
    local_destino = LocalEstocagemSerializers(read_only=True)
    observacao = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Requisicao
        fields = '__all__'
    
class RequisicaoWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Requisicao
        fields = '__all__'