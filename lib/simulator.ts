export type EquipmentType = "cabine" | "groupe" | "solaire";

export const EQUIPMENT_LABELS: Record<EquipmentType, string> = {
  cabine: "Cabine HT/BT",
  groupe: "Groupe Électrogène",
  solaire: "Solaire Hybride",
};

export interface Recommendation {
  title: string;
  description: string;
}

export function getRecommendation(
  equipment: EquipmentType,
  powerKva: number,
  location: string
): Recommendation {
  let title = "";
  let description = "";

  if (equipment === "cabine") {
    if (powerKva <= 630) {
      title = "Poste de Transformation Compact Préfabriqué";
      description = `Pour une puissance de ${powerKva} kVA à ${location}, nous recommandons un poste compact préfabriqué : installation rapide, encombrement réduit et sécurité optimale pour vos locaux industriels ou tertiaires.`;
    } else if (powerKva <= 1250) {
      title = "Cabine Haute Tension Maçonnée Modulaire";
      description = `À ${powerKva} kVA, une cabine HT maçonnée modulaire s'impose pour sécuriser la transformation et la distribution sur votre site de ${location}, avec une capacité d'extension future.`;
    } else {
      title = "Sous-Station HT/BT Industrielle sur Mesure";
      description = `Une puissance de ${powerKva} kVA nécessite une sous-station industrielle sur mesure, conçue pour alimenter des installations lourdes à ${location} avec redondance et supervision.`;
    }
  } else if (equipment === "groupe") {
    if (powerKva <= 250) {
      title = "Groupe Électrogène Insonorisé Compact";
      description = `Pour ${powerKva} kVA à ${location}, un groupe électrogène insonorisé compact assure une alimentation de secours fiable et silencieuse pour vos bâtiments et bureaux.`;
    } else if (powerKva <= 1000) {
      title = "Centrale Électrogène Containerisée";
      description = `À ${powerKva} kVA, une centrale électrogène containerisée offre une production robuste et mobile, idéale pour sécuriser l'activité continue de votre site à ${location}.`;
    } else {
      title = "Centrale de Production Thermique Multi-Groupes";
      description = `Pour ${powerKva} kVA, une centrale thermique multi-groupes en cascade garantit une production continue et redondante pour les besoins industriels lourds de ${location}.`;
    }
  } else {
    if (powerKva <= 250) {
      title = "Kit Solaire Hybride Autonome avec Stockage";
      description = `Pour ${powerKva} kVA à ${location}, un kit solaire hybride avec batteries offre une autonomie renforcée et une réduction immédiate de votre facture énergétique.`;
    } else if (powerKva <= 1000) {
      title = "Centrale Solaire Hybride avec Batteries Lithium";
      description = `À ${powerKva} kVA, une centrale solaire hybride couplée à un stockage lithium optimise le mix production/consommation pour votre site de ${location}.`;
    } else {
      title = "Ferme Solaire Hybride Industrielle Haute Capacité";
      description = `Pour ${powerKva} kVA, une ferme solaire hybride industrielle couplée à des groupes d'appoint sécurise une alimentation continue et durable à ${location}.`;
    }
  }

  if (location === "Site minier isolé") {
    description += ` Une architecture hybride avec stockage est intégrée afin de garantir la continuité d'exploitation en site isolé.`;
  }

  return { title, description };
}
