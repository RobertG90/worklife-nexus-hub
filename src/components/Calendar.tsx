
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
}

interface CalendarProps {
  events: CalendarEvent[];
}

export function Calendar({ events }: CalendarProps) {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events scheduled.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <Card key={event.id} className="bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Start:</strong> {event.start.toLocaleDateString()}</p>
                    <p><strong>End:</strong> {event.end.toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
