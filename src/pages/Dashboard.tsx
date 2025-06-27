
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Plus, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "Mobile World Congress 2024",
      date: "Feb 26-29, 2024",
      location: "Barcelona, Spain",
      status: "recommended",
      roiScore: 85,
      leadPotential: "High"
    },
    {
      id: 2,
      name: "RSA Conference 2024",
      date: "May 6-9, 2024",
      location: "San Francisco, CA",
      status: "analyzing",
      roiScore: 72,
      leadPotential: "Medium"
    }
  ];

  const recentActivity = [
    { id: 1, action: "Event brief generated", event: "Mobile World Congress", time: "2 hours ago" },
    { id: 2, action: "Lead captured", event: "TechCrunch Disrupt", time: "1 day ago" },
    { id: 3, action: "Post-event summary", event: "CES 2024", time: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Event Assistant</h1>
              <p className="text-slate-600">AI-powered event planning and execution for Esper</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
              <Link to="/plan-event">
                <Plus className="w-4 h-4 mr-2" />
                Plan New Event
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Events This Quarter</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Leads Captured</p>
                  <p className="text-2xl font-bold text-slate-900">247</p>
                </div>
                <User className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg ROI Score</p>
                  <p className="text-2xl font-bold text-slate-900">78%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pipeline Generated</p>
                  <p className="text-2xl font-bold text-slate-900">$2.4M</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-slate-900">{event.name}</h3>
                          <p className="text-sm text-slate-600">{event.date} • {event.location}</p>
                        </div>
                        <Badge 
                          variant={event.status === 'recommended' ? 'default' : 'secondary'}
                          className={event.status === 'recommended' ? 'bg-green-500' : ''}
                        >
                          {event.status === 'recommended' ? 'Recommended' : 'Analyzing'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            <span className="text-slate-600">ROI Score: </span>
                            <span className="font-medium text-slate-900">{event.roiScore}%</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-slate-600">Lead Potential: </span>
                            <span className="font-medium text-slate-900">{event.leadPotential}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/event/${event.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-xs text-slate-600">{activity.event}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/capture-lead">
                    <User className="w-4 h-4 mr-2" />
                    Capture Lead
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/voice-notes">
                    <div className="w-4 h-4 mr-2 bg-orange-500 rounded-full"></div>
                    Voice Notes
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/salesforce-sync">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Sync to Salesforce
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
