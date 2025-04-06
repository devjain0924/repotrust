import { Link } from "react-router-dom";
import { AIModel } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Flag, Users } from "lucide-react";

interface ModelCardProps {
  model: AIModel;
}

const ModelCard = ({ model }: ModelCardProps) => {
  const getTrustBadgeClass = (level: string) => {
    switch (level) {
      case "high":
        return "badge-success";
      case "medium":
        return "badge-warning";
      case "low":
        return "badge-danger";
      default:
        return "badge-neutral";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">{model.name}</h3>
            <span className={getTrustBadgeClass(model.trustLevel)}>
              {model.trustLevel.charAt(0).toUpperCase() + model.trustLevel.slice(1)} Trust
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            {model.provider} • v{model.version}
          </p>
        </div>
        <Link
          to={`/model/${model.id}`}
          className="flex items-center text-xs text-teal hover:text-teal-dark transition-colors"
        >
          View Details
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Trust Score</span>
            <span className="text-sm font-bold">{model.trustScore}%</span>
          </div>
          <Progress
            value={model.trustScore}
            className={`h-2 ${
              model.trustScore >= 80
                ? "bg-success/20"
                : model.trustScore >= 60
                ? "bg-warning/20"
                : "bg-danger/20"
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{model.totalInteractions.toLocaleString()} interactions</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-muted-foreground" />
            <span
              className={
                model.activeFlags > 50
                  ? "text-danger"
                  : model.activeFlags > 20
                  ? "text-warning"
                  : ""
              }
            >
              {model.activeFlags} active flags
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {model.capabilities.map((capability) => (
              <Badge key={capability} variant="outline" className="bg-muted/50 text-xs">
                {capability}
              </Badge>
            ))}
          </div>
        </div>

        {/* 🚀 New Chat Button */}
        <div className="mt-4 flex justify-end">
          <a
            href={model.chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Chat with {model.name}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelCard;
