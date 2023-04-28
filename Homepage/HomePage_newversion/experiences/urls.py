from django.urls import path
from .views import Perks, PerkDetail



urlpatterns = [
    path("perks/", Perks.as_view()),
    path("perks/", PerkDetail.as_view())
     
]
