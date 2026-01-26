import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, ThumbsUp, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

type IdeaStatus = "backlog" | "planned" | "in_progress" | "done";
type IdeaPriority = "low" | "medium" | "high";

interface Idea {
  id: string;
  title: string;
  description: string;
  source: string;
  status: IdeaStatus;
  priority: IdeaPriority;
  votes: number;
  created_at: string;
}

const statusLabels: Record<IdeaStatus, string> = {
  backlog: "В бэклоге",
  planned: "Запланировано",
  in_progress: "В работе",
  done: "Готово",
};

const statusColors: Record<IdeaStatus, string> = {
  backlog: "bg-muted text-muted-foreground",
  planned: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  in_progress: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const priorityColors: Record<IdeaPriority, string> = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const priorityLabels: Record<IdeaPriority, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

// Generate or retrieve session ID for vote tracking
const getSessionId = (): string => {
  let sessionId = localStorage.getItem("portal_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("portal_session_id", sessionId);
  }
  return sessionId;
};

const PortalIdeas = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<IdeaStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<IdeaPriority | "all">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [votedIds, setVotedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("portal_voted_ideas");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formIdea, setFormIdea] = useState("");

  const queryClient = useQueryClient();

  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["portal-ideas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .order("votes", { ascending: false });

      if (error) throw error;
      return data as Idea[];
    },
  });

  const voteMutation = useMutation({
    mutationFn: async (ideaId: string) => {
      const sessionId = getSessionId();
      
      // Use the secure RPC function to vote
      const { data, error } = await supabase.rpc("increment_idea_vote", {
        p_idea_id: ideaId,
        p_session_id: sessionId,
      });

      if (error) throw error;
      
      // Returns false if already voted
      if (data === false) {
        throw new Error("ALREADY_VOTED");
      }
      
      return data;
    },
    onSuccess: (_, ideaId) => {
      const newVoted = new Set(votedIds).add(ideaId);
      setVotedIds(newVoted);
      localStorage.setItem("portal_voted_ideas", JSON.stringify([...newVoted]));
      queryClient.invalidateQueries({ queryKey: ["portal-ideas"] });
      toast.success("Спасибо за голос!");
    },
    onError: (error) => {
      if (error instanceof Error && error.message === "ALREADY_VOTED") {
        toast.error("Вы уже голосовали за эту идею");
      } else {
        toast.error("Не удалось проголосовать");
      }
    },
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("ideas").insert({
        title: formIdea.substring(0, 100),
        description: `От: ${formName} (${formEmail})\n\n${formIdea}`,
        source: "client_form",
        status: "backlog",
        priority: "medium",
        votes: 0,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setFormName("");
      setFormEmail("");
      setFormIdea("");
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["portal-ideas"] });
      toast.success("Идея отправлена! Спасибо за предложение.");
    },
    onError: () => {
      toast.error("Не удалось отправить идею");
    },
  });

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || idea.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || idea.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formIdea.trim()) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }
    submitMutation.mutate();
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск идей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as IdeaStatus | "all")}
            className="h-11 px-3 rounded-xl border border-input bg-background text-sm"
          >
            <option value="all">Все статусы</option>
            <option value="backlog">В бэклоге</option>
            <option value="planned">Запланировано</option>
            <option value="in_progress">В работе</option>
            <option value="done">Готово</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as IdeaPriority | "all")}
            className="h-11 px-3 rounded-xl border border-input bg-background text-sm"
          >
            <option value="all">Все приоритеты</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>

        {/* Submit idea button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Предложить идею
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Предложите свою идею</DialogTitle>
              <DialogDescription>
                Расскажите, какую функцию или улучшение вы хотели бы видеть.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Иван Петров"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="ivan@company.ru"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idea">Ваша идея</Label>
                <Textarea
                  id="idea"
                  value={formIdea}
                  onChange={(e) => setFormIdea(e.target.value)}
                  placeholder="Опишите вашу идею или предложение..."
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
                {submitMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Отправить идею
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Ideas list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Идей пока нет. Станьте первым!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredIdeas.map((idea) => (
            <Card key={idea.id} className="cursor-default hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-2">{idea.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={priorityColors[idea.priority]}>
                      {priorityLabels[idea.priority]}
                    </Badge>
                    <Badge className={statusColors[idea.status]}>
                      {statusLabels[idea.status]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {idea.description.split("\n\n").pop()}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(idea.created_at).toLocaleDateString("ru-RU")}
                  </span>
                  <Button
                    variant={votedIds.has(idea.id) ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => !votedIds.has(idea.id) && voteMutation.mutate(idea.id)}
                    disabled={votedIds.has(idea.id) || voteMutation.isPending}
                    className="gap-2"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{idea.votes}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortalIdeas;
