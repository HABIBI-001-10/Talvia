from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/colleges/', include('apps.colleges.urls')),
    path('api/courses/', include('apps.courses.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/enquiries/', include('apps.enquiries.urls')),
    path('api/', include('apps.core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
