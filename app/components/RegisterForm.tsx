"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { useSite } from "./layout/SiteShell";
import {
  registrarUsuario,
  type Intent,
} from "@/app/lib/registro";
import { enviarCRM } from "@/app/lib/crm";

type Campo = "intent" | "nombre" | "correo" | "telefono" | "terminos";
type Errores = Partial<Record<Campo, string>>;

const INPUT =
  "block h-[46px] w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 text-[15px] " +
  "text-white placeholder:text-gray-500 outline-none transition-colors " +
  "focus:border-accent";

const INPUT_ERROR = "border-red-500 focus:border-red-500";
const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400";

export default function RegisterForm() {
  const { t, lang } = useSite();
  const f = t.form;

  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [intent, setIntent] = useState<Intent | null>(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [terminos, setTerminos] = useState(false);

  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "listo">("idle");
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [correoEnviado, setCorreoEnviado] = useState("");

  const limpiar = (campo: Campo) =>
    setErrores((prev) => (prev[campo] ? { ...prev, [campo]: undefined } : prev));

  function validar(): Errores {
    const e: Errores = {};
    if (!intent) e.intent = f.errors.intent;
    if (nombre.trim().length < 3) e.nombre = f.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim()))
      e.correo = f.errors.email;
    if (telefono.replace(/\D/g, "").length < 10) e.telefono = f.errors.phone;
    if (!terminos) e.terminos = f.errors.terms;
    return e;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorEnvio(null);

    const e = validar();
    setErrores(e);

    if (Object.keys(e).length > 0) {
      const primero = e.intent
        ? formRef.current?.querySelector<HTMLElement>('input[name="intent"]')
        : formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      primero?.focus();
      return;
    }

    setEstado("enviando");

    void enviarCRM({
      intent: intent as Intent,
      nombre: nombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      aceptaTerminos: true,
      idioma: lang,
    });

    const resultado = await registrarUsuario({
      intent: intent as Intent,
      nombre: nombre.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      aceptaTerminos: true,
      idioma: lang,
    });

    if (resultado.ok) {
      setCorreoEnviado(correo.trim());
      setEstado("listo");
    } else {
      setEstado("idle");
      setErrorEnvio(f.errors.submit);
    }
  }

  function reiniciar() {
    setEstado("idle");
    setCorreo("");
    setErrores({});
  }

  if (estado === "listo") {
    return (
      <div
        id="registro"
        className="scroll-mt-24 w-full rounded-2xl border border-[#2a2a2a] bg-[#141414] p-8 shadow-2xl"
      >
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a8a]/30 text-accent"
          aria-hidden
        >
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mb-2 text-2xl font-black tracking-tight text-white">
          {f.success.title}
        </h2>
        <p className="m-0 text-[15px] leading-relaxed text-gray-400">
          {f.success.body}{" "}
          <strong className="break-all font-bold text-white">
            {correoEnviado}
          </strong>
        </p>
        <p className="mt-4 mb-0 text-[13px] text-gray-500">{f.success.note}</p>
        <button
          type="button"
          onClick={reiniciar}
          className="mt-8 text-[11px] font-bold uppercase tracking-widest text-accent transition-colors hover:text-white"
        >
          {f.success.again} &rarr;
        </button>
      </div>
    );
  }

  const listaErrores = Object.values(errores);

  return (
    <form
      ref={formRef}
      id="registro"
      onSubmit={onSubmit}
      noValidate
      className="scroll-mt-24 w-full rounded-2xl border border-[#2a2a2a] bg-[#141414] p-6 shadow-2xl sm:p-8"
    >
      <p className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-accent">
        {f.eyebrow}
      </p>
      <h2 className="mb-2 text-2xl font-black tracking-tight text-white">
        {f.title}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-gray-400">
        {f.subtitle}
      </p>

      <div aria-live="polite">
        {listaErrores.length > 0 || errorEnvio ? (
          <p className="mb-5 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm font-medium text-red-400">
            {errorEnvio ?? f.errors.summary}
          </p>
        ) : null}
      </div>

      <fieldset
        className="m-0 mb-5 border-0 p-0"
        aria-describedby={errores.intent ? `${uid}-intent-err` : undefined}
      >
        <legend className={LABEL}>{f.intentLabel}</legend>
        <div className="grid grid-cols-2 gap-2">
          {f.intents.map((opcion) => {
            const activo = intent === opcion.value;
            return (
              <label
                key={opcion.value}
                className={`flex min-h-[52px] cursor-pointer flex-col justify-center rounded-lg border px-4 py-2 transition-colors ${
                  activo
                    ? "border-accent bg-[#1e3a8a]/30"
                    : "border-[#2a2a2a] bg-[#1a1a1a] hover:border-gray-600"
                } ${errores.intent ? INPUT_ERROR : ""}`}
              >
                <input
                  type="radio"
                  name="intent"
                  value={opcion.value}
                  checked={activo}
                  onChange={() => {
                    setIntent(opcion.value as Intent);
                    limpiar("intent");
                  }}
                  className="sr-only"
                />
                <span
                  className={`text-sm font-bold ${
                    activo ? "text-accent" : "text-white"
                  }`}
                >
                  {opcion.label}
                </span>
                <span className="text-[11px] font-medium text-gray-500">
                  {opcion.hint}
                </span>
              </label>
            );
          })}
        </div>
        {errores.intent ? (
          <p id={`${uid}-intent-err`} className="mt-2 mb-0 text-xs text-red-400">
            {errores.intent}
          </p>
        ) : null}
        <p className="mt-2 mb-0 text-xs leading-relaxed text-gray-500">
          {f.intentNote}
        </p>
      </fieldset>

      <div className="mb-4">
        <label className={LABEL} htmlFor={`${uid}-nombre`}>
          {f.name}
        </label>
        <input
          id={`${uid}-nombre`}
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder={f.namePh}
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            limpiar("nombre");
          }}
          aria-invalid={errores.nombre ? true : undefined}
          aria-describedby={errores.nombre ? `${uid}-nombre-err` : undefined}
          className={`${INPUT} ${errores.nombre ? INPUT_ERROR : ""}`}
        />
        {errores.nombre ? (
          <p id={`${uid}-nombre-err`} className="mt-1 mb-0 text-xs text-red-400">
            {errores.nombre}
          </p>
        ) : null}
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor={`${uid}-correo`}>
            {f.email}
          </label>
          <input
            id={`${uid}-correo`}
            name="correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={f.emailPh}
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              limpiar("correo");
            }}
            aria-invalid={errores.correo ? true : undefined}
            aria-describedby={errores.correo ? `${uid}-correo-err` : undefined}
            className={`${INPUT} ${errores.correo ? INPUT_ERROR : ""}`}
          />
          {errores.correo ? (
            <p id={`${uid}-correo-err`} className="mt-1 mb-0 text-xs text-red-400">
              {errores.correo}
            </p>
          ) : null}
        </div>
        <div>
          <label className={LABEL} htmlFor={`${uid}-telefono`}>
            {f.phone}
          </label>
          <input
            id={`${uid}-telefono`}
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={f.phonePh}
            value={telefono}
            onChange={(e) => {
              setTelefono(e.target.value);
              limpiar("telefono");
            }}
            aria-invalid={errores.telefono ? true : undefined}
            aria-describedby={
              errores.telefono ? `${uid}-telefono-err` : undefined
            }
            className={`${INPUT} ${errores.telefono ? INPUT_ERROR : ""}`}
          />
          {errores.telefono ? (
            <p
              id={`${uid}-telefono-err`}
              className="mt-1 mb-0 text-xs text-red-400"
            >
              {errores.telefono}
            </p>
          ) : null}
        </div>
      </div>

      <label className="mb-6 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-gray-400">
        <input
          type="checkbox"
          name="terminos"
          checked={terminos}
          onChange={(e) => {
            setTerminos(e.target.checked);
            limpiar("terminos");
          }}
          aria-invalid={errores.terminos ? true : undefined}
          className={`mt-0.5 h-4 w-4 shrink-0 rounded border-gray-600 bg-[#1a1a1a] text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#141414] ${
            errores.terminos ? "outline outline-2 outline-red-500" : ""
          }`}
        />
        <span>
          {f.terms}{" "}
          <a href="#" className="font-semibold text-accent transition-colors hover:text-white">
            {f.termsLink}
          </a>{" "}
          {f.termsAnd}{" "}
          <a
            href="/aviso-de-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent transition-colors hover:text-white"
          >
            {f.privacyLink}
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-white transition-all hover:bg-blue-600 disabled:opacity-50"
      >
        {estado === "enviando" ? f.submitting : f.submit}
      </button>

      <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-gray-500">
        <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
        {f.twofaNote}
      </p>
    </form>
  );
}