from rest_framework import viewsets
from .models import Cliente, Proveedor, Factura
from .serializers import ClienteSerializer, ProveedorSerializer, FacturaSerializer
from django.db.models import Sum, Count, Q
from rest_framework.views import APIView
from rest_framework.response import Response

class DashboardDataView(APIView):
    def get(self, request):
        # Calcular flujo de caja (por cobrar y por pagar) agrupado por mes
        flujo_caja = Factura.objects.values('fecha_emision__month').annotate(
            total_por_cobrar=Sum('monto_total', filter=Q(estado='Pendiente')),
            total_por_pagar=Sum('monto_total', filter=Q(estado='Pagada'))
        )

        # Contar facturas por estado (para el gráfico de pastel)
        estado_facturas = Factura.objects.values('estado').annotate(
            cantidad=Count('id')
        )

        # Formatear los datos en una respuesta
        data = {
            'flujo_caja': list(flujo_caja),
            'estado_facturas': list(estado_facturas),
        }
        return Response(data)


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
