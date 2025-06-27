import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle, AlertCircle, Target, Users, MessageSquare, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEventContext } from '@/contexts/EventContext';

const PlanEvent = () => {
  const { toast } = useToast();
  const { addEventBrief } = useEventContext();
  const [eventName, setEventName] = useState('');
  const [audience, setAudience] = useState('');
  const [goals, setGoals] = useState('');
  const [productFocus, setProductFocus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [eventBrief, setEventBrief] = useState<any>(null);

  const handleGenerateBrief = async () => {
    if (!eventName || !audience || !goals) {
      toast({
        title: "Missing Information",
        description: "Please fill in Event Name, Audience, and Goals to generate your event brief.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const mockBrief = {
        id: Date.now().toString(),
        name: eventName,
        audience,
        goals,
        productFocus,
        createdAt: new Date().toISOString(),
        eventSummary: `${eventName} is a strategic opportunity to engage with ${audience} and position Esper as the leading device management platform for Android enterprise deployments.`,
        audiencePersonas: [
          {
            persona: "IT Directors & Infrastructure Heads",
            buyingStage: "Problem Aware - Evaluating Solutions",
            painPoints: ["Device provisioning complexity", "Security compliance", "Operational overhead"]
          },
          {
            persona: "DevOps & Platform Engineers", 
            buyingStage: "Solution Aware - Technical Evaluation",
            painPoints: ["API integration complexity", "Deployment automation", "Monitoring capabilities"]
          }
        ],
        strategicGoals: [
          "Drive Android MDM pipeline with 15+ qualified Tier 1 leads",
          "Position Esper as strategic device infrastructure partner",
          "Showcase zero-touch deployment capabilities"
        ],
        messagingThemes: [
          "Operational Control: Complete visibility and control over Android device fleets",
          "Zero-Touch Deployment: Automated provisioning at enterprise scale", 
          "Security First: Built-in compliance for regulated industries",
          "Developer Friendly: Robust APIs and SDK for custom integrations"
        ],
        recommendedActivations: [
          "Esper Live Demo Station - Interactive device provisioning showcase",
          "SE-led Deep Dives - Technical architecture sessions",
          "Customer Success Stories - Healthcare & retail case studies",
          "Executive Roundtable - Strategic discussion on device management ROI"
        ],
        successCriteria: [
          "25+ qualified leads with Android fleet >100 devices",
          "12+ live demos delivered to target personas",
          "8+ technical deep-dive sessions scheduled",
          "3+ Tier 1 accounts engaged for post-event follow-up"
        ]
      };
      
      setEventBrief(mockBrief);
      setIsGenerating(false);
      
      toast({
        title: "Event Brief Generated!",
        description: "Your strategic event brief is ready for team alignment.",
      });
    }, 3000);
  };

  const handleSaveBrief = () => {
    if (eventBrief) {
      addEventBrief(eventBrief);
      toast({
        title: "Event Brief Saved!",
        description: "Your event brief has been saved and can be selected when capturing leads.",
      });
    }
  };

  const handleDownloadBrief = () => {
    toast({
      title: "Download Started",
      description: "Your event brief PDF is being generated and will download shortly.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Event Brief Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="eventName" className="text-sm font-medium text-slate-700">Event Name *</Label>
            <Input
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., HIMSS 2025, Mobile World Congress"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="audience" className="text-sm font-medium text-slate-700">Target Audience *</Label>
            <Textarea
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g., Heads of IT, Mobility Engineers, Ops Managers in Healthcare, Retail, Logistics"
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="goals" className="text-sm font-medium text-slate-700">Strategic Goals *</Label>
            <Textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g., Drive Android MDM pipeline, Position Esper as strategic device infrastructure partner"
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="productFocus" className="text-sm font-medium text-slate-700">Product Focus (Optional)</Label>
            <Textarea
              id="productFocus"
              value={productFocus}
              onChange={(e) => setProductFocus(e.target.value)}
              placeholder="e.g., Esper Device SDK, Cloud APIs, Seamless Provisioning, Remote Monitoring for Android Fleets"
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
                Generating Strategic Brief...
              </>
            ) : (
              'Generate Event Brief'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        {eventBrief ? (
          <>
            {/* Event Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-slate-900">Event Summary</CardTitle>
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveBrief} variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save Brief
                    </Button>
                    <Button onClick={handleDownloadBrief} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{eventBrief.eventSummary}</p>
              </CardContent>
            </Card>

            {/* Audience Personas */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Audience Personas & Buying Stages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventBrief.audiencePersonas.map((persona: any, index: number) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{persona.persona}</h4>
                        <Badge variant="outline" className="text-xs">{persona.buyingStage}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {persona.painPoints.map((point: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{point}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strategic Goals & Messaging */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                  Strategic Goals & Messaging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Strategic Goals</h4>
                    <div className="space-y-2">
                      {eventBrief.strategicGoals.map((goal: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Key Messaging Themes</h4>
                    <div className="space-y-2">
                      {eventBrief.messagingThemes.map((theme: string, index: number) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">{theme}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Activations & Success Criteria */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">Execution Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Recommended Activations</h4>
                    <div className="space-y-2">
                      {eventBrief.recommendedActivations.map((activation: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{activation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Success Criteria</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {eventBrief.successCriteria.map((criteria: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm text-slate-700">{criteria}</span>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>
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
              <h3 className="text-lg font-medium text-slate-900 mb-2">Ready to Generate Your Event Brief</h3>
              <p className="text-slate-600">Fill in the event information and strategic goals to generate a comprehensive event brief for team alignment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PlanEvent;
