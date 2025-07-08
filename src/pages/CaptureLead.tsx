
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Save, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEventContext } from '@/contexts/EventContext';
import QuickCapture from '@/components/QuickCapture';

const CaptureLead = () => {
  const { toast } = useToast();
  const { currentEvent } = useEventContext();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    phone: '',
    notes: '',
    eventId: currentEvent?.id || ''
  });

  // Update eventId when currentEvent changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      eventId: currentEvent?.id || ''
    }));
  }, [currentEvent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuickCapture = (data: {
    name: string;
    company: string;
    title: string;
    email: string;
    phone: string;
  }) => {
    setFormData(prev => ({
      ...prev,
      ...data,
      eventId: currentEvent?.id || ''
    }));
    
    toast({
      title: "Data Captured!",
      description: "Business card data has been extracted and filled in the form.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in at least the name and email fields.",
        variant: "destructive",
      });
      return;
    }

    if (!currentEvent) {
      toast({
        title: "No Event Selected",
        description: "Please select an event in Settings before capturing leads.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save the lead to your database
    console.log('Saving lead:', { ...formData, eventId: currentEvent.id });
    
    toast({
      title: "Lead Captured!",
      description: `Lead saved and associated with "${currentEvent.name}".`,
    });

    // Reset form
    setFormData({
      name: '',
      company: '',
      title: '',
      email: '',
      phone: '',
      notes: '',
      eventId: currentEvent.id
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Event Status Banner */}
      {currentEvent ? (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Active Event: {currentEvent.name}
                </p>
                <p className="text-xs text-green-600">
                  All captured leads will be associated with this event
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  No Event Selected
                </p>
                <p className="text-xs text-yellow-600">
                  Please select an event in Settings to associate leads with it
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Capture Section */}
      <QuickCapture onDataExtracted={handleQuickCapture} />

      {/* Manual Lead Capture Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
            <User className="w-6 h-6 mr-2" />
            Manual Lead Capture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium text-slate-700">
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                  Job Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any additional notes about this lead..."
                className="mt-1 min-h-[100px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700"
              disabled={!currentEvent}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Lead
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaptureLead;
