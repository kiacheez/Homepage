from django.db import models
from common.models import CommonModel

class contact(CommonModel):
    name = models.CharField(default="", max_length=50)
    email = models.CharField(default="", max_length=70)
    mobile_number = models.PositiveBigIntegerField()
    contents = models.TextField()
    
    def __str__(contact):
        return contact.name