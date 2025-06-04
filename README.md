# 🏋️‍♂️ Fitness Challenge Tracker

This is a **React + TypeScript + Vite** project designed to track fitness challenges, simulate live updates via WebSockets, and persist progress using localStorage.
Styled with Tailwind CSS and tested using Vitest and Testing Library.

---

## 📹 Demo Video

Watch the app with some notes:
**[https://www.loom.com/share/a6d819667cfa4763bbae69166d852edb](https://www.loom.com/share/a6d819667cfa4763bbae69166d852edb?sid=03062256-35cb-4c12-abe6-d9142ea93c29)**

> ❗ You **do not need to sign in** to view the video — if a sign-in window appears, you can **close it**.  
> ⚠️ **Note:** The video does **not fully capture the CSS animations** and transitions used in the app.

---

## 🌐 Live Demo

Try it out here:
👉 https://683f9238d7609e4bbe0635de--cool-bubblegum-736603.netlify.app/

> ⚠️ Important: **Live Updates section will be empty** The WebSocket server (ws-server.js) runs locally and cannot be hosted directly on Netlify, as Netlify does not support this.

---

## 🚀 Tech Stack

- **React** & **TypeScript**: Since this is the stack required for the position.
- **Vite**:Fast dev server ideal for small to mid-size projects.
- **Tailwind CSS**: For rapid, consistent styling.
- **Vitest** & **Testing Library**: For unit testing and component interaction testing mixing react and vite.
- **WebSocket (via ws)**: Simulates a backend pushing live updates.
- **localStorage**: Persists joined challenges and progress across reloads.
- **CSS Animations** — All animations are implemented with pure CSS, located in `index.css`

---

## 📦 Installation

```bash
git clone https://github.com/your-username/fitness-app.git
cd fitness-app
npm install
```

## ▶️ Running the App (Frontend + WebSocket)

```bash
npm run start
```

note: Starts ws-server.js (mock backend) and starts the Vite dev server

🧪 Running Tests

```bash
npm run test
```
