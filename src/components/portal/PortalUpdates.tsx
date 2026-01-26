import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Search, Loader2, Calendar, ChevronRight } from "lucide-react";

interface ReleaseNote {
  id: string;
  published_at: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  status: "released" | "beta" | "internal";
}

const PortalUpdates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const { data: releases = [], isLoading } = useQuery({
    queryKey: ["portal-updates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("release_notes")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as ReleaseNote[];
    },
  });

  // Get all unique tags
  const allTags = [...new Set(releases.flatMap((r) => r.tags))].sort();

  // Toggle tag filter
  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  // Filter releases
  const filteredReleases = releases.filter((release) => {
    const matchesSearch =
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTags =
      selectedTags.size === 0 ||
      release.tags.some((tag) => selectedTags.has(tag));

    return matchesSearch && matchesTags;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
      {/* Controls */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск обновлений..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tag filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.has(tag) ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.size > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags(new Set())}
                className="h-6 px-2 text-xs"
              >
                Сбросить
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Updates list */}
      {filteredReleases.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {releases.length === 0
              ? "Обновлений пока нет. Скоро здесь появятся новости!"
              : "Ничего не найдено"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReleases.map((release) => (
            <Card key={release.id} className="cursor-default">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(release.published_at)}
                    </div>
                    <CardTitle className="text-xl">{release.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{release.summary}</p>

                {/* Tags */}
                {release.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {release.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Read more */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto gap-1">
                      Подробнее
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(release.published_at)}
                      </div>
                      <DialogTitle className="text-2xl">{release.title}</DialogTitle>
                      <DialogDescription>{release.summary}</DialogDescription>
                    </DialogHeader>
                    {release.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 my-4">
                        {release.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {release.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="text-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalUpdates;
