"use client";
import React, { createContext, useContext, useState } from "react";

interface TourContextProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  endDemo: () => void;
  restartDemo: () => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export function DemoTourProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const endDemo = () => setCurrentStep(-1); // -1 indica que el tour terminó
  const restartDemo = () => setCurrentStep(0);
  
  return (
    <TourContext.Provider value={{ currentStep, nextStep, prevStep, endDemo, restartDemo }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) throw new Error("useTour debe usarse dentro de un DemoTourProvider");
  return context;
}