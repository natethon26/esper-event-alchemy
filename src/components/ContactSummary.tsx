
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Calendar, FileText, DollarSign } from 'lucide-react';
import { getContactById } from '@/utils/mockSalesforceData';

interface ContactSummaryProps {
  contactId: string;
}

const ContactSummary = ({ contactId }: ContactSummaryProps) => {
  const contactData = getContactById(contactId);

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
