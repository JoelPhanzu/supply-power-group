import Link from "next/link";
import { Lightning } from "@phosphor-icons/react/ssr";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

export function AdminHeader({ fullName }: { fullName: string | null }) {
  return (
    <header className="border-b border-border-soft bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5 font-heading text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-accent">
            <Lightning weight="fill" className="h-5 w-5 text-white" />
          </span>
          SUPPLY <span className="text-accent-500">POWER</span>
          <span className="ml-2 rounded-full border border-border-soft px-2.5 py-0.5 text-xs font-medium text-text-mute">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-5">
          <p className="text-sm font-semibold text-text-main">{fullName ?? "Administrateur"}</p>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
