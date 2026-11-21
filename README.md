# Oas Birthday Website — Party Remix 💗🎶

A more interactive, musical remix of the original Oas birthday surprise. The original pink birthday aesthetic and core adventure are preserved, with extra party atmosphere and playful sound.

## What's new
- A floating **birthday music switch** with animated equalizer.
- Original synthesized instrumental melody generated in the browser — no copyrighted song or external audio file.
- Little chimes, keypad taps and balloon-pop sound effects when music is enabled.
- Animated ambient glow, floating balloons, sparkle effects and a finale party mode.
- More polished mobile layout and accessibility labels.

## How the music works
Tap **Play the birthday vibe** at the top. Phones and browsers block autoplay, so music starts only after a user tap. The tune is synthesized live with Web Audio; it does not stream or download a song.

## Personalize
- In `script.js`, change `SECRET_CODE = "200"` to change the unlock code.
- In `index.html`, edit the birthday note inside the `#final` section.
- The hint under the keypad should match your chosen code.

## Publish free with GitHub Pages
1. Create a **public** GitHub repository, e.g. `oas-birthday`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then Save.
6. GitHub will provide the live URL after deployment.

No framework, build step, paid hosting or external audio assets are required. Works on phones and desktops.

Note: the keypad is a fun surprise gate, not secure authentication; the code is visible in the page source.
