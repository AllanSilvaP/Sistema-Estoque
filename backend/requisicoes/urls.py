from django.urls import path, include
from .views import RequisicaoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('requisicoes', RequisicaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]