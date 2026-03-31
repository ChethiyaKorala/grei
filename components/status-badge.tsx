import { cn } from '@/lib/utils';
import { GrievanceStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: GrievanceStatus;
  className?: string;
}

const statusConfig: Record<
  GrievanceStatus,
  { label: string; className: string }
> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
