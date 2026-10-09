# Research: what a PWA can do for a pass-and-play word game on iPhone and Android

_Researched 2026-10-09 against primary sources: WebKit blog, Apple Developer and Apple Support, MDN (pages and browser-compat-data), developer.chrome.com, web.dev, Android Developers, Vite, vite-plugin-pwa, Preact, Svelte docs, and the hosts' own docs. Context: one phone passed around a friend group in India (mix of iPhone and Android), offline, no backend, ~50 KB bundled JSON, small on-device history of played pair ids._

## Summary

- **Keeping the screen on works everywhere that matters.** Screen Wake Lock is in Chrome 84+ [S3] and Safari/iOS 16.4+ in a tab, but on iOS it only works in Home Screen web apps from **iOS 18.4** [S2][S5]. The lock is dropped whenever the page is hidden, so re-request it on `visibilitychange` [S1][S3].
- **No vibration on iPhone.** `navigator.vibrate()` has never shipped in Safari [S2]. Android Chrome has it (32+, needs a user gesture since 60) [S2]. The only iOS haptic a web page can get is the tick from a native `<input type=checkbox switch>` on iOS 18+ [S7].
- **No web API blocks or detects screenshots or screen recording.** Screenshot blocking and capture detection exist only for native apps (Android `FLAG_SECURE`, UIKit `UIScreen.isCaptured`) [S11][S12]. What the web can do is hide the word on `visibilitychange` → `hidden`, the last event a page reliably gets on mobile [S8][S9]. Whether that hide lands before iOS takes its app-switcher snapshot is **not documented for web content**. Test it on a real device.
- **Offline is fine in all four contexts.** Service workers work in Safari/iOS 11.3+ and Chrome 40+ [S2]. The real iOS risk is **storage eviction in a Safari tab**: after 7 days of Safari use without the user touching the site, WebKit deletes all script-writable storage, including service-worker caches [S14]. Home Screen web apps have their own day counter, and WebKit "do[es] not expect" their first-party data to be deleted [S14]. Safari grants `navigator.storage.persist()` based on heuristics "like whether the website is opened as a Home Screen Web App" [S13].
- **Installing:** on iOS it's Share → Add to Home Screen → "Open as Web App" → Add [S18]. From iOS 26 every site added this way opens as a web app by default, with "zero requirements for installability" [S17]. There is still no install prompt on iOS (`beforeinstallprompt` is not in Safari [S2]). Android Chrome offers an Install / Add to Home Screen menu item, an install prompt, and `beforeinstallprompt` once its install criteria are met [S19][S20].
- **Recommended stack: Vite + Preact (TypeScript) + vite-plugin-pwa (`generateSW`), deployed as static files to GitHub Pages or Cloudflare Pages.** Preact costs about 3 kB [S25]. It saves you hand-writing DOM updates across a handful of screens, and both Vite and vite-plugin-pwa ship Preact templates [S22][S23]. SvelteKit works but brings routing and SPA-mode machinery this app doesn't need [S27]. Plain vanilla TS is the fallback if you want zero dependencies.
- **For the game:** reveal the word with tap-and-hold, so it hides the moment the finger lifts. Also blank the screen on `visibilitychange`. Treat haptics as Android-only. Store history in `localStorage` (or IndexedDB), call `persist()`, and **push iPhone friends to Add to Home Screen**, since that's what protects the history on iOS. Expect history to reset if someone plays only in a Safari tab and then skips the game for a week or more.

## Capability table

Minimum versions from MDN browser-compat-data unless noted. "iOS" here means Safari on iOS. Third-party iOS browsers are covered under Install.

