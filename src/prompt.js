/* ============================================================
   prompt.js — montagem do prompt
   ------------------------------------------------------------
   O prompt é montado em partes nomeadas (assunto, material,
   detalhes, atributos, cena) e só no fim é formatado para o
   modelo escolhido. A ordem segue a anatomia do exemplo de
   referência:

   assunto → "the X form made of" material → detalhes →
   atributos → cor → luz → fundo → estilo → composição
   ============================================================ */

export const MODELOS = [
  { id: "grok", nome: "Grok" },
  { id: "midjourney", nome: "Midjourney" },
  { id: "gpt", nome: "GPT Image" },
  { id: "flux", nome: "Flux / SD" },
  { id: "firefly", nome: "Firefly" },
];

export const PROPORCOES = ["1:1", "4:5", "3:2", "16:9", "9:16"];

export const ASSUNTOS = [
  { id: "pasta", nome: "Pasta", texto: "a folder icon shaped as a modern file folder", forma: "folder" },
  { id: "esfera", nome: "Esfera", texto: "a perfect sphere", forma: "sphere" },
  { id: "letra", nome: "Letra", texto: "the capital letter A as a bold 3D typographic form", forma: "letter" },
  { id: "logo", nome: "Símbolo", texto: "an abstract minimalist logo symbol", forma: "symbol" },
  { id: "app", nome: "Ícone de app", texto: "a rounded square app icon", forma: "icon" },
  { id: "blob", nome: "Forma orgânica", texto: "an abstract organic sculptural blob", forma: "blob" },
  { id: "cubo", nome: "Cubo", texto: "a cube with softly rounded edges", forma: "cube" },
  { id: "frasco", nome: "Frasco", texto: "a minimalist cosmetic bottle", forma: "bottle" },
];

export const LUZES = [
  { id: "auto", nome: "Sugerida pelo material" },
  { id: "estudio", nome: "Estúdio minimalista", txt: "minimalist studio lighting" },
  { id: "softbox", nome: "Softbox difusa", txt: "large softbox lighting with soft diffused shadows" },
  { id: "rasante", nome: "Rasante", txt: "low-angle raking light emphasizing the surface relief" },
  { id: "janela", nome: "Luz de janela", txt: "soft natural window light" },
  { id: "sol", nome: "Sol a pino", txt: "bright overhead sunlight" },
  { id: "golden", nome: "Golden hour", txt: "warm golden hour sunlight with long soft shadows" },
  { id: "contraluz", nome: "Contraluz", txt: "dramatic rim lighting from behind with glowing edges" },
  { id: "lowkey", nome: "Low-key dramática", txt: "low-key dramatic lighting, single spotlight, deep shadows" },
  { id: "neon", nome: "Neon", txt: "colored neon gel lighting with magenta and cyan accents" },
];

export const FUNDOS = [
  { id: "auto", nome: "Sugerido pelo material" },
  { id: "claro", nome: "Liso claro", txt: "isolated on a clean plain background" },
  { id: "escuro", nome: "Liso escuro", txt: "isolated on a deep matte black background" },
  { id: "gradiente", nome: "Degradê suave", txt: "on a soft seamless gradient backdrop" },
  { id: "pastel", nome: "Pastel", txt: "on a soft pastel colored backdrop" },
  { id: "recorte", nome: "Branco para recorte", txt: "isolated on a pure white background, easy to cut out" },
];

export const ESTILOS = [
  { id: "render", nome: "Render 3D ultrarrealista", txt: "ultra realistic high-detail 3D render" },
  { id: "produto", nome: "Foto de produto", txt: "professional product photography, 100mm macro lens" },
  { id: "macro", nome: "Macrofotografia", txt: "extreme macro photography, shallow depth of field" },
  { id: "octane", nome: "Octane / ray tracing", txt: "octane render, physically based rendering, ray-traced reflections" },
  { id: "icone", nome: "Ícone 3D estilizado", txt: "stylized 3D icon render, clean and minimal" },
];

export const COMPOSICOES = [
  { id: "centro", nome: "Centralizada", txt: "object-centered composition" },
  { id: "tresquartos", nome: "Três quartos", txt: "three-quarter perspective view" },
  { id: "frontal", nome: "Frontal", txt: "straight-on front view" },
  { id: "close", nome: "Close", txt: "tight close-up filling the frame" },
  { id: "flutuando", nome: "Flutuando", txt: "floating in mid-air with a soft contact shadow below" },
];

/* Cada atributo vira uma frase por faixa. Faixa sem frase (null) some do prompt. */
export const ATRIBUTOS = [
  {
    id: "acabamento", nome: "Acabamento", min: "fosco", max: "espelhado",
    faixas: [
      [15, "fully matte finish with no reflections"],
      [40, "satin finish with a soft diffuse sheen"],
      [65, "semi-gloss finish"],
      [88, "glossy finish with crisp specular highlights"],
      [101, "polished glossy surface with mirror-like reflections"],
    ],
  },
  {
    id: "desgaste", nome: "Desgaste", min: "novo", max: "envelhecido",
    faixas: [
      [10, "pristine flawless condition"],
      [35, "subtle signs of use, faint micro-scratches"],
      [65, "visibly worn with scuffs, scratches and patina"],
      [101, "heavily weathered and aged, distressed, cracked and stained"],
    ],
  },
  {
    id: "detalhe", nome: "Microdetalhe", min: "liso", max: "intenso",
    faixas: [
      [25, "clean smooth surface with minimal texture"],
      [60, "fine surface detail"],
      [85, "rich tactile surface detail"],
      [101, "intricate micro-detail with every grain and pore visible"],
    ],
  },
  {
    id: "iridescencia", nome: "Iridescência", min: "nenhuma", max: "holográfica",
    faixas: [
      [1, null],
      [30, "faint iridescent sheen"],
      [60, "subtle iridescent and pearlescent reflections"],
      [85, "vivid iridescent and pearlescent reflections"],
      [101, "intense holographic rainbow iridescence with prismatic dispersion"],
    ],
  },
];

