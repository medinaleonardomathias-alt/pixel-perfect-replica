import colcaImg from "@/assets/exp-colca.jpg";
import valleImg from "@/assets/exp-valle.jpg";
import arequipaImg from "@/assets/exp-arequipa.jpg";

export type Kpi = {
  label: string;
  value: string;
  detail: string;
  /** 0-100, para las barras de la Audit Bar */
  score: number;
};

export type ItineraryStop = {
  time: string;
  title: string;
  description: string;
  actor: string;
  /** Capa 1: formalidad del actor */
  verification: "Formalizado" | "En proceso" | "Comunidad registrada";
  image?: string;
};

export type Provider = {
  category: "Transporte" | "Guía" | "Alojamiento" | "Comunidad";
  name: string;
  credential: string;
  verified: boolean;
};

export type Experience = {
  slug: string;
  title: string;
  location: string;
  region: string;
  duration: string;
  summary: string;
  priceFrom: number;
  verified: boolean;
  tags: Array<"Huella baja" | "Comunitario" | "Artesanía" | "Actores verificados">;
  cover: string;
  gallery: string[];
  cardKpis: Kpi[];
  auditKpis: Kpi[];
  itinerary: Array<{ day: string; label: string; stops: ItineraryStop[] }>;
  providers: Provider[];
  poi: Array<{ name: string; note: string }>;
  status: Array<{ label: string; value: string; tone: "ok" | "warn" }>;
};

export const experiences: Experience[] = [
  {
    slug: "colca-comunitario-2d1n",
    title: "Colca comunitario 2D/1N",
    location: "Cañón del Colca, Arequipa",
    region: "Colca",
    duration: "2 días / 1 noche",
    summary:
      "Dos días con familias de Sibayo y Coporaque: caminata por andenes, cocina local y hospedaje comunitario con gestión propia.",
    priceFrom: 480,
    verified: true,
    tags: ["Huella baja", "Comunitario", "Actores verificados"],
    cover: colcaImg,
    gallery: [colcaImg, valleImg, arequipaImg],
    cardKpis: [
      { label: "Huella", value: "38 kg CO2e", detail: "por persona", score: 78 },
      { label: "Gasto en territorio", value: "72%", detail: "queda en la zona", score: 72 },
      { label: "Comunidad y artesanía", value: "61%", detail: "del itinerario", score: 61 },
    ],
    auditKpis: [
      {
        label: "Huella de movilidad",
        value: "38 kg CO2e",
        detail: "Traslados terrestres compartidos, sin vuelos internos.",
        score: 78,
      },
      {
        label: "Gasto en el territorio",
        value: "72%",
        detail: "S/ 346 de S/ 480 se pagan a proveedores locales.",
        score: 72,
      },
      {
        label: "Economía comunitaria / artesanal",
        value: "61%",
        detail: "Hospedaje, cocina y taller textil gestionados por la comunidad.",
        score: 61,
      },
      {
        label: "Presión de visita",
        value: "Baja",
        detail: "Grupos de 8 personas y horarios fuera del pico turístico.",
        score: 30,
      },
    ],
    itinerary: [
      {
        day: "Día 1",
        label: "Llegada y andenes vivos",
        stops: [
          {
            time: "06:30",
            title: "Salida desde Arequipa",
            description: "Traslado terrestre compartido con empresa autorizada, paradas en miradores.",
            actor: "Transportes Andes Sur S.A.C.",
            verification: "Formalizado",
            image: valleImg,
          },
          {
            time: "10:00",
            title: "Caminata por andenes de Coporaque",
            description: "Recorrido guiado por terrazas preincas junto a agricultores de la zona.",
            actor: "Guías Colca Vivo",
            verification: "Formalizado",
          },
          {
            time: "13:30",
            title: "Almuerzo en cocina familiar",
            description: "Menú de temporada con insumos del valle: quinua, habas y trucha local.",
            actor: "Asociación de Cocineras de Sibayo",
            verification: "Comunidad registrada",
            image: arequipaImg,
          },
          {
            time: "18:00",
            title: "Noche en hospedaje comunitario",
            description: "Casas de piedra administradas por familias, calefacción pasiva y agua caliente solar.",
            actor: "Hospedaje Rural Sibayo",
            verification: "Formalizado",
          },
        ],
      },
      {
        day: "Día 2",
        label: "Textiles y cañón",
        stops: [
          {
            time: "07:00",
            title: "Taller de teñido natural",
            description: "Tejedoras explican fibra de alpaca, tintes de cochinilla y precios justos.",
            actor: "Taller Textil Warmi",
            verification: "Comunidad registrada",
            image: arequipaImg,
          },
          {
            time: "10:30",
            title: "Mirador del cañón",
            description: "Observación de cóndores en horario de baja afluencia, aforo de 8 visitantes.",
            actor: "Guías Colca Vivo",
            verification: "Formalizado",
          },
          {
            time: "13:00",
            title: "Feria de productores",
            description: "Compra directa a productores con etiquetas de origen y precio referencial.",
            actor: "Feria Chivay Origen",
            verification: "En proceso",
          },
          {
            time: "19:00",
            title: "Retorno a Arequipa",
            description: "Traslado terrestre nocturno con la misma empresa autorizada.",
            actor: "Transportes Andes Sur S.A.C.",
            verification: "Formalizado",
          },
        ],
      },
    ],
    providers: [
      { category: "Transporte", name: "Transportes Andes Sur S.A.C.", credential: "Autorización MTC vigente", verified: true },
      { category: "Guía", name: "Guías Colca Vivo", credential: "Carné oficial de guía (3 guías)", verified: true },
      { category: "Alojamiento", name: "Hospedaje Rural Sibayo", credential: "Registro Mincetur clasificado", verified: true },
      { category: "Comunidad", name: "Taller Textil Warmi", credential: "Asociación comunal inscrita", verified: true },
      { category: "Comunidad", name: "Feria Chivay Origen", credential: "Formalización en trámite", verified: false },
    ],
    poi: [
      { name: "Sibayo", note: "Hospedaje comunitario · noche 1" },
      { name: "Coporaque", note: "Andenes y caminata guiada" },
      { name: "Mirador Cruz del Cóndor", note: "Aforo controlado" },
      { name: "Chivay", note: "Feria de productores" },
    ],
    status: [
      { label: "Clima", value: "Normal · 6°C a 19°C", tone: "ok" },
      { label: "Vías", value: "Operativas sin desvíos", tone: "ok" },
      { label: "Temporada", value: "Media · afluencia moderada", tone: "warn" },
    ],
  },
  {
    slug: "ruta-viva-valle-sagrado",
    title: "Ruta viva del Valle Sagrado",
    location: "Valle Sagrado, Cusco",
    region: "Cusco",
    duration: "1 día completo",
    summary:
      "Chinchero, Maras y Ollantaytambo desde la mirada de quienes viven ahí: chacra, sal y tejido en un solo día sin prisa.",
    priceFrom: 320,
    verified: true,
    tags: ["Comunitario", "Artesanía", "Actores verificados"],
    cover: valleImg,
    gallery: [valleImg, colcaImg, arequipaImg],
    cardKpis: [
      { label: "Huella", value: "22 kg CO2e", detail: "por persona", score: 86 },
      { label: "Gasto en territorio", value: "68%", detail: "queda en la zona", score: 68 },
      { label: "Comunidad y artesanía", value: "74%", detail: "del itinerario", score: 74 },
    ],
    auditKpis: [
      { label: "Huella de movilidad", value: "22 kg CO2e", detail: "Un solo trayecto terrestre compartido.", score: 86 },
      { label: "Gasto en el territorio", value: "68%", detail: "S/ 218 de S/ 320 a proveedores del valle.", score: 68 },
      { label: "Economía comunitaria / artesanal", value: "74%", detail: "Tres talleres familiares y una cocina comunal.", score: 74 },
      { label: "Presión de visita", value: "Media", detail: "Ollantaytambo se visita en la tarde para evitar el pico.", score: 52 },
    ],
    itinerary: [
      {
        day: "Día 1",
        label: "Chacra, sal y telar",
        stops: [
          {
            time: "07:30",
            title: "Salida de Cusco",
            description: "Minibús compartido con empresa autorizada.",
            actor: "Movilidad Valle S.A.C.",
            verification: "Formalizado",
          },
          {
            time: "09:00",
            title: "Telar de Chinchero",
            description: "Demostración de hilado y tejido con precios visibles por pieza.",
            actor: "Colectivo Textil Chinchero",
            verification: "Comunidad registrada",
            image: arequipaImg,
          },
          {
            time: "12:30",
            title: "Almuerzo de chacra",
            description: "Cocina comunal con productos cosechados esa mañana.",
            actor: "Cocina Comunal Maras",
            verification: "Comunidad registrada",
          },
          {
            time: "16:00",
            title: "Ollantaytambo sin multitud",
            description: "Visita en horario tardío junto a guía oficial de la zona.",
            actor: "Guías Valle Sagrado",
            verification: "Formalizado",
            image: valleImg,
          },
        ],
      },
    ],
    providers: [
      { category: "Transporte", name: "Movilidad Valle S.A.C.", credential: "Autorización MTC vigente", verified: true },
      { category: "Guía", name: "Guías Valle Sagrado", credential: "Carné oficial de guía (2 guías)", verified: true },
      { category: "Comunidad", name: "Colectivo Textil Chinchero", credential: "Asociación comunal inscrita", verified: true },
    ],
    poi: [
      { name: "Chinchero", note: "Taller textil" },
      { name: "Maras", note: "Cocina comunal" },
      { name: "Ollantaytambo", note: "Visita en horario tardío" },
    ],
    status: [
      { label: "Clima", value: "Normal · 8°C a 21°C", tone: "ok" },
      { label: "Vías", value: "Operativas", tone: "ok" },
      { label: "Temporada", value: "Alta · reserva con antelación", tone: "warn" },
    ],
  },
  {
    slug: "sabores-artesania-arequipa",
    title: "Sabores y artesanía en Arequipa",
    location: "Arequipa y campiña",
    region: "Arequipa",
    duration: "1 día",
    summary:
      "Picantería tradicional, mercado San Camilo y taller de sillar y alpaca con maestras artesanas de la campiña.",
    priceFrom: 260,
    verified: true,
    tags: ["Huella baja", "Artesanía", "Actores verificados"],
    cover: arequipaImg,
    gallery: [arequipaImg, colcaImg, valleImg],
    cardKpis: [
      { label: "Huella", value: "12 kg CO2e", detail: "por persona", score: 92 },
      { label: "Gasto en territorio", value: "81%", detail: "queda en la zona", score: 81 },
      { label: "Comunidad y artesanía", value: "69%", detail: "del itinerario", score: 69 },
    ],
    auditKpis: [
      { label: "Huella de movilidad", value: "12 kg CO2e", detail: "Recorrido urbano a pie y transporte local.", score: 92 },
      { label: "Gasto en el territorio", value: "81%", detail: "S/ 210 de S/ 260 a negocios familiares.", score: 81 },
      { label: "Economía comunitaria / artesanal", value: "69%", detail: "Dos talleres artesanales y una picantería histórica.", score: 69 },
      { label: "Presión de visita", value: "Baja", detail: "Grupos de 6 personas en horarios distribuidos.", score: 24 },
    ],
    itinerary: [
      {
        day: "Día 1",
        label: "Mercado, picantería y taller",
        stops: [
          {
            time: "09:00",
            title: "Mercado San Camilo",
            description: "Recorrido de insumos con explicación de origen y precios.",
            actor: "Guías Arequipa Sabor",
            verification: "Formalizado",
          },
          {
            time: "12:00",
            title: "Picantería tradicional",
            description: "Almuerzo en picantería reconocida como patrimonio culinario.",
            actor: "Picantería La Nueva Palomino",
            verification: "Formalizado",
            image: arequipaImg,
          },
          {
            time: "15:30",
            title: "Taller de alpaca y sillar",
            description: "Trabajo con maestras artesanas y compra directa opcional.",
            actor: "Taller Campiña Viva",
            verification: "Comunidad registrada",
          },
        ],
      },
    ],
    providers: [
      { category: "Guía", name: "Guías Arequipa Sabor", credential: "Carné oficial de guía (2 guías)", verified: true },
      { category: "Alojamiento", name: "Casa Sillar", credential: "Registro Mincetur clasificado", verified: true },
      { category: "Comunidad", name: "Taller Campiña Viva", credential: "Asociación artesanal inscrita", verified: true },
    ],
    poi: [
      { name: "Mercado San Camilo", note: "Insumos y origen" },
      { name: "Yanahuara", note: "Picantería" },
      { name: "Campiña de Sachaca", note: "Taller artesanal" },
    ],
    status: [
      { label: "Clima", value: "Normal · 10°C a 23°C", tone: "ok" },
      { label: "Vías", value: "Operativas", tone: "ok" },
      { label: "Temporada", value: "Baja · buena disponibilidad", tone: "ok" },
    ],
  },
];

export const getExperience = (slug: string) => experiences.find((e) => e.slug === slug);

export const destinations = ["Cusco", "Arequipa", "Colca", "Puno"] as const;

export const quickFilters = ["Huella baja", "Comunitario", "Artesanía", "Actores verificados"] as const;
