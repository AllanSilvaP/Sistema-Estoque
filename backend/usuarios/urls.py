from django.urls import path, include
from .views import UsuarioViewSet, UsuarioCreateView, UsuarioMeView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [path('cadastro/', UsuarioCreateView.as_view(), name='usuario-cadastro'),
               path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
               path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
               path('me/', UsuarioMeView.as_view(), name="me"),
               path('', include(router.urls))]
