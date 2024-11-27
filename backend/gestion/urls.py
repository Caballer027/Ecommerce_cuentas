from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'facturas', FacturaViewSet)
router.register(r'proveedores', ProveedorViewSet, basename='proveedor')
router.register(r'facturas-proveedor', FacturaProveedorViewSet, basename='factura-proveedor')

urlpatterns = [
    path('', include(router.urls)),  # Incluye ViewSets sin prefijo adicional
    path('dashboard-data/', DashboardDataView.as_view(), name='dashboard-data'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('admin-only/', AdminOnlyView.as_view(), name='admin-only'),
    path('alertas-facturas/', AlertasFacturasView.as_view(), name='alertas-facturas'),
    path('exportar-facturas-csv/', ExportarFacturasCSVView.as_view(), name='exportar-facturas-csv'),
    path('exportar-facturas-excel/', ExportarFacturasExcelView.as_view(), name='exportar-facturas-excel'),
    path('importar-facturas-csv/', ImportarFacturasCSVView.as_view(), name='importar-facturas-csv'),
]

