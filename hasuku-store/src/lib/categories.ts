export interface Category {
  slug: string;
  icon: string;
  name: { de: string; en: string };
  desc: { de: string; en: string };
}

export const CATEGORIES: Category[] = [
  {
    slug: "kueche",
    icon: "🍳",
    name: { de: "Küche", en: "Kitchen" },
    desc: { de: "Brotdosen & mehr", en: "Lunch boxes & more" },
  },
  {
    slug: "haushalt",
    icon: "🏠",
    name: { de: "Haushalt", en: "Household" },
    desc: { de: "Couch Bar & Accessoires", en: "Couch bar & accessories" },
  },
];

/** Helper to get localized category name */
export function getCategoryName(cat: Category, locale: string): string {
  return cat.name[locale as "de" | "en"] || cat.name.de;
}

/** Helper to get localized category description */
export function getCategoryDesc(cat: Category, locale: string): string {
  return cat.desc[locale as "de" | "en"] || cat.desc.de;
}
