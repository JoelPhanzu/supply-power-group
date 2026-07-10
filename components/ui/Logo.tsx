import Image from "next/image";

// Intrinsic logo file ratio is 1368x768 (≈1.78:1).
const RATIO = 1368 / 768;

const HEIGHTS = {
  sm: 32,
  md: 40,
};

export function Logo({
  theme = "light",
  size = "md",
}: {
  theme?: "light" | "dark";
  size?: "sm" | "md";
}) {
  const height = HEIGHTS[size];
  const width = Math.round(height * RATIO);

  return (
    <Image
      src={theme === "light" ? "/logo/logo-light.png" : "/logo/logo-dark.png"}
      alt="Supply Power Group"
      width={width}
      height={height}
      priority
    />
  );
}
