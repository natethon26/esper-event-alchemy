
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Globe, TrendingUp } from 'lucide-react';
import { getCompanyById } from '@/utils/mockSalesforceData';

interface CompanyOverviewProps {
  companyId: string;
}

const CompanyOverview = ({ companyId }: CompanyOverviewProps) => {
  const companyData = getCompanyById(companyId);

  if (!companyData) {
    return (
      <Card className="bg-slate-50 border border-slate-200">
        <CardContent className="p-6">
          <p className="text-slate-500 text-center">Select a company to view overview</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-slate-900">
          <Building2 className="w-5 h-5 mr-2 text-blue-600" />
          {companyData.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm text-slate-600">{companyData.employees} employees</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm text-slate-600">{companyData.revenue} revenue</span>
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2 text-slate-500" />
            <span className="text-sm text-slate-600">{companyData.website}</span>
          </div>
          <div className="flex items-center">
            <Badge variant="secondary" className="text-xs">{companyData.industry}</Badge>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-slate-900 mb-2">Company Overview</h4>
          <p className="text-sm text-slate-600">{companyData.description}</p>
        </div>

        <div>
          <h4 className="font-medium text-slate-900 mb-2">Key Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {companyData.keyTechnologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-slate-900 mb-2">Recent News</h4>
          <ul className="space-y-1">
            {companyData.recentNews.map((news, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {news}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverview;
