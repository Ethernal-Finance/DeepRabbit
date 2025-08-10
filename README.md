# deeprabbit (PRO)

deeprabbit is a real‑time AI music performance tool. Use natural language styles (prompts) and your MIDI controller to shape evolving music on stage.

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
   - `SESSION_SECRET=change_me`
   - `RETURN_URL=https://your-app-url`
   - `ALLOWED_ORIGIN=http://localhost:5173`
5. Run: `npm run dev`

## How to use (end users)

1. Start your 7‑day free trial or continue if subscribed.
2. Click MIDI in the header and select your controller.
3. Choose up to 8 styles in Tracks to place on the grid.
4. Press Play. Move sliders or mapped knobs to blend styles.
5. Map controls: click “Click to learn” on a slot, turn a knob; do the same in Instruments.

Tip: Curate many styles in Tracks and toggle which 8 are active per song.

## Tech

- TypeScript + Lit + Vite
- Web MIDI + Web Audio

