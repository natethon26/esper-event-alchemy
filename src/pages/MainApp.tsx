
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
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Logo and Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="mb-4">
            <img 
              src="/lovable-uploads/480e1165-d81a-467d-b2e8-f48e81aba5a5.png" 
              alt="Esper Logo" 
              className="h-12 sm:h-16 mx-auto mb-4"
            />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-black">Esper Event Assistant</h1>
          <p className="text-sm sm:text-lg text-black">AI-powered event planning and lead management</p>
        </div>

        {/* Main Tabs */}
        <div className="shadow-2xl rounded-lg">
          <Tabs defaultValue="capture-lead" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6 sm:mb-8 h-auto">
              <TabsTrigger value="capture-lead" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <User className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Capture Lead</span>
              </TabsTrigger>
              <TabsTrigger value="voice-notes" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <Mic className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Voice Notes</span>
              </TabsTrigger>
              <TabsTrigger value="plan-event" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Plan Event</span>
              </TabsTrigger>
              <TabsTrigger value="event-summaries" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <FileText className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Event Summaries</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <Settings className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Settings</span>
              </TabsTrigger>
            </TabsList>

            <div className="shadow-lg rounded-lg bg-white overflow-hidden">
              <TabsContent value="capture-lead" className="p-0">
                <CaptureLead />
              </TabsContent>

              <TabsContent value="voice-notes" className="p-0">
                <VoiceNotes />
              </TabsContent>

              <TabsContent value="plan-event" className="p-0">
                <PlanEvent />
              </TabsContent>

              <TabsContent value="event-summaries" className="p-0">
                <EventSummaries />
              </TabsContent>

              <TabsContent value="settings" className="p-0">
                <SettingsPage />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
