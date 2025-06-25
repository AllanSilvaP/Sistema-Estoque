from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, DjangoModelPermissions
from datetime import date
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Lote
from collections import defaultdict
from django.core.exceptions import PermissionDenied
from .models import Requisicao, ItemRequisicao
from .serializers import RequisicaoReadSerializers, RequisicaoWriteSerializers, ItemRequisicaoReadSerializers, ItemRequisicaoWriteSerializers

class RequisicaoViewSet(viewsets.ModelViewSet):
    queryset = Requisicao.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]
    
    def get_serializer_class(self):
        if (self.request.method in ['POST','PUT','PATCH']):
            return RequisicaoWriteSerializers
        else:
            return RequisicaoReadSerializers
        
    def perform_create(self, serializer):
        usuario = self.request.user
        if not usuario.groups.filter(name__in=["Operador Local", "Admin", "Gerente Local"]).exists():
            raise PermissionDenied("Você não tem permissão para criar requisições.")
        serializer.save(solicitante=usuario, status='Pendente', data_requisicao=date.today())

    def perform_update(self, serializer):
        usuario = self.request.user
        nova_status = self.request.data.get('status')

        if nova_status in ['Aprovada', 'Recusada']:
            if not usuario.groups.filter(name__in=["Admin", "Gerente Local"]).exists():
                raise PermissionDenied("Você não tem permissão para aprovar ou recusar requisições.")
        
        serializer.save()
    
class ItemRequisicaoViewSet(viewsets.ModelViewSet):
    queryset = ItemRequisicao.objects.all()
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def get_serializer_class(self):
        if (self.request.method in ['POST','PUT','PATCH']):
            return ItemRequisicaoWriteSerializers
        else:
            return ItemRequisicaoReadSerializers
        
class ProdutosEmEstoqueAPIView(APIView):
    def get(self, request):
        lotes = Lote.objects.select_related('produto', 'produto__categoria').all()

        agrupado = defaultdict(lambda: {
            'nome': '',
            'descricao': '',
            'fabricante': '',
            'categoria': '',
            'temperatura': '',
            'quantidade_total': 0,
            'validade': None,  # mais próxima
        })

        for lote in lotes:
            produto = lote.produto
            key = produto.id

            item = agrupado[key]
            item['nome'] = produto.nome
            item['descricao'] = produto.descricao
            item['fabricante'] = produto.fabricante
            item['categoria'] = produto.categoria.nome
            item['temperatura'] = produto.temperatura_armazenamento
            item['quantidade_total'] += lote.quantidade_disponivel

            # menor validade entre os lotes do produto
            if item['validade'] is None or lote.data_validade < item['validade']:
                item['validade'] = lote.data_validade

        return Response(list(agrupado.values()))
