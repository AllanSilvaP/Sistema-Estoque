from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProdutoViewSet, CategoriaViewSet, LocalEstocagemViewSet, LoteViewSet, EntradaViewSet, SaidaViewSet

router = DefaultRouter()
router.register(r'produtos', ProdutoViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'localestocagens', LocalEstocagemViewSet)
router.register(r'lotes', LoteViewSet)
router.register(r'entradas', EntradaViewSet)
router.register(r'saidas', SaidaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]