from django.db import models
from django.utils.text import slugify


CATEGORY_CHOICES = [
    ('arts', 'Arts & Humanities'),
    ('commerce', 'Commerce & Business'),
    ('science', 'Science'),
    ('management', 'Management'),
    ('computer_applications', 'Computer Applications'),
    ('engineering', 'Engineering & Technology'),
    ('healthcare', 'Healthcare & Medical'),
    ('education', 'Education'),
    ('law', 'Law'),
    ('professional', 'Professional Programmes'),
]

DEGREE_TYPE_CHOICES = [
    ('certificate', 'Certificate'),
    ('diploma', 'Diploma'),
    ('bachelors', "Bachelor's Degree"),
    ('masters', "Master's Degree"),
    ('doctorate', 'Doctorate'),
    ('professional', 'Professional Degree'),
]


class Course(models.Model):
    name = models.CharField(max_length=300, db_index=True)
    slug = models.SlugField(max_length=350, unique=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, db_index=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True)
    eligibility = models.TextField(blank=True)
    duration = models.CharField(max_length=100, blank=True, help_text='e.g., 3 Years')
    degree_type = models.CharField(max_length=50, choices=DEGREE_TYPE_CHOICES, blank=True)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['category', 'is_active']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
