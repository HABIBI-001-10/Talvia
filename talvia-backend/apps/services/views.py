from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from .models import Service
from .serializers import ServiceListSerializer, ServiceDetailSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    pagination_class = None  # services are always returned as a full list

    def get_queryset(self):
        return Service.objects.filter(is_active=True).order_by('display_order')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceListSerializer

    def get_object(self):
        return generics.get_object_or_404(self.get_queryset(), slug=self.kwargs['pk'])
