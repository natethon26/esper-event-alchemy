
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, Square, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const VoiceNotes = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      title: "Follow-up with TechCorp",
      transcript: "Great conversation with John Smith from TechCorp. They're interested in our zero-touch provisioning for their 500 Android tablets. Need to schedule a demo next week. Budget approved for Q2.",
      summary: "High-priority lead: TechCorp needs zero-touch provisioning for 500 tablets, demo scheduled, Q2 budget approved.",
      tags: ["high-priority", "demo-request", "enterprise"],
      duration: "2:34",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Competitor intel - VMware booth",
      transcript: "Walked by VMware booth. They're heavily promoting their new unified endpoint management features. Saw quite a crowd, but their demo seemed to struggle with the setup process.",
      summary: "Competitor insight: VMware promoting UEM features but having demo issues. Opportunity to highlight Esper's ease of setup.",
      tags: ["competitor-intel", "vmware", "opportunity"],
      duration: "1:12",
      timestamp: "4 hours ago"
    }
  ]);
  const [currentRecording, setCurrentRecording] = useState<any>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer
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

    // Simulate processing
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
        timestamp: "Just now"
      };
      
      setRecordings(prev => [newRecording, ...prev]);
      setRecordingTime(0);
      
      toast({
        title: "Voice Note Saved",
        description: "Your note has been transcribed and summarized.",
      });
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Voice Notes</h1>
          <p className="text-slate-600">Capture quick thoughts and conversations with AI transcription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recording Interface */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">Record New Note</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-8">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' 
                    : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'
                }`}>
                  {isRecording ? (
                    <Square className="w-12 h-12 text-white" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>

              {isRecording && (
                <div className="mb-6">
                  <div className="text-2xl font-bold text-red-600 mb-2">
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
                    <Square className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>

              <p className="text-sm text-slate-500 mt-4">
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
                    <h3 className="font-medium text-slate-900">{recording.title}</h3>
                    <span className="text-xs text-slate-500">{recording.timestamp}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-slate-600 mb-2">{recording.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {recording.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Duration: {recording.duration}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Play
                      </Button>
                      <Button variant="outline" size="sm">
                        View Full
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceNotes;
