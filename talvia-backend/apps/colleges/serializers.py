from rest_framework import serializers
from .models import College, CollegeCourse, CollegeGallery


class CollegeGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeGallery
        fields = ['id', 'image', 'caption', 'display_order']


class CollegeCourseSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    course_slug = serializers.CharField(source='course.slug', read_only=True)
    course_category = serializers.CharField(source='course.get_category_display', read_only=True)
    course_duration = serializers.CharField(source='course.duration', read_only=True)
    course_degree_type = serializers.CharField(source='course.get_degree_type_display', read_only=True)

    class Meta:
        model = CollegeCourse
        fields = [
            'id', 'course_name', 'course_slug', 'course_category',
            'course_duration', 'course_degree_type', 'fee_amount',
            'fee_period', 'eligibility_details', 'admission_open',
        ]


class CollegeListSerializer(serializers.ModelSerializer):
    district_display = serializers.CharField(source='get_district_display', read_only=True)
    course_count = serializers.SerializerMethodField()
    course_names = serializers.SerializerMethodField()

    class Meta:
        model = College
        fields = [
            'id', 'name', 'slug', 'logo', 'short_description', 'district',
            'district_display', 'city', 'affiliated_university', 'is_featured',
            'course_count', 'course_names',
        ]

    def get_course_count(self, obj):
        return obj.college_courses.filter(course__is_active=True).count()

    def get_course_names(self, obj):
        return list(
            obj.college_courses.filter(course__is_active=True)
            .values_list('course__name', flat=True)[:5]
        )


class CollegeDetailSerializer(serializers.ModelSerializer):
    district_display = serializers.CharField(source='get_district_display', read_only=True)
    college_courses = CollegeCourseSerializer(many=True, read_only=True)
    gallery_images = CollegeGallerySerializer(many=True, read_only=True)

    class Meta:
        model = College
        fields = [
            'id', 'name', 'slug', 'logo', 'banner_image', 'description',
            'short_description', 'district', 'district_display', 'city',
            'address', 'website', 'email', 'phone', 'affiliated_university',
            'accreditation', 'established_year', 'is_featured',
            'college_courses', 'gallery_images', 'created_at',
        ]
