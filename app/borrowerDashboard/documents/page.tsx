"use client";
import { useCallback, useEffect, useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import FileDropzone from "@/app/components/ui/FileDropzone";
import { api, apiFetch, toList } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";

type DocMeta = { id: string; originalFileName: string; mimeType: string; sizeBytes: number; uploadedByUserId: string; createdAt: string };
type Row = { id: string; status: string; contractNumber?: string; property?: { addressLine1?: string } };
type Parent = { id: string; title: string; subtitle: string; status: string; kind: "loanRequest" | "contract" };

const fmtSize = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

// Descifrado en el back: hay que pedir con token y abrir como blob (no sirve <a href>).
async function openDoc(id: string, name: string, download: boolean) {
  const res = await apiFetch(API_ROUTES.documents.content(id) + (download ? "?download=1" : ""));
  if (!res.ok) return alert("No se pudo abrir el documento");
  const url = URL.createObjectURL(await res.blob());
  if (download) {
    const a = Object.assign(document.createElement("a"), { href: url, download: name });
    a.click();
  } else window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function DocGroup({ parent, meId, isEs }: { parent: Parent; meId: string; isEs: boolean }) {
  const [docs, setDocs] = useState<DocMeta[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const url = (parent.kind === "contract" ? API_ROUTES.documents.byContract : API_ROUTES.documents.byLoanRequest)(parent.id);

  const load = useCallback(
    () => api<unknown>(url).then((d) => setDocs(toList<DocMeta>(d)), () => setDocs([])),
    [url],
  );
  useEffect(() => { load(); }, [load]);

  const upload = async () => {
    setBusy(true); setError("");
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      await api(url, { method: "POST", body: fd });
      setFiles([]); setAdding(false); await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally { setBusy(false); }
  };

  const remove = async (d: DocMeta) => {
    if (!confirm(isEs ? `¿Eliminar "${d.originalFileName}"?` : `Delete "${d.originalFileName}"?`)) return;
    const res = await apiFetch(API_ROUTES.documents.byId(d.id), { method: "DELETE" });
    if (res.ok) setDocs((p) => p && p.filter((x) => x.id !== d.id));
    else alert(isEs ? "No se pudo eliminar" : "Could not delete");
  };

  const btn = "rounded-md border border-rule bg-surface px-2.5 py-1 text-[11px] font-bold text-ink-2 hover:border-ink-3 cursor-pointer";

  return (
    <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-rule pb-4">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold text-ink">{parent.title}</h3>
          <div className="text-[12px] text-ink-3">{parent.subtitle}</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded bg-surface-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-2">{parent.status}</span>
          <button onClick={() => setAdding((a) => !a)} className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-bold text-white cursor-pointer">
            {adding ? (isEs ? "Cancelar" : "Cancel") : isEs ? "+ Subir documentos" : "+ Upload documents"}
          </button>
        </div>
      </div>

      {adding && (
        <div className="mb-5">
          <FileDropzone files={files} onChange={setFiles} isEs={isEs} disabled={busy} />
          {error && <div className="mt-2 text-[12px] text-red-600">{error}</div>}
          <button
            onClick={upload}
            disabled={busy || !files.length}
            className="mt-3 rounded-md bg-accent px-4 py-2 text-[13px] font-bold text-white disabled:opacity-50 cursor-pointer"
          >
            {busy ? (isEs ? "Subiendo..." : "Uploading...") : isEs ? `Subir ${files.length || ""} archivo(s)` : `Upload ${files.length || ""} file(s)`}
          </button>
        </div>
      )}

      {docs === null ? (
        <div className="text-[13px] text-ink-3">{isEs ? "Cargando..." : "Loading..."}</div>
      ) : docs.length === 0 ? (
        <div className="text-[13px] text-ink-3">{isEs ? "Sin documentos todavía." : "No documents yet."}</div>
      ) : (
        <div className="flex flex-col gap-3">
          {docs.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-3 rounded-lg border border-rule bg-bg p-3">
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-ink">{d.originalFileName}</div>
                <div className="text-[11px] text-ink-3">
                  {fmtSize(d.sizeBytes)} · {new Date(d.createdAt).toLocaleDateString()} ·{" "}
                  {d.uploadedByUserId === meId ? (isEs ? "Subido por ti" : "Uploaded by you") : isEs ? "Subido por la otra parte" : "Uploaded by the other party"}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button className={btn} onClick={() => openDoc(d.id, d.originalFileName, false)}>{isEs ? "Ver" : "View"}</button>
                <button className={btn} onClick={() => openDoc(d.id, d.originalFileName, true)}>{isEs ? "Descargar" : "Download"}</button>
                {d.uploadedByUserId === meId && (
                  <button className={`${btn} text-red-600`} onClick={() => remove(d)}>{isEs ? "Eliminar" : "Delete"}</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocumentsPage() {
  const { lang } = useSite();
  const isEs = lang === "es";
  const [parents, setParents] = useState<Parent[]>([]);
  const [meId, setMeId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [me, lrs, cts] = await Promise.all([
          api<{ user?: { id: string } }>(API_ROUTES.auth.me),
          api<unknown>(`${API_ROUTES.borrowers.meLoanRequests}?pageSize=50`).then(toList<Row>).catch(() => []),
          api<unknown>(`${API_ROUTES.contracts.base}?pageSize=50`).then(toList<Row>).catch(() => []),
        ]);
        setMeId(me?.user?.id ?? "");
        setParents([
          ...lrs.map((l): Parent => ({
            id: l.id, kind: "loanRequest", status: l.status,
            title: l.property?.addressLine1 || (isEs ? "Solicitud de préstamo" : "Loan request"),
            subtitle: isEs ? "Solicitud de préstamo" : "Loan request",
          })),
          ...cts.map((c): Parent => ({
            id: c.id, kind: "contract", status: c.status,
            title: c.property?.addressLine1 || (isEs ? "Contrato" : "Contract"),
            subtitle: `${isEs ? "Contrato" : "Contract"} ${c.contractNumber ?? ""}`,
          })),
        ]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isEs]);

  return (
    <SiteShell isMinimal={true}>
      <div className="max-w-[900px] animate-in fade-in duration-300 pb-12">
        <header className="mb-8">
          <h1 className="text-[28px] font-[900] tracking-tight text-ink">{isEs ? "Documentos" : "Documents"}</h1>
          <p className="mt-[4px] text-[14px] text-ink-3">
            {isEs
              ? "Documentos de tus solicitudes y contratos, incluidos los que subió la otra parte."
              : "Documents on your loan requests and contracts, including those uploaded by the other party."}
          </p>
        </header>

        {isLoading ? (
          <div className="text-[14px] text-ink-3">{isEs ? "Cargando..." : "Loading..."}</div>
        ) : parents.length === 0 ? (
          <div className="rounded-xl border border-rule bg-surface p-8 text-center shadow-sm text-[14px] text-ink-3">
            {isEs ? "No tienes solicitudes ni contratos." : "You have no loan requests or contracts."}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {parents.map((p) => <DocGroup key={`${p.kind}-${p.id}`} parent={p} meId={meId} isEs={isEs} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
