
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastContext } from '@/components/ui/toast-provider';

export interface TripBooking {
  id: string;
  user_id: string | null;
  trip_type: string;
  from_location: string;
  to_location: string;
  departure_date: string;
  return_date: string;
  purpose: string;
  preferred_time: string;
  accommodation: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useTripBookings() {
  const { toast } = useToastContext();
  const queryClient = useQueryClient();

  // Temporarily return empty data until the table is created
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['trip-bookings'],
    queryFn: async () => {
      // Return empty array until trip_bookings table is properly set up
      return [] as TripBooking[];
    },
  });

  const createBooking = useMutation({
    mutationFn: async (bookingData: {
      tripType: string;
      fromLocation: string;
      toLocation: string;
      departureDate: string;
      returnDate: string;
      purpose: string;
      preferredTime: string;
      accommodation: string;
    }) => {
      // Temporarily return mock data until table is created
      toast({
        title: 'Feature Coming Soon!',
        description: 'Trip booking functionality will be available once the database is set up.',
        variant: 'default'
      });
      return { id: 'temp-id' };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['recent-activities'] });
    },
    onError: (error) => {
      console.error('Error creating trip booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit trip request. Please try again.',
        variant: 'destructive'
      });
    },
  });

  return {
    bookings: bookings || [],
    isLoading,
    createBooking: createBooking.mutate,
    isCreating: createBooking.isPending,
  };
}
