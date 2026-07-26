import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listIdeasTool from "./tools/list_ideas";
import listReleaseNotesTool from "./tools/list_release_notes";
import listRoadmapTool from "./tools/list_roadmap";
import submitIdeaTool from "./tools/submit_idea";

// Direct Supabase issuer (never the .lovable.cloud proxy). Read from the
// Vite-inlined project id so this stays import-safe at build/extract time.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "aleksamois-mcp",
  title: "Александра Моисеева — MCP",
  version: "0.1.0",
  instructions:
    "Инструменты для клиентского портала aleksamois.ru. Используйте list_ideas, list_release_notes и list_roadmap для чтения, submit_idea — чтобы предложить новую идею от имени вошедшего пользователя.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listIdeasTool, listReleaseNotesTool, listRoadmapTool, submitIdeaTool],
});