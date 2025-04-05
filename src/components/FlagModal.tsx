
import { useState } from "react";
import { AIModel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FlagModalProps {
  model: AIModel;
  isOpen: boolean;
  onClose: () => void;
}

const FlagModal = ({ model, isOpen, onClose }: FlagModalProps) => {
  const [flagType, setFlagType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!flagType) {
      toast({
        title: "Error",
        description: "Please select a flag type",
        variant: "destructive",
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please provide a description",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Flag submitted",
        description: "Your report has been submitted for review",
      });
      setIsSubmitting(false);
      setFlagType("");
      setDescription("");
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Report Issue with {model.name}</DialogTitle>
          <DialogDescription>
            Submit a report for problematic model behavior. Your feedback helps
            improve model safety and reliability.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Issue Type</Label>
            <RadioGroup value={flagType} onValueChange={setFlagType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bias" id="bias" />
                <Label htmlFor="bias" className="font-normal cursor-pointer">
                  Bias or Discrimination
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="harmful" id="harmful" />
                <Label htmlFor="harmful" className="font-normal cursor-pointer">
                  Harmful or Dangerous Content
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inaccurate" id="inaccurate" />
                <Label htmlFor="inaccurate" className="font-normal cursor-pointer">
                  Factual Inaccuracy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal cursor-pointer">
                  Other Issue
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FlagModal;
