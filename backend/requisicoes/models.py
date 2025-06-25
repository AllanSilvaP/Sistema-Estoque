from django.db import models
from usuarios.models import Usuario
from estoque.models import LocalEstocagem, Lote
# Create your models here.

class Requisicao(models.Model):

    STATUS_CHOICES = [
        ("Pendente", "Pendente"),
        ("Aprovada", "Aprovada"),
        ("Recusada", "Recusada"),
    ]

    solicitante = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    local_origem = models.ForeignKey(LocalEstocagem, on_delete=models.PROTECT, related_name='requisicoes_origem')
    local_destino = models.ForeignKey(LocalEstocagem, on_delete=models.PROTECT, related_name='requisicoes_destino')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Pendente")
    data_requisicao = models.DateField()
    observacao = models.TextField(blank=True)
    
    def __str__(self):
        return f'Requisição #{self.id} - {self.status}'
    
class ItemRequisicao(models.Model):
    requisicao = models.ForeignKey(Requisicao, on_delete=models.CASCADE, related_name='itens')
    lote = models.ForeignKey(Lote, on_delete=models.PROTECT)
    quantidade = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantidade} unidades de {self.lote.produto.nome} (Lote: {self.lote.numero_lote})"