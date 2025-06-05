from django.db import models
import uuid
from usuarios.models import Usuario
# Create your models here.

class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    tipo = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nome
    
class Produto (models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    codigo_barras = models.CharField(max_length=100)
    fabricante = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)
    temperatura_armazenamento = models.CharField(max_length=50)
    criado_em = models.DateTimeField(auto_now_add=True)
    ativo = models.BooleanField(default=True)
    
    def __str__ (self):
        return self.nome
    
class LocalEstocagem(models.Model):
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    endereco = models.TextField()
    capacidade_maxima = models.IntegerField(null=True, blank=True)
    temperatura_controlada = models.BooleanField(default=False)
    
    def __str__(self):
        return self.nome
    
class Lote(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.PROTECT)
    numero_lote = models.CharField(max_length=100)
    data_validade = models.DateField()
    quantidade = models.IntegerField()
    origem = models.CharField(max_length=100)
    armazenado_em = models.ForeignKey(LocalEstocagem, on_delete=models.PROTECT)
    
    def __str__(self):
        return f'{self.numero_lote} - {self.produto.nome}'
        
class Entrada(models.Model):
    lote = models.ForeignKey(Lote, on_delete=models.PROTECT)
    responsavel = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    quantidade_entrada = models.IntegerField()
    data_entrada = models.DateField()
    documento_referencia = models.CharField(max_length=100)
    
    def __str__(self):
        return f'Entrada: {self.quantidade_entada} - {self.lote}'
    
class Saida (models.Model):
    lote = models.ForeignKey(Lote, on_delete=models.PROTECT)
    responsavel = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    quantidade_saida = models.IntegerField()
    motivo = models.CharField(max_length=100)
    destino = models.CharField(max_length=100)
    data_saida = models.DateField()
    
    def __str__(self):
        return f'Saída: {self.quantidade_saida} - {self.lote}'