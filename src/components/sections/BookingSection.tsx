
import React, { useState } from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Car, Monitor, Home, MapPin, Users, Clock } from 'lucide-react';
import { AssetBookingForm } from '@/components/forms/AssetBookingForm';

interface Asset {
  id: number;
  name: string;
  type: 'Room' | 'Vehicle' | 'Equipment';
  capacity?: number;
  available: boolean;
  location?: string;
  description?: string;
}

export function BookingSection() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Enhanced asset data with more realistic information
  const assets: Asset[] = [
    { 
      id: 1, 
      name: 'Conference Room A', 
      type: 'Room', 
      capacity: 20, 
      available: true,
      location: 'Floor 2, East Wing',
      description: 'Large conference room with projector and whiteboard'
    },
    { 
      id: 2, 
      name: 'Conference Room B', 
      type: 'Room', 
      capacity: 8, 
      available: true,
      location: 'Floor 1, West Wing',
      description: 'Small meeting room for team discussions'
    },
    { 
      id: 3, 
      name: 'Company Car - Toyota Camry', 
      type: 'Vehicle', 
      available: true,
      location: 'Parking Level B1',
      description: 'Sedan for business trips and client visits'
    },
    { 
      id: 4, 
      name: 'Company Van - Ford Transit', 
      type: 'Vehicle', 
      available: false,
      location: 'Parking Level B1',
      description: 'Large van for team outings and equipment transport'
    },
    { 
      id: 5, 
      name: 'Projector - Epson Pro', 
      type: 'Equipment', 
      available: true,
      location: 'Equipment Room',
      description: 'High-resolution projector for presentations'
    },
    { 
      id: 6, 
      name: 'Laptop - MacBook Pro', 
      type: 'Equipment', 
      available: true,
      location: 'IT Department',
      description: 'Temporary laptop for visitors and contractors'
    },
  ];

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'Room': return <Home className="w-6 h-6 text-blue-600" />;
      case 'Vehicle': return <Car className="w-6 h-6 text-green-600" />;
      case 'Equipment': return <Monitor className="w-6 h-6 text-purple-600" />;
      default: return <Calendar className="w-6 h-6 text-gray-600" />;
    }
  };

  const getAssetColor = (type: string) => {
    switch (type) {
      case 'Room': return 'from-blue-100 to-blue-200';
      case 'Vehicle': return 'from-green-100 to-green-200';
      case 'Equipment': return 'from-purple-100 to-purple-200';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Booking</h1>
          <p className="text-gray-600 mt-1">Reserve company resources, rooms, and vehicles</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Home className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Meeting Rooms</p>
                <p className="text-2xl font-bold text-blue-800">
                  {assets.filter(a => a.type === 'Room' && a.available).length}/{assets.filter(a => a.type === 'Room').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Car className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600 font-medium">Vehicles</p>
                <p className="text-2xl font-bold text-green-800">
                  {assets.filter(a => a.type === 'Vehicle' && a.available).length}/{assets.filter(a => a.type === 'Vehicle').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Monitor className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Equipment</p>
                <p className="text-2xl font-bold text-purple-800">
                  {assets.filter(a => a.type === 'Equipment' && a.available).length}/{assets.filter(a => a.type === 'Equipment').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className={`bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 ${!asset.available ? 'opacity-75' : ''}`}>
            <CardHeader className={`bg-gradient-to-r ${getAssetColor(asset.type)} rounded-t-xl`}>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getAssetIcon(asset.type)}
                  <span className="text-lg font-semibold text-gray-800">{asset.name}</span>
                </div>
                <Badge variant={asset.available ? 'default' : 'secondary'} className={asset.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {asset.available ? 'Available' : 'Booked'}
                </Badge>
              </CardTitle>
              <CardDescription className="text-gray-700 font-medium">{asset.type}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {asset.capacity && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {asset.capacity} people</span>
                  </div>
                )}
                {asset.location && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{asset.location}</span>
                  </div>
                )}
                {asset.description && (
                  <p className="text-sm text-gray-600">{asset.description}</p>
                )}
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full mt-4 ${asset.available 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!asset.available}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {asset.available ? 'Book Now' : 'Not Available'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Book Asset</span>
                    </DialogTitle>
                  </DialogHeader>
                  {selectedAsset && (
                    <AssetBookingForm 
                      asset={selectedAsset} 
                      onClose={() => setSelectedAsset(null)} 
                    />
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Information</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• All bookings require approval from the facilities team</p>
                <p>• You'll receive an email confirmation once approved</p>
                <p>• Cancellations must be made at least 2 hours in advance</p>
                <p>• For urgent requests, contact facilities directly</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
