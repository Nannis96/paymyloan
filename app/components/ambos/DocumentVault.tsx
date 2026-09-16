"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, Download, PenTool, CheckCircle2 } from "lucide-react";
import { useSite } from "./layout/SiteShell";

interface DocumentItem {
  id: string;
  name: string;
  date: string;
  requiresSignature: boolean;
  isSigned: boolean;
}

export default function DocumentVault({ contractId }: { contractId: string }) {
  const { t } = useSite();
  const dv = t.documentVault;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);

  // TODO: MOCK TEMPORAL. 
  // Esto vendra de la API (Ej. GET /api/contracts/{contractId}/documents)
  // El archivo fisico estara en AWS S3 o similar.
  const [documents] = useState<DocumentItem[]>([
    { id: "doc_1", name: "Commitment_Letter.pdf", date: "2026-09-01", requiresSignature: true, isSigned: true },
    { id: "doc_2", name: "Promissory_Note.pdf", date: "2026-09-02", requiresSignature: true, isSigned: false },
    { id: "doc_3", name: "Property_Insurance.pdf", date: "2026-09-05", requiresSignature: false, isSigned: false }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // TODO: BACKEND - Logica para subir el archivo (FormData) al endpoint del backend
    console.log(`Subiendo documento ${file.name} al contrato ${contractId}`);

    setTimeout(() => {
      setIsUploading(false);
      // Aqui se haria un refetch de los documentos
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1500);
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-ink-3">{dv.title}</h2>
          <p className="text-xs text-ink-2 mt-1">{dv.subtitle}</p>
        </div>
        
        <div>
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-lg bg-surface-2 border border-rule px-4 py-2 text-xs font-bold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
          >
            <UploadCloud className="h-4 w-4" />
            {isUploading ? dv.uploading : dv.uploadBtn}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-5 py-4 font-bold text-ink-3">{dv.table.name}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{dv.table.date}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{dv.table.status}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{dv.table.action}</th>
            </tr>
          </thead>
          <tbody className="text-ink-2 divide-y divide-rule">
            {documents.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-ink-3">
                  {dv.empty}
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-surface-2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-ink-3" />
                      <span className="font-medium text-ink">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">{doc.date}</td>
                  <td className="px-5 py-4">
                    {!doc.requiresSignature ? (
                      <span className="inline-flex rounded-[4px] border border-rule-strong bg-surface-2 px-2 py-1 text-[11px] font-bold text-ink-3">
                        {dv.status.file}
                      </span>
                    ) : doc.isSigned ? (
                      <span className="inline-flex items-center gap-1 rounded-[4px] border border-green-200 bg-green-50 px-2 py-1 text-[11px] font-bold text-green-700 dark:border-green-900/40 dark:bg-green-900/10 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3" /> {dv.status.signed}
                      </span>
                    ) : (
                      <span className="inline-flex rounded-[4px] border border-amber/30 bg-amber-soft px-2 py-1 text-[11px] font-bold text-amber">
                        {dv.status.pending}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      {doc.requiresSignature && !doc.isSigned && (
                        <button className="flex items-center gap-1 text-xs font-bold text-accent hover:underline">
                          <PenTool className="h-3 w-3" /> {dv.actions.sign}
                        </button>
                      )}
                      <button className="flex items-center gap-1 text-xs font-bold text-ink-3 hover:text-ink">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}