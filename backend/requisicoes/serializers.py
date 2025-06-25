from rest_framework import serializers
from .models import Requisicao, ItemRequisicao
from estoque.serializers import LocalEstocagemSerializers, LoteResumoSerializer
from usuarios.serializers import UsuarioSerializer

class ItemRequisicaoReadSerializers(serializers.ModelSerializer):
    lote = LoteResumoSerializer(read_only=True)
    
    class Meta:
        model = ItemRequisicao
        fields = ['lote', 'quantidade']


class ItemRequisicaoWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = ItemRequisicao
        fields = ['lote', 'quantidade']



class RequisicaoReadSerializers(serializers.ModelSerializer):
    solicitante = UsuarioSerializer(read_only=True)
    local_origem = LocalEstocagemSerializers(read_only=True)
    local_destino = LocalEstocagemSerializers(read_only=True)
    itens = ItemRequisicaoReadSerializers(many=True, read_only=True)
    observacao = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = Requisicao
        fields = '__all__'
    
class RequisicaoWriteSerializers(serializers.ModelSerializer):
    itens = ItemRequisicaoWriteSerializers(many=True)

    class Meta:
        model = Requisicao
        fields = '__all__'

    def create(self, validated_data):
        itens_data = validated_data.pop('itens', [])
        requisicao = Requisicao.objects.create(**validated_data)

        for item_data in itens_data:
            ItemRequisicao.objects.create(requisicao=requisicao, **item_data)

        return requisicao

    def update(self, instance, validated_data):
        itens_data = validated_data.pop('itens', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if itens_data is not None:
            instance.itens.all().delete()
            for item_data in itens_data:
                ItemRequisicao.objects.create(requisicao=instance, **item_data)

        return instance
