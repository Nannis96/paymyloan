"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function ProfileContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const profileId = params?.id as string;
  
  // Determinamos el tipo desde la URL (ej: /profile/123?type=lender)
  const type = searchParams?.get("type") || "borrower";

  const { t } = useSite();
  const pr = t.profile;

  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const endpoint = type === "lender" 
          ? `${BASE_URL}/api/lenders/${profileId}/rating`
          : `${BASE_URL}/api/borrowers/${profileId}/rating`;

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (json.success && json.data) {
          setProfileData(json.data);
        } else {
          throw new Error(json.error?.message || "Error al cargar perfil");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    if (profileId) fetchProfile();
  }, [profileId, type]);

  if (isLoading) {
    return <div className="min-h-screen bg-bg p-6 lg:p-14 text-center text-ink-3">Cargando perfil...</div>;
  }

  if (error || !profileData) {
    return <div className="min-h-screen bg-bg p-6 lg:p-14 text-center text-crit">{error || "Perfil no encontrado"}</div>;
  }

  // Mapeo de promedio (1-5) a letra estilo "PML Score"
  const getGrade = (avg: number | null) => {
    if (!avg) return "N/D";
    if (avg >= 4.8) return "A+";
    if (avg >= 4.5) return "A";
    if (avg >= 4.0) return "B";
    if (avg >= 3.0) return "C";
    return "D";
  };

  const ratingGrade = getGrade(profileData.average);
  const totalDeals = profileData.count || 0;
  const reviews = profileData.reviews?.items || [];

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <header className="mb-10 flex flex-col items-center border-b border-rule pb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-surface-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent border border-rule">
            {type === "borrower" ? pr.borrower : pr.lender}
          </div>
          <h1 className="text-[38px] font-black tracking-tight text-ink">
            {/* Como la API de rating anonimiza un poco, mostramos ID o agregaremos el nombre luego */}
            Perfil de Usuario
          </h1>
          <p className="mt-2 text-lg text-ink-3">ID: {profileId}</p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          <MetricCard label={pr.stats.rating} value={ratingGrade} accent />
          <MetricCard label={pr.stats.totalLoans} value={totalDeals.toString()} />
          <MetricCard label={pr.stats.onTime} value={profileData.average ? `${(profileData.average / 5 * 100).toFixed(0)}%` : "N/D"} />
          <MetricCard label={pr.stats.totalVolume} value="Verificado" />
        </div>

        <section>
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-ink-3">
            {pr.history}
          </h2>
          <div className="rounded-xl border border-rule bg-surface p-6 text-ink-2 shadow-sm">
            {reviews.length === 0 ? (
              <p className="text-center py-6">{pr.emptyHistory}</p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((rev: any) => (
                  <div key={rev.id} className="border-b border-rule pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-accent">{rev.rating} Estrellas</span>
                      <span className="text-xs text-ink-3">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-ink-2">{rev.comment || "Sin comentarios."}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <SiteShell isDashboard={true}>
      <ProfileContent />
    </SiteShell>
  );
}