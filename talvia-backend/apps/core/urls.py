from django.urls import path
from .views import ContactInformationView, SiteSettingsView

urlpatterns = [
    path('contact/', ContactInformationView.as_view(), name='contact-info'),
    path('site-settings/', SiteSettingsView.as_view(), name='site-settings'),
]
