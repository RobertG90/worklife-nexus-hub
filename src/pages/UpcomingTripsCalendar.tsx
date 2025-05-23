
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { NavigationButtons } from '@/components/NavigationButtons';

export default function UpcomingTripsCalendar() {
  // Mock data for upcoming trips
  const events = [
    {
      id: '1',
      title: 'Business Trip to New York',
      start: new Date('2024-07-15'),
      end: new Date('2024-07-20'),
      location: 'New York, USA',
    },
    {
      id: '2',
      title: 'Conference in San Francisco',
      start: new Date('2024-08-01'),
      end: new Date('2024-08-05'),
      location: 'San Francisco, USA',
    },
    {
      id: '3',
      title: 'Team Retreat in Miami',
      start: new Date('2024-09-10'),
      end: new Date('2024-09-14'),
      location: 'Miami, USA',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Upcoming Trips Calendar</h1>
            <p className="text-gray-600 mt-1">View and manage your upcoming business trips</p>
          </div>
          <NavigationButtons showCalendar={false} />
        </div>
        
        {/* Calendar */}
        <div className="bg-white shadow overflow-hidden rounded-md p-6">
          <Calendar mode="single" className="rounded-md border" />
          
          {/* Events List */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-500">
                    {event.start.toLocaleDateString()} - {event.end.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
