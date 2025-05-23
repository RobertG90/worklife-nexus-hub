import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Users, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { events } from '@/data/educationData';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <Button onClick={() => navigate('/education')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Education
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to enroll.",
        variant: "destructive",
      });
      return;
    }

    setIsEnrolling(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Enrollment Successful!",
        description: `You've been enrolled in ${event.title}. Check your email for confirmation.`,
      });
      setIsEnrolling(false);
      setEmail('');
    }, 1000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Team Building':
        return 'bg-blue-100 text-blue-800';
      case 'Learning':
        return 'bg-green-100 text-green-800';
      case 'Social':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/education')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Education</span>
          </Button>
        </div>

        {/* Event Details */}
        <Card className="p-8">
          <div className="space-y-6">
            {/* Event Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {event.participants}/{event.maxParticipants}
                </div>
                <div className="text-sm text-gray-600">participants</div>
              </div>
            </div>

            {/* Event Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Date</div>
                  <div className="text-gray-600">{new Date(event.date).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Location</div>
                  <div className="text-gray-600">{event.location}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Duration</div>
                  <div className="text-gray-600">{event.duration}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Event</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Enrollment Form */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enroll in this Event</h3>
              <form onSubmit={handleEnroll} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="max-w-md"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isEnrolling || event.participants >= event.maxParticipants}
                  className="w-full md:w-auto"
                >
                  {isEnrolling ? 'Enrolling...' : event.participants >= event.maxParticipants ? 'Event Full' : 'Enroll Now'}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventDetails;
