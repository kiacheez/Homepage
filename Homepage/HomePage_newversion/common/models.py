from django.db import models
from django.utils import timezone


class CommonModel(models.Model):

# Create your models here

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
