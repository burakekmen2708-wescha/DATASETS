# Shipping DATASETS to the App Store

The repo contains a ready Capacitor iOS project (`ios/`), configured with
app ID `com.burakekmen.datasets`, the DATASETS icon, and a dark splash
screen. What remains needs your Mac and your Apple Developer account.

## One-time Mac setup

1. Install **Xcode** from the Mac App Store (big download, start it early).
2. Install **Node.js** (from nodejs.org, LTS version).
3. Clone the repo and prepare it:
   ```bash
   git clone https://github.com/burakekmen2708-wescha/DATASETS.git
   cd DATASETS
   npm install
   npm run ios        # builds www/ and syncs it into the iOS project
   npx cap open ios   # opens the project in Xcode
   ```

## In Xcode (first run)

1. In the left sidebar click the blue **App** project → **App** target →
   **Signing & Capabilities** tab.
2. Check **"Automatically manage signing"** and pick your **Team**
   (your name — it appears once you're signed into Xcode with your
   Apple Account: Xcode → Settings → Accounts → "+").
3. Plug in your iPhone, select it as the run destination at the top,
   press **▶ Run**. First time: your iPhone asks you to trust the
   developer (Settings → General → VPN & Device Management).

That's DATASETS running natively on your phone.

## Submitting to the App Store

1. **App Store Connect** (appstoreconnect.apple.com) → My Apps → **"+"**
   → New App: platform iOS, name **DATASETS**, bundle ID
   `com.burakekmen.datasets` (register it at developer.apple.com →
   Identifiers if it's not offered), language, SKU (anything, e.g.
   `datasets-001`).
2. In Xcode: select **Any iOS Device (arm64)** as destination →
   **Product → Archive** → when the Organizer opens, **Distribute App**
   → **App Store Connect** → Upload. Defaults are fine.
3. Back in App Store Connect, the build appears under TestFlight after
   processing (~15–30 min). Fill in the app page:
   - Screenshots (6.7" iPhone required — take them on your phone or the
     Xcode simulator).
   - Description, keywords, support URL (the GitHub Pages URL works),
     category (Productivity).
   - **Privacy**: declare "Data Not Collected" — truthfully, since
     everything stays on-device.
   - Pricing: Free.
4. Add the build to the version, **Submit for Review**. First reviews
   typically take 1–3 days.

## Updating the app later

After any change to `index.html` on `main`:
```bash
git pull && npm run ios && npx cap open ios
```
bump the version/build number in Xcode (App target → General), then
Archive → Distribute again, and submit the new version in App Store
Connect.

## Notes

- The web app (GitHub Pages / PWA) and the iOS app share the same
  `index.html`; `npm run build:www` copies it into `www/`, and
  `npx cap sync ios` bundles it into the native shell. No code forks.
- The service worker is web-only (it self-disables inside the native
  app, where the bundle is already offline).
- Review-proofing done in advance: offline local functionality, native
  touch gestures (pan/pinch/drag), no web wrapper of a remote site
  (everything is bundled), safe-area aware layout for notched iPhones.
