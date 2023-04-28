from rest_framework import serializers
from django.utils import timezone
from .models import Booking
from rooms.models import Room
from rooms.serializers import TinyRoomSerializer

class CreateRoomBookingSerializer(serializers.ModelSerializer):

    check_in = serializers.DateField()
    check_out = serializers.DateField()

    class Meta:
        model = Booking
        fields = (
            "check_in",
            "check_out",
            "guests",
        )

    def validate_check_in(self, value):
        now = timezone.localtime(timezone.now()).date()
        if now > value:
            raise serializers.ValidationError("예약할 수 없습니다.")
        return value

    def validate_check_out(self, value):
        now = timezone.localtime(timezone.now()).date()
        if now > value:
            raise serializers.ValidationError("예약할 수 없습니다.")
        return value

    def validated(self, data):
        room = self.context.get("room")
        if data['check_out'] <= data['check_in']:
            raise serializers.ValidationError("예약 날짜를 확인해주세요.")
        if Booking.objects.filter(room=room, check_in__lte=data["check_out"], check_out__gte=data["check_in"]).exists():
            raise serializers.ValidationError("예약 날짜를 확인해주세요")
        return data

        

class PublicBookingSerializer(serializers.ModelSerializer):
    class Meta:

        model = Booking

        fields = (
            "pk",
            "check_in",
            "check_out",
            "experience_time",
            "guests",
        )

class CheckBookingSerializer(serializers.ModelSerializer):
    room = TinyRoomSerializer()
    
    class Meta:
        fields = (
            "id",
            "room",
            "kind",
            "check_in",
            "check_out",
            "guests",
            "not_canceled",
        )