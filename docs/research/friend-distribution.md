# Research: getting the app onto friends' phones without a store release

_Researched 2026-10-09 against primary sources: Apple Developer, Google/Android Developers, Play Console Help, Expo docs. Context: an individual developer in India with roughly 5–15 friends on a mix of iPhone and Android._

## Summary

- **iPhone friends need the paid Apple Developer Program (US$99/yr, billed in local currency).** No free route works for a group: free provisioning with a personal Apple ID covers only 3 devices, the install lasts 7 days, and each phone has to be cabled to your Mac. The EU and Japan sideloading changes apply only to users in those regions, so they don't help friends in India.
- **TestFlight is the easiest iOS option once you're paying.** Friends join with a public link and install through the TestFlight app. Each build lasts 90 days, and only the first build sent to external testers needs a light beta review. The other paid route, ad hoc, has no review but needs every friend's UDID registered (100 iPhones per membership year), and you rebuild whenever someone new joins.
- **Android is free and has no friction today.** Share an APK link, and friends allow "install unknown apps". Google's developer-verification rules don't reach India in 2026. Enforcement started 30 Sep 2026 only in Brazil, Indonesia, Singapore and Thailand, and the **global rollout is planned for 2027**. To be ready for that, register a free **Limited Distribution** account (up to 20 devices, no ID, no fee) or a $25 full account.
- **Expo EAS internal distribution** wraps both platforms in one shareable install URL. It builds an APK for Android and an ad hoc build for iOS. The free plan includes 15 iOS + 15 Android builds a month.

### Recommended path for ~5–15 friends

1. **Android friends:** build an APK (`eas build --profile preview` with internal distribution, or a local Gradle build) and share the link. Cost ₹0. Before 2027, create a free Android Developer Console **Limited Distribution** account and register your package name, so installs keep working after global enforcement. 20 devices covers this group. Above that, the full account costs $25 one-time.
2. **iPhone friends:** pay for the Apple Developer Program (individual). In India you can only enroll through the Apple Developer app, and the price shown there is the INR price. Use **TestFlight with a public link**: no UDID collection, 90-day builds, and friends install the TestFlight app and tap the link. Ad hoc through EAS is the fallback if you want to skip beta review or iterate faster without waiting on review.
3. Skip free Apple ID provisioning, except for your own phone.

## Comparison table

| Method | Platform | Cost | How long an install lasts | Tester/device limits | Friction for friends |
|---|---|---|---|---|---|
| Free provisioning (personal Apple ID, Xcode Personal Team) | iOS | Free (needs a Mac + Xcode) | **7 days**, then the app stops launching until you rebuild and reinstall | **3 devices** per platform; 10 App IDs, each expiring after 7 days | Very high: each phone is cabled to your Mac, Developer Mode turned on, reinstalled every week |
| TestFlight (external testers) | iOS | Apple Developer Program US$99/yr (INR price in the app) | Each build lasts **90 days**; installed apps keep working until the build expires | Up to **10,000** external testers; 30 devices per tester | Low: install the TestFlight app, tap a public link or email invite. First build needs beta app review |
| TestFlight (internal testers) | iOS | Same | 90 days | Up to **100** people, who must be App Store Connect users on your team | Medium: each friend has to be added to your developer team with a role. Fine for a co-dev, awkward for friends |
| Ad hoc distribution | iOS | US$99/yr | Until the provisioning profile expires (about a year) or the membership lapses | **100 iPhones per membership year**. Disabling a device doesn't free its slot; the count resets only at renewal | Medium: send your UDID (EAS automates this with a link and profile install), wait for a rebuild, install from a link |
| Expo EAS internal distribution | iOS + Android | EAS Free: 15 iOS + 15 Android builds a month, low-priority queue. Starter $19/mo. iOS still needs the $99 Apple program | iOS: same as ad hoc. Android: permanent | iOS: ad hoc's 100/yr. Android: unlimited (subject to the 2027 verification rules) | Low to medium: one URL per build. iOS friends register their device first with `eas device:create` |
| EU alternative marketplaces / Web Distribution; Japan marketplaces | iOS | $99 + Apple authorization, notarization, EU terms addendum | n/a | **Users in the EU (or Japan) only** | **Not usable for friends in India** |
| Direct APK sideload | Android | Free | Permanent | None today in India | Low: download, allow "install unknown apps", tap Install Anyway. From 2027 an unverified app needs registration or the 24-hour "advanced flow" |
| Android Limited Distribution account (developer verification) | Android | Free, no government ID | Permanent | **Up to 20 devices**, each authorized by its user (QR code or link handshake) | Low: friend accepts an invitation from "a developer you know" |
| Android Full Distribution account | Android | $25 one-time + government ID | Permanent | Unlimited | Lowest (normal sideload warning only) |
| Google Play internal testing | Android | $25 one-time Play Console fee (+ ID verification) | Permanent (installed and updated through Play) | Up to **100** testers by email | Low: opt-in link, install from Play Store. Needs a Google account. Play's light review; can be available within minutes |
| Google Play closed testing | Android | $25 one-time | Permanent | Email lists up to 2,000 users each, or Google Groups | Low. For new personal accounts it's also the gate to production: **12 testers opted in for 14 straight days** |

