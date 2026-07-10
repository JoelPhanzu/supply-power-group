import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on Hostinger (Node.js app via Passenger), not Vercel:
  // "standalone" produces a minimal .next/standalone/server.js that just
  // needs `node server.js` and listens on process.env.PORT on its own.
  output: "standalone",
  images: {
    // TODO: remove once real photography replaces the picsum placeholders.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
