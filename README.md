# 🚀 Interview Prep Tracker with AI Assistant

An AI-powered interview preparation dashboard that helps you track your learning progress, visualize your preparation, and get instant AI-generated explanations, interview questions, and revision plans.

---

## 🔥 Features

* 📊 Track interview topics with status:

  * Not Started
  * In Progress
  * Done
* 📈 Visual analytics (Pie & Bar charts)
* ✏️ Add, edit, and delete topics
* 🤖 AI Assistant Panel:

  * Ask anything
  * Get topic explanations
  * Generate interview questions
  * Smart suggestions
* ⚡ Fast and responsive UI
* 💾 Local storage persistence
* 🎯 Clean and structured UI for productivity

---

## 🧠 Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* Recharts
* Vite

### Backend

* Node.js
* Express.js
* OpenRouter (OpenAI-compatible API)

---

## 📁 Project Structure

```
interview-prep-tracker/
└── interview-prep-tracker/
    ├── src/                # Frontend source code
    ├── public/             # Static assets
    ├── server/             # Backend (API)
    │   ├── index.js
    │   ├── .env
    │   └── package.json
    ├── .env                # Frontend environment variables
    ├── package.json
```

> Note: Frontend and backend are kept in the same project folder for simplicity.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AniketSain1/interview-prep-tracker-with-AI-assitant.git
cd interview-prep-tracker-with-AI-assitant/interview-prep-tracker
```

---

## 🔧 Backend Setup

```bash
cd server
npm install
```

Create `.env` inside `server/`:

```
OPENROUTER_API_KEY=your_api_key_here
```

Run backend:

```bash
node index.js
```

---

## 💻 Frontend Setup

```bash
cd ..
npm install
npm run dev
```

Create `.env` in root frontend folder:

```
VITE_API_URL=http://localhost:5001
```

---

## 🌍 Deployment

### Frontend

* Vercel

### Backend

* Render

---

## 🤖 AI Assistant Capabilities

* Provides structured explanations
* Generates interview questions
* Helps with quick revision
* Context-based suggestions from selected topics

---

## 🧪 Example Workflow

1. Add a topic (e.g., React Hooks)
2. Update progress
3. Click “Ask AI”
4. Get:

   * Explanation
   * Key points
   * Interview questions

---

## 🚀 Future Improvements

* 🔥 Streaming AI responses (typing effect)
* 💬 Chat history saving
* 🌙 Dark mode
* 🧠 Smart topic recommendations
* 🔐 Authentication system

---

## 👨‍💻 Author

**Aniket Saini**

---

## ⭐ Support

If you found this helpful, give it a ⭐ on GitHub!
