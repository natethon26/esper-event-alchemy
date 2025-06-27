
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, Mic, Settings, FileText } from 'lucide-react';
import PlanEvent from './PlanEvent';
import CaptureLead from './CaptureLead';
import VoiceNotes from './VoiceNotes';
import SettingsPage from './SettingsPage';
import EventSummaries from './EventSummaries';

const MainApp = () => {
  return (
    <div className="min-h-screen" style={{ background: '#7f56d9' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Logo and Header */}
        <div className="mb-8 text-center">
          <div className="mb-4">
            <img 
              src="/placeholder.svg" 
              alt="Esper Logo" 
              className="h-16 mx-auto mb-4"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Esper Event Assistant</h1>
          <p className="text-white/90 text-lg">AI-powered event planning and lead management</p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="capture-lead" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="capture-lead" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Capture Lead</span>
            </TabsTrigger>
            <TabsTrigger value="voice-notes" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Voice Notes</span>
            </TabsTrigger>
            <TabsTrigger value="plan-event" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Plan Event</span>
            </TabsTrigger>
            <TabsTrigger value="event-summaries" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Event Summaries</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="capture-lead">
            <CaptureLead />
          </TabsContent>

          <TabsContent value="voice-notes">
            <VoiceNotes />
          </TabsContent>

          <TabsContent value="plan-event">
            <PlanEvent />
          </TabsContent>

          <TabsContent value="event-summaries">
            <EventSummaries />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainApp;
