import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ContentEditor } from "@/components/admin/content/ContentEditor";
import { mergeContent } from "@/lib/content/get";

export default async function AdminContentPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/admin/contenu");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: rows } = await supabase.from("site_content").select("key, value, updated_at");
  const content = mergeContent(rows);
  const updatedAt = Object.fromEntries((rows ?? []).map((r) => [r.key, r.updated_at]));

  return (
    <div className="min-h-screen bg-navy-950">
      <AdminHeader fullName={profile?.full_name ?? null} active="/admin/contenu" />

      <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-bold text-text-main md:text-3xl">
            Contenu du site
          </h1>
          <p className="mt-2 text-sm text-text-mute">
            Modifiez les textes, photos et liens du site public. Les changements sont en ligne dès
            l&apos;enregistrement.
          </p>
        </div>

        <ContentEditor initialContent={content} updatedAt={updatedAt} />
      </main>
    </div>
  );
}
