
import { useQuery } from '@tanstack/react-query';
import { events } from '@/data/educationData';

export interface Event {
  id: string;
  title: string;
  date: string;
  participants: number;
  type: string;
  description: string;
  location: string;
  duration: string;
  maxParticipants: number;
}

export function useEvents() {
  const { data: eventsData, isLoading, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: async (): Promise<Event[]> => {
      // Using mock data since we don't have a real events table
      return events;
    },
  });

  const getEventById = (id: string): Event | undefined => {
    return eventsData?.find(event => event.id === id);
  };

  return {
    events: eventsData || [],
    isLoading,
    isError,
    error,
    getEventById,
  };
}
