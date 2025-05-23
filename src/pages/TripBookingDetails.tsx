
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TripBooking } from '@/hooks/useTripBookings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { NavigationButtons } from '@/components/NavigationButtons';

export default function TripBookingDetails() {
  const params = useParams();
  const { data: booking, isLoading, isError } = useQuery({
    queryKey: ['trip-booking', params.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trip_bookings')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as TripBooking;
    },
  });

  if (isLoading) {
    return <div>Loading booking details...</div>;
  }

  if (isError || !booking) {
    return <div>Error loading booking details.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Trip Booking Details</h1>
            <p className="text-gray-600 mt-1">Booking #{params.id}</p>
          </div>
          <NavigationButtons />
        </div>
        
        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{booking.purpose}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{format(new Date(booking.departure_date), 'PPP')} - {format(new Date(booking.return_date), 'PPP')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{booking.from_location} to {booking.to_location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>Preferred Time: {booking.preferred_time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>Accommodation: {booking.accommodation}</span>
            </div>
            <div>
              <span className="block font-medium text-gray-700">Status:</span>
              <Badge className={booking.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                {booking.status === 'approved' ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}{booking.status}
              </Badge>
            </div>
            <div>
              <span className="block font-medium text-gray-700">Trip Type:</span>
              <p className="text-gray-600">{booking.trip_type}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
