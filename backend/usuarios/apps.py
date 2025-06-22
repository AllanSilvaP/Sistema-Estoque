# backend/usuarios/apps.py
import logging
from django.apps import AppConfig

class UsuariosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'usuarios'

    def ready(self):
        from django.contrib.auth.models import Group, Permission
        from django.contrib.contenttypes.models import ContentType
        try:
            from requisicoes.models import Requisicao
            from estoque.models import Produto, Categoria, Lote, LocalEstocagem, Entrada, Saida
        except Exception as e:
            print(f"Aviso: Não foi possível carregar alguns modelos para permissões: {e}")
            return # Sai do método ready se os modelos não puderem ser carregados

        # GRUPOS AUTH
        # Assegure-se de que os grupos são criados apenas uma vez
        admin_group, created = Group.objects.get_or_create(name="Admin")
        gerente_group, created = Group.objects.get_or_create(name="Gerenciador Local")
        operador_group, created = Group.objects.get_or_create(name="Operador Local")
        auditor_group, created = Group.objects.get_or_create(name="Auditor")

        # Permissões

        # add perms
        def add_permissions(group, model, perms):
            ct = ContentType.objects.get_for_model(model)
            logger = logging.getLogger(__name__)
            for codename in perms:
                try:
                    perm = Permission.objects.get(codename=f"{codename}_{model._meta.model_name}", content_type=ct)
                    group.permissions.add(perm)
                except Permission.DoesNotExist:
                    logger.warning(f"Permissão {codename}_{model._meta.model_name} para o modelo {model._meta.model_name} não encontrada. Verifique suas migrações.")
                except Exception as e:
                    logger.warning(f"Erro ao adicionar permissão {codename}_{model._meta.model_name} ao grupo {group.name}: {e}")

        # Definição dos tipos de permissão
        full_perms = ['add', 'change', 'delete', 'view']
        view_perm = ['view']
        add_edit_perm = ['add', 'change']

        # ADMIN
        add_permissions(admin_group, Produto, full_perms)
        add_permissions(admin_group, Categoria, full_perms)
        add_permissions(admin_group, Lote, full_perms)
        add_permissions(admin_group, LocalEstocagem, full_perms)
        add_permissions(admin_group, Requisicao, full_perms)
        add_permissions(admin_group, Entrada, full_perms)
        add_permissions(admin_group, Saida, full_perms)

        # Gerenciador Local
        add_permissions(gerente_group, Produto, full_perms)
        add_permissions(gerente_group, Categoria, full_perms)
        add_permissions(gerente_group, Lote, full_perms)
        add_permissions(gerente_group, LocalEstocagem, view_perm)
        add_permissions(gerente_group, Requisicao, full_perms)
        add_permissions(gerente_group, Entrada, full_perms)
        add_permissions(gerente_group, Saida, full_perms)

    
        add_permissions(operador_group, Produto, view_perm)
        add_permissions(operador_group, Categoria, view_perm)
        add_permissions(operador_group, Lote, view_perm)
        add_permissions(operador_group, LocalEstocagem, view_perm)
        add_permissions(operador_group, Requisicao, add_edit_perm)
        add_permissions(operador_group, Entrada, full_perms)
        add_permissions(operador_group, Saida, full_perms)

        # Auditor
        add_permissions(auditor_group, LocalEstocagem, view_perm)