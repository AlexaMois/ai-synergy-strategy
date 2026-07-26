import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

export default defineTool({
  name: "submit_idea",
  title: "Отправить идею",
  description: "Создаёт новую идею в клиентском портале от имени вошедшего пользователя.",
  inputSchema: {
    title: z.string().trim().min(3).describe("Короткий заголовок идеи."),
    description: z.string().trim().min(10).describe("Подробное описание."),
    priority: z.enum(["low", "medium", "high"]).optional().describe("Приоритет."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ title, description, priority }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Требуется вход в аккаунт." }], isError: true };
    }
    const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await sb
      .from("ideas")
      .insert({ title, description, priority: priority ?? "medium", source: "client_form" })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Идея создана: ${data.id}` }],
      structuredContent: { idea: data },
    };
  },
});