import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Mic, Square, Play, Download, UserPlus, ExternalLink, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEventContext } from '@/contexts/EventContext';
import AdminAuth from '@/components/AdminAuth';
import SalesforceContactSearch from '@/components/SalesforceContactSearch';

const VoiceNotes = () => {
  const { toast } = useToast();
  const { eventBriefs, currentEvent, setCurrentEvent } = useEventContext();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(currentEvent?.id || '');
  const [salesforceContactId, setSalesforceContactId] = useState('');
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      title: "Follow-up with TechCorp",
      transcript: "Great conversation with John Smith from TechCorp. They're interested in our zero-touch provisioning for their 500 Android tablets. Need to schedule a demo next week. Budget approved for Q2.",
      summary: "High-priority lead: TechCorp needs zero-touch provisioning for 500 tablets, demo scheduled, Q2 budget approved.",
      tags: ["high-priority", "demo-request", "enterprise"],
      duration: "2:34",
      timestamp: "2 hours ago",
      eventId: currentEvent?.id || '',
      salesforceContactId: ''
    },
    {
      id: 2,
      title: "Competitor intel - VMware booth",
      transcript: "Walked by VMware booth. They're heavily promoting their new unified endpoint management features. Saw quite a crowd, but their demo seemed to struggle with the setup process.",
      summary: "Competitor insight: VMware promoting UEM features but having demo issues. Opportunity to highlight Esper's ease of setup.",
      tags: ["competitor-intel", "vmware", "opportunity"],
      duration: "1:12",
      timestamp: "4 hours ago",
      eventId: currentEvent?.id || '',
      salesforceContactId: ''
    }
  ]);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleEventChange = (eventId: string) => {
    const selectedEvent = eventBriefs.find(event => event.id === eventId);
    setCurrentEvent(selectedEvent || null);
    setSelectedEventId(eventId);
  };

  const handleAdminAccess = () => {
    if (isAdminAuthorized) {
      setIsAdminAuthorized(false);
      toast({
        title: "Admin Access Revoked",
        description: "Salesforce integration features are now hidden.",
      });
    } else {
      setShowAdminAuth(true);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    toast({
      title: "Recording Started",
      description: "Speak clearly into your microphone.",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    toast({
      title: "Processing Recording",
      description: "Transcribing and analyzing your voice note...",
    });

    setTimeout(() => {
      const newRecording = {
        id: recordings.length + 1,
        title: "New voice note",
        transcript: "This is a sample transcription of your voice note. The AI has processed your speech and converted it to text with high accuracy.",
        summary: "AI-generated summary of the key points from your voice note.",
        tags: ["new", "untagged"],
        duration: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`,
        timestamp: "Just now",
        eventId: selectedEventId,
        salesforceContactId: ''
      };
      
      setRecordings(prev => [newRecording, ...prev]);
      setRecordingTime(0);
      
      toast({
        title: "Voice Note Saved",
        description: `Your note has been transcribed and summarized${currentEvent ? ` for ${currentEvent.name}` : ''}.`,
      });
    }, 3000);
  };

  const handleExportToDrive = () => {
    toast({
      title: "Exporting to Google Drive",
      description: "Generating voice notes export and uploading to Google Drive...",
    });

    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Voice notes have been exported and uploaded to your Google Drive folder.",
      });
    }, 2500);
  };

  const handleAttachToSalesforce = (recordingId: number) => {
    if (!salesforceContactId) {
      toast({
        title: "Contact Required",
        description: "Please select a Salesforce contact to attach the voice note.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Attaching to Salesforce",
      description: "Attaching voice note to selected Salesforce contact...",
    });

    setTimeout(() => {
      setRecordings(prev => prev.map(recording => 
        recording.id === recordingId 
          ? { ...recording, salesforceContactId }
          : recording
      ));
      
      toast({
        title: "Attachment Complete",
        description: "Voice note has been attached to the Salesforce contact.",
      });
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Export Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Voice Notes</h2>
          <p className="text-slate-600">Record, transcribe, and manage your voice notes</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAdminAccess} variant="outline" size="sm">
            <Lock className="w-4 h-4 mr-2" />
            {isAdminAuthorized ? 'Disable Admin' : 'Admin Mode'}
          </Button>
          <Button onClick={handleExportToDrive} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export to Drive
          </Button>
        </div>
      </div>

      {/* Event Selection */}
      {eventBriefs.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Select Event</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedEventId} onValueChange={handleEventChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an event for this voice note" />
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

      {/* Salesforce Integration - Only show if admin authorized */}
      {isAdminAuthorized && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
              Salesforce Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Select Salesforce Contact
                </Label>
                <SalesforceContactSearch
                  value={salesforceContactId}
                  onValueChange={setSalesforceContactId}
                  placeholder="Search for a contact..."
                />
              </div>
              <p className="text-sm text-slate-600">
                Voice notes can be attached to Salesforce contact records for better lead management.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recording Interface */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">Record New Note</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-8">
              <div className={`w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'
              }`}>
                {isRecording ? (
                  <Square className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                ) : (
                  <Mic className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                )}
              </div>
            </div>

            {isRecording && (
              <div className="mb-6">
                <div className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
                  {formatTime(recordingTime)}
                </div>
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-red-500 rounded-full animate-pulse`}
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={isRecording ? stopRecording : startRecording}
              size="lg"
              className={`w-full ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Start Recording</span>
                </>
              )}
            </Button>

            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              {isRecording 
                ? "Recording in progress... Click stop when finished."
                : "Click to start recording your voice note. AI will automatically transcribe and summarize."
              }
            </p>
          </CardContent>
        </Card>

        {/* Recent Recordings */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">Recent Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {recordings.map((recording) => (
              <div key={recording.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-slate-900 text-sm sm:text-base">{recording.title}</h3>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{recording.timestamp}</span>
                </div>
                
                <div className="mb-3">
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 line-clamp-2">{recording.summary}</p>
                  <div className="flex flex-wrap gap-1">
                    {recording.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {recording.salesforceContactId && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        SF: {recording.salesforceContactId}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">Duration: {recording.duration}</span>
                  <div className="flex flex-wrap gap-1">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Full
                    </Button>
                    {isAdminAuthorized && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleAttachToSalesforce(recording.id)}
                        disabled={!salesforceContactId}
                      >
                        <UserPlus className="w-3 h-3 mr-1" />
                        Attach to SF
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Admin Authorization Modal */}
      <AdminAuth
        isOpen={showAdminAuth}
        onClose={() => setShowAdminAuth(false)}
        onAuthorized={() => setIsAdminAuthorized(true)}
      />
    </div>
  );
};

export default VoiceNotes;
