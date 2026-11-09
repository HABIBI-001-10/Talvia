import django_filters
from django.db import models
from .models import College


class CollegeFilter(django_filters.FilterSet):
    district = django_filters.CharFilter(field_name='district', lookup_expr='exact')
    course = django_filters.CharFilter(method='filter_by_course')
    q = django_filters.CharFilter(method='search_colleges')

    class Meta:
        model = College
        fields = ['district', 'is_featured']

    def filter_by_course(self, queryset, name, value):
        return queryset.filter(courses__slug=value, courses__is_active=True).distinct()

    def search_colleges(self, queryset, name, value):
        return queryset.filter(
            models.Q(name__icontains=value)
            | models.Q(city__icontains=value)
            | models.Q(affiliated_university__icontains=value)
            | models.Q(description__icontains=value)
        ).distinct()
