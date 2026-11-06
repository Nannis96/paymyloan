import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" empaqueta la app con solo las dependencias que usa en runtime.
  // Es lo que permite que la imagen final de Docker no lleve node_modules completo.
  output: "standalone",
  poweredByHeader: false,
  // TODO(pre-produccion): eliminar este bloque `rewrites` cuando salga a produccion.
  // Es solo un workaround de desarrollo; tambien revertir el .env local
  // (quitar API_PROXY_TARGET y dejar NEXT_PUBLIC_API_URL=https://api.paymyloan.ai).
  // Solo en local: reenvia /api/* al back remoto para evitar CORS.
  // Uso: API_PROXY_TARGET=https://api.paymyloan.ai y NEXT_PUBLIC_API_URL=http://localhost:3000
  async rewrites() {
    const target = process.env.API_PROXY_TARGET;
    return target ? [{ source: "/api/:path*", destination: `${target}/api/:path*` }] : [];
  },
};

export default nextConfig;
