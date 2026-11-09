from django.contrib import admin
from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = [
        'student_name', 'phone', 'email', 'enquiry_type',
        'enquiry_status', 'preferred_college', 'assigned_staff', 'created_at',
    ]
    list_filter = ['enquiry_status', 'enquiry_type', 'district', 'created_at']
    search_fields = ['student_name', 'phone', 'email', 'preferred_college', 'interested_course']
    list_editable = ['enquiry_status', 'assigned_staff']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'created_at'
    fieldsets = (
        ('Student Information', {'fields': ('student_name', 'phone', 'email', 'district')}),
        ('Enquiry Details', {
            'fields': ('enquiry_type', 'interested_course', 'preferred_college', 'message', 'source_page'),
        }),
        ('Staff Management', {'fields': ('enquiry_status', 'assigned_staff', 'staff_notes')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
