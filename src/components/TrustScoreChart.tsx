
import { AIModel } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface TrustScoreChartProps {
  model: AIModel;
}

const TrustScoreChart = ({ model }: TrustScoreChartProps) => {
  const data = [
    { category: "Accuracy", value: model.ratings.accuracy, fullMark: 100 },
    { category: "Reliability", value: model.ratings.reliability, fullMark: 100 },
    { category: "Safety", value: model.ratings.safety, fullMark: 100 },
    { category: "Fairness", value: model.ratings.fairness, fullMark: 100 },
    { category: "Transparency", value: model.ratings.transparency, fullMark: 100 },
  ];

  const calcAverage = () => {
    const sum = Object.values(model.ratings).reduce((acc, val) => acc + val, 0);
    return Math.round(sum / Object.keys(model.ratings).length);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trust Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pt-4">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{calcAverage()}</span>
            <span className="text-xs text-muted-foreground">Average</span>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid gridType="polygon" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Radar
                  name={model.name}
                  dataKey="value"
                  stroke="#1ABC9C"
                  fill="#1ABC9C"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-4">
          {data.map((item) => (
            <div key={item.category} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{item.category}</div>
              <div className="text-sm font-bold">{item.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustScoreChart;
