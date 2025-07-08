
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEventContext } from '@/contexts/EventContext';

interface EventSelectorProps {
  eventId: string;
  onEventChange: (eventId: string) => void;
}

const EventSelector = ({ eventId, onEventChange }: EventSelectorProps) => {
  const { eventBriefs, currentEvent } = useEventContext();

  if (eventBriefs.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Select Event</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={eventId} onValueChange={onEventChange}>
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
  );
};

export default EventSelector;
