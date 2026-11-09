from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'degree_type', 'duration', 'is_active']
    list_filter = ['category', 'degree_type', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
