from rest_framework import viewsets
from .models import HistoricoMovimentacao
from .serializers import HistoricoMovimentacaoSerializers

class HistoricoMovimentacaoViewSet(viewsets.ModelViewSet):
    queryset = HistoricoMovimentacao.objects.all()
    serializer_class = HistoricoMovimentacaoSerializers


# Create your views here.
