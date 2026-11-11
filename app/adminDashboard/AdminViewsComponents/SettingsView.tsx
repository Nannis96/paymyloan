"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError, cerrarSesion } from "@/app/lib/apiFetch";
import type { SafeUser } from "@/app/types/api";
import TwoFactorSetupModal from "@/app/components/dashboards/settings/TwoFactorSetupModal";

const CARD = "mb-4 max-w-[720px] rounded-xl border border-rule bg-surface p-7 shadow-sm";
const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-3 py-2 text-[13px] text-ink outline-none focus:border-accent";
const LABEL = "mb-1 block text-[11px] font-bold text-ink-3";
const BTN = "rounded-lg bg-accent px-4 py-2 text-[13px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50";
const BTN_GHOST = "rounded-lg border border-rule px-4 py-2 text-[13px] font-bold text-ink transition-colors hover:bg-surface-2";

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
      <div className="h-2 w-2 shrink-0 rounded-full bg-accent" />
      {children}
    </div>
  );
}

// Configuracion del propio Admin: perfil (AF-20) y seguridad (AF-21).
// Los ajustes de plataforma (fees, flags) dependen del back (AF-27).
export function SettingsView() {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.settings;
  const [user, setUser] = useState<SafeUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let vigente = true;
    api<{ user: SafeUser }>(API_ROUTES.auth.me)
      .then((data) => vigente && setUser(data.user))
      .catch((err) => vigente && setError(err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork));
    return () => { vigente = false; };
  }, [reloadKey, t.dashboardAdmin.errorNetwork]);

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>

      {error && <div className="mb-4 max-w-[720px] rounded-lg bg-crit-soft p-4 text-sm font-medium text-crit">{error}</div>}
      {!user ? (
        !error && <div className="py-12 text-[13px] text-ink-3">{t.dashboardAdmin.loading}</div>
      ) : (
        <>
          <ProfileCard key={user.updatedAt} user={user} onSaved={setUser} />
          <SecurityCard user={user} onChanged={() => setReloadKey((k) => k + 1)} />
        </>
      )}
    </div>
  );
}