## Details

### Apple Developer Program: cost and what it unlocks
- **US$99 per membership year**, "in local currency where available". Enterprise is $299, which isn't relevant here.
- **India:** Apple doesn't publish an INR price. Its enrollment page says the local price is shown during enrollment, and that **enrollment in India is available only through the Apple Developer app**, not the web. Membership there is an auto-renewing annual subscription. Individuals need two-factor authentication, their legal name as the seller name, and their own credit card if paying by card. A secondary write-up converts $99 to about ₹9,500 at Sept-2026 rates; the actual app price may differ.
- **Unlocks:** App Store Connect (including TestFlight), ad hoc distribution "for testing and internal use", full capabilities and services. A free Apple Account gets only Xcode on-device testing, with the limits below.

### Free provisioning with a personal Apple ID
- Xcode Personal Team: **up to 10 App IDs and up to 3 test devices per platform, each expiring after 7 days**. Provisioning profiles expire 7 days after they're issued, so you have to rebuild and reinstall.
- Installs only by building from Xcode onto a connected device. That suits your own phone, not a friend group.

### TestFlight
- **External testers:** up to 10,000, invited by email or a **public link** (you can set criteria such as device and OS, and disable the link when it's full). Testers install the free TestFlight app and can use up to 30 devices.
- **Build expiry:** "You can test a build for up to 90 days." After that the build becomes unavailable to testers. Upload a new build to extend.
- **Beta App Review:** external testing needs a beta app description and review info. The **first build added to an external group goes to App Review**. Later builds may not need a full review.
- **Internal testers:** up to 100 App Store Connect users with roles on your team. No review, but every friend would have to join your developer team.

### Ad hoc distribution
- Up to **100 devices per product family (iPhone, iPad, etc.) per membership year**. Disabling a device does **not** free its slot. At the start of a new membership year you can remove devices and restore the count to 100.
- The ad hoc profile embeds the allowed UDIDs, so each new device means regenerating the profile and rebuilding or re-signing.
- With Expo: register devices with `eas device:create`, which generates a link or QR code that friends open to install a profile and report their UDID. After a new or renewed membership, Apple can take 24–72 hours to process new devices.

### EU / Japan sideloading: not relevant to India
- **EU (DMA):** alternative app marketplaces and **Web Distribution** (iOS 17.5+) exist only for apps distributed to **users in the 27 EU member states**. They need the Alternative Terms Addendum, Apple authorization and notarization. Apple says it doesn't offer these changes elsewhere.
- **Japan (MSCA):** from iOS 26.2 (announced 17 Dec 2025), Apple-authorized alternative marketplaces with notarization, **for users in Japan only**.
- India has no equivalent regime, so friends in India can't use any of these routes.

### Expo EAS internal distribution
- Gives a shareable install URL per build. Anyone with the URL can install by default; you can require sign-in to an Expo account instead.
- **Android:** produces an APK installable from the link (security warning because it skips Play review). Android App Bundles (AAB) must go through Play.
- **iOS:** ad hoc (paid Apple account, 100 iPhones/yr, UDID allow-list) or Enterprise (separate $299 program).
- **Pricing:** Free plan includes up to 15 Android + 15 iOS builds a month, low-priority queue, 1 concurrent build, 45-minute timeout. Starter is $19/mo + usage. Local builds (`eas build --local`) avoid the cloud quota. Expo's pricing page doesn't say explicitly whether internal distribution is on the Free plan, but the internal-distribution docs list no plan restriction.

### Android APK sideloading and developer verification (2026–2027)
- **Today in India:** sideloading an APK works as before. Users enable "install unknown apps" for their browser or chat app and accept a warning.
- **Google's developer verification:** apps on **certified Android devices** must come from a verified, registered developer "regardless of download source".
  - Jul 2026: early access for limited distribution. **Aug 2026:** Android Developer Console, Limited Distribution accounts and the power-user "advanced flow" launch globally.
  - **30 Sep 2026:** enforcement only in **Brazil, Indonesia, Singapore and Thailand**, for installs through participating stores (Google Play, Samsung Galaxy Store, Xiaomi GetApps, OPPO, vivo, Honor, Transsion). India isn't in the 2026 list.
  - **2027 onward:** global rollout to all apps on certified devices, including India.
- **Account types:**
  - **Limited Distribution:** free, no government ID. Needs a Google Account with 2-step verification, a payments profile (legal name and address) and a contact email. Allows **up to 20 devices** that end users explicitly authorize through a QR code or link handshake ("accept invitation to install from a developer you know").
  - **Full Distribution:** **$25** one-time + government ID. Unlimited.
  - You can upgrade Limited to Full but not downgrade.
- **Escape hatches:** **ADB installs are exempt** from verification. The **advanced flow** lets a power user install unverified apps after a one-time setup: Developer Mode on, an anti-coaching check, restart, a **24-hour wait**, then biometric confirmation, after which unverified installs are allowed for 7 days or indefinitely. That's too much to ask of casual friends, which is why registering matters after 2027.

### Google Play internal and closed testing
- **Play Console fee:** US$25 one-time. You may be asked for a government ID and a credit card in your legal name. New personal accounts must verify access to an Android device.
- **Internal testing:** up to 100 testers by email. Testers need a Google account and opt in with a link. It "might not be subject to standard Play policy or security reviews", so it's fast.
- **Closed testing:** email lists (up to 2,000 users each) or Google Groups.
- **New personal accounts (created after 13 Nov 2023)** need a closed test with **at least 12 testers opted in continuously for 14 days** before they can apply for production. This only matters if you later want a public listing. A 5–15 friend group could double as those 12 testers.
- Play-registered apps are automatically covered by developer verification.

## Sources

- Apple: Choosing a membership (free vs paid, free-provisioning limits): https://developer.apple.com/support/compare-memberships/
- Apple: Membership details (US$99, local currency): https://developer.apple.com/programs/whats-included/
- Apple: Enrollment (local pricing, India app-only enrollment, requirements): https://developer.apple.com/support/enrollment/
- Apple: TestFlight: https://developer.apple.com/testflight/
- Apple: TestFlight overview (90-day builds, beta review, public link): https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/
- Apple: Devices overview (100 per product family per membership year, reset rules): https://developer.apple.com/help/account/devices/devices-overview/
- Apple: Glossary, ad hoc provisioning profile: https://developer.apple.com/help/glossary/
- Apple: DMA and apps in the EU: https://developer.apple.com/support/dma-and-apps-in-the-eu/
- Apple Newsroom: changes to iOS in Japan (Dec 2025): https://www.apple.com/newsroom/2025/12/apple-announces-changes-to-ios-in-japan/
- Expo: Internal distribution: https://docs.expo.dev/build/internal-distribution/
- Expo: Pricing: https://expo.dev/pricing
- Android: Developer verification overview and timeline: https://developer.android.com/developer-verification
- Android: Developer verification guides (stores, regions): https://developer.android.com/developer-verification/guides
- Android: Developer verification FAQ (ADB exemption, advanced flow, $25 fee): https://developer.android.com/developer-verification/guides/faq
- Android: Limited distribution: https://developer.android.com/developer-verification/guides/limited-distribution
- Android Developer Console Help: Understanding developer verification: https://support.google.com/android-developer-console/answer/16561738?hl=en
- Play Console Help: Testing requirements for new personal accounts (12 testers / 14 days): https://support.google.com/googleplay/android-developer/answer/14151465?hl=en
- Play Console Help: Set up internal/closed/open testing: https://support.google.com/googleplay/android-developer/answer/9845334?hl=en
- Play Console Help: Registration ($25, ID): https://support.google.com/googleplay/android-developer/answer/6112435?hl=en
- Secondary (INR estimate only): https://dev.to/preciousky_45d956626d31c3/what-it-actually-costs-to-publish-an-iphone-app-on-the-app-store-from-india-2026-numbers-1nmi
