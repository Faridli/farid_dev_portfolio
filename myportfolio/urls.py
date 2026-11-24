"""
URL configuration for myportfolio project.
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # Serve index.html at root '/'
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    # Serve static assets (style.css, script.js, profile.jpeg, etc.) directly
    re_path(r'^(?P<path>.*\.(css|js|jpe?g|png|gif|svg|ico|webp|woff2?|ttf|eot))$', serve, {'document_root': settings.BASE_DIR}),
]
