# Sudoku

Sudoku-App für den Browser. Sie lässt sich als App installieren und funktioniert auch offline.

**Spielen:** https://schmidthorsten89-beep.github.io/Sudoku-/

## Funktionen
- 4 Schwierigkeitsgrade: Leicht, Mittel, Schwer, Experte. Jedes Rätsel hat genau eine Lösung.
- Notizen (kleine Kandidatenzahlen) in den Feldern
- Bestenliste pro Schwierigkeitsgrad. Wertung = Zeit + 15 s pro Fehler + 30 s pro Tipp.
- Rückgängig, Tipp, Pause, Fehlermarkierung
- Ein angefangenes Spiel bleibt gespeichert, Dunkelmodus, Handy-Layout

## Als App installieren
- **Android (Chrome):** „Installieren“-Button in der App oder Menü ⋮ → „App installieren“
- **iPhone/iPad (Safari):** Teilen-Symbol → „Zum Home-Bildschirm“
- **PC (Chrome/Edge):** Installations-Symbol in der Adressleiste

## Dateien
| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App (HTML, CSS, JavaScript) |
| `manifest.webmanifest` | App-Name, Farben, Icons für die Installation |
| `sw.js` | Service Worker für den Offline-Betrieb |
| `icon*.png`, `icon.svg`, `apple-touch-icon.png` | App-Icons |

## Updates & Cache
- Die Seite wird immer zuerst frisch vom Server geladen. Der Cache wird nur offline verwendet.
- Die App sucht bei jedem Öffnen nach einer neuen Version. Gibt es eine, erscheint „Neue Version verfügbar – Neu laden“.
- Unten in der App gibt es „App aktualisieren“: Das leert den Cache und lädt alles neu.
- **Bei jeder Änderung** die Versionsnummer an zwei Stellen erhöhen: `VERSION` in `sw.js` und `APP_VERSION` in `index.html`.

Die App-ID im Manifest (`/Sudoku-/?app=sudoku`) bleibt immer gleich, damit Updates in der installierten App ankommen.
