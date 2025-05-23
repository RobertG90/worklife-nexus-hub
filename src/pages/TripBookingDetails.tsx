
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Clock, Plane, Hotel } from 'lucide-react';
import { TripBooking } from '@/hooks/useTripBookings';

export default function TripBookingDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['trip-booking', id],
    queryFn: async () => {
      if (!id) throw new Error('No booking ID provided');
      
      const { data, error } = await supabase
        .from('trip_bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching trip booking:', error);
        throw error;
      }

      return data as TripBooking;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trip booking details...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trip Booking Not Found</h1>
          <p className="text-gray-600 mb-6">The trip booking you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Trip Booking Details */}
        <Card className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Trip to {booking.to_location}</h1>
                <p className="text-gray-600">Business Trip Request</p>
              </div>
            </div>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
          </div>

          {/* Trip Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Trip Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">From</p>
                      <p className="font-medium text-gray-900">{booking.from_location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">To</p>
                      <p className="font-medium text-gray-900">{booking.to_location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 text-gray-400 flex items-center justify-center text-xs font-bold">
                      T
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Trip Type</p>
                      <p className="font-medium text-gray-900 capitalize">{booking.trip_type}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Departure Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(booking.departure_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Return Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(booking.return_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Preferred Time</p>
                      <p className="font-medium text-gray-900">{booking.preferred_time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Purpose</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{booking.purpose}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Accommodation</h3>
                <div className="flex items-center space-x-3">
                  <Hotel className="w-5 h-5 text-gray-400" />
                  <p className="font-medium text-gray-900">{booking.accommodation}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Request ID:</span>
                    <span className="font-mono text-gray-900">{booking.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="text-gray-900">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-gray-900">
                      {new Date(booking.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Information */}
          {booking.status === 'pending' && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-orange-900">Pending Approval</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Your trip request is being reviewed. You'll receive an email notification once it's processed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {booking.status === 'confirmed' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Trip Confirmed</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your business trip has been approved and confirmed. Travel arrangements will be communicated separately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {booking.status === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-red-600 rounded-full flex items-center justify-center">
                  <div className="w-1 h-3 bg-red-600 transform rotate-45"></div>
                  <div className="w-1 h-3 bg-red-600 transform -rotate-45 -ml-1"></div>
                </div>
                <div>
                  <h4 className="font-medium text-red-900">Trip Request Rejected</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Unfortunately, your trip request was not approved. Please contact HR for more information.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
