import { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Loader2, Lightbulb, Map, Megaphone, Lock, ShieldX } from "lucide-react";
import { toast } from "sonner";

const PortalAdminPage = () => {
  const { user, isAdmin, isLoading: authLoading, signIn, signOut } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState("ideas");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Введите email и пароль");
      return;
    }
    
    setIsSigningIn(true);
    const { error } = await signIn(email, password);
    setIsSigningIn(false);
    
    if (error) {
      toast.error(error.message === "Invalid login credentials" 
        ? "Неверный email или пароль" 
        : error.message);
    } else {
      toast.success("Добро пожаловать в админ-панель");
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Вы вышли из системы");
  };

  // Loading state
  if (authLoading) {
    return (
      <>
        <Helmet>
          <title>Админ-панель портала | Нейрорешения</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </>
    );
  }

  // Not authenticated - show login form
  if (!user) {
    return (
      <>
        <Helmet>
          <title>Админ-панель портала | Нейрорешения</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Админ-панель портала</CardTitle>
              <CardDescription>Войдите с учетной записью администратора</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                />
              </div>
              <Button className="w-full" onClick={handleLogin} disabled={isSigningIn}>
                {isSigningIn && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Войти
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  // Authenticated but not admin
  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Доступ запрещён | Нейрорешения</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <main className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="text-center">
              <ShieldX className="h-12 w-12 mx-auto text-destructive mb-4" />
              <CardTitle>Доступ запрещён</CardTitle>
              <CardDescription>
                У вас нет прав администратора для доступа к этой странице.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Вы вошли как: {user.email}
              </p>
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                Выйти
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Админ-панель портала | Нейрорешения</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Админ-панель портала
              </h1>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Выйти
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="ideas" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                Идеи
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="gap-2">
                <Map className="h-4 w-4" />
                Дорожная карта
              </TabsTrigger>
              <TabsTrigger value="updates" className="gap-2">
                <Megaphone className="h-4 w-4" />
                Обновления
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ideas">
              <IdeasAdmin />
            </TabsContent>

            <TabsContent value="roadmap">
              <RoadmapAdmin />
            </TabsContent>

            <TabsContent value="updates">
              <UpdatesAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

// Ideas Admin Component
const IdeasAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    source: "internal" as "client" | "internal" | "partner" | "client_form",
    status: "backlog" as "backlog" | "planned" | "in_progress" | "done",
    priority: "medium" as "low" | "medium" | "high",
    votes: 0,
  });

  const queryClient = useQueryClient();

  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["admin-ideas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editingId) {
        const { error } = await supabase
          .from("ideas")
          .update(form)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("ideas").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ideas"] });
      setIsDialogOpen(false);
      resetForm();
      toast.success(editingId ? "Идея обновлена" : "Идея добавлена");
    },
    onError: () => toast.error("Ошибка сохранения"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ideas").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-ideas"] });
      toast.success("Идея удалена");
    },
    onError: () => toast.error("Ошибка удаления"),
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      source: "internal",
      status: "backlog",
      priority: "medium",
      votes: 0,
    });
    setEditingId(null);
  };

  const handleEdit = (idea: any) => {
    setForm({
      title: idea.title,
      description: idea.description,
      source: idea.source,
      status: idea.status,
      priority: idea.priority,
      votes: idea.votes,
    });
    setEditingId(idea.id);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Управление идеями</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать идею" : "Новая идея"}</DialogTitle>
              <DialogDescription>
                Заполните информацию об идее
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Заголовок</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Описание</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Источник</Label>
                  <select
                    value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value as any })}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="internal">Внутреннее</option>
                    <option value="client">Клиент</option>
                    <option value="partner">Партнёр</option>
                    <option value="client_form">Форма клиента</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Статус</Label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="backlog">В бэклоге</option>
                    <option value="planned">Запланировано</option>
                    <option value="in_progress">В работе</option>
                    <option value="done">Готово</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Приоритет</Label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Голоса</Label>
                  <Input
                    type="number"
                    value={form.votes}
                    onChange={(e) => setForm({ ...form, votes: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Голоса</TableHead>
                <TableHead className="w-24">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ideas.map((idea: any) => (
                <TableRow key={idea.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {idea.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{idea.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{idea.priority}</Badge>
                  </TableCell>
                  <TableCell>{idea.votes}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(idea)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => deleteMutation.mutate(idea.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

// Roadmap Admin Component
const RoadmapAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    short_description: "",
    status: "planned" as "planned" | "in_progress" | "done",
    related_idea_id: null as string | null,
    eta: "",
  });

  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-roadmap"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("roadmap_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: ideas = [] } = useQuery({
    queryKey: ["admin-ideas-select"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ideas")
        .select("id, title")
        .order("title");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        related_idea_id: form.related_idea_id || null,
      };
      if (editingId) {
        const { error } = await supabase
          .from("roadmap_items")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("roadmap_items").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roadmap"] });
      setIsDialogOpen(false);
      resetForm();
      toast.success(editingId ? "Элемент обновлён" : "Элемент добавлен");
    },
    onError: () => toast.error("Ошибка сохранения"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("roadmap_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-roadmap"] });
      toast.success("Элемент удалён");
    },
    onError: () => toast.error("Ошибка удаления"),
  });

  const resetForm = () => {
    setForm({
      title: "",
      short_description: "",
      status: "planned",
      related_idea_id: null,
      eta: "",
    });
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setForm({
      title: item.title,
      short_description: item.short_description || "",
      status: item.status,
      related_idea_id: item.related_idea_id,
      eta: item.eta || "",
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Управление дорожной картой</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать элемент" : "Новый элемент"}</DialogTitle>
              <DialogDescription>
                Заполните информацию об элементе дорожной карты
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Заголовок</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Краткое описание</Label>
                <Textarea
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Статус</Label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="planned">Запланировано</option>
                    <option value="in_progress">В работе</option>
                    <option value="done">Готово</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>ETA</Label>
                  <Input
                    value={form.eta}
                    onChange={(e) => setForm({ ...form, eta: e.target.value })}
                    placeholder="Q1 2025"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Связанная идея</Label>
                <select
                  value={form.related_idea_id || ""}
                  onChange={(e) => setForm({ ...form, related_idea_id: e.target.value || null })}
                  className="w-full h-11 px-3 rounded-xl border border-input bg-background"
                >
                  <option value="">Не выбрано</option>
                  {ideas.map((idea: any) => (
                    <option key={idea.id} value={idea.id}>
                      {idea.title}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                className="w-full" 
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead className="w-24">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.status}</Badge>
                  </TableCell>
                  <TableCell>{item.eta || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => deleteMutation.mutate(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

// Updates Admin Component
const UpdatesAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
    status: "released" as "released" | "beta" | "internal",
    published_at: new Date().toISOString().split("T")[0],
  });

  const queryClient = useQueryClient();

  const { data: releases = [], isLoading } = useQuery({
    queryKey: ["admin-updates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("release_notes")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        summary: form.summary,
        content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: form.status,
        published_at: new Date(form.published_at).toISOString(),
      };
      if (editingId) {
        const { error } = await supabase
          .from("release_notes")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("release_notes").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-updates"] });
      setIsDialogOpen(false);
      resetForm();
      toast.success(editingId ? "Обновление изменено" : "Обновление добавлено");
    },
    onError: () => toast.error("Ошибка сохранения"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("release_notes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-updates"] });
      toast.success("Обновление удалено");
    },
    onError: () => toast.error("Ошибка удаления"),
  });

  const resetForm = () => {
    setForm({
      title: "",
      summary: "",
      content: "",
      tags: "",
      status: "released",
      published_at: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
  };

  const handleEdit = (release: any) => {
    setForm({
      title: release.title,
      summary: release.summary,
      content: release.content,
      tags: release.tags.join(", "),
      status: release.status,
      published_at: new Date(release.published_at).toISOString().split("T")[0],
    });
    setEditingId(release.id);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Управление обновлениями</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать обновление" : "Новое обновление"}</DialogTitle>
              <DialogDescription>
                Заполните информацию об обновлении
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-2">
                <Label>Заголовок</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Краткое описание</Label>
                <Textarea
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Полный текст</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Теги (через запятую)</Label>
                  <Input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="интеграции, автоматизация"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Статус</Label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full h-11 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="released">Опубликовано</option>
                    <option value="beta">Бета</option>
                    <option value="internal">Внутреннее</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Дата публикации</Label>
                <Input
                  type="date"
                  value={form.published_at}
                  onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="w-24">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releases.map((release: any) => (
                <TableRow key={release.id}>
                  <TableCell className="font-medium max-w-xs truncate">
                    {release.title}
                  </TableCell>
                  <TableCell>
                    {new Date(release.published_at).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{release.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(release)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => deleteMutation.mutate(release.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default PortalAdminPage;
