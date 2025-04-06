
import { useState } from "react";
import Header from "@/components/Header";
import ModelCard from "@/components/ModelCard";
import { MOCK_MODELS } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrustLevel } from "@/lib/types";

const Models = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("trustScore");
  const [filterTrust, setFilterTrust] = useState<TrustLevel | "all">("all");

  // Filter and sort models
  const filteredModels = MOCK_MODELS
    .filter((model) => {
      // Apply search filter
      const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           model.provider.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply trust level filter
      const matchesTrust = filterTrust === "all" || model.trustLevel === filterTrust;
      
      return matchesSearch && matchesTrust;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch (sortBy) {
        case "trustScore":
          return b.trustScore - a.trustScore;
        case "name":
          return a.name.localeCompare(b.name);
        case "provider":
          return a.provider.localeCompare(b.provider);
        case "activeFlags":
          return b.activeFlags - a.activeFlags;
        case "interactions":
          return b.totalInteractions - a.totalInteractions;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">AI Model Directory</h1>
          <p className="text-muted-foreground">
            Explore and compare AI models based on trust scores and capabilities
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search models by name or provider..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-40">
                  <Select 
                    value={sortBy} 
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trustScore">Trust Score</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="provider">Provider</SelectItem>
                      <SelectItem value="activeFlags">Active Flags</SelectItem>
                      <SelectItem value="interactions">Usage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-40">
                  <Select 
                    value={filterTrust} 
                    onValueChange={(value) => setFilterTrust(value as TrustLevel | "all")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Trust Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High Trust</SelectItem>
                      <SelectItem value="medium">Medium Trust</SelectItem>
                      <SelectItem value="low">Low Trust</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No models match your search criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Models;
