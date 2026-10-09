# Research: cross-platform framework for an offline pass-and-play app

_Researched 2026-10-09 against official docs. Versions current as of that date: **Expo SDK 57** (React Native 0.86, released 2026-06-30), **Flutter 3.47** (announced 2026-08-12), **Compose Multiplatform 1.12.1**._

## Summary

The app is small and fully offline. It runs on one device, ships ~400 bundled word pairs, and needs four device features: haptics, keep-awake, screenshot/app-switcher hiding and sideload-style distribution to friends. **Expo (React Native) and Flutter both cover every requirement.** None of them is a blocker. The choice comes down to language preference and the dev loop.

**Recommendation: Expo (managed workflow, SDK 57+), using a development build.**

- All three device features are **first-party Expo modules** with documented iOS and Android behaviour: `expo-haptics`, `expo-keep-awake` and `expo-screen-capture`. Flutter has haptics built in, but keep-awake and screenshot/app-switcher protection come from community packages.
- You can start in **Expo Go** with zero native toolchain, because all three modules are included in Expo Go. Later you move to a dev build.
- **EAS Build** produces a shareable install link: an APK for Android, and an ad hoc IPA for registered iPhones. It runs in the cloud on a free tier of 15 iOS + 15 Android builds a month, so you rarely have to fight Xcode/Gradle signing.
- The ~400-pair JSON is a plain `import` (Metro treats `.json` as source by default).

**Trade-offs and when to pick Flutter instead.**

- Pick Flutter if you would rather write Dart than TypeScript, or want pixel-identical custom UI and animation on both platforms.
- Flutter's hot reload on a physical device is excellent, and its Android/iOS release tooling is entirely local, with no cloud service.
- Its costs here: you depend on community packages (`wakelock_plus`, `no_screenshot`), and you need Xcode + CocoaPods/SwiftPM + Rosetta set up from day one.
- Flutter is mid-transition right now: Material/Cupertino are moving into separate packages, CocoaPods is in maintenance mode while SwiftPM migrates, and the UIScene lifecycle is now required for Xcode 27.

**Costs that are the same for every framework:**

- **iOS distribution to friends needs the $99/yr Apple Developer Program.** That covers TestFlight or ad hoc (max 100 iPhones/yr). A free Apple ID only gives 7-day installs on your own ≤3 devices.
- **Android sideloading is getting stricter.** Google's developer verification starts 2026-09-30 in BR/ID/SG/TH and goes global in 2027. A free "limited distribution" account covers up to 20 devices, which is enough for a friend group.

Compose Multiplatform (stable on iOS since 1.8.0, May 2025) is viable, but it is only worth considering if you already know Kotlin. Its iOS side still needs Xcode and has fewer ready-made plugins for this feature set.

## Comparison table

