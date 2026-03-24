# 🎯 EVG Roulette

Application web qui lance une fléchette sur une carte du monde pour choisir une destination d'EVG (Enterrement de Vie de Garçon) au hasard. Affiche la météo en temps réel et des suggestions d'activités générées par IA.

## Stack

- **React + TypeScript + Vite** — framework & tooling
- **react-simple-maps** — carte du monde SVG interactive
- **framer-motion** — animations (fléchette, modale, impact)
- **Tailwind CSS** — styling
- **Open-Meteo API** — météo temps réel (gratuite, sans clé)
- **Anthropic API** (Claude) — descriptions IA des activités EVG

## Installation

```bash
git clone <repo-url>
cd evg-roulette
npm install --legacy-peer-deps
```

## Configuration

Copie le fichier d'environnement et ajoute ta clé API Anthropic :

```bash
cp .env.example .env
```

Édite `.env` :
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

> L'application fonctionne sans clé API — les descriptions IA seront simplement désactivées.

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Déploiement (Vercel)

```bash
npx vercel
```

Ou connecte le repo GitHub à Vercel pour un déploiement automatique.

## Screenshot

![EVG Roulette](screenshot.png)
