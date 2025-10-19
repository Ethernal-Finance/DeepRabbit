# DeepRabbit

**Fresh tracks. Forged by AI.**

DeepRabbit is a real‑time AI music performance tool. Use natural language styles and your MIDI controller to sculpt evolving tracks on stage.

## Features

- **Real‑time AI performance** – generate and blend musical ideas with zero latency
- **Curate & toggle styles** – load up to eight styles, switch them on and off, and map controls for instant changes
- **MIDI first** – connect your hardware to shape dynamics, effects, and transitions
- **Mobile-friendly** – responsive design with touch-optimized controls
- **Live recording** – capture your performances with high-quality audio
- **190+ genre styles** – from electronic to organic, covering all musical tastes

## Quick Start

Prerequisites: Node.js 18+

1. **Install dependencies:** `npm install`
2. **Set API key:** Create `.env.local` with `GEMINI_API_KEY=your_key_here`
3. **Run locally:** `npm run dev`
4. **Open:** http://localhost:5173

## User Guide

### Getting Started
1. **Start a session** – open the app; no subscription required
2. **Connect MIDI** – click **MIDI** in the header and choose your controller
3. **Curate styles** – browse Tracks, add as many styles as you like, then drag up to eight onto the grid
4. **Perform live** – press **Play**. Move sliders or mapped knobs to blend styles in real time
5. **Toggle on the fly** – enable or disable styles during your set for dynamic transitions
6. **Map controls** – select "Click to learn" on a slot, turn a knob, and repeat for instruments or effects

### Mobile Usage
- **Bottom sheet menus** – swipe up from bottom for Evolve, Menu, Settings, and Record
- **Touch controls** – optimized sliders with visual feedback and value displays
- **Responsive design** – works seamlessly on phones and tablets

### Advanced Features
- **Scene management** – save and recall different style combinations
- **Audio recording** – capture your live performances
- **Weight controls** – fine-tune style influence with precision sliders
- **Genre contrast** – control how different styles blend together

## Troubleshooting

- **No sound?** Ensure your browser tab has audio permission and your speakers are selected
- **MIDI device missing?** Verify Web MIDI is supported and that you've granted access. Reconnect the controller and refresh the page
- **API key errors?** Confirm `GEMINI_API_KEY` is set in `.env.local` and restart the dev server
- **Audio decoding issues?** The app now handles raw PCM audio data automatically with fallback to silent buffers

For additional questions see the [FAQ](docs/FAQ.md).

## Tech Stack

- **Frontend:** TypeScript + Lit + Vite
- **Audio:** Web MIDI + Web Audio API + AudioWorklet
- **AI:** Google Gemini Live Music API
- **Recording:** LAME.js MP3 encoding
- **Mobile:** Responsive CSS with touch optimizations

## Development

### Build Commands
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

### Project Structure
```
├── components/          # Lit web components
├── utils/              # Audio processing and utilities
├── docs/               # Documentation
├── dist/               # Production build output
└── public/             # Static assets
```

## License

MIT License - see LICENSE file for details.

