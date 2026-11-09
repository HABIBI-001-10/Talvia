from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import ContactInformation, SiteSettings
from .serializers import ContactInformationSerializer, SiteSettingsSerializer


class ContactInformationView(generics.RetrieveAPIView):
    serializer_class = ContactInformationSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj, _ = ContactInformation.objects.get_or_create(pk=1)
        return obj


class SiteSettingsView(generics.RetrieveAPIView):
    serializer_class = SiteSettingsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        obj, _ = SiteSettings.objects.get_or_create(pk=1)
        return obj
