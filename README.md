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

Nach Änderungen an den Dateien in `sw.js` die Cache-Version (`sudoku-v1`) erhöhen, damit installierte Apps die neue Version laden.
