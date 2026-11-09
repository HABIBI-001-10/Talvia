from django.db import models
from django.utils.text import slugify


DISTRICT_CHOICES = [
    ('thiruvananthapuram', 'Thiruvananthapuram'),
    ('kollam', 'Kollam'),
    ('pathanamthitta', 'Pathanamthitta'),
    ('alappuzha', 'Alappuzha'),
    ('kottayam', 'Kottayam'),
    ('idukki', 'Idukki'),
    ('ernakulam', 'Ernakulam'),
    ('thrissur', 'Thrissur'),
    ('palakkad', 'Palakkad'),
    ('malappuram', 'Malappuram'),
    ('kozhikode', 'Kozhikode'),
    ('wayanad', 'Wayanad'),
    ('kannur', 'Kannur'),
    ('kasaragod', 'Kasaragod'),
]


class College(models.Model):
    name = models.CharField(max_length=300, db_index=True)
    slug = models.SlugField(max_length=350, unique=True, blank=True)
    logo = models.ImageField(upload_to='colleges/logos/', blank=True)
    banner_image = models.ImageField(upload_to='colleges/banners/', blank=True)
    description = models.TextField()
    short_description = models.CharField(max_length=500, blank=True)
    district = models.CharField(max_length=50, choices=DISTRICT_CHOICES, db_index=True)
    city = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    website = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    affiliated_university = models.CharField(max_length=300, blank=True)
    accreditation = models.CharField(max_length=200, blank=True)
    established_year = models.PositiveIntegerField(null=True, blank=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    courses = models.ManyToManyField(
        'courses.Course',
        through='CollegeCourse',
        related_name='colleges',
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['district', 'is_active']),
            models.Index(fields=['is_featured', 'is_active']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class CollegeCourse(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='college_courses')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='college_courses')
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fee_period = models.CharField(max_length=50, blank=True, help_text='e.g., per year, per semester')
    eligibility_details = models.TextField(blank=True)
    admission_open = models.BooleanField(default=True)
    intake_capacity = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('college', 'course')
        verbose_name = 'College Course'
        verbose_name_plural = 'College Courses'

    def __str__(self):
        return f"{self.college.name} - {self.course.name}"


class CollegeGallery(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='colleges/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']
        verbose_name_plural = 'College Gallery Images'

    def __str__(self):
        return f"{self.college.name} - Image {self.display_order}"
