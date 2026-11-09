from django.db import models
from django.contrib.auth.models import User


STATUS_CHOICES = [
    ('new', 'New'),
    ('contacted', 'Contacted'),
    ('follow_up', 'Follow-up'),
    ('converted', 'Converted'),
    ('closed', 'Closed'),
]

ENQUIRY_TYPE_CHOICES = [
    ('general', 'General Enquiry'),
    ('college', 'College Enquiry'),
    ('course', 'Course Enquiry'),
    ('counselling', 'Free Counselling'),
    ('contact', 'Contact Form'),
]


class Enquiry(models.Model):
    student_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    district = models.CharField(max_length=100, blank=True)
    interested_course = models.CharField(max_length=300, blank=True)
    preferred_college = models.CharField(max_length=300, blank=True)
    message = models.TextField(blank=True)
    enquiry_type = models.CharField(max_length=20, choices=ENQUIRY_TYPE_CHOICES, default='general')
    enquiry_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', db_index=True)
    assigned_staff = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_enquiries'
    )
    staff_notes = models.TextField(blank=True)
    source_page = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Enquiries'
        indexes = [
            models.Index(fields=['enquiry_status', 'created_at']),
        ]

    def __str__(self):
        return f"{self.student_name} - {self.get_enquiry_type_display()}"
