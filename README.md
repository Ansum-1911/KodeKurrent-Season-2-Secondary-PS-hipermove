# 🏋️ HiperMove — AI-Powered Squat Analysis & Coaching

[![Hackathon](https://img.shields.io/badge/Hackathon-KodeKurrent%20Season%202-orange?style=flat-square)](https://kodekurrent.ieeergipt.in/)
[![Tech Stack](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express%20%7C%20MediaPipe%20%7C%20Gemini%20API-blue?style=flat-square)](https://github.com/Ansum-1911/KodeKurrent-Season-2-Secondary-PS-hipermove)
[![Status](https://img.shields.io/badge/Status-Completed%20%2F%20Ready%20for%20Submission-success?style=flat-square)]()

**HiperMove** is an AI-powered fitness analysis web application built for **Hacktoberfest Hack Day — KodeKurrent Season 2** (organized by IEEE RGIPT Student Branch in collaboration with Open Science Labs). It tracks body movement, estimates squat depth and tempo, counts repetitions in real time using computer vision, and translates session metrics into plain-language coaching feedback using Gemma and the Gemini API.

---

## 🔗 Submission Links

- 📹 **Working Demo Video:** [Watch Demo on Google Drive](https://drive.google.com/file/d/1BgMzJc0LMuEciAqRWudeyNKN1TYC-fdB/view?usp=sharing)
- 📊 **Project Presentation (PPTX):** [View Presentation on Google Drive](https://docs.google.com/presentation/d/1LBDYwEeAw_N6Q-csoM-9Nvg9sQ5rpL5P/edit?usp=sharing&ouid=103074702273800134949&rtpof=true&sd=true)

---

## 🌟 Key Features

- **Real-Time Pose Tracking:** Uses Google MediaPipe Pose to detect 33 3D body landmarks directly inside your browser with zero external sensors or wearables required.
- **Rep & Depth Calculation:** Automatically calculates hip height relative to body height to detect motion signals, count repetitions, measure depth percentages, and monitor rep durations.
- **Visual Motion Feedback:** Renders a real-time skeleton overlay, depth rail indicator, and a live hip-motion swing curve graph to visualize form dynamically.
- **Gemma-Powered Coach Notes:** Passes workout numbers to Gemma via the Gemini API to turn raw performance stats into friendly, plain-language summaries and actionable advice.

---

## 📸 Screenshots & Demo Preview

### 1. Live Video Analysis & Skeleton Overlay
![Live Analysis](screenshot1.jpg)

### 2. Hip Motion Curve & Rep Logs
![Hip Motion Graph](screenshot2.png)

### 3. Gemma AI Coaching Note
![Gemma Coach Notes](screenshot3.png)

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS, HTML5 Canvas)
- **Backend:** Node.js, Express.js
- **Computer Vision:** Google MediaPipe Pose
- **AI / LLM:** Google Gemini API / Gemma

---

## 📐 Architecture & Workflow

[ User Video Upload / Stream ]
│
▼
[ Browser / MediaPipe Pose ] ──(33 Landmarks Extracted)──► [ Swing-Based Counter & Metrics ]
│
▼
[ Express Backend ] ◄──(Session Metrics Payload)──► [ Gemini API / Gemma Coach Notes ]


1. **See:** MediaPipe Pose finds 33 key landmarks on every video frame locally inside the user's browser, keeping video processing private and lightweight.
2. **Measure:** Hip height relative to body height produces a continuous motion signal; swings in the signal represent reps, depth percentage, and rep duration.
3. **Explain:** Final session numbers are passed to Gemma via the Gemini API backend to generate clear, structured coaching guidance.

---

## 🚀 Installation & Local Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/Ansum-1911/KodeKurrent-Season-2-Secondary-PS-hipermove.git](https://github.com/Ansum-1911/KodeKurrent-Season-2-Secondary-PS-hipermove.git)
cd KodeKurrent-Season-2-Secondary-PS-hipermove
2. Install Dependencies
Bash
npm install
3. Configure Environment Variables
Create a .env file in the root directory:

Code snippet
PORT=3000
GEMINI_API_KEY=your_actual_gemini_api_key_here
4. Start the Application
Bash
npm start
Open your browser and navigate to http://localhost:3000.

⚠️ Limitations & Future Roadmap
Camera Positioning & Lighting: Works best with clear, side-view or front-view squat footage with adequate lighting for optimal MediaPipe detection.

Future Enhancements: Support for additional exercises (push-ups, lunges) and user progress history.

👥 Team & Credits
Team Name: CampusSignal

Company Chosen: Open Science Labs

Project Name: HiperMove — AI Movement & Mobility Assistant

College/University: Rajiv Gandhi Institute of Petroleum Technology (RGIPT)

Team Leader: Harshad Sanjay Nandanwar (26cs3025@rgipt.ac.in)

Team Members:

Harshad Sanjay Nandanwar

Ansum Sanal

Aman R.D

Srithan Sharma<img width="1897" height="887" alt="Screenshot 2026-10-25 183515" src="https://github.com/user-attachments/assets/3be2efe3-cc3b-4492-b674-b8619eab4df3" />
<img width="1896" height="857" alt="Screenshot 2026-10-25 183545" src="https://github.com/user-attachments/assets/0fe4f486-3e09-4b40-a2a7-132c75d2f899" />
<img width="1900" height="906" alt="Screenshot 2026-10-25 183500" src="https://github.com/user-attachments/assets/ff5a511f-ec83-44ea-9ca2-87130f615c25" />
