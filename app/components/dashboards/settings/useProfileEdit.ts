"use client";
import { useState } from "react";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";

type U = { name?: string; email?: string; phone?: string | null };

// Edicion inline de nombre/telefono via PATCH /api/auth/me.
// Email exige currentPassword (el back revoca los refresh tokens); contraseña va por /borrowers/me/password.
export function useProfileEdit<T extends U>(user: T | null, setUser: (u: T) => void) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", currentPassword: "", newPassword: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const start = () => {
    setForm({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "", currentPassword: "", newPassword: "" });
    setError("");
    setEditing(true);
  };

  const save = async () => {
    const body: Record<string, string> = {};
    if (form.name.trim() && form.name.trim() !== user?.name) body.name = form.name.trim();
    if (form.phone.trim() && form.phone.trim() !== user?.phone) body.phone = form.phone.trim();
    if (form.email.trim() && form.email.trim() !== user?.email) body.email = form.email.trim();
    const pwd = form.newPassword;
    if ((body.email || pwd) && !form.currentPassword) return setError("Current password is required");
    if (body.email) body.currentPassword = form.currentPassword;
    if (!Object.keys(body).length && !pwd) return setEditing(false);
    setSaving(true);
    setError("");
    try {
      let next = user;
      if (Object.keys(body).length) {
        const res = await apiFetch(API_ROUTES.auth.me, { method: "PATCH", body: JSON.stringify(body) });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json?.error?.message || "Error");
        next = { ...user, ...(json.data.user ?? body) } as T;
        delete (next as U & { currentPassword?: string }).currentPassword;
        setUser(next as T);
      }
      if (pwd) {
        const res = await apiFetch(API_ROUTES.borrowers.mePassword, {
          method: "POST",
          body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: pwd }),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json?.error?.message || "Error");
      }
      setEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  };

  return { editing, form, setForm, saving, error, start, save, cancel: () => setEditing(false) };
}