| Criterion | Expo / React Native (SDK 57, RN 0.86) | Flutter (3.47) | Compose Multiplatform (1.12.1) |
|---|---|---|---|
| Language | TypeScript/JS | Dart | Kotlin |
| Setup cost (Apple Silicon Mac) | Node + `create-expo-app`. You can start with **no Xcode/Android Studio** via Expo Go or EAS cloud builds. Xcode is needed only for local iOS builds | Flutter SDK, Xcode, CocoaPods (SwiftPM migrating), **Rosetta 2**, Android Studio; `flutter doctor` | Android Studio/IntelliJ + KMP plugin, Xcode, JDK. Heaviest |
| Real-phone dev loop | Expo Go: scan a QR code and you get Fast Refresh. Or a dev build (`npx expo run:ios --device`, or EAS) and then JS-only reloads | `flutter run` on a USB/wireless device, with stateful **hot reload** (~1 s in the docs sample). iOS needs Xcode signing (a free Personal Team works) | Android has a good loop. iOS goes through Xcode, and its hot reload is less mature |
| Bundling static JSON | `import pairs from './pairs.json'` (Metro `sourceExts` includes `json`). Compiled into the JS bundle | Declare it under `flutter: assets:` in pubspec, then `rootBundle.loadString()` + `jsonDecode` | Compose resources (`composeResources/files`) |
| Haptics | `expo-haptics` (first-party): `impactAsync`, `notificationAsync`, `selectionAsync`, `performAndroidHapticsAsync` | Built-in `HapticFeedback` (`lightImpact`, `successNotification`, …). Terse, platform default | Platform-specific `expect/actual`, or a library |
| Keep screen awake | `expo-keep-awake` (first-party): `useKeepAwake()` hook | `wakelock_plus` 1.8.1 (Flutter Community, verified publisher; published 2026-09-29) | `expect/actual` (`FLAG_KEEP_SCREEN_ON` / `isIdleTimerDisabled`) |
| Hide content (screenshots / app switcher) | `expo-screen-capture` (first-party). `usePreventScreenCapture()` blocks screenshots/recording. On Android, FLAG_SECURE also hides the Recents preview. On iOS, `enableAppSwitcherProtectionAsync()` blurs the app-switcher snapshot. Also has a screenshot listener | `no_screenshot` 2.0.1 (verified publisher, 2026-08-08): prevention plus image/blur/color overlay in the app switcher on iOS and Android, and recording detection. Requires Flutter ≥3.44. Alternative: `screen_protector` 1.5.3 | Hand-written native code on each platform |
| App size | Larger baseline: RN runtime + Hermes. A trivial app is typically tens of MB in a universal APK; per-device store downloads are smaller (not benchmarked in official docs) | Engine + AOT code. The official (old, 1.17) sample is ~5.4 MB download / 13.7 MB installed on iOS. `--split-per-abi` shrinks APKs | Android is small (native Compose). iOS bundles the Skia/Kotlin runtime |
| Android to friends | EAS `distribution: internal` gives an APK + install URL. Or a local `npx expo run:android --variant release` (you sign it yourself) | `flutter build apk --split-per-abi` (sign with your own keystore), then share the file or use `flutter install` | Gradle `assembleRelease` |
| iOS to friends | EAS internal (ad hoc, UDID registration via `eas device:create`, 100 devices/yr) or EAS Submit → TestFlight. **Paid Apple account required** | `flutter build ipa` → TestFlight / ad hoc via Xcode. **Paid Apple account required** | Same as Flutter (Xcode) |
| Overall fit | **Best**: every feature first-party, cloud builds, easiest distribution | Very good, with more community dependencies | Only if you already know Kotlin |

## Details

### Versions and release status
- **Expo SDK 57** was released on 2026-06-30. It moved React Native 0.85 → 0.86 and kept React 19.2. Two early regressions were fixed in later patches: Hermes V1 memory was fixed in `expo@57.0.9`, and slow dev startup in `expo@57.0.17`.
- When SDK 57 launched, the Expo Go build for it was waiting on App Store approval, and iOS devices could use it through `eas go`. expo.dev/go now lists SDK 57 as the latest version.
- The Expo versions page already lists a v58 docs selector, so SDK 58 is in preview or close to release. SDK 58 uses the UIScene life cycle by default. Apps built with the iOS 27 SDK need that life cycle to launch on iOS 27. SDK 57 makes it opt-in via `ios.enableSceneSupport`.
- **Flutter 3.47** was announced on 2026-08-12, and 3.50 is scheduled for November 2026. Changes in 3.47:
  - iOS minimum raised to 15, macOS minimum to 12.
  - The UIScene lifecycle is now mandatory for Xcode 27 builds. The CLI migrates most apps automatically.
  - CocoaPods is in maintenance mode, and 92 of the top 100 iOS plugins are on SwiftPM.
  - Material/Cupertino are moving to the separate `material_ui` / `cupertino_ui` packages. This is opt-in now; the in-SDK versions are slated for deprecation in November.
  - Intel Mac hosts are being phased out. That doesn't matter on Apple Silicon.
  - Android defaults are now compile/target SDK 36, minSdk 24, and AGP 9.1.
- **Compose Multiplatform**: 1.12.1 is the latest stable. iOS support has been "stable and production-ready" since 1.8.0 (May 2025), and its minimum is iOS 14.

### Setup cost
- **Expo**: create the project with `npx create-expo-app`. Install Expo Go on the phone and scan the QR code from `npx expo start`. No Xcode is needed until you want a local native build. EAS Build can build iOS and Android in the cloud: 15 + 15 builds/month free, on a low-priority queue.
- **Flutter**: the official macOS guide requires:
  - Xcode (keep current) and CocoaPods 1.16
  - **Rosetta 2 on Apple Silicon** (`softwareupdate --install-rosetta`)
  - Android Studio for Android
  - `flutter doctor` to verify
- **Free Apple ID caveat (all frameworks)**: a Personal Team can sideload to your own iPhone through Xcode. Profiles expire every **7 days**, and you're limited to 3 devices and 10 App IDs. This is fine for your own testing but useless for friends.

