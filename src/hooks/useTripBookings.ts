
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['trip-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trip_bookings')
        .select('*')
        .order('departure_date', { ascending: true });
      
      if (error) throw error;
      return (data as unknown) as TripBooking[];
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
      const { data, error } = await supabase
        .from('trip_bookings')
        .insert({
          trip_type: bookingData.tripType,
          from_location: bookingData.fromLocation,
          to_location: bookingData.toLocation,
          departure_date: bookingData.departureDate,
          return_date: bookingData.returnDate,
          purpose: bookingData.purpose,
          preferred_time: bookingData.preferredTime,
          accommodation: bookingData.accommodation,
          status: 'pending',
          user_id: null, // No authentication required
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['recent-activities'] });
      toast({
        title: 'Success!',
        description: 'Your trip request has been submitted successfully.',
        variant: 'success'
      });
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
