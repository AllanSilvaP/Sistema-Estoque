from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HistoricoMovimentacaoViewSet

router = DefaultRouter()
router.register('historicos', HistoricoMovimentacaoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]