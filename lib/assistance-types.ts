export const ASSISTANCE_TYPES = [
  { value: "infrastructure", label: "Infrastructures & Réseaux (cabines, centrales, lignes)" },
  { value: "fourniture", label: "Solutions & Fournitures (énergie, groupes électrogènes)" },
  { value: "transition", label: "Transition & Efficacité (audit, VE, rénovation)" },
  { value: "minier", label: "Alimentation site minier / industriel isolé" },
  { value: "autre", label: "Autre demande" },
] as const;

export const ASSISTANCE_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  ASSISTANCE_TYPES.map((t) => [t.value, t.label])
);
