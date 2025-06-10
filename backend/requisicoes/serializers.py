from rest_framework import serializers
from .models import Requisicao

class RequisicaoSerializers(serializers.ModelSerializer):
    class Meta:
        observacao = serializers.CharField(required=False, allow_blank=True)
        model = Requisicao
        fields = '__all__'