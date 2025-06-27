
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Mic, BarChart3 } from 'lucide-react';
import PlanEvent from './PlanEvent';
import CaptureLead from './CaptureLead';
import VoiceNotes from './VoiceNotes';
import SalesforceSync from './SalesforceSync';

const MainApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Esper Event Assistant</h1>
          <p className="text-slate-600 text-lg">AI-powered event planning and lead management</p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="plan-event" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="plan-event" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Plan Event</span>
            </TabsTrigger>
            <TabsTrigger value="capture-lead" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Capture Lead</span>
            </TabsTrigger>
            <TabsTrigger value="voice-notes" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Voice Notes</span>
            </TabsTrigger>
            <TabsTrigger value="salesforce-sync" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Salesforce</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan-event">
            <PlanEvent />
          </TabsContent>

          <TabsContent value="capture-lead">
            <CaptureLead />
          </TabsContent>

          <TabsContent value="voice-notes">
            <VoiceNotes />
          </TabsContent>

          <TabsContent value="salesforce-sync">
            <SalesforceSync />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainApp;
