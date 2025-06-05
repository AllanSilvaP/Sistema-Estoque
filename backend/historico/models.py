from django.db import models
from usuarios.models import Usuario

# Create your models here.
class HistoricoMovimentacao(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    acao = models.CharField(max_length=100)
    descricao = models.TextField()
    data_hora = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.acao} por {self.usuario.nome} em {self.data_hora}'