from datetime import timedelta
from django.utils.timezone import now
from django.db.models import Q
from .models import Factura

def obtener_alertas_facturas():
    hoy = now().date()
    proximas_vencer = Factura.objects.filter(
        estado='Pendiente',
        fecha_vencimiento__lte=hoy + timedelta(days=3),
        fecha_vencimiento__gte=hoy
    )

    vencidas = Factura.objects.filter(
        estado='Pendiente',
        fecha_vencimiento__lt=hoy
    )

    return {
        "proximas_vencer": proximas_vencer,
        "vencidas": vencidas,
    }
