import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager,
    Group, Permission
)
from django.utils.translation import gettext_lazy as _
from estoque.models import LocalEstocagem
    
class UsuarioManager (BaseUserManager):
    def create_user(self, email, nome, senha=None, grupo=None):
        if not email:
            raise ValueError('Email obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, nome= nome)
        user.set_password(senha)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, nome, senha):
        user = self.create_user(email, nome, senha)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
    
class Usuario(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=150)
    email = models.EmailField(unique=True, max_length=254)
    senha = models.CharField(max_length=128)
    data_criacao = models.DateTimeField(auto_now_add=True)
    ativo = models.BooleanField(default=True)
    local = models.ForeignKey(LocalEstocagem, on_delete=models.PROTECT, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='usuarios_usuario_set',  
        help_text=_('The groups this user belongs to.'),
        related_query_name='usuario',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='usuarios_usuario_set_permissions',  # <- resolve conflito
        help_text=_('Specific permissions for this user.'),
        related_query_name='usuario',
    )

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    def __str__(self):
        return self.nome