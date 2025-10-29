import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { skillCategories } from "@shared/schema";

interface SkillSelectorProps {
  selected: string[];
  onChange: (skills: string[]) => void;
}

export function SkillSelector({ selected, onChange }: SkillSelectorProps) {
  const [search, setSearch] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const filteredCategories = Object.entries(skillCategories).reduce(
    (acc, [category, skills]) => {
      const filtered = skills.filter((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  const toggleSkill = (skill: string) => {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
    } else {
      onChange([...selected, skill]);
    }
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selected.includes(customSkill.trim())) {
      onChange([...selected, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium mb-2">Skills & Technologies</h3>
        <p className="text-sm text-muted-foreground">
          Select your skills or add custom ones
        </p>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-md">
          {selected.map((skill) => (
            <Badge
              key={skill}
              variant="default"
              className="gap-1"
              data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {skill}
              <button
                onClick={() => toggleSkill(skill)}
                className="ml-1 hover:text-destructive"
                data-testid={`button-remove-${skill.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-testid="input-search-skills"
        />
      </div>

      <div className="space-y-2">
        {Object.entries(filteredCategories).map(([category, skills]) => (
          <Collapsible key={category} defaultOpen={search.length > 0}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm font-medium bg-card rounded-md hover-elevate" data-testid={`button-category-${category.toLowerCase()}`}>
              <span>{category}</span>
              <span className="text-xs text-muted-foreground">
                {skills.filter((s) => selected.includes(s)).length}/{skills.length}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="flex flex-wrap gap-2 p-3 bg-muted/20 rounded-md">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selected.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover-elevate"
                    onClick={() => toggleSkill(skill)}
                    data-testid={`badge-skill-option-${skill.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Add Custom Skill</p>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Machine Learning"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
            data-testid="input-custom-skill"
          />
          <Button
            onClick={addCustomSkill}
            size="icon"
            variant="outline"
            data-testid="button-add-custom-skill"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
