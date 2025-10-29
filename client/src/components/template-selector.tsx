import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type Template = "minimal" | "detailed" | "creative";

interface TemplateSelectorProps {
  selected: Template;
  onSelect: (template: Template) => void;
}

const templates = [
  {
    id: "minimal" as Template,
    name: "Minimal",
    description: "Clean and simple layout focusing on essential information",
    features: ["Name & Title", "Bio", "Skills", "Contact"],
  },
  {
    id: "detailed" as Template,
    name: "Detailed",
    description: "Comprehensive profile with stats and social links",
    features: ["GitHub Stats", "Contribution Streak", "Top Languages", "Social Links"],
  },
  {
    id: "creative" as Template,
    name: "Creative",
    description: "Stand out with dynamic elements and custom sections",
    features: ["Custom Banners", "Badges", "Activity Graph", "Projects"],
  },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Choose Your Template</h2>
        <p className="text-sm text-muted-foreground">
          Select a template to get started with your profile README
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-6 cursor-pointer transition-all hover-elevate active-elevate-2 relative ${
              selected === template.id ? "border-primary" : ""
            }`}
            onClick={() => onSelect(template.id)}
            data-testid={`card-template-${template.id}`}
          >
            {selected === template.id && (
              <div className="absolute top-4 right-4">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
