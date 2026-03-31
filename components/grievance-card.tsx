'use client';

import { Grievance, GrievanceStatus } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, X, Clock, Mail, Building, Tag, Calendar } from 'lucide-react';

interface GrievanceCardProps {
  grievance: Grievance;
  onStatusChange: (id: string, status: GrievanceStatus) => void;
}

export function GrievanceCard({ grievance, onStatusChange }: GrievanceCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{grievance.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {grievance.email}
            </div>
          </div>
          <StatusBadge status={grievance.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Building className="h-3.5 w-3.5" />
            <span>{grievance.department}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Tag className="h-3.5 w-3.5" />
            <span>{grievance.category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(grievance.createdAt)}</span>
          </div>
        </div>

        <div className="rounded-md bg-muted/50 p-3">
          <p className="text-sm text-foreground whitespace-pre-wrap">{grievance.message}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {grievance.status !== 'pending' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(grievance.id, 'pending')}
              className="gap-1.5"
            >
              <Clock className="h-3.5 w-3.5" />
              Mark Pending
            </Button>
          )}
          {grievance.status !== 'resolved' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(grievance.id, 'resolved')}
              className="gap-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
            >
              <Check className="h-3.5 w-3.5" />
              Mark Resolved
            </Button>
          )}
          {grievance.status !== 'rejected' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(grievance.id, 'rejected')}
              className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <X className="h-3.5 w-3.5" />
              Mark Rejected
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
