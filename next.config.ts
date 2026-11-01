import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on Hostinger (Node.js app via Passenger), not Vercel:
  // "standalone" produces a minimal .next/standalone/server.js that just
  // needs `node server.js` and listens on process.env.PORT on its own.
  output: "standalone",
  images: {
    remotePatterns: [
      // Photos envoyées depuis l'admin (bucket Supabase "site-media").
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Photos d'illustration par défaut, tant qu'elles ne sont pas remplacées.
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
