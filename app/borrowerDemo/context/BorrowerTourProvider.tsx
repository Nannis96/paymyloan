"use client";
import React, { createContext, useContext, useState } from "react";

interface TourContextProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  endDemo: () => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export function BorrowerTourProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const endDemo = () => setCurrentStep(-1);

  return (
    <TourContext.Provider value={{ currentStep, nextStep, prevStep, endDemo }}>
      {children}
    </TourContext.Provider>
  );
}

export function useBorrowerTour() {
  const context = useContext(TourContext);
  if (!context) throw new Error("useBorrowerTour debe usarse dentro de un BorrowerTourProvider");
  return context;
}