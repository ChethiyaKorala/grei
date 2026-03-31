'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DEPARTMENTS, CATEGORIES } from '@/lib/types';
import { addGrievance } from '@/lib/grievance-store';
import { CheckCircle2 } from 'lucide-react';

export function GrievanceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    category: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a brief delay for better UX
    setTimeout(() => {
      addGrievance(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      department: '',
      category: '',
      message: '',
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-emerald-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Grievance Submitted Successfully
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Thank you for submitting your grievance. Our team will review it and take appropriate action. You will be contacted via email if needed.
            </p>
            <Button onClick={handleReset} variant="outline">
              Submit Another Grievance
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a Grievance</CardTitle>
        <CardDescription>
          Please fill out the form below to submit your grievance. All fields are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium text-foreground">
                Department
              </label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
                required
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-foreground">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Describe Your Grievance
            </label>
            <Textarea
              id="message"
              placeholder="Please provide details about your grievance..."
              className="min-h-[150px] resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.department || !formData.category}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
