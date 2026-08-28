"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Check, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useSite } from "./SiteShell";
import { BTN_PRIMARY } from "./ui";
import {
  registrarUsuario,
  REGISTRO_SIMULADO,
  type Intent,
} from "@/app/lib/registro";
import { enviarCRM } from "@/app/lib/crm";

type Campo =
  | "intent"
  | "nombre"
  | "correo"
  | "telefono"
  | "terminos";

type Errores = Partial<Record<Campo, string>>;

const INPUT =
  "block h-11 w-full rounded-[2px] border border-rule bg-bg px-3 text-[0.95rem] " +
  "text-ink placeholder:text-ink-3 outline-none transition-colors " +
  "focus:border-accent";

const INPUT_ERROR = "border-crit";

const LABEL = "eyebrow mb-2 block text-ink-3";

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

  // El error de un campo desaparece en cuanto el visitante lo toca, en vez de
  // quedarse en rojo hasta el siguiente envio.
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
      // Se lleva el foco al primer campo con problema, no solo el color.
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
        className="scroll-mt-24 rounded-[2px] border border-rule bg-surface p-7 shadow-card"
      >
        <div
          className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-accent-soft text-accent"
          aria-hidden
        >
          <Check className="h-5 w-5" />
        </div>
        <h2 className="mt-5 mb-2 font-serif text-[1.5rem] leading-tight font-semibold text-ink">
          {f.success.title}
        </h2>
        <p className="m-0 text-ink-2">
          {f.success.body}{" "}
          <strong className="font-medium break-all text-ink">
            {correoEnviado}
          </strong>
        </p>
        <p className="mt-4 mb-0 text-sm text-ink-3">{f.success.note}</p>
        <button
          type="button"
          onClick={reiniciar}
          className="eyebrow mt-6 text-accent underline underline-offset-4"
        >
          {f.success.again}
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
      className="scroll-mt-24 rounded-[2px] border border-rule bg-surface p-6 shadow-card sm:p-7"
    >
      <p className="eyebrow m-0 text-accent">{f.eyebrow}</p>
      <h2 className="mt-3 mb-1 font-serif text-[1.6rem] leading-tight font-semibold tracking-[-0.01em] text-ink">
        {f.title}
      </h2>
      <p className="mt-0 mb-6 text-sm text-ink-2">{f.subtitle}</p>

      <div aria-live="polite">
        {listaErrores.length > 0 || errorEnvio ? (
          <p className="mb-5 rounded-[2px] border border-crit bg-crit-soft px-3 py-2 text-sm text-crit">
            {errorEnvio ?? f.errors.summary}
          </p>
        ) : null}
      </div>

      {/* Intención de uso. No es un rol: el rol vive en cada préstamo
          (LoanParty, Sección 7 del alcance). Solo decide qué se muestra
          al entrar. */}
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
                className={`flex min-h-11 cursor-pointer flex-col justify-center rounded-[2px] border px-3 py-2 transition-colors ${
                  activo
                    ? "border-accent bg-accent-soft"
                    : "border-rule bg-bg hover:border-rule-strong"
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
                  className={`text-sm font-medium ${activo ? "text-accent" : "text-ink"}`}
                >
                  {opcion.label}
                </span>
                <span className="eyebrow text-ink-3">{opcion.hint}</span>
              </label>
            );
          })}
        </div>
        {errores.intent ? (
          <p id={`${uid}-intent-err`} className="mt-2 mb-0 text-xs text-crit">
            {errores.intent}
          </p>
        ) : null}
        <p className="mt-2 mb-0 text-xs leading-relaxed text-ink-3">
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
          <p id={`${uid}-nombre-err`} className="mt-1 mb-0 text-xs text-crit">
            {errores.nombre}
          </p>
        ) : null}
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
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
            <p id={`${uid}-correo-err`} className="mt-1 mb-0 text-xs text-crit">
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
              className="mt-1 mb-0 text-xs text-crit"
            >
              {errores.telefono}
            </p>
          ) : null}
        </div>
      </div>

      <label className="mb-5 flex cursor-pointer items-start gap-3 text-sm text-ink-2">
        <input
          type="checkbox"
          name="terminos"
          checked={terminos}
          onChange={(e) => {
            setTerminos(e.target.checked);
            limpiar("terminos");
          }}
          aria-invalid={errores.terminos ? true : undefined}
          className={`mt-1 h-[18px] w-[18px] shrink-0 accent-[var(--accent)] ${
            errores.terminos ? "outline outline-2 outline-crit" : ""
          }`}
        />
        <span>
          {f.terms}{" "}
          <a href="#" className="text-accent underline underline-offset-2">
            {f.termsLink}
          </a>{" "}
          {f.termsAnd}{" "}
          <a
            href="/aviso-de-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2"
          >
            {f.privacyLink}
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className={`${BTN_PRIMARY} w-full`}
      >
        {estado === "enviando" ? f.submitting : f.submit}
      </button>

      <p className="mt-4 mb-0 flex items-start gap-2 text-xs leading-relaxed text-ink-3">
        <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
        {f.twofaNote}
      </p>

      {/* <div className="mt-5 border-t border-rule pt-4 text-xs text-ink-3">
        <p className="m-0">
          {f.inviteNote}{" "}
          <a href="#" className="text-accent underline underline-offset-2">
            {f.inviteLink}
          </a>{" "}
          {f.inviteNoteEnd}
        </p>
        <p className="mt-2 mb-0">
          {f.haveAccount}{" "}
          <a href="#" className="text-accent underline underline-offset-2">
            {f.login}
          </a>
        </p>
      </div> */}
    </form>
  );
}
