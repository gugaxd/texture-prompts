/* ============================================================
   biblioteca.js — materiais, variações e fragmentos de prompt
   ------------------------------------------------------------
   Cada material tem variações. Cada variação traz:
   - material: o núcleo da frase ("flowing liquid glass, ...")
   - detalhes: propriedades físicas e visuais, sem falar de
     acabamento, desgaste ou iridescência — isso vem dos atributos
   - attrs: valores iniciais dos quatro atributos (0–100)
   - amostra: parâmetros do renderizador procedural (amostras.js)

   Os prompts ficam em inglês: é o idioma em que os modelos de
   imagem respondem com mais precisão. A interface é em português.
   ============================================================ */

export const CATEGORIAS = [
  { id: "todas", nome: "Todas" },
  { id: "transparente", nome: "Transparentes" },
  { id: "metal", nome: "Metais" },
  { id: "natural", nome: "Naturais" },
  { id: "fibra", nome: "Fibras" },
  { id: "construcao", nome: "Construção" },
  { id: "sintetico", nome: "Sintéticos" },
];

const ATTRS = { acabamento: 50, desgaste: 5, detalhe: 55, iridescencia: 0 };

export const MATERIAIS = [
  /* ---------------------------------------------------------------- */
  {
    id: "vidro", nome: "Vidro", cat: "transparente", destaque: true,
    luz: "estudio", fundo: "claro",
    attrs: { acabamento: 95, desgaste: 0, detalhe: 45, iridescencia: 0 },
    neg: ["opaque", "plastic look", "cloudy", "fingerprints", "dirty smudges"],
    variantes: [
      {
        id: "liquido", nome: "Líquido iridescente",
        material: "flowing liquid glass, transparent and translucent glass material",
        detalhes: ["smooth organic curves", "fluid glass deformation", "high refraction", "internal light distortion", "glass thickness visible"],
        attrs: { iridescencia: 45 },
        amostra: { tipo: "esfera", shader: "vidro", tint: [1, 1, 1], iris: 0.75, caustica: 0.55 },
      },
      {
        id: "cristal", nome: "Cristal",
        material: "crystal-clear optical glass, flawless transparency",
        detalhes: ["sharp refraction", "clean light caustics", "crisp beveled edges catching light", "subtle internal reflections", "visible glass thickness"],
        amostra: { tipo: "esfera", shader: "vidro", tint: [0.97, 0.99, 1], iris: 0.08, caustica: 0.6 },
      },
      {
        id: "jateado", nome: "Jateado",
        material: "frosted sandblasted glass, translucent milky material",
        detalhes: ["soft diffused light transmission", "blurred refraction", "velvety fine-grain surface", "gentle inner glow", "softened edges"],
        attrs: { acabamento: 30, detalhe: 55 },
        amostra: { tipo: "esfera", shader: "vidro", tint: [0.96, 0.98, 1], fosco: 1, caustica: 0.25 },
      },
      {
        id: "ambar", nome: "Âmbar",
        material: "tinted amber glass, rich saturated translucent color",
        detalhes: ["color deepening in thicker areas", "light passing through and casting colored shadows", "high refraction", "warm glowing core"],
        amostra: { tipo: "esfera", shader: "vidro", tint: [0.98, 0.6, 0.16], dens: 1.3, caustica: 0.7 },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "gel", nome: "Gel & silicone", cat: "transparente",
    luz: "softbox", fundo: "claro",
    attrs: { acabamento: 85, desgaste: 0, detalhe: 35, iridescencia: 0 },
    neg: ["hard plastic", "opaque", "dry surface"],
    variantes: [
      {
        id: "gelatina", nome: "Gelatina",
        material: "translucent jelly material, gummy soft-body gel",
        detalhes: ["subsurface scattering", "soft wobbly volume", "wet highlights", "light glowing through the material", "candy-like translucency"],
        amostra: { tipo: "esfera", shader: "gel", cor: [1, 0.34, 0.5], tint: [1, 0.45, 0.6], dens: 1.6, caustica: 0.6 },
      },
      {
        id: "silicone", nome: "Silicone",
        material: "soft-touch silicone, semi-translucent rubbery material",
        detalhes: ["subtle subsurface scattering", "smooth rounded soft edges", "squishy tactile feel", "gentle light diffusion"],
        attrs: { acabamento: 25 },
        amostra: { tipo: "esfera", shader: "gel", cor: [0.55, 0.74, 0.96], tint: [0.7, 0.84, 1], dens: 1.4, fosco: 1, caustica: 0.3 },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "agua", nome: "Água", cat: "transparente",
    luz: "sol", fundo: "claro",
    attrs: { acabamento: 90, desgaste: 0, detalhe: 60, iridescencia: 0 },
    neg: ["murky", "foam", "debris"],
    variantes: [
      {
        id: "caustica", nome: "Cáustica",
        material: "crystal clear pool water with dancing light caustics",
        detalhes: ["shimmering caustic light network", "rippling water surface", "refracted sunlight patterns", "turquoise depth gradient"],
        amostra: { tipo: "superficie", gerador: "agua", modo: "caustica" },
      },
      {
        id: "ondulacao", nome: "Ondulação",
        material: "dark still water surface with gentle ripples",
        detalhes: ["concentric ripples", "mirror-like reflections on the water", "fluid motion frozen in time", "sharp specular glints"],
        amostra: { tipo: "superficie", gerador: "agua", modo: "ondulacao" },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "polido", nome: "Metal polido", cat: "metal", destaque: true,
    luz: "softbox", fundo: "claro",
    attrs: { acabamento: 100, desgaste: 0, detalhe: 40, iridescencia: 0 },
    neg: ["rust", "dull surface", "plastic look", "blurry reflections"],
    variantes: [
      {
        id: "cromo", nome: "Cromo",
        material: "mirror-polished chrome, liquid metal",
        detalhes: ["perfect mirror reflections of the studio environment", "high-contrast highlights", "seamless reflective surface", "crisp horizon line in the reflections"],
        amostra: { tipo: "esfera", shader: "metal", cor: [0.9, 0.91, 0.93] },
      },
      {
        id: "ouro", nome: "Ouro",
        material: "polished 24k gold, rich warm precious metal",
        detalhes: ["warm golden reflections", "luxurious specular highlights", "smooth flawless metal", "deep amber tones in the reflections"],
        amostra: { tipo: "esfera", shader: "metal", cor: [1, 0.74, 0.3] },
      },
      {
        id: "cobre", nome: "Cobre",
        material: "polished rose copper, warm reddish metal",
        detalhes: ["warm coppery reflections", "soft metallic gradients", "smooth burnished surface", "pinkish highlights"],
        amostra: { tipo: "esfera", shader: "metal", cor: [0.96, 0.58, 0.44] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "escovado", nome: "Metal escovado", cat: "metal",
    luz: "softbox", fundo: "escuro",
    attrs: { acabamento: 60, desgaste: 10, detalhe: 70, iridescencia: 0 },
    neg: ["mirror finish", "rust", "plastic look"],
    variantes: [
      {
        id: "inox", nome: "Aço inox",
        material: "brushed stainless steel with a fine directional brushed finish",
        detalhes: ["parallel linear brushing grooves", "anisotropic highlights stretching across the grain", "cool neutral grey tones", "precision-machined look"],
        amostra: { tipo: "superficie", gerador: "escovado", cor: [0.74, 0.76, 0.78] },
      },
      {
        id: "latao", nome: "Latão",
        material: "brushed brass, warm golden metal with a directional brushed finish",
        detalhes: ["linear brushing marks", "warm anisotropic highlights", "soft metallic sheen", "subtle tonal variation"],
        amostra: { tipo: "superficie", gerador: "escovado", cor: [0.86, 0.68, 0.34] },
      },
      {
        id: "anodizado", nome: "Anodizado",
        material: "brushed anodized aluminum in deep blue",
        detalhes: ["uniform metallic color coating", "fine linear grain", "precise industrial look", "soft anisotropic sheen"],
        amostra: { tipo: "superficie", gerador: "escovado", cor: [0.22, 0.42, 0.72] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "oxidado", nome: "Metal oxidado", cat: "metal",
    luz: "rasante", fundo: "escuro",
    attrs: { acabamento: 10, desgaste: 85, detalhe: 85, iridescencia: 0 },
    neg: ["clean metal", "shiny", "smooth"],
    variantes: [
      {
        id: "ferrugem", nome: "Ferrugem",
        material: "heavily rusted iron, corroded oxidized steel",
        detalhes: ["flaking orange and brown rust layers", "pitted corrosion", "patches of exposed dark metal", "powdery oxide texture"],
        amostra: { tipo: "superficie", gerador: "oxidado", modo: "ferrugem" },
      },
      {
        id: "patina", nome: "Pátina de cobre",
        material: "aged copper with verdigris patina",
        detalhes: ["turquoise-green oxidation blooms", "patches of warm bare copper", "chalky mineral crust", "weathered drip streaks"],
        attrs: { desgaste: 75 },
        amostra: { tipo: "superficie", gerador: "oxidado", modo: "patina" },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "madeira", nome: "Madeira", cat: "natural", destaque: true,
    luz: "janela", fundo: "claro",
    attrs: { acabamento: 30, desgaste: 15, detalhe: 70, iridescencia: 0 },
    neg: ["plastic laminate", "fake wood print", "repetitive pattern"],
    variantes: [
      {
        id: "carvalho", nome: "Carvalho",
        material: "natural oak wood, light warm timber",
        detalhes: ["pronounced straight grain", "visible growth rings", "open pores", "natural color variation"],
        amostra: { tipo: "superficie", gerador: "madeira", claro: [0.8, 0.62, 0.42], escuro: [0.5, 0.33, 0.19], aneis: 9 },
      },
      {
        id: "nogueira", nome: "Nogueira",
        material: "dark walnut wood, rich chocolate-brown hardwood",
        detalhes: ["flowing figured grain", "deep color variation", "fine pores", "hand-oiled surface"],
        amostra: { tipo: "superficie", gerador: "madeira", claro: [0.47, 0.31, 0.2], escuro: [0.2, 0.12, 0.07], aneis: 7, brilho: 0.22 },
      },
      {
        id: "pinus", nome: "Pinus",
        material: "pale pine wood, light yellowish softwood",
        detalhes: ["bold contrasting grain lines", "small dark knots", "soft resinous tone", "rustic natural look"],
        amostra: { tipo: "superficie", gerador: "madeira", claro: [0.92, 0.79, 0.58], escuro: [0.74, 0.5, 0.28], aneis: 6, nos: true },
      },
      {
        id: "queimada", nome: "Queimada",
        material: "charred shou sugi ban wood, burnt Japanese timber",
        detalhes: ["deep alligator-skin crackle pattern", "carbonized black surface", "silvery sheen on the raised char", "raised grain relief"],
        attrs: { acabamento: 35, desgaste: 50, detalhe: 85 },
        amostra: { tipo: "superficie", gerador: "madeira", modo: "queimada" },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "marmore", nome: "Mármore", cat: "natural", destaque: true,
    luz: "softbox", fundo: "claro",
    attrs: { acabamento: 85, desgaste: 0, detalhe: 60, iridescencia: 0 },
    neg: ["fake marble print", "repetitive veins", "plastic look"],
    variantes: [
      {
        id: "carrara", nome: "Carrara",
        material: "white Carrara marble",
        detalhes: ["soft grey feathery veining", "natural stone depth", "subtle cloudy tonal variation", "fine crystalline structure"],
        amostra: { tipo: "superficie", gerador: "marmore", base: [0.93, 0.93, 0.92], veia: [0.52, 0.54, 0.58], freq: 2.4, nitidez: 9, rede: 0.8 },
      },
      {
        id: "nero", nome: "Nero Marquina",
        material: "black Nero Marquina marble",
        detalhes: ["sharp white veins across a deep black base", "high-contrast veining", "natural stone depth"],
        amostra: { tipo: "superficie", gerador: "marmore", base: [0.06, 0.06, 0.07], veia: [0.9, 0.9, 0.88], freq: 2, nitidez: 26, rede: 1 },
      },
      {
        id: "calacatta", nome: "Calacatta dourado",
        material: "Calacatta gold marble",
        detalhes: ["bold grey veins with warm gold accents", "bright white base", "dramatic flowing veining"],
        amostra: { tipo: "superficie", gerador: "marmore", base: [0.96, 0.95, 0.93], veia: [0.45, 0.45, 0.47], veia2: [0.78, 0.62, 0.36], freq: 1.6, nitidez: 7, rede: 0.5 },
      },
      {
        id: "verde", nome: "Verde Guatemala",
        material: "deep green Verde Guatemala marble",
        detalhes: ["dense web of pale green and white veins", "dark emerald base", "rich mineral depth"],
        amostra: { tipo: "superficie", gerador: "marmore", base: [0.06, 0.22, 0.16], veia: [0.72, 0.84, 0.76], freq: 3.2, nitidez: 16, rede: 1.2 },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "pedra", nome: "Pedra", cat: "natural",
    luz: "rasante", fundo: "claro",
    attrs: { acabamento: 20, desgaste: 20, detalhe: 75, iridescencia: 0 },
    neg: ["smooth plastic", "flat color", "repetitive tiling"],
    variantes: [
      {
        id: "granito", nome: "Granito",
        material: "speckled granite, natural igneous stone",
        detalhes: ["dense black, white and pink mineral speckles", "crystalline flecks", "uniform granular pattern"],
        attrs: { acabamento: 75, desgaste: 0 },
        amostra: { tipo: "superficie", gerador: "pedra", modo: "granito", cor: [0.55, 0.55, 0.56] },
      },
      {
        id: "ardosia", nome: "Ardósia",
        material: "natural cleft slate, dark blue-grey layered rock",
        detalhes: ["split layered surface", "stepped ridges", "fine mineral grain", "faint rust-colored mineral stains"],
        amostra: { tipo: "superficie", gerador: "pedra", modo: "ardosia", cor: [0.23, 0.25, 0.28] },
      },
      {
        id: "arenito", nome: "Arenito",
        material: "sandstone, warm beige sedimentary rock",
        detalhes: ["horizontal sediment banding", "coarse sandy grain", "soft eroded surface", "earthy ochre tones"],
        amostra: { tipo: "superficie", gerador: "pedra", modo: "arenito", cor: [0.84, 0.7, 0.52] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "papel", nome: "Papel", cat: "fibra", destaque: true,
    luz: "rasante", fundo: "claro",
    attrs: { acabamento: 5, desgaste: 10, detalhe: 75, iridescencia: 0 },
    neg: ["glossy", "plastic", "digital flat color", "printed text"],
    variantes: [
      {
        id: "kraft", nome: "Kraft",
        material: "brown kraft paper, unbleached recycled paper",
        detalhes: ["visible wood-pulp fibers", "fine grainy surface", "subtle tonal mottling", "slightly rough tactile feel"],
        amostra: { tipo: "superficie", gerador: "papel", modo: "kraft", cor: [0.74, 0.58, 0.4], relevo: 0.3 },
      },
      {
        id: "aquarela", nome: "Aquarela",
        material: "cold-press watercolor paper, heavy cotton rag paper",
        detalhes: ["pronounced irregular tooth", "soft bumpy relief", "warm off-white tone", "deckled organic texture"],
        amostra: { tipo: "superficie", gerador: "papel", modo: "aquarela", cor: [0.96, 0.95, 0.91], relevo: 0.32 },
      },
      {
        id: "amassado", nome: "Amassado",
        material: "crumpled white paper",
        detalhes: ["sharp creases and folds", "random faceted wrinkles", "soft shadows in the valleys", "matte paper fibers"],
        attrs: { desgaste: 40 },
        amostra: { tipo: "superficie", gerador: "papel", modo: "amassado", cor: [0.95, 0.94, 0.92], relevo: 5 },
      },
      {
        id: "reciclado", nome: "Reciclado",
        material: "handmade recycled paper with fiber flecks",
        detalhes: ["visible colored fiber inclusions", "irregular specks", "uneven pulp density", "organic handmade feel"],
        amostra: { tipo: "superficie", gerador: "papel", modo: "reciclado", cor: [0.86, 0.83, 0.77], relevo: 0.28 },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "tecido", nome: "Tecido", cat: "fibra",
    luz: "rasante", fundo: "claro",
    attrs: { acabamento: 5, desgaste: 10, detalhe: 80, iridescencia: 0 },
    neg: ["plastic", "printed fabric pattern", "blurry weave"],
    variantes: [
      {
        id: "linho", nome: "Linho",
        material: "natural linen fabric with a loose plain weave",
        detalhes: ["visible slubby threads", "irregular thread thickness", "soft woven texture", "natural flax color"],
        amostra: { tipo: "superficie", gerador: "tecido", modo: "linho", cor: [0.8, 0.74, 0.63] },
      },
      {
        id: "denim", nome: "Denim",
        material: "indigo denim, cotton twill weave",
        detalhes: ["diagonal twill lines", "white weft threads peeking through", "faded indigo variation", "sturdy woven texture"],
        amostra: { tipo: "superficie", gerador: "tecido", modo: "denim", cor: [0.15, 0.24, 0.42], trama: [0.84, 0.84, 0.8] },
      },
      {
        id: "feltro", nome: "Feltro",
        material: "dense wool felt with compressed fibers",
        detalhes: ["fuzzy matted fibers", "soft non-woven surface", "fine fiber halo", "muted solid color"],
        amostra: { tipo: "superficie", gerador: "tecido", modo: "feltro", cor: [0.52, 0.16, 0.16] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "veludo", nome: "Veludo", cat: "fibra",
    luz: "softbox", fundo: "escuro",
    attrs: { acabamento: 30, desgaste: 0, detalhe: 55, iridescencia: 0 },
    neg: ["shiny plastic", "flat color", "hard surface"],
    variantes: [
      {
        id: "esmeralda", nome: "Esmeralda",
        material: "plush emerald green velvet",
        detalhes: ["soft directional pile", "luminous sheen along the edges", "deep rich shadows", "luxurious soft-touch fabric"],
        amostra: { tipo: "esfera", shader: "veludo", cor: [0.05, 0.36, 0.25] },
      },
      {
        id: "bordo", nome: "Bordô amassado",
        material: "deep burgundy crushed velvet",
        detalhes: ["crushed pile pattern", "rich lustrous highlights", "deep wine-red shadows", "soft folds"],
        amostra: { tipo: "esfera", shader: "veludo", cor: [0.42, 0.04, 0.1], amassado: true },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "couro", nome: "Couro", cat: "fibra",
    luz: "softbox", fundo: "claro",
    attrs: { acabamento: 35, desgaste: 15, detalhe: 75, iridescencia: 0 },
    neg: ["plastic", "faux leather", "printed texture"],
    variantes: [
      {
        id: "marrom", nome: "Marrom granulado",
        material: "pebbled brown full-grain leather",
        detalhes: ["natural pebble grain", "fine creases between the grains", "subtle tonal variation", "supple surface"],
        amostra: { tipo: "superficie", gerador: "couro", cor: [0.45, 0.26, 0.14] },
      },
      {
        id: "preto", nome: "Preto",
        material: "black full-grain leather",
        detalhes: ["fine natural grain", "subtle wrinkles", "deep black with soft highlights", "premium craftsmanship"],
        attrs: { acabamento: 50 },
        amostra: { tipo: "superficie", gerador: "couro", cor: [0.09, 0.085, 0.08], brilho: 0.45 },
      },
      {
        id: "camurca", nome: "Camurça",
        material: "tan suede leather",
        detalhes: ["soft brushed nap", "velvety fibers", "directional color shading", "fine fuzzy surface"],
        attrs: { acabamento: 5 },
        amostra: { tipo: "superficie", gerador: "couro", modo: "camurca", cor: [0.66, 0.46, 0.3] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "concreto", nome: "Concreto", cat: "construcao", destaque: true,
    luz: "rasante", fundo: "claro",
    attrs: { acabamento: 10, desgaste: 25, detalhe: 75, iridescencia: 0 },
    neg: ["smooth plastic", "clean flat grey", "repetitive tiling"],
    variantes: [
      {
        id: "aparente", nome: "Aparente",
        material: "raw exposed architectural concrete, béton brut",
        detalhes: ["small air pockets and pores", "subtle formwork marks", "cool grey tonal mottling", "fine aggregate grain"],
        amostra: { tipo: "superficie", gerador: "concreto", modo: "aparente", cor: [0.63, 0.63, 0.61] },
      },
      {
        id: "polido", nome: "Polido",
        material: "polished concrete, smooth troweled cement",
        detalhes: ["cloudy tonal mottling", "exposed fine aggregate flecks", "seamless continuous surface"],
        attrs: { acabamento: 60, desgaste: 5 },
        amostra: { tipo: "superficie", gerador: "concreto", modo: "polido", cor: [0.58, 0.58, 0.57] },
      },
      {
        id: "bruto", nome: "Bruto",
        material: "rough weathered concrete, coarse cement surface",
        detalhes: ["deep pits and pores", "water stains and drip marks", "gritty aggregate", "uneven patches"],
        attrs: { desgaste: 70 },
        amostra: { tipo: "superficie", gerador: "concreto", modo: "bruto", cor: [0.6, 0.59, 0.56] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "terrazzo", nome: "Terrazzo", cat: "construcao",
    luz: "softbox", fundo: "claro",
    attrs: { acabamento: 65, desgaste: 0, detalhe: 60, iridescencia: 0 },
    neg: ["blurry chips", "repetitive pattern", "plastic look"],
    variantes: [
      {
        id: "classico", nome: "Clássico",
        material: "terrazzo with marble chips",
        detalhes: ["irregular stone fragments in terracotta, sage green and charcoal", "cream cement base", "fine speckles between the chips", "flat ground surface"],
        amostra: { tipo: "superficie", gerador: "terrazzo", base: [0.93, 0.9, 0.85], paleta: [[0.76, 0.42, 0.3], [0.55, 0.62, 0.5], [0.22, 0.22, 0.23], [0.86, 0.78, 0.66]] },
      },
      {
        id: "pastel", nome: "Pastel",
        material: "pastel terrazzo with colorful chips",
        detalhes: ["chips in soft pink, baby blue and butter yellow", "bright white base", "playful scattered fragments", "flat ground surface"],
        amostra: { tipo: "superficie", gerador: "terrazzo", base: [0.97, 0.96, 0.95], paleta: [[0.96, 0.7, 0.72], [0.62, 0.78, 0.92], [0.98, 0.86, 0.5], [0.72, 0.86, 0.74]] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "estuque", nome: "Estuque & reboco", cat: "construcao",
    luz: "rasante", fundo: "claro",
    attrs: { acabamento: 15, desgaste: 10, detalhe: 70, iridescencia: 0 },
    neg: ["flat digital wall", "wallpaper pattern"],
    variantes: [
      {
        id: "veneziano", nome: "Estuque veneziano",
        material: "Venetian plaster, polished lime stucco",
        detalhes: ["layered cloudy tonal variation", "subtle trowel marks", "marble-like depth", "burnished surface"],
        attrs: { acabamento: 55 },
        amostra: { tipo: "superficie", gerador: "gesso", modo: "veneziano", cor: [0.86, 0.82, 0.76] },
      },
      {
        id: "rustico", nome: "Reboco rústico",
        material: "rough hand-troweled plaster wall",
        detalhes: ["irregular trowel swirls", "sandy grain", "raised relief", "warm off-white tone"],
        amostra: { tipo: "superficie", gerador: "gesso", modo: "rustico", cor: [0.93, 0.91, 0.87] },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "ceramica", nome: "Cerâmica", cat: "construcao",
    luz: "janela", fundo: "claro",
    attrs: { acabamento: 80, desgaste: 5, detalhe: 50, iridescencia: 0 },
    neg: ["plastic", "perfect CGI smoothness"],
    variantes: [
      {
        id: "esmaltada", nome: "Esmaltada",
        material: "glazed ceramic with a celadon green glaze",
        detalhes: ["glaze pooling with deeper color", "fine crackle lines (craquelure)", "vitreous glassy coating", "handmade irregularity"],
        amostra: { tipo: "esfera", shader: "ceramica", cor: [0.55, 0.72, 0.62], brilho: 0.9, craquele: true, poca: true },
      },
      {
        id: "terracota", nome: "Terracota",
        material: "unglazed terracotta clay",
        detalhes: ["warm earthy orange tone", "fine sandy grain", "subtle firing color variation", "porous surface"],
        attrs: { acabamento: 10 },
        amostra: { tipo: "esfera", shader: "ceramica", cor: [0.76, 0.4, 0.24], brilho: 0.12, grao: true },
      },
      {
        id: "porcelana", nome: "Porcelana",
        material: "fine white porcelain",
        detalhes: ["pure white vitrified body", "delicate soft reflections", "slight translucency at thin edges"],
        attrs: { acabamento: 85, detalhe: 30 },
        amostra: { tipo: "esfera", shader: "ceramica", cor: [0.95, 0.95, 0.94], brilho: 0.92, translucido: true },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "plastico", nome: "Plástico", cat: "sintetico", destaque: true,
    luz: "estudio", fundo: "claro",
    attrs: { acabamento: 80, desgaste: 0, detalhe: 25, iridescencia: 0 },
    neg: ["scratches", "dust", "cheap look"],
    variantes: [
      {
        id: "brilhante", nome: "Brilhante",
        material: "glossy injection-molded plastic",
        detalhes: ["smooth seamless surface", "bright saturated color", "toy-like clean form", "soft reflections of the studio"],
        amostra: { tipo: "esfera", shader: "plastico", cor: [1, 0.4, 0.12], brilho: 0.92 },
      },
      {
        id: "fosco", nome: "Soft-touch",
        material: "matte soft-touch plastic",
        detalhes: ["velvety rubberized coating", "soft diffused highlights", "minimal premium product feel", "smooth molded edges"],
        attrs: { acabamento: 15 },
        amostra: { tipo: "esfera", shader: "plastico", cor: [0.8, 0.83, 0.78], brilho: 0.18 },
      },
      {
        id: "translucido", nome: "Translúcido",
        material: "translucent frosted polycarbonate plastic",
        detalhes: ["light glowing through the material", "soft internal diffusion", "candy-colored transparency", "smooth molded edges"],
        attrs: { acabamento: 55 },
        amostra: { tipo: "esfera", shader: "gel", cor: [0.2, 0.75, 0.72], tint: [0.45, 0.92, 0.88], dens: 1.2, fosco: 0.7, caustica: 0.5 },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "holografico", nome: "Holográfico", cat: "sintetico",
    luz: "estudio", fundo: "claro",
    attrs: { acabamento: 90, desgaste: 0, detalhe: 60, iridescencia: 95 },
    neg: ["dull", "matte", "single flat color"],
    variantes: [
      {
        id: "amassado", nome: "Foil amassado",
        material: "crinkled holographic foil, iridescent metallic film",
        detalhes: ["rainbow spectral reflections shifting across the folds", "sharp crinkles and creases", "chrome-like base"],
        amostra: { tipo: "superficie", gerador: "holo", modo: "amassado" },
      },
      {
        id: "filme", nome: "Película",
        material: "smooth iridescent thin-film surface with soap-bubble interference colors",
        detalhes: ["pastel rainbow gradients", "oil-slick color swirls", "fluid color transitions"],
        attrs: { iridescencia: 80 },
        amostra: { tipo: "superficie", gerador: "holo", modo: "filme" },
      },
    ],
  },
  /* ---------------------------------------------------------------- */
  {
    id: "perola", nome: "Pérola & nácar", cat: "sintetico",
    luz: "softbox", fundo: "claro",
    attrs: { acabamento: 75, desgaste: 0, detalhe: 45, iridescencia: 55 },
    neg: ["plastic", "chalky", "flat white"],
    variantes: [
      {
        id: "perola", nome: "Pérola",
        material: "lustrous pearl nacre",
        detalhes: ["soft orient luster", "subtle pink and blue overtones", "smooth layered depth", "gentle glow"],
        amostra: { tipo: "esfera", shader: "perola", cor: [0.92, 0.9, 0.88] },
      },
      {
        id: "madreperola", nome: "Madrepérola",
        material: "mother-of-pearl shell",
        detalhes: ["layered wavy nacre bands", "shimmering pastel play of color", "silky depth"],
        amostra: { tipo: "superficie", gerador: "holo", modo: "nacar" },
      },
    ],
  },
];

/* atributos efetivos da variação: base → material → variação */
export const attrsDe = (mat, va) => ({ ...ATTRS, ...mat.attrs, ...(va.attrs || {}) });

/* semente estável por variação, para a amostra não mudar a cada render */
export const sementeDe = (id) => {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return (h >>> 0) % 100000;
};
