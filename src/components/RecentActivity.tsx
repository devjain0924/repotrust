
import { RecentActivity as ActivityType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Flag, MessageSquare, Users } from "lucide-react";
import { format, formatDistanceToNow, parseISO } from "date-fns";

interface RecentActivityProps {
  activities: ActivityType[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "flag":
        return <Flag className="h-4 w-4 text-danger" />;
      case "review":
        return <MessageSquare className="h-4 w-4 text-success" />;
      case "moderation":
        return <Bell className="h-4 w-4 text-warning" />;
      case "interaction":
        return <Users className="h-4 w-4 text-teal" />;
      default:
        return null;
    }
  };

  const getRelativeTime = (timestamp: string) => {
    return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="space-y-0">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start w-full">
                  <p className="text-sm font-medium truncate pr-2">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {getRelativeTime(activity.timestamp)}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="hover:text-foreground transition-colors">
                      {activity.modelName}
                    </span>{" "}
                    • {activity.user}
                  </p>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activity.type === "flag"
                        ? "bg-danger/10 text-danger"
                        : activity.type === "review"
                        ? "bg-success/10 text-success"
                        : activity.type === "moderation"
                        ? "bg-warning/10 text-warning"
                        : "bg-teal/10 text-teal"
                    }`}
                  >
                    {activity.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
