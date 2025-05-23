
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, Monitor, Mic2, Clock, Users } from 'lucide-react';

export function BookingSection() {
  const [selectedAsset, setSelectedAsset] = useState('car');

  const assets = [
    { id: 'car', name: 'Company Car', icon: Car, available: 2, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 'room', name: 'Meeting Rooms', icon: Users, available: 3, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 'projector', name: 'Projectors', icon: Monitor, available: 5, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 'speakers', name: 'Portable Speakers', icon: Mic2, available: 8, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const myBookings = [
    { id: 1, asset: 'Company Car #1', date: '2024-01-25', time: '09:00 - 17:00', status: 'confirmed' },
    { id: 2, asset: 'Conference Room A', date: '2024-01-30', time: '14:00 - 16:00', status: 'pending' },
    { id: 3, asset: 'Projector #3', date: '2024-02-05', time: '10:00 - 12:00', status: 'confirmed' },
  ];

  const availableSlots = [
    { time: '09:00 - 11:00', available: true },
    { time: '11:00 - 13:00', available: false },
    { time: '13:00 - 15:00', available: true },
    { time: '15:00 - 17:00', available: true },
    { time: '17:00 - 19:00', available: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Internal Asset Booking</h1>
          <p className="text-gray-600">Reserve company resources for your projects and meetings!</p>
        </div>
      </div>

      {/* Asset Selection */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Asset Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assets.map((asset) => {
            const Icon = asset.icon;
            return (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={`p-4 rounded-lg border text-center transition-all hover:shadow-md ${
                  selectedAsset === asset.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 ${asset.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-6 h-6 ${asset.color}`} />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{asset.name}</h3>
                <p className="text-sm text-gray-600">{asset.available} available</p>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Make a Reservation</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>4 hours</option>
                    <option>Full day</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Available Time Slots</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        slot.available
                          ? 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                          : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{slot.time}</span>
                        <Badge 
                          variant={slot.available ? 'default' : 'secondary'}
                          className={slot.available ? 'bg-green-100 text-green-800' : ''}
                        >
                          {slot.available ? 'Available' : 'Booked'}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                <Input placeholder="What will you use this for?" />
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-indigo-500">📋</div>
                  <div>
                    <h4 className="font-medium text-indigo-900">Smart Scheduling</h4>
                    <p className="text-sm text-indigo-700 mt-1">
                      Our system automatically checks conflicts and suggests optimal time slots 
                      based on your calendar and asset availability.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Reserve Asset
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Rules */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Booking Guidelines</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Book up to 30 days in advance</span>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Max 8 hours per day per asset</span>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Cancel at least 2 hours before</span>
              </div>
            </div>
          </Card>

          {/* Popular Assets */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Most Popular</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conference Room A</span>
                <span className="text-gray-900">85% utilization</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Company Car #1</span>
                <span className="text-gray-900">72% utilization</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Projector #2</span>
                <span className="text-gray-900">68% utilization</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Booking Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">This Month</span>
                <Badge variant="secondary">8 bookings</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Favorite Asset</span>
                <span className="text-gray-900">Meeting Rooms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">On-time Returns</span>
                <Badge className="bg-green-100 text-green-800">100%</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* My Bookings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Upcoming Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Asset</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{booking.asset}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.date}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.time}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                    >
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button size="sm" variant="outline">Modify</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
