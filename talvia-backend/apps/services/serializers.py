from rest_framework import serializers
from .models import Service


class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'short_description', 'icon', 'image', 'display_order']


class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description', 'description',
            'icon', 'image', 'benefits', 'process_steps', 'faqs', 'display_order',
        ]
