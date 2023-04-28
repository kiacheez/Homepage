from django.contrib import admin
from .models import Room, Amenity

@admin.action(description="Set all prices to zero")
def reset_prices(model_admin, reqeust, rooms):
    for room in rooms.all():
        room.price = 0
        room.save()


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):

    # action definition
    actions = (reset_prices,)

    
    # Register your models here

    list_display = (
        "name",
        "price",
        "kind",
        "owner",
        "rating",
        "created_at",
        "total_amenities",

    )

    list_filter = (
        "country",
        "city",
        "pet_friendly",
        "kind",
        "amenities",
        "created_at",
        "updated_at",
    )

    search_fields = (
        "name",
        "^price",
        "=owner_username",
    )

@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created_at",
        "updated_at",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
    )
