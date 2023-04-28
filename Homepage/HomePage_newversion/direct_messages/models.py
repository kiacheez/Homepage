from django.db import models
from common.models import CommonModel

class ChattingRoom(CommonModel):
    
    # ChattingRoom model definition

    users = models.ManyToManyField("users.User", related_name="chatting_rooms",)

    def __str__(self):
        return "Chatting Room"

class Message(CommonModel):

    # Message model definition

    text = models.TextField()
    user = models.ForeignKey(
        "users.User", null=True, blank=True, on_delete=models.SET_NULL, related_name="messages",
    )

    room = models.ForeignKey(
        "rooms.Room", on_delete=models.CASCADE, related_name="messages",
    )

    def __str__(self):
        return f"{self.user} says:{self.text}"