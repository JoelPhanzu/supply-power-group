import { createClient } from "@supabase/supabase-js";
import { DEFAULT_CONTENT, type SectionKey, type SiteContent } from "@/lib/content/schema";

// Client sans cookies : le contenu est public, et cela permet à Next de mettre
// la page d'accueil en cache (elle est régénérée à chaque enregistrement admin).
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export function mergeContent(
  rows: { key: string; value: unknown }[] | null | undefined
): SiteContent {
  const content = structuredClone(DEFAULT_CONTENT) as SiteContent;
  for (const row of rows ?? []) {
    if (!(row.key in content) || !row.value || typeof row.value !== "object") continue;
    const key = row.key as SectionKey;
    // Fusion par section : les champs ajoutés plus tard gardent leur valeur par défaut.
    (content as unknown as Record<string, unknown>)[key] = {
      ...content[key],
      ...(row.value as object),
    };
  }
  return content;
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const { data, error } = await publicClient().from("site_content").select("key, value");
    if (error) {
      console.error("getSiteContent failed:", error.message);
      return DEFAULT_CONTENT;
    }
    return mergeContent(data);
  } catch (e) {
    console.error("getSiteContent failed:", e);
    return DEFAULT_CONTENT;
  }
}
