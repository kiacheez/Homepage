from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status
from .models import Booking
from .serializers import CheckBookingSerializer


class Mybooking(APIView):
    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        serializer = CheckBookingSerializer(
            bookings, many=True,
        )
        return Response(serializer.data)
    
class CancelBooking(APIView):
    def get_object(self, pk):
        try:
            return Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            raise NotFound
    
    def post(self, request, pk):
        booking = self.get_object(pk)
        