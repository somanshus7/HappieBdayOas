# Oas Birthday Website — Special Edition 💗🎶

This version keeps the interactive birthday adventure and adds more personal, meaningful moments.

## Add your own birthday music
1. Put your chosen audio file in this same folder.
2. Rename it exactly to **`music.mp3`**.
3. Upload `music.mp3` beside `index.html`, `style.css`, and `script.js` in the GitHub repository root.
4. Open the website and tap **Play your birthday song**.

The website does not contain generated music or a bundled song. It plays only the `music.mp3` file you provide. Browsers require a tap before audio can start.

## New meaningful moments
- Each popped balloon reveals its own message, including **“You are so special, Oas”**.
- The messages remain visible together as a little collection of reminders.
- A sealed envelope opens with a flap animation.
- The letter slides out, then the full personal birthday note gently reveals.
- The Dhoni and Shri Krishna wishes remain part of the personal letter.
- The birthday finale has a party-mode celebration.

## Personalize
- In `script.js`, change `SECRET_CODE = "200"` to change the unlock code.
- In `index.html`, edit the four `wishes` in `script.js` to personalize each balloon.
- Edit the text inside `<article id="letterReveal">` to change the letter.
- The keypad is a fun surprise gate, not secure authentication; the code is visible in the page source.

## Publish free with GitHub Pages
1. Create a public GitHub repository, e.g. `oas-birthday`.
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, **and your `music.mp3`** to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then Save.
6. GitHub will provide the live URL after deployment.

No framework or build step is required. Works on phones and desktops.
