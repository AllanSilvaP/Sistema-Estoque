from rest_framework import serializers
from .models import Usuario, Grupo

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'senha', 'grupo']
        extra_kwargs = {'senha': {'write_only': True}}
        
    def create(self, validated_data):
        senha = validated_data.pop('senha')
        usuario = Usuario(**validated_data)
        usuario.set_password(senha)
        usuario.save()
        return usuario
    
class GrupoSerializer(serializers.ModelSerializer):
    class Meta():
        model = Grupo
        fields = ['id', 'nome']
        
        