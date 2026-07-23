import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Categories ────────────────────────────────────────
  const kueche = await prisma.category.upsert({
    where: { slug: "kueche" },
    update: {},
    create: { name: "Küche", slug: "kueche", sortOrder: 1 },
  });

  const buero = await prisma.category.upsert({
    where: { slug: "buero" },
    update: {},
    create: { name: "Büro", slug: "buero", sortOrder: 2 },
  });

  const haushalt = await prisma.category.upsert({
    where: { slug: "haushalt" },
    update: {},
    create: { name: "Haushalt", slug: "haushalt", sortOrder: 3 },
  });

  console.log("✅ Categories created");

  // ─── Products ──────────────────────────────────────────
  const products = [
    {
      name: "Laptop-Ständer Aluminium",
      slug: "laptop-staender-aluminium",
      description:
        "Höhenverstellbarer Laptop-Ständer aus hochwertigem Aluminium. Ergonomisches Design für bessere Haltung am Arbeitsplatz. Kompatibel mit Laptops von 10 bis 17 Zoll.",
      basePrice: 29.99,
      imageUrl: "/images/products/laptop-staender.jpg",
      categoryId: buero.id,
      featured: true,
      variants: [
        { sku: "LS-ALU-SIL-001", color: "Silber", colorHex: "#C0C0C0", stockQty: 25, size: null },
        { sku: "LS-ALU-BLK-001", color: "Schwarz", colorHex: "#1a1a2e", stockQty: 30, size: null },
      ],
    },
    {
      name: "Küchenmesser-Set 6-teilig",
      slug: "kuechenmesser-set-6",
      description:
        "Professionelles 6-teiliges Küchenmesser-Set aus rostfreiem Stahl mit ergonomischem Griff. Inkl. Schneidebrett und Messerschärfer.",
      basePrice: 49.99,
      imageUrl: "/images/products/kuechenmesser-set.jpg",
      categoryId: kueche.id,
      featured: true,
      variants: [
        { sku: "KM-SET-6-BLK-001", color: "Schwarz", colorHex: "#1a1a2e", stockQty: 15, size: null },
        { sku: "KM-SET-6-WHT-001", color: "Weiß", colorHex: "#ffffff", stockQty: 10, size: null },
      ],
    },
    {
      name: "Schreibtisch-Organizer",
      slug: "schreibtisch-organizer",
      description:
        "Modularer Schreibtisch-Organizer aus Bambus. Hält Stifte, Notizen und Bürobedarf ordentlich. Natürliches Material, modernes Design.",
      basePrice: 19.99,
      imageUrl: "/images/products/schreibtisch-organizer.jpg",
      categoryId: buero.id,
      featured: false,
      variants: [
        { sku: "SO-BAM-NAT-001", color: "Naturholz", colorHex: "#d4a574", stockQty: 40, size: null },
      ],
    },
    {
      name: "Wasserkocher Glasperle",
      slug: "wasserkocher-glasperle",
      description:
        "Eleganter Wasserkocher aus Glas mit LED-Beleuchtung. 1,7 Liter Fassungsvermögen, 2400W Leistung. Automatische Abschaltung.",
      basePrice: 34.99,
      imageUrl: "/images/products/wasserkocher.jpg",
      categoryId: kueche.id,
      featured: true,
      variants: [
        { sku: "WK-GLS-CLR-001", color: "Klar", colorHex: "#e0e0e0", stockQty: 20, size: null },
        { sku: "WK-GLS-BLK-001", color: "Schwarz", colorHex: "#1a1a2e", stockQty: 18, size: null },
      ],
    },
    {
      name: "Büro-Stuhl Ergonomisch",
      slug: "buero-stuhl-ergonomisch",
      description:
        "Ergonomischer Bürostuhl mit höhenverstellbarer Lehne, Armstützen und Lendenwirbelstütze. Belastbar bis 120 kg.",
      basePrice: 89.99,
      imageUrl: "/images/products/buero-stuhl.jpg",
      categoryId: buero.id,
      featured: false,
      variants: [
        { sku: "BS-ERG-BLK-001", color: "Schwarz", colorHex: "#1a1a2e", stockQty: 12, size: null },
        { sku: "BS-ERG-GRY-001", color: "Grau", colorHex: "#808080", stockQty: 8, size: null },
      ],
    },
    {
      name: "Luftreiniger HEPA",
      slug: "luftreiniger-hepa",
      description:
        "Leistungsstarker Luftreiniger mit HEPA-Filter. Ideal für Räume bis 30 m². Ruhiger Betrieb, 3 Stufen.",
      basePrice: 59.99,
      imageUrl: "/images/products/luftreiniger.jpg",
      categoryId: haushalt.id,
      featured: true,
      variants: [
        { sku: "LR-HEPA-WHT-001", color: "Weiß", colorHex: "#ffffff", stockQty: 14, size: null },
      ],
    },
    {
      name: "Spardose Glas mit Zähler",
      slug: "spardose-glas-zaehler",
      description:
        "Transparente Spardose aus Glas mit digitaler Anzeige des eingeworfenen Betrags. Perfekt als Geschenk oder zum Sparen.",
      basePrice: 14.99,
      imageUrl: "/images/products/spardose.jpg",
      categoryId: haushalt.id,
      featured: false,
      variants: [
        { sku: "SG-GLS-CLR-001", color: "Klar", colorHex: "#e0e0e0", stockQty: 50, size: null },
      ],
    },
    {
      name: "Mäusepad XXL Gaming",
      slug: "maeusepad-xxl-gaming",
      description:
        "Extra großer Gaming-Mauspad (900x400mm). Anti-Rutsch-Rückseite, präzise Oberfläche, stochfester Rand.",
      basePrice: 16.99,
      imageUrl: "/images/products/maeusepad.jpg",
      categoryId: buero.id,
      featured: false,
      variants: [
        { sku: "MP-XXL-BLK-001", color: "Schwarz", colorHex: "#1a1a2e", stockQty: 35, size: null },
        { sku: "MP-XXL-GRY-001", color: "Grau", colorHex: "#808080", stockQty: 20, size: null },
      ],
    },
  ];

  for (const product of products) {
    const { variants, ...productData } = product;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...productData,
        variants: {
          create: variants,
        },
      },
    });
  }

  console.log(`✅ ${products.length} products created`);

  // ─── Settings ──────────────────────────────────────────
  const settings = [
    { key: "vat_rate", value: "19" },
    { key: "shipping_flat_rate", value: "4.99" },
    { key: "free_shipping_threshold", value: "30" },
    { key: "store_name", value: "HASUKU" },
    { key: "store_email", value: "info@hasuku.de" },
    { key: "company_name", value: "NI Intellect UG" },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log("✅ Settings created");

  console.log("🎉 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
