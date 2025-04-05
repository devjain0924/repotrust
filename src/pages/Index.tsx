
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ModelCard from "@/components/ModelCard";
import RecentActivity from "@/components/RecentActivity";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MOCK_ACTIVITIES, MOCK_MODELS } from "@/lib/data";
import { ArrowUpRight, Flag, MessageSquare, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Index = () => {
  const topModels = MOCK_MODELS.sort((a, b) => b.trustScore - a.trustScore).slice(0, 3);
  const activities = MOCK_ACTIVITIES.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Aggregate statistics
  const totalInteractions = MOCK_MODELS.reduce(
    (sum, model) => sum + model.totalInteractions,
    0
  );
  const totalReviews = MOCK_MODELS.reduce(
    (sum, model) => sum + model.totalReviews,
    0
  );
  const totalFlags = MOCK_MODELS.reduce(
    (sum, model) => sum + model.totalFlags,
    0
  );
  const activeFlags = MOCK_MODELS.reduce(
    (sum, model) => sum + model.activeFlags,
    0
  );

  // Prepare chart data
  const flagsChartData = MOCK_MODELS[0].flagHistory.map((item, index) => {
    const result = { name: item.month };
    MOCK_MODELS.slice(0, 3).forEach((model, modelIndex) => {
      result[model.name] = model.flagHistory[index]?.count || 0;
    });
    return result;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">AI Model Reputation Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage AI model reputation in a decentralized ecosystem
          </p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="stats-card">
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Interactions</p>
                <h3 className="text-2xl font-bold">{totalInteractions.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mr-4">
                <MessageSquare className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <h3 className="text-2xl font-bold">{totalReviews.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mr-4">
                <Flag className="h-6 w-6 text-danger" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Flags</p>
                <h3 className="text-2xl font-bold">{activeFlags.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stats-card">
            <CardContent className="p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mr-4">
                <Flag className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Flags</p>
                <h3 className="text-2xl font-bold">{totalFlags.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top models */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Models by Trust Score</h2>
            <Link
              to="/models"
              className="text-sm text-teal hover:text-teal-dark flex items-center"
            >
              View all models
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>

        {/* Charts and activity feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <h2 className="text-lg font-semibold">Flag History</h2>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={flagsChartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={MOCK_MODELS[0].name} fill="#1ABC9C" />
                    <Bar dataKey={MOCK_MODELS[1].name} fill="#3498DB" />
                    <Bar dataKey={MOCK_MODELS[2].name} fill="#9B59B6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-1">
            <RecentActivity activities={activities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
