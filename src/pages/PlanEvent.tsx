
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PlanEvent = () => {
  const { toast } = useToast();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [goals, setGoals] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleGenerateBrief = async () => {
    if (!eventName || !targetAudience || !goals) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate your event brief.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockRecommendation = {
        attendRecommendation: "Strongly Recommended",
        roiScore: 87,
        reasoning: "High concentration of target personas (IT Directors, CISOs) with strong historical ROI from similar events. Esper's competitive positioning is strong in this market segment.",
        suggestedApproach: "Booth + Sponsored Speaking Session",
        recommendedTeam: [
          { name: "Sarah Chen", role: "VP Sales", reason: "Enterprise account expertise" },
          { name: "Mike Rodriguez", role: "Solutions Engineer", reason: "Technical demos" },
          { name: "Lisa Park", role: "Product Marketing", role: "Thought leadership" }
        ],
        keyTalkingPoints: [
          "Zero-touch device provisioning for enterprise scale",
          "Advanced security compliance for regulated industries",
          "Cost reduction through automated device management"
        ],
        competitorIntel: [
          { name: "VMware Workspace ONE", presence: "Gold Sponsor", threat: "High" },
          { name: "Microsoft Intune", presence: "Speaking Only", threat: "Medium" }
        ],
        checklist: [
          "Book booth space by March 15th",
          "Prepare demo devices (10 tablets, 5 phones)",
          "Create lead capture forms",
          "Design booth graphics",
          "Schedule pre-event customer meetings"
        ]
      };
      
      setRecommendation(mockRecommendation);
      setIsGenerating(false);
      
      toast({
        title: "Event Brief Generated!",
        description: "Your AI-powered event strategy is ready for review.",
      });
    }, 3000);
  };

  const handleDownloadBrief = () => {
    toast({
      title: "Download Started",
      description: "Your event brief PDF is being generated and will download shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Event Planning Assistant</h1>
          <p className="text-slate-600">Get AI-powered recommendations for your next event</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="eventName" className="text-sm font-medium text-slate-700">Event Name *</Label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Mobile World Congress 2024"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="eventDescription" className="text-sm font-medium text-slate-700">Event Description</Label>
                <Textarea
                  id="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Brief description of the event, focus areas, expected attendees..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="targetAudience" className="text-sm font-medium text-slate-700">Target Audience *</Label>
                <Input
                  id="targetAudience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., IT Directors, CISOs, Enterprise Mobility Managers"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="goals" className="text-sm font-medium text-slate-700">Event Goals *</Label>
                <Textarea
                  id="goals"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="What do you want to achieve? Lead generation, brand awareness, product demos..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <Button 
                onClick={handleGenerateBrief}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating Brief...
                  </>
                ) : (
                  'Generate Event Brief'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {recommendation ? (
              <>
                {/* Recommendation Card */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-slate-900">AI Recommendation</CardTitle>
                      <Badge className={recommendation.attendRecommendation === 'Strongly Recommended' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {recommendation.attendRecommendation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <span className="font-medium text-slate-900">ROI Score</span>
                        <span className="text-2xl font-bold text-blue-600">{recommendation.roiScore}%</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Reasoning</h4>
                        <p className="text-sm text-slate-600">{recommendation.reasoning}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Suggested Approach</h4>
                        <Badge variant="outline" className="text-sm">{recommendation.suggestedApproach}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Recommendations */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900">Recommended Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recommendation.recommendedTeam.map((member: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">{member.name}</p>
                            <p className="text-sm text-slate-600">{member.role}</p>
                          </div>
                          <p className="text-xs text-slate-500 max-w-32 text-right">{member.reason}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-slate-900">Action Checklist</CardTitle>
                      <Button onClick={handleDownloadBrief} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {recommendation.checklist.map((item: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Ready to Generate Your Brief</h3>
                  <p className="text-slate-600">Fill in the event information and click "Generate Event Brief" to get AI-powered recommendations.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEvent;
