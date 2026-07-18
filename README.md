# SehatMitra – AI-Powered Healthcare Chatbot

**SehatMitra** is an intelligent healthcare chatbot designed for rural and underserved communities in India. It provides AI-powered medical guidance, hospital locators, health alerts, and personalized wellness recommendations.

## 🌟 Features

- **AI-Powered Health Assistant** – Real-time chat with an intelligent medical chatbot using LangChain and Ollama
- **Hospital & Clinic Locator** – Find nearby healthcare facilities with doctor availability and contact info
- **Health Alerts & Disease Tracking** – Real-time outbreak alerts and vaccination reminders
- **Personalized Diet Planner** – AI-generated nutrition plans based on age, health conditions, and allergies
- **First-Aid Guides** – Step-by-step emergency response instructions
- **Multilingual Support** – English, Hindi, Punjabi, and Odia
- **Voice Interaction** – Text-to-speech and voice recognition capabilities
- **Dark Mode** – Eye-friendly interface with light/dark theme toggle
- **WhatsApp Integration** – Share health alerts and connect via WhatsApp
- **User Profiles** – Store and manage personal health information

## 🛠️ Tech Stack

### Frontend
- **React 19** (with Vite & Next.js options)
- **Tailwind CSS** – Responsive styling
- **Lucide React** – Icon library
- **Context API** – Global state management

### Backend
- **Next.js 15** – Server-side rendering and API routes
- **Node.js & Express** – RESTful API server
- **LangChain** – LLM orchestration
- **Ollama** – Local AI model inference

### Deployment
- **Vercel** – Frontend hosting
- **Render** – Backend API hosting

## 📦 Project Structure

```
sehat_mitra/
├── app/                          # Next.js 15 app directory
│   ├── page.js                   # Main chatbot UI (2520+ lines)
│   ├── layout.js                 # Root layout
│   └── globals.css               # Global styles
│
├── sehatmitra-app/               # React + Vite alternative frontend
│   ├── src/
│   ├── vite.config.js
│   └── package.json
│
├── package.json                  # Project dependencies
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm
- Git

### Installation

#### Option 1: Next.js Version (Recommended)
```bash
git clone https://github.com/Code-AbheerKaushik/sehat_mitra.git
cd sehat_mitra
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Option 2: React + Vite Version
```bash
cd sehatmitra-app
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Backend Setup
The chatbot connects to a backend API for LLM inference:

```bash
# Backend runs on port 8080
# Make sure it's configured in env variables
```

## 📱 Key Pages & Components

| Page | Purpose |
|------|---------|
| **Dashboard** | Home with quick access to all features |
| **Health Assistant** | AI chatbot with voice & text input |
| **Hospitals** | Find nearby clinics with doctor details |
| **Health Alerts** | Outbreak alerts & vaccination reminders |
| **Diet Planner** | Personalized nutrition recommendations |
| **First-Aid Guide** | Emergency response procedures |
| **Profile** | User health info & preferences |

## 🎨 UI/UX Highlights

- **Glassmorphism Design** – Frosted glass effect cards
- **Aurora Background** – Animated gradient backdrop
- **Smooth Animations** – Slide-in, fade-in, pop-in transitions
- **Responsive Layout** – Mobile-first design, optimized for all devices
- **Dark/Light Modes** – Theme persistence with localStorage

## 🌐 Multilingual Support

Supports 4 languages with full translations:
- **English** (en)
- **हिंदी** (hi)
- **ਪੰਜਾਬੀ** (pa)
- **ଓଡ଼ିଆ** (or)

## 🔐 Authentication

- **Google OAuth 2.0** – Secure sign-in with Google
- **JWT Tokens** – Backend authentication
- **LocalStorage** – Client-side data persistence

## 📊 State Management

- **React Context API** – Global app state (language, theme, user profile)
- **LocalStorage** – Persistent user data (chat history, profile, preferences)

## 🚨 Key Features Deep Dive

### 1. AI Chatbot
- Real-time message history
- Voice input/output support
- Image upload for symptom analysis
- Fallback responses for offline mode

### 2. Health Alerts
- Disease outbreak tracking
- Vaccination reminders
- Severity levels (High/Medium)
- WhatsApp sharing

### 3. Diet Planner
- AI-generated meal plans
- Condition-aware (diabetes, hypertension, anemia)
- Allergy & dietary preference support
- Multi-language recipes

### 4. Location Services
- Hospital/clinic finder
- Distance calculation
- Doctor availability status
- One-tap call integration

## 🧪 Testing

```bash
# Run ESLint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📈 Performance

- **Optimized Images** – Next.js Image component
- **Code Splitting** – React lazy loading
- **Caching** – Service workers & localStorage
- **Bundle Size** – ~250KB gzipped (optimized)

## 🐛 Known Issues & Roadmap

- [ ] Backend LangChain integration (in progress)
- [ ] WhatsApp bot endpoint (pending)
- [ ] Offline-first PWA support
- [ ] Analytics & feedback collection
- [ ] Multi-hospital network integration

## 📄 License

This project is open-source. Feel free to fork and contribute.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact & Support

- **GitHub** – [Code-AbheerKaushik/sehat_mitra](https://github.com/Code-AbheerKaushik/sehat_mitra)
- **Author** – Abheer Kaushik

## 🙏 Acknowledgments

- **LangChain** – LLM orchestration framework
- **Ollama** – Local AI model support
- **Tailwind CSS** – Utility-first styling
- **Lucide React** – Icon set
- **Vercel** – Hosting platform

---

**Made with ❤️ for rural healthcare accessibility in India**