// AF-20: PATCH /api/auth/me. Cambiar el correo pide currentPassword y el back
// revoca todas las sesiones, asi que despues se manda al login.
function ProfileCard({ user, onSaved }: { user: SafeUser; onSaved: (u: SafeUser) => void }) {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.settings;
  const ul = t.adminUsersList;

  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone ?? "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [fieldError, setFieldError] = useState<{ field: "email" | "password"; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const emailChanged = form.email.trim().toLowerCase() !== user.email;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string> = {};
    if (form.name.trim() !== user.name) body.name = form.name.trim();
    if (form.phone.trim() && form.phone.trim() !== (user.phone ?? "")) body.phone = form.phone.trim();
    if (emailChanged) {
      body.email = form.email.trim();
      body.currentPassword = currentPassword;
    }
    if (Object.keys(body).length === 0) return;

    setSaving(true);
    setError(null);
    setFieldError(null);
    setSaved(false);
    try {
      const data = await api<{ user: SafeUser }>(API_ROUTES.auth.me, { method: "PATCH", body: JSON.stringify(body) });
      if (emailChanged) return cerrarSesion();
      onSaved(data.user);
      setSaved(true);
    } catch (err) {
      if (err instanceof ApiError && err.code === "EMAIL_TAKEN") setFieldError({ field: "email", message: ul.errorEmailTaken });
      else if (err instanceof ApiError && err.code === "INVALID_CREDENTIALS") setFieldError({ field: "password", message: v.wrongPassword });
      else setError(err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className={CARD}>
      <CardTitle>{v.profileTitle}</CardTitle>
      {error && <div className="mb-4 rounded-lg bg-crit-soft p-3 text-[13px] font-medium text-crit">{error}</div>}
      {saved && <div className="mb-4 rounded-lg bg-success-soft p-3 text-[13px] font-medium text-success">{v.saved}</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL}>{ul.table.name}</label>
          <input required maxLength={120} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>{ul.table.phone}</label>
          <input type="tel" inputMode="numeric" pattern="\d{10}" maxLength={10} title={ul.phoneHint} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${INPUT} font-mono`} />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>{ul.table.email}</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); setFieldError(null); }}
            className={`${INPUT} ${fieldError?.field === "email" ? "border-red-500" : ""}`}
          />
          {fieldError?.field === "email" && <span className="mt-1 block text-xs text-red-500">{fieldError.message}</span>}
        </div>
        {emailChanged && (
          <div className="sm:col-span-2">
            <label className={LABEL}>{v.currentPassword}</label>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => { setCurrentPassword(e.target.value); setFieldError(null); }}
              className={`${INPUT} ${fieldError?.field === "password" ? "border-red-500" : ""}`}
            />
            {fieldError?.field === "password" && <span className="mt-1 block text-xs text-red-500">{fieldError.message}</span>}
            <span className="mt-1 block text-[11px] text-amber">{v.emailChangeWarning}</span>
          </div>
        )}
      </div>
      <span className="mt-2 block text-[10px] text-ink-3">{ul.phoneHint}</span>

      <div className="mt-5 flex justify-end">
        <button type="submit" disabled={saving} className={BTN}>{saving ? "..." : ul.save}</button>
      </div>
    </form>
  );
}

// AF-21: activar (modal compartido), desactivar 2FA, regenerar recovery codes y logout-all.
// Desactivar y regenerar exigen contrasena + codigo TOTP vigente.
function SecurityCard({ user, onChanged }: { user: SafeUser; onChanged: () => void }) {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.settings;
  const ul = t.adminUsersList;

  const [setupOpen, setSetupOpen] = useState(false);
  const [mode, setMode] = useState<"disable" | "regen" | null>(null);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function openStepUp(m: "disable" | "regen") {
    setMode(m);
    setPassword("");
    setCode("");
    setError(null);
    setCodes(null);
  }

  async function submitStepUp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const body = JSON.stringify({ password, code });
      if (mode === "disable") {
        await api(API_ROUTES.auth.twoFaDisable, { method: "POST", body });
        setMode(null);
        onChanged();
      } else {
        const data = await api<{ recoveryCodes: string[] }>(API_ROUTES.auth.twoFaRecoveryCodes, { method: "POST", body });
        setCodes(data.recoveryCodes);
        setMode(null);
      }
    } catch (err) {
      if (err instanceof ApiError && err.code === "INVALID_CREDENTIALS") setError(v.wrongPasswordOrCode);
      else setError(err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork);
    } finally {
      setBusy(false);
    }
  }

  async function logoutAll() {
    if (!window.confirm(v.logoutAllConfirm)) return;
    try {
      await api(API_ROUTES.auth.logoutAll, { method: "POST" });
    } finally {
      cerrarSesion();
    }
  }

  return (
    <div className={CARD}>
      <CardTitle>{v.securityTitle}</CardTitle>

      <div className="flex flex-col gap-3 border-b border-rule py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="block text-[14px] font-bold text-ink">{v.twoFactor}</strong>
          <span className={`text-[12px] font-bold ${user.isTwoFactorEnabled ? "text-success" : "text-ink-3"}`}>
            {user.isTwoFactorEnabled ? v.enabled : v.disabled}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.isTwoFactorEnabled ? (
            <>
              <button type="button" onClick={() => openStepUp("regen")} className={BTN_GHOST}>{v.regenerateCodes}</button>
              <button type="button" onClick={() => openStepUp("disable")} className={`${BTN_GHOST} hover:border-crit hover:text-crit`}>{v.disable2fa}</button>
            </>
          ) : (
            <button type="button" onClick={() => setSetupOpen(true)} className={BTN}>{ul.enable2fa}</button>
          )}
        </div>
      </div>

      {mode && (
        <form onSubmit={submitStepUp} className="mt-4 rounded-lg border border-rule bg-surface-2 p-4">
          <p className="mb-3 text-[13px] text-ink-2">{mode === "disable" ? v.disableHelp : v.regenHelp}</p>
          {error && <div className="mb-3 rounded-lg bg-crit-soft p-3 text-[13px] font-medium text-crit">{error}</div>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={LABEL}>{v.password}</label>
              <input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>{v.code}</label>
              <input
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className={`${INPUT} font-mono tracking-widest`}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={() => setMode(null)} className={BTN_GHOST}>{ul.cancel}</button>
            <button type="submit" disabled={busy} className={BTN}>{busy ? "..." : mode === "disable" ? v.disable2fa : v.regenerateCodes}</button>
          </div>
        </form>
      )}

      {codes && (
        <div className="mt-4 rounded-lg border border-rule bg-surface-2 p-4">
          <p className="mb-3 text-[13px] text-ink-2">{v.newCodesHelp}</p>
          <div className="mb-4 grid select-all grid-cols-2 gap-2 font-mono text-sm text-ink">
            {codes.map((c) => <div key={c}>{c}</div>)}
          </div>
          <button type="button" onClick={() => setCodes(null)} className={BTN}>{v.savedCodes}</button>
        </div>
      )}

      <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <strong className="block text-[14px] font-bold text-ink">{v.logoutAll}</strong>
          <span className="text-[12px] text-ink-3">{v.logoutAllHelp}</span>
        </div>
        <button type="button" onClick={logoutAll} className={`${BTN_GHOST} hover:border-crit hover:text-crit`}>{v.logoutAll}</button>
      </div>

      <TwoFactorSetupModal isOpen={setupOpen} onClose={() => setSetupOpen(false)} onSuccess={onChanged} />
    </div>
  );
}
