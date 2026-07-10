import { SignOut } from "@phosphor-icons/react/ssr";
import { signOut } from "@/lib/actions/auth";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className={
          className ??
          "inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2 text-sm font-medium text-text-mute transition-colors hover:border-accent-500/40 hover:text-text-main"
        }
      >
        <SignOut className="h-4 w-4" />
        Déconnexion
      </button>
    </form>
  );
}
