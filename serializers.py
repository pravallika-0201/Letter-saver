from rest_framework import serializers
from .models import Letter

class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ["id", "user", "content", "created_at"]  # Include necessary fields
        read_only_fields = ["user", "created_at"]  # These fields should not be editable

    def create(self, validated_data):
        user = self.context["request"].user
        letter = Letter.objects.create(user=user, **validated_data)
        return letter
