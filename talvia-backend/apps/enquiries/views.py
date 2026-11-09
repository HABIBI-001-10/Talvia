from rest_framework import viewsets, generics, status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Enquiry
from .serializers import EnquiryCreateSerializer, EnquiryListSerializer, EnquiryUpdateSerializer


class EnquiryRateThrottle(AnonRateThrottle):
    rate = '5/hour'


class EnquiryCreateView(generics.CreateAPIView):
    serializer_class = EnquiryCreateSerializer
    permission_classes = [AllowAny]
    throttle_classes = [EnquiryRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'message': 'Thank you for your enquiry! Our team will contact you shortly.',
                'id': serializer.instance.id,
            },
            status=status.HTTP_201_CREATED,
        )


class EnquiryAdminViewSet(viewsets.ModelViewSet):
    serializer_class = EnquiryListSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['enquiry_status', 'enquiry_type', 'district']
    search_fields = ['student_name', 'phone', 'email', 'preferred_college', 'interested_course']
    ordering_fields = ['created_at', 'enquiry_status']
    ordering = ['-created_at']

    def get_queryset(self):
        return Enquiry.objects.select_related('assigned_staff').all()

    def get_serializer_class(self):
        if self.action in ['partial_update', 'update']:
            return EnquiryUpdateSerializer
        return EnquiryListSerializer
