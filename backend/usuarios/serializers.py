from rest_framework import serializers
from .models import Usuario
from estoque.serializers import LocalEstocagemSerializers

class UsuarioSerializer(serializers.ModelSerializer):
    local = LocalEstocagemSerializers(read_only=True)
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'senha', 'local','data_criacao', 'groups']
        extra_kwargs = {'senha': {'write_only': True}}
        
    def create(self, validated_data):
        senha = validated_data.pop('senha')
        grupos = validated_data.pop('groups', [])
        usuario = Usuario(**validated_data)
        usuario.set_password(senha)
        usuario.save()
        usuario.groups.set(grupos)
        return usuario
    
        