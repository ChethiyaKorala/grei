import { Grievance, GrievanceStatus } from './types';

const STORAGE_KEY = 'grievances';

export function getGrievances(): Grievance[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addGrievance(
  grievance: Omit<Grievance, 'id' | 'status' | 'createdAt'>
): Grievance {
  const grievances = getGrievances();
  const newGrievance: Grievance = {
    ...grievance,
    id: crypto.randomUUID(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  grievances.unshift(newGrievance);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(grievances));
  return newGrievance;
}

export function updateGrievanceStatus(
  id: string,
  status: GrievanceStatus
): Grievance | null {
  const grievances = getGrievances();
  const index = grievances.findIndex((g) => g.id === id);
  if (index === -1) return null;
  grievances[index].status = status;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(grievances));
  return grievances[index];
}

export function getGrievancesByStatus(status: GrievanceStatus): Grievance[] {
  return getGrievances().filter((g) => g.status === status);
}

// Admin auth helpers
const AUTH_KEY = 'admin_authenticated';
const DEFAULT_PASSWORD = 'admin123';

export function checkAdminPassword(password: string): boolean {
  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || DEFAULT_PASSWORD;
  return password === correctPassword;
}

export function setAdminAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return;
  if (value) {
    sessionStorage.setItem(AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}
