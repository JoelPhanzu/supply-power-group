import { SiteImage } from "@/components/ui/SiteImage";
import type { SiteImage as SiteImageValue } from "@/lib/content/schema";

const HEIGHTS = {
  sm: 32,
  md: 40,
};

const DEFAULT_LOGOS = {
  light: { url: "/logo/logo-light.png", alt: "Supply Power Group" },
  dark: { url: "/logo/logo-dark.png", alt: "Supply Power Group" },
};

export function Logo({
  theme = "light",
  size = "md",
  image,
}: {
  theme?: "light" | "dark";
  size?: "sm" | "md";
  image?: SiteImageValue;
}) {
  const height = HEIGHTS[size];
  const logo = image?.url ? image : DEFAULT_LOGOS[theme];

  return (
    // Hauteur fixe, largeur libre : un logo remplacé peut avoir un autre format.
    <SiteImage
      src={logo.url}
      alt={logo.alt || "Supply Power Group"}
      width={Math.round(height * 4)}
      height={height}
      priority
      style={{ height, width: "auto" }}
    />
  );
}
