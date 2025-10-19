# DeepRabbit FAQ

## What is DeepRabbit?
DeepRabbit is a real-time AI music performance tool that lets you shape evolving tracks with natural language prompts and MIDI hardware. It generates music live using Google's Gemini AI and provides intuitive controls for live performance.

## How do I get started?
1. Install Node.js 18+ and run `npm install`
2. Create `.env.local` with your `GEMINI_API_KEY`
3. Run `npm run dev` and open http://localhost:5173
4. Connect a MIDI controller and start performing!

## How do I curate styles?
Open the Tracks panel and browse or search for styles. Add as many as you like, then choose up to eight to place on the performance grid. You can toggle them on/off during performance.

## Can I toggle styles during a performance?
Yes. Use the Tracks panel to enable or disable styles in real time. You can also map MIDI controls to quickly toggle slots on and off. The app uses ON/OFF toggles instead of confusing Start/Stop buttons.

## Do I need a subscription?
No. The app runs completely client-side without any subscription or checkout. All you need is a Google Gemini API key.

## How many genre styles are available?
DeepRabbit includes 190+ genre styles covering:
- Electronic: House, Techno, Trance, Future Bass, Synthwave, Vaporwave
- Organic: Jazz, Blues, Rock, Folk, Classical, Country
- World: Afrobeat, Latin Pop, Salsa, Reggae
- Experimental: Ambient, Lo-Fi, Trap, Drill
- And many more!

## My MIDI controller isn't detected. What can I do?
- Ensure your browser supports Web MIDI (Chrome, Edge, Opera recommended)
- Grant MIDI permissions when prompted
- Refresh the page or reconnect the controller
- Check that your controller is properly connected via USB

## How does the mobile interface work?
The mobile interface features:
- Bottom sheet menus that slide up from the bottom
- Touch-optimized sliders with visual feedback
- Responsive design that works on phones and tablets
- Clear ON/OFF toggles instead of confusing play buttons

## Can I record my performances?
Yes! The app includes live recording functionality that captures your performances as MP3 files. The recording uses modern AudioWorklet technology for high-quality, low-latency audio capture.

## What if I get audio decoding errors?
The app now automatically handles raw PCM audio data from the AI. If decoding fails, it gracefully falls back to silent buffers so your performance continues uninterrupted.

## How do the weight sliders work?
Weight sliders control how much influence each style has on the generated music:
- **0.0** = No influence (style is muted)
- **1.0** = Normal influence
- **2.0** = Double influence (style dominates)

The sliders show real-time values and have visual tracks for easy adjustment.

## Can I save different style combinations?
Yes! Use the scene management feature to save and recall different combinations of styles. This is perfect for switching between different songs or sections during a live set.

## What browsers are supported?
- **Chrome 66+** (recommended)
- **Firefox 76+**
- **Safari 14.1+**
- **Edge 79+**

Chrome is recommended for the best MIDI and audio performance.

## Where can I get help?
- Check the troubleshooting section in the README
- Review the [AudioWorklet Migration Guide](AUDIO_WORKLET_MIGRATION.md)
- Contact support at support@deeprabbit.net

## Technical Questions

### What audio formats are supported?
The app handles raw PCM audio data from Google Gemini and converts it to Web Audio API buffers for playback. Recording outputs MP3 files.

### How does the AI music generation work?
DeepRabbit uses Google's Gemini Live Music API to generate music in real-time based on your style prompts and MIDI input. The AI responds to weight changes and style toggles to create evolving musical content.

### Is my data stored anywhere?
No. All processing happens client-side in your browser. Your API key and MIDI data never leave your device.
