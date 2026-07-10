"use client";

import { useEffect, useRef, useState } from "react";
import { Plug, GasPump, Sun } from "@phosphor-icons/react";
import { getRecommendation, type EquipmentType } from "@/lib/simulator";
import { useSimulator } from "@/components/marketing/SimulatorContext";

const EQUIPMENT_OPTIONS: { key: EquipmentType; label: string; icon: typeof Plug }[] = [
  { key: "cabine", label: "Cabine HT/BT", icon: Plug },
  { key: "groupe", label: "Groupe Élec", icon: GasPump },
  { key: "solaire", label: "Solaire Hybride", icon: Sun },
];

const LOCATIONS = ["Kinshasa", "Lubumbashi", "Kolwezi", "Site minier isolé", "Autre province"];

export function Simulator() {
  const { equipment, setEquipment, powerKva, setPowerKva, location, setLocation } =
    useSimulator();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(() =>
    getRecommendation(equipment, powerKva, location)
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setRecommendation(getRecommendation(equipment, powerKva, location));
      setLoading(false);
    }, 550);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [equipment, powerKva, location]);

  return (
    <section id="simulateur" className="bg-navy-950 py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            <span className="h-[7px] w-[7px] rounded-full bg-gradient-accent shadow-[0_0_12px_#ff5a1f]" />
            Outil interactif
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Simulateur de configuration énergétique
          </h2>
          <p className="mt-3 text-base text-text-mute">
            Estimez en quelques secondes la solution la mieux adaptée à votre besoin en puissance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 rounded-[28px] border border-border-soft bg-navy-800 p-7 md:grid-cols-2 md:p-12">
          <div>
            <div className="mb-8">
              <label className="mb-4 block text-sm font-semibold">1. Type d&apos;équipement</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {EQUIPMENT_OPTIONS.map((opt) => {
                  const active = opt.key === equipment;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setEquipment(opt.key)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border px-2 py-4.5 text-sm font-medium transition-all ${
                        active
                          ? "border-accent-500 bg-gradient-to-b from-accent-500/[0.16] to-accent-500/[0.04] text-white shadow-[0_8px_20px_rgba(255,90,31,0.2)]"
                          : "border-border-soft bg-navy-700 text-text-mute hover:border-accent-500/40 hover:text-text-main"
                      }`}
                    >
                      <opt.icon className="h-6 w-6" weight={active ? "fill" : "regular"} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-8">
              <label className="mb-4 block text-sm font-semibold">2. Puissance requise</label>
              <div className="flex items-center gap-5">
                <input
                  type="range"
                  min={50}
                  max={2500}
                  step={10}
                  value={powerKva}
                  onChange={(e) => setPowerKva(Number(e.target.value))}
                  className="h-1.5 flex-1 cursor-pointer appearance-none rounded bg-navy-600 accent-accent-500"
                />
                <div className="min-w-[96px] text-right font-heading text-2xl font-bold text-accent-500">
                  {powerKva} <small className="text-sm font-medium text-text-faint">kVA</small>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-text-faint">
                <span>50 kVA</span>
                <span>2500 kVA</span>
              </div>
            </div>

            <div>
              <label className="mb-4 block text-sm font-semibold">3. Localisation</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-border-soft bg-navy-700 px-4 py-3.5 text-[0.95rem] text-text-main focus:border-accent-500 focus:outline-none"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative min-h-[420px] rounded-2xl border border-accent-500/25 bg-gradient-to-b from-accent-500/[0.08] to-navy-700 p-9">
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-navy-700">
                <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-accent-500/15 border-t-accent-500" />
                <p className="text-sm text-text-mute">Calcul de la préconisation...</p>
              </div>
            )}

            <div className={`flex h-full flex-col justify-center transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}>
              <span className="mb-3.5 text-xs font-bold uppercase tracking-[0.08em] text-accent-500">
                Préconisation recommandée
              </span>
              <h3 className="mb-3.5 font-heading text-2xl font-bold">{recommendation.title}</h3>
              <p className="text-text-mute">{recommendation.description}</p>

              <ul className="my-6 border-t border-border-soft pt-5">
                {[
                  ["Puissance", `${powerKva} kVA`],
                  ["Équipement", EQUIPMENT_OPTIONS.find((o) => o.key === equipment)?.label ?? ""],
                  ["Zone", location],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex justify-between border-b border-dashed border-border-soft py-2 text-[0.92rem]"
                  >
                    <span className="text-text-faint">{label}</span>
                    <strong>{value}</strong>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,60,40,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,60,40,0.5)]"
              >
                Valider et Demander le Devis à Exaucé Matadi
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
