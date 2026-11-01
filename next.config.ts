import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on Hostinger (Node.js app via Passenger), not Vercel:
  // "standalone" produces a minimal .next/standalone/server.js that just
  // needs `node server.js` and listens on process.env.PORT on its own.
  output: "standalone",
  // Fige la racine sur ce dossier : sans ça, un package-lock.json dans un
  // dossier parent (ex. Documents/AUTRES) fait croire à un monorepo et
  // server.js atterrit dans .next/standalone/<chemin>/ au lieu de .next/standalone/.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: { root: path.join(__dirname) },
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
