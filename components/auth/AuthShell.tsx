import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-6 pb-16 pt-32"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 900px 500px at 20% -10%, rgba(74,124,255,0.18), transparent 60%), radial-gradient(ellipse 700px 500px at 90% 10%, rgba(255,90,31,0.12), transparent 60%)",
      }}
    >
      <div className="w-full max-w-[440px] rounded-[28px] border border-border-soft bg-navy-800 p-8 md:p-10">
        <h1 className="mb-1.5 font-heading text-2xl font-bold">{title}</h1>
        <p className="mb-7 text-sm text-text-mute">{subtitle}</p>
        {children}
        <div className="mt-6 border-t border-border-soft pt-5 text-center text-sm text-text-mute">
          {footer}
        </div>
      </div>
    </div>
  );
}

export const authInputClass =
  "w-full rounded-lg border border-border-soft bg-navy-700 px-4 py-3 text-[0.95rem] text-text-main placeholder:text-text-faint focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/25";
