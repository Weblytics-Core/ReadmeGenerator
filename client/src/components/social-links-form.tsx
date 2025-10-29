import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Twitter, Youtube, Instagram, Globe } from "lucide-react";

interface SocialLinksFormProps {
  values: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    website?: string;
  };
  onChange: (field: string, value: string) => void;
}

const socialPlatforms = [
  { key: "github", label: "GitHub", icon: Github, placeholder: "username" },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "username" },
  { key: "twitter", label: "Twitter/X", icon: Twitter, placeholder: "username" },
  { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "channel" },
  { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "username" },
  { key: "website", label: "Website", icon: Globe, placeholder: "https://example.com" },
];

export function SocialLinksForm({ values, onChange }: SocialLinksFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-2">Social Links</h3>
        <p className="text-sm text-muted-foreground">
          Add your social media profiles and website
        </p>
      </div>

      <div className="grid gap-4">
        {socialPlatforms.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={`social-${key}`} className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
              </div>
            </Label>
            <Input
              id={`social-${key}`}
              placeholder={placeholder}
              value={values[key as keyof typeof values] || ""}
              onChange={(e) => onChange(key, e.target.value)}
              data-testid={`input-social-${key}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