### Local dev loop on a real phone
- **Expo Go**: the fastest start. All three needed modules (haptics, keep-awake, screen-capture) are "included in Expo Go", so you could build the whole game without a native build.
- **Expo dev build**: Expo recommends this for real apps.
  - Run `npx expo run:ios --device` (needs Developer Mode on the iPhone and a unique bundle ID) or build it with EAS.
  - After that, JS changes reload instantly. Rebuild only when you add native modules.
  - The docs note that a local build is "the only way to install a development build on an iPhone without a paid Apple Developer account".
- **Flutter**: `flutter run` on a USB or wireless device (iOS 16+ needs Developer Mode, and you trust the dev certificate). Hot reload keeps state; the docs sample shows "Reloaded 1 of 448 libraries in 978ms". Native code changes need a full restart.

### Bundling ~400 word pairs
This is trivial in every option (~20–40 KB of JSON).
- **Expo/RN**: Metro's default `resolver.sourceExts` is `['js','jsx','json','ts','tsx']`, so `import data from './pairs.json'` inlines the data into the JS bundle with type inference. You don't need `expo-asset`.
- **Flutter**: list the file under `flutter: assets:` in `pubspec.yaml` (indented exactly two spaces), then load it with `rootBundle.loadString('assets/pairs.json')` or `DefaultAssetBundle.of(context)`. Alternatively, embed it as a Dart `const` list.

### Haptics
- **Expo**: `expo-haptics` works on Android (Vibrator), iOS 10+ (Taptic Engine) and web.
  - On Android, prefer `performAndroidHapticsAsync`, because `impactAsync` and `notificationAsync` are simulated there.
  - iOS haptics do nothing in Low Power Mode, when the user has turned them off, while the camera is active, or during dictation.
- **Flutter**: the built-in `HapticFeedback` (services library) has `lightImpact`, `mediumImpact`, `heavyImpact`, `selectionClick`, `success`/`warning`/`errorNotification` and `vibrate`. It's "intentionally terse", but enough for a party game.

### Keeping the screen awake
- **Expo**: `useKeepAwake()` keeps the screen on while the component is mounted. `activateKeepAwakeAsync(tag)` / `deactivateKeepAwake(tag)` give imperative control. Supported on Android, iOS, tvOS and web.
- **Flutter**: `WakelockPlus.enable()` / `disable()` / `toggle(enable:)`. It holds a screen-only wakelock, so it needs no permissions.

### Hiding the private word reveal
This is the most important feature for the "pass the phone" reveal.
- **Expo `expo-screen-capture`**:
  - `usePreventScreenCapture()` or `preventScreenCaptureAsync(key)` blocks screenshots and recordings. On iOS, recording blocking needs iOS 11+ and screenshot blocking needs iOS 13+.
  - On Android it uses FLAG_SECURE, which **also hides the app in Recents**.
  - On iOS, `enableAppSwitcherProtectionAsync(blurIntensity)` blurs the app-switcher, background and interruption snapshot.
  - `addScreenshotListener` detects screenshots taken while the app is foregrounded.
  - Caveat: detecting screenshots on Android ≤13 needs a media permission. Skip detection and just prevent capture.
- **Flutter `no_screenshot` 2.0.1**: offers screenshot and recording prevention, plus image, blur or color overlays in the app switcher on both platforms, and recording start/stop detection.
  - iOS caveats: protection attaches lazily on the first call. A custom scene delegate must subclass `FlutterSceneDelegate`. The image overlay needs a `NoScreenshotImage` asset.
- **Flutter `screen_protector` 1.5.3**: the alternative package. Versions 1.4.4–1.4.13 had crash issues, and full Android 12+ protection needs extra native setup.
- **Simple, framework-agnostic backup**: also blank the word in UI whenever the app state goes to `inactive`/`background`. Use RN `AppState` or Flutter `AppLifecycleListener`.

### App size
Neither framework publishes a current "hello world" baseline. For a 400-pair word game, the dataset is negligible, so size is dominated by the runtime.
- **Flutter**: the only official figure is old (Flutter 1.17 demo: ~5.4 MB download / 13.7 MB installed on iOS). Measure with `--analyze-size`. Use `flutter build apk --split-per-abi` to avoid a fat APK when sideloading.
- **React Native**: ships the Hermes engine plus the RN runtime. A universal APK is typically larger than a per-ABI Flutter APK. Store-delivered (AAB / App Thinning) sizes are comparable. Size shouldn't decide this choice.

