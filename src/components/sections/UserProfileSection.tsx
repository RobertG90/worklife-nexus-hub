
import React from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, Calendar, MapPin, Building, BriefcaseBusiness, Award } from 'lucide-react';

export function UserProfileSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your personal information</p>
        </div>
        <NavigationButtons showBack={true} />
      </div>
      
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-12 gap-4">
            <Avatar className="h-24 w-24 border-4 border-white bg-white">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mt-2">John Doe</h2>
              <p className="text-gray-600">Software Engineer</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Profile Content */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="personal" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>Personal Info</span>
          </TabsTrigger>
          <TabsTrigger value="work" className="flex items-center">
            <BriefcaseBusiness className="w-4 h-4 mr-2" />
            <span>Work</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center">
            <Award className="w-4 h-4 mr-2" />
            <span>Skills</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Full Name</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">John Doe</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Email</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">john.doe@company.com</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Phone</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">+1 (555) 123-4567</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Date of Birth</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">January 15, 1988</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Address</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">123 Main Street, San Francisco, CA 94105</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Office</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">San Francisco HQ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Work Tab */}
        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle>Work Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <BriefcaseBusiness className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Department</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">Engineering</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Manager</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">Jane Smith</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Start Date</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">March 15, 2021</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Location</span>
                  </div>
                  <p className="text-base font-medium text-gray-900">San Francisco (Hybrid)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'CI/CD', 'Agile'].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Certifications</h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">AWS Certified Solutions Architect</h4>
                        <p className="text-sm text-gray-600">Amazon Web Services</p>
                      </div>
                      <span className="text-xs text-gray-500">2023</span>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Certified Scrum Master</h4>
                        <p className="text-sm text-gray-600">Scrum Alliance</p>
                      </div>
                      <span className="text-xs text-gray-500">2022</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
