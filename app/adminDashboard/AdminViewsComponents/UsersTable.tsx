"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError, toList } from "@/app/lib/apiFetch";
import type { SafeUser, UserRole } from "@/app/types/api";
import { TwoFactorRequiredBanner } from "./TwoFactorRequiredBanner";

const ROLES: UserRole[] = ["ADMIN", "LENDER", "BORROWER", "BOOKKEEPER", "INSURANCE_COMPANY"];

// Tabla de usuarios compartida: /adminDashboard/users (todos, con filtro) y Borrowers (rol fijo, sin filtro).
export function UsersTable({ role }: { role?: UserRole }) {
  const { t, lang } = useSite();
  const u = t.adminUsersList;

  const [users, setUsers] = useState<SafeUser[]>([]);
  const [selectedRole, setRoleFilter] = useState<UserRole | "">("");
  const roleFilter = role ?? selectedRole;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [need2fa, setNeed2fa] = useState(false);
  // Se muestra una sola vez: al cerrar el modal se descarta.
  const [tempPw, setTempPw] = useState<{ name: string; password: string; emailSent: boolean } | null>(null);
  const [editing, setEditing] = useState<SafeUser | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editError, setEditError] = useState<{ field?: "email"; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  async function deleteUser(user: SafeUser) {
    if (!window.confirm(u.deleteConfirm.replace("{name}", user.name))) return;
    setBusyId(user.id);
    setError(null);
    try {
      // Borrado logico: el back pone deletedAt y GET /api/users ya no lo lista.
      await api(API_ROUTES.users.byId(user.id), { method: "DELETE" });
      setUsers((prev) => prev.filter((x) => x.id !== user.id));
    } catch (err) {
      if (err instanceof ApiError && err.code === "TWO_FACTOR_REQUIRED") setNeed2fa(true);
      else setError(err instanceof Error ? err.message : u.errorNetwork);
    } finally {
      setBusyId(null);
    }
  }

  function openEdit(user: SafeUser) {
    setEditing(user);
    setForm({ name: user.name, email: user.email, phone: user.phone ?? "" });
    setEditError(null);
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    // Solo los campos que cambiaron. El back no permite borrar el telefono (sin null).
    const body: Record<string, string> = {};
    if (form.name.trim() !== editing.name) body.name = form.name.trim();
    if (form.email.trim().toLowerCase() !== editing.email) body.email = form.email.trim();
    if (form.phone.trim() && form.phone.trim() !== (editing.phone ?? "")) body.phone = form.phone.trim();
    if (Object.keys(body).length === 0) return setEditing(null);

    setSaving(true);
    setEditError(null);
    try {
      const updated = await api<SafeUser>(API_ROUTES.users.byId(editing.id), {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setUsers((prev) => prev.map((x) => (x.id === editing.id ? { ...x, name: updated.name, email: updated.email, phone: updated.phone } : x)));
      setEditing(null);
    } catch (err) {
      if (err instanceof ApiError && err.code === "EMAIL_TAKEN") setEditError({ field: "email", message: u.errorEmailTaken });
      else if (err instanceof ApiError && err.code === "TWO_FACTOR_REQUIRED") setNeed2fa(true);
      else setEditError({ message: err instanceof Error ? err.message : u.errorNetwork });
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(user: SafeUser) {
    setBusyId(user.id);
    setError(null);
    try {
      let updated: SafeUser;
      if (user.isActive) {
        updated = await api<SafeUser>(API_ROUTES.users.deactivate(user.id), { method: "POST" });
      } else {
        const res = await api<{ user: SafeUser; emailSent: boolean; temporaryPassword?: string }>(
          API_ROUTES.users.activate(user.id), { method: "POST" }
        );
        updated = res.user;
        if (res.temporaryPassword) {
          setTempPw({ name: user.name, password: res.temporaryPassword, emailSent: res.emailSent });
        }
      }
      setUsers((prev) => prev.map((x) => (x.id === user.id ? { ...x, isActive: updated.isActive } : x)));
    } catch (err) {
      if (err instanceof ApiError && err.code === "TWO_FACTOR_REQUIRED") setNeed2fa(true);
      else setError(err instanceof Error ? err.message : u.errorNetwork);
    } finally {
      setBusyId(null);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        setUsers(toList<SafeUser>(await api<unknown>(API_ROUTES.users.base)));
      } catch (err) {
        if (err instanceof ApiError && err.status === 403) setError(u.errorAuth);
        else setError(err instanceof Error ? err.message : u.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [u.errorAuth, u.errorNetwork]);

  // `roles` incluye el rol adquirido de un usuario dual (lender que tambien es borrower o al reves).
  const visible = roleFilter ? users.filter((x) => (x.roles ?? [x.role]).includes(roleFilter)) : users;

  return (
    <div>
      {!role && <div className="mb-4 flex items-center gap-3">
        <label className="text-xs font-bold text-ink-3">{u.table.role}</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | "")}
          className="cursor-pointer rounded-lg border border-rule bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        >
          <option value="">{u.allRoles}</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{u.roles[r]}</option>
          ))}
        </select>
      </div>}

      {need2fa && !editing && <TwoFactorRequiredBanner onEnabled={() => setNeed2fa(false)} />}

      {error && (
        <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full min-w-[700px] border-collapse text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-5 py-4 font-bold text-ink-3">{u.table.name}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{u.table.status}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{u.table.email}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{u.table.phone}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{u.table.role}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{u.table.signedUp}</th>
              <th className="px-5 py-4 font-bold text-ink-3">{u.table.actions}</th>
            </tr>
          </thead>
          <tbody className="text-ink-2">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-ink-3">{u.loading}</td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-ink-3">{u.empty}</td>
              </tr>
            ) : (
              visible.map((user) => (
                <tr key={user.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                  <td className="px-5 py-4 font-medium text-ink">
                    <Link href={`/profile/${user.id}`} className="hover:text-accent hover:underline">
                      {user.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-[4px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${user.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                      {user.isActive ? u.active : u.inactive}
                    </span>
                  </td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4 font-mono">{user.phone || u.na}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-[4px] border border-rule bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink">
                      {(user.roles ?? [user.role]).map((r) => u.roles[r]).join(" + ")}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {new Date(user.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="flex gap-2 px-5 py-4">
                    <button
                      type="button"
                      onClick={() => openEdit(user)}
                      className="rounded-lg border border-rule px-3 py-1.5 text-xs font-bold text-ink-2 transition-colors hover:border-accent hover:text-accent"
                    >
                      {u.edit}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleActive(user)}
                      disabled={busyId === user.id}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors disabled:opacity-50 ${user.isActive ? "border-rule text-ink-2 hover:border-crit hover:text-crit" : "border-accent text-accent hover:bg-accent hover:text-accent-ink"}`}
                    >
                      {busyId === user.id ? "..." : user.isActive ? u.deactivate : u.activate}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteUser(user)}
                      disabled={busyId === user.id}
                      className="rounded-lg border border-rule px-3 py-1.5 text-xs font-bold text-ink-2 transition-colors hover:border-crit hover:text-crit disabled:opacity-50"
                    >
                      {u.delete}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <form onSubmit={saveEdit} className="w-full max-w-[440px] rounded-2xl border border-rule bg-surface p-6 shadow-2xl">
            <h2 className="mb-5 text-lg font-black text-ink">{u.editTitle}</h2>
            {need2fa && <TwoFactorRequiredBanner onEnabled={() => setNeed2fa(false)} />}
            {editError && !editError.field && (
              <div className="mb-4 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">{editError.message}</div>
            )}
            <label className="mb-1 block text-xs font-bold text-ink-3">{u.table.name}</label>
            <input
              required
              maxLength={120}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mb-4 w-full rounded-lg border border-rule bg-surface-2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
            <label className="mb-1 block text-xs font-bold text-ink-3">{u.table.email}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); if (editError?.field) setEditError(null); }}
              className={`w-full rounded-lg border bg-surface-2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent ${editError?.field === "email" ? "border-red-500" : "border-rule"}`}
            />
            {editError?.field === "email" && <span className="mt-1 block text-xs text-red-500">{editError.message}</span>}
            <label className="mb-1 mt-4 block text-xs font-bold text-ink-3">{u.table.phone}</label>
            <input
              type="tel"
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              title={u.phoneHint}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-rule bg-surface-2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
            <span className="mb-6 mt-1 block text-[10px] text-ink-3">{u.phoneHint}</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 rounded-lg border border-rule px-5 py-3 text-sm font-bold text-ink hover:bg-surface-2"
              >
                {u.cancel}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "..." : u.save}
              </button>
            </div>
          </form>
        </div>
      )}

      {tempPw && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[440px] rounded-2xl border border-rule bg-surface p-6 shadow-2xl">
            <h2 className="mb-2 text-lg font-black text-ink">{u.tempPwTitle}</h2>
            <p className="mb-4 text-sm text-ink-2">{u.tempPwDesc} <strong className="text-ink">{tempPw.name}</strong></p>
            <div className="mb-3 select-all rounded-lg border border-rule bg-surface-2 px-4 py-3 text-center font-mono text-xl tracking-widest text-ink">
              {tempPw.password}
            </div>
            <p className="mb-5 text-xs text-ink-3">{tempPw.emailSent ? u.tempPwEmailSent : u.tempPwEmailFailed}</p>
            <button
              type="button"
              onClick={() => setTempPw(null)}
              className="w-full rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90"
            >
              {u.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
