"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { EQUIPMENT_LABELS, type EquipmentType } from "@/lib/simulator";

interface SimulatorState {
  equipment: EquipmentType;
  setEquipment: (e: EquipmentType) => void;
  powerKva: number;
  setPowerKva: (p: number) => void;
  location: string;
  setLocation: (l: string) => void;
  prefillMessage: string;
}

const SimulatorCtx = createContext<SimulatorState | null>(null);

export function SimulatorProvider({
  children,
  defaultLocation = "Kinshasa",
}: {
  children: ReactNode;
  defaultLocation?: string;
}) {
  const [equipment, setEquipment] = useState<EquipmentType>("cabine");
  const [powerKva, setPowerKva] = useState(250);
  const [location, setLocation] = useState(defaultLocation);

  const prefillMessage = useMemo(
    () =>
      `Bonjour, je souhaite une étude pour : ${EQUIPMENT_LABELS[equipment]}, ${powerKva} kVA, Localisation : ${location}.`,
    [equipment, powerKva, location]
  );

  return (
    <SimulatorCtx.Provider
      value={{ equipment, setEquipment, powerKva, setPowerKva, location, setLocation, prefillMessage }}
    >
      {children}
    </SimulatorCtx.Provider>
  );
}

export function useSimulator() {
  const ctx = useContext(SimulatorCtx);
  if (!ctx) throw new Error("useSimulator must be used within SimulatorProvider");
  return ctx;
}
