"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { QuoteStatus } from "@/lib/supabase/types";
import type { ActionResult } from "@/lib/actions/types";

export async function submitQuoteRequest(
  formData: FormData
): Promise<ActionResult> {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const assistanceType = formData.get("assistanceType");
  const description = formData.get("description");
  const company = formData.get("company");

  if (
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof assistanceType !== "string" ||
    typeof description !== "string"
  ) {
    return { success: false, error: "Merci de remplir tous les champs requis." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("quote_requests").insert({
    client_id: user?.id ?? null,
    full_name: fullName,
    company: typeof company === "string" && company.length > 0 ? company : null,
    email,
    phone,
    assistance_type: assistanceType,
    description,
  });

  if (error) {
    console.error("submitQuoteRequest insert failed:", error);
    return {
      success: false,
      error: "Une erreur est survenue, merci de réessayer.",
    };
  }

  return { success: true };
}

export async function updateQuoteRequestStatus(
  quoteRequestId: string,
  status: QuoteStatus
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Vous devez être connecté." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { success: false, error: "Action réservée aux administrateurs." };
  }

  const { error } = await supabase
    .from("quote_requests")
    .update({ status })
    .eq("id", quoteRequestId);

  if (error) {
    console.error("updateQuoteRequestStatus failed:", error);
    return { success: false, error: "Une erreur est survenue, merci de réessayer." };
  }

  revalidatePath("/admin");
  return { success: true };
}
