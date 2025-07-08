
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Calendar, FileText, DollarSign } from 'lucide-react';

interface ContactData {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  lastContact: string;
  conversationHistory: Array<{
    date: string;
    type: string;
    summary: string;
  }>;
  activeDeals: Array<{
    name: string;
    value: string;
    stage: string;
  }>;
  notes: string[];
}

interface ContactSummaryProps {
  contactId: string;
}

const ContactSummary = ({ contactId }: ContactSummaryProps) => {
  // Mock contact data - in a real app, this would come from Salesforce API
  const mockContactData: Record<string, ContactData> = {
    "003XX000004TmiQYAS": {
      id: "003XX000004TmiQYAS",
      name: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      title: "IT Director",
      department: "Information Technology",
      lastContact: "2024-01-15",
      conversationHistory: [
        {
          date: "2024-01-15",
          type: "Email",
          summary: "Discussed cloud migration strategy and security concerns"
        },
        {
          date: "2024-01-10",
          type: "Phone Call",
          summary: "Initial discovery call about IT infrastructure needs"
        },
        {
          date: "2023-12-20",
          type: "Meeting",
          summary: "Attended demo of our cybersecurity platform"
        }
      ],
      activeDeals: [
        {
          name: "TechCorp Cloud Migration",
          value: "$150,000",
          stage: "Proposal"
        },
        {
          name: "Security Assessment",
          value: "$25,000",
          stage: "Negotiation"
        }
      ],
      notes: [
        "Primary decision maker for IT purchases",
        "Concerned about data security and compliance",
        "Budget approved for Q2 2024",
        "Prefers detailed technical documentation"
      ]
    },
    "003XX000004TmiRYAS": {
      id: "003XX000004TmiRYAS",
      name: "Sarah Johnson",
      email: "sarah.j@innovatetech.com",
      phone: "+1 (555) 987-6543",
      title: "CTO",
      department: "Technology",
      lastContact: "2024-01-12",
      conversationHistory: [
        {
          date: "2024-01-12",
          type: "Video Call",
          summary: "Technical deep-dive on API integration capabilities"
        },
        {
          date: "2024-01-08",
          type: "Email",
          summary: "Shared technical specifications and requirements"
        }
      ],
      activeDeals: [
        {
          name: "API Platform License",
          value: "$75,000",
          stage: "Closed Won"
        }
      ],
      notes: [
        "Highly technical, appreciates detailed demos",
        "Previous customer with positive experience",
        "Interested in enterprise-level solutions"
      ]
    }
  };

  const contactData = mockContactData[contactId];

  if (!contactData) {
    return (
      <Card className="bg-slate-50 border border-slate-200">
        <CardContent className="p-6">
          <p className="text-slate-500 text-center">Select a contact to view summary</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-slate-900">
          <User className="w-5 h-5 mr-2 text-blue-600" />
          {contactData.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm text-slate-600">{contactData.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm text-slate-600">{contactData.phone}</span>
          </div>
          <div className="flex items-center">
            <Badge variant="secondary" className="text-xs mr-2">{contactData.title}</Badge>
            <Badge variant="outline" className="text-xs">{contactData.department}</Badge>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm text-slate-600">Last contact: {contactData.lastContact}</span>
          </div>
        </div>

        {contactData.activeDeals.length > 0 && (
          <div>
            <h4 className="font-medium text-slate-900 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Active Deals
            </h4>
            <div className="space-y-2">
              {contactData.activeDeals.map((deal, index) => (
                <div key={index} className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{deal.name}</span>
                    <span className="text-sm text-green-600 font-medium">{deal.value}</span>
                  </div>
                  <Badge variant="outline" className="text-xs mt-1">{deal.stage}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium text-slate-900 mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            Recent Conversations
          </h4>
          <div className="space-y-2">
            {contactData.conversationHistory.slice(0, 3).map((conversation, index) => (
              <div key={index} className="bg-slate-50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <Badge variant="outline" className="text-xs">{conversation.type}</Badge>
                  <span className="text-xs text-slate-500">{conversation.date}</span>
                </div>
                <p className="text-sm text-slate-600">{conversation.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-slate-900 mb-2">Key Notes</h4>
          <ul className="space-y-1">
            {contactData.notes.map((note, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSummary;
