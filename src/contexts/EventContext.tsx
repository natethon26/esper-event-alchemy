
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface EventBrief {
  id: string;
  name: string;
  audience: string;
  goals: string;
  productFocus?: string;
  createdAt: string;
  eventSummary: string;
  audiencePersonas: Array<{
    persona: string;
    buyingStage: string;
    painPoints: string[];
  }>;
  strategicGoals: string[];
  messagingThemes: string[];
  recommendedActivations: string[];
  successCriteria: string[];
}

interface EventContextType {
  eventBriefs: EventBrief[];
  currentEvent: EventBrief | null;
  setCurrentEvent: (event: EventBrief | null) => void;
  addEventBrief: (brief: EventBrief) => void;
  removeEventBrief: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [eventBriefs, setEventBriefs] = useState<EventBrief[]>([]);
  const [currentEvent, setCurrentEvent] = useState<EventBrief | null>(null);

  const addEventBrief = (brief: EventBrief) => {
    setEventBriefs(prev => [...prev, brief]);
  };

  const removeEventBrief = (id: string) => {
    setEventBriefs(prev => prev.filter(brief => brief.id !== id));
    if (currentEvent?.id === id) {
      setCurrentEvent(null);
    }
  };

  return (
    <EventContext.Provider value={{
      eventBriefs,
      currentEvent,
      setCurrentEvent,
      addEventBrief,
      removeEventBrief
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
