import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Lightbulb, Calendar } from "lucide-react";

type RoadmapStatus = "planned" | "in_progress" | "done";

interface RoadmapItem {
  id: string;
  title: string;
  short_description: string | null;
  status: RoadmapStatus;
  related_idea_id: string | null;
  eta: string | null;
  created_at: string;
}

interface Idea {
  id: string;
  title: string;
  description: string;
}

const columnConfig: { status: RoadmapStatus; label: string; color: string }[] = [
  { status: "planned", label: "Запланировано", color: "bg-blue-500" },
  { status: "in_progress", label: "В работе", color: "bg-amber-500" },
  { status: "done", label: "Готово", color: "bg-green-500" },
];

const PortalRoadmap = () => {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portal-roadmap"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmap_items")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as RoadmapItem[];
    },
  });

  const { data: ideas = [] } = useQuery({
    queryKey: ["portal-ideas-for-roadmap"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ideas")
        .select("id, title, description");

      if (error) throw error;
      return data as Idea[];
    },
  });

  const getRelatedIdea = (ideaId: string | null) => {
    if (!ideaId) return null;
    return ideas.find((i) => i.id === ideaId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Desktop Kanban */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {columnConfig.map((column) => {
          const columnItems = items.filter((item) => item.status === column.status);
          return (
            <div key={column.status} className="space-y-4">
              {/* Column header */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-semibold text-foreground">{column.label}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {columnItems.length}
                </Badge>
              </div>

              {/* Column content */}
              <div className="space-y-3 min-h-[200px] p-3 bg-muted/30 rounded-xl">
                {columnItems.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    Пока ничего нет
                  </p>
                ) : (
                  columnItems.map((item) => {
                    const relatedIdea = getRelatedIdea(item.related_idea_id);
                    return (
                      <Card key={item.id} className="cursor-default">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {item.short_description && (
                            <p className="text-sm text-muted-foreground">
                              {item.short_description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.eta && (
                              <Badge variant="outline" className="gap-1">
                                <Calendar className="h-3 w-3" />
                                {item.eta}
                              </Badge>
                            )}
                            {relatedIdea && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 cursor-pointer hover:bg-secondary/80"
                                  >
                                    <Lightbulb className="h-3 w-3" />
                                    Из идеи
                                  </Badge>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{relatedIdea.title}</DialogTitle>
                                    <DialogDescription>
                                      Связанная идея из сообщества
                                    </DialogDescription>
                                  </DialogHeader>
                                  <p className="text-muted-foreground whitespace-pre-wrap">
                                    {relatedIdea.description}
                                  </p>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile list */}
      <div className="md:hidden space-y-6">
        {columnConfig.map((column) => {
          const columnItems = items.filter((item) => item.status === column.status);
          if (columnItems.length === 0) return null;

          return (
            <div key={column.status} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-semibold text-foreground">{column.label}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {columnItems.length}
                </Badge>
              </div>

              {columnItems.map((item) => {
                const relatedIdea = getRelatedIdea(item.related_idea_id);
                return (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {item.short_description && (
                        <p className="text-sm text-muted-foreground">
                          {item.short_description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.eta && (
                          <Badge variant="outline" className="gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.eta}
                          </Badge>
                        )}
                        {relatedIdea && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="gap-1 cursor-pointer hover:bg-secondary/80"
                              >
                                <Lightbulb className="h-3 w-3" />
                                Из идеи
                              </Badge>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{relatedIdea.title}</DialogTitle>
                                <DialogDescription>
                                  Связанная идея из сообщества
                                </DialogDescription>
                              </DialogHeader>
                              <p className="text-muted-foreground whitespace-pre-wrap">
                                {relatedIdea.description}
                              </p>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Дорожная карта пока пуста</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalRoadmap;
