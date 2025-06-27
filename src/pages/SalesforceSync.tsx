
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RefreshCw, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SalesforceSync = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    securityToken: '',
    sandboxUrl: 'https://test.salesforce.com'
  });

  const [syncStats, setSyncStats] = useState({
    totalLeads: 15,
    pendingSync: 8,
    synced: 7,
    errors: 0,
    lastSync: '2 hours ago'
  });

  const handleConnect = async () => {
    if (!credentials.username || !credentials.password || !credentials.securityToken) {
      toast({
        title: "Missing Credentials",
        description: "Please fill in all Salesforce credentials.",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsSyncing(false);
      
      toast({
        title: "Connected to Salesforce!",
        description: "Successfully connected to your Salesforce sandbox.",
      });
    }, 2000);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    
    // Simulate sync process
    setTimeout(() => {
      setSyncStats(prev => ({
        ...prev,
        synced: prev.totalLeads,
        pendingSync: 0,
        lastSync: 'Just now'
      }));
      
      setIsSyncing(false);
      
      toast({
        title: "Sync Complete!",
        description: "All leads have been synced to Salesforce.",
      });
    }, 3000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setCredentials({
      username: '',
      password: '',
      securityToken: '',
      sandboxUrl: 'https://test.salesforce.com'
    });
    
    toast({
      title: "Disconnected",
      description: "Salesforce connection has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Salesforce Integration</h1>
          <p className="text-slate-600">Connect and sync your event leads with Salesforce</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Setup */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-slate-900">Connection Setup</CardTitle>
                {isConnected && (
                  <Badge className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <>
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-slate-700">Salesforce Username</Label>
                    <Input
                      id="username"
                      type="email"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="your.email@company.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Your Salesforce password"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="securityToken" className="text-sm font-medium text-slate-700">Security Token</Label>
                    <Input
                      id="securityToken"
                      value={credentials.securityToken}
                      onChange={(e) => setCredentials(prev => ({ ...prev, securityToken: e.target.value }))}
                      placeholder="Security token from Salesforce"
                      className="mt-1"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      <a href="https://help.salesforce.com/s/articleView?id=user_security_token.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        How to get your security token <ExternalLink className="w-3 h-3 inline ml-1" />
                      </a>
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="sandboxUrl" className="text-sm font-medium text-slate-700">Sandbox URL</Label>
                    <Input
                      id="sandboxUrl"
                      value={credentials.sandboxUrl}
                      onChange={(e) => setCredentials(prev => ({ ...prev, sandboxUrl: e.target.value }))}
                      placeholder="https://test.salesforce.com"
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    onClick={handleConnect}
                    disabled={isSyncing}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Connect to Salesforce'
                    )}
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Successfully Connected</h3>
                  <p className="text-slate-600 mb-4">Your Salesforce sandbox is connected and ready to sync leads.</p>
                  <Button variant="outline" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sync Status */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">Sync Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-slate-900">{syncStats.totalLeads}</div>
                    <div className="text-sm text-slate-600">Total Leads</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{syncStats.synced}</div>
                    <div className="text-sm text-slate-600">Synced</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{syncStats.pendingSync}</div>
                    <div className="text-sm text-slate-600">Pending</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{syncStats.errors}</div>
                    <div className="text-sm text-slate-600">Errors</div>
                  </div>
                </div>

                {/* Last Sync */}
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Last Sync:</span>
                    <span className="text-sm font-medium text-slate-900">{syncStats.lastSync}</span>
                  </div>
                </div>

                {/* Sync Actions */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleSync}
                    disabled={!isConnected || isSyncing || syncStats.pendingSync === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Syncing Leads...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Now ({syncStats.pendingSync} pending)
                      </>
                    )}
                  </Button>

                  <Button variant="outline" className="w-full" disabled={!isConnected}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Salesforce
                  </Button>
                </div>

                {/* Sync Settings */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-slate-900 mb-3">Sync Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Auto-sync new leads</span>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Sync frequency</span>
                      <Badge variant="secondary">Every 5 minutes</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Lead assignment</span>
                      <Badge variant="secondary">Round Robin</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesforceSync;
