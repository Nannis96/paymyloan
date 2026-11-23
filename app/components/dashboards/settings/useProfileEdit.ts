"use client";
import { useState } from "react";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";

type U = { name?: string; email?: string; phone?: string | null };

// Edicion inline de nombre/telefono via PATCH /api/auth/me.
// ponytail: email queda fuera (el back exige currentPassword y revoca sesiones).
export function useProfileEdit<T extends U>(user: T | null, setUser: (u: T) => void) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const start = () => {
    setForm({ name: user?.name || "", phone: user?.phone || "" });
    setError("");
    setEditing(true);
  };

  const save = async () => {
    const body: Record<string, string> = {};
    if (form.name.trim() && form.name.trim() !== user?.name) body.name = form.name.trim();
    if (form.phone.trim() && form.phone.trim() !== user?.phone) body.phone = form.phone.trim();
    if (!Object.keys(body).length) return setEditing(false);
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch(API_ROUTES.auth.me, { method: "PATCH", body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json?.error?.message || "Error");
      setUser({ ...user, ...(json.data.user ?? body) } as T);
      setEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  };

  return { editing, form, setForm, saving, error, start, save, cancel: () => setEditing(false) };
}
