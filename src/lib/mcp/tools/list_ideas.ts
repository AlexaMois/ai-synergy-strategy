import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_ideas",
  title: "Список идей",
  description: "Возвращает идеи из клиентского портала (portal ideas): заголовок, описание, статус, приоритет, число голосов.",
  inputSchema: {
    status: z.enum(["backlog", "planned", "in_progress", "done"]).optional().describe("Фильтр по статусу."),
    limit: z.number().int().min(1).max(100).optional().describe("Сколько записей вернуть (по умолчанию 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Требуется вход в аккаунт." }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("ideas")
      .select("id,title,description,status,priority,source,votes,created_at")
      .order("votes", { ascending: false })
      .limit(limit ?? 50);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { ideas: data ?? [] },
    };
  },
});