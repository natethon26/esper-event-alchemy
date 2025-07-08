
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import BusinessCardScanner from '@/components/BusinessCardScanner';

interface QuickCaptureProps {
  onDataExtracted: (data: {
    name: string;
    company: string;
    title: string;
    email: string;
    phone: string;
  }) => void;
}

const QuickCapture = ({ onDataExtracted }: QuickCaptureProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Quick Capture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <BusinessCardScanner onDataExtracted={onDataExtracted} />
          
          <Button 
            variant="outline" 
            className="p-6 h-auto flex-col space-y-2 hover:bg-teal-50"
          >
            <Upload className="w-8 h-8 text-teal-600" />
            <span className="text-sm font-medium">Upload Badge Photo</span>
            <span className="text-xs text-slate-500">Extract name badge data</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickCapture;
