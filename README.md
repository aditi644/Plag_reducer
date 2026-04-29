# 🟢 Humanize — Make It Human.

> Paste AI-generated text and get a natural, human-sounding rewrite — same meaning, zero robot energy.

![Humanize App Screenshot](./screenshot.png)

---

## ✨ Features

- **AI-Powered Rewriting** — Uses OpenAI GPT to rewrite AI-generated text into natural, human-sounding prose
- **Intensity Levels** — Choose between `Light`, `Moderate`, and `Aggressive` rewriting intensity
- **Tone Selection** — Pick from `Natural`, `Casual`, `Professional`, or `Academic` tones
- **Diff View** — Side-by-side comparison of original vs rewritten text with change highlighting
- **Word Counter** — Live word count on your input text
- **One-Click Clear** — Instantly reset the editor

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| AI | OpenAI API (GPT-4o) |
| Styling | CSS Modules / Tailwind CSS |

---

## 📁 Project Structure

```
humanize/
├── client/                     # React frontend
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.jsx          # Main editor panel
│   │   │   ├── DiffView.jsx        # Diff view component
│   │   │   ├── IntensitySelector.jsx
│   │   │   └── ToneSelector.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.local
│   ├── index.html
│   └── package.json
│
├── server/                     # Express backend
│   ├── routes/
│   │   └── rewrite.js          # POST /api/rewrite route
│   ├── middleware/
│   │   └── rateLimit.js
│   ├── .env
│   ├── index.js                # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- An [OpenAI API key](https://platform.openai.com/api-keys)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/humanize.git
cd humanize
```

---

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
OPENAI_API_KEY=sk-your-openai-api-key-here
```

Start the server:

```bash
npm run dev
```

The Express server will run on `http://localhost:5000`.

---

### 3. Set Up the Client

```bash
cd ../client
npm install
```

Create a `.env.local` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the React app:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Reference

### `POST /api/rewrite`

Rewrites the provided text using OpenAI based on the selected intensity and tone.

**Request Body**

```json
{
  "text": "The utilization of transformer-based architectures has demonstrated significant performance improvements...",
  "intensity": "moderate",
  "tone": "natural"
}
```

| Field | Type | Required | Values |
|-------|------|----------|--------|
| `text` | `string` | ✅ | Any AI-generated text |
| `intensity` | `string` | ✅ | `light` \| `moderate` \| `aggressive` |
| `tone` | `string` | ✅ | `natural` \| `casual` \| `professional` \| `academic` |

**Response**

```json
{
  "rewritten": "Using transformer models has clearly improved performance across...",
  "wordCount": {
    "original": 12,
    "rewritten": 10
  }
}
```

**Error Response**

```json
{
  "error": "Text is required and must be a non-empty string."
}
```

---

## ⚙️ Intensity & Tone Guide

### Intensity

| Level | Description |
|-------|-------------|
| `Light` | Minor rewording — keeps most of the original structure |
| `Moderate` | Balanced rewrite — natural flow with clear changes |
| `Aggressive` | Heavy rewrite — maximum humanisation, significant restructuring |

### Tone

| Tone | Best For |
|------|----------|
| `Natural` | General use — balanced and conversational |
| `Casual` | Blog posts, social media, informal writing |
| `Professional` | Emails, business documents, reports |
| `Academic` | Essays, research papers, formal analysis |

---

## 🧩 Environment Variables Summary

### Server (`server/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Port for the Express server | ✅ |
| `OPENAI_API_KEY` | Your OpenAI secret API key | ✅ |

### Client (`client/.env.local`)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Base URL of the Express backend | ✅ |

---

## 🏗 Building for Production

### Build the React client

```bash
cd client
npm run build
```

The production build will be in `client/dist/`.

### Serve with Express (optional)

In `server/index.js`, serve the built client statically:

```js
import path from 'path';
app.use(express.static(path.join(__dirname, '../client/dist')));
```

---

## 🔒 Rate Limiting

The API uses `express-rate-limit` to prevent abuse. By default:

- **Window:** 15 minutes
- **Max requests:** 50 per IP per window

To adjust, edit `server/middleware/rateLimit.js`:

```js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: 'Too many requests, please try again later.'
});
```

---

## 🐛 Troubleshooting

**`CORS error` on the frontend**

Make sure your server has CORS configured for the client's origin:

```js
import cors from 'cors';
app.use(cors({ origin: 'http://localhost:5173' }));
```

**`401 Unauthorized` from OpenAI**

Double-check your `OPENAI_API_KEY` in `server/.env`. Make sure there are no extra spaces or quotes.

**`Rewrite` button does nothing**

Ensure both the client and server are running, and that `VITE_API_URL` in `client/.env.local` points to the correct server port.

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

## 🙌 Acknowledgements

- [OpenAI](https://openai.com) for the GPT API
- [React](https://react.dev) and [Vite](https://vitejs.dev) for the frontend
- [Express](https://expressjs.com) for the backend server
