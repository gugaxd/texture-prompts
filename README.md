# texture prompts

Gerador de prompts detalhados de textura e material para IA de imagem. Você escolhe um material
na biblioteca, ajusta os atributos e a cena, e sai um prompt pronto para o modelo escolhido.
Roda inteiramente no navegador, sem back-end.

## O que faz

- **Biblioteca** — 20 materiais e 56 variações: vidro, gel, água, metal polido, escovado e
  oxidado, madeira, mármore, pedra, papel, tecido, veludo, couro, concreto, terrazzo, estuque,
  cerâmica, plástico, holográfico e pérola. Cada um com amostra visual
- **Aplicação** — *objeto* (o material vestindo uma forma: ícone, letra, símbolo, embalagem) ou
  *textura contínua* (padrão sem emenda visto de cima, para fundo ou mapa 3D)
- **Atributos** — acabamento, desgaste, microdetalhe e iridescência, de 0 a 100. Cada faixa vira
  uma frase no prompt, mostrada embaixo do controle
- **Cena** — iluminação, fundo, estilo e composição. Iluminação e fundo partem da sugestão do
  material
- **Modelos** — Grok, Midjourney, GPT Image, Flux / SD e Firefly, cada um no formato que lê melhor
- **Exportação** — copiar, TXT e PNG em formato de cartão (título, prompt e amostra)

## Anatomia do prompt

A ordem segue o exemplo de referência:

```
assunto → "the X form made of" material → detalhes → atributos → cor → luz → fundo → estilo → composição
```

`biblioteca.js` guarda o material e os detalhes de cada variação. Os detalhes não falam de
acabamento, desgaste nem iridescência: isso vem dos atributos, para não sair frase contraditória
quando o slider muda. `prompt.js` monta as partes e formata por modelo:

| Modelo | Formato |
|---|---|
| Grok | caixa alta entre chaves, igual ao exemplo |
| Midjourney | lista corrida + `--ar`, `--style raw`, `--v 7`, `--tile` e `--no` |
| GPT Image | frases completas, com "Avoid:" no fim |
| Flux / SD | lista de termos, prompt negativo em campo separado |
| Firefly | frases completas, sem proporção no texto |

Os prompts saem em inglês, que é onde os modelos de imagem acertam mais. A interface é em português.

## Amostras

Nenhuma imagem é baixada: cada amostra é pintada pixel a pixel em `amostras.js`, a partir de
ruído Perlin, fbm e Worley. São dois renderizadores:

- **superfície** — mapa de altura e albedo; a normal sai da altura e é iluminada por uma luz
  rasante (relevo) e uma softbox pontual (especular)
- **esfera** — bola de material num estúdio, com reflexo de ambiente, Fresnel e, no vidro e no
  gel, refração do fundo e cáustica na sombra

Os renderizadores são geradores (`function*`). O agendador fatia o trabalho em blocos de 10 ms
entre quadros, então a biblioteca vai aparecendo sem travar a interface, e a amostra grande do
destaque passa na frente da fila. Cada amostra fica em cache por parâmetro e resolução.

As amostras são ilustrativas — mostram o caráter do material, não o resultado do modelo.

## Material novo

Entra em `MATERIAIS`, em `src/biblioteca.js`. A amostra reaproveita um gerador existente
(`papel`, `madeira`, `marmore`, `pedra`, `concreto`, `terrazzo`, `gesso`, `tecido`, `couro`,
`escovado`, `oxidado`, `agua`, `holo`) ou um shader de esfera (`vidro`, `gel`, `metal`,
`plastico`, `ceramica`, `veludo`, `perola`). Gerador novo entra em `GERADORES`, em
`src/amostras.js`.

## Sistema visual

Paleta, tipografia, `Header` e `Footer` vêm do [gri.d.maker](https://github.com/gugaxd/gri.d.maker),
que é a fonte da verdade da família. As cópias de referência estão em `assets/design-system.md`
e `assets/tokens.css`. Ao mudar qualquer token lá, replique aqui.

A Host Grotesk SemiBold vem da Google Fonts, como no 3d maker. Gere o subconjunto de
"texture prompts" e troque por `@font-face` embutido para cortar a chamada externa.

## Rodando localmente

```bash
npm install
npm run dev
```

## Publicando

Vercel, sem configuração (Vite, build `npm run build`, saída `dist`).

## Licença

MIT
