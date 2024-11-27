from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import *

class UserSerializer(serializers.ModelSerializer):
    # Campo para confirmar contraseña (opcional, pero recomendado)
    password2 = serializers.CharField(
        style={'input_type': 'password'}, 
        write_only=True, 
        required=False
    )

    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'role',  # Incluimos el campo role personalizado
            'password', 
            'password2'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def validate(self, data):
        # Validación de contraseñas (opcional)
        password = data.get('password')
        password2 = data.get('password2')
        
        if password and password2 and password != password2:
            raise serializers.ValidationError({
                'password2': 'Las contraseñas no coinciden.'
            })
        
        return data

    def create(self, validated_data):
        # Eliminar password2 antes de crear el usuario
        validated_data.pop('password2', None)
        
        # Crear usuario con método seguro
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', '')
        )
        
        return user

    def update(self, instance, validated_data):
        # Eliminar password2 antes de actualizar
        validated_data.pop('password2', None)
        
        # Manejar actualización de contraseña
        password = validated_data.pop('password', None)
        
        # Actualizar campos del usuario
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Actualizar contraseña si se proporciona
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer()

    class Meta:
        model = Factura
        fields = [
            'id',
            'numero_factura',
            'cliente',
            'fecha_emision',
            'fecha_vencimiento',
            'monto_total',
            'estado',
        ]

class FacturaCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = [
            'numero_factura',
            'cliente',
            'fecha_emision',
            'fecha_vencimiento',
            'monto_total',
            'estado',
        ]

class FacturaProveedorSerializer(serializers.ModelSerializer):
    proveedor = ProveedorSerializer()

    class Meta:
        model = FacturaProveedor
        fields = [
            'id',
            'numero_factura',
            'proveedor',
            'fecha_emision',
            'fecha_vencimiento',
            'monto_total',
            'estado',
        ]


class FacturaProveedorCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacturaProveedor
        fields = [
            'numero_factura',
            'proveedor',
            'fecha_emision',
            'fecha_vencimiento',
            'monto_total',
            'estado',
        ]

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    role = serializers.ChoiceField(choices=User.ROLES, required=False)  # Opcional durante el registro

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        # Validar que las contraseñas coincidan
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        # Eliminar el campo `password2` antes de guardar
        validated_data.pop('password2')
        role = validated_data.pop('role', None)  # Extraer el rol (si se proporciona)

        # Crear el usuario
        user = User.objects.create_user(**validated_data)

        # Asignar el rol si se especifica
        if role:
            user.role = role
            user.save()

        return user
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError("El nombre de usuario ya está registrado. Por favor, elige otro.")
        return value