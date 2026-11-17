# Côte à Côte

Maquette HTML/CSS/JS du site Côte à Côte (projet M2 Gestion de projet), reproduite à partir de la maquette Figma.

## Pages

- `site/index.html` : fil des discussions (forum)
- `site/carte.html` : carte de la rade de Brest (Leaflet + OpenStreetMap)
- `site/publication.html?id=1..4` : fiches événement
- `site/nouvelle.html` : création d'une publication
- `site/connexion.html`, `site/inscription.html` : connexion et inscription (simulées)

## Lancer en local

```bash
python -m http.server 8080 --directory site
```

Puis ouvrir http://localhost:8080.
