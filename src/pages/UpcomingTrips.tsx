
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTripBookings } from '@/hooks/useTripBookings';
import { useNavigate } from 'react-router-dom';
import { Plane, ArrowLeft } from 'lucide-react';

const UpcomingTrips = () => {
  const { bookings, isLoading } = useTripBookings();
  const navigate = useNavigate();

  // Filter for only upcoming trips (where departure date is today or in the future)
  const upcomingTrips = bookings.filter(booking => {
    const departureDate = new Date(booking.departure_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    return departureDate >= today;
  });

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Upcoming Trips</h1>
              <p className="text-gray-600">View and manage your upcoming business trips</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
        </div>

        {/* Trips Table */}
        <Card className="p-6">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading trips...</div>
          ) : upcomingTrips.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No upcoming trips found. Book your first trip!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Destination</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">From</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Departure</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Return</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTrips.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{booking.to_location}</td>
                      <td className="py-3 px-4 text-gray-600">{booking.from_location}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(booking.departure_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(booking.return_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{booking.purpose}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewTripDetails(booking.id)}
                        >
                          View Details
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

export default UpcomingTrips;
