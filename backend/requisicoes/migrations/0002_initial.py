# Generated by Django 5.1.7 on 2025-06-05 20:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("requisicoes", "0001_initial"),
        ("usuarios", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="requisicao",
            name="solicitante",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="usuarios.usuario"
            ),
        ),
    ]
