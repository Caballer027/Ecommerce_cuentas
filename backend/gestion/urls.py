from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, ProveedorViewSet, FacturaViewSet, DashboardDataView

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'facturas', FacturaViewSet)

urlpatterns = [
    # Rutas de los ViewSets
    path('', include(router.urls)),

    # Ruta del endpoint del Dashboard
    path('dashboard-data/', DashboardDataView.as_view(), name='dashboard-data'),
]
