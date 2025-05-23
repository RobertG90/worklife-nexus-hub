
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Calendar, Star, Search } from 'lucide-react';

export function EducationSection() {
  const [filter, setFilter] = useState('all');

  const courses = [
    { id: 1, title: 'Advanced React Development', category: 'Technical', duration: '6 weeks', rating: 4.8, enrolled: 45, nextStart: '2024-02-01' },
    { id: 2, title: 'Leadership Essentials', category: 'Management', duration: '4 weeks', rating: 4.9, enrolled: 32, nextStart: '2024-02-15' },
    { id: 3, title: 'Data Analysis with Python', category: 'Technical', duration: '8 weeks', rating: 4.7, enrolled: 28, nextStart: '2024-02-08' },
  ];

  const events = [
    { id: 1, title: 'Team Building Escape Room', date: '2024-01-25', participants: 12, type: 'Team Building' },
    { id: 2, title: 'Tech Talk: AI in Practice', date: '2024-01-30', participants: 25, type: 'Learning' },
    { id: 3, title: 'Company Bowling Night', date: '2024-02-05', participants: 18, type: 'Social' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Education & Social Activities</h1>
          <p className="text-gray-600">Learn, grow, and connect with your colleagues!</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Search courses and events..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            {['all', 'technical', 'management', 'social'].map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                onClick={() => setFilter(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Courses */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.duration}</p>
                    </div>
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolled} enrolled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Starts {course.nextStart}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full">Enroll Now</Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Social Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                      <p className="text-sm text-gray-500">{event.participants} participants</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{event.type}</Badge>
                      <Button size="sm" className="mt-2 w-full">Join Event</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Learning */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">My Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>React Fundamentals</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Team Leadership</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Learning Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Courses Completed</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours Learned</span>
                <span className="font-semibold">42h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Events Attended</span>
                <span className="font-semibold">15</span>
              </div>
            </div>
          </Card>

          {/* Organize Event */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Organize an Event</h3>
            <p className="text-sm text-gray-600 mb-4">
              Have an idea for a team activity? Submit your proposal!
            </p>
            <Button className="w-full" variant="outline">
              Propose Event
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
