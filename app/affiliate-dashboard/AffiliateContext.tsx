"use client";
import { createContext, useContext } from "react";
import { useAffiliate } from "@/app/lib/affiliates";

export const AffiliateCtx = createContext<ReturnType<typeof useAffiliate> | null>(null);
export const useAff = () => {
  const c = useContext(AffiliateCtx);
  if (!c) throw new Error("useAff fuera de AffiliateCtx");
  return c;
};
