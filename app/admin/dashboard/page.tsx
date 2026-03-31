'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthGuard } from '@/components/admin-auth-guard';
import { GrievanceCard } from '@/components/grievance-card';
import { Button } from '@/components/ui/button';
import { Grievance, GrievanceStatus } from '@/lib/types';
import {
  getGrievances,
  updateGrievanceStatus,
  setAdminAuthenticated,
} from '@/lib/grievance-store';
import { LogOut, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

type FilterStatus = 'all' | GrievanceStatus;

const filterOptions: { value: FilterStatus; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All', icon: <FileText className="h-4 w-4" /> },
  { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4" /> },
  { value: 'resolved', label: 'Resolved', icon: <CheckCircle className="h-4 w-4" /> },
  { value: 'rejected', label: 'Rejected', icon: <XCircle className="h-4 w-4" /> },
];

function DashboardContent() {
  const router = useRouter();
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    setGrievances(getGrievances());
  }, []);

  const handleStatusChange = (id: string, status: GrievanceStatus) => {
    updateGrievanceStatus(id, status);
    setGrievances(getGrievances());
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    router.push('/admin');
  };

  const filteredGrievances =
    filter === 'all'
      ? grievances
      : grievances.filter((g) => g.status === filter);

  const counts = {
    all: grievances.length,
    pending: grievances.filter((g) => g.status === 'pending').length,
    resolved: grievances.filter((g) => g.status === 'resolved').length,
    rejected: grievances.filter((g) => g.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage student grievances
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
                filter === option.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:bg-muted/50'
              }`}
            >
              <div
                className={`rounded-md p-2 ${
                  filter === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {option.icon}
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {counts[option.value]}
                </p>
                <p className="text-sm text-muted-foreground">{option.label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Grievances List */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-foreground">
            {filter === 'all' ? 'All Grievances' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Grievances`}
          </h2>

          {filteredGrievances.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-background p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No grievances found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {filter === 'all'
                  ? 'No grievances have been submitted yet.'
                  : `No ${filter} grievances at the moment.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredGrievances.map((grievance) => (
                <GrievanceCard
                  key={grievance.id}
                  grievance={grievance}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <DashboardContent />
    </AdminAuthGuard>
  );
}
