from rest_framework import serializers
from .models import Course


class CourseListSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    degree_type_display = serializers.CharField(source='get_degree_type_display', read_only=True)
    college_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'name', 'slug', 'category', 'category_display',
            'short_description', 'duration', 'degree_type',
            'degree_type_display', 'college_count',
        ]

    def get_college_count(self, obj):
        return obj.college_courses.filter(college__is_active=True).count()


class CourseDetailSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    degree_type_display = serializers.CharField(source='get_degree_type_display', read_only=True)
    available_colleges = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'name', 'slug', 'category', 'category_display',
            'description', 'short_description', 'eligibility', 'duration',
            'degree_type', 'degree_type_display', 'available_colleges',
        ]

    def get_available_colleges(self, obj):
        from apps.colleges.serializers import CollegeListSerializer
        colleges = obj.colleges.filter(is_active=True)
        return CollegeListSerializer(colleges, many=True, context=self.context).data
