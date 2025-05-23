import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  Receipt,
  Plus,
  Eye
} from 'lucide-react';
import { TravelExpenseForm } from '@/components/forms/TravelExpenseForm';
import { useTravelExpenses } from '@/hooks/useTravelExpenses';
import { useTripBookings } from '@/hooks/useTripBookings';
import { useNavigate } from 'react-router-dom';

export function TravelSection() {
  const [tripType, setTripType] = useState('domestic');
  const [activeTab, setActiveTab] = useState('book-trip');
  const { expenses, isLoading } = useTravelExpenses();
  const { bookings, isLoading: isBookingsLoading, createBooking, isCreating } = useTripBookings();
  const navigate = useNavigate();

  // Form state for trip booking
  const [formData, setFormData] = useState({
    fromLocation: '',
    toLocation: '',
    departureDate: '',
    returnDate: '',
    purpose: '',
    preferredTime: 'Morning (6AM - 12PM)',
    accommodation: 'Hotel required'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitTrip = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking({
      tripType,
      fromLocation: formData.fromLocation,
      toLocation: formData.toLocation,
      departureDate: formData.departureDate,
      returnDate: formData.returnDate,
      purpose: formData.purpose,
      preferredTime: formData.preferredTime,
      accommodation: formData.accommodation
    });
    
    // Reset form after submission
    setFormData({
      fromLocation: '',
      toLocation: '',
      departureDate: '',
      returnDate: '',
      purpose: '',
      preferredTime: 'Morning (6AM - 12PM)',
      accommodation: 'Hotel required'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Plane className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corporate Travel</h1>
          <p className="text-gray-600">Arrange your business trips and manage expenses!</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('book-trip')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'book-trip'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Plane className="w-4 h-4 inline mr-2" />
            Book Trip
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expenses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Receipt className="w-4 h-4 inline mr-2" />
            Travel Expenses
          </button>
        </nav>
      </div>

      {activeTab === 'book-trip' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Travel Request */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Request New Business Trip</h2>
              
              <form onSubmit={handleSubmitTrip} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['domestic', 'international'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTripType(type)}
                        className={`p-3 rounded-lg border text-center capitalize transition-colors ${
                          tripType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <Input 
                      name="fromLocation"
                      value={formData.fromLocation}
                      onChange={handleInputChange}
                      placeholder="Departure city" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <Input 
                      name="toLocation"
                      value={formData.toLocation}
                      onChange={handleInputChange}
                      placeholder="Destination city" 
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                    <Input 
                      type="date" 
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                    <Input 
                      type="date" 
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Travel</label>
                  <Textarea 
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    placeholder="Meeting details, conference name, etc." 
                    className="h-24" 
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Departure Time</label>
                    <select 
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option>Morning (6AM - 12PM)</option>
                      <option>Afternoon (12PM - 6PM)</option>
                      <option>Evening (6PM - 12AM)</option>
                      <option>No preference</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation</label>
                    <select 
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option>Hotel required</option>
                      <option>No accommodation needed</option>
                      <option>Extended stay</option>
                    </select>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-green-500">🚀</div>
                    <div>
                      <h4 className="font-medium text-green-900">Smart Booking Engine</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Our AI will find the best flights and hotels within your budget, 
                        automatically applying company policies and preferred vendors.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isCreating}
                >
                  {isCreating ? 'Submitting...' : 'Submit Travel Request'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar - same as before */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Travel Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>Economy class for flights under 4 hours</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>Book at least 2 weeks in advance</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>Stay within 5km of meeting location</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Travel Budget</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Budget</span>
                  <span className="font-semibold">$8,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Used This Year</span>
                  <span className="text-gray-900">$3,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Remaining</span>
                  <Badge className="bg-green-100 text-green-800">$4,800</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TravelExpenseForm />
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Expense Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Expenses</span>
                  <span className="font-semibold">{expenses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    {expenses.filter(e => e.status === 'pending').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Approved</span>
                  <Badge className="bg-green-100 text-green-800">
                    {expenses.filter(e => e.status === 'approved').length}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'expenses' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Travel Expenses</h2>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading expenses...</div>
          ) : expenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No travel expenses found. Submit your first expense!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Destination</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{expense.trip_destination}</td>
                      <td className="py-3 px-4 text-gray-600">{expense.trip_purpose}</td>
                      <td className="py-3 px-4 text-gray-600 capitalize">{expense.expense_type}</td>
                      <td className="py-3 px-4 text-gray-900 font-medium">
                        {formatCurrency(expense.amount, expense.currency)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(expense.start_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(expense.status)}>
                          {expense.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* Upcoming Trips */}
      {activeTab === 'book-trip' && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Trips</h2>
          {isBookingsLoading ? (
            <div className="text-center py-8 text-gray-500">Loading trips...</div>
          ) : bookings.length === 0 ? (
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
                  {bookings.map((booking) => (
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
      )}
    </div>
  );
}
