
export const courses = [
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

export const events = [
  { 
    id: '1', 
    title: 'Team Building Escape Room', 
    date: '2024-01-25', 
    participants: 12, 
    type: 'Team Building',
    description: 'Join your colleagues for an exciting escape room challenge! Work together to solve puzzles and build stronger team bonds.',
    location: 'Downtown Escape Rooms',
    duration: '2 hours',
    maxParticipants: 20
  },
  { 
    id: '2', 
    title: 'Tech Talk: AI in Practice', 
    date: '2024-01-30', 
    participants: 25, 
    type: 'Learning',
    description: 'Learn about the latest AI trends and how they are being implemented in real-world applications. Guest speaker from industry leaders.',
    location: 'Conference Room A',
    duration: '1.5 hours',
    maxParticipants: 50
  },
  { 
    id: '3', 
    title: 'Company Bowling Night', 
    date: '2024-02-05', 
    participants: 18, 
    type: 'Social',
    description: 'Relax and have fun with your teammates at our monthly bowling night. Food and drinks included!',
    location: 'Strike Zone Bowling',
    duration: '3 hours',
    maxParticipants: 30
  },
];
