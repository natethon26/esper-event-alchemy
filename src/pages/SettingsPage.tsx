import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { RefreshCw, CheckCircle, AlertCircle, ExternalLink, Moon, Sun, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminAuth from '@/components/AdminAuth';

const SettingsPage = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: "Theme Updated",
      description: `Switched to ${!isDarkMode ? 'dark' : 'light'} mode.`,
    });
  };

  const handleAdminAccess = () => {
    if (isAdminAuthorized) {
      setIsAdminAuthorized(false);
      toast({
        title: "Admin Access Revoked",
        description: "Salesforce integration features are now hidden.",
      });
    } else {
      setShowAdminAuth(true);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Admin Mode Control */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">Admin Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5" />
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  Admin Mode {isAdminAuthorized && <Badge className="ml-2 bg-green-500">Active</Badge>}
                </Label>
                <p className="text-xs text-slate-500">
                  Enable advanced Salesforce integration features
                </p>
              </div>
            </div>
            <Button 
              onClick={handleAdminAccess} 
              variant={isAdminAuthorized ? "destructive" : "default"}
              size="sm"
            >
              {isAdminAuthorized ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">Theme & Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div>
                <Label className="text-sm font-medium text-slate-700">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Label>
                <p className="text-xs text-slate-500">
                  Toggle between light and dark themes
                </p>
              </div>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
            />
          </div>
        </CardContent>
      </Card>

      {/* Salesforce Integration - Only show if admin authorized */}
      {isAdminAuthorized && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-900">Salesforce Integration</CardTitle>
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
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Successfully Connected</h3>
                <p className="text-slate-600 mb-4">Your Salesforce sandbox is connected and ready to sync leads.</p>
                <div className="space-y-2">
                  <Button 
                    onClick={handleSync}
                    disabled={isSyncing || syncStats.pendingSync === 0}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync Now ({syncStats.pendingSync} pending)
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleDisconnect} className="w-full">
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Sync Status - Only show if admin authorized and connected */}
      {isAdminAuthorized && isConnected && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">Sync Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            
            <div className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Last Sync:</span>
                <span className="text-sm font-medium text-slate-900">{syncStats.lastSync}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admin Authorization Modal */}
      <AdminAuth
        isOpen={showAdminAuth}
        onClose={() => setShowAdminAuth(false)}
        onAuthorized={() => setIsAdminAuthorized(true)}
      />
    </div>
  );
};

export default SettingsPage;
