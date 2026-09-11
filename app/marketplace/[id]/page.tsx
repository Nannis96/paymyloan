"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { Home, Building } from "lucide-react";

function MarketplaceDetailContent() {
  const params = useParams();
  const { t } = useSite();
  const m = t.marketplace.dealDetails;

  // Mock de datos del trato publico
  const mockDeal = {
    id: (params?.id as string) || "deal_001",
    location: "Austin, TX",
    amount: "$250,000",
    term: `12 ${m.months}`,
    type: "Fix & Flip (Interest Only)",
    arv: "$350,000",
    rehab: "$45,000",
    borrowerScore: "A+",
    borrowerDeals: `14 ${m.dealsCompleted}`,
    images: ["/pml_before.png"] // Usaremos la imagen existente de prueba
  };

  const mockComps = [
    { address: "125 Main St (0.2 mi)", price: "$345,000", dom: "12 DOM" },
    { address: "40 Oak Ave (0.4 mi)", price: "$360,000", dom: "24 DOM" }
  ];

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <Link 
          href="/marketplace"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {m.back}
        </Link>

        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">
              REF: {mockDeal.id}
            </div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{mockDeal.location}</h1>
            <p className="text-ink-2 mt-1">{mockDeal.type}</p>
          </div>
          
          <div className="flex gap-4">
            <button className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md">
              {m.fundDeal} &rarr;
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Fotos y Resumen */}
          <div className="lg:col-span-2 space-y-8">
            <div className="overflow-hidden rounded-xl border border-rule bg-surface-2 aspect-video flex items-center justify-center">
               <img src={mockDeal.images[0]} alt="Property" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
            </div>

            <div className="rounded-xl border border-rule bg-surface p-8 shadow-sm">
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-ink-3">{m.overview}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-[11px] text-ink-3 uppercase tracking-widest">{t.marketplace.table.amount}</div>
                  <div className="mt-1 text-xl font-black text-accent">{mockDeal.amount}</div>
                </div>
                <div>
                  <div className="text-[11px] text-ink-3 uppercase tracking-widest">{m.arv}</div>
                  <div className="mt-1 text-xl font-black text-ink">{mockDeal.arv}</div>
                </div>
                <div>
                  <div className="text-[11px] text-ink-3 uppercase tracking-widest">{m.rehab}</div>
                  <div className="mt-1 text-xl font-black text-ink">{mockDeal.rehab}</div>
                </div>
                <div>
                  <div className="text-[11px] text-ink-3 uppercase tracking-widest">{t.marketplace.table.term}</div>
                  <div className="mt-1 text-xl font-black text-ink">{mockDeal.term}</div>
                </div>
              </div>
            </div>

            {/* Comps (RentCast) */}
            <div className="rounded-xl border border-rule bg-surface p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-ink-3">{m.aiComps}</h2>
                <span className="text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded">RentCast API</span>
              </div>
              <div className="space-y-3">
                {mockComps.map((comp, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-surface-2 border border-rule">
                    <div className="flex items-center gap-3">
                      <Home className="w-4 h-4 text-ink-3" />
                      <span className="text-sm font-medium text-ink">{comp.address}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-ink">{comp.price}</div>
                      <div className="text-[10px] text-ink-3">{comp.dom}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Perfil del Prestatario */}
          <div className="space-y-8">
            <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm border-t-[3px] border-t-amber">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{m.borrowerProfile}</h2>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-rule">
                <div className="w-12 h-12 rounded-full bg-surface-2 border border-rule flex items-center justify-center">
                  <Building className="w-6 h-6 text-ink-3" />
                </div>
                <div>
                  <div className="font-bold text-ink text-lg">{m.verifiedInvestor}</div>
                  <div className="text-xs text-ink-3">{m.identityConfirmed}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-2">{m.pmlRating}</span>
                  <span className="inline-flex rounded-[4px] border border-amber/30 bg-amber-soft px-2.5 py-1 text-xs font-bold text-amber">
                    {mockDeal.borrowerScore}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-2">{m.history}</span>
                  <span className="text-sm font-bold text-ink">{mockDeal.borrowerDeals}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-ink-2">{m.fundingVerification}</span>
                  <span className="text-sm font-bold text-green-600">{m.completed}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function MarketplaceDetailPage() {
  return (
    <SiteShell isDashboard={true}>
      <MarketplaceDetailContent />
    </SiteShell>
  );
}