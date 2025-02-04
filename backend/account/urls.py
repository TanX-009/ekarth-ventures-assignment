from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    LoginView,
    LogoutView,
    CookieTokenRefreshView,
)


urlpatterns = [
    path("login/", LoginView.as_view(), name="user-login"),
    path("logout/", LogoutView.as_view(), name="user-logout"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
]
