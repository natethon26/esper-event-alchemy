
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calendar } from 'lucide-react';
import { useEventContext } from '@/contexts/EventContext';
import { useToast } from '@/hooks/use-toast';

interface EventSelectorProps {
  eventId: string;
  onEventChange: (eventId: string) => void;
}

const EventSelector = ({ eventId, onEventChange }: EventSelectorProps) => {
  const { eventBriefs, currentEvent, addEventBrief } = useEventContext();
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEventName, setNewEventName] = useState('');

  const handleCreateEvent = () => {
    if (!newEventName.trim()) {
      toast({
        title: "Event Name Required",
        description: "Please enter a name for the new event.",
        variant: "destructive",
      });
      return;
    }

    const newEvent = {
      id: `event-${Date.now()}`,
      name: newEventName.trim(),
      audience: 'To be defined',
      goals: 'To be defined',
      createdAt: new Date().toISOString(),
      eventSummary: 'Event summary to be added',
      audiencePersonas: [],
      strategicGoals: [],
      messagingThemes: [],
      recommendedActivations: [],
      successCriteria: []
    };

    addEventBrief(newEvent);
    onEventChange(newEvent.id);
    setNewEventName('');
    setShowCreateForm(false);
    
    toast({
      title: "Event Created",
      description: `"${newEvent.name}" has been created and selected for lead capture.`,
    });
  };

  if (showCreateForm) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Create New Event
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="eventName" className="text-sm font-medium text-slate-700">Event Name</Label>
            <Input
              id="eventName"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              placeholder="Enter event name..."
              className="mt-1"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleCreateEvent} className="flex-1">
              Create Event
            </Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Select Event
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={eventId} onValueChange={onEventChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose an event for lead capture" />
          </SelectTrigger>
          <SelectContent>
            {eventBriefs.map((event) => (
              <SelectItem key={event.id} value={event.id}>
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          onClick={() => setShowCreateForm(true)}
          className="w-full flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Event
        </Button>

        {currentEvent && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800">
              Active Event: {currentEvent.name}
            </p>
            <p className="text-xs text-green-600 mt-1">
              All new leads will be associated with this event
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventSelector;
