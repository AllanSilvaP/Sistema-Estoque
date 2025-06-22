from rest_framework import viewsets
from .models import Requisicao, ItemRequisicao
from .serializers import RequisicaoReadSerializers, RequisicaoWriteSerializers, ItemRequisicaoSerializers

class RequisicaoViewSet(viewsets.ModelViewSet):
    queryset = Requisicao.objects.all()
    
    def get_serializer_class(self):
        if (self.request.method in ['POST','PUT','PATCH']):
            return RequisicaoWriteSerializers
        else:
            return RequisicaoReadSerializers
    
class ItemRequisicaoViewSet(viewsets.ModelViewSet):
    queryset = ItemRequisicao.objects.all()
    serializer_class = ItemRequisicaoSerializers
