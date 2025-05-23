
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, Star, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Mock course data - in a real app, this would come from your database
  const courses = [
    { 
      id: '1', 
      title: 'Advanced React Development', 
      category: 'Technical', 
      duration: '6 weeks', 
      rating: 4.8, 
      enrolled: 45, 
      nextStart: '2024-02-01',
      maxEnrollment: 50,
      description: 'Master advanced React concepts including hooks, context, performance optimization, and modern patterns. Learn to build scalable applications with TypeScript, testing, and state management libraries.',
      instructor: 'Sarah Johnson',
      level: 'Advanced',
      prerequisites: 'Basic React knowledge required'
    },
    { 
      id: '2', 
      title: 'Leadership Essentials', 
      category: 'Management', 
      duration: '4 weeks', 
      rating: 4.9, 
      enrolled: 32, 
      nextStart: '2024-02-15',
      maxEnrollment: 40,
      description: 'Develop essential leadership skills for managing teams and driving organizational success. Cover communication, delegation, conflict resolution, and strategic thinking.',
      instructor: 'Michael Chen',
      level: 'Intermediate',
      prerequisites: 'Management experience preferred'
    },
    { 
      id: '3', 
      title: 'Data Analysis with Python', 
      category: 'Technical', 
      duration: '8 weeks', 
      rating: 4.7, 
      enrolled: 28, 
      nextStart: '2024-02-08',
      maxEnrollment: 35,
      description: 'Learn to analyze data using Python libraries like Pandas, NumPy, and Matplotlib. Cover data cleaning, visualization, statistical analysis, and machine learning basics.',
      instructor: 'Dr. Emily Rodriguez',
      level: 'Beginner to Intermediate',
      prerequisites: 'Basic programming knowledge helpful'
    },
  ];

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
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
        description: `You've been enrolled in ${course.title}. Check your email for confirmation.`,
      });
      setIsEnrolling(false);
      setEmail('');
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'bg-blue-100 text-blue-800';
      case 'Management':
        return 'bg-green-100 text-green-800';
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

        {/* Course Details */}
        <Card className="p-8">
          <div className="space-y-6">
            {/* Course Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <p className="text-lg text-gray-600">Instructor: {course.instructor}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {course.enrolled}/{course.maxEnrollment}
                </div>
                <div className="text-sm text-gray-600">enrolled</div>
              </div>
            </div>

            {/* Course Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Duration</div>
                  <div className="text-gray-600">{course.duration}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Rating</div>
                  <div className="text-gray-600">{course.rating}/5</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Enrolled</div>
                  <div className="text-gray-600">{course.enrolled} students</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">Next Start</div>
                  <div className="text-gray-600">{course.nextStart}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Course</h3>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Prerequisites */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h3>
              <p className="text-gray-600">{course.prerequisites}</p>
            </div>

            {/* Enrollment Form */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enroll in this Course</h3>
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
                  disabled={isEnrolling || course.enrolled >= course.maxEnrollment}
                  className="w-full md:w-auto"
                >
                  {isEnrolling ? 'Enrolling...' : course.enrolled >= course.maxEnrollment ? 'Course Full' : 'Enroll Now'}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetails;
