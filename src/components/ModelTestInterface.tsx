
import { useState } from "react";
import { AIModel, ModelTestResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Flag, Send, ThumbsDown, ThumbsUp } from "lucide-react";

interface ModelTestInterfaceProps {
  model: AIModel;
  onOpenFlagModal: () => void;
}

const ModelTestInterface = ({ model, onOpenFlagModal }: ModelTestInterfaceProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<ModelTestResponse | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockResponse: ModelTestResponse = {
        id: `response-${Date.now()}`,
        modelId: model.id,
        prompt: prompt,
        response: `This is a simulated response from ${model.name} by ${model.provider}. In a real implementation, this would connect to the actual model API.
        
The response would be based on the prompt: "${prompt}"`,
        timestamp: new Date().toISOString(),
      };
      
      setResponse(mockResponse);
      setIsGenerating(false);
      setRating(null);
    }, 2000);
  };

  const handleRating = (value: number) => {
    setRating(value);
    // In a real implementation, this would save the rating
    console.log(`Rating saved: ${value}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Test {model.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Textarea
              placeholder={`Enter a prompt to test ${model.name}...`}
              className="min-h-[120px] resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button
                onClick={handleSubmit}
                disabled={!prompt.trim() || isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating ? "Generating..." : "Send Prompt"}
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isGenerating && (
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-teal animate-pulse-gentle"></div>
                <div className="h-2 w-2 rounded-full bg-teal animate-pulse-gentle [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 rounded-full bg-teal animate-pulse-gentle [animation-delay:0.4s]"></div>
                <span className="ml-2 text-sm text-muted-foreground">
                  Generating response...
                </span>
              </div>
            </div>
          )}

          {response && !isGenerating && (
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted/30 p-3 border-b">
                <p className="text-sm font-medium">Response</p>
              </div>
              <div className="p-4">
                <p className="text-sm whitespace-pre-line">{response.response}</p>
              </div>
              <div className="p-3 border-t bg-muted/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Rate this response
                  </p>
                  <div className="flex gap-3 mt-1">
                    <Button
                      variant={rating === 1 ? "default" : "outline"}
                      size="sm"
                      className={`flex items-center gap-1 h-8 ${rating === 1 ? 'bg-success text-white' : ''}`}
                      onClick={() => handleRating(1)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-xs">Helpful</span>
                    </Button>
                    <Button
                      variant={rating === 0 ? "default" : "outline"}
                      size="sm"
                      className={`flex items-center gap-1 h-8 ${rating === 0 ? 'bg-danger text-white' : ''}`}
                      onClick={() => handleRating(0)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span className="text-xs">Not Helpful</span>
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenFlagModal}
                  className="flex items-center gap-1 h-8 text-danger"
                >
                  <Flag className="h-4 w-4" />
                  <span className="text-xs">Flag</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelTestInterface;
