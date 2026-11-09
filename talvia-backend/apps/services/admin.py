from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'display_order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['display_order', 'is_active']
    readonly_fields = ['created_at', 'updated_at']
