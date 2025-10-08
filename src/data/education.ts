import type { Education } from '../types/profile';

export const educationData: Education[] = [
  {
    institution: 'Athena Institute',
    degree: 'Higher Diploma, Accounting & Business',
    location: 'Foggia, Italy',
    dateRange: '2010 - 2012',
    logo: '/assets/png/athena-logo.png',
  },
];

export const certifications = [
  {
    name: 'AWS Cloud Practitioner',
    issuer: 'Coursera',
    dateIssued: '2023',
  },
  {
    name: 'Build a JavaScript AI App with OpenAI API',
    issuer: 'LinkedIn Learning',
    dateIssued: '2024',
  },
  {
    name: 'Practical GitHub Project Management & Collaboration',
    issuer: 'LinkedIn Learning',
    dateIssued: '2023',
  },
];

export default educationData;
