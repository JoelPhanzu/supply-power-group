"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_CONTENT, type SectionKey } from "@/lib/content/schema";
import type { ActionResult } from "@/lib/actions/types";
import type { Json } from "@/lib/supabase/types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, error: "Vous devez être connecté." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") {
    return { supabase, error: "Action réservée aux administrateurs." };
  }
  return { supabase, error: null, userId: user.id };
}

export async function saveSiteSection(key: SectionKey, value: unknown): Promise<ActionResult> {
  if (!(key in DEFAULT_CONTENT) || !value || typeof value !== "object") {
    return { success: false, error: "Section invalide." };
  }

  const { supabase, error: authError, userId } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: value as Json, updated_by: userId ?? null }, { onConflict: "key" });

  if (error) {
    console.error("saveSiteSection failed:", error);
    return { success: false, error: "Enregistrement impossible, merci de réessayer." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function resetSiteSection(key: SectionKey): Promise<ActionResult> {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from("site_content").delete().eq("key", key);
  if (error) {
    console.error("resetSiteSection failed:", error);
    return { success: false, error: "Réinitialisation impossible." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
