from django.db import models
from django.contrib.auth.models import User

class Letter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to user
    title = models.CharField(max_length=255)  # Letter title
    content = models.TextField()  # Letter content
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp
    google_drive_id = models.CharField(max_length=255, blank=True, null=True)  # Google Drive File ID

    def __str__(self):
        return self.title


# Create your models here.
