from django.db import models
from django.utils.text import slugify


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=250, unique=True, blank=True)
    short_description = models.CharField(max_length=500)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True, help_text='Lucide icon name')
    image = models.ImageField(upload_to='services/', blank=True)
    benefits = models.JSONField(default=list, blank=True, help_text='List of benefit strings')
    process_steps = models.JSONField(default=list, blank=True, help_text='List of process step strings')
    faqs = models.JSONField(default=list, blank=True, help_text='List of {question, answer} objects')
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
