
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTripBookings } from '@/hooks/useTripBookings';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, Plane, MapPin } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const UpcomingTripsCalendar = () => {
  const { bookings, isLoading } = useTripBookings();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Filter for only upcoming trips
  const upcomingTrips = bookings.filter(booking => {
    const departureDate = new Date(booking.departure_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return departureDate >= today;
  });

  // Get trips for selected date
  const tripsForSelectedDate = upcomingTrips.filter(booking => {
    if (!selectedDate) return false;
    const departureDate = new Date(booking.departure_date);
    return departureDate.toDateString() === selectedDate.toDateString();
  });

  // Get dates that have trips for calendar highlighting
  const tripDates = upcomingTrips.map(booking => new Date(booking.departure_date));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  const handleViewTripDetails = (bookingId: string) => {
    navigate(`/trip-booking/${bookingId}`);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Upcoming Trips Calendar</h1>
              <p className="text-gray-600 text-sm md:text-base">View your business trips in calendar format</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <Plane className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{upcomingTrips.length}</p>
                <p className="text-sm text-gray-600">Upcoming Trips</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(upcomingTrips.map(trip => trip.to_location)).size}
                </p>
                <p className="text-sm text-gray-600">Destinations</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{tripDates.length}</p>
                <p className="text-sm text-gray-600">Travel Days</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Calendar and Trip Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Calendar */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Select Date</h2>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading calendar...</div>
            ) : (
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                  hasTrip: tripDates,
                }}
                modifiersStyles={{
                  hasTrip: {
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: 'bold'
                  }
                }}
                className="rounded-md border w-full"
              />
            )}
            <div className="mt-4 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-100 rounded"></div>
                <span>Days with trips</span>
              </div>
            </div>
          </Card>

          {/* Trip Details for Selected Date */}
          <Card className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
              Trips on {selectedDate?.toLocaleDateString() || 'Selected Date'}
            </h2>
            {tripsForSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Plane className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No trips scheduled for this date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tripsForSelectedDate.map((trip) => (
                  <div
                    key={trip.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {trip.from_location} → {trip.to_location}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{trip.purpose}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs text-gray-500">
                          <span>Departure: {new Date(trip.departure_date).toLocaleDateString()}</span>
                          <span>Return: {new Date(trip.return_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewTripDetails(trip.id)}
                          className="w-full sm:w-auto"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* All Upcoming Trips List */}
        <Card className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">All Upcoming Trips</h2>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading trips...</div>
          ) : upcomingTrips.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Plane className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No upcoming trips found. Book your first trip!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Destination</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">From</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Departure</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Return</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Status</th>
                    <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTrips.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100">
                      <td className="py-3 px-2 md:px-4 text-gray-900 text-sm">{booking.to_location}</td>
                      <td className="py-3 px-2 md:px-4 text-gray-600 text-sm">{booking.from_location}</td>
                      <td className="py-3 px-2 md:px-4 text-gray-600 text-sm">
                        {new Date(booking.departure_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2 md:px-4 text-gray-600 text-sm">
                        {new Date(booking.return_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewTripDetails(booking.id)}
                          className="text-xs"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UpcomingTripsCalendar;
