from django.db import models
from django.core.exceptions import ValidationError
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError
import uuid
from django.conf import settings
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
    numero_lote = models.CharField(max_length=100, unique=True, blank=True)
    data_criacao = models.DateField(auto_now=True)
    data_validade = models.DateField()
    quantidade = models.IntegerField()
    quantidade_disponivel = models.IntegerField(default=0)
    armazenado_em = models.ForeignKey(LocalEstocagem, on_delete=models.PROTECT)

    def clean(self):
        capacidade = self.armazenado_em.capacidade_maxima

        if capacidade is not None:
            total_ocupado = Lote.objects.filter(
                armazenado_em=self.armazenado_em
            ).exclude(pk=self.pk).aggregate(models.Sum('quantidade'))['quantidade__sum'] or 0

            if total_ocupado + self.quantidade > capacidade:
                raise ValidationError(f"Capacidade excedida: {total_ocupado + self.quantidade} > {capacidade} no local {self.armazenado_em.nome}")
    
    def save(self, *args, **kwargs):
        self.full_clean()
        if not self.numero_lote:
            self.numero_lote = f'LOTE-{uuid.uuid4().hex[:6].upper()}'
        super().save(*args, **kwargs)

    def create(self, validated_data):
        try:
            lote = Lote(**validated_data)
            lote.full_clean()  # Valida
            lote.save()
            return lote
        except DjangoValidationError as e:
            raise DRFValidationError(e.message_dict)

    def __str__(self):
        return f'{self.numero_lote} - {self.produto.nome}'
    
        
class Entrada(models.Model):
    lote = models.ForeignKey(Lote, on_delete=models.PROTECT)
    responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    quantidade_entrada = models.IntegerField()
    data_entrada = models.DateField()
    
    def __str__(self):
        return f'Entrada: {self.quantidade_entada} - {self.lote}'
    
class Saida (models.Model):
    lote = models.ForeignKey(Lote, on_delete=models.PROTECT)
    responsavel = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    quantidade_saida = models.IntegerField()
    motivo = models.CharField(max_length=100)
    destino = models.CharField(max_length=100)
    data_saida = models.DateField()
    
    def __str__(self):
        return f'Saída: {self.quantidade_saida} - {self.lote}'