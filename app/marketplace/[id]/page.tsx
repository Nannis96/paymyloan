"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, ChevronLeft, Image as ImageIcon } from "lucide-react";

// Importamos el mapa dinámicamente para evitar errores de SSR en Next.js
const MapClient = dynamic(() => import("@/app/components/ui/MapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-surface-2 text-xs font-semibold text-ink-3">
      Cargando mapa...
    </div>
  ),
});

function MarketplaceDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { t } = useSite();
  const m = t.marketplace.dealDetails;

  // Estados visuales de la galería
  const photos = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80"
  ];
  const [mainPhoto, setMainPhoto] = useState(photos[0]);

  // Estados del Formulario (Oferta)
  const [loanRaw, setLoanRaw] = useState("145,000");
  const [rateStr, setRateStr] = useState("12");
  const [termMonths, setTermMonths] = useState(9);
  const [pointsVal, setPointsVal] = useState(0);
  const [drawStruct, setDrawStruct] = useState("full");

  // Calculos en vivo
  const loanAmount = parseInt(loanRaw.replace(/[^0-9]/g, "")) || 145000;
  const rate = parseFloat(rateStr) || 12;
  const monthlyPmt = Math.round(loanAmount * (rate / 100) / 12);
  const pointsCost = Math.round(loanAmount * (pointsVal / 100));
  const totalInterest = (monthlyPmt * termMonths) + pointsCost;

  // Datos mock del mapa
  const mapCenter: [number, number] = [35.127, -89.977];
  const subjectMarker = { lat: 35.127, lng: -89.977, address: '2847 Lamar Ave' };
  const salesMarkers = [
    { lat: 35.124, lng: -89.978, address: '2801 Lamar Ave', price: '$198K' },
    { lat: 35.130, lng: -89.975, address: '3014 Lamar Ave', price: '$215K' },
    { lat: 35.126, lng: -89.981, address: '2755 Spottswood', price: '$204K' },
    { lat: 35.122, lng: -89.974, address: '2619 Lamar Ave', price: '$192K' },
    { lat: 35.131, lng: -89.971, address: '3102 Southern Ave', price: '$221K' }
  ];
  const rentalMarkers = [
    { lat: 35.128, lng: -89.976, address: '2833 Lamar Ave', rent: '$1,195/mo' },
    { lat: 35.125, lng: -89.972, address: '2988 Southern Ave', rent: '$1,250/mo' },
    { lat: 35.132, lng: -89.979, address: '3021 Lamar Ave', rent: '$1,100/mo' },
    { lat: 35.121, lng: -89.983, address: '2710 Spottswood', rent: '$1,175/mo' }
  ];

  const handleRequestDocs = () => {
    alert("Request sent — borrower will be notified to complete their deal documents before closing.");
  };

  const handleSubmitOffer = () => {
    alert("Procesando oferta...");
    router.push("/lenderDashboard/offers-sent");
  };

  // Helper formatting
  const formatCurrency = (val: number) => "$" + val.toLocaleString();

  return (
    <div className="min-h-screen bg-bg p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-[1100px]">

        {/* Back Link */}
        <Link
          href="/marketplace"
          className="mb-6 inline-flex items-center gap-2 rounded-md border border-rule bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3"
        >
          <ChevronLeft size={16} />
          {m.back}
        </Link>

        {/* Split Layout: 1 col on mobile, 2 cols on desktop */}
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          
          {/* ======================= LEFT COLUMN ======================= */}
          <div className="flex-1 w-full space-y-6">

            {/* 1. Header & Gallery */}
            <div className="rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-4 flex flex-col justify-between sm:flex-row sm:items-start">
                <div>
                  <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-600"></span>
                    Needs Funding
                  </div>
                  <h1 className="mb-1 text-[22px] font-black tracking-tight text-ink">2847 Lamar Ave</h1>
                  <p className="text-sm text-ink-3">Memphis, TN 38114</p>
                </div>
                <div className="mt-2 text-left sm:mt-0 sm:text-right">
                  <div className="mb-1 text-[11px] text-ink-3">{m.postedAgo.replace("{days}", "3")}</div>
                  <div className="text-[11px] text-ink-3">{m.loanTypeStr} &nbsp;·&nbsp; 9 {m.months}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="relative flex-1 overflow-hidden rounded-lg bg-surface-2 h-[240px] border border-rule">
                  <img src={mainPhoto} alt="Property" className="h-full w-full object-cover" />
                </div>
                <div className="flex w-[80px] flex-col gap-1.5">
                  {photos.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setMainPhoto(src)}
                      className={`h-[62px] w-full overflow-hidden rounded-md border-2 transition-colors ${
                        mainPhoto === src ? "border-accent" : "border-transparent"
                      }`}
                    >
                      <img src={src} className="h-full w-full object-cover" alt="" />
                    </button>
                  ))}
                  <div className="flex h-[62px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-rule text-ink-3 hover:bg-surface-2 transition-colors">
                    <ImageIcon size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Borrower Profile */}
            <div className="rounded-[10px] border border-rule bg-surface overflow-hidden">
              <div className="flex items-center justify-between border-b border-rule px-[18px] py-3.5">
                <div className="text-[13px] font-extrabold text-ink">{m.borrowerProfile}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.identityShielded}</div>
              </div>

              {/* Shielded Identity row */}
              <div className="flex items-center gap-3.5 border-b border-rule bg-surface-2 px-[18px] py-4">
                <div className="relative h-14 w-14 shrink-0">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-rule blur-[8px] select-none">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface bg-accent">
                    <Lock size={10} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-extrabold text-ink blur-[5px] select-none">Marcus Thomas</div>
                  <div className="mb-1.5 text-[11px] text-ink-3 blur-[4px] select-none">Sunrise Property Solutions LLC</div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-extrabold text-amber">
                    <span>★</span> Pro Borrower
                  </div>
                </div>
              </div>

              {/* Shield Note */}
              <div className="flex items-center gap-2 border-b border-rule bg-accent-soft px-[18px] py-2.5 text-[11px] text-ink-2">
                <ShieldCheck size={14} className="text-accent" />
                <span>{m.shieldNote}</span>
              </div>

              {/* PML Score */}
              <div className="flex items-center justify-between border-b border-rule px-[18px] py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full border-2 border-accent bg-accent-soft">
                    <span className="text-lg font-black leading-none text-accent">742</span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.score}</span>
                  </div>
                  <div className="text-[11px] leading-[1.6] text-ink-2">
                    <strong className="text-ink">{m.goodStanding}</strong><br />
                    {m.memberSince} Q1 2025<br />
                    {m.identityVerified}
                  </div>
                </div>
                <div className="rounded-lg bg-success-soft px-3 py-1 text-[11px] font-bold text-success dark:bg-green-900/30 dark:text-green-400">Verified</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 border-b border-rule">
                <div className="border-r border-rule p-3">
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.4px] text-ink-3">{m.stats.propsOwned}</span>
                  <span className="text-[15px] font-extrabold text-accent">14</span>
                </div>
                <div className="border-r border-rule p-3">
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.4px] text-ink-3">{m.stats.activePurchases}</span>
                  <span className="text-[15px] font-extrabold text-ink">8</span>
                </div>
                <div className="p-3">
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.4px] text-ink-3">{m.stats.currentLoans}</span>
                  <span className="text-[15px] font-extrabold text-amber">2</span>
                </div>
                <div className="border-t border-r border-rule p-3">
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.4px] text-ink-3">{m.stats.totalBorrowed}</span>
                  <span className="text-[15px] font-extrabold text-ink">$812K</span>
                </div>
                <div className="border-t border-r border-rule p-3">
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.4px] text-ink-3">{m.stats.onTime}</span>
                  <span className="text-[15px] font-extrabold text-green-600 dark:text-green-400">100%</span>
                </div>
                <div className="border-t border-rule p-3">
                  <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.4px] text-ink-3">{m.stats.dealsClosed}</span>
                  <span className="text-[15px] font-extrabold text-ink">6</span>
                </div>
              </div>

              {/* Docs status */}
              <div className="flex flex-wrap items-center gap-2 border-b border-rule px-[18px] py-2.5">
                <span className="text-[11px] font-bold text-ink mr-1">{m.dealDocs}</span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-success/30 bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle2 size={12} /> {m.docPurchase}
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-crit/30 bg-crit-soft px-2 py-0.5 text-[11px] font-semibold text-crit dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                  <AlertCircle size={12} /> {m.docTitleMiss}
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg border border-crit/30 bg-crit-soft px-2 py-0.5 text-[11px] font-semibold text-crit dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                  <AlertCircle size={12} /> {m.docInsMiss}
                </span>
              </div>

              {/* Unlock Request */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-[18px] py-3">
                <div className="text-[11px] leading-[1.5] text-ink-3">
                  <strong className="text-ink">{m.unlockBar}</strong><br />
                  {m.unlockSub}
                </div>
                <button onClick={handleRequestDocs} className="shrink-0 rounded-md border border-accent bg-surface px-3.5 py-1.5 text-[12px] font-bold text-accent hover:bg-surface-2 transition-colors">
                  {m.requestDocs}
                </button>
              </div>
            </div>

            {/* 3. Deal Numbers */}
            <div className="rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-3.5 border-b-2 border-accent-soft pb-2 text-[12px] font-bold uppercase tracking-[0.7px] text-accent">
                {m.dealNumbers}
              </div>
              <div className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4">
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.loanRequested}</div>
                  <div className="text-[18px] font-extrabold text-ink">$145K</div>
                </div>
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.arv}</div>
                  <div className="text-[18px] font-extrabold text-ink">$210K</div>
                </div>
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.ltvLabel}</div>
                  <div className="text-[18px] font-extrabold text-accent">69%</div>
                </div>
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.rateTerm}</div>
                  <div className="text-[18px] font-extrabold text-ink">12% / 9mo</div>
                </div>
              </div>
              <div className="mt-3.5">
                <div className="mb-1 flex justify-between text-[11px] font-semibold text-ink-3">
                  <span>{m.ltvLabel}</span>
                  <strong className="text-accent">69% — {m.ltvCap}</strong>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent-soft">
                  <div className="h-full bg-accent" style={{ width: "69%" }}></div>
                </div>
              </div>
              <div className="mt-3.5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.purchasePrice}</span><span className="text-[13px] font-semibold text-ink">$98,000</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.rehabBudget}</span><span className="text-[13px] font-semibold text-ink">$38,000</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.allInCost}</span><span className="text-[13px] font-semibold text-ink">$136,000</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.profitArv}</span><span className="text-[13px] font-semibold text-green-600 dark:text-green-400">$74,000</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.titleCompany}</span><span className="text-[13px] font-semibold text-ink">BAS Law & Title</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.insuranceCo}</span><span className="text-[13px] font-semibold text-ink">Insight Risk Mgmt</span></div>
              </div>
            </div>

            {/* 4. Mocked Comp Map */}
            <div className="rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-3.5 border-b-2 border-accent-soft pb-2 text-[12px] font-bold uppercase tracking-[0.7px] text-accent">
                {m.mapTitle}
              </div>
              <div className="relative h-[260px] w-full overflow-hidden rounded-lg border border-rule bg-surface-2 z-0">
                <MapClient 
                  center={mapCenter}
                  subject={subjectMarker}
                  sales={salesMarkers}
                  rentals={rentalMarkers}
                />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-4">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-2"><div className="h-3 w-3 rounded-full border-2 border-white bg-green-600 shadow-sm"></div>{m.mapSubj}</div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-2"><div className="h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow-sm"></div>{m.mapSales}</div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-2"><div className="h-3 w-3 rounded-full border-2 border-white bg-purple-600 shadow-sm"></div>{m.mapRental}</div>
              </div>
            </div>

            {/* 5. Sales Comps */}
            <div className="rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-3.5 border-b-2 border-accent-soft pb-2 text-[12px] font-bold uppercase tracking-[0.7px] text-accent">
                {m.salesComps}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  { addr: '2801 Lamar Ave', price: '$198,000', meta: 'Sold Apr 2026 · 3/1 · 1,180 sqft' },
                  { addr: '3014 Lamar Ave', price: '$215,000', meta: 'Sold Feb 2026 · 3/2 · 1,240 sqft' },
                  { addr: '2755 Spottswood', price: '$204,500', meta: 'Sold Jun 2026 · 3/1 · 1,150 sqft' },
                  { addr: '2619 Lamar Ave', price: '$192,000', meta: 'Sold Mar 2026 · 2/1 · 1,080 sqft' },
                  { addr: '3102 Southern Ave', price: '$221,000', meta: 'Sold May 2026 · 3/2 · 1,320 sqft' }
                ].map((c, i) => (
                  <div key={i} className="rounded-lg border border-rule border-t-[3px] border-t-blue-600 p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-ink">{c.addr}</div>
                    <div className="mb-0.5 text-[15px] font-extrabold text-ink">{c.price}</div>
                    <div className="text-[10px] text-ink-3">{c.meta.replace("Sold", m.sold)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Rental Comps */}
            <div className="rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-3.5 border-b-2 border-accent-soft pb-2 text-[12px] font-bold uppercase tracking-[0.7px] text-accent">
                {m.rentalComps}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  { addr: '2833 Lamar Ave', price: '$1,195/mo', meta: 'Active listing · 3/1 · 1,100 sqft' },
                  { addr: '2988 Southern Ave', price: '$1,250/mo', meta: 'Leased Jul 2026 · 3/2 · 1,200 sqft' },
                  { addr: '3021 Lamar Ave', price: '$1,100/mo', meta: 'Leased May 2026 · 2/1 · 980 sqft' }
                ].map((c, i) => (
                  <div key={i} className="rounded-lg border border-rule border-t-[3px] border-t-purple-600 p-2.5">
                    <div className="mb-1 text-[11px] font-bold text-ink">{c.addr}</div>
                    <div className="mb-0.5 text-[15px] font-extrabold text-ink">{c.price}</div>
                    <div className="text-[10px] text-ink-3">{c.meta.replace("Active listing", m.activeListing).replace("Leased", m.leased)}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* ======================= RIGHT COLUMN (OFFER FORM) ======================= */}
          <div className="w-full lg:sticky lg:top-[90px] lg:w-[380px] shrink-0 rounded-xl border border-rule bg-surface p-6 shadow-sm">
            <h2 className="mb-1 text-[18px] font-extrabold text-ink">{m.submitOffer}</h2>
            <p className="mb-5 text-xs text-ink-3">2847 Lamar Ave, Memphis TN</p>

            <div className="mb-3.5">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formLoanAmount}</label>
              <input 
                type="text" 
                value={loanRaw} 
                onChange={(e) => {
                  const numStr = e.target.value.replace(/[^0-9]/g, "");
                  setLoanRaw(numStr ? parseInt(numStr).toLocaleString() : "");
                }} 
                className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent"
              />
            </div>

            <div className="mb-3.5 grid grid-cols-2 gap-2.5">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formRate}</label>
                <input 
                  type="text" 
                  value={rateStr} 
                  onChange={(e) => setRateStr(e.target.value)} 
                  className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formTerm}</label>
                <div className="flex overflow-hidden rounded-md border border-rule">
                  {[6, 9, 12].map(num => (
                    <button 
                      key={num} 
                      onClick={() => setTermMonths(num)}
                      className={`flex-1 py-2 text-xs font-semibold transition-colors ${termMonths === num ? "bg-accent-soft text-accent" : "bg-surface text-ink-3 hover:text-ink"}`}
                    >
                      {num}mo
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-3.5">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formPoints}</label>
              <div className="flex overflow-hidden rounded-md border border-rule">
                {[0, 1, 2, 3].map(num => (
                  <button 
                    key={num} 
                    onClick={() => setPointsVal(num)}
                    className={`flex-1 py-2 text-xs font-semibold transition-colors ${pointsVal === num ? "bg-accent-soft text-accent" : "bg-surface text-ink-3 hover:text-ink"}`}
                  >
                    {num === 0 ? "0" : `${num} pt`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3.5">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formDraw}</label>
              <div className="flex overflow-hidden rounded-md border border-rule">
                <button 
                  onClick={() => setDrawStruct("full")}
                  className={`flex-1 py-2 text-xs font-semibold transition-colors ${drawStruct === "full" ? "bg-accent-soft text-accent" : "bg-surface text-ink-3 hover:text-ink"}`}
                >
                  {m.formDrawFull}
                </button>
                <button 
                  onClick={() => setDrawStruct("draws")}
                  className={`flex-1 py-2 text-xs font-semibold transition-colors ${drawStruct === "draws" ? "bg-accent-soft text-accent" : "bg-surface text-ink-3 hover:text-ink"}`}
                >
                  {m.formDraws}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formMsg}</label>
              <textarea 
                rows={3} 
                placeholder={m.formMsgPh}
                className="w-full resize-none rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent"
              ></textarea>
            </div>

            {/* Calculations Box */}
            <div className="mb-4 rounded-lg border border-rule bg-surface-2 p-3.5 text-xs text-ink-2">
              <div className="mb-1 flex justify-between">
                <span>{m.formLoanAmount}</span>
                <span className="font-semibold">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="mb-1 flex justify-between">
                <span>{m.calcMoInt}</span>
                <span className="font-semibold">{formatCurrency(monthlyPmt)}</span>
              </div>
              <div className="mb-1 flex justify-between">
                <span>{m.formPoints} ({pointsVal})</span>
                <span className="font-semibold">{formatCurrency(pointsCost)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>{m.formTerm}</span>
                <span className="font-semibold">{termMonths} {m.months}</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-rule pt-2 text-sm font-extrabold text-ink">
                <span>{m.calcTotalInt}</span>
                <span>{formatCurrency(totalInterest)}</span>
              </div>
            </div>

            <button onClick={handleSubmitOffer} className="mb-2 w-full rounded-md bg-accent py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#524ddb]">
              {m.btnSubmit}
            </button>
            <button className="mb-4 w-full rounded-md border border-rule bg-surface py-2.5 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3">
              {m.btnDraft}
            </button>

            <hr className="my-4 border-rule" />
            <p className="text-center text-[11px] leading-[1.6] text-ink-3">
              {m.offerNote}
            </p>

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