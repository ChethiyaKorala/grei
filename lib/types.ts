export interface Grievance {
  id: string;
  name: string;
  email: string;
  department: string;
  category: string;
  message: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: string;
}

export const DEPARTMENTS = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Other',
] as const;

export const CATEGORIES = [
  'Academic',
  'Facilities',
  'Administration',
  'Faculty',
  'Fees/Financial',
  'Other',
] as const;

export type Department = (typeof DEPARTMENTS)[number];
export type Category = (typeof CATEGORIES)[number];
export type GrievanceStatus = Grievance['status'];
