import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { eventsData, coursesData } from '@/data/education';
import { Link } from 'react-router-dom';
import { NavigationButtons } from '@/components/NavigationButtons';

export function EducationSection() {
  const [activeTab, setActiveTab] = useState('events');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Education & Social Events</h1>
          <p className="text-gray-600 mt-1">Discover learning opportunities and team activities</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventsData.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}>
                <Card className="bg-white hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
                    <CardDescription className="text-gray-500">{event.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{event.description}</p>
                    <Button variant="secondary" className="mt-4">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Event
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesData.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`}>
                <Card className="bg-white hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                    <CardDescription className="text-gray-500">{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{course.description}</p>
                    <Button variant="secondary" className="mt-4">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