| Capability | (a) iOS Safari tab | (b) iOS Home Screen web app | (c) Android Chrome tab | (d) Android installed PWA |
|---|---|---|---|---|
| Screen Wake Lock | Yes, iOS 16.4+ [S2][S4] | **Yes from iOS 18.4** (16.4–18.3 didn't work in standalone apps) [S2][S5] | Yes, Chrome 84+ [S3] | Yes (same engine as the tab) [S3] |
| Vibration API | **No** [S2] | **No** [S2] | Yes, Chrome 32+. Needs a user gesture (60+) [S2] | Yes (same) [S2] |
| iOS haptic alternative | `<input type=checkbox switch>` tick, iOS 18+ [S7] | Same [S7] | n/a | n/a |
| `visibilitychange` on app switch | Yes [S8] | Yes [S8] | Yes [S8][S9] | Yes [S8][S9] |
| App-switcher snapshot hides content | **Not documented for web**. Test on device | **Not documented**. Test on device | **Not documented**. Test on device | **Not documented**. Test on device |
| Block or detect screenshots / recording | **No web API** (native-only) [S11] | **No** [S11] | **No web API** (`FLAG_SECURE` is native-only) [S12] | **No** [S12] |
| Service worker / offline | Yes, iOS 11.3+ [S2]. Caches can go under the 7-day rule [S14] | Yes. Own day counter, data not expected to be deleted [S14] | Yes, Chrome 40+ [S2] | Yes [S2] |
| 7-day script-writable storage cap | **Applies** [S14][S15] | **Does not apply** in practice [S14][S15] | Not applicable (Chrome evicts LRU only under storage pressure) [S15] | Same as (c) [S15] |
| `navigator.storage.persist()` | API present from iOS 15.2 [S2][S16]. Grant is heuristic [S13] | Present. Home Screen web app status is a named grant heuristic [S13] | Chrome 55+. Auto-granted or silently denied by engagement, install/bookmark, notifications [S16] | Installed apps count toward the grant [S16] |
| `storage.estimate()` | iOS 17+ [S2] | iOS 17+ [S2] | Yes [S2] | Yes [S2] |
| Quota (per origin) | Up to 60% of disk in browser apps (Safari 17+) [S13] | Same as in the browser [S13] | Up to 60% of disk [S15] | Same [S15] |
| Install | Share → Add to Home Screen [S18] | n/a (already installed) | Menu "Install" / "Add to Home Screen", install prompt, `beforeinstallprompt` (Chrome 44+) [S2][S19][S20] | n/a (WebAPK on Google Mobile Services devices) [S20] |
| Manifest `display: standalone` | n/a | Yes, iOS 11.3+ [S21] | n/a | Yes [S21] |
| Manifest `display: fullscreen` / `minimal-ui` | n/a | **Not supported** per MDN [S21] | n/a | Yes [S21] |
| Orientation lock (manifest `orientation` or `screen.orientation.lock()`) | **No** [S2] | **No** [S21] | `lock()` Chrome 38+, typically only in fullscreen [S2][S10b] | Manifest `orientation` supported [S21] |

## Details

### 1. Screen Wake Lock
- The API prevents "devices from dimming or locking the screen" [S4]. It needs a secure context (HTTPS) [S1].
- **Versions:** Chrome 84 [S3]. Safari 16.4 [S4]. MDN's compat data flags iOS 16.4–18.3 as partial: "Does not work in standalone Home Screen Web Apps" [S2]. WebKit's 18.4 notes say it "now also works in Home Screen Web Apps on iOS and iPadOS 18.4" [S5]. So for (b) the minimum is **iOS 18.4**.
- **Lifecycle:** the lock is released automatically when the page becomes hidden or inactive. Re-request it on `visibilitychange` when the page is visible again [S1][S3]. The system can also release it, for example on low battery [S1].
- Feature-detect with `'wakeLock' in navigator` and carry on silently without it [S1].

### 2. Vibration / haptics
- `navigator.vibrate`: Chrome Android 32+. From Chrome 55 it's blocked in cross-origin iframes, and from Chrome 60 it "requires a user gesture. Otherwise it returns `false`" [S2]. Safari: `version_added: false`, on iOS too [S2]. MDN marks the API "Limited availability" [S6].
- **iOS alternative:** "WebKit for Safari on iOS 18 adds haptic feedback for `<input type=checkbox switch>`" [S7]. That tick fires when the user toggles a real switch control. No primary source says a page can trigger it from script, so don't count on it as a general haptics API. **No general-purpose web haptics API on iOS was found.**
- Safari 26.4's feature list says nothing about vibration or haptics [S35].

### 3. Hiding the word when backgrounded; screenshots
- **`visibilitychange`** fires with `hidden` when the user "switches tabs, closes the tab, minimizes or closes the browser, or, on mobile, switches from the browser to a different app" [S8]. Chrome's Page Lifecycle guide calls the move to hidden "often the last state change that's reliably observable". On mobile, `pagehide` and `unload` may never fire [S9]. So **use `visibilitychange`, not `pagehide`, as the hide trigger.** `pagehide` can be a secondary listener.
- **App-switcher snapshot:** for native apps, Apple documents that "UIKit takes a snapshot of your app's current user interface" after the app enters the background, and tells apps to remove sensitive information before that [S10]. **No Apple or WebKit source says whether a page's `visibilitychange` handler runs before Safari or a Home Screen web app is snapshotted.** Android's equivalent behaviour for Chrome or WebAPKs isn't documented for web content either. Treat both as unknown and test on real devices: reveal a word, swipe to the app switcher, and look.
- **Screenshot and recording blocking/detection:** native-only. Android's `FLAG_SECURE` treats a window "as secure, preventing it from appearing in screenshots" [S12]. iOS's `UIScreen.isCaptured` reports "whether the system is actively cloning the screen to another destination" [S11]. Neither is exposed to web pages. No MDN or spec API for blocking or detecting screenshots was found. **Confirmed for practical purposes: a web app can't block or detect screenshots or screen recording.** For a party game that's acceptable, since the threat is a glance, not an attack.

### 4. Offline via service worker
- **Support:** Safari 11.1 / iOS 11.3 and Chrome 40 [S2]. That covers all four contexts. The service-worker cache counts toward the same origin quota as other storage [S13].
- **iOS caveats:**
  - In a Safari tab, ITP's 7-day rule deletes "Service Worker registrations and caches" along with IndexedDB and localStorage, after seven days of Safari use without the user interacting with the site [S14]. If that happens, the next visit needs the network once to re-cache.
  - Home Screen web apps "have their own counter of days of use" [S14].
  - WebKit also evicts whole origins in LRU order under storage pressure or after a period without use. Origins with an active page or in persistent mode are excluded [S13].
  - At ~50 KB of data plus a small JS bundle, quota is a non-issue (origin quota up to 60% of disk in Safari 17+ browser apps) [S13].
- **Third-party iOS browsers** (Chrome for iOS etc.): MDN's compat data marks service workers as unsupported in iOS WebView [S2]. Whether offline works in a Chrome-for-iOS **tab** isn't confirmed by a primary source here. Tell iPhone friends to use Safari, or a Home Screen install.
- **Android:** Chrome evicts best-effort data "from the least recently used origin first" only when space runs out. Persistent storage "is not automatically cleared when storage is low" [S15].

### 5. Storage persistence
- **The 7-day cap (WebKit, 2020):** IndexedDB, LocalStorage, SessionStorage, media keys, and service-worker registrations and caches are deleted after seven days of Safari use without user interaction on the site [S14]. For Home Screen web apps: "Web applications added to the home screen are not part of Safari and thus have their own counter of days of use… We do not expect the first-party in such a web application to have its website data deleted" [S14]. web.dev puts it more bluntly: the cap "does not apply to installed PWAs" [S15].
- **Storage policy (Safari 17+, WebKit 2023):**
  - Origin quota is up to 60% of total disk for browser apps. Overall quota is up to 80% [S13].
  - Home Screen web apps get "the same origin quota and overall quota as when it is opened in a browser app" [S13].
  - Eviction works per origin, in LRU order. Origins start in "best-effort mode". `persist()` asks for persistent mode, and "WebKit currently grants a request based on heuristics like whether the website is opened as a Home Screen Web App" [S13]. No other heuristic is published.
- **Separate storage on iOS:** each Home Screen install "will have its own isolated storage, and it will be treated as a different app" [S20]. **History built up in a Safari tab doesn't carry over to the Home Screen app** (or back).
- **Chrome:** `persist()` since 55. No prompt: "if a site is considered important, the persistent storage permission is automatically granted, otherwise it is silently denied". The heuristics are site engagement, whether the site is installed or bookmarked, and notification permission [S16]. A denied request can be retried later [S16].
- **Quotas:** Chrome allows up to 60% of disk per origin [S15]. Safari is as above [S13]. `storage.estimate()` is Safari 17+ and returns a deliberately fuzzy quota [S2][S13].

### 6. Install flow and manifest
- **iOS (Safari):** Share (or Page Menu → Share) → **Add to Home Screen** → turn on **Open as Web App** → Add [S18].
  - iOS 26: "By default, every website added to the Home Screen opens as a web app", and "there are now zero requirements for 'installability' in Safari". Manifest icons are used if present [S17].
  - Since iOS 16.4, third-party browsers can offer Add to Home Screen in their Share menu [S4], and WebKit supports manifest `id` [S4][S21].
  - **No install prompt or `beforeinstallprompt` on iOS** [S2][S20], so the app has to show its own "how to add" hint.
- **Android (Chrome):** install criteria are HTTPS, a manifest with `name`/`short_name`, `icons` (192 and 512 px), `start_url`, `display` of `fullscreen`/`standalone`/`minimal-ui`/`window-controls-overlay`, no `prefer_related_applications: true`, not already installed, and at least one tap plus 30 seconds on the page [S19].
  - Once these are met, Chrome fires `beforeinstallprompt` (Chrome 44+), which lets you show your own install button [S2][S19].
  - Users can always install manually from the menu ("Install" or "Add to Home Screen") [S19][S20].
  - On devices with Google Mobile Services, Chrome mints a **WebAPK** and installs it silently [S20].
- **Display and orientation:**
  - iOS supports `display: standalone` (11.3+). MDN lists `fullscreen` and `minimal-ui` as unsupported in Safari [S21].
  - Manifest `orientation` and `screen.orientation.lock()` are unsupported in Safari/iOS [S2][S21]. WebKit called `lock()` experimental back in 16.4 [S4], and later Safari releases haven't been checked for a change beyond what MDN's compat data shows.
  - Chrome supports manifest `orientation` [S21]. `lock()` is "typically… only enabled on mobile devices, and when the browser context is full screen" [S10b].
  - **Design for portrait without relying on a lock.**

### 7. Lightest web stack
| Option | What you get | Fit for this app |
|---|---|---|
| Vite + vanilla TS | `vanilla-ts` template [S22]. Zero runtime | Smallest output. You hand-write DOM updates for every screen change (setup → reveal loop → discuss → vote → result) |
| **Vite + Preact (TS)** | `preact-ts` template [S22]. "Fast 3kB alternative to React" [S25] | Components and state for a handful of screens at negligible size. vite-plugin-pwa has a Preact template [S23] |
| SvelteKit (static) | Compiled components. SPA via `adapter-static` + `ssr = false` + a fallback page [S27]. Own service-worker convention [S26] | Works, but routing, SPA-mode caveats (extra round trips, fallback file) and its own SW model are overhead a one-page offline game doesn't need [S26][S27]. Plain Svelte + Vite (`svelte-ts` template [S22]) is lighter |
| **vite-plugin-pwa** | Generates the manifest, a Workbox-built service worker and the registration script [S23]. `generateSW` (default, no SW code to write) or `injectManifest` (custom SW) [S24] | Use `generateSW` to precache the app shell and the JSON |

- **Updates:** vite-plugin-pwa's `registerType: 'prompt'` (default) asks the user before updating. `autoUpdate` reloads in the background [S24].
  - **Use `prompt`, or apply updates only on the home screen.** A silent reload mid-round would wipe the game.
- Vite needs Node 20.19+ or 22.12+ [S22].
- **Recommendation:** Vite + Preact + TypeScript + vite-plugin-pwa (`generateSW`, `registerType: 'prompt'`). Import the dataset as a JSON module so it's bundled and precached with the app. Go vanilla TS instead only if you want zero dependencies and accept more DOM code.

### 8. Free static hosting with HTTPS
| Host | HTTPS | Free-tier limits from the host's docs |
|---|---|---|
| **GitHub Pages** | `github.io` sites served over HTTPS automatically. "Enforce HTTPS" option [S29] | Free accounts: **public repos only** [S30]. Published site ≤ 1 GB. Soft 100 GB/month bandwidth. Soft 10 builds/hour (not applied to custom Actions workflows). Not for running a business [S28] |
| **Cloudflare Pages** | Not re-checked here | 500 builds/month, 20,000 files per site, 25 MiB per file, 100 projects per account. Bandwidth limit not stated [S31] |
| **Netlify (Free)** | Custom domains with SSL [S32] | 300 credits/month, bandwidth costs 20 credits/GB, production deploy 15 credits [S32]. When credits run out, **all projects are paused** ("Site not available") until the balance resets [S33] |
| **Vercel (Hobby)** | Not re-checked here | 100 GB Fast Data Transfer, 1M CDN requests/month, 100 deployments/day. Over the limit, wait 30 days. **Non-commercial personal use only** [S34] |

- Any of these serves a ~100 KB static PWA for a friend group without coming close to the limits.
- **GitHub Pages** is simplest if the repo can be public. A project site lives under `/<repo>/`, so Vite's `base` and the manifest `start_url`/`scope` must match. That's general Vite/manifest behaviour, not re-checked here.
- **Cloudflare Pages** if the repo should stay private. Its plan rules on private repos weren't checked here.
- Netlify's pause-on-exhaustion makes it slightly riskier on Free.

## Implications for this game

### Reveal flow
- **Tap-and-hold to reveal, release to hide.** The word is visible only while the finger is down, so a player can't walk off with it showing or hand over the phone mid-reveal. This doesn't depend on any API that varies by platform. Add a fallback "tap to show, tap to hide" toggle for accessibility, with an auto-hide timer.
- **Auto-hide on `visibilitychange` → `hidden`** (plus `pagehide` as a secondary): replace the word with the neutral "pass the phone" screen synchronously in the handler [S8][S9]. Whether the iOS or Android app-switcher snapshot captures the hidden or revealed state is undocumented. **Test it on an iPhone and an Android phone before relying on it.** If the snapshot still leaks, the tap-and-hold design already makes it rare, since the finger lifts to switch apps.
- **Screenshots can't be blocked or detected on the web** [S11][S12]. Accept it. This is a party game among friends.
- **Wake lock:** request it when a round starts, re-request on every return to `visible`, release it at round end [S1][S3]. On iPhones below iOS 18.4 in Home Screen mode it silently does nothing [S2][S5]. Feature-detect, and don't show an error.
- **Haptics:**
  - Call `navigator.vibrate(30)` inside the reveal touch handler on Android. It needs that user gesture [S2].
  - Do nothing on iPhone. `vibrate` doesn't exist there [S2], and the switch-control tick [S7] doesn't fit a hold-to-reveal gesture.
  - Never make haptics the only feedback. Pair them with a visual change.
- **Orientation:** design portrait-only layouts that still survive rotation. Locking isn't available on iOS [S2][S21].

### Repeat avoidance (played-pair history)
- **Where:** a small `localStorage` key (a JSON array of pair ids, capped at a few hundred) is enough. IndexedDB has the same eviction rules [S14], so it offers no durability advantage at this size. Wrap reads and writes in try/catch.
- **Request persistence:** call `navigator.storage.persist()` once after the first completed game. Chrome grants it silently for installed or engaged sites [S16]. Safari's grant leans on Home Screen status [S13].
- **If it's evicted:** handle an empty history the same as a fresh install. Repeats just become possible again, which is acceptable per the brief. Optionally show "history was reset" when `persisted()` is false and the history is unexpectedly empty.
- **iOS Safari tab is the risky context.** Seven days of Safari use without opening the game wipes the history and the offline cache [S14].
- **Encourage Add to Home Screen on iPhone.**
  - On iOS, detect a non-standalone launch (`navigator.standalone` or `display-mode: standalone` media query; not re-verified here) and show a one-time card: "Share → Add to Home Screen → Open as Web App" [S18].
  - On Android, show an Install button from `beforeinstallprompt` [S19].
  - Tell users that history doesn't carry over from the Safari tab to the Home Screen app [S20]. The game is single-device anyway, so starting fresh after install is fine.
- **Single-device model helps:** only the host phone's history matters, so there's nothing to sync. Avoid a backend.

## Sources

- [S1] MDN: Screen Wake Lock API: https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
- [S2] MDN browser-compat-data (api/WakeLock, Navigator.wakeLock, Navigator.vibrate, ScreenOrientation.lock, StorageManager.persist/estimate, ServiceWorkerContainer, BeforeInstallPromptEvent): https://github.com/mdn/browser-compat-data/tree/main/api
- [S3] Chrome for Developers: Stay awake with the Screen Wake Lock API (Chrome 84, released when hidden): https://developer.chrome.com/docs/capabilities/web-apis/wake-lock
- [S4] WebKit: WebKit Features in Safari 16.4 (Wake Lock, third-party Add to Home Screen, manifest id, orientation lock experimental): https://webkit.org/blog/13966/webkit-features-in-safari-16-4/
- [S5] WebKit: WebKit Features in Safari 18.4 (Wake Lock in Home Screen Web Apps): https://webkit.org/blog/16574/webkit-features-in-safari-18-4/
- [S6] MDN: Vibration API: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
- [S7] WebKit: WebKit Features in Safari 18.0 (haptic feedback for switch control on iOS 18): https://webkit.org/blog/15865/webkit-features-in-safari-18-0/
- [S8] MDN: Document: visibilitychange event: https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
- [S9] Chrome for Developers: Page Lifecycle API: https://developer.chrome.com/docs/web-platform/page-lifecycle-api
- [S10] Apple Developer: Preparing your UI to run in the background (app-switcher snapshot): https://developer.apple.com/documentation/uikit/preparing-your-ui-to-run-in-the-background
- [S10b] MDN: ScreenOrientation.lock(): https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
- [S11] Apple Developer: UIScreen.isCaptured: https://developer.apple.com/documentation/uikit/uiscreen/iscaptured
- [S12] Android Developers: WindowManager.LayoutParams.FLAG_SECURE: https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE
- [S13] WebKit: Updates to Storage Policy (Safari 17 quotas, eviction, persist heuristics): https://webkit.org/blog/14403/updates-to-storage-policy/
- [S14] WebKit: Full Third-Party Cookie Blocking and More (7-day cap; Home Screen apps' own counter): https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
- [S15] web.dev: Storage for the web: https://web.dev/articles/storage-for-the-web
- [S16] web.dev: Persistent storage: https://web.dev/articles/persistent-storage
- [S17] WebKit: WebKit Features in Safari 26.0 (every Home Screen site opens as a web app; zero installability requirements): https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- [S18] Apple Support: Turn a website into an app in Safari on iPhone: https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios
- [S19] web.dev: Installation criteria / beforeinstallprompt: https://web.dev/articles/install-criteria
- [S20] web.dev Learn PWA: Installation (Android menu/WebAPK, iOS isolated storage): https://web.dev/learn/pwa/installation
- [S21] MDN browser-compat-data (manifests/webapp: display, orientation, id): https://github.com/mdn/browser-compat-data/tree/main/manifests/webapp
- [S22] Vite: Getting Started (templates, Node requirement): https://vite.dev/guide/
- [S23] vite-plugin-pwa: Getting Started: https://vite-pwa-org.netlify.app/guide/
- [S24] vite-plugin-pwa: Service worker strategies and behaviors: https://vite-pwa-org.netlify.app/guide/service-worker-strategies-and-behaviors.html
- [S25] Preact (homepage, "Fast 3kB alternative to React"): https://preactjs.com/
- [S26] SvelteKit: Service workers: https://svelte.dev/docs/kit/service-workers
- [S27] SvelteKit: Single-page apps: https://svelte.dev/docs/kit/single-page-apps
- [S28] GitHub Docs: GitHub Pages limits: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- [S29] GitHub Docs: Securing your GitHub Pages site with HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- [S30] GitHub Docs: Creating a GitHub Pages site (plan availability): https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- [S31] Cloudflare Docs: Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- [S32] Netlify: Pricing: https://www.netlify.com/pricing/
- [S33] Netlify Docs: How credits work (Free plan pause): https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- [S34] Vercel Docs: Hobby plan: https://vercel.com/docs/plans/hobby
- [S35] WebKit: WebKit Features for Safari 26.4 (checked; nothing on web apps, vibration, wake lock or orientation): https://webkit.org/blog/17862/webkit-features-for-safari-26-4/
