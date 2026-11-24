"use client";

import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import FileDropzone from "@/app/components/ui/FileDropzone";
import PropertyMap, { loadMaps, type GeocodedAddress } from "@/app/components/ui/PropertyMap";

// Fuera del componente: Date.now() es impuro y react-hooks/purity lo rechaza dentro.
// Orden = sd.property.propTypes (single, multi 2-4, multi 5+, comercial, terreno).
const PROP_TYPE_ENUM = ["SINGLE_FAMILY", "MULTI_FAMILY", "MULTI_FAMILY", "COMMERCIAL", "LAND"];
const PROP_TYPE_IDX: Record<string, number> = { SINGLE_FAMILY: 0, CONDO: 0, TOWNHOUSE: 0, MULTI_FAMILY: 1, COMMERCIAL: 3, LAND: 4 };
const inDays = (n: number) => new Date(Date.now() + n * 86400000).toISOString();

export default function SubmitDealView() {
  const { t, lang } = useSite();
  const sd = t.submitDeal;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [stepError, setStepError] = useState("");
  const RATE_VALUES = [10, 12, 14, 12] as const;

  // Estados del Formulario Combinado (claves e índices estables para no romperse al cambiar idioma)
  const [formData, setFormData] = useState({
    loanType: "FIX_AND_FLIP" as "FIX_AND_FLIP" | "SLOW_FLIP" | "RENTAL",
    address: "",
    city: "",
    state: "TN",
    zip: "",
    propertyType: 0,
    occupancy: 0,
    beds: "",
    baths: "",
    sqft: "",
    condition: 1,
    description: "",
    purchasePrice: "",
    loanAmount: "",
    arv: "",
    rehab: "",
    term: 2,
    rate: 1,
    exitStrategy: 0
  });

  // Referencia siempre actualizada para evitar stale closures en llamadas asíncronas
  const formDataRef = useRef(formData);
  useEffect(() => { formDataRef.current = formData; }, [formData]);

  const loanTypeLabels: Record<"FIX_AND_FLIP" | "SLOW_FLIP" | "RENTAL", string> = {
    FIX_AND_FLIP: sd.loanType.bridge,
    SLOW_FLIP: sd.loanType.slowFlip,
    RENTAL: sd.loanType.rental,
  };

  // Estados de consulta RentCast + trigger manual ("View") + resaltado de campos
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [submittedAddress, setSubmittedAddress] = useState("");
  const [lookupTrigger, setLookupTrigger] = useState(0);
  const [fieldStatus, setFieldStatus] = useState<Record<string, "missing" | "filled">>({});
  const MANUAL_FIELDS = ["city", "state", "zip", "beds", "baths", "sqft"] as const;
  const PROPERTY_RESET_FIELDS = ["city", "state", "zip", "beds", "baths", "sqft", "propertyType", "occupancy", "arv"] as const;

  // Funciones de actualización de estado
  const updateField = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    touched.current.add(field);
    setStepError("");
    setFormData(prev => ({ ...prev, [field]: value }));
    setFieldStatus(prev => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: String(value).trim() ? "filled" : "missing" };
    });
  };

  // Autollenado RentCast (vía back). Solo se dispara al presionar el botón "View".
  const lastQuery = useRef("");
  const touched = useRef(new Set<string>()); // campos que el usuario editó: RentCast no los pisa
  const rcType = useRef<string | null>(null);

  const markMissingFields = (snapshot: Record<string, unknown>) => {
    const next: Record<string, "missing" | "filled"> = {};
    for (const f of MANUAL_FIELDS) {
      if (!String(snapshot[f] ?? "").trim()) next[f] = "missing";
    }
    setFieldStatus(next);
  };

  const lookupAddress = async (query: string) => {
    const q = query.trim();
    const key = q.toLowerCase().replace(/\s+/g, " ");
    if (q.length < 10 || key === lastQuery.current) return;
    lastQuery.current = key;
    setIsLookingUp(true);
    setFieldStatus({});
    try {
      const res = await apiFetch(`${API_ROUTES.borrowers.propertyLookup}?address=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(String(res.status));
      const d = (await res.json()).data;
      if (!d) throw new Error("Respuesta vacía de propertyLookup");
      const free = (f: string) => !touched.current.has(f);
      const num = (v: unknown) => (v == null ? undefined : String(v));
      const cur = formDataRef.current;
      rcType.current = d.propertyType ?? null;
      const nextVals = {
        city: free("city") ? d.city || cur.city : cur.city,
        state: free("state") ? d.state || cur.state : cur.state,
        zip: free("zip") ? d.postalCode || cur.zip : cur.zip,
        beds: free("beds") ? num(d.bedrooms) ?? "" : cur.beds,
        baths: free("baths") ? num(d.bathrooms) ?? "" : cur.baths,
        sqft: free("sqft") ? num(d.squareFootage) ?? "" : cur.sqft,
      };
      // Los campos que el usuario no editó se reemplazan siempre (incluso por vacío): son de la propiedad anterior.
      setFormData(prev => ({
        ...prev,
        ...nextVals,
        arv: free("arv") ? (d.afterRepairValue ? String(Math.round(d.afterRepairValue)) : "") : prev.arv,
        propertyType: free("propertyType") && d.propertyType ? (PROP_TYPE_IDX[d.propertyType] ?? 0) : prev.propertyType,
        // RentCast solo informa ownerOccupied=true con certeza; false no distingue vacante de inquilino.
        occupancy: free("occupancy") && d.ownerOccupied === true ? 1 : prev.occupancy,
      }));
      // Si RentCast dejó algún campo vacío, se resalta suavemente en rojo para llenado manual.
      markMissingFields(nextVals);
    } catch (err) {
      console.warn("propertyLookup error:", err);
      lastQuery.current = ""; // permite reintentar si falla
      markMissingFields(formDataRef.current);
    } finally {
      setIsLookingUp(false);
    }
  };

  // El estado por defecto ("TN") solo cuenta si ya hay ciudad o zip; solo con la calle sería una consulta engañosa.
  const fullAddress = () => [formData.address, formData.city, (formData.city || formData.zip) && formData.state, formData.zip].filter(Boolean).join(", ");

  // Trigger único (botón "View"): dispara PropertyMap (Geocoding + Street View) y RentCast al mismo tiempo.
  const handleViewProperty = () => {
    const q = fullAddress().trim();
    if (q.length < 10) return;
    const isNew = q.toLowerCase().replace(/\s+/g, " ") !== submittedAddress.trim().toLowerCase().replace(/\s+/g, " ");
    if (isNew) {
      PROPERTY_RESET_FIELDS.forEach((f) => touched.current.delete(f));
      rcType.current = null;
      lastQuery.current = "";
      setFormData(prev => ({
        ...prev,
        beds: "",
        baths: "",
        sqft: "",
        arv: "",
        propertyType: 0,
        occupancy: 0,
      }));
    }
    setSubmittedAddress(q);
    setLookupTrigger(prev => prev + 1);
    // Si ya hay ciudad y zip, consultamos RentCast directo; si faltan, esperamos a que PropertyMap geocodifique.
    if (formData.city.trim() && formData.zip.trim()) {
      lookupAddress(q);
    }
  };

  const handleGeocode = (geo: GeocodedAddress) => {
    const cur = formDataRef.current;
    const hadCityAndZip = Boolean(cur.city.trim() && cur.zip.trim());
    const nextCity = !touched.current.has("city") && geo.city ? geo.city : cur.city;
    const nextState = !touched.current.has("state") && geo.state ? geo.state : cur.state;
    const nextZip = !touched.current.has("zip") && geo.zip ? geo.zip : cur.zip;

    setFormData(prev => ({
      ...prev,
      city: nextCity || prev.city,
      state: nextState || prev.state,
      zip: nextZip || prev.zip,
    }));

    setFieldStatus(prev => ({
      ...prev,
      ...(nextCity ? { city: "filled" as const } : {}),
      ...(nextState ? { state: "filled" as const } : {}),
      ...(nextZip ? { zip: "filled" as const } : {}),
    }));

    if (!hadCityAndZip) {
      const normalized = [geo.street || cur.address, nextCity, nextState, nextZip].filter(Boolean).join(", ");
      if (normalized.length >= 10) lookupAddress(normalized);
    }
  };

  // Sugerencias de Google Places con dropdown propio (AutocompleteService clásico).
  const [suggestions, setSuggestions] = useState<{ id: string; text: string }[]>([]);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const places = useRef<{ g: any; svc: any; det: any; token: any } | null>(null);
  const sugTimer = useRef<NodeJS.Timeout | null>(null);
  const pendingQuery = useRef<string | null>(null);

  const suggest = (val: string) => {
    if (sugTimer.current) clearTimeout(sugTimer.current);
    if (val.trim().length < 4) {
      pendingQuery.current = null;
      return setSuggestions([]);
    }
    if (!places.current) {
      pendingQuery.current = val;
      return setSuggestions([]);
    }
    pendingQuery.current = null;
    sugTimer.current = setTimeout(() => {
      places.current?.svc.getPlacePredictions(
        { input: val, types: ["address"], componentRestrictions: { country: "us" }, sessionToken: places.current.token },
        (r: any[] | null, status: string) => {
          if (status !== "OK" && status !== "ZERO_RESULTS") {
            console.warn("Places autocomplete status:", status);
          }
          setSuggestions((r ?? []).map((x) => ({ id: x.place_id, text: x.description })));
        },
      );
    }, 250);
  };

  useEffect(() => {
    if (step !== 2 || places.current) return;
    let cancelled = false;
    (async () => {
      try {
        await loadMaps();
        const g = (window as any).google.maps;
        await g.importLibrary("places");
        if (cancelled) return;
        places.current = {
          g,
          svc: new g.places.AutocompleteService(),
          det: new g.places.PlacesService(document.createElement("div")),
          token: new g.places.AutocompleteSessionToken(),
        };
        if (pendingQuery.current && pendingQuery.current.trim().length >= 4) {
          suggest(pendingQuery.current);
        }
      } catch (e) {
        console.warn("Places autocomplete no disponible:", e);
      }
    })();
    return () => { cancelled = true; };
  }, [step]);

  useEffect(() => {
    return () => {
      if (sugTimer.current) clearTimeout(sugTimer.current);
    };
  }, []);

  const pickSuggestion = (id: string) => {
    if (sugTimer.current) clearTimeout(sugTimer.current);
    pendingQuery.current = null;
    setSuggestions([]);
    const pl = places.current;
    if (!pl) return;
    pl.det.getDetails({ placeId: id, fields: ["address_components", "formatted_address"], sessionToken: pl.token }, (place: any) => {
      pl.token = new pl.g.places.AutocompleteSessionToken();
      if (!place?.address_components) return;
      const get = (type: string, short = false) => { const c = place.address_components.find((x: any) => x.types.includes(type)); return (short ? c?.short_name : c?.long_name) ?? ""; };
      const street = [get("street_number"), get("route")].filter(Boolean).join(" ");
      PROPERTY_RESET_FIELDS.forEach((f) => touched.current.delete(f));
      setFieldStatus({});
      setStepError("");
      setFormData(prev => ({
        ...prev,
        address: street || prev.address,
        city: get("locality") || get("sublocality") || get("administrative_area_level_2"),
        state: get("administrative_area_level_1", true) || prev.state,
        zip: get("postal_code"),
      }));
    });
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // Cálculos en vivo (Live Calc y LTV)
  const parseNum = (val: string) => parseFloat(val.replace(/[^0-9.]/g, "")) || 0;
  const numPurchase = parseNum(formData.purchasePrice);
  const numLoan = parseNum(formData.loanAmount);
  const numArv = parseNum(formData.arv);
  const numRehab = parseNum(formData.rehab);

  const ltv = numArv > 0 ? Math.round((numLoan / numArv) * 100) : 0;
  const selectedRate = RATE_VALUES[formData.rate] ?? 12;
  const estimatedMonthly = (numLoan * (selectedRate / 100)) / 12;

  let ltvColor = "bg-accent";
  let ltvText = sd.financials.ltvGood;
  if (ltv > 75) {
    ltvColor = "bg-crit";
    ltvText = sd.financials.ltvHigh;
  } else if (ltv > 65) {
    ltvColor = "bg-amber";
    ltvText = sd.financials.ltvMod;
  }

  const formatCurrency = (val: number) => {
    return val > 0 ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val) : "—";
  };

  // Navegación con validación por paso
  const handleNext = () => {
    if (step === 2) {
      if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.zip.trim()) {
        setStepError(sd.validation.propertyRequired);
        return;
      }
    }
    if (step === 3) {
      if (numLoan <= 0) {
        setStepError(sd.validation.loanRequired);
        return;
      }
    }
    setStepError("");
    if (step < 4) setStep(step + 1);
  };
  const handlePrev = () => {
    setStepError("");
    if (step > 1) setStep(step - 1);
  };

  // Envío al Backend
  const handlePostDeal = async (isDraft = false) => {
    if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.zip.trim()) {
      setStepError(sd.validation.propertyRequired);
      setStep(2);
      return;
    }
    if (numLoan <= 0) {
      setStepError(sd.validation.loanRequired);
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        property: {
          addressLine1: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.zip.trim(),
          propertyType: (!touched.current.has("propertyType") && rcType.current) || PROP_TYPE_ENUM[formData.propertyType] || "SINGLE_FAMILY",
          bedrooms: parseInt(formData.beds) || null,
          bathrooms: parseFloat(formData.baths) || null,
          squareFootage: parseInt(formData.sqft) || null,
          afterRepairValue: numArv || null
        },
        projectType: formData.loanType,
        purchasePrice: numPurchase || null,
        rehabAmount: numRehab || null,
        totalLoanAmountRequested: numLoan,
        requestedClosingDate: inDays(30).slice(0, 10), // la API espera YYYY-MM-DD
        requestedTimelineNotes: formData.description,
        visibility: "PUBLIC"
      };

      // Con archivos: multipart (data + files), todo o nada en el back.
      // Zod rechaza null en opcionales: se omiten las claves vacias
      const clean = (o: any): any => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== "").map(([k, v]) => [k, v && typeof v === "object" ? clean(v) : v]));
      const cleanPayload = clean(payload);
      let body: BodyInit = JSON.stringify(cleanPayload);
      if (files.length) {
        const fd = new FormData();
        fd.append("data", JSON.stringify(cleanPayload));
        files.forEach((f) => fd.append("files", f));
        body = fd;
      }
      const createRes = await apiFetch(API_ROUTES.borrowers.meLoanRequests, { method: "POST", body });

      const createJson = await createRes.json().catch(() => ({}));
      if (!createRes.ok) throw new Error(`${createJson.message || createRes.status} ${JSON.stringify(createJson.error ?? createJson.details ?? createJson.errors ?? "")}`);
      const dealId = createJson.data?.id;
      if (dealId && !isDraft) {
        const pubRes = await apiFetch(API_ROUTES.borrowers.publishLoanRequest(dealId), { method: "POST" });
        if (!pubRes.ok) {
          const pubJson = await pubRes.json().catch(() => ({}));
          throw new Error(pubJson.message || `${sd.review.publishError} (${pubRes.status})`);
        }
      }

      router.push("/borrowerDashboard");
    } catch (error) {
      console.error(error);
      alert(`${sd.review.postError} ${error instanceof Error ? error.message : ""}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clases compartidas
  const LABEL = "mb-1 block text-[12px] font-semibold uppercase tracking-[0.4px] text-ink-2";
  const EXAMPLE = "mb-1.5 text-[11px] text-ink-3";
  const INPUT = "w-full rounded-md border border-rule bg-surface px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:ring-[3px] focus:ring-accent/10";
  const inputClass = (field: string) => {
    const st = fieldStatus[field];
    if (st === "missing") return `${INPUT} border-red-400 bg-red-50/40 ring-[3px] ring-red-400/20 animate-pulse focus:animate-none`;
    if (st === "filled") return `${INPUT} border-emerald-500 bg-emerald-50/30 ring-[3px] ring-emerald-500/15`;
    return INPUT;
  };
  const SELECT = `${INPUT} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238898aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-8`;

  return (
    <div className="flex flex-1 flex-col pb-[80px]">
      <main className="flex flex-1 items-start justify-center p-6 sm:p-9">
        <div className="w-full max-w-[620px]">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-1 text-[22px] font-bold tracking-tight text-ink">{sd.title}</h1>
            <p className="text-[14px] text-ink-3">{sd.subtitle}</p>
          </div>

          {/* Steps Bar */}
          <div className="mb-8 flex items-center">
            {sd.steps.map((stepName, idx) => {
              const sNum = idx + 1;
              const isActive = sNum === step;
              const isPast = sNum < step;
              return (
                <div key={idx} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[12px] font-bold transition-all ${
                      isActive ? "border-accent bg-accent text-white shadow-[0_0_0_4px_rgba(99,91,255,.15)]" 
                      : isPast ? "border-accent bg-accent text-white" 
                      : "border-rule bg-surface text-ink-3"
                    }`}>
                      {isPast ? "✓" : sNum}
                    </div>
                    <div className={`whitespace-nowrap text-[11px] ${isActive ? "font-semibold text-accent" : isPast ? "text-accent" : "text-ink-3"}`}>
                      {stepName}
                    </div>
                  </div>
                  {idx < 3 && (
                    <div className={`mx-2 h-[2px] flex-1 ${sNum < step ? "bg-accent" : "bg-rule"}`}></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Badge Resumen si no estamos en paso 1 */}
          {step > 1 && (
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent-soft px-3 py-2 text-[12px] text-accent">
              ⚡ {sd.selectedBadge.replace("{type}", loanTypeLabels[formData.loanType])} <span className="ml-1 cursor-pointer font-semibold underline" onClick={() => setStep(1)}>{sd.review.edit}</span>
            </div>
          )}

          {/* Mensaje de error de validación */}
          {stepError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[12px] font-semibold text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              {stepError}
            </div>
          )}

          {/* PASO 1: Tipo de Préstamo */}
          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
                <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.loanType.title}</h2>
                <p className="mb-6 text-[13px] text-ink-3">{sd.loanType.sub}</p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { key: "FIX_AND_FLIP" as const, title: sd.loanType.bridge, sub: sd.loanType.bridgeSub, icon: "⚡" },
                    { key: "SLOW_FLIP" as const, title: sd.loanType.slowFlip, sub: sd.loanType.slowFlipSub, icon: "🤝" },
                    { key: "RENTAL" as const, title: sd.loanType.rental, sub: sd.loanType.rentalSub, icon: "🏠" }
                  ].map((type) => {
                    const isActive = formData.loanType === type.key;
                    return (
                      <div 
                        key={type.key} 
                        onClick={() => updateField("loanType", type.key)}
                        className={`cursor-pointer rounded-lg border-[1.5px] p-4 transition-all ${
                          isActive ? "border-accent bg-accent-soft" : "border-rule bg-surface hover:border-ink-3"
                        }`}
                      >
                        <div className="mb-2 text-[20px]">{type.icon}</div>
                        <div className={`mb-1 text-[13px] font-bold ${isActive ? "text-accent" : "text-ink"}`}>
                          {type.title}
                          {isActive && <span className="float-right text-[14px]">✓</span>}
                        </div>
                        <div className="text-[11px] leading-[1.5] text-ink-3">{type.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: Property Details (se mantiene montado con hidden para preservar PropertyMap y el pin ajustado) */}
          <div className={step === 2 ? "animate-in fade-in duration-300" : "hidden"}>
            <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
              <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.property.title}</h2>
              <p className="mb-4 text-[13px] text-ink-3">{sd.property.sub}</p>
              <PropertyMap address={submittedAddress} trigger={lookupTrigger} onGeocode={handleGeocode} />

              <div className="mb-4">
                <label className={LABEL}>{sd.property.address}</label>
                <div className={EXAMPLE}>{sd.property.addressPh}</div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      autoComplete="off"
                      value={formData.address}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStepError("");
                        PROPERTY_RESET_FIELDS.forEach((f) => touched.current.delete(f));
                        setFormData(prev => ({
                          ...prev,
                          address: val,
                          city: "",
                          zip: "",
                        }));
                        suggest(val);
                      }}
                      onFocus={() => {
                        if (formData.address.trim().length >= 4 && suggestions.length === 0) {
                          suggest(formData.address);
                        }
                      }}
                      onBlur={() => {
                        if (sugTimer.current) clearTimeout(sugTimer.current);
                        setSuggestions([]);
                      }}
                      className={INPUT}
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-rule bg-surface shadow-lg">
                        {suggestions.map((x) => (
                          <li key={x.id} onMouseDown={(e) => { e.preventDefault(); pickSuggestion(x.id); }} className="cursor-pointer px-3 py-2 text-[13px] text-ink hover:bg-accent-soft">
                            {x.text.replace(/, USA$/, "")}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleViewProperty}
                    disabled={isLookingUp || fullAddress().trim().length < 10}
                    className="shrink-0 rounded-md bg-accent px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                  >
                    {isLookingUp ? "..." : sd.property.viewMapBtn}
                  </button>
                </div>
                <div className="mt-1 text-[11px] text-ink-3">{sd.property.addressHint}</div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className={LABEL}>{sd.property.city}</label>
                  <input type="text" value={formData.city} onChange={(e) => updateField("city", e.target.value)} className={inputClass("city")} />
                </div>
                <div>
                  <label className={LABEL}>{sd.property.state}</label>
                  <input type="text" value={formData.state} onChange={(e) => updateField("state", e.target.value)} className={inputClass("state")} />
                </div>
                <div>
                  <label className={LABEL}>{sd.property.zip}</label>
                  <input type="text" value={formData.zip} onChange={(e) => updateField("zip", e.target.value)} className={inputClass("zip")} />
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL}>{sd.property.propType}</label>
                  <select value={formData.propertyType} onChange={(e) => updateField("propertyType", Number(e.target.value))} className={SELECT}>
                    {sd.property.propTypes.map((opt, i) => <option key={i} value={i}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={LABEL}>{sd.property.occupancy}</label>
                  <select value={formData.occupancy} onChange={(e) => updateField("occupancy", Number(e.target.value))} className={SELECT}>
                    {sd.property.occupancies.map((opt, i) => <option key={i} value={i}>{opt}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                  <label className={LABEL}>{sd.property.beds}</label>
                  <div className={EXAMPLE}>{lang === "es" ? "Ej. 3" : "e.g. 3"}</div>
                  <input type="number" value={formData.beds} onChange={(e) => updateField("beds", e.target.value)} className={inputClass("beds")} />
                </div>
                <div>
                  <label className={LABEL}>{sd.property.baths}</label>
                  <div className={EXAMPLE}>{lang === "es" ? "Ej. 2" : "e.g. 2"}</div>
                  <input type="number" value={formData.baths} onChange={(e) => updateField("baths", e.target.value)} className={inputClass("baths")} />
                </div>
                <div>
                  <label className={LABEL}>{sd.property.sqft}</label>
                  <div className={EXAMPLE}>{lang === "es" ? "Ej. 1500" : "e.g. 1500"}</div>
                  <input type="number" value={formData.sqft} onChange={(e) => updateField("sqft", e.target.value)} className={inputClass("sqft")} />
                </div>
              </div>

              <div className="mb-4">
                <label className={LABEL}>{sd.property.condition}</label>
                <div className="flex gap-2">
                  {sd.property.conditions.map((cond, i) => (
                    <button 
                      key={i} 
                      type="button"
                      onClick={() => updateField("condition", i)}
                      className={`flex-1 rounded-md border p-2.5 text-center text-[12px] font-semibold transition-colors ${
                        formData.condition === i ? "border-accent bg-accent-soft text-accent" : "border-rule bg-surface text-ink-2 hover:border-ink-3"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={LABEL}>{sd.property.desc}</label>
                <div className={EXAMPLE}>{sd.property.descPh}</div>
                <textarea 
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className={`${INPUT} min-h-[80px] resize-y`}
                ></textarea>
              </div>

            </div>
          </div>

          {/* PASO 3: Financials */}
          {step === 3 && (
            <div className="animate-in fade-in duration-300">
              <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
                <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.financials.title}</h2>
                <p className="mb-6 text-[13px] text-ink-3">{sd.financials.sub}</p>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{sd.financials.purchasePrice}</label>
                    <div className={EXAMPLE}>{lang === "es" ? "Ej. 85,000" : "e.g. 85,000"}</div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.purchasePrice} onChange={(e) => updateField("purchasePrice", e.target.value)} className={`${INPUT} pl-7`} />
                    </div>
                  </div>
                  <div>
                    <label className={LABEL}>{sd.financials.loanAmount}</label>
                    <div className={EXAMPLE}>{lang === "es" ? "Ej. 110,000" : "e.g. 110,000"}</div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.loanAmount} onChange={(e) => updateField("loanAmount", e.target.value)} className={`${INPUT} pl-7`} />
                    </div>
                    <div className="mt-1 text-[11px] text-ink-3">{sd.financials.loanHint}</div>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{sd.financials.arv}</label>
                    <div className={EXAMPLE}>{lang === "es" ? "Ej. 165,000" : "e.g. 165,000"}</div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.arv} onChange={(e) => updateField("arv", e.target.value)} className={`${INPUT} pl-7`} />
                    </div>
                    <div className="mt-1 text-[11px] text-ink-3">{sd.financials.arvHint}</div>
                  </div>
                  <div>
                    <label className={LABEL}>{sd.financials.rehab}</label>
                    <div className={EXAMPLE}>{lang === "es" ? "Ej. 30,000" : "e.g. 30,000"}</div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.rehab} onChange={(e) => updateField("rehab", e.target.value)} className={`${INPUT} pl-7`} />
                    </div>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{sd.financials.desiredTerm}</label>
                    <select value={formData.term} onChange={(e) => updateField("term", Number(e.target.value))} className={SELECT}>
                      {sd.financials.terms.map((opt, i) => <option key={i} value={i}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>{sd.financials.maxRate}</label>
                    <select value={formData.rate} onChange={(e) => updateField("rate", Number(e.target.value))} className={SELECT}>
                      {sd.financials.maxRates.map((opt, i) => <option key={i} value={i}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                {/* LTV Indicator Visual */}
                <div className="mt-4 rounded-lg border border-rule bg-surface-2 p-3.5 sm:p-4">
                  <div className="mb-2 flex justify-between text-[12px] text-ink-2">
                    <span>{sd.financials.ltvLabel}</span>
                    <span className={`font-bold ${ltv > 75 ? "text-crit" : "text-accent"}`}>{ltv}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-rule">
                    <div className={`h-full rounded-full transition-all duration-300 ${ltvColor}`} style={{ width: `${Math.min(ltv, 100)}%` }} />
                  </div>
                  <div className="mt-2 text-[11px] text-ink-3">{ltvText}</div>
                </div>

                <div className="my-5 h-px bg-rule"></div>

                <div className="mb-5">
                  <label className={LABEL}>{sd.financials.exitLabel}</label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2.5">
                    {sd.financials.exits.map((exit, i) => (
                      <div 
                        key={i} 
                        onClick={() => updateField("exitStrategy", i)}
                        className={`cursor-pointer rounded-md border-[1.5px] p-2.5 text-center text-[13px] font-semibold transition-colors ${
                          formData.exitStrategy === i ? "border-accent bg-accent-soft text-accent" : "border-rule bg-surface text-ink-2 hover:border-accent hover:text-accent"
                        }`}
                      >
                        {exit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* LIVE CALC BOX */}
                <div className="rounded-lg border border-rule bg-surface-2 p-5">
                  <div className="mb-3 text-[12px] font-bold uppercase tracking-wide text-ink-2">{sd.liveCalc.title}</div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.purchase}</span>
                    <span className="font-semibold text-ink">{formatCurrency(numPurchase)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.loan}</span>
                    <span className="font-semibold text-ink">{formatCurrency(numLoan)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.rehab}</span>
                    <span className="font-semibold text-ink">{formatCurrency(numRehab)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.arv}</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(numArv)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.ltv}</span>
                    <span className="font-semibold text-ink">{ltv > 0 ? `${ltv}%` : "—"}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-rule pt-3 text-[13px]">
                    <span className="font-bold text-ink">{sd.liveCalc.monthly.replace("{rate}", `${selectedRate}%`)}</span>
                    <span className="text-[15px] font-bold text-accent">{formatCurrency(estimatedMonthly)}</span>
                  </div>
                  {ltv > 75 && (
                    <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-2.5 text-[12px] font-semibold text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                      {sd.liveCalc.warning}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* PASO 4: Review & Post */}
          {step === 4 && (
            <div className="animate-in fade-in duration-300">
              
              <div className="mb-4 flex items-start gap-3 rounded-lg border border-accent/30 bg-accent-soft p-3.5 sm:p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3C4.5 3 1.5 8 1.5 8s3 5 6.5 5 6.5-5 6.5-5-3-5-6.5-5z" stroke="#fff" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" fill="#fff"/></svg>
                </div>
                <div className="text-[13px] leading-[1.6] text-ink">
                  <strong className="font-bold">{sd.review.visTitle}</strong><br/>
                  <span className="text-[11px] text-accent">{sd.review.visSub}</span>
                </div>
              </div>

              <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
                <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.review.title}</h2>
                <p className="mb-5 text-[13px] text-ink-3">{sd.review.sub}</p>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secType}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.type}</span>
                    <span className="text-[13px] font-semibold text-ink">{loanTypeLabels[formData.loanType]} <span className="ml-2 cursor-pointer text-[11px] font-semibold text-accent hover:underline" onClick={() => setStep(1)}>{sd.review.edit}</span></span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.term}</span>
                    <span className="text-[13px] font-semibold text-ink">{sd.financials.terms[formData.term]}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secProp}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.address}</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.address || "N/A"}, {formData.city} {formData.state} <span className="ml-2 cursor-pointer text-[11px] font-semibold text-accent hover:underline" onClick={() => setStep(2)}>{sd.review.edit}</span></span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.type}</span>
                    <span className="text-[13px] font-semibold text-ink">{sd.property.propTypes[formData.propertyType]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.condition}</span>
                    <span className="text-[13px] font-semibold text-ink">{sd.property.conditions[formData.condition]}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secFin}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.purchasePrice}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numPurchase)} <span className="ml-2 cursor-pointer text-[11px] font-semibold text-accent hover:underline" onClick={() => setStep(3)}>{sd.review.edit}</span></span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.loanAmount}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numLoan)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.arv}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numArv)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.rehab}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numRehab)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.ltv}</span>
                    <span className="text-[13px] font-semibold text-ink">{ltv}%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.maxRate}</span>
                    <span className="text-[13px] font-semibold text-ink">{sd.financials.maxRates[formData.rate]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.exitStrategy}</span>
                    <span className="text-[13px] font-semibold text-ink">{sd.financials.exits[formData.exitStrategy]}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secBiz}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.entity}</span>
                    <span className="text-[13px] font-semibold text-ink">Memphis Realty LLC</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.states}</span>
                    <span className="text-[13px] font-semibold text-ink">TN, MS, AR</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">{sd.review.verification}</span>
                    <span className="text-[13px] font-semibold text-amber">{sd.review.unverified}</span>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">
                    {sd.review.photosTitle}
                  </div>
                  <FileDropzone files={files} onChange={setFiles} isEs={lang === "es"} disabled={isSubmitting} />
                </div>
                <button 
                  onClick={() => handlePostDeal(false)}
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-accent p-3.5 text-[15px] font-extrabold tracking-tight text-white transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? sd.review.processing : sd.review.btnPost}
                </button>
                <button 
                  onClick={() => handlePostDeal(true)}
                  disabled={isSubmitting}
                  className="mt-3 w-full rounded-md bg-surface-2 border border-rule p-3.5 text-[15px] font-extrabold tracking-tight text-ink-2 transition-colors hover:bg-rule disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? sd.review.processing : sd.review.btnDraft}
                </button>
                <div className="mt-2.5 text-center text-[11px] leading-[1.6] text-ink-3 whitespace-pre-line">
                  {sd.review.postNote}
                </div>
              </div>
            </div>
          )}

        </div>
    </main>

    {/* Bottom Fixed Bar */}
    <div className="fixed bottom-0 left-0 md:left-[200px] right-0 z-40 flex items-center justify-between border-t border-rule bg-white px-8 py-3.5 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      <button
        onClick={handlePrev}
          className={`rounded-md border border-rule bg-surface px-4 py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3 hover:text-ink ${step === 1 ? "invisible" : ""}`}
        >
          {sd.actions.back}
        </button>
        <span className="text-[12px] font-medium text-ink-3">
          {sd.stepHint.replace("{current}", step.toString()).replace("{total}", "4").replace("{stepName}", sd.steps[step - 1])}
        </span>
        <button 
          onClick={handleNext} 
          className={`rounded-md bg-accent px-6 py-2 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700 ${step === 4 ? "hidden" : ""}`}
        >
          {step === 3 ? sd.actions.review : sd.actions.continue}
        </button>
      </div>
    </div>
  );
}