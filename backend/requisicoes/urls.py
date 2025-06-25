from django.urls import path, include
from .views import RequisicaoViewSet, ItemRequisicaoViewSet, ProdutosEmEstoqueAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('requisicoes', RequisicaoViewSet)
router.register('itens', ItemRequisicaoViewSet)

urlpatterns = [
    path('produtos-em-estoque/', ProdutosEmEstoqueAPIView.as_view()),
    path('', include(router.urls)),
]