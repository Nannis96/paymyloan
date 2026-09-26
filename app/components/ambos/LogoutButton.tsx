// app/components/ambos/LogoutButton.tsx
"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function LogoutButton({ 
  className = "", 
  iconSize = 16 
}: { 
  className?: string; 
  iconSize?: number;
}) {
  const { t } = useSite();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      
      // Intentamos revocar la sesion en el backend si hay tokens
      if (token && refreshToken) {
        await fetch(API_ROUTES.auth.logout, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ refreshToken })
        });
      }
    } catch (e) {
      console.error("Error during logout", e);
    } finally {
      // Limpiamos el almacenamiento local y redirigimos siempre
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`flex items-center gap-2 transition-colors disabled:opacity-50 ${className}`}
      title={t.nav.logout}
    >
      <LogOut size={iconSize} />
      <span className="hidden sm:inline">{t.nav.logout}</span>
    </button>
  );
}