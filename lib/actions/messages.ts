"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/actions/types";

export async function sendQuoteMessage(
  quoteRequestId: string,
  body: string
): Promise<ActionResult> {
  const trimmed = body.trim();
  if (!trimmed) {
    return { success: false, error: "Le message ne peut pas être vide." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Vous devez être connecté pour envoyer un message." };
  }

  const { error } = await supabase.from("messages").insert({
    quote_request_id: quoteRequestId,
    sender_id: user.id,
    body: trimmed,
  });

  if (error) {
    console.error("sendQuoteMessage failed:", error);
    return { success: false, error: "Une erreur est survenue, merci de réessayer." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  return { success: true };
}
