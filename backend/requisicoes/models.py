from django.db import models
from usuarios.models import Usuario
from estoque.models import LocalEstocagem
# Create your models here.

class Requisicao(models.Model):
    solicitante = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    local_origem = models.ForeignKey(LocalEstocagem, on_delete=models.PROTECT, related_name='requisicoes_origem')
    local_destino = models.ForeignKey(LocalEstocagem, on_delete=models.PROTECT, related_name='requisicoes_destino')
    status = models.CharField(max_length=50)
    data_requisicao = models.DateField()
    observacao = models.TextField(blank=True)
    
    def __str__(self):
        return f'Requisição #{self.id} - {self.status}'