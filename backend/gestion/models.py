from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.timezone import now

# Modelo personalizado de usuario con roles
class User(AbstractUser):
    ROLES = (
        ('Administrador', 'Administrador'),
        ('Contador', 'Contador'),
        ('Gerente', 'Gerente'),
    )
    role = models.CharField(max_length=20, choices=ROLES, blank=True, null=True)

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
    )


# Modelo de Cliente
class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)

# Modelo de Proveedor
class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)

# Modelo de Factura
class Factura(models.Model):
    ESTADOS = (
        ('Pagada', 'Pagada'),
        ('Pendiente', 'Pendiente'),
        ('Vencida', 'Vencida'),
    )

    numero_factura = models.CharField(max_length=50, unique=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='facturas')
    fecha_emision = models.DateField(default=now)
    fecha_vencimiento = models.DateField()
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='Pendiente')

    def actualizar_estado(self):
        """Actualizar automáticamente el estado según la fecha de vencimiento."""
        if self.estado != 'Pagada' and now().date() > self.fecha_vencimiento:
            self.estado = 'Vencida'
            self.save()

    def __str__(self):
        return f"Factura {self.numero_factura} - {self.estado}"

class FacturaProveedor(models.Model):
    ESTADOS = (
        ('Pagada', 'Pagada'),
        ('Pendiente', 'Pendiente'),
        ('Vencida', 'Vencida'),
    )

    numero_factura = models.CharField(max_length=50, unique=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='facturas')
    fecha_emision = models.DateField(default=now)
    fecha_vencimiento = models.DateField()
    monto_total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='Pendiente')

    def actualizar_estado(self):
        """Actualizar automáticamente el estado según la fecha de vencimiento."""
        if self.estado != 'Pagada' and now().date() > self.fecha_vencimiento:
            self.estado = 'Vencida'
            self.save()

    def __str__(self):
        return f"Factura {self.numero_factura} - {self.estado}"