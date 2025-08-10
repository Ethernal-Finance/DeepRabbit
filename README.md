# deeprabbit (PRO)

**Fresh tracks. Forged by AI.**

DeepRabbit is a real‑time AI music performance tool. Use natural language styles and your MIDI controller to sculpt evolving tracks on stage.

## Features

- **Real‑time AI performance** – generate and blend musical ideas with zero latency.
- **Curate & toggle styles** – load up to eight styles, switch them on and off, and map controls for instant changes.
- **MIDI first** – connect your hardware to shape dynamics, effects, and transitions.

## Run Locally

Prerequisites: Node.js

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local`
3. Run: `npm run dev`

## User Guide

1. **Start a session** – open the app; no subscription required.
2. **Connect MIDI** – click **MIDI** in the header and choose your controller.
3. **Curate styles** – browse Tracks, add as many styles as you like, then drag up to eight onto the grid.
4. **Perform live** – press **Play**. Move sliders or mapped knobs to blend styles in real time.
5. **Toggle on the fly** – enable or disable styles during your set for dynamic transitions.
6. **Map controls** – select “Click to learn” on a slot, turn a knob, and repeat for instruments or effects.

Tip: Load a larger palette of styles in Tracks and toggle which eight are active per song.

## Troubleshooting

- **No sound?** Ensure your browser tab has audio permission and your speakers are selected.
- **MIDI device missing?** Verify Web MIDI is supported and that you've granted access. Reconnect the controller and refresh the page.
- **API key errors?** Confirm `GEMINI_API_KEY` is set in `.env.local` and restart the dev server.


For additional questions see the [FAQ](docs/FAQ.md).

## Tech

- TypeScript + Lit + Vite
- Web MIDI + Web Audio

