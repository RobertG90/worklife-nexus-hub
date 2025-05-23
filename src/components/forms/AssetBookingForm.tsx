
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Car, Monitor, Home } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToastContext } from '@/components/ui/toast-provider';

interface Asset {
  id: number;
  name: string;
  type: 'Room' | 'Vehicle' | 'Equipment';
  capacity?: number;
  available: boolean;
  location?: string;
}

interface AssetBookingFormProps {
  asset: Asset;
  onClose: () => void;
}

export function AssetBookingForm({ asset, onClose }: AssetBookingFormProps) {
  const { toast } = useToastContext();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    purpose: '',
    notes: ''
  });

  const createBooking = useMutation({
    mutationFn: async (bookingData: typeof formData) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('trip_bookings')
        .insert({
          user_id: user?.id || null,
          trip_type: `${asset.type} Booking`,
          from_location: asset.location || 'Office',
          to_location: asset.name,
          departure_date: bookingData.startDate,
          return_date: bookingData.endDate,
          purpose: bookingData.purpose,
          preferred_time: `${bookingData.startTime} - ${bookingData.endTime}`,
          accommodation: bookingData.notes || 'N/A',
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trip-bookings'] });
      toast({
        title: 'Booking Submitted!',
        description: `Your ${asset.type.toLowerCase()} booking request has been submitted for approval.`,
        variant: 'default'
      });
      onClose();
    },
    onError: (error) => {
      console.error('Booking error:', error);
      toast({
        title: 'Booking Failed',
        description: 'Failed to submit booking request. Please try again.',
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.purpose) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    createBooking.mutate(formData);
  };

  const getAssetIcon = () => {
    switch (asset.type) {
      case 'Room': return <Home className="w-5 h-5" />;
      case 'Vehicle': return <Car className="w-5 h-5" />;
      case 'Equipment': return <Monitor className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getAssetIcon()}
          <span>Book {asset.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date *</label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date *</label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <Input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <Input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Purpose *</label>
            <Input
              placeholder="Meeting, presentation, transport, etc."
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Additional Notes</label>
            <Input
              placeholder="Special requirements or additional information"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={createBooking.isPending}
            >
              {createBooking.isPending ? 'Submitting...' : 'Submit Booking'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
