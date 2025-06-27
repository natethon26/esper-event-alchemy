
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Search, Calendar, TrendingUp, Users, MessageSquare, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EventSummaries = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('day-1');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Your lead data CSV is being generated and will download shortly.",
    });
  };

  const handleGoogleDriveSync = () => {
    toast({
      title: "Google Drive Sync",
      description: "Lead data has been uploaded to your connected Google Drive folder.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Event Summaries</h2>
          <p className="text-slate-600">Daily insights, lead analytics, and conversation intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={handleGoogleDriveSync} variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Sync to Drive
          </Button>
        </div>
      </div>

      {/* Semantic Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Search className="w-5 h-5 mr-2 text-purple-600" />
            Semantic Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., 'Who talked about AI in retail?', 'Android security concerns', 'Healthcare compliance'"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSemanticSearch()}
            />
            <Button onClick={handleSemanticSearch} disabled={isSearching}>
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
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-slate-900">{result.lead}</h5>
                    <Badge variant="secondary">Score: {(result.relevanceScore * 100).toFixed(0)}%</Badge>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{result.snippet}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
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
      <div className="flex gap-2">
        <Button
          variant={selectedDay === 'day-1' ? 'default' : 'outline'}
          onClick={() => setSelectedDay('day-1')}
          size="sm"
        >
          Day 1 - March 15
        </Button>
        <Button
          variant={selectedDay === 'day-2' ? 'default' : 'outline'}
          onClick={() => setSelectedDay('day-2')}
          size="sm"
        >
          Day 2 - March 16
        </Button>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <span className="text-slate-600">Total Leads</span>
                <span className="font-semibold">{currentSummary.totalLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Engaged Leads</span>
                <span className="font-semibold text-green-600">{currentSummary.engagedLeads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Engagement Rate</span>
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
                  <span className="text-sm text-slate-700">{theme.theme}</span>
                  <div className="flex items-center gap-2">
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
                <span className="text-slate-600">Hot Leads</span>
                <span className="font-semibold text-red-600">
                  {currentSummary.mostEngagedLeads.filter(lead => lead.score >= 90).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Warm Leads</span>
                <span className="font-semibold text-orange-600">
                  {currentSummary.mostEngagedLeads.filter(lead => lead.score >= 80 && lead.score < 90).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Follow-up</span>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSummary.mostEngagedLeads.map((lead, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.role}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={lead.score >= 90 ? 'default' : lead.score >= 80 ? 'secondary' : 'outline'}
                    >
                      {lead.score}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {lead.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                  <h4 className="font-medium text-slate-900">{theme.theme}</h4>
                  <Badge 
                    variant={theme.engagement === 'High' ? 'default' : theme.engagement === 'Medium' ? 'secondary' : 'outline'}
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