export const fraseAtributo = (attr, v) => attr.faixas.find(([lim]) => v < lim)[1];

const NEG_BASE = ["blurry", "low resolution", "watermark", "text", "distorted"];
const achar = (lista, id) => lista.find((x) => x.id === id) || lista[1] || lista[0];

/* ------------------------------------------------------------------ */
/* Partes                                                              */
/* ------------------------------------------------------------------ */
export function montarPartes(cfg, mat, va) {
  const tile = cfg.modo === "superficie";
  const atributos = ATRIBUTOS.map((a) => fraseAtributo(a, cfg.attrs[a.id])).filter(Boolean);
  const preset = ASSUNTOS.find((a) => a.texto === cfg.assunto.trim());
  const forma = preset ? preset.forma : "object";
  const assunto = cfg.assunto.trim() || "an abstract object";

  const luz = cfg.luz === "auto"
    ? tile ? "flat even diffuse lighting, no cast shadows" : achar(LUZES, mat.luz).txt
    : achar(LUZES, cfg.luz).txt;

  return {
    tile,
    assunto,
    forma,
    material: va.material,
    detalhes: va.detalhes,
    atributos,
    cor: cfg.cor.trim() ? `dominant color ${cfg.cor.trim()}` : null,
    extra: cfg.extra.trim() || null,
    luz,
    fundo: tile ? null : (cfg.fundo === "auto" ? achar(FUNDOS, mat.fundo) : achar(FUNDOS, cfg.fundo)).txt,
    estilo: tile ? "high-resolution PBR texture, 4K, photoscanned realism" : achar(ESTILOS, cfg.estilo).txt,
    composicao: tile
      ? "top-down orthographic view, seamless tileable edge-to-edge pattern, no perspective, no objects"
      : achar(COMPOSICOES, cfg.composicao).txt,
    proporcao: cfg.proporcao,
    /* na textura contínua, repetir é o objetivo — esse negativo sairia contra */
    negativo: [...mat.neg.filter((n) => !(tile && /repetitive/.test(n))), ...NEG_BASE],
  };
}

/* ------------------------------------------------------------------ */
/* Formatação por modelo                                               */
/* ------------------------------------------------------------------ */
const NOME_AR = { "1:1": "square", "4:5": "vertical", "9:16": "vertical", "3:2": "horizontal", "16:9": "widescreen" };
const frasePropocao = (ar) => `${NOME_AR[ar]} ${ar} aspect ratio`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* lista corrida, na ordem da anatomia */
function lista(p) {
  const abertura = p.tile
    ? `seamless tileable texture of ${p.material}`
    : `${p.assunto}, the ${p.forma} form made of ${p.material}`;
  return [abertura, ...p.detalhes, ...p.atributos, p.cor, p.extra, p.luz, p.fundo, p.estilo, p.composicao].filter(Boolean);
}

/* frases completas, para modelos que leem linguagem natural */
function natural(p, comProporcao) {
  const abertura = p.tile
    ? `${cap(p.estilo)}: a seamless tileable texture of ${p.material}.`
    : `${cap(p.estilo)} of ${p.assunto}, the ${p.forma} form made of ${p.material}.`;
  const frases = [
    abertura,
    `${cap(p.detalhes.join(", "))}.`,
    p.atributos.length ? `${cap(p.atributos.join(", "))}.` : null,
    p.cor ? `${cap(p.cor)}.` : null,
    p.extra ? `${cap(p.extra.replace(/\.$/, ""))}.` : null,
    `${cap(p.luz)}${p.fundo ? `, ${p.fundo}` : ""}.`,
    `${cap(p.composicao)}${comProporcao ? `, ${frasePropocao(p.proporcao)}` : ""}.`,
  ];
  return frases.filter(Boolean).join(" ");
}

export function formatar(p, modelo, usarNegativo) {
  const neg = usarNegativo ? p.negativo : [];
  switch (modelo) {
    case "midjourney": {
      const params = [`--ar ${p.proporcao}`, "--style raw", "--v 7"];
      if (p.tile) params.push("--tile");
      if (neg.length) params.push(`--no ${neg.join(", ")}`);
      return { texto: `${lista(p).join(", ")} ${params.join(" ")}`, negativo: null };
    }
    case "gpt":
      return {
        texto: natural(p, true) + (neg.length ? ` Avoid: ${neg.join(", ")}.` : ""),
        negativo: null,
      };
    case "firefly":
      /* a proporção do Firefly é escolhida na interface dele, não no texto */
      return {
        texto: natural(p, false) + (neg.length ? ` Avoid: ${neg.join(", ")}.` : ""),
        negativo: null,
      };
    case "flux":
      return {
        texto: [...lista(p), frasePropocao(p.proporcao)].join(", "),
        negativo: neg.length ? neg.join(", ") : null,
      };
    default: /* grok — mesmo formato do exemplo: caixa alta entre chaves */
      return {
        texto: `{${[...lista(p), frasePropocao(p.proporcao)].join(", ").toUpperCase()}}`,
        negativo: null,
      };
  }
}

export const MODELO_ACEITA_NEGATIVO = { grok: false, midjourney: true, gpt: true, flux: true, firefly: true };
