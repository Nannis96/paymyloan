import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" empaqueta la app con solo las dependencias que usa en runtime.
  // Es lo que permite que la imagen final de Docker no lleve node_modules completo.
  output: "standalone",
  poweredByHeader: false,
};

export default nextConfig;
