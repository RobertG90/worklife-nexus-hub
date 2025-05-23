
import React from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TripBooking } from '@/hooks/useTripBookings';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UpcomingTrips() {
  const { data: upcomingTrips, isLoading, error } = useQuery({
    queryKey: ['upcoming-trips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trip_bookings')
        .select('*')
        .gte('departure_date', new Date().toISOString().split('T')[0])
        .order('departure_date', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as TripBooking[];
    },
  });

  if (isLoading) {
    return <div className="text-center py-6">Loading upcoming trips...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Upcoming Trips</h1>
            <p className="text-gray-600 mt-1">View and manage your upcoming business trips</p>
          </div>
          <NavigationButtons showTrips={false} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingTrips?.map((trip) => (
            <Link key={trip.id} to={`/trip-booking/${trip.id}`}>
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {trip.to_location}
                  </CardTitle>
                  <CardDescription>
                    {new Date(trip.departure_date).toLocaleDateString()} - {new Date(trip.return_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Status: {trip.status}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
