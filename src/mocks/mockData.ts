export const mockData = {
  sick_leave_requests: [
    {
      id: '1',
      start_date: '2024-03-20',
      end_date: '2024-03-22',
      status: 'pending',
      leave_type: 'sick',
      reason: 'Flu',
      created_at: '2024-03-19T10:00:00Z',
      updated_at: '2024-03-19T10:00:00Z',
      user_id: null
    },
    {
      id: '2',
      start_date: '2024-03-15',
      end_date: '2024-03-16',
      status: 'approved',
      leave_type: 'personal',
      reason: 'Family event',
      created_at: '2024-03-14T15:30:00Z',
      updated_at: '2024-03-14T15:30:00Z',
      user_id: null
    }
  ],
  travel_expenses: [
    {
      id: '1',
      trip_destination: 'New York',
      trip_purpose: 'Client Meeting',
      start_date: '2024-03-25',
      end_date: '2024-03-27',
      expense_type: 'flight',
      amount: 450.00,
      currency: 'USD',
      description: 'Round-trip flight tickets',
      receipt_url: null,
      status: 'pending',
      created_at: '2024-03-18T09:00:00Z',
      updated_at: '2024-03-18T09:00:00Z',
      user_id: null
    }
  ],
  trip_bookings: [
    {
      id: '1',
      trip_type: 'business',
      from_location: 'San Francisco',
      to_location: 'Seattle',
      departure_date: '2024-04-01',
      return_date: '2024-04-03',
      purpose: 'Team Workshop',
      preferred_time: 'morning',
      accommodation: 'Hotel',
      status: 'confirmed',
      created_at: '2024-03-17T14:20:00Z',
      updated_at: '2024-03-17T14:20:00Z',
      user_id: null
    }
  ]
}; 