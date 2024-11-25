from django.contrib import admin
from .models import User, Cliente, Proveedor, Factura

admin.site.register(User)
admin.site.register(Cliente)
admin.site.register(Proveedor)
admin.site.register(Factura)
