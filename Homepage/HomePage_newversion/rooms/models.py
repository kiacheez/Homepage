from django.db import models
from common.models import CommonModel

class Room(CommonModel):

# room definition
    class RoomKindChoices(models.TextChoices):
        ENTIRE_PLACE = ("entire_place", "Entire_place")
        PRIVATE_PLACE = ("private_place", "Private_place")
        SHARED_ROOM = ("shared_room", "Shared_room")

    name = models.CharField(max_length=50, default="")
    country = models.CharField(max_length=50, default="한국")
    city = models.CharField(max_length=50, default="서울")
    price = models.PositiveBigIntegerField()
    rooms = models.PositiveBigIntegerField()
    toilets = models.PositiveBigIntegerField()
    description = models.TextField()
    address = models.CharField(max_length=250)
    pet_friendly = models.BooleanField(default=False)
    kind = models.CharField(max_length=20, choices=RoomKindChoices.choices)
    owner = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="rooms",)
    amenities = models.ManyToManyField("rooms.Amenity", related_name="rooms",)
    category = models.ForeignKey(
        "categories.Category",
        null=True,
        blank=True,
        on_delete=models.SET_NULL, related_name="rooms",
        )

    def __str__(room):
        return room.name

    def total_amenities(room):
        return room.amenities.count()

    def rating(room):
        count = room.reviews.count()
        if count == 0:
            return 0
        else:
            total_rating = 0
            for review in room.reviews.all().values("rating"):
                total_rating += review["rating"]
            return round(total_rating / count, 2)



class Amenity(CommonModel):
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Amenities"
