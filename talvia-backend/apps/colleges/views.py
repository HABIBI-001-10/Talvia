from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import College, DISTRICT_CHOICES
from .serializers import CollegeListSerializer, CollegeDetailSerializer
from .filters import CollegeFilter


class CollegeViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = CollegeFilter
    search_fields = ['name', 'city', 'affiliated_university', 'description']
    ordering_fields = ['name', 'created_at', 'district']
    ordering = ['name']

    def get_queryset(self):
        return College.objects.filter(is_active=True).prefetch_related(
            'college_courses__course', 'gallery_images'
        )

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CollegeDetailSerializer
        return CollegeListSerializer

    def get_object(self):
        return generics.get_object_or_404(self.get_queryset(), slug=self.kwargs['pk'])

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.get_queryset().filter(is_featured=True)[:9]
        serializer = CollegeListSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def districts(self, request):
        districts = []
        for code, name in DISTRICT_CHOICES:
            count = College.objects.filter(district=code, is_active=True).count()
            districts.append({'code': code, 'name': name, 'count': count})
        return Response(districts)