### Distributing to friends without a public store listing
- **iOS (any framework)**: requires the **Apple Developer Program, $99/yr**. Options:
  - **TestFlight**: up to 100 internal testers (who must be on your App Store Connect team) or up to 10,000 external testers, invited by email or a public link. External testers require the first build to pass TestFlight App Review. TestFlight builds expire after 90 days; Apple's TestFlight page doesn't state this, but it is long-standing App Store Connect behaviour. This is the most friend-friendly option, since there's no UDID collection.
  - **Ad hoc**: max 100 iPhones per year, UDIDs registered up front, and a rebuild or re-sign each time you add a device.
  - With Expo, `eas device:create` handles UDID registration via a link, and `eas build` with `"distribution": "internal"` gives an install URL. `eas submit` pushes to TestFlight.
- **Android**:
  - **Expo**: EAS internal distribution builds an **APK** with a shareable URL, and testers accept an "unverified app" warning. For local builds, `npx expo run:android --variant release` produces an unsigned build that you sign yourself.
  - **Flutter**: `flutter build apk --split-per-abi`, signed with your own upload keystore. Share the file, or use `flutter install` over USB.
- **New in 2026, Android developer verification**:
  - Limited distribution accounts launched in August 2026. Enforcement starts **2026-09-30** for certified devices (Android 7+) in Brazil, Indonesia, Singapore and Thailand, and goes **global in 2027**.
  - A **free limited-distribution account** (no ID, no fee) lets you share with **up to 20 devices**. That fits a friend group.
  - Power users can also go through an "advanced flow" (developer mode, a one-day wait, then biometric confirmation) to install unverified apps.
  - Register the app via the Android Developer Console before the rule reaches your region. Google's pages don't say whether ADB installs are exempt.

## Sources
- Expo SDK versions table: https://docs.expo.dev/versions/latest/
- Expo SDK 57 changelog (2026-06-30): https://expo.dev/changelog/sdk-57
- Expo Go download: https://expo.dev/go
- expo-screen-capture: https://docs.expo.dev/versions/latest/sdk/screen-capture/
- expo-keep-awake: https://docs.expo.dev/versions/latest/sdk/keep-awake/
- expo-haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Expo development builds: https://docs.expo.dev/develop/development-builds/introduction/
- Expo local app development: https://docs.expo.dev/guides/local-app-development/
- Expo workflow overview: https://docs.expo.dev/workflow/overview/
- Expo environment setup: https://docs.expo.dev/get-started/set-up-your-environment/
- Expo assets: https://docs.expo.dev/develop/user-interface/assets/
- EAS internal distribution: https://docs.expo.dev/build/internal-distribution/
- EAS Build setup: https://docs.expo.dev/build/setup/
- Expo pricing (free tier): https://expo.dev/pricing
- Metro configuration (`sourceExts`): https://metrobundler.dev/docs/configuration/
- Flutter release notes index: https://docs.flutter.dev/release/release-notes
- Flutter 3.47 release notes: https://docs.flutter.dev/release/release-notes/release-notes-3.47.0
- What's new in Flutter 3.47 (2026-08-12): https://flutter.dev/blog/whats-new-in-flutter-3-47
- Flutter release archive / schedule: https://docs.flutter.dev/release/archive
- Flutter macOS iOS setup: https://docs.flutter.dev/get-started/install/macos/mobile-ios
- Flutter hot reload: https://docs.flutter.dev/tools/hot-reload
- Flutter assets: https://docs.flutter.dev/ui/assets/assets-and-images
- Flutter app size: https://docs.flutter.dev/perf/app-size
- Flutter Android release build: https://docs.flutter.dev/deployment/android
- Flutter HapticFeedback API: https://api.flutter.dev/flutter/services/HapticFeedback-class.html
- wakelock_plus: https://pub.dev/packages/wakelock_plus
- no_screenshot: https://pub.dev/packages/no_screenshot
- screen_protector: https://pub.dev/packages/screen_protector
- Compose Multiplatform compatibility: https://kotlinlang.org/docs/multiplatform/compose-compatibility-and-versioning.html
- Compose Multiplatform 1.8.0 (iOS stable): https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/
- Apple TestFlight: https://developer.apple.com/testflight/
- Apple membership comparison: https://developer.apple.com/support/compare-memberships/
- Android developer verification: https://developer.android.com/developer-verification
- Android developer verification blog (2026-03): https://android-developers.googleblog.com/2026/03/android-developer-verification.html
