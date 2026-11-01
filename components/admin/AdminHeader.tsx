import Link from "next/link";
import { Lightning } from "@phosphor-icons/react/ssr";
import { LogoutButton } from "@/components/dashboard/LogoutButton";

const TABS = [
  { href: "/admin", label: "Demandes de devis" },
  { href: "/admin/contenu", label: "Contenu du site" },
];

export function AdminHeader({
  fullName,
  active = "/admin",
}: {
  fullName: string | null;
  active?: string;
}) {
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

        <nav className="order-3 flex w-full gap-2 sm:order-none sm:w-auto">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === tab.href
                  ? "bg-navy-700 text-text-main"
                  : "text-text-mute hover:text-text-main"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <p className="text-sm font-semibold text-text-main">{fullName ?? "Administrateur"}</p>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
