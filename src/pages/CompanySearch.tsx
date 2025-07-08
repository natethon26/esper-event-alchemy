
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import SalesforceCompanySearch from '@/components/SalesforceCompanySearch';
import SalesforceContactSearch from '@/components/SalesforceContactSearch';
import CompanyOverview from '@/components/CompanyOverview';
import ContactSummary from '@/components/ContactSummary';

const CompanySearch = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [companyContactId, setCompanyContactId] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
            <Search className="w-6 h-6 mr-3 text-blue-600" />
            Company Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2 block">
                Salesforce Company Search
              </Label>
              <SalesforceCompanySearch
                value={selectedCompanyId}
                onValueChange={setSelectedCompanyId}
                placeholder="Search for companies in Salesforce..."
              />
            </div>
            
            {selectedCompanyId && (
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Company Contacts
                </Label>
                <SalesforceContactSearch
                  value={companyContactId}
                  onValueChange={setCompanyContactId}
                  placeholder="Search contacts for this company..."
                />
              </div>
            )}
          </div>

          {selectedCompanyId && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-slate-700 mb-2 block">
                  Company Overview
                </Label>
                <CompanyOverview companyId={selectedCompanyId} />
              </div>
              
              {companyContactId && (
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    Contact Summary
                  </Label>
                  <ContactSummary contactId={companyContactId} />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySearch;
