
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, User, ExternalLink, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEventContext } from '@/contexts/EventContext';
import BusinessCardScanner from '@/components/BusinessCardScanner';
import SalesforceContactSearch from '@/components/SalesforceContactSearch';
import SalesforceCompanySearch from '@/components/SalesforceCompanySearch';
import CompanyOverview from '@/components/CompanyOverview';
import ContactSummary from '@/components/ContactSummary';

const CaptureLead = () => {
  const { toast } = useToast();
  const { eventBriefs, currentEvent, setCurrentEvent } = useEventContext();
  const [salesforceContactId, setSalesforceContactId] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [companyContactId, setCompanyContactId] = useState('');
  const [leadData, setLeadData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    phone: '',
    notes: '',
    priority: 'medium',
    source: 'booth-visit',
    eventId: currentEvent?.id || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setLeadData(prev => ({ ...prev, [field]: value }));
  };

  const handleEventChange = (eventId: string) => {
    const selectedEvent = eventBriefs.find(event => event.id === eventId);
    setCurrentEvent(selectedEvent || null);
    setLeadData(prev => ({ ...prev, eventId }));
  };

  const handleBusinessCardData = (extractedData: {
    name: string;
    company: string;
    title: string;
    email: string;
    phone: string;
  }) => {
    setLeadData(prev => ({
      ...prev,
      ...extractedData
    }));
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

    const leadWithSalesforce = {
      ...leadData,
      salesforceContactId: salesforceContactId || undefined
    };

    toast({
      title: "Lead Captured!",
      description: `Lead has been saved${currentEvent ? ` for ${currentEvent.name}` : ''}${salesforceContactId ? ' and linked to Salesforce contact' : ''}.`,
    });

    setLeadData({
      name: '',
      company: '',
      title: '',
      email: '',
      phone: '',
      notes: '',
      priority: 'medium',
      source: 'booth-visit',
      eventId: currentEvent?.id || ''
    });
    setSalesforceContactId('');
    setSelectedCompanyId('');
    setCompanyContactId('');
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Event Selection */}
      {eventBriefs.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Select Event</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={leadData.eventId} onValueChange={handleEventChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an event for this lead" />
              </SelectTrigger>
              <SelectContent>
                {eventBriefs.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentEvent && (
              <p className="text-sm text-slate-600 mt-2">
                Selected: {currentEvent.name}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Company Search Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600" />
            Company Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 block">
                Salesforce Company Search
              </Label>
              <SalesforceCompanySearch
                value={selectedCompanyId}
                onValueChange={setSelectedCompanyId}
                placeholder="Search for companies in Salesforce..."
              />
            </div>
            
            {selectedCompanyId && (
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Company Contacts
                </Label>
                <SalesforceContactSearch
                  value={companyContactId}
                  onValueChange={setCompanyContactId}
                  placeholder="Search contacts for this company..."
                />
              </div>
            )}
          </div>

          {selectedCompanyId && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Company Overview
                </Label>
                <CompanyOverview companyId={selectedCompanyId} />
              </div>
              
              {companyContactId && (
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    Contact Summary
                  </Label>
                  <ContactSummary contactId={companyContactId} />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Salesforce Integration */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
            Salesforce Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 block">
                Link to Salesforce Contact
              </Label>
              <SalesforceContactSearch
                value={salesforceContactId}
                onValueChange={setSalesforceContactId}
                placeholder="Search for existing contact..."
              />
            </div>
            <p className="text-sm text-slate-600">
              Link this lead to an existing Salesforce contact for better lead management and follow-up.
            </p>
            {salesforceContactId && (
              <Badge variant="outline" className="text-xs w-fit">
                <ExternalLink className="w-3 h-3 mr-1" />
                Linked to SF Contact: {salesforceContactId}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business Card Scanner */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Quick Capture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <BusinessCardScanner onDataExtracted={handleBusinessCardData} />
            
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
  );
};

export default CaptureLead;
