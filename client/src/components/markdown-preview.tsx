import { useState, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Eye, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview");
  const { toast } = useToast();

  const htmlContent = useMemo(() => {
    if (!markdown) return "";
    const rawHtml = marked.parse(markdown, { breaks: true, gfm: true });
    return DOMPurify.sanitize(rawHtml as string);
  }, [markdown]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast({
        title: "Copied to clipboard!",
        description: "Your README markdown has been copied.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Your README.md file has been downloaded.",
    });
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            data-testid="button-copy-markdown"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadMarkdown}
            data-testid="button-download-markdown"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="preview" data-testid="tab-preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="markdown" data-testid="tab-markdown">
                <Code className="h-4 w-4 mr-2" />
                Markdown
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="flex-1 overflow-auto m-0">
            <div className="p-6">
              {htmlContent ? (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                  data-testid="preview-content"
                />
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <p className="text-lg font-medium">No content yet</p>
                    <p className="text-sm mt-1">Fill in the form to see your README preview</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="markdown" className="flex-1 overflow-auto m-0">
            <div className="p-6">
              {markdown ? (
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code className="text-sm font-mono" data-testid="markdown-code">
                    {markdown}
                  </code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <p className="text-lg font-medium">No content yet</p>
                    <p className="text-sm mt-1">Fill in the form to see the markdown</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
