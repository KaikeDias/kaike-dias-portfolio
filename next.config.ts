import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Exportação estática não tem servidor de otimização de imagens.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
