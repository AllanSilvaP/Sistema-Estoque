from django.urls import path, include
from .views import RequisicaoViewSet, ItemRequisicaoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('requisicoes', RequisicaoViewSet)
router.register('itemrequisicoes', ItemRequisicaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]