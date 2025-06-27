
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera, User, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CaptureLead = () => {
  const { toast } = useToast();
  const [leadData, setLeadData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    phone: '',
    notes: '',
    priority: 'medium',
    source: 'booth-visit'
  });

  const handleInputChange = (field: string, value: string) => {
    setLeadData(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessCardScan = () => {
    // Simulate business card scanning
    toast({
      title: "Business Card Scanned",
      description: "Processing card data using AI...",
    });
    
    setTimeout(() => {
      setLeadData(prev => ({
        ...prev,
        name: "John Smith",
        company: "TechCorp Industries",
        title: "IT Director",
        email: "j.smith@techcorp.com",
        phone: "+1 (555) 123-4567"
      }));
      
      toast({
        title: "Data Extracted",
        description: "Business card information has been automatically filled in.",
      });
    }, 2000);
  };

  const handleSaveLead = () => {
    if (!leadData.name || !leadData.company) {
      toast({
        title: "Missing Information",
        description: "Please provide at least name and company information.",
        variant: "destructive",
      });
      return;
    }

    // Simulate saving to database
    toast({
      title: "Lead Captured!",
      description: "Lead has been saved and will be synced to Salesforce.",
    });

    // Reset form
    setLeadData({
      name: '',
      company: '',
      title: '',
      email: '',
      phone: '',
      notes: '',
      priority: 'medium',
      source: 'booth-visit'
    });
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Capture Lead</h1>
          <p className="text-slate-600">Quickly capture and categorize event leads</p>
        </div>

        {/* Business Card Scanner */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Quick Capture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleBusinessCardScan}
                variant="outline" 
                className="p-6 h-auto flex-col space-y-2 hover:bg-blue-50"
              >
                <Camera className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium">Scan Business Card</span>
                <span className="text-xs text-slate-500">Auto-fill contact info</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="p-6 h-auto flex-col space-y-2 hover:bg-teal-50"
              >
                <Upload className="w-8 h-8 text-teal-600" />
                <span className="text-sm font-medium">Upload Badge Photo</span>
                <span className="text-xs text-slate-500">Extract name badge data</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lead Information Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Lead Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name *</Label>
                <Input
                  id="name"
                  value={leadData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter contact name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-sm font-medium text-slate-700">Company *</Label>
                <Input
                  id="company"
                  value={leadData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Company name"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">Job Title</Label>
              <Input
                id="title"
                value={leadData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., IT Director, CISO"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={leadData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@company.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone</Label>
                <Input
                  id="phone"
                  value={leadData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-slate-700">Conversation Notes</Label>
              <Textarea
                id="notes"
                value={leadData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Key points from conversation, pain points, interests..."
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700">Priority Level</Label>
                <div className="flex space-x-2 mt-2">
                  {(['high', 'medium', 'low'] as const).map((priority) => (
                    <button
                      key={priority}
                      onClick={() => handleInputChange('priority', priority)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        leadData.priority === priority
                          ? `${priorityColors[priority]} text-white`
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-slate-700">Lead Source</Label>
                <div className="flex space-x-2 mt-2">
                  {(['booth-visit', 'speaking-session', 'networking'] as const).map((source) => (
                    <button
                      key={source}
                      onClick={() => handleInputChange('source', source)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        leadData.source === source
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {source.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={handleSaveLead}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <User className="w-4 h-4 mr-2" />
                Save Lead
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaptureLead;
