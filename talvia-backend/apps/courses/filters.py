import django_filters
from django.db import models
from .models import Course


class CourseFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category', lookup_expr='exact')
    degree_type = django_filters.CharFilter(field_name='degree_type', lookup_expr='exact')
    q = django_filters.CharFilter(method='search_courses')

    class Meta:
        model = Course
        fields = ['category', 'degree_type']

    def search_courses(self, queryset, name, value):
        return queryset.filter(
            models.Q(name__icontains=value)
            | models.Q(description__icontains=value)
            | models.Q(short_description__icontains=value)
        ).distinct()
