from django.db import models


class ContactInformation(models.Model):
    company_name = models.CharField(max_length=200, default='TALVIA')
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    whatsapp_number = models.CharField(max_length=20, blank=True)
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    google_maps_embed = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Contact Information'
        verbose_name_plural = 'Contact Information'

    def __str__(self):
        return self.company_name


class SiteSettings(models.Model):
    logo = models.ImageField(upload_to='site/', blank=True)
    tagline = models.CharField(max_length=200, default='Your Education. Your Future. Our Guidance.')
    hero_small_heading = models.CharField(max_length=200, default='YOUR FUTURE STARTS HERE')
    hero_heading = models.CharField(max_length=300, default='Find the Right College. Build the Right Future.')
    hero_description = models.TextField(default='Discover educational opportunities across Kerala with Talvia.')
    hero_image = models.ImageField(upload_to='site/', blank=True)
    about_heading = models.CharField(max_length=200, default='About Talvia')
    about_description = models.TextField(blank=True)
    about_image = models.ImageField(upload_to='site/', blank=True)
    vision = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    stat_colleges = models.CharField(max_length=10, default='25+')
    stat_districts = models.CharField(max_length=10, default='14')
    stat_courses = models.CharField(max_length=50, default='Multiple')
    stat_approach = models.CharField(max_length=50, default='Student-First')
    footer_description = models.TextField(blank=True)
    meta_title = models.CharField(max_length=200, default='Talvia - Education Services')
    meta_description = models.TextField(blank=True)
    meta_keywords = models.CharField(max_length=500, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return 'Site Settings'
