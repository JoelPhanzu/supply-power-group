import Image, { type ImageProps } from "next/image";

// Les images hébergées sur Supabase, picsum ou en local passent par
// l'optimiseur Next ; les liens externes collés à la main sont affichés tels quels.
function isOptimizable(src: string) {
  if (src.startsWith("/")) return true;
  try {
    const { hostname } = new URL(src);
    return hostname.endsWith(".supabase.co") || hostname === "picsum.photos";
  } catch {
    return false;
  }
}

export function SiteImage({ src, alt, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  if (!src) return null;
  return <Image src={src} alt={alt ?? ""} unoptimized={!isOptimizable(src)} {...props} />;
}
