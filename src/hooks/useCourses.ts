
import { useQuery } from '@tanstack/react-query';
import { courses } from '@/data/educationData';

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: number;
  enrolled: number;
  nextStart: string;
  maxEnrollment: number;
  description: string;
  instructor: string;
  level: string;
  prerequisites: string;
}

export function useCourses() {
  const { data: coursesData, isLoading, isError, error } = useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<Course[]> => {
      // Using mock data since we don't have a real courses table
      return courses;
    },
  });

  const getCourseById = (id: string): Course | undefined => {
    return coursesData?.find(course => course.id === id);
  };

  return {
    courses: coursesData || [],
    isLoading,
    isError,
    error,
    getCourseById,
  };
}
