import re
from rest_framework import serializers
from .models import Enquiry


class EnquiryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = [
            'student_name', 'phone', 'email', 'district',
            'interested_course', 'preferred_college', 'message',
            'enquiry_type', 'source_page',
        ]

    def validate_phone(self, value):
        cleaned = re.sub(r'[\s\-\(\)]', '', value)
        if not re.match(r'^\+?[0-9]{10,15}$', cleaned):
            raise serializers.ValidationError('Please enter a valid phone number.')
        return cleaned

    def validate_student_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Please enter your full name.')
        return value.strip()


class EnquiryListSerializer(serializers.ModelSerializer):
    assigned_staff_name = serializers.CharField(
        source='assigned_staff.get_full_name', read_only=True, default=''
    )
    enquiry_status_display = serializers.CharField(
        source='get_enquiry_status_display', read_only=True
    )
    enquiry_type_display = serializers.CharField(
        source='get_enquiry_type_display', read_only=True
    )

    class Meta:
        model = Enquiry
        fields = '__all__'


class EnquiryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['enquiry_status', 'assigned_staff', 'staff_notes']
