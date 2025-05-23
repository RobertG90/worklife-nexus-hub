import React from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export function BookingSection() {
  // Placeholder data for available assets
  const assets = [
    { id: 1, name: 'Conference Room A', type: 'Room', capacity: 20 },
    { id: 2, name: 'Company Car - Toyota Camry', type: 'Vehicle' },
    { id: 3, name: 'Projector - Epson', type: 'Equipment' },
  ];

  // Placeholder function to handle booking request
  const handleBooking = (assetId: number) => {
    alert(`Booking requested for asset ID: ${assetId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Booking</h1>
          <p className="text-gray-600 mt-1">Reserve company resources and vehicles</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{asset.name}</CardTitle>
              <CardDescription className="text-gray-500">{asset.type}</CardDescription>
            </CardHeader>
            <CardContent>
              {asset.capacity && <p>Capacity: {asset.capacity}</p>}
              <button
                onClick={() => handleBooking(asset.id)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Book Now
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
