from django.urls import path
from .views import RelatorioGraficosView

urlpatterns = [
    path("graficos/", RelatorioGraficosView.as_view(), name="graficos")
]
