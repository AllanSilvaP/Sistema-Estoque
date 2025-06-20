from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from requisicoes.models import Requisicao
from estoque.models import Produto, Categoria, Lote, LocalEstocagem, HistoricoMovimentacao
from usuarios.models import Usuario

#GRUPOS AUTH
admin_group, _ = Group.objects.get_or_create(name="Admin")
gerente_group, _ = Group.objects.get_or_create(name="Gerenciador Local")
operador_group, _ = Group.objects.get_or_create(name="Operador Local")
auditor_group, _ = Group.objects.get_or_create(name="Auditor")

# Permissões

#add perms
def add_permissions(group, model, perms):
    ct = ContentType.objects.get_for_model(model)
    for codename in perms:
        perm = Permission.objects.get(codename=f"{codename}_{model._meta.model_name}", content_type=ct)
        group.permissions.add(perm)
        
        
#admin
full_perms = ['add', 'change', 'delete', 'view']
add_permissions(admin_group, Produto, full_perms)
add_permissions(admin_group, Categoria, full_perms)
add_permissions(admin_group, Lote, full_perms)
add_permissions(admin_group, LocalEstocagem, full_perms)
add_permissions(admin_group, Requisicao, full_perms)
add_permissions(admin_group, HistoricoMovimentacao, full_perms)

# Gerenciador Local
add_permissions(gerente_group, Produto)