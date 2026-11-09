from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Course, CATEGORY_CHOICES
from .serializers import CourseListSerializer, CourseDetailSerializer
from .filters import CourseFilter


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = CourseFilter
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'category']
    ordering = ['name']

    def get_queryset(self):
        return Course.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseListSerializer

    def get_object(self):
        return generics.get_object_or_404(self.get_queryset(), slug=self.kwargs['pk'])

    @action(detail=False, methods=['get'])
    def categories(self, request):
        categories = []
        for code, name in CATEGORY_CHOICES:
            count = Course.objects.filter(category=code, is_active=True).count()
            categories.append({'code': code, 'name': name, 'count': count})
        return Response(categories)
