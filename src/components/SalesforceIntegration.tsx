
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import SalesforceContactSearch from '@/components/SalesforceContactSearch';

interface SalesforceIntegrationProps {
  salesforceContactId: string;
  onSalesforceContactChange: (contactId: string) => void;
}

const SalesforceIntegration = ({ 
  salesforceContactId, 
  onSalesforceContactChange 
}: SalesforceIntegrationProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
          <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
          Salesforce Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              Link to Salesforce Contact
            </Label>
            <SalesforceContactSearch
              value={salesforceContactId}
              onValueChange={onSalesforceContactChange}
              placeholder="Search for existing contact..."
            />
          </div>
          <p className="text-sm text-slate-600">
            Link this lead to an existing Salesforce contact for better lead management and follow-up.
          </p>
          {salesforceContactId && (
            <Badge variant="outline" className="text-xs w-fit">
              <ExternalLink className="w-3 h-3 mr-1" />
              Linked to SF Contact: {salesforceContactId}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesforceIntegration;
