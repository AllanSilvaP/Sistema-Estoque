from rest_framework import viewsets
from .models import Requisicao
from .serializers import RequisicaoReadSerializers, RequisicaoWriteSerializers

class RequisicaoViewSet(viewsets.ModelViewSet):
    queryset = Requisicao.objects.all()
    
    def get_serializer_class(self):
        if (self.request.method in ['POST','PUT','PATCH']):
            return RequisicaoWriteSerializers
        else:
            return RequisicaoReadSerializers
    

# Create your views here.
