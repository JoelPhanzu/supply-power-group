import Link from "next/link";
import { Lightning } from "@phosphor-icons/react/ssr";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

export function DashboardHeader({
  fullName,
  company,
}: {
  fullName: string | null;
  company: string | null;
}) {
  return (
    <header className="border-b border-border-soft bg-navy-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5 font-heading text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-accent">
            <Lightning weight="fill" className="h-5 w-5 text-white" />
          </span>
          SUPPLY <span className="text-accent-500">POWER</span>
        </Link>

        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="text-sm font-semibold text-text-main">{fullName ?? "Client"}</p>
            {company && <p className="text-xs text-text-mute">{company}</p>}
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
