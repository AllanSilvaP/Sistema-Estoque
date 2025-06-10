from rest_framework import viewsets
from .models import Requisicao
from .serializers import RequisicaoSerializers

class RequisicaoViewSet(viewsets.ModelViewSet):
    queryset = Requisicao.objects.all()
    serializer_class = RequisicaoSerializers 

# Create your views here.
