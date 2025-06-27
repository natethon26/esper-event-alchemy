import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Calendar, TrendingUp, Users, MessageSquare, ExternalLink, Sparkles, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EventSummaries = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('day-1');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  // Mock data for demonstration
  const dailySummaries = {
    'day-1': {
      date: 'March 15, 2025',
      totalLeads: 42,
      engagedLeads: 18,
      topConversationThemes: [
        { theme: 'Android Device Management', count: 15, engagement: 'High' },
        { theme: 'Healthcare Compliance', count: 12, engagement: 'Medium' },
        { theme: 'Retail Kiosk Solutions', count: 8, engagement: 'High' },
        { theme: 'Remote Troubleshooting', count: 6, engagement: 'Medium' }
      ],
      mostEngagedLeads: [
        { name: 'Sarah Chen', company: 'MedTech Solutions', role: 'IT Director', score: 95, tags: ['Hot Lead', 'Healthcare', 'Large Fleet'] },
        { name: 'Michael Rodriguez', company: 'RetailMax', role: 'Operations Manager', score: 88, tags: ['Warm Lead', 'Retail', 'Android Focus'] },
        { name: 'Jennifer Kim', company: 'LogiCorp', role: 'DevOps Lead', score: 82, tags: ['Technical', 'Integration Ready', 'API Interest'] }
      ]
    },
    'day-2': {
      date: 'March 16, 2025',
      totalLeads: 38,
      engagedLeads: 22,
      topConversationThemes: [
        { theme: 'Zero-Touch Provisioning', count: 18, engagement: 'High' },
        { theme: 'Security & Compliance', count: 14, engagement: 'High' },
        { theme: 'Fleet Management APIs', count: 10, engagement: 'Medium' },
        { theme: 'Multi-OS Support', count: 7, engagement: 'Low' }
      ],
      mostEngagedLeads: [
        { name: 'David Park', company: 'TechFlow Inc', role: 'CTO', score: 92, tags: ['Executive', 'Decision Maker', 'Enterprise'] },
        { name: 'Lisa Thompson', company: 'HealthFirst', role: 'IT Manager', score: 85, tags: ['Healthcare', 'Compliance Focus', 'Warm Lead'] },
        { name: 'Robert Wilson', company: 'Manufacturing Plus', role: 'Plant Manager', score: 79, tags: ['Manufacturing', 'Device Heavy', 'Cost Conscious'] }
      ]
    }
  };

  const currentSummary = dailySummaries[selectedDay as keyof typeof dailySummaries];

  const handleSemanticSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search query to find relevant conversations.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate semantic search with embeddings
    setTimeout(() => {
      const mockResults = [
        {
          lead: 'Sarah Chen - MedTech Solutions',
          snippet: 'Discussed AI-powered device diagnostics for retail point-of-sale systems, interested in predictive maintenance capabilities.',
          relevanceScore: 0.94,
          conversationDate: 'March 15, 2025',
          tags: ['AI', 'Retail', 'Diagnostics']
        },
        {
          lead: 'Michael Rodriguez - RetailMax',
          snippet: 'Asked about AI analytics for customer behavior tracking through kiosk interactions in retail environments.',
          relevanceScore: 0.87,
          conversationDate: 'March 15, 2025',
          tags: ['AI', 'Retail', 'Analytics']
        },
        {
          lead: 'Jennifer Kim - LogiCorp',
          snippet: 'Mentioned implementing AI-driven inventory management systems using Android tablets in retail warehouses.',
          relevanceScore: 0.82,
          conversationDate: 'March 15, 2025',
          tags: ['AI', 'Retail', 'Inventory']
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} relevant conversations matching your query.`,
      });
    }, 2000);
  };

  const handleGoogleDriveSync = () => {
    toast({
      title: "Exporting & Syncing...",
      description: "Generating CSV and uploading to Google Drive...",
    });

    // Simulate export and sync process
    setTimeout(() => {
      toast({
        title: "Export & Sync Complete",
        description: "Lead data CSV has been generated and uploaded to your Google Drive folder.",
      });
    }, 2500);
  };

  const handleGenerateAISummary = async () => {
    setIsGeneratingSummary(true);
    
    // Simulate AI summary generation
    setTimeout(() => {
      const mockSummary = `**Day ${selectedDay === 'day-1' ? '1' : '2'} Event Summary - ${currentSummary.date}**

**Key Highlights:**
• Generated ${currentSummary.totalLeads} total leads with ${Math.round((currentSummary.engagedLeads / currentSummary.totalLeads) * 100)}% engagement rate
• Healthcare and Retail sectors showed highest interest levels
• Strong focus on Android device management and security compliance

**Top Performing Themes:**
${currentSummary.topConversationThemes.slice(0, 3).map(theme => 
  `• ${theme.theme} (${theme.count} conversations, ${theme.engagement} engagement)`
).join('\n')}

**Sales Pipeline Impact:**
• ${currentSummary.mostEngagedLeads.filter(lead => lead.score >= 90).length} hot leads ready for immediate follow-up
• ${currentSummary.mostEngagedLeads.filter(lead => lead.score >= 80 && lead.score < 90).length} warm leads for nurturing campaigns
• Key decision makers from ${currentSummary.mostEngagedLeads.filter(lead => lead.tags.some(tag => tag.includes('Executive') || tag.includes('Decision Maker'))).length} enterprise accounts engaged

**Recommended Actions:**
• Priority follow-up with ${currentSummary.mostEngagedLeads[0].name} at ${currentSummary.mostEngagedLeads[0].company} (Score: ${currentSummary.mostEngagedLeads[0].score})
• Schedule technical demos for healthcare compliance discussions
• Develop targeted content for retail kiosk use cases`;

      setAiSummary(mockSummary);
      setIsGeneratingSummary(false);
      
      toast({
        title: "AI Summary Generated",
        description: "Daily insights and recommendations have been generated based on your event data.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header with Sync Option */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Event Summaries</h2>
        <p className="text-slate-600 text-sm sm:text-base mb-4">Daily insights, lead analytics, and conversation intelligence</p>
        <div className="flex justify-center">
          <Button onClick={handleGoogleDriveSync} variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Export & Sync to Drive
          </Button>
        </div>
      </div>

      {/* AI Summary Generator */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            AI Daily Summary Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-slate-600">
              Generate an AI-powered summary of the day's activities, lead insights, and strategic recommendations.
            </p>
            <Button 
              onClick={handleGenerateAISummary}
              disabled={isGeneratingSummary}
              className="w-full sm:w-fit bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isGeneratingSummary ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating Summary...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Summary for {currentSummary.date}
                </>
              )}
            </Button>
            
            {aiSummary && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <div className="flex items-center mb-3">
                  <FileText className="w-4 h-4 mr-2 text-purple-600" />
                  <h4 className="font-medium text-slate-900">AI Generated Summary</h4>
                </div>
                <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line text-sm">
                  {aiSummary}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Semantic Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Search className="w-5 h-5 mr-2 text-purple-600" />
            Semantic Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., 'Who talked about AI in retail?', 'Android security concerns', 'Healthcare compliance'"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSemanticSearch()}
            />
            <Button onClick={handleSemanticSearch} disabled={isSearching} className="w-full sm:w-auto">
              {isSearching ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-slate-900">Search Results</h4>
              {searchResults.map((result, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h5 className="font-medium text-slate-900 text-sm sm:text-base">{result.lead}</h5>
                    <Badge variant="secondary" className="text-xs w-fit">Score: {(result.relevanceScore * 100).toFixed(0)}%</Badge>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{result.snippet}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex gap-1 flex-wrap">
                      {result.tags.map((tag: string, tagIndex: number) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">{result.conversationDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Day Selection */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Button
          variant={selectedDay === 'day-1' ? 'default' : 'outline'}
          onClick={() => setSelectedDay('day-1')}
          size="sm"
          className="w-full sm:w-auto"
        >
          Day 1 - March 15
        </Button>
        <Button
          variant={selectedDay === 'day-2' ? 'default' : 'outline'}
          onClick={() => setSelectedDay('day-2')}
          size="sm"
          className="w-full sm:w-auto"
        >
          Day 2 - March 16
        </Button>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Lead Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Total Leads</span>
                <span className="font-semibold">{currentSummary.totalLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Engaged Leads</span>
                <span className="font-semibold text-green-600">{currentSummary.engagedLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Engagement Rate</span>
                <span className="font-semibold">
                  {Math.round((currentSummary.engagedLeads / currentSummary.totalLeads) * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
              Top Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentSummary.topConversationThemes.slice(0, 3).map((theme, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-slate-700 truncate mr-2">{theme.theme}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium">{theme.count}</span>
                    <Badge 
                      variant={theme.engagement === 'High' ? 'default' : theme.engagement === 'Medium' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {theme.engagement}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Sales Ready
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Hot Leads</span>
                <span className="font-semibold text-red-600">
                  {currentSummary.mostEngagedLeads.filter(lead => lead.score >= 90).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Warm Leads</span>
                <span className="font-semibold text-orange-600">
                  {currentSummary.mostEngagedLeads.filter(lead => lead.score >= 80 && lead.score < 90).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 text-sm">Follow-up</span>
                <span className="font-semibold text-blue-600">
                  {currentSummary.mostEngagedLeads.filter(lead => lead.score < 80).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Engaged Leads Table */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Most Engaged Leads - {currentSummary.date}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Name</TableHead>
                  <TableHead className="text-xs sm:text-sm">Company</TableHead>
                  <TableHead className="text-xs sm:text-sm">Role</TableHead>
                  <TableHead className="text-xs sm:text-sm">Score</TableHead>
                  <TableHead className="text-xs sm:text-sm">Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSummary.mostEngagedLeads.map((lead, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-xs sm:text-sm">{lead.name}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{lead.company}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{lead.role}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={lead.score >= 90 ? 'default' : lead.score >= 80 ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {lead.score}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {lead.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {lead.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{lead.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Conversation Themes Detail */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Conversation Themes - {currentSummary.date}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSummary.topConversationThemes.map((theme, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900 text-sm sm:text-base">{theme.theme}</h4>
                  <Badge 
                    variant={theme.engagement === 'High' ? 'default' : theme.engagement === 'Medium' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {theme.engagement}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Conversations</span>
                  <span className="font-semibold text-lg">{theme.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventSummaries;
