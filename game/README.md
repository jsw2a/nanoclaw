# DC Metro — Red Line Challenge

A mobile-friendly drag-and-drop game: place all 27 Red Line station names onto
their correct stops on the map, against the clock.

## Play

Open `game/index.html` in any browser (desktop or mobile). No build step, no
dependencies — it's a single self-contained file.

- Drag a station name from the tray onto its dot on the map.
- Correct drop → the dot fills red and the name locks onto the map.
- Wrong stop → the chip shakes and returns to the tray.
- The timer starts on your first drag and stops when all 27 are placed.
- **Restart** reshuffles the tray for a fresh run.

## How the map is built

The schematic is generated from the **real WMATA station coordinates**
(latitude/longitude), projected with an equirectangular projection corrected
for DC's latitude. That's why the line has its authentic "hook" shape — the
downtown core (Metro Center, Gallery Place, Union Station) sits at the southern
apex, with the line running down from Shady Grove and back up to Glenmont.

Station data lives in the `STATIONS` array in `index.html`. To add the other
lines later, extend that array (and give each its own color/route polyline).

## Roadmap ideas

- Additional lines (Blue, Orange, Silver, Green, Yellow) with line colors.
- Difficulty modes (hide the line, countdown timer, partial hints).
- Per-station "wrong attempt" penalties and a high-score table.
