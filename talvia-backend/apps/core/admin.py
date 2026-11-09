from django.contrib import admin
from .models import ContactInformation, SiteSettings


@admin.register(ContactInformation)
class ContactInformationAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'phone', 'email', 'updated_at']

    def has_add_permission(self, request):
        return not ContactInformation.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['meta_title', 'tagline', 'updated_at']

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
