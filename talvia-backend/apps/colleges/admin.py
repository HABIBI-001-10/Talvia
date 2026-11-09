from django.contrib import admin
from .models import College, CollegeCourse, CollegeGallery


class CollegeCourseInline(admin.TabularInline):
    model = CollegeCourse
    extra = 1
    autocomplete_fields = ['course']


class CollegeGalleryInline(admin.TabularInline):
    model = CollegeGallery
    extra = 1


@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'district', 'city', 'affiliated_university',
        'is_featured', 'is_active', 'created_at',
    ]
    list_filter = ['district', 'is_featured', 'is_active', 'affiliated_university']
    search_fields = ['name', 'city', 'affiliated_university', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_featured', 'is_active']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [CollegeCourseInline, CollegeGalleryInline]
    fieldsets = (
        (None, {'fields': ('name', 'slug', 'logo', 'banner_image')}),
        ('Details', {'fields': ('description', 'short_description', 'district', 'city', 'address')}),
        ('Contact', {'fields': ('website', 'email', 'phone')}),
        ('Academic', {'fields': ('affiliated_university', 'accreditation', 'established_year')}),
        ('Status', {'fields': ('is_featured', 'is_active', 'created_at', 'updated_at')}),
    )
