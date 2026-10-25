# HiperMove — AI Movement & Mobility Assistant

> Every rep, measured. Upload a short squat video, see your body-pose landmarks, get an automatic rep count and depth score, then ask Gemma 4 for a plain-language coach's note. No wearables, no extra equipment.

Built for **Hacktoberfest Hack Day · KodeKurrent Season 2** (Jais x Open Science Labs) — problem statement: *HiperMove, AI Movement & Mobility Assistant*.

- **Live demo:** _add link here (or "see demo video")_
- **Demo video:** _add link here_
- **Team:** _add names here_

## What it does

1. **See** — MediaPipe Pose Landmarker finds 33 body landmarks on every frame, in the browser, and draws the skeleton over the video.
2. **Measure** — hip height relative to body height becomes a motion signal. Swings in that signal are counted as reps; their size gives squat depth, and their timing gives seconds per rep.
3. **Explain** — when the video ends, the session summary (reps, deepest depth, average seconds per rep, duration) is sent to **Gemma 4**, which writes a short, friendly explanation of the session.

The MVP analyzes one exercise: the **squat**. It works from a front or a side view.

## How it uses the sponsor technologies

| Technology | Role in HiperMove |
|---|---|
| **MediaPipe Pose Landmarker** (Google) | All actual measurements: landmarks, rep counting, depth, tempo. Runs fully in the browser. |
| **Gemma 4** (Google, via the Gemini API) | Turns the measured numbers into a plain-language coach's note. It never does the measuring. |
| **DigitalOcean** | Intended hosting target for the evaluator demo (see *Deployment* below). |

## Architecture

```
Browser (public/index.html)
  ├─ MediaPipe Pose Landmarker (tasks-vision, WASM) → landmarks, reps, depth, tempo
  └─ POST /api/explain  (session summary only — no video leaves the device)
        │
Node + Express (server.js)
  ├─ GET  /api/health
  └─ POST /api/explain → Gemini API → Gemma 4 → coach's note
```

**Privacy:** the video is analyzed locally in your browser. Only the numeric session summary is sent to the server and on to the Gemini API.

## Run it locally

Requirements: Node.js 18 or newer, and a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

```bash
git clone https://github.com/Ansum-1911/KodeKurrent-Season-2-Secondary-PS-hipermove.git
cd KodeKurrent-Season-2-Secondary-PS-hipermove
npm install
```

Create a file named `.env` in the project folder (it is git-ignored — never commit it):

```
GEMINI_API_KEY=your_key_here
```

Start the server:

```bash
npm start
```

Open <http://localhost:3100>. Check <http://localhost:3100/api/health> to confirm the server is up. The page needs an internet connection on first load to fetch the MediaPipe library and model.

> Open the page through the Node server, not by double-clicking `index.html` or using a "Live Server" extension.

## How to use

1. Click **Upload video** (or drag a clip onto the screen). A 10–30 second squat clip filmed from the front or side works best, with the whole body in frame.
2. Press play and watch the skeleton, depth rail, rep counter and hip-motion graph update live.
3. When the video ends, click **Ask Gemma 4** for the coach's note.
4. If reps are over- or under-counted, adjust the **Sensitivity** slider (default 0.050) and replay.

## Configuration

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Required. Used by the server to call Gemma 4. |
| `PORT` | Optional. Defaults to `3100`. Hosting platforms set this automatically. |

The server tries `gemma-4-26b-a4b-it` first and falls back to `gemma-4-31b-it`, with a 25-second timeout.

## Deployment

The app is a single Node web service, so it can be hosted on any platform that runs `npm start` (for example DigitalOcean App Platform: connect this repo, choose a Web Service with run command `npm start`, and add `GEMINI_API_KEY` as an encrypted environment variable).

## Limitations (honest notes)

- **Squat only** in this MVP; other exercises are future work.
- Rep counting is **approximate**. On our 7-rep test video it counted 6, because it missed an unclear first rep. Sensitivity can be tuned, but unclear or partial reps may be missed.
- It assumes one person, fully visible, with a mostly stationary camera. Moving the camera or stepping closer changes the signal.
- Depth is an estimate from hip height, not a joint-angle measurement.
- **Not medical advice.** HiperMove is informational only. Stop if anything hurts and consult a qualified professional.

## Attribution

- [MediaPipe Pose Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker) by Google (Apache 2.0) — pose estimation, loaded in the browser via `@mediapipe/tasks-vision`.
- [Gemma 4](https://ai.google.dev/gemma) by Google, accessed through the Gemini API, subject to the Gemma terms of use.
- Fonts: [Barlow and Barlow Condensed](https://fonts.google.com/specimen/Barlow) via Google Fonts (SIL Open Font License).
- Built with Node.js and Express.

## License

MIT — see [LICENSE](LICENSE).