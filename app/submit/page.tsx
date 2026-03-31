import Link from 'next/link';
import { GrievanceForm } from '@/components/grievance-form';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Submit Grievance | Student Grievance Portal',
  description: 'Submit your grievance to the administration',
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <GrievanceForm />
      </main>
    </div>
  );
}
