"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/heic"];
export const MAX_FILES = 10;
export const MAX_BYTES = 10 * 1024 * 1024;

type Props = { files: File[]; onChange: (files: File[]) => void; isEs?: boolean; disabled?: boolean };

// Controlado: el padre guarda los File[] y decide cuando subirlos.
// El back detecta el tipo real por contenido; aqui solo filtramos lo obvio.
export default function FileDropzone({ files, onChange, isEs = true, disabled }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");

  const previews = useMemo(
    () => files.map((f) => (f.type.startsWith("image/") && f.type !== "image/heic" ? URL.createObjectURL(f) : null)),
    [files],
  );
  useEffect(() => () => previews.forEach((u) => u && URL.revokeObjectURL(u)), [previews]);

  const add = (list: FileList | null) => {
    if (!list) return;
    const errs: string[] = [];
    const next = [...files];
    for (const f of Array.from(list)) {
      const type = f.type || (/\.heic$/i.test(f.name) ? "image/heic" : "");
      if (!ALLOWED_TYPES.includes(type)) errs.push(`${f.name}: ${isEs ? "tipo no permitido" : "unsupported type"}`);
      else if (f.size > MAX_BYTES) errs.push(`${f.name}: ${isEs ? "supera 10 MB" : "over 10 MB"}`);
      else if (next.length >= MAX_FILES) errs.push(isEs ? `Máximo ${MAX_FILES} archivos` : `Max ${MAX_FILES} files`);
      else next.push(f);
    }
    setError([...new Set(errs)].join(" · "));
    onChange(next);
  };

  return (
    <div>
      <div
        onClick={() => !disabled && input.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); if (!disabled) add(e.dataTransfer.files); }}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          over ? "border-accent bg-accent/5" : "border-rule bg-surface hover:border-ink-3"
        } ${disabled ? "opacity-50" : ""}`}
      >
        <div className="text-[14px] font-semibold text-ink">
          {isEs ? "Arrastra archivos aquí o haz clic para seleccionarlos" : "Drag files here or click to select"}
        </div>
        <div className="mt-1 text-[12px] text-ink-3">
          {isEs ? "PDF, JPG, PNG, WEBP, HEIC · máx. 10 MB · hasta 10 archivos" : "PDF, JPG, PNG, WEBP, HEIC · max 10 MB · up to 10 files"}
        </div>
        <input
          ref={input}
          type="file"
          multiple
          hidden
          accept={ALLOWED_TYPES.join(",") + ",.heic"}
          onChange={(e) => { add(e.target.files); e.target.value = ""; }}
        />
      </div>
      {error && <div className="mt-2 text-[12px] text-red-600">{error}</div>}
      {files.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="relative rounded-lg border border-rule bg-bg p-2">
              <div className="flex h-20 items-center justify-center overflow-hidden rounded bg-surface-2 text-[11px] font-bold text-ink-3">
                {previews[i] ? <img src={previews[i]!} alt={f.name} className="h-full w-full object-cover" /> : f.type === "application/pdf" ? "PDF" : "IMG"}
              </div>
              <div className="mt-1 truncate text-[11px] text-ink-2" title={f.name}>{f.name}</div>
              <button
                type="button"
                aria-label={isEs ? "Quitar" : "Remove"}
                onClick={() => onChange(files.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] text-white"
              >×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
