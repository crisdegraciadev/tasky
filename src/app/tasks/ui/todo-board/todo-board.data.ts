import { Task } from '@shared/types/task';

export const BACKLOG_DATA: Task[] = [
  {
    title: 'Develop a Website',
    description: 'Create a responsive website for a client',
    tags: [
      { value: 'Web Development', color: '#1976D2' },
      { value: 'Client Project', color: '#303F9F' }
    ],
    creationDate: new Date('2023-10-23'),
    expirationDate: new Date('2023-11-15')
  },
  {
    title: 'Bug Fixing',
    description: 'Fix critical bug in the mobile app',
    tags: [
      { value: 'Mobile App', color: '#D32F2F' },
      { value: 'Bug', color: '#D32F2F' }
    ],
    creationDate: new Date('2023-10-24'),
    expirationDate: new Date('2023-10-30')
  },
  {
    title: 'Data Analysis',
    description: 'Analyze sales data for the past quarter',
    tags: [
      { value: 'Data Analysis', color: '#1976D2' },
      { value: 'High Priority', color: '#D32F2F' }
    ],
    creationDate: new Date('2023-10-25'),
    expirationDate: new Date('2023-11-10')
  }
  // Add more tasks as needed
];

export const TODO_DATA: Task[] = [
  {
    title: 'Data Analysis',
    description: 'Analyze sales data for the past quarter',
    tags: [
      { value: 'Data Analysis', color: '#1976D2' },
      { value: 'High Priority', color: '#D32F2F' }
    ],
    creationDate: new Date('2023-10-25'),
    expirationDate: new Date('2023-11-10')
  }
];
