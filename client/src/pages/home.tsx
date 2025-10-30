import { useState, useEffect } from "react";
import { Github, ChevronRight, ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { TemplateSelector } from "@/components/template-selector";
import { SkillSelector } from "@/components/skill-selector";
import { SocialLinksForm } from "@/components/social-links-form";
import { MarkdownPreview } from "@/components/markdown-preview";
import { StepIndicator } from "@/components/step-indicator";
import { generateMarkdown } from "@/lib/markdown-generator";
import type { ReadmeProfile } from "@shared/schema";

const steps = [
  { id: 1, title: "Basic Info", description: "Tell us about yourself" },
  { id: 2, title: "Links", description: "Portfolio, blog, resume" },
  { id: 3, title: "Social", description: "Social media profiles" },
  { id: 4, title: "Skills", description: "Technologies you know" },
  { id: 5, title: "Preview", description: "Review and generate" },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<ReadmeProfile>({
    template: "minimal",
    name: "",
    tagline: "",
    bio: "",
    location: "",
    website: "",
    skills: [],
    githubUsername: "",
    showStats: false,
    showStreak: false,
    showTopLanguages: false,
    showProfileViews: false,
    showTrophies: false,
    showProjects: false,
    showAskMeAbout: false,
    showContactInfo: false,
    socialLinks: {},
    customSections: [],
    projects: [],
    askMeAbout: [],
    contactInfo: {}
  });

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const generated = generateMarkdown(profile);
    setMarkdown(generated);
  }, [profile]);

  const updateProfile = <K extends keyof ReadmeProfile>(
    field: K,
    value: ReadmeProfile[K]
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocialLink = (platform: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
              <Github className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">README Generator</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Create stunning GitHub profiles
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="transition-all duration-300 ease-in-out"
            style={{
              opacity: 1,
              transform: "translateX(0)",
            }}
          >
            {currentStep === 1 && (
              <Card className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Basic Information</h2>
                    <p className="text-muted-foreground">
                      Let's start with the essentials about you
                    </p>
                  </div>

                  <TemplateSelector
                    selected={profile.template}
                    onSelect={(template) => updateProfile("template", template)}
                  />

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={profile.name}
                        onChange={(e) => updateProfile("name", e.target.value)}
                        data-testid="input-name"
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">Professional Tagline</Label>
                      <Input
                        id="tagline"
                        placeholder="Full Stack Developer | Open Source Enthusiast"
                        value={profile.tagline}
                        onChange={(e) => updateProfile("tagline", e.target.value)}
                        data-testid="input-tagline"
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">About You</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself, your passions, and what you're working on..."
                        value={profile.bio}
                        onChange={(e) => updateProfile("bio", e.target.value)}
                        rows={5}
                        data-testid="input-bio"
                        className="text-base resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        value={profile.location}
                        onChange={(e) => updateProfile("location", e.target.value)}
                        data-testid="input-location"
                        className="text-base"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Links & Portfolio</h2>
                    <p className="text-muted-foreground">
                      Share your portfolio, blog, or personal website
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Personal Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={profile.website}
                        onChange={(e) => updateProfile("website", e.target.value)}
                        data-testid="input-website"
                        className="text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github-username">GitHub Username</Label>
                      <Input
                        id="github-username"
                        placeholder="username"
                        value={profile.githubUsername}
                        onChange={(e) => updateProfile("githubUsername", e.target.value)}
                        data-testid="input-github-username"
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground">
                        Used to display GitHub statistics and activity
                      </p>
                    </div>

                    {profile.githubUsername && (
                      <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-medium">GitHub Stats Options</h3>
                        
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                          <div>
                            <Label htmlFor="show-stats" className="text-sm font-medium">
                              Show GitHub Stats Card
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Display your profile statistics
                            </p>
                          </div>
                          <Switch
                            id="show-stats"
                            checked={profile.showStats}
                            onCheckedChange={(checked) =>
                              updateProfile("showStats", checked)
                            }
                            data-testid="switch-show-stats"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                          <div>
                            <Label htmlFor="show-streak" className="text-sm font-medium">
                              Show Contribution Streak
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Display your coding streak
                            </p>
                          </div>
                          <Switch
                            id="show-streak"
                            checked={profile.showStreak}
                            onCheckedChange={(checked) =>
                              updateProfile("showStreak", checked)
                            }
                            data-testid="switch-show-streak"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                          <div>
                            <Label htmlFor="show-languages" className="text-sm font-medium">
                              Show Top Languages
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Display your most used languages
                            </p>
                          </div>
                          <Switch
                            id="show-languages"
                            checked={profile.showTopLanguages}
                            onCheckedChange={(checked) =>
                              updateProfile("showTopLanguages", checked)
                            }
                            data-testid="switch-show-languages"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                          <div>
                            <Label htmlFor="show-profile-views" className="text-sm font-medium">
                              Show Profile Views
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Display your GitHub profile view counter
                            </p>
                          </div>
                          <Switch
                            id="show-profile-views"
                            checked={profile.showProfileViews}
                            onCheckedChange={(checked) =>
                              updateProfile("showProfileViews", checked)
                            }
                            data-testid="switch-show-profile-views"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                          <div>
                            <Label htmlFor="show-trophies" className="text-sm font-medium">
                              Show GitHub Trophies
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Display your GitHub achievement trophies
                            </p>
                          </div>
                          <Switch
                            id="show-trophies"
                            checked={profile.showTrophies}
                            onCheckedChange={(checked) =>
                              updateProfile("showTrophies", checked)
                            }
                            data-testid="switch-show-trophies"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Social Media</h2>
                    <p className="text-muted-foreground">
                      Connect your social media profiles
                    </p>
                  </div>

                  <SocialLinksForm
                    values={profile.socialLinks || {}}
                    onChange={updateSocialLink}
                  />
                </div>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">Skills & Projects</h2>
                    <p className="text-muted-foreground">
                      Add your skills and showcase your projects
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Skills & Technologies</h3>
                      <SkillSelector
                        selected={profile.skills}
                        onChange={(skills) => updateProfile("skills", skills)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Projects</h3>
                          <p className="text-sm text-muted-foreground">
                            Showcase your best work
                          </p>
                        </div>
                        <Switch
                          checked={profile.showProjects}
                          onCheckedChange={(checked) =>
                            updateProfile("showProjects", checked)
                          }
                        />
                      </div>
                      
                      {profile.showProjects && (
                        <div className="space-y-4 pl-4 border-l-2 border-muted">
                          <div className="space-y-2">
                            <Label>Project 1</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input 
                                placeholder="Project name" 
                                className="text-base"
                              />
                              <Input 
                                placeholder="Project URL (optional)" 
                                type="url" 
                                className="text-base"
                              />
                            </div>
                            <Textarea 
                              placeholder="Project description" 
                              rows={3} 
                              className="text-base resize-none"
                            />
                            <div>
                              <Label className="text-sm text-muted-foreground">
                                Tags (comma separated)
                              </Label>
                              <Input 
                                placeholder="react, typescript, node" 
                                className="text-base mt-1"
                              />
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2">
                            Add Another Project
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Ask Me About</h3>
                          <p className="text-sm text-muted-foreground">
                            Topics you're knowledgeable about
                          </p>
                        </div>
                        <Switch
                          checked={profile.showAskMeAbout}
                          onCheckedChange={(checked) =>
                            updateProfile("showAskMeAbout", checked)
                          }
                        />
                      </div>
                      
                      {profile.showAskMeAbout && (
                        <div className="space-y-2 pl-4">
                          <Textarea 
                            placeholder="Web Development, Open Source, Tech in general..." 
                            rows={3} 
                            className="text-base resize-none"
                            value={profile.askMeAbout?.join("\n") || ""}
                            onChange={(e) => {
                              const topics = e.target.value.split("\n").filter(Boolean);
                              updateProfile("askMeAbout", topics);
                            }}
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter one topic per line
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Contact Information</h3>
                          <p className="text-sm text-muted-foreground">
                            How people can reach you
                          </p>
                        </div>
                        <Switch
                          checked={profile.showContactInfo}
                          onCheckedChange={(checked) =>
                            updateProfile("showContactInfo", checked)
                          }
                        />
                      </div>
                      
                      {profile.showContactInfo && (
                        <div className="space-y-4 pl-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Email</Label>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com"
                                value={profile.contactInfo?.email || ""}
                                onChange={(e) => 
                                  updateProfile("contactInfo", {
                                    ...profile.contactInfo,
                                    email: e.target.value
                                  })
                                }
                                className="text-base"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Website</Label>
                              <Input 
                                type="url" 
                                placeholder="https://yourwebsite.com"
                                value={profile.contactInfo?.website || ""}
                                onChange={(e) => 
                                  updateProfile("contactInfo", {
                                    ...profile.contactInfo,
                                    website: e.target.value
                                  })
                                }
                                className="text-base"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Blog</Label>
                            <Input 
                              type="url" 
                              placeholder="https://blog.yourwebsite.com"
                              value={profile.contactInfo?.blog || ""}
                              onChange={(e) => 
                                updateProfile("contactInfo", {
                                  ...profile.contactInfo,
                                  blog: e.target.value
                                })
                              }
                              className="text-base"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <MarkdownPreview markdown={markdown} />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              data-testid="button-previous"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>

            <Button
              onClick={nextStep}
              disabled={currentStep === 5}
              data-testid="button-next"
            >
              {currentStep === 4 ? "Review" : "Next"}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
