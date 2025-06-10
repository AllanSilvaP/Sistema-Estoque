from rest_framework import serializers
from .models import HistoricoMovimentacao

class HistoricoMovimentacaoSerializers(serializers.ModelSerializer):
    class Meta:
        model = HistoricoMovimentacao
        fields = '__all__'