from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnquiryCreateView, EnquiryAdminViewSet

router = DefaultRouter()
router.register('admin', EnquiryAdminViewSet, basename='enquiry-admin')

urlpatterns = [
    path('', EnquiryCreateView.as_view(), name='enquiry-create'),
    path('', include(router.urls)),
]
