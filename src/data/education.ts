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
    link: 'https://example.com/cert1',
  },
  {
    name: 'JavaScript AI App with OpenAI API',
    issuer: 'LinkedIn Learning',
    dateIssued: '2024',
    link: 'https://example.com/cert2',
  },
  {
    name: 'Practical GitHub Project Management',
    issuer: 'LinkedIn Learning',
    dateIssued: '2023',
    link: 'https://example.com/cert3',
  },
];

export default educationData;
