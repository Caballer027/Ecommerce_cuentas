from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Administrador'

class IsContador(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Contador'

class IsGerente(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Gerente'
