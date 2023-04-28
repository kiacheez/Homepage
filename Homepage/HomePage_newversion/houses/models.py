from django.db import models



class House(models.Model):

    # Hosue model definition
    
    name = models.CharField(max_length=150)
    price = models.PositiveIntegerField()
    description = models.TextField()
    address = models.CharField(max_length=200)
    pet_allowed = models.BooleanField(default=True)

    def __str__(self):
        return self.name