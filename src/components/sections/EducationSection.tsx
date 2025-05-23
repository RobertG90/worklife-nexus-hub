
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Calendar, Star, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courses, events } from '@/data/educationData';

export function EducationSection() {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleCourseEnroll = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Education & Social Activities</h1>
          <p className="text-gray-600 text-sm sm:text-base mt-1">Learn, grow, and connect with your colleagues!</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input placeholder="Search courses and events..." className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'technical', 'management', 'social'].map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                onClick={() => setFilter(category)}
                className="capitalize text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Available Courses and Events */}
        <div className="xl:col-span-2 space-y-6">
          {/* Available Courses */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Available Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{course.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{course.duration}</p>
                    </div>
                    <Badge variant="secondary" className="self-start text-xs">{course.category}</Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{course.enrolled} enrolled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Starts {course.nextStart}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full text-xs sm:text-sm"
                    onClick={() => handleCourseEnroll(course.id)}
                  >
                    Enroll Now
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Upcoming Social Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleEventClick(event.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm sm:text-base">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{event.date}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{event.participants} participants</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <Badge variant="outline" className="self-start sm:self-end text-xs">{event.type}</Badge>
                      <Button 
                        size="sm" 
                        className="w-full sm:w-auto text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event.id);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* My Learning */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">My Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="truncate pr-2">React Fundamentals</span>
                  <span className="flex-shrink-0">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="truncate pr-2">Team Leadership</span>
                  <span className="flex-shrink-0">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Stats */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Learning Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Courses Completed</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Hours Learned</span>
                <span className="font-semibold">42h</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Events Attended</span>
                <span className="font-semibold">15</span>
              </div>
            </div>
          </Card>

          {/* Organize Event */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Organize an Event</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Have an idea for a team activity? Submit your proposal!
            </p>
            <Button className="w-full text-xs sm:text-sm" variant="outline" size="sm">
              Propose Event
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
