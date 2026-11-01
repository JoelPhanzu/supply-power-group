import { SiteChrome } from "@/components/marketing/SiteChrome";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
