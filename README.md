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
3. Optional: Configure real subscription endpoints in `.env.local`:
   - `VITE_CHECKOUT_URL=https://your-checkout/checkout`
   - `VITE_SUBSCRIPTION_STATUS_URL=https://your-api/subscription/status`
   - `VITE_SUBSCRIPTION_VERIFY_URL=https://your-api/subscription/verify`
   - `VITE_RETURN_URL=https://your-app-url`
   - `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXX`
   - `VITE_STRIPE_CREATE_CHECKOUT_URL=https://your-api/stripe/create-checkout`
   - `VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...` *(optional direct payment link)*
   - `VITE_STRIPE_CUSTOMER_PORTAL_URL=https://billing.stripe.com/p/session/...` *(optional direct portal)*
4. For the built-in subscription server set the following env vars and run `npm run server`:
   - `STRIPE_SECRET_KEY=sk_test_XXXX`
   - `STRIPE_PRICE_ID=price_XXXX`
   - `STRIPE_WEBHOOK_SECRET=whsec_XXXX`
   - `SESSION_SECRET=change_me`
   - `RETURN_URL=https://your-app-url`
   - `ALLOWED_ORIGIN=http://localhost:5173`
   - Webhooks flip a user's `subscribed` flag in your DB by matching on metadata or email. The `/subscription/verify` endpoint simply looks up that stored state and expects an `?email=` query parameter.
5. Run: `npm run dev`

## User Guide

1. **Start a session** – begin your free trial or sign in with an active subscription.
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
- **Subscription problems?** Check the URLs in `.env.local` and verify your network connection.

For additional questions see the [FAQ](docs/FAQ.md).

## Tech

- TypeScript + Lit + Vite
- Web MIDI + Web Audio

