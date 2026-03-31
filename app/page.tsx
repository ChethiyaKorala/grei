import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Shield, Clock, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Easy Submission',
    description: 'Submit your grievances through a simple and intuitive form.',
  },
  {
    icon: Shield,
    title: 'Secure & Confidential',
    description: 'Your information is handled with care and confidentiality.',
  },
  {
    icon: Clock,
    title: 'Track Progress',
    description: 'Admins review and update the status of each grievance.',
  },
  {
    icon: CheckCircle,
    title: 'Resolution Focused',
    description: 'We are committed to addressing and resolving your concerns.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1.5">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Grievance Portal</span>
          </div>
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              Admin Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center lg:py-24">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Student Grievance Portal
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Have a concern or complaint? We are here to listen. Submit your grievance and our administration will review and address it promptly.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/submit">
              <Button size="lg" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Submit a Grievance
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-muted-foreground">
              A simple process to get your concerns heard and addressed
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Ready to Submit Your Grievance?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Your voice matters. Let us know how we can help.
          </p>
          <Link href="/submit">
            <Button className="mt-6" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Student Grievance Portal - All grievances are handled confidentially.</p>
        </div>
      </footer>
    </div>
  );
}
