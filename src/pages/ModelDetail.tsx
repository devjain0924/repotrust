
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import FlagModal from "@/components/FlagModal";
import ModelTestInterface from "@/components/ModelTestInterface";
import RecentActivity from "@/components/RecentActivity";
import TrustScoreChart from "@/components/TrustScoreChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_ACTIVITIES, MOCK_MODELS } from "@/lib/data";
import { ArrowLeft, Badge, Flag, Info, MessageSquare, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";
import { Badge as UIBadge } from "@/components/ui/badge";

const ModelDetail = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  
  const model = MOCK_MODELS.find((m) => m.id === modelId) || MOCK_MODELS[0];
  
  const modelActivities = MOCK_ACTIVITIES
    .filter((activity) => activity.modelId === model.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getTrustLevelColor = () => {
    switch (model.trustLevel) {
      case "high":
        return "bg-success/20 text-success-dark";
      case "medium":
        return "bg-warning/20 text-warning-dark";
      case "low":
        return "bg-danger/20 text-danger-dark";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{model.name}</h1>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrustLevelColor()}`}>
                  {model.trustLevel.charAt(0).toUpperCase() + model.trustLevel.slice(1)} Trust
                </span>
              </div>
              <p className="text-muted-foreground mt-1">
                {model.provider} • v{model.version} • Last updated {new Date(model.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-danger border-danger/30 hover:bg-danger/10"
              onClick={() => setIsFlagModalOpen(true)}
            >
              <Flag className="h-4 w-4" />
              Report Issue
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">{model.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {model.capabilities.map((capability) => (
                  <UIBadge key={capability} variant="outline" className="bg-muted/50">
                    {capability}
                  </UIBadge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="stats-card">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Interactions</p>
                <h3 className="text-xl font-bold">{model.totalInteractions.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mr-3">
                <MessageSquare className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reviews</p>
                <h3 className="text-xl font-bold">{model.totalReviews.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-4 flex items-center">
              <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center mr-3">
                <Flag className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Flags</p>
                <h3 className="text-xl font-bold">{model.activeFlags.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="test">Test Model</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrustScoreChart model={model} />
              
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Usage Over Time</h2>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={model.usageStatistics}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="interactions"
                          stroke="#1ABC9C"
                          strokeWidth={2}
                          dot={{ strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Flag History</h2>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={model.flagHistory}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#E74C3C"
                          strokeWidth={2}
                          dot={{ strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <h2 className="text-lg font-semibold">Trust Factors</h2>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Historical Consistency</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-teal rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Community Feedback</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-teal rounded-full" style={{ width: "87%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Expert Reviews</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-teal rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Flag Resolution Rate</span>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-teal rounded-full" style={{ width: "89%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="test" className="mt-6">
            <ModelTestInterface model={model} onOpenFlagModal={() => setIsFlagModalOpen(true)} />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <RecentActivity activities={modelActivities} />
          </TabsContent>
        </Tabs>
      </main>
      
      <FlagModal 
        model={model} 
        isOpen={isFlagModalOpen} 
        onClose={() => setIsFlagModalOpen(false)} 
      />
    </div>
  );
};

export default ModelDetail;
