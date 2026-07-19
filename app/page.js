'use client';
import React, { useState, useEffect, useContext, createContext, useRef, useCallback, useMemo } from 'react';

import {
    MessageCircle,
    Phone,
    MapPin,
    AlertTriangle,
    Mic,
    Send,
    Home,
    Hospital,
    Bell,
    Moon,
    Sun,
    Menu,
    X,
    User,
    Clock,
    Shield,
    Heart,
    Volume2,
    Loader2,
    CheckCircle,
    Info,
    Edit,
    Trash2,
    Stethoscope,
    Share2,
    BookHeart,
    Activity,
    LifeBuoy,
    Users,
    Search,
    Sparkles,
    ImagePlus, // New Icon for Image Upload
    Salad // New Icon for Diet Planner
} from 'lucide-react';

// Context for global state management
const AppContext = createContext();

// **ADDED: Custom CSS for animations and new styles**
const AppStyles = () => (
  <style>{`
    /* Keyframe Animations */
    @keyframes slide-in-left { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slide-in-right { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
    @keyframes dot-pulse { 0%, 100% { transform: scale(0.5); opacity: 0.5; } 50% { transform: scale(1); opacity: 1; } }
    @keyframes card-pop-in { from { transform: translateY(30px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
    @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
    @keyframes icon-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes alert-glow { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
    @keyframes subtle-glow { 0%, 100% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.2); } 50% { box-shadow: 0 0 35px rgba(74, 222, 128, 0.4); } }
    @keyframes aurora {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }


    /* Animation Utility Classes */
    .animate-slide-in-left { animation: slide-in-left 0.4s ease-out forwards; }
    .animate-slide-in-right { animation: slide-in-right 0.4s ease-out forwards; }
    .animate-fade-in { animation: fade-in 0.5s ease-in-out forwards; }
    .animate-fade-out { animation: fade-out 0.5s ease-in-out forwards; }
    .animate-card-pop-in { animation: card-pop-in 0.5s ease-out forwards; }
   
    /* Loading Indicator Styles */
    .dot { width: 8px; height: 8px; border-radius: 50%; animation: dot-pulse 1.4s infinite ease-in-out; }
    .dot-1 { animation-delay: -0.32s; }
    .dot-2 { animation-delay: -0.16s; }
    .dot-3 { animation-delay: 0s; }
    .shimmer-bg {
        background: linear-gradient(to right, transparent 0%, #ffffff1a 50%, transparent 100%);
        background-size: 2000px 100%;
        animation: shimmer 2s linear infinite;
    }

    /* Aurora Background */
    .aurora-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(45deg, #e0f2fe, #f3e8ff, #dcfce7, #e0f2fe);
      background-size: 400% 400%;
      animation: aurora 15s ease infinite;
    }
    .dark .aurora-background {
      background: linear-gradient(45deg, #0c1421, #1e1b30, #0c1f1f, #0c1421);
      background-size: 400% 400%;
      animation: aurora 20s ease infinite;
    }


    /* Glassmorphism Card Style for Hospitals */
    .hospital-card {
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .dark .hospital-card {
        background: rgba(23, 30, 43, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
   
    .hospital-card::before {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        border-radius: 0.75rem; /* 12px */
        background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.15), transparent 40%);
        opacity: 0;
        transition: opacity 0.5s;
    }
   
    .hospital-card:hover::before {
        opacity: 1;
    }


    .hospital-card:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
   
    /* Alert Card Styles */
    .alert-card {
      background: #ffffff;
      border-radius: 0.75rem;
      overflow: hidden;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .dark .alert-card {
      background: #1f2937; /* gray-800 */
    }
    .alert-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    .alert-card .severity-glow {
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 6px;
    }
    .alert-card .animated-icon {
      animation: alert-glow 2.5s infinite ease-in-out;
    }

    /* Welcome Screen */
    .welcome-screen {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
    }
    .dark .welcome-screen {
      background: #030712;
    }
    .welcome-screen-logo {
      animation: subtle-glow 3s infinite ease-in-out;
    }
  `}</style>
);

// ADDED: Translations for multi-language support (with ODIA)
const translations = {
    appName: { en: 'SehatMitra', hi: 'सेहतमित्र', pa: 'ਸਿਹਤਮਿੱਤਰ', or: 'ସେହତ୍‌ମିତ୍ର' },
    welcomeMessage: { en: 'Welcome', hi: 'आपका स्वागत है', pa: 'ਜੀ ਆਇਆਂ ਨੂੰ', or: 'ସ୍ୱାଗତ' },
    appSubtitle: { en: 'Your trusted healthcare companion for the Patiala region', hi: 'पटियाला क्षेत्र के लिए आपका विश्वसनीय स्वास्थ्य साथी', pa: 'ਪਟਿਆਲਾ ਖੇਤਰ ਲਈ ਤੁਹਾਡਾ ਭਰੋਸੇਯੋਗ ਸਿਹਤ ਸਾਥੀ', or: 'ପଟିଆଲା ଅଞ୍ଚଳ ପାଇଁ ଆପଣଙ୍କର ବିଶ୍ୱସ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ' },
    healthAssistantTitle: { en: 'Health Assistant', hi: 'स्वास्थ्य सहायक', pa: 'ਸਿਹਤ ਸਹਾਇਕ', or: 'ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ' },
    healthAssistantDesc: { en: 'AI-powered health advice', hi: 'AI-संचालित स्वास्थ्य सलाह', pa: 'AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਸਲਾਹ', or: 'AI-ଚାଳିତ ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ' },
    findHospitalsTitle: { en: 'Find Hospitals', hi: 'अस्पताल खोजें', pa: 'ਹਸਪਤਾਲ ਲੱਭੋ', or: 'ଡାକ୍ତରଖାନା ଖୋଜନ୍ତୁ' },
    findHospitalsDesc: { en: 'Locate nearby healthcare', hi: 'आस-पास की स्वास्थ्य सेवा का पता लगाएँ', pa: 'ਨੇੜਲੇ ਸਿਹਤ ਸੰਭਾਲ ਦਾ ਪਤਾ ਲਗਾਓ', or: 'ନିକଟସ୍ଥ ସ୍ୱାସ୍ଥ୍ୟସେବା ଖୋଜନ୍ତୁ' },
    healthAlertsTitle: { en: 'Health Alerts', hi: 'स्वास्थ्य अलर्ट', pa: 'ਸਿਹਤ ਚਿਤਾਵਨੀਆਂ', or: 'ସ୍ୱାସ୍ଥ୍ୟ ସତର୍କତା' },
    healthAlertsDesc: { en: 'Local outbreak updates', hi: 'स्थानीय प्रकोप अपडेट', pa: 'ਸਥਾਨਕ ਪ੍ਰਕੋਪ ਸੰਬੰਧੀ ਅੱਪਡੇਟ', or: 'ସ୍ଥାନୀୟ ପ୍ରକୋପ ଅପଡେଟ୍' },
    emergencyServicesTitle: { en: 'Emergency Services', hi: 'आपातकालीन सेवाएं', pa: 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ', or: 'ଜରୁରୀକାଳୀନ ସେବା' },
    shareOnWhatsApp: { en: 'Share on WhatsApp', hi: 'व्हाट्सऐप पर साझा करें', pa: 'ਵਟਸਐਪ \'ਤੇ ਸਾਂਝਾ ਕਰੋ', or: 'ହ୍ୱାଟସ୍‌ଆପରେ ସେୟାର କରନ୍ତୁ' },
    contactOnWhatsApp: { en: 'Contact on WhatsApp', hi: 'व्हाट्सऐप पर संपर्क करें', pa: 'ਵਟਸਐਪ \'ਤੇ ਸੰਪਰਕ ਕਰੋ', or: 'ହ୍ୱାଟସ୍‌ଆପରେ ଯୋଗାଯୋଗ କରନ୍ତୁ' },
    emergencyWhatsApp: { en: 'Emergency WhatsApp', hi: 'आपातकालीन व्हाट्सऐप', pa: 'ਐਮਰਜੈਂਸੀ ਵਟਸਐਪ', or: 'ଜରୁରୀକାଳୀନ ହ୍ୱାଟସ୍‌ଆପ' },
    signInWithGoogle: { en: 'Sign in with Google', hi: 'Google के साथ साइन इन करें', pa: 'Google ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ', or: 'Google ସହିତ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ' },
    signOut: { en: 'Sign Out', hi: 'साइन आउट', pa: 'ਸਾਈਨ ਆਉਟ', or: 'ସାଇନ୍ ଆଉଟ୍' },
    welcome: { en: 'Welcome', hi: 'स्वागत है', pa: 'ਜੀ ਆਇਆਂ ਨੂੰ', or: 'ସ୍ୱାଗਤମ୍' },
    signInPrompt: { en: 'Sign in to sync your health data across devices', hi: 'अपने स्वास्थ्य डेटा को सभी डिवाइसों में सिंक करने के लिए साइन इन करें', pa: 'ਆਪਣੇ ਸਿਹਤ ਡੇਟਾ ਨੂੰ ਸਾਰੇ ਡਿਵਾਈਸਾਂ ਵਿੱਚ ਸਿੰਕ ਕਰਨ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ', or: 'ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ତଥ୍ୟକୁ ସମସ୍ତ ଡିଭାଇସରେ ସିଙ୍କ କରିବାକୁ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ' },
    ambulance: { en: 'Ambulance', hi: 'एम्बुलेंस', pa: 'ਐਂਬੂਲੈਂਸ', or: 'ଆମ୍ବୁଲାନ୍ସ' },
    police: { en: 'Police', hi: 'पुलिस', pa: 'ਪੁਲਿਸ', or: 'ପୋଲିସ' },
    healthHelpline: { en: 'Health Helpline', hi: 'स्वास्थ्य हेल्पलाइन', pa: 'ਸਿਹਤ ਹੈਲਪਲਾਈਨ', or: 'ସ୍ୱାସ୍ଥ୍ୟ ହେଲ୍ପଲାଇନ' },
    dailyHealthTipsTitle: { en: 'Daily Health Tips', hi: 'दैनिक स्वास्थ्य सुझाव', pa: 'ਰੋਜ਼ਾਨਾ ਸਿਹਤ ਸੁਝਾਅ', or: 'ଦୈନିକ ସ୍ୱାସ୍ଥ୍ୟ ଟିପ୍ସ' },
    healthTips: {
        en: ["Drink at least 8 glasses of clean water daily", "Wash hands frequently with soap for 20 seconds", "Get adequate sleep (7-8 hours) every night", "Wear full-sleeve clothes to prevent mosquito bites"],
        hi: ["प्रतिदिन कम से कम 8 गिलास स्वच्छ पानी पिएं", "20 सेकंड के लिए साबुन से बार-बार हाथ धोएं", "हर रात पर्याप्त नींद (7-8 घंटे) लें", "मच्छर के काटने से बचने के लिए पूरी बाजू के कपड़े पहनें"],
        pa: ["ਰੋਜ਼ਾਨਾ ਘੱਟੋ-ਘੱਟ 8 ਗਲਾਸ ਸਾਫ਼ ਪਾਣੀ ਪੀਓ", "ਹੱਥਾਂ ਨੂੰ 20 ਸਕਿੰਟਾਂ ਲਈ ਸਾਬਣ ਨਾਲ ਵਾਰ-ਵਾਰ ਧੋਵੋ", "ਹਰ ਰਾਤ ਢੁਕਵੀਂ ਨੀਂਦ (7-8 ਘੰਟੇ) ਲਵੋ", "ਮੱਛਰ ਦੇ ਕੱਟਣ ਤੋਂ ਬਚਣ ਲਈ ਪੂਰੀਆਂ ਬਾਹਾਂ ਵਾਲੇ ਕੱਪੜੇ ਪਾਓ"],
        or: ["ପ୍ରତିଦିନ ଅତି କମରେ ୮ ଗ୍ଲାସ ପରିଷ୍କାର ପାଣି ପିଅନ୍ତୁ", "୨୦ ସେକେଣ୍ଡ ପାଇଁ ସାବୁନରେ ବାରମ୍ବାର ହାତ ଧୁଅନ୍ତୁ", "ପ୍ରତି ରାତିରେ ପର୍ଯ୍ୟାପ୍ତ ନିଦ (୭-୮ ଘଣ୍ଟା) ଶୁଅନ୍ତୁ", "ମଶା କାମୁଡ଼ିବାରୁ ରକ୍ଷା ପାଇବା ପାଇଁ ପୂରା ବାହୁଥିବା ପୋଷାକ ପିନ୍ଧନ୍ତୁ"]
    },
    navHome: { en: 'Home', hi: 'होम', pa: 'ਮੁੱਖ', or: 'ହୋମ୍' },
    navAssistant: { en: 'Assistant', hi: 'सहायक', pa: 'ਸਹਾਇਕ', or: 'ସହାୟକ' },
    navHospitals: { en: 'Hospitals', hi: 'अस्पताल', pa: 'ਹਸਪਤਾਲ', or: 'ଡାକ୍ତରଖାନା' },
    navAlerts: { en: 'Alerts', hi: 'अलर्ट', pa: 'ਚਿਤਾਵਨੀਆਂ', or: 'ସତର୍କତା' },
    chatbotInitialGreeting: { en: 'Sat Sri Akaal! I\'m SehatMitra, your personal AI health friend, here to help you feel your best. How can I help today?', hi: 'नमस्ते! मैं सेहतमित्र हूँ, आपका व्यक्तिगत AI स्वास्थ्य मित्र। मैं आपकी मदद कैसे कर सकता हूँ?', pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਿਹਤਮਿੱਤਰ ਹਾਂ, ਤੁਹਾਡਾ ਨਿੱਜੀ AI ਸਿਹਤ ਮਿੱਤਰ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?', or: 'ନମସ୍କାର! ମୁଁ ସେହତ୍‌ମିତ୍ର, ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ AI ସ୍ୱାସ୍ଥ୍ୟ ବନ୍ଧୁ। ମୁଁ ଆଜି ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରେ?' },
    chatbotHeaderTitle: { en: 'Health Assistant', hi: 'स्वास्थ्य सहायक', pa: 'ਸਿਹਤ ਸਹਾਇਕ', or: 'ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ' },
    chatbotHeaderSubtitle: { en: 'Your friendly health companion', hi: 'आपका मैत्रीपूर्ण स्वास्थ्य साथी', pa: 'ਤੁਹਾਡਾ ਦੋਸਤਾਨਾ ਸਿਹਤ ਸਾਥੀ', or: 'ଆପଣଙ୍କ ବନ୍ଧୁତ୍ୱପୂର୍ଣ୍ଣ ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ' },
    chatbotDisclaimer: { en: '<strong>A friendly reminder:</strong> I provide general health information only. Please always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.', hi: '<strong>एक महत्वपूर्ण अनुस्मारक:</strong> मैं केवल सामान्य स्वास्थ्य जानकारी प्रदान करता हूँ। कृपया चिकित्सा सलाह, निदान या उपचार के लिए हमेशा एक योग्य स्वास्थ्य पेशेवर से परामर्श करें।', pa: '<strong>ਇੱਕ ਦੋਸਤਾਨਾ ਯਾਦ-ਦਹਾਨੀ:</strong> ਮੈਂ ਸਿਰਫ ਆਮ ਸਿਹਤ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰੀ ਸਲਾਹ, ਨਿਦਾਨ, ਜਾਂ ਇਲਾਜ ਲਈ ਹਮੇਸ਼ਾਂ ਇੱਕ ਯੋਗ ਸਿਹਤ ਸੰਭਾਲ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।', or: '<strong>ଏକ ବନ୍ଧୁତ୍ୱପୂର୍ଣ୍ଣ ସ୍ମାରକ:</strong> ମୁଁ କେବଳ ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ପ୍ରଦାନ କରେ। ଦୟାକରି ଡାକ୍ତରୀ ପରାମର୍ଶ, ନିଦାନ କିମ୍ବା ଚିକିତ୍ସା ପାଇଁ ସର୍ବଦା ଜଣେ ଯୋଗ୍ୟ ସ୍ୱାସ୍ଥ୍ୟସେବା ବୃତ୍ତିଗତଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।' },
    chatbotInputPlaceholder: { en: 'Ask me anything about your health...', hi: 'अपने स्वास्थ्य के बारे में कुछ भी पूछें...', pa: 'ਆਪਣੀ ਸਿਹਤ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...', or: 'ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟରେ କିଛି ପଚାରନ୍ତୁ...' },
    defaultResponse: { en: "I'm sorry, I'm having a little trouble right now. Please try again in a moment.", hi: "मुझे खेद है, मुझे अभी थोड़ी परेशानी हो रही है। कृपया कुछ देर में पुनः प्रयास करें।", pa: "ਮੈਨੂੰ ਮਾਫ ਕਰਨਾ, ਮੈਨੂੰ ਹੁਣੇ ਥੋੜੀ ਮੁਸ਼ਕਲ ਆ ਰਹੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਕੁਝ ਦੇਰ ਬਾਅਦ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।", or: "ମୁଁ ଦୁଃଖିତ, ମୋର ବର୍ତ୍ତମାନ କିଛି ଅସୁବିଧା ହେଉଛି। ଦୟାକରି କିଛି ସମୟ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।" },
    hospitalsTitle: { en: 'Nearby Hospitals', hi: 'आस-पास के अस्पताल', pa: 'ਨੇੜਲੇ ਹਸਪਤਾਲ', or: 'ନିକଟସ୍ଥ ଡାକ୍ତରଖାନା' },
    locationInfo: { en: 'Based on your location', hi: 'आपके स्थान के आधार पर', pa: 'ਤੁਹਾਡੇ ਸਥਾਨ ਦੇ ਅਧਾਰ ਤੇ', or: 'ଆପଣଙ୍କ ସ୍ଥାନ ଉପରେ ଆଧାରିତ' },
    alertsTitle: { en: 'Health Alerts', hi: 'स्वास्थ्य अलर्ट', pa: 'ਸਿਹਤ ਸੰਬੰਧੀ ਚਿਤਾਵਨੀਆਂ', or: 'ସ୍ୱାସ୍ଥ୍ୟ ସତର୍କତା' },
    vaccinationRemindersTitle: { en: 'Vaccination Reminders', hi: 'टीकाकरण अनुस्मारक', pa: 'ਟੀਕਾਕਰਨ ਰੀਮਾਈਂਡਰ', or: 'ଟୀକାକରଣ ସ୍ମାରକ' },
    covidBoosterTitle: { en: 'COVID-19 Booster Due', hi: 'कोविड-19 बूस्टर देय है', pa: 'ਕੋਵਿਡ-19 ਬੂਸਟਰ ਦਾ ਸਮਾਂ', or: 'କୋଭିଡ-୧୯ ବୁଷ୍ଟର ଦେୟ' },
    covidBoosterDesc: { en: "It's time for your COVID-19 booster shot. Visit your nearest vaccination center.", hi: 'यह आपके कोविड-19 बूस्टर शॉट का समय है। अपने नजदीकी टीकाकरण केंद्र पर जाएं।', pa: 'ਇਹ ਤੁਹਾਡੇ ਕੋਵਿਡ-19 ਬੂਸਟਰ ਸ਼ਾਟ ਦਾ ਸਮਾਂ ਹੈ। ਆਪਣੇ ਨਜ਼ਦੀਕੀ ਟੀਕਾਕਰਨ ਕੇਂਦਰ \'ਤੇ ਜਾਓ।', or: 'ଏହା ଆପଣଙ୍କ କୋଭିଡ-୧୯ ବୁଷ୍ଟର ସଟ୍ ପାଇଁ ସମୟ। ଆପଣଙ୍କ ନିକଟସ୍ଥ ଟୀକାକରଣ କେନ୍ଦ୍ରକୁ ଯାଆନ୍ତୁ।' },
    bookAppointment: { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें', pa: 'ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ', or: 'ଆପଏଣ୍ଟਮେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ' },
    fluShotTitle: { en: 'Annual Flu Shot Recommended', hi: 'वार्षिक फ्लू शॉट की सिफारिश की जाती है', pa: 'ਸਾਲਾਨਾ ਫਲੂ ਸ਼ਾਟ ਦੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ', or: 'ବାର୍ଷିକ ଫ୍ଲୁ ସଟ୍ ସୁପାରିଶ କରାଯାଇଛି' },
    fluShotDesc: { en: 'The seasonal flu vaccine is now available. Protect yourself and your family this season.', hi: 'मौसमी फ्लू का टीका अब उपलब्ध ਹੈ। इस मौसम में अपनी और अपने परिवार की सुरक्षा करें।', pa: 'ਮੌਸਮੀ ਫਲੂ ਦਾ ਟੀਕਾ ਹੁਣ ਉਪਲਬਧ ਹੈ। ਇਸ ਮੌਸਮ ਵਿੱਚ ਆਪਣੀ ਅਤੇ ਆਪਣੇ ਪਰਿਵਾਰ ਦੀ ਰੱਖਿਆ ਕਰੋ।', or: 'ଋତୁକାଳୀନ ଫ୍ଲୁ ଟିକା ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ। ଏହି ଋତୁରେ ନିଜକୁ ଏବଂ ଆପଣଙ୍କ ପରିବାରକୁ ସୁରକ୍ଷା ଦିଅନ୍ତୁ।' },
    findClinic: { en: 'Find a Clinic', hi: 'क्लिनिक खोजें', pa: 'ਇੱਕ ਕਲੀਨਿਕ ਲੱਭੋ', or: 'ଏକ କ୍ଲିନିକ୍ ଖୋଜନ୍ତୁ' },
    listen: { en: 'Listen', hi: 'सुनो', pa: 'ਸੁਣੋ', or: 'ଶୁଣନ୍ତୁ' },
    thinking: { en: 'Thinking...', hi: 'सोच रहा है...', pa: 'ਸੋਚ ਰਿਹਾ ਹੈ...', or: 'ଚିନ୍ତା କରୁଛି...' },
    online: { en: 'Online', hi: 'ऑनलाइन', pa: 'ਆਨਲਾਈਨ', or: 'ଅନଲାଇନ୍' },
    alert: { en: 'Alert:', hi: 'चेतावनी:', pa: 'ਚੇਤਾਵਨੀ:', or: 'ସତର୍କ:' },
    casesIn: { en: 'cases in', hi: 'मामले', pa: 'ਮਾਮਲੇ', or: 'ମାମଲା' },
    outbreakAlertSuffix: { en: 'Outbreak Alert', hi: 'प्रकोप की चेतावनी', pa: 'ਪ੍ਰਕੋਪ ਚੇਤਾਵਨੀ', or: 'ପ୍ରକୋପ ସତର୍କତା' },
    confirmedCasesIn: { en: 'confirmed cases in', hi: 'पुष्ट मामले', pa: 'ਵਿੱਚ ਪੁਸ਼ਟੀ ਕੀਤੇ ਮਾਮਲੇ', or: 'ରେ ନିଶ୍ଚିତ ମାମଲା' },
    preventionMeasures: { en: 'Prevention Measures:', hi: 'रोकथाम के उपाय:', pa: 'ਰੋਕਥਾਮ ਦੇ ਉਪਾਅ:', or: 'ପ୍ରତିରୋଧକ ବ୍ୟବସ୍ଥା:' },
    learnMore: { en: 'Learn More', hi: 'और जानें', pa: 'ਹੋਰ ਜਾਣੋ', or: 'ଅଧିକ ଜାଣନ୍ତୁ' },
    shareAlert: { en: 'Share Alert', hi: 'अलर्ट साझा करें', pa: 'ਚੇਤਾਵਨੀ ਸਾਂਝੀ ਕਰੋ', or: 'ସତର୍କତା ସେୟାର କରନ୍ତୁ' },
    severityHigh: { en: 'HIGH', hi: 'उच्च', pa: 'ਉੱਚ', or: 'ଉଚ୍ଚ' },
    severityMedium: { en: 'MEDIUM', hi: 'मध्यम', pa: 'ਦਰਮਿਆਨਾ', or: 'ମଧ୍ୟମ' },
    dengue: { en: 'Dengue', hi: 'डेंगू', pa: 'ਡੈਂਗੂ', or: 'ଡେଙ୍ଗୁ' },
    typhoid: { en: 'Typhoid', hi: 'टाइफाइड', pa: 'ਟਾਈਫਾਈਡ', or: 'ଟାଇଫଏଡ୍' },
    viralFever: { en: 'Viral Fever', hi: 'वायरल बुखार', pa: 'ਵਾਇਰਲ ਬੁਖਾਰ', or: 'ଭାଇରାଲ୍ ଜ୍ୱର' },
    denguePrevention: { en: 'Remove stagnant water, use mosquito nets', hi: 'ठहरे हुए पानी को हटा दें, मच्छरदानी का प्रयोग करें', pa: 'ਖੜ੍ਹੇ ਪਾਣੀ ਨੂੰ ਹਟਾਓ, ਮੱਛਰਦਾਨੀ ਦੀ ਵਰਤੋਂ ਕਰੋ', or: 'ଜମିଥିବା ପାଣି ବାହାର କରନ୍ତୁ, ମଶାରୀ ବ୍ୟବହାର କରନ୍ତୁ' },
    typhoidPrevention: { en: 'Drink boiled water, maintain hygiene', hi: 'उबला हुआ पानी पिएं, स्वच्छता बनाए रखें', pa: 'ਉਬਾਲਿਆ ਹੋਇਆ ਪਾਣੀ ਪੀਓ, ਸਫਾਈ ਦਾ ਧਿਆਨ ਰੱਖੋ', or: 'ଫୁଟା ପାଣି ପିଅନ୍ତୁ, ସ୍ୱଚ୍ଛତା ରକ୍ଷା କରନ୍ତୁ' },
    viralFeverPrevention: { en: 'Avoid crowds, wear a mask, stay hydrated', hi: 'भीड़ से बचें, मास्क पहनें, हाइड्रेटेड रहें', pa: 'ਭੀੜ ਤੋਂ ਬਚੋ, ਮਾਸਕ ਪਹਿਨੋ, ਹਾਈਡਰੇਟਿਡ ਰਹੋ', or: 'ଭିଡ଼ରୁ ଦୂରେଇ ରୁହନ୍ତୁ, ମାସ୍କ ପିନ୍ଧନ୍ତୁ, ହାଇଡ୍ରେਟେଡ୍ ରୁହନ୍ତୁ' },
    distanceAway: { en: 'away', hi: 'दूर', pa: 'ਦੂਰ', or: 'ଦୂରରେ' },
    open: { en: 'Open', hi: 'खुला है', pa: 'ਖੁੱਲ੍ਹਾ ਹੈ', or: 'ଖୋଲା' },
    closed: { en: 'Closed', hi: 'बंद है', pa: 'ਬੰਦ ਹੈ', or: 'ବନ୍ଦ' },
    availableDoctors: { en: 'Available Doctors:', hi: 'उपलब्ध डॉक्टर:', pa: 'ਉਪਲਬਧ ਡਾਕਟਰ:', or: 'ଉପଲବ୍ଧ ଡାକ୍ତର:' },
    callHospital: { en: 'Call Hospital', hi: 'अस्पताल को फ़ोन करें', pa: 'ਹਸਪਤਾਲ ਨੂੰ ਕਾਲ ਕਰੋ', or: 'ଡାକ୍ତରଖାନାକୁ କଲ୍ କରନ୍ତୁ' },
    getDirections: { en: 'Get Directions', hi: 'दिशा-निर्देश प्राप्त करें', pa: 'ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ', or: 'ଦିଗ ନିର୍ଣ୍ଣୟ କରନ୍ତୁ' },
    generalPhysician: { en: 'General Physician', hi: 'सामान्य चिकित्सक', pa: 'ਜਨਰਲ ਫਿਜ਼ੀਸ਼ੀਅਨ', or: 'ଜେନେରାଲ୍ ଫିଜିସିଆନ୍' },
    pediatrician: { en: 'Pediatrician', hi: 'बाल रोग विशेषज्ञ', pa: 'ਬਾਲ ਰੋਗ ਵਿਸ਼ੇਸ਼ਗ', or: 'ଶିଶୁରୋଗ ବିଶେଷଜ୍ଞ' },
    emergencyMedicine: { en: 'Emergency Medicine', hi: 'आपातकालीन चिकित्सा', pa: 'ਐਮਰਜੈਂਸੀ ਮੈਡੀਸਨ', or: 'ଜରୁରୀକାଳୀନ ଚିକିତ୍ସା' },
    gynecologist: { en: 'Gynecologist', hi: 'स्त्री रोग विशेषज्ञ', pa: 'ਇਸਤਰੀ ਰੋਗ ਮਾਹਿਰ', or: 'ସ୍ତ୍ରୀରୋଗ ବିଶେଷଜ୍ଞ' },
    govtRajindraHospital: { en: 'Govt. Rajindra Hospital', hi: 'सरकारी राजिंदरा अस्पताल', pa: 'ਸਰਕਾਰੀ ਰਾਜਿੰਦਰਾ ਹਸਪਤਾਲ', or: 'ସରକାରୀ ରାଜିନ୍ଦ୍ରା ହସ୍ପିଟାଲ' },
    chcSanaur: { en: 'Community Health Centre, Sanaur', hi: 'सामुदायिक स्वास्थ्य केंद्र, सनौर', pa: 'ਕਮਿਊਨਿਟੀ ਹੈਲਥ ਸੈਂਟਰ, ਸਨੌਰ', or: 'ସାମୁଦାୟିକ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର, ସନୌର' },
    drGurpreetSingh: { en: 'Dr. Gurpreet Singh', hi: 'डॉ. गुरप्रीत सिंह', pa: 'ਡਾ. ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ', or: 'ଡା. ଗୁରପ୍ରୀତ ସିଂ' },
    drHarleenKaur: { en: 'Dr. Harleen Kaur', hi: 'डॉ. हरलीन कौर', pa: 'ਡਾ. ਹਰਲੀਨ ਕੌਰ', or: 'ଡା. ହରଲୀନ କୌର' },
    drVikramjeetGill: { en: 'Dr. Vikramjeet Gill', hi: 'डॉ. विक्रमजीत गिल', pa: 'ਡਾ. ਵਿਕਰਮਜੀਤ ਗਿੱਲ', or: 'ଡା. ବିକ୍ରମଜିତ୍ ଗିଲ୍' },
    drSimranBedi: { en: 'Dr. Simran Bedi', hi: 'डॉ. सिमरन बेदी', pa: 'ਡਾ. ਸਿਮਰਨ ਬੇਦੀ', or: 'ଡା. ସିମରନ୍ ବେଦୀ' },
    profileTitle: { en: 'My Health Profile', hi: 'मेरी स्वास्थ्य प्रोफ़ाइल', pa: 'ਮੇਰੀ ਸਿਹਤ ਪ੍ਰੋਫਾਈਲ', or: 'ମୋର ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରୋଫାଇଲ୍' },
    personalInfo: { en: 'Personal Information', hi: 'व्यक्तिगत जानकारी', pa: 'ਨਿੱਜੀ ਜਾਣਕਾਰੀ', or: 'ବ୍ୟକ୍ତିଗତ ସୂଚନା' },
    healthInfo: { en: 'Medical Information', hi: 'चिकित्सा जानकारी', pa: 'ਮੈਡੀਕਲ ਜਾਣਕਾਰੀ', or: 'ଡାକ୍ତରୀ ସୂଚନା' },
    fullName: { en: 'Full Name', hi: 'पूरा नाम', pa: 'ਪੂਰਾ ਨਾਂਮ', or: 'ପୁରା ନାମ' },
    age: { en: 'Age', hi: 'आयु', pa: 'ਉਮਰ', or: 'ବୟସ' },
    bloodGroup: { en: 'Blood Group', hi: 'रक्त समूह', pa: 'ਖੂਨ ਦਾ ਗਰੁੱਪ', or: 'ରକ୍ତ ଗୋଷ୍ଠୀ' },
    allergies: { en: 'Allergies', hi: 'एलर्जी', pa: 'ਐਲਰਜੀਆਂ', or: 'ଆଲର୍ଜି' },
    chronicConditions: { en: 'Chronic Conditions', hi: 'पुरानी बीमारियाँ', pa: 'ਪੁਰਾਣੀਆਂ ਬਿਮਾਰੀਆਂ', or: 'ପୁରୁଣା ରୋଗ' },
    dietPreference: { en: 'Diet Preference', hi: 'आहार प्राथमिकता', pa: 'ਖੁਰਾਕ ਪਸੰਦ', or: 'ଖାଦ୍ୟ ପସନ୍ଦ' },
    vegetarian: { en: 'Vegetarian', hi: 'शाकाहारी', pa: 'ਸ਼ਾਕਾਹਾਰੀ', or: 'ଶାକାହାରୀ' },
    nonVegetarian: { en: 'Non-Vegetarian', hi: 'मांसाहारी', pa: 'ਮਾਸਾਹਾਰੀ', or: 'ମାଂସାହାରୀ' },
    none: { en: 'None', hi: 'कोई नहीं', pa: 'ਕੋਈ ਨਹੀਂ', or: 'କିଛି ନୁହେଁ' },
    egConditions: { en: 'e.g., Diabetes, High BP', hi: 'उदा., मधुमेह, उच्च रक्तचाप', pa: 'ਜਿਵੇਂ, ਸ਼ੂਗਰ, ਹਾਈ ਬੀ.ਪੀ', or: 'ଯେପରି, ମଧୁମେହ, ଉଚ୍ଚ ରକ୍ତଚାପ' },
    editProfile: { en: 'Edit Profile', hi: 'प्रोफ़ाइल संपादित करें', pa: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ', or: 'ପ୍ରୋଫାଇଲ୍ ସମ୍ପାଦନ କରନ୍ତୁ' },
    saveProfile: { en: 'Save Profile', hi: 'प्रोफ़ाइल सहेजें', pa: 'ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ', or: 'ପ୍ରୋଫାଇଲ୍ ସେଭ୍ କରନ୍ତୁ' },
    profileSaved: { en: 'Profile saved successfully!', hi: 'प्रोफ़ाइल सफलतापूर्वक सहेजी गई!', pa: 'ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਸੁਰੱਖਿਅਤ ਕੀਤੀ ਗਈ!', or: 'ପ୍ରୋଫାଇଲ୍ ସଫଳତାର ସହିତ ସେଭ୍ ହେଲା!' },
    clearChat: { en: 'Clear Chat', hi: 'चैट साफ़ करें', pa: 'ਚੈਟ ਸਾਫ਼ ਕਰੋ', or: 'ଚାଟ୍ ସଫା କରନ୍ତୁ' },
    clearChatConfirm: { en: 'Are you sure you want to clear the entire conversation?', hi: 'क्या आप वाकई पूरी बातचीत साफ़ करना चाहते हैं?', pa: 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਸਾਰੀ ਗੱਲਬਾਤ ਨੂੰ ਸਾਫ਼ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?', or: 'ଆପଣ ସମଗ୍ର ବାର୍ତ୍ତାଳାପ ସଫା କରିବାକୁ ନିଶ୍ଚିତ କି?' },
    clear: { en: 'Clear', hi: 'साफ़ करें', pa: 'ਸਾਫ਼ ਕਰੋ', or: 'ସଫା' },
    cancel: { en: 'Cancel', hi: 'रद्द करें', pa: 'ਰੱਦ ਕਰੋ', or: 'ବାତିଲ କରନ୍ତୁ' },
    myHealthTitle: { en: 'My Health Resources', hi: 'मेरे स्वास्थ्य संसाधन', pa: 'ਮੇਰੇ ਸਿਹਤ ਸਰੋਤ', or: 'ମୋର ସ୍ୱାସ୍ଥ୍ୟ ସମ୍ବଳ' },
    firstAidTitle: { en: 'First-Aid Guide', hi: 'प्राथमिक उपचार गाइड', pa: 'ਮੁੱਢਲੀ ਸਹਾਇਤਾ ਗਾਈਡ', or: 'ପ୍ରାଥମିକ ଚିକିତ୍ସା ଗାଇଡ୍' },
    firstAidDesc: { en: 'Quick help for emergencies', hi: 'आपात स्थिति के लिए त्वरित मदद', pa: 'ਐਮਰਜੈਂਸੀ ਲਈ ਤੁਰੰਤ ਮਦਦ', or: 'ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ପାଇଁ ତୁରନ୍ତ ସାହାଯ୍ୟ' },
    ashaDirectoryTitle: { en: 'ASHA Worker Directory', hi: 'आशा कार्यकर्ता निर्देशिका', pa: 'ਆਸ਼ਾ ਵਰਕਰ ਡਾਇਰੈਕਟਰੀ', or: 'ଆଶା କର୍ମୀ ଡିରେକ୍ଟୋରୀ' },
    ashaDirectoryDesc: { en: 'Find your local health worker', hi: 'अपने स्थानीय स्वास्थ्य कार्यकर्ता को खोजें', pa: 'ਆਪਣੇ ਸਥਾਨਕ ਸਿਹਤ ਕਰਮਚਾਰੀ ਨੂੰ ਲੱਭੋ', or: 'ଆପଣଙ୍କ ସ୍ଥାନୀୟ ସ୍ୱାସ୍ଥ୍ୟ କର୍ମୀଙ୍କୁ ଖୋଜନ୍ତୁ' },
    healthCampTitle: { en: 'Upcoming Health Camp', hi: 'आगामी स्वास्थ्य शिविर', pa: 'ਆਉਣ ਵਾਲਾ ਸਿਹਤ ਕੈਂਪ', or: 'ଆଗାମୀ ସ୍ୱାସ୍ଥ୍ୟ ଶିବିର' },
    healthCampDesc: { en: 'Free check-up & consultation at Lehal village.', hi: 'लेहल गांव में मुफ्त जांच और परामर्श।', pa: 'ਲੇਹਲ ਪਿੰਡ ਵਿਖੇ ਮੁਫਤ ਜਾਂਚ ਅਤੇ ਸਲਾਹ-ਮਸ਼ਵਰਾ।', or: 'ଲେହଲ ଗାଁରେ ମାଗଣା ଯାଞ୍ଚ ଏବଂ ପରାମର୍ଶ।' },
    viewDetails: { en: 'View Details', hi: 'विवरण देखें', pa: 'ਵੇਰਵੇ ਵੇਖੋ', or: 'ବିବରଣୀ ଦେଖନ୍ତୁ' },
    searchByVillage: { en: 'Search by village name...', hi: 'गांव के नाम से खोजें...', pa: 'ਪਿੰਡ ਦੇ ਨਾਮ ਦੁਆਰਾ ਖੋਜ ਕਰੋ...', or: 'ଗାଁ ନାମରେ ଖୋଜନ୍ତୁ...' },
    callNow: { en: 'Call Now', hi: 'अभी कॉल करें', pa: 'ਹੁਣੇ ਕਾਲ ਕਰੋ', or: 'ବର୍ତ୍ତମାନ କଲ୍ କରନ୍ତୁ' },
    burns: { en: 'Burns', hi: 'जलना', pa: 'ਸੜਨਾ', or: 'ପୋଡ଼ାଜଳା' },
    snakeBite: { en: 'Snake Bite', hi: 'सांप का काटना', pa: 'ਸੱਪ ਦਾ ਡੰਗ', or: 'ସାପ କାମୁଡ଼ା' },
    fever: { en: 'Fever', hi: 'बुखार', pa: 'ਬੁਖਾਰ', or: 'ଜ୍ୱର' },
    cutsWounds: { en: 'Cuts & Wounds', hi: 'कटना और घाव', pa: 'ਕੱਟ ਅਤੇ ਜ਼ਖ਼ਮ', or: 'କଟା ଏବଂ ଘା' },
    getPersonalizedTips: { en: 'Get Personalized Tips', hi: 'व्यक्तिगत सुझाव प्राप्त करें', pa: 'ਨਿੱਜੀ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ', or: 'ବ୍ୟକ୍ତିଗତ ଟିପ୍ସ ପାଆନ୍ତୁ' },
    personalizedTipsTitle: { en: 'Personalized For You', hi: 'आपके लिए व्यक्तिगत', pa: 'ਤੁਹਾਡੇ ਲਈ ਨਿੱਜੀ', or: 'ଆପଣଙ୍କ ପାଇଁ ବ୍ୟକ୍ତିଗତ' },
    imageSent: { en: 'Image sent. How can I help with this?', hi: 'छवि भेजी गई। मैं इसमें कैसे मदद कर सकता हूँ?', pa: 'ਤਸਵੀਰ ਭੇਜੀ ਗਈ। ਮੈਂ ਇਸ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?', or: 'ଛବି ପଠାଗଲା। ମୁଁ ଏଥିରେ କିପରି ସାହାଯ୍ୟ କରିପାରେ?' },
    navDietPlan: { en: 'Diet Plan', hi: 'आहार योजना', pa: 'ਖੁਰਾਕ ਯੋਜਨਾ', or: 'ଡାଏଟ୍ ପ୍ଲାନ୍' },
    dietPlannerTitle: { en: 'Personalized Diet Plan', hi: 'व्यक्तिगत आहार योजना', pa: 'ਨਿੱਜੀ ਖੁਰਾਕ ਯੋਜਨਾ', or: 'ବ୍ୟକ୍ତିଗତ ଡାଏଟ୍ ପ୍ଲାନ୍' },
    generateDietPlan: { en: 'Generate My Diet Plan', hi: 'मेरी आहार योजना बनाएं', pa: 'ਮੇਰੀ ਖੁਰਾਕ ਯੋਜਨਾ ਬਣਾਓ', or: 'ମୋର ଡାଏଟ୍ ପ୍ଲାନ୍ ସୃଷ୍ଟି କରନ୍ତୁ' },
    completeProfilePrompt: { en: 'Please complete your age and health conditions in your profile to get a personalized diet plan.', hi: 'व्यक्तिगत आहार योजना प्राप्त करने के लिए कृपया अपनी प्रोफ़ाइल में अपनी आयु और स्वास्थ्य स्थितियों को पूरा करें।', pa: 'ਨਿੱਜੀ ਖੁਰਾਕ ਯੋਜਨਾ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਆਪਣੀ ਉਮਰ ਅਤੇ ਸਿਹਤ ਸਥਿਤੀਆਂ ਨੂੰ ਪੂਰਾ ਕਰੋ।', or: 'ବ୍ୟକ୍ତିଗତ ଡାଏଟ୍ ପ୍ଲାନ୍ ପାଇବାକୁ ଦୟାକରି ଆପଣଙ୍କ ପ୍ରୋଫାଇଲରେ ଆପଣଙ୍କ ବୟସ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି ପୂରଣ କରନ୍ତୁ।' },
    goToProfile: { en: 'Go to Profile', hi: 'प्रोफ़ाइल पर जाएं', pa: 'ਪ੍ਰੋਫਾਈਲ \'ਤੇ ਜਾਓ', or: 'ପ୍ରୋଫାଇଲକୁ ଯାଆନ୍ତୁ' },
    generatingPlan: { en: 'Generating your plan...', hi: 'आपकी योजना बना रहा है...', pa: 'ਤੁਹਾਡੀ ਯੋਜਨਾ ਬਣਾ ਰਿਹਾ ਹੈ...', or: 'ଆପଣଙ୍କ ଯੋଜନା ପ୍ରସ୍ତୁତ କରୁଛି...' },
};


// First Aid guide content — static medical content kept inline
const mockFirstAidGuides = [{

        id: 'burns',
        titleKey: 'burns',
        steps: {
            en: [
                "Immediately cool the burn with cool or lukewarm running water for 20 minutes.",
                "Remove any clothing or jewellery that's near the burnt area of skin.",
                "Cover the burn by placing a layer of cling film over it.",
                "Do not apply ice, iced water, or any creams or greasy substances like butter."
            ],
            hi: [
                "जले हुए स्थान को तुरंत 20 मिनट के लिए ठंडे या गुनगुने बहते पानी से ठंडा करें।",
                "जले हुए त्वचा के पास के किसी भी कपड़े या गहने को हटा दें।",
                "जले हुए स्थान पर क्लिंग फिल्म की एक परत रखकर उसे ढक दें।",
                "बर्फ, बर्फीला पानी, या कोई क्रीम या मक्खन जैसी चिकनी चीजें न लगाएं।"
            ],
            pa: [
                "ਸੜੇ ਹੋਏ ਹਿੱਸੇ ਨੂੰ ਤੁਰੰਤ 20 ਮਿੰਟ ਲਈ ਠੰਡੇ ਜਾਂ ਕੋਸੇ ਚਲਦੇ ਪਾਣੀ ਨਾਲ ਠੰਡਾ ਕਰੋ।",
                "ਸੜੀ ਹੋਈ ਚਮੜੀ ਦੇ ਨੇੜੇ ਦੇ ਕਿਸੇ ਵੀ ਕੱਪੜੇ ਜਾਂ ਗਹਿਣਿਆਂ ਨੂੰ ਹਟਾ ਦਿਓ।",
                "ਸੜੇ ਹੋਏ ਹਿੱਸੇ ਉੱਤੇ ਕਲਿੰਗ ਫਿਲਮ ਦੀ ਇੱਕ ਪਰਤ ਰੱਖ ਕੇ ਉਸਨੂੰ ਢੱਕ ਦਿਓ।",
                "ਬਰਫ਼, ਬਰਫ਼ ਵਾਲਾ ਪਾਣੀ, ਜਾਂ ਕੋਈ ਕਰੀਮ ਜਾਂ ਮੱਖਣ ਵਰਗੀਆਂ ਚਿਕਨੀਆਂ ਚੀਜ਼ਾਂ ਨਾ ਲਗਾਓ।"
            ],
            or: [
                 "ପୋଡ଼ିଯାଇଥିବା ସ୍ଥାନକୁ ତୁରନ୍ତ ୨୦ ମିନିଟ୍ ପାଇଁ ଥଣ୍ଡା କିମ୍ବା କୁସୁମ ପାଣିରେ ଧୁଅନ୍ତୁ।",
                 "ପୋଡ଼ିଯାଇଥିବା ଚର୍ମ ପାଖରେ ଥିବା କୌଣସି ପୋଷାକ ବା ଅଳଙ୍କାର କାଢ଼ି ଦିଅନ୍ତୁ।",
                 "ପୋଡ଼ିଯାଇଥିବା ସ୍ଥାନକୁ କ୍ଲିଙ୍ଗ୍ ଫିଲ୍ମର ଏକ ସ୍ତର ଦେଇ ଘୋଡ଼ାଇ ଦିଅନ୍ତୁ।",
                 "ବରଫ, ବରଫ ପାଣି, କିମ୍ବା କୌଣସି କ୍ରିମ୍ ବା ଲହୁଣୀ ଭଳି ଚିକ୍କଣ ପଦାର୍ଥ ଲଗାନ୍ତୁ ନାହିଁ।"
            ]
        }
    },
    {
        id: 'snakeBite',
        titleKey: 'snakeBite',
        steps: {
            en: [
                "Stay calm and keep the bitten area still and lower than the heart.",
                "Remove jewellery and tight clothing before swelling starts.",
                "Wash the bite with soap and water and cover with a clean, dry dressing.",
                "Seek medical help immediately. Do not try to cut the wound or suck out the venom."
            ],
            hi: [
                "शांत रहें और काटे हुए क्षेत्र को स्थिर और हृदय से नीचे रखें।",
                "सूजन शुरू होने से पहले गहने और तंग कपड़े हटा दें।",
                "काटे हुए स्थान को साबुन और पानी से धोएं और साफ, सूखी पट्टी से ढक दें।",
                "तुरंत चिकित्सा सहायता लें। घाव को काटने या जहर चूसने की कोशिश न करें।"
            ],
            pa: [
                "ਸ਼ਾਂਤ ਰਹੋ ਅਤੇ ਡੰਗੇ ਹੋਏ ਖੇਤਰ ਨੂੰ ਸਥਿਰ ਅਤੇ ਦਿਲ ਤੋਂ ਹੇਠਾਂ ਰੱਖੋ।",
                "ਸੋਜ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਗਹਿਣੇ ਅਤੇ ਤੰਗ ਕੱਪੜੇ ਹਟਾ ਦਿਓ।",
                "ਡੰਗੇ ਹੋਏ ਸਥਾਨ ਨੂੰ ਸਾਬਣ ਅਤੇ ਪਾਣੀ ਨਾਲ ਧੋਵੋ ਅਤੇ ਸਾਫ਼, ਸੁੱਕੀ ਪੱਟੀ ਨਾਲ ਢੱਕ ਦਿਓ।",
                "ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਲਵੋ। ਜ਼ਖ਼ਮ ਨੂੰ ਕੱਟਣ ਜਾਂ ਜ਼ਹਿਰ ਚੂਸਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਨਾ ਕਰੋ।"
            ],
            or: [
                 "ଶାନ୍ତ ରୁହନ୍ତୁ ଏବଂ କାମୁଡ଼ିଥିବା ସ୍ଥାନକୁ ସ୍ଥିର ଏବଂ ହୃଦୟଠାରୁ ତଳକୁ ରଖନ୍ତୁ।",
                 "ଫୁଲିବା ଆରମ୍ଭ ହେବା ପୂର୍ବରୁ ଅଳଙ୍କାର ଏବଂ କଠିନ ପୋଷାକ କାଢ଼ି ଦିଅନ୍ତୁ।",
                 "କାମୁଡ଼ିଥିବା ସ୍ଥାନକୁ ସାବୁନ ଏବଂ ପାଣିରେ ଧୋଇ ଏକ ସଫା, ଶୁଖିଲା ଡ୍ରେସିଂରେ ଘୋଡ଼ାଇ ଦିଅନ୍ତୁ।",
                 "ତୁରନ୍ତ ଡାକ୍ତରୀ ସାହାଯ୍ୟ ନିଅନ୍ତୁ। କ୍ଷତକୁ କାଟିବାକୁ କିମ୍ବା ବିଷ ଶୋଷିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ ନାହିଁ।"
            ]
        }
    },
];

const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' } // Added Odia
];

// Utility functions
const playSound = (text, language = 'en') => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech first
        const utterance = new SpeechSynthesisUtterance(text);
        // Added Odia support
        const langMap = { hi: 'hi-IN', pa: 'pa-IN', or: 'or-IN', en: 'en-IN' };
        utterance.lang = langMap[language] || 'en-IN';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
};

const startVoiceRecognition = (onResult, language = 'en') => {
    if (!('webkitSpeechRecognition' in window)) {
        console.warn('Voice recognition not supported in your browser.');
        return null;
    }
    const recognition = new window.webkitSpeechRecognition();
    // Added Odia support
    const langMap = { hi: 'hi-IN', pa: 'pa-IN', or: 'or-IN', en: 'en-IN' };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
    };
    recognition.start();
    return recognition;
};

// **CUSTOM SVG ICONS for a softer, more caring feel**
const CustomSehatMitraLogo = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="#4ade80"
      strokeWidth="6"
      strokeLinecap="round"
    >
      <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 38.835 85.4925 28.7101 78.2104 21.2132" />
      <path d="M50 35V65" />
      <path d="M35 50H65" />
      <path d="M70 20L80 30" />
    </g>
  </svg>
);


// Error boundary component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg p-6 m-4 max-w-2xl mx-auto animate-fade-in">
    <div className="flex flex-col items-center text-center">
      <AlertTriangle className="h-10 w-10 text-red-500 mb-3" />
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
        An Error Occurred
      </h3>
      <p className="mt-1 text-red-700 dark:text-red-300">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);


// Main App Component
const HealthcareApp = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showWelcome, setShowWelcome] = useState(true);

    const [userProfile, setUserProfile] = useState({
        name: '',
        age: '',
        bloodGroup: '',
        allergies: '',
        conditions: '',
        dietPreference: ''
    });

    // Google Auth state
    const [user, setUser] = useState(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    // ── DB user identity helper ────────────────────────────────────────────────
    // Returns the email used as the user key for all DB operations.
    // Falls back to a guest ID stored in localStorage for unauthenticated users.
    const getUserEmail = useCallback(() => {
        if (user?.email) return user.email;
        // Guest mode: use a persistent guest ID
        let guestId = localStorage.getItem('sehatMitraGuestId');
        if (!guestId) {
            guestId = `guest_${Math.random().toString(36).slice(2)}@sehatmitra.local`;
            localStorage.setItem('sehatMitraGuestId', guestId);
        }
        return guestId;
    }, [user]);

    // ── Load profile from DB on mount ─────────────────────────────────────────
    useEffect(() => {
        const loadProfileFromDB = async () => {
            try {
                const email = localStorage.getItem('sehatMitraGuestId') ||
                              JSON.parse(localStorage.getItem('sehatMitraUser') || 'null')?.email;
                if (!email) return;
                const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
                const data = await res.json();
                if (data.user) {
                    setUserProfile({
                        name: data.user.name || '',
                        age: data.user.age || '',
                        bloodGroup: data.user.bloodGroup || '',
                        allergies: data.user.allergies || '',
                        conditions: data.user.chronicConditions || '',
                        dietPreference: data.user.dietPreference || '',
                    });
                    // Restore saved user session
                    if (data.user.googleId) {
                        const savedUser = localStorage.getItem('sehatMitraUser');
                        if (savedUser) setUser(JSON.parse(savedUser));
                    }
                }
            } catch (e) {
                console.error('Failed to load profile from DB', e);
            }
        };
        loadProfileFromDB();
        loadGoogleAPI();
    }, []);

    // Google API loading
    const loadGoogleAPI = () => {
        if (typeof window !== 'undefined' && !window.google) {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleAuth;
            document.head.appendChild(script);
        } else if (window.google) {
            initializeGoogleAuth();
        }
    };

    // Initialize Google Auth
    const initializeGoogleAuth = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (window.google && clientId) {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleSignIn,
                auto_select: false,
                cancel_on_tap_outside: true
            });
        } else if (!clientId) {
            console.warn('Google sign-in is unavailable because NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.');
        }
    };

    // Handle Google Sign In — upsert user to DB
    const handleGoogleSignIn = async (response) => {
        setIsSigningIn(true);
        try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            const userData = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                given_name: payload.given_name,
                family_name: payload.family_name
            };
            setUser(userData);
            localStorage.setItem('sehatMitraUser', JSON.stringify(userData));

            // Upsert user in MongoDB
            const profileToSave = {
                email: userData.email,
                googleId: userData.id,
                name: userData.name,
                ...(!userProfile.name ? {} : {
                    age: userProfile.age,
                    bloodGroup: userProfile.bloodGroup,
                    allergies: userProfile.allergies,
                    chronicConditions: userProfile.conditions,
                    dietPreference: userProfile.dietPreference,
                }),
            };
            await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileToSave),
            });

            // Auto-fill name if profile is empty
            if (!userProfile.name && userData.name) {
                setUserProfile(prev => ({ ...prev, name: userData.name }));
            }
        } catch (error) {
            console.error('Google Sign-In error:', error);
            setError('Failed to sign in with Google. Please try again.');
        } finally {
            setIsSigningIn(false);
        }
    };

    // Handle Google Sign Out
    const handleGoogleSignOut = () => {
        setUser(null);
        localStorage.removeItem('sehatMitraUser');
        if (window.google) {
            window.google.accounts.id.disableAutoSelect();
        }
    };

    // Welcome screen timer
    useEffect(() => {
        const welcomeTimer = setTimeout(() => {
            setShowWelcome(false);
        }, 2500);
        return () => clearTimeout(welcomeTimer);
    }, []);

    // Save profile to MongoDB
    const saveUserProfile = useCallback(async (profile) => {
        setUserProfile(profile);
        try {
            const email = user?.email || localStorage.getItem('sehatMitraGuestId') ||
                `guest_${Math.random().toString(36).slice(2)}@sehatmitra.local`;
            if (!localStorage.getItem('sehatMitraGuestId') && !user?.email) {
                localStorage.setItem('sehatMitraGuestId', email);
            }
            await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name: profile.name,
                    age: profile.age,
                    bloodGroup: profile.bloodGroup,
                    allergies: profile.allergies,
                    chronicConditions: profile.conditions,
                    dietPreference: profile.dietPreference,
                }),
            });
        } catch (e) {
            console.error('Failed to save profile to DB', e);
            setError('Your profile could not be saved.');
        }
    }, [user]);


    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const t = useCallback((key) => {
        return translations[key] ? translations[key][language] || translations[key]['en'] : key;
    }, [language]);

    const contextValue = useMemo(() => ({
        t,
        currentView,
        setCurrentView,
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        user,
        handleGoogleSignIn,
        handleGoogleSignOut,
        isSigningIn,
        userProfile,
        saveUserProfile,
        setError
    }), [t, currentView, darkMode, language, user, isSigningIn, userProfile, setError]);

    const renderContent = () => {
        if (error) {
            return <ErrorMessage message = { error }
            onRetry = {
                () => setError(null) }
            />;
        }
        switch (currentView) {
            case 'dashboard':
                return <Dashboard / > ;
            case 'chatbot':
                return <Chatbot / > ;
            case 'hospitals':
                return <Hospitals / > ;
            case 'alerts':
                return <Alerts / > ;
            case 'profile':
                return <Profile / > ;
            case 'firstAid':
                return <FirstAidGuide / > ;
            case 'ashaWorkers':
                return <AshaWorkerDirectory / > ;
            case 'dietPlanner': // New view for Diet Planner
                return <DietPlanner / > ;
            default:
                return <Dashboard / > ;
        }
    };

  return (
  <AppContext.Provider value={contextValue}>
    <AppStyles />
    {showWelcome && <WelcomeScreen />}
    <div
      className={`transition-opacity duration-500 ${
        showWelcome ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="aurora-background"></div>
      <div className="relative bg-gray-50/50 dark:bg-gray-900/50 h-screen flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 min-h-0 overflow-hidden">{renderContent()}</main>
        <Navigation />
      </div>
    </div>
  </AppContext.Provider>
  );
};

const WelcomeScreen = () => {
  const { darkMode } = useContext(AppContext);

  return (
    <div
      className={`welcome-screen animate-fade-in ${
        darkMode ? "dark" : ""
      }`}
    >
      <CustomSehatMitraLogo className="w-24 h-24 welcome-screen-logo" />
      <p className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
        SehatMitra
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Your health companion
      </p>
    </div>
  );
};


// Header Component
// Google Sign-In Button Component
const GoogleSignInButton = () => {
    const { t, user, handleGoogleSignOut, isSigningIn } = useContext(AppContext);

    const triggerGoogleSignIn = () => {
        if (window.google) {
            window.google.accounts.id.prompt();
        }
    };

    if (user) {
        return (
            <div className="flex items-center space-x-3">
                <img 
                    src={user.picture} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
                    {user.given_name || user.name}
                </span>
                <button
                    onClick={handleGoogleSignOut}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                    {t('signOut')}
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={triggerGoogleSignIn}
            disabled={isSigningIn}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
            {isSigningIn ? (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
            )}
            <span>{t('signInWithGoogle')}</span>
        </button>
    );
};

const Header = () => {
    const { t, currentView, setCurrentView, darkMode, setDarkMode, language, setLanguage, user } = useContext(AppContext);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
  <header className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <CustomSehatMitraLogo className="h-8 w-8 text-green-500" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("appName")}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="text-sm border rounded-lg px-2 py-1 bg-white/50 dark:bg-gray-700/50 dark:text-white dark:border-gray-600"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.native}
              </option>
            ))}
          </select>

          <GoogleSignInButton />

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* Profile Button */}
          <button
            onClick={() => setCurrentView("profile")}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Open Profile"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    {/* Outbreak Alert Bar */}
    <OutbreakAlertBar />
  </header>
);
};


// Outbreak Alert Bar
const OutbreakAlertBar = () => {
    const { t } = useContext(AppContext);
    const [currentAlert, setCurrentAlert] = useState(0);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        fetch('/api/alerts')
            .then(r => r.json())
            .then(data => setAlerts(data.alerts || []))
            .catch(e => console.error('Failed to fetch alerts for banner', e));
    }, []);

    useEffect(() => {
        if (alerts.length > 1) {
            const interval = setInterval(() => {
                setCurrentAlert((prev) => (prev + 1) % alerts.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [alerts]);

    if (alerts.length === 0) return null;

    const alert = alerts[currentAlert];
    const isHighSeverity = alert.severity === 'high';
    const bgColor = isHighSeverity ? 'bg-red-100 dark:bg-red-900/80' : 'bg-yellow-100 dark:bg-yellow-900/80';
    const textColor = isHighSeverity ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200';

    return (
  <div className={`${bgColor} ${textColor} px-4 py-2 text-center text-sm`}>
    <AlertTriangle className="inline h-4 w-4 mr-1" />
    <span className="font-medium">{t("alert")}</span>{" "}
    {alert.casesCount || alert.cases} {t(alert.disease || alert.diseaseKey)} {t("casesIn")} {alert.area}
    <span className="ml-2 text-xs">• {t(alert.preventionKey) || alert.preventionMeasures}</span>
  </div>
);
};


// Dashboard Component
const Dashboard = () => {
    const { setCurrentView, t, userProfile, user } = useContext(AppContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const colorMap = {
        blue: { bg: 'from-blue-400 to-indigo-500', shadow: 'hover:shadow-indigo-500/30' },
        green: { bg: 'from-green-400 to-emerald-500', shadow: 'hover:shadow-emerald-500/30' },
        orange: { bg: 'from-orange-400 to-amber-500', shadow: 'hover:shadow-amber-500/30' },
    };

    const dashboardCards = [
        { title: t('healthAssistantTitle'), description: t('healthAssistantDesc'), icon: MessageCircle, color: 'blue', view: 'chatbot' },
        { title: t('findHospitalsTitle'), description: t('findHospitalsDesc'), icon: Hospital, color: 'green', view: 'hospitals' },
        { title: t('healthAlertsTitle'), description: t('healthAlertsDesc'), icon: Bell, color: 'orange', view: 'alerts' },
    ];

    const welcomeText = userProfile.name ? `${t('welcomeMessage')}, ${userProfile.name}!` : t('welcomeMessage') + " to " + t('appName');

   return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    {/* Welcome Text */}
    <div
      className={`transition-all duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {welcomeText}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">{t("appSubtitle")}</p>
    </div>

    {/* Sign-In Prompt for non-authenticated users */}
    {!user && (
      <div className="my-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('welcome')} to SehatMitra!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {t('signInPrompt')}
                </p>
              </div>
            </div>
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    )}

    {/* Health Camp Banner */}
    <div className="my-8">
      <HealthCampBanner />
    </div>

    {/* Dashboard Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card, index) => {
        const IconComponent = card.icon;
        const styles = colorMap[card.color];
        return (
          <div
            key={card.view}
            onClick={() => setCurrentView(card.view)}
            className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg cursor-pointer 
              transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl ${styles.shadow}
              ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${styles.bg} rounded-xl opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300`}
            ></div>
            <div className="p-6 relative">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${styles.bg} text-white rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    {/* Resources */}
    <div className="my-8">
      <MyHealthResources />
    </div>

    {/* Emergency + Tips */}
    <div
      className={`transition-all duration-700 delay-500 mt-8 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <EmergencyServices />
      <HealthTips />
    </div>
  </div>
);
};



// ** NEW COMPONENTS for Dashboard **
const HealthCampBanner = () => {
    const { t } = useContext(AppContext);
    const mockHealthCamps = [{
        id: 1,
        titleKey: 'healthCampTitle',
        descriptionKey: 'healthCampDesc',
        date: '25 Sep, 2025',
        location: 'Lehal Village, Patiala'
    }];
    const camp = mockHealthCamps[0];

    // Health Camp Card
return (
  <div
    className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-xl p-6 overflow-hidden animate-card-pop-in"
    style={{ animationDelay: "300ms" }}
  >
    <div className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10">
      <Heart size={96} strokeWidth={1.5} />
    </div>
    <div className="relative z-10">
      <h3 className="font-bold text-lg flex items-center mb-1">
        <Activity className="mr-2" /> {t(camp.titleKey)}
      </h3>
      <p className="text-sm mb-3">{t(camp.descriptionKey)}</p>
      <div className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full inline-block">
        {camp.date} &bull; {camp.location}
      </div>
    </div>
  </div>
);
};

// MyHealthResources Component
const MyHealthResources = () => {
  const { t, setCurrentView } = useContext(AppContext);

  const resources = [
    { titleKey: "firstAidTitle", descKey: "firstAidDesc", icon: LifeBuoy, view: "firstAid" },
    { titleKey: "ashaDirectoryTitle", descKey: "ashaDirectoryDesc", icon: Users, view: "ashaWorkers" },
  ];

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t("myHealthTitle")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res) => (
          <button
            key={res.view}
            onClick={() => setCurrentView(res.view)}
            className="text-left p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center space-x-4"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-500 flex items-center justify-center">
              <res.icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {t(res.titleKey)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t(res.descKey)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const EmergencyServices = () => {
  const { t } = useContext(AppContext);
  const emergencyNumbers = [
    { name: t("ambulance"), number: "108", color: "bg-red-500", icon: Phone },
    { name: t("police"), number: "112", color: "bg-blue-500", icon: Shield },
    { name: t("healthHelpline"), number: "104", color: "bg-green-500", icon: Heart },
  ];

  const callEmergency = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
        {t("emergencyServicesTitle")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {emergencyNumbers.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <button
              key={index}
              onClick={() => callEmergency(service.number)}
              className={`${service.color} hover:shadow-lg hover:${service.color}/50 text-white rounded-lg p-4 flex items-center justify-center space-x-2 transition-all duration-200 font-semibold transform hover:scale-105`}
            >
              <IconComponent className="h-5 w-5" />
              <span>{service.name}</span>
              <span className="font-bold">{service.number}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Health Tips Component
const HealthTips = () => {
    const { t, userProfile, setError } = useContext(AppContext);
    const [tips, setTips] = useState(t('healthTips'));
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Default tips need to be updated when language changes
    useEffect(() => {
        if (!isPersonalized) {
            setTips(t('healthTips'));
        }
    }, [t, isPersonalized]);


    const getPersonalizedTips = async() => {
        setIsLoading(true);
        setError(null);

        const systemPrompt = `You are a health expert creating personalized tips for a user in rural Punjab, India.
        User's Age: ${userProfile.age || 'Not specified'}
        User's Chronic Conditions: ${userProfile.conditions || 'None specified'}
        Generate 3 simple, actionable, and encouraging health tips tailored to this user. The tips should be easy to follow with limited resources. Focus on diet, light exercise, or lifestyle adjustments. The language must be extremely simple. Output only the tips in a numbered list, like "1. First tip.\n2. Second tip.\n3. Third tip.".`;

      try {
  const response = await fetch('/api/ai', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: systemPrompt }),
  });

  const result = await response.json();
  const text = result?.text;

  if (text) {
    const formattedTips = text
      .split("\n")
      .map((tip) => tip.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    setTips(formattedTips);
    setIsPersonalized(true);
  } else {
    console.error("Gemini API Error: No content in response", result);
    setError("Sorry, could not generate personalized tips right now.");
  }
} catch (error) {
  console.error("Error fetching personalized tips:", error);
  setError(
    "There was a network problem. Please check your connection and try again."
  );
} finally {
  setIsLoading(false);
}
    };

    return (
  <div className="bg-green-100/50 dark:bg-green-900/50 backdrop-blur-md rounded-xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 flex items-center">
          <BookHeart className="h-5 w-5 mr-2" />
          {isPersonalized ? t('personalizedTipsTitle') : t('dailyHealthTipsTitle')}
        </h3>
      </div>
      <button
        onClick={getPersonalizedTips}
        disabled={isLoading}
        className="flex-shrink-0 flex items-center text-xs font-semibold bg-white/50 text-green-700 dark:bg-black/20 dark:text-green-200 px-3 py-1.5 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Sparkles className="h-4 w-4 text-yellow-500 mr-2" />
        )}
        {t('getPersonalizedTips')}
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tips.map((tip, index) => (
        <div key={index} className="flex items-start">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
          <p className="text-green-700 dark:text-green-300 text-sm">{tip}</p>
        </div>
      ))}
    </div>
  </div>
);
};


// Chatbot Component
const Chatbot = () => {
    const { language, t, setError, user, setCurrentView, userProfile } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [offlineState, setOfflineState] = useState({ step: null, query: '' });
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null); // Ref for the hidden file input
    const isInitialLoad = useRef(true); // Ref to skip redundant DB write on mount

    // ── Chat history: load from MongoDB on mount ──────────────────────────────
    useEffect(() => {
        const loadChat = async () => {
            try {
                const email = user?.email || localStorage.getItem('sehatMitraGuestId');
                if (!email) {
                    setMessages([{ type: 'bot', content: t('chatbotInitialGreeting'), timestamp: new Date().toISOString() }]);
                    isInitialLoad.current = false;
                    return;
                }
                const res = await fetch(`/api/chat?email=${encodeURIComponent(email)}`);
                const data = await res.json();
                if (data.messages && data.messages.length > 0) {
                    setMessages(data.messages);
                } else {
                    setMessages([{ type: 'bot', content: t('chatbotInitialGreeting'), timestamp: new Date().toISOString() }]);
                }
            } catch (e) {
                setMessages([{ type: 'bot', content: t('chatbotInitialGreeting'), timestamp: new Date().toISOString() }]);
            } finally {
                isInitialLoad.current = false;
            }
        };
        loadChat();
    }, [t, user]);

    // ── Chat history: save to MongoDB on every message change ─────────────────
    useEffect(() => {
        if (messages.length === 0 || isInitialLoad.current) return;
        const saveChat = async () => {
            try {
                const email = user?.email || localStorage.getItem('sehatMitraGuestId');
                if (!email) return;
                await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, messages }),
                });
            } catch (e) {
                console.error('Failed to save chat to DB', e);
                setError('Could not save your chat history.');
            }
        };
        saveChat();
    }, [messages, user, setError]);

   const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBackendResponse = async (userMessage) => {
        const queryLower = userMessage.toLowerCase();
        
        // Handle Offline Triage Flow first if in progress
        if (offlineState.step === 'awaiting_symptoms') {
            setOfflineState({ step: null, query: '' });
            if (queryLower.includes('yes') || queryLower.includes('yeah') || queryLower.includes('yup') || queryLower.includes('हाँ') || queryLower.includes('ਹਾਂ') || queryLower.includes('ha') || queryLower.includes('haa')) {
                return `⚠️ **High-Risk Alert:** Severe symptoms detected. Please consult a doctor immediately.\n\n* **Govt. Rajindra Hospital** or nearby CHCs: [Action: ViewHospitals]\n* Contact local **ASHA Workers**: [Action: ViewAshaWorkers]`;
            } else {
                return `**Care Recommendation:** Since you do not have severe warning signs, you can manage this at home:\n\n* Get plenty of bed rest.\n* Stay hydrated with clean water, coconut water, or ORS.\n* Monitor temperature. If symptoms persist for more than 3 days, consult a physician: [Action: ViewHospitals]`;
            }
        }

        try {
            const chatApiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;
            if (!chatApiUrl) {
                throw new Error('No external chat API is configured');
            }
            const response = await fetch(chatApiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userMessage }),
            });
            if (!response.ok) {
                throw new Error("Backend error: " + response.statusText);
            }
            const data = await response.json();
            return data.reply || t('defaultResponse');
        } catch (error) {
            console.error("Error calling backend, trying fallback Gemini API:", error);
            try {
                // Prepend user profile information for personalized responses
                const profileContext = `User Profile Context (inject this automatically into your logic):
- Name: ${userProfile?.name || 'Anonymous User'}
- Age: ${userProfile?.age || 'Not specified'}
- Chronic Conditions: ${userProfile?.conditions || 'None specified'}
- Village: ${userProfile?.village || 'Not specified'}`;

                const systemPrompt = `You are SehatMitra, a warm, caring, and helpful AI healthcare assistant for the Patiala region in Punjab, India. 
Communicate in the user's selected language: ${language}.
Provide clear, friendly, and actionable health advice. Keep answers relatively short.
Always include a disclaimer to consult a doctor for serious symptoms.

${profileContext}

If the user is asking for hospital options or medical aid, suggest Govt. Rajindra Hospital or local clinics and output the action tag "[Action: ViewHospitals]" in your message. If they ask about local healthcare support workers, mention ASHA workers and output "[Action: ViewAshaWorkers]".`;

                // Map recent chat history for context-aware multi-turn conversations (last 6 messages)
                const contents = messages.slice(-6).map(m => ({
                    role: m.type === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content || '[Image Sent]' }]
                }));

                // Append the current user query prefixed with the system prompt
                contents.push({
                    role: 'user',
                    parts: [{ text: `${systemPrompt}\n\nUser query: ${userMessage}` }]
                });

                const geminiRes = await fetch('/api/ai', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents })
                });
                if (geminiRes.ok) {
                    const geminiData = await geminiRes.json();
                    const reply = geminiData?.text;
                    if (reply) return reply;
                }
            } catch (fallbackError) {
                console.error("Gemini fallback error:", fallbackError);
            }

            // Fallback 2: Offline keyword-based local responses with triage workflow triggering
            if (queryLower.includes('dengue') || queryLower.includes('मच्छर') || queryLower.includes('ਮੱਛਰ') || queryLower.includes('fever') || queryLower.includes('बुखार') || queryLower.includes('ਬੁਖਾਰ')) {
                setOfflineState({ step: 'awaiting_symptoms', query: queryLower });
                return "I am currently operating in offline triage assistant mode.\n\nAre you experiencing any **severe warning signs** (like vomiting, bleeding gums, high fever over 103°F, severe stomach pain, or difficulty breathing)?\n\n**Please reply with YES or NO.**";
            }
            if (queryLower.includes('diet') || queryLower.includes('food') || queryLower.includes('खाना') || queryLower.includes('ਭੋਜਨ') || queryLower.includes('nutrition')) {
                return "A healthy diet for rural Punjab should include whole grains (missi roti, daliya), seasonal green vegetables, lentils (dal), and home-made curd or lassi. Try to limit oil, sugar, and tea intake.";
            }
            if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('hey') || queryLower.includes('sat sri akaal') || queryLower.includes('namaste')) {
                return "Sat Sri Akaal! I am SehatMitra, your health helper. How can I help you today?";
            }

            // If no match, return offline warning message
            setError("Active connection to AI server is offline. Running in local assistant mode.");
            return "I am currently running in offline assistant mode. For general health support, try asking about 'fever', 'dengue', or 'diet'. In case of emergency, please consult a medical professional immediately.";
        }
    };

    const sendMessage = async() => {
        if (!inputMessage.trim()) return;
        setError(null);
        const userMessage = { type: 'user', content: inputMessage, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsLoading(true);

        const botResponseContent = await getBackendResponse(currentInput);

        const botResponse = { type: 'bot', content: botResponseContent, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
    };

    // New function to handle image selection
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const imageMessage = {
                type: 'user',
                content: '',
                imageUrl: imageUrl, // Add imageUrl property
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, imageMessage]);
            setIsLoading(true);

            // Simulate backend analysis of the image
            setTimeout(() => {
                const botResponse = {
                    type: 'bot',
                    content: t('imageSent'),
                    timestamp: new Date().toISOString()
                };
                setMessages(prev => [...prev, botResponse]);
                setIsLoading(false);
            }, 2000);
        }
    };

    const handleClearChat = async () => {
        try {
            const email = user?.email || localStorage.getItem('sehatMitraGuestId');
            if (email) {
                await fetch(`/api/chat?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
            }
        } catch (e) {
            console.error('Failed to clear chat in DB', e);
        }
        setMessages([{ type: 'bot', content: t('chatbotInitialGreeting'), timestamp: new Date().toISOString() }]);
        setShowClearConfirm(false);
    };

    const startVoiceInput = () => {
        setIsListening(true);
        const recognition = startVoiceRecognition((transcript) => {
            setInputMessage(transcript);
            setIsListening(false);
        }, language);
        if (!recognition) {
            setIsListening(false);
        }
    };
    const speakMessage = (content) => { playSound(content, language) };
    const handleKeyPress = (e) => { if (e.key === 'Enter' && !isLoading) sendMessage(); };

    return (
  <div className="w-full h-full flex flex-col animate-fade-in overflow-hidden">
    {/* Chat Header - fixed within chat section */}
    <div className="flex-shrink-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('chatbotHeaderTitle')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('chatbotHeaderSubtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={t('clearChat')}
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
            {t('online')}
          </div>
        </div>
      </div>
    </div>

    {/* Confirmation Modal */}
    {showClearConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('clearChat')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t('clearChatConfirm')}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleClearChat}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              {t('clear')}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Chat Window - fills remaining space */}
    <div className="flex-1 min-h-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md flex flex-col overflow-hidden">
      {/* Scrollable messages area - only this scrolls */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end ${
              message.type === 'user'
                ? 'justify-end animate-slide-in-right'
                : 'justify-start animate-slide-in-left'
            }`}
          >
            <div
              className={`max-w-sm lg:max-w-2xl px-4 py-3 rounded-xl shadow-sm ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {/* Render Image if it exists */}
              {message.imageUrl && (
                  <img src={message.imageUrl} alt="User upload" className="rounded-lg mb-2 max-w-full h-auto" />
              )}
              {/* Render Text Content with Interactive Action Parser */}
              {message.content && (() => {
                  const hasViewHospitals = message.content.includes('[Action: ViewHospitals]');
                  const hasViewAsha = message.content.includes('[Action: ViewAshaWorkers]');
                  let cleanText = message.content
                      .replace(/\[Action: ViewHospitals\]/g, '')
                      .replace(/\[Action: ViewAshaWorkers\]/g, '')
                      .trim();

                  const lines = cleanText.split('\n');
                  const elements = lines.map((line, idx) => {
                      // Bold parsing: **text** -> <strong>text</strong>
                      const boldRegex = /\*\*(.*?)\*\*/g;
                      const parts = [];
                      let lastIndex = 0;
                      let match;
                      while ((match = boldRegex.exec(line)) !== null) {
                          if (match.index > lastIndex) {
                              parts.push(line.substring(lastIndex, match.index));
                          }
                          parts.push(<strong key={match.index} className="font-bold text-gray-900 dark:text-white">{match[1]}</strong>);
                          lastIndex = boldRegex.lastIndex;
                      }
                      if (lastIndex < line.length) {
                          parts.push(line.substring(lastIndex));
                      }

                      const isBullet = line.trim().startsWith('*') || line.trim().startsWith('-');
                      const bulletContent = isBullet ? line.replace(/^[\*\-\s]+/, '') : line;

                      if (isBullet) {
                          return (
                              <li key={idx} className="ml-4 list-disc text-sm my-0.5">
                                  {parts.length > 0 ? parts : bulletContent}
                              </li>
                          );
                      }
                      return (
                          <p key={idx} className="text-sm my-1 leading-relaxed">
                              {parts.length > 0 ? parts : line}
                          </p>
                      );
                  });

                  return (
                      <div className="space-y-1">
                          {elements}
                          {(hasViewHospitals || hasViewAsha) && (
                              <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-200/20">
                                  {hasViewHospitals && (
                                      <button
                                          onClick={() => setCurrentView('hospitals')}
                                          className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition-all duration-300 transform active:scale-95"
                                      >
                                          <MapPin className="h-3.5 w-3.5 mr-1" />
                                          Find Local Hospitals
                                      </button>
                                  )}
                                  {hasViewAsha && (
                                      <button
                                          onClick={() => setCurrentView('asha')}
                                          className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg shadow transition-all duration-300 transform active:scale-95"
                                      >
                                          <Phone className="h-3.5 w-3.5 mr-1" />
                                          ASHA Workers Directory
                                      </button>
                                  )}
                              </div>
                          )}
                      </div>
                  );
              })()}
              {message.type === 'bot' && (
                <button
                  onClick={() => speakMessage(message.content)}
                  className="mt-2 text-xs text-blue-500 dark:text-blue-400 hover:underline flex items-center"
                >
                  <Volume2 className="h-3 w-3 mr-1" />
                  {t('listen')}
                </button>
              )}
              <div className="text-xs opacity-70 mt-1 text-right">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Animation */}
        {isLoading && (
          <div className="flex justify-start animate-slide-in-left">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="dot dot-1 bg-gray-400"></div>
                <div className="dot dot-2 bg-gray-400"></div>
                <div className="dot dot-3 bg-gray-400"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer strip */}
      <div
        className="flex-shrink-0 px-4 py-1.5 text-xs text-gray-400 dark:text-gray-500 text-center border-t border-gray-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
        dangerouslySetInnerHTML={{ __html: t('chatbotDisclaimer') }}
      />

      {/* Input Area - sticky, always visible above nav */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbotInputPlaceholder')}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm shadow-sm"
            />
          </div>
          {/* New Image Upload Button */}
          <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
          />
          <button
              onClick={() => fileInputRef.current.click()}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300"
          >
              <ImagePlus className="h-5 w-5" />
          </button>
          <button
            onClick={startVoiceInput}
            disabled={isListening}
            className={`p-2 rounded-lg ${
              isListening
                ? 'bg-red-500 animate-pulse'
                : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
            } text-gray-700 dark:text-gray-300`}
          >
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
};


// Hospitals Component
const Hospitals = () => {
        const { t } = useContext(AppContext);
        const [loading, setLoading] = useState(true);
        const [hospitals, setHospitals] = useState([]);

        useEffect(() => {
            const fetchHospitals = async () => {
                try {
                    const res = await fetch('/api/hospitals');
                    const data = await res.json();
                    setHospitals(data.hospitals || []);
                } catch (e) {
                    console.error('Failed to fetch hospitals', e);
                } finally {
                    setLoading(false);
                }
            };
            fetchHospitals();
        }, []);

       const LoadingCard = () => (
  <div className="hospital-card p-6 shimmer-bg rounded-xl">
    <div className="h-6 w-3/4 bg-white/20 rounded-md mb-3"></div>
    <div className="h-4 w-1/2 bg-white/20 rounded-md mb-4"></div>
    <div className="h-4 w-1/3 bg-white/20 rounded-md"></div>
    <div className="border-t border-white/10 my-4"></div>
    <div className="h-5 w-1/4 bg-white/20 rounded-md mb-3"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="h-12 bg-white/20 rounded-lg"></div>
      <div className="h-12 bg-white/20 rounded-lg"></div>
    </div>
  </div>
);


        const DoctorChip = ({ doctor }) => (
  <div className="group flex items-center space-x-3 p-3 bg-white/10 dark:bg-black/20 rounded-lg transition-colors hover:bg-white/20 dark:hover:bg-black/30">
    <div
      className={`flex-shrink-0 w-3 h-3 rounded-full transition-all duration-300 ${
        (doctor.isAvailable ?? doctor.available)
          ? 'bg-green-400 group-hover:shadow-lg group-hover:shadow-green-400/50'
          : 'bg-red-500'
      }`}
    ></div>
    <div className="flex-1">
      <p className="font-medium text-sm text-gray-900 dark:text-white">
        {doctor.name || t(doctor.nameKey)}
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {doctor.specialty || t(doctor.specialtyKey)}
      </p>
    </div>
    <Stethoscope className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform group-hover:scale-110" />
  </div>
);

const HospitalCard = ({ hospital, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  // (rest of your code here…)


          return (
  <div
    key={hospital.id}
    ref={cardRef}
    onMouseMove={handleMouseMove}
    className="hospital-card animate-card-pop-in"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {hospital.name || t(hospital.nameKey)}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" /> 
            <span>{hospital.address}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" /> 
            <span>{hospital.distanceLabel || hospital.distance} {t('distanceAway')}</span>
          </div>
        </div>
        <div
          className={`flex-shrink-0 ml-4 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            hospital.isOpen
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {hospital.isOpen ? t('open') : t('closed')}+
        </div>
      </div>

      <div className="border-t border-white/10 my-4"></div>

      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          {t('availableDoctors')}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hospital.doctors.map((doctor, docIndex) => (
            <DoctorChip key={docIndex} doctor={doctor} />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
        <button
          onClick={() => (window.location.href = `tel:${hospital.phone}`)}
          className="group flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center transition-all duration-300 transform active:scale-95"
        >
          <Phone className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" /> 
          {t('callHospital')}
        </button>

        <button className="group flex-1 bg-transparent text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-lg flex items-center justify-center transition-all duration-300 transform active:scale-95 relative border border-purple-400 hover:text-white overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
          <span className="relative flex items-center">
            <MapPin className="h-4 w-4 mr-2 transition-transform group-hover:animate-[icon-bounce_0.5s_ease-in-out]" /> 
            {t('getDirections')}
          </span>
        </button>
      </div>
    </div>
  </div>
);
};


                    return (
  <div className="max-w-7xl mx-auto px-4 py-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('hospitalsTitle')}
      </h2>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <MapPin className="h-4 w-4 mr-1" /> 
        <span>{t('locationInfo')}</span>
      </div>
    </div>

    {loading ? (
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        <LoadingCard />
        <LoadingCard />
      </div>
    ) : (
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {hospitals.map((hospital, index) => (
          <HospitalCard hospital={hospital} index={index} key={hospital.id} />
        ))}
      </div>
    )}
  </div>
);
};


                        // **ALERTS COMPONENT - REVAMPED**
                        const Alerts = () => {
                            const { t, user } = useContext(AppContext);
                            const [outbreaks, setOutbreaks] = useState([]);

                            useEffect(() => {
                                const fetchAlerts = async () => {
                                    try {
                                        const res = await fetch('/api/alerts');
                                        const data = await res.json();
                                        setOutbreaks(data.alerts || []);
                                    } catch (e) {
                                        console.error('Failed to fetch alerts', e);
                                    }
                                };
                                fetchAlerts();
                            }, []);

                                const AlertCard = ({ outbreak, index }) => {
  const isHigh = outbreak.severity === 'high';
  const severityColor = isHigh ? 'red' : 'yellow';

  return (
    <div
      className="alert-card shadow-lg animate-card-pop-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={`severity-glow bg-${severityColor}-500`}></div>

      <div className="pl-6 p-4 flex items-start space-x-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full bg-${severityColor}-100 dark:bg-${severityColor}-500/20 flex items-center justify-center`}
        >
          <AlertTriangle className={`h-6 w-6 text-${severityColor}-500 animated-icon`} />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t(outbreak.diseaseKey)} {t('outbreakAlertSuffix')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {outbreak.cases} {t('confirmedCasesIn')} {outbreak.area}
              </p>
            </div>

            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${severityColor}-100 text-${severityColor}-800 dark:bg-${severityColor}-900 dark:text-${severityColor}-200`}
            >
              {isHigh ? t('severityHigh') : t('severityMedium')}
            </span>
          </div>

          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-1">
              {t('preventionMeasures')}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t(outbreak.preventionKey)}
            </p>
          </div>

          <div className="flex space-x-3 mt-4">
            <button className="group flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              {t('learnMore')}
            </button>
            <button className="group flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
              <Share2 className="h-4 w-4 mr-1.5 transition-transform group-hover:scale-110" /> {t('shareAlert')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


                               const VaccineCard = ({ titleKey, descKey, color, icon: Icon, index }) => (
  <div
    className="relative p-5 rounded-xl overflow-hidden animate-card-pop-in bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg"
    style={{ animationDelay: `${(outbreaks.length + index) * 150}ms` }}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br from-${color}-400 to-${color}-600 opacity-10 dark:opacity-20`}
    ></div>

    <div className="flex items-center relative">
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-${color}-400 to-${color}-600 text-white flex items-center justify-center shadow-lg`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">{t(titleKey)}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t(descKey)}</p>
      </div>
    </div>
  </div>
);

return (
  <div className="max-w-7xl mx-auto px-4 py-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('alertsTitle')}</h2>

    <div className="space-y-6">
      {outbreaks.map((outbreak, index) => (
        <AlertCard key={outbreak._id || outbreak.id} outbreak={outbreak} index={index} />
      ))}
    </div>

    <div className="mt-10">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {t('vaccinationRemindersTitle')}
      </h3>
      <div className="space-y-4">
        <VaccineCard
          titleKey="covidBoosterTitle"
          descKey="covidBoosterDesc"
          color="green"
          icon={Shield}
          index={0}
        />
        <VaccineCard
          titleKey="fluShotTitle"
          descKey="fluShotDesc"
          color="blue"
          icon={Shield}
          index={1}
        />
      </div>
    </div>
  </div>
);
};


                        // Shared rows for Profile view (hoisted to avoid remounting inputs)
                        const ProfileInfoRow = ({ label, value, placeholder }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
      {value || <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>}
    </dd>
  </div>
);

const EditInfoRow = React.memo(({ label, name, value, placeholder, onChange }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value ?? ''}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />
  </div>
));
EditInfoRow.displayName = 'EditInfoRow';

const EditSelectRow = React.memo(({ label, name, value, options, onChange, t }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value ?? ''}
      onChange={onChange}
      className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {t(option.labelKey)}
        </option>
      ))}
    </select>
  </div>
));
EditSelectRow.displayName = 'EditSelectRow';


                        // Profile Component
                        const Profile = () => {
                                    const { t, userProfile, saveUserProfile } = useContext(AppContext);
                                    const [isEditing, setIsEditing] = useState(false);
                                    const [tempProfile, setTempProfile] = useState(userProfile);
                                    const [showSuccess, setShowSuccess] = useState(false);

                                    useEffect(() => {
                                        setTempProfile(userProfile);
                                    }, [userProfile]);

                                    const handleInputChange = useCallback((e) => {
                                        const { name, value } = e.target;
                                        setTempProfile(prev => ({ ...prev, [name]: value }));
                                    }, []);

                                    const handleSave = () => {
                                        saveUserProfile(tempProfile);
                                        setIsEditing(false);
                                        setShowSuccess(true);
                                        setTimeout(() => setShowSuccess(false), 3000);
                                    };

                                    


                                        return (
  <div className="max-w-4xl mx-auto px-4 py-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
        <User className="mr-3 h-6 w-6" /> {t('profileTitle')}
      </h2>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          <Edit className="h-4 w-4 mr-1" /> {t('editProfile')}
        </button>
      )}
    </div>

    {showSuccess && (
      <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-3 mb-4 flex items-center animate-fade-in">
        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
        <p className="text-sm text-green-700 dark:text-green-200">{t('profileSaved')}</p>
      </div>
    )}

    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6">
      {isEditing ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('personalInfo')}</h3>
            <div className="space-y-4">
              <EditInfoRow label={t('fullName')} name="name" value={tempProfile.name} placeholder={t('fullName')} onChange={handleInputChange} />
              <EditInfoRow label={t('age')} name="age" value={tempProfile.age} placeholder={t('age')} onChange={handleInputChange} />
              <EditInfoRow label={t('bloodGroup')} name="bloodGroup" value={tempProfile.bloodGroup} placeholder="e.g., A+, O-" onChange={handleInputChange} />
              <EditSelectRow 
                label={t('dietPreference')} 
                name="dietPreference" 
                value={tempProfile.dietPreference} 
                options={[
                  { value: 'vegetarian', labelKey: 'vegetarian' },
                  { value: 'non-vegetarian', labelKey: 'nonVegetarian' }
                ]}
                onChange={handleInputChange}
                t={t}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('healthInfo')}</h3>
            <div className="space-y-4">
              <EditInfoRow label={t('allergies')} name="allergies" value={tempProfile.allergies} placeholder={t('none')} onChange={handleInputChange} />
              <EditInfoRow label={t('chronicConditions')} name="conditions" value={tempProfile.conditions} placeholder={t('egConditions')} onChange={handleInputChange} />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setIsEditing(false);
                setTempProfile(userProfile);
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              {t('saveProfile')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('personalInfo')}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <ProfileInfoRow label={t('fullName')} value={userProfile.name} placeholder={t('fullName')} />
              <ProfileInfoRow label={t('age')} value={userProfile.age} placeholder={t('age')} />
              <ProfileInfoRow label={t('bloodGroup')} value={userProfile.bloodGroup} placeholder="A+, O-, ..." />
              <ProfileInfoRow 
                label={t('dietPreference')} 
                value={userProfile.dietPreference ? t(userProfile.dietPreference) : ''} 
                placeholder="Vegetarian/Non-Vegetarian" 
              />
            </dl>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('healthInfo')}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <ProfileInfoRow label={t('allergies')} value={userProfile.allergies} placeholder={t('none')} />
              <ProfileInfoRow label={t('chronicConditions')} value={userProfile.conditions} placeholder={t('none')} />
            </dl>
          </div>
        </div>
      )}
    </div>
  </div>
);
};


                                // Navigation Component
                        const Navigation = () => {
  const { currentView, setCurrentView, t } = useContext(AppContext);

  const navItems = [
    { id: 'dashboard', icon: Home, label: t('navHome') },
    { id: 'chatbot', icon: MessageCircle, label: t('navAssistant') },
    { id: 'dietPlanner', icon: Salad, label: t('navDietPlan') },
    { id: 'hospitals', icon: Hospital, label: t('navHospitals') },
    { id: 'alerts', icon: Bell, label: t('navAlerts') },
  ];

  return (
    <nav className="flex-shrink-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 z-50">
      <div className="max-w-md mx-auto px-2">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center justify-center py-2 rounded-lg transition-colors w-16 ${
                   isActive
                    ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/50'
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                }`}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};


                                // ** NEW VIEWS / COMPONENTS **

                                const FirstAidGuide = () => {
  const { t, language } = useContext(AppContext);
  const [selectedGuide, setSelectedGuide] = useState(null);

  if (selectedGuide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in">
        <button
          onClick={() => setSelectedGuide(null)}
          className="flex items-center text-sm text-blue-500 hover:underline mb-4"
        >
          &larr; Back to all guides
        </button>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t(selectedGuide.titleKey)}
        </h2>

        <div className="space-y-4">
          {selectedGuide.steps[language].map((step, index) => (
            <div
              key={index}
              className="flex items-start bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-4 rounded-xl shadow-lg animate-card-pop-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-8 h-8 mr-4 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t('firstAidTitle')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockFirstAidGuides.map((guide, index) => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuide(guide)}
            className="text-left group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl animate-card-pop-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t(guide.titleKey)}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};


                            const AshaWorkerDirectory = () => {
  const { t } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [workers, setWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoadingWorkers(true);
      try {
        const query = searchTerm ? `?village=${encodeURIComponent(searchTerm)}` : '';
        const res = await fetch(`/api/asha-workers${query}`);
        const data = await res.json();
        setWorkers(data.workers || []);
      } catch (e) {
        console.error('Failed to fetch ASHA workers', e);
      } finally {
        setLoadingWorkers(false);
      }
    };
    // Debounce search by 300ms
    const timer = setTimeout(fetchWorkers, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('ashaDirectoryTitle')}
      </h2>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder={t('searchByVillage')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 border-0"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="space-y-4">
        {loadingWorkers ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
            <p>Loading workers...</p>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <p>No ASHA workers found for that village.</p>
          </div>
        ) : (
          workers.map((worker, index) => (
          <div
            key={worker._id || worker.id}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-4 flex items-center justify-between animate-card-pop-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{worker.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{worker.village}</p>
            </div>
            <a
              href={`tel:${worker.phone}`}
              className="group flex-shrink-0 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg"
            >
              <Phone className="h-4 w-4 mr-2 transition-transform group-hover:rotate-12" /> {t('callNow')}
            </a>
          </div>
        ))
        )}
      </div>
    </div>
  );
};

// ** NEW DIET PLANNER COMPONENT **
const DietPlanner = () => {
    const { t, userProfile, language, setError, setCurrentView } = useContext(AppContext);
    const [dietPlan, setDietPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isProfileComplete = userProfile.age && userProfile.conditions;

    // Extract lightweight preferences from past chat (no longer uses localStorage)
    const deriveChatPreferences = () => {
      // Preferences are now derived from server-side chat history if available
      // For now return safe defaults
      return { vegLikely: false, likesSpicy: false, lactoseIssue: false, lowSalt: false, lowSugar: false };
    };

    // Build a simple one-day dummy plan based on profile and chat signals
    const buildDummyPlan = () => {
      const age = parseInt(userProfile.age, 10) || 30;
      const conditions = (userProfile.conditions || '').toLowerCase();
      const allergies = (userProfile.allergies || '').toLowerCase();
      const bg = (userProfile.bloodGroup || '').toUpperCase();
      const dietPref = userProfile.dietPreference || '';
      const prefs = deriveChatPreferences();

      const isDiabetes = /diabet/.test(conditions);
      const isHypertension = /\bbp\b|hyperten/.test(conditions);
      const isAnemia = /anem/.test(conditions);
      const kidney = /kidney|renal/.test(conditions);
      const thyroid = /thyroid/.test(conditions);

      const avoidDairy = prefs.lactoseIssue || /lactose|milk/.test(allergies);
      
      // Use profile diet preference first, fallback to chat analysis
      const vegBase = dietPref === 'vegetarian' ? true : dietPref === 'non-vegetarian' ? false : prefs.vegLikely;

      // Multi-language notes
      const noteTranslations = {
        en: {
          spiceNote: prefs.likesSpicy ? 'Use mild spices; avoid too much oil.' : 'Keep spices moderate; avoid deep fried foods.',
          sugarNote: isDiabetes || prefs.lowSugar ? 'No added sugar; prefer whole grains and fiber.' : 'Limit sweets.',
          saltNote: isHypertension || prefs.lowSalt ? 'Low-salt cooking; avoid pickles and papad.' : 'Use salt in moderation.',
          proteinHint: age > 55 ? 'Ensure good protein in every meal (dal/paneer/eggs/chicken).' : 'Include some protein each meal.',
          ironHint: isAnemia ? 'Add iron-rich foods (spinach, chana, rajma) with vitamin C (lemon).' : '',
          kidneyNote: kidney ? 'Limit very high-protein and very salty foods; consult a clinician for specifics.' : '',
          thyroidNote: thyroid ? 'Keep meals regular; avoid overly soy-heavy meals if sensitive.' : '',
          bgNote: bg ? `Note: Blood group ${bg} does not require special diet changes for most people; focus on balanced meals.` : ''
        },
        hi: {
          spiceNote: prefs.likesSpicy ? 'हल्के मसाले का उपयोग करें; बहुत तेल से बचें।' : 'मसाले संयमित रखें; तली हुई चीजों से बचें।',
          sugarNote: isDiabetes || prefs.lowSugar ? 'चीनी न मिलाएं; साबुत अनाज और फाइबर को प्राथमिकता दें।' : 'मिठाई सीमित करें।',
          saltNote: isHypertension || prefs.lowSalt ? 'कम नमक खाना बनाएं; अचार और पापड़ से बचें।' : 'नमक संयम से उपयोग करें।',
          proteinHint: age > 55 ? 'हर भोजन में अच्छा प्रोटीन सुनिश्चित करें (दाल/पनीर/अंडे/चिकन)।' : 'हर भोजन में कुछ प्रोटीन शामिल करें।',
          ironHint: isAnemia ? 'आयरन युक्त खाद्य पदार्थ (पालक, चना, राजमा) विटामिन सी (नींबू) के साथ लें।' : '',
          kidneyNote: kidney ? 'बहुत अधिक प्रोटीन और नमकीन खाद्य पदार्थों को सीमित करें; विशिष्टताओं के लिए चिकित्सक से सलाह लें।' : '',
          thyroidNote: thyroid ? 'भोजन नियमित रखें; यदि संवेदनशील हैं तो अधिक सोया भोजन से बचें।' : '',
          bgNote: bg ? `नोट: रक्त समूह ${bg} के लिए अधिकांश लोगों को विशेष आहार परिवर्तन की आवश्यकता नहीं; संतुलित भोजन पर ध्यान दें।` : ''
        },
        pa: {
          spiceNote: prefs.likesSpicy ? 'ਹਲਕੇ ਮਸਾਲੇ ਵਰਤੋ; ਬਹੁਤ ਤੇਲ ਤੋਂ ਬਚੋ।' : 'ਮਸਾਲੇ ਸੰਜਮ ਨਾਲ ਰੱਖੋ; ਤਲੇ ਹੋਏ ਭੋਜਨ ਤੋਂ ਬਚੋ।',
          sugarNote: isDiabetes || prefs.lowSugar ? 'ਚੀਨੀ ਨਾ ਪਾਓ; ਸਾਬਤ ਅਨਾਜ ਅਤੇ ਫਾਈਬਰ ਨੂੰ ਤਰਜੀਹ ਦਿਓ।' : 'ਮਿਠਾਈਆਂ ਸੀਮਤ ਕਰੋ।',
          saltNote: isHypertension || prefs.lowSalt ? 'ਘੱਟ ਨਮਕ ਨਾਲ ਖਾਣਾ ਬਣਾਓ; ਅਚਾਰ ਅਤੇ ਪਾਪੜ ਤੋਂ ਬਚੋ।' : 'ਨਮਕ ਸੰਜਮ ਨਾਲ ਵਰਤੋ।',
          proteinHint: age > 55 ? 'ਹਰ ਭੋਜਨ ਵਿੱਚ ਚੰਗਾ ਪ੍ਰੋਟੀਨ ਯਕੀਨੀ ਬਣਾਓ (ਦਾਲ/ਪਨੀਰ/ਅੰਡੇ/ਚਿਕਨ)।' : 'ਹਰ ਭੋਜਨ ਵਿੱਚ ਕੁਝ ਪ੍ਰੋਟੀਨ ਸ਼ਾਮਲ ਕਰੋ।',
          ironHint: isAnemia ? 'ਆਇਰਨ ਭਰਪੂਰ ਭੋਜਨ (ਪਾਲਕ, ਚਣਾ, ਰਾਜਮਾ) ਵਿਟਾਮਿਨ ਸੀ (ਨਿੰਬੂ) ਨਾਲ ਲਵੋ।' : '',
          kidneyNote: kidney ? 'ਬਹੁਤ ਜ਼ਿਆਦਾ ਪ੍ਰੋਟੀਨ ਅਤੇ ਨਮਕੀਨ ਭੋਜਨ ਸੀਮਤ ਕਰੋ; ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਲਈ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।' : '',
          thyroidNote: thyroid ? 'ਭੋਜਨ ਨਿਯਮਿਤ ਰੱਖੋ; ਜੇ ਸੰਵੇਦਨਸ਼ੀਲ ਹੋ ਤਾਂ ਬਹੁਤ ਸੋਇਆ ਭੋਜਨ ਤੋਂ ਬਚੋ।' : '',
          bgNote: bg ? `ਨੋਟ: ਖੂਨ ਗਰੁੱਪ ${bg} ਲਈ ਜ਼ਿਆਦਾਤਰ ਲੋਕਾਂ ਨੂੰ ਵਿਸ਼ੇਸ਼ ਖੁਰਾਕ ਤਬਦੀਲੀਆਂ ਦੀ ਲੋੜ ਨਹੀਂ; ਸੰਤੁਲਿਤ ਭੋਜਨ 'ਤੇ ਧਿਆਨ ਦਿਓ।` : ''
        },
        or: {
          spiceNote: prefs.likesSpicy ? 'ହାଲୁକା ମସଲା ବ୍ୟବହାର କରନ୍ତୁ; ଅଧିକ ତେଲରୁ ଦୂରେଇ ରୁହନ୍ତୁ।' : 'ମସଲା ମଧ୍ୟମ ରଖନ୍ତୁ; ତଳା ଖାଦ୍ୟରୁ ଦୂରେଇ ରୁହନ୍ତୁ।',
          sugarNote: isDiabetes || prefs.lowSugar ? 'ଚିନି ମିଶାନ୍ତୁ ନାହିଁ; ପୂର୍ଣ୍ଣ ଶସ୍ୟ ଏବଂ ଫାଇବରକୁ ପ୍ରାଧାନ୍ୟ ଦିଅନ୍ତୁ।' : 'ମିଠା ସୀମିତ କରନ୍ତୁ।',
          saltNote: isHypertension || prefs.lowSalt ? 'କମ୍ ଲୁଣରେ ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ କରନ୍ତୁ; ଆଚାର ଏବଂ ପାପଡ଼ରୁ ଦୂରେଇ ରୁହନ୍ତୁ।' : 'ଲୁଣ ସଂଯମରେ ବ୍ୟବହାର କରନ୍ତୁ।',
          proteinHint: age > 55 ? 'ପ୍ରତ୍ୟେକ ଭୋଜନରେ ଭଲ ପ୍ରୋଟିନ୍ ନିଶ୍ଚିତ କରନ୍ତୁ (ଡାଲି/ପନିର/ଅଣ୍ଡା/ଚିକେନ୍)।' : 'ପ୍ରତ୍ୟେକ ଭୋଜନରେ କିଛି ପ୍ରୋଟିନ୍ ଅନ୍ତର୍ଭୁକ୍ତ କରନ୍ତୁ।',
          ironHint: isAnemia ? 'ଆଇରନ୍ ଭରପୂର ଖାଦ୍ୟ (ପାଳଙ୍ਗ, ଚଣା, ରାଜମା) ଭିଟାମିନ୍ ସି (ଲେମ୍ବୁ) ସହିତ ନିଅନ୍ତୁ।' : '',
          kidneyNote: kidney ? 'ଅତ୍ୟଧିକ ପ୍ରୋଟିନ୍ ଏବଂ ଲୁଣିଆ ଖାଦ୍ୟ ସୀମିତ କରନ୍ତୁ; ବିଶେଷତା ପାଇଁ ଚିକିତ୍ସକଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।' : '',
          thyroidNote: thyroid ? 'ଭୋଜନ ନିୟମିତ ରଖନ୍ତୁ; ଯଦି ସମ୍ବେଦନଶୀଳ ତେବେ ଅଧିକ ସୋୟା ଖାଦ୍ୟରୁ ଦୂରେଇ ରୁହନ୍ତୁ।' : '',
          bgNote: bg ? `ନୋଟ୍: ରକ୍ତ ଗୋଷ୍ଠୀ ${bg} ପାଇଁ ଅଧିକାଂଶ ଲୋକଙ୍କର ବିଶେଷ ଖାଦ୍ୟ ପରିବର୍ତ୍ତନ ଆବଶ୍ୟକ ନାହିଁ; ସନ୍ତୁଳିତ ଭୋଜନ ଉପରେ ଧ୍ୟାନ ଦିଅନ୍ତୁ।` : ''
        }
      };

      const currentNotes = noteTranslations[language] || noteTranslations.en;

      // Multi-language meal plans
      const meals = {
        en: {
          breakfast: vegBase
            ? [
                isDiabetes ? 'Vegetable besan chilla with mint chutney' : 'Vegetable upma with peanuts',
                avoidDairy ? 'Soaked almonds + seasonal fruit (no milk)' : 'A glass of toned milk or curd (if tolerated)',
                '1 small bowl of sprouts salad'
              ]
            : [
                '2 boiled eggs with whole-wheat toast',
                'Tomato-cucumber salad',
                '1 seasonal fruit'
              ],
          lunch: vegBase
            ? [
                '1-2 multigrain rotis or 1 bowl brown rice',
                isDiabetes ? 'Mixed dal (no cream) + leafy sabzi' : 'Dal makhani (light) or chana dal + seasonal sabzi',
                'Salad with lemon'
              ]
            : [
                '1-2 rotis or 1 bowl rice',
                'Grilled chicken curry (less oil) + mixed veg',
                'Salad with lemon'
              ],
          snack: [
            isDiabetes ? 'Roasted chana or peanuts' : 'Roasted makhana or peanuts',
            avoidDairy ? 'Black tea/green tea with lemon (no sugar)' : 'Masala chai with less sugar'
          ],
          dinner: vegBase
            ? [
                '1-2 rotis (or millet roti) with dal/rajma (light oil)',
                'Seasonal sabzi (lauki/tori/bhindi)',
                'Small bowl curd (skip if lactose issue)'
              ]
            : [
                'Grilled fish or egg curry (light oil)',
                '1-2 rotis or small rice portion',
                'Light sauteed vegetables'
              ]
        },
        hi: {
          breakfast: vegBase
            ? [
                isDiabetes ? 'पुदीने की चटनी के साथ सब्जी बेसन चिल्ला' : 'मूंगफली के साथ सब्जी उपमा',
                avoidDairy ? 'भिगोए हुए बादाम + मौसमी फल (दूध नहीं)' : 'एक गिलास टोंड मिल्क या दही (यदि सहन हो)',
                '1 छोटा कटोरा अंकुरित सलाद'
              ]
            : [
                'साबुत गेहूं टोस्ट के साथ 2 उबले अंडे',
                'टमाटर-खीरा सलाद',
                '1 मौसमी फल'
              ],
          lunch: vegBase
            ? [
                '1-2 मल्टीग्रेन रोटी या 1 कटोरा ब्राउन राइस',
                isDiabetes ? 'मिक्स दाल (बिना क्रीम) + हरी सब्जी' : 'दाल मखनी (हल्की) या चना दाल + मौसमी सब्जी',
                'नींबू के साथ सलाद'
              ]
            : [
                '1-2 रोटी या 1 कटोरा चावल',
                'ग्रिल्ड चिकन करी (कम तेल) + मिक्स वेज',
                'नींबू के साथ सलाद'
              ],
          snack: [
            isDiabetes ? 'भुना चना या मूंगफली' : 'भुना मखाना या मूंगफली',
            avoidDairy ? 'काली चाय/ग्रीन टी नींबू के साथ (बिना चीनी)' : 'कम चीनी के साथ मसाला चाय'
          ],
          dinner: vegBase
            ? [
                'दाल/राजमा (हल्का तेल) के साथ 1-2 रोटी (या बाजरा रोटी)',
                'मौसमी सब्जी (लौकी/तोरी/भिंडी)',
                'छोटा कटोरा दही (लैक्टोज समस्या हो तो छोड़ें)'
              ]
            : [
                'ग्रिल्ड मछली या अंडे की करी (हल्का तेल)',
                '1-2 रोटी या छोटा चावल का हिस्सा',
                'हल्की तली हुई सब्जियां'
              ]
        },
        pa: {
          breakfast: vegBase
            ? [
                isDiabetes ? 'ਪੁਦੀਨੇ ਦੀ ਚਟਨੀ ਨਾਲ ਸਬਜ਼ੀ ਬੇਸਨ ਚਿੱਲਾ' : 'ਮੂੰਗਫਲੀ ਨਾਲ ਸਬਜ਼ੀ ਉਪਮਾ',
                avoidDairy ? 'ਭਿੱਜੇ ਹੋਏ ਬਦਾਮ + ਮੌਸਮੀ ਫਲ (ਦੁੱਧ ਨਹੀਂ)' : 'ਇੱਕ ਗਲਾਸ ਟੋਂਡ ਮਿਲਕ ਜਾਂ ਦਹੀਂ (ਜੇ ਸਹਿਣ ਹੋਵੇ)',
                '1 ਛੋਟਾ ਕਟੋਰਾ ਅੰਕੁਰਿਤ ਸਲਾਦ'
              ]
            : [
                'ਸਾਬਤ ਕਣਕ ਟੋਸਟ ਨਾਲ 2 ਉਬਾਲੇ ਅੰਡੇ',
                'ਟਮਾਟਰ-ਖੀਰਾ ਸਲਾਦ',
                '1 ਮੌਸਮੀ ਫਲ'
              ],
          lunch: vegBase
            ? [
                '1-2 ਮਲਟੀਗ੍ਰੇਨ ਰੋਟੀ ਜਾਂ 1 ਕਟੋਰਾ ਬ੍ਰਾਊਨ ਚਾਵਲ',
                isDiabetes ? 'ਮਿਕਸ ਦਾਲ (ਬਿਨਾਂ ਕਰੀਮ) + ਹਰੀ ਸਬਜ਼ੀ' : 'ਦਾਲ ਮਖਨੀ (ਹਲਕੀ) ਜਾਂ ਚਣਾ ਦਾਲ + ਮੌਸਮੀ ਸਬਜ਼ੀ',
                'ਨਿੰਬੂ ਨਾਲ ਸਲਾਦ'
              ]
            : [
                '1-2 ਰੋਟੀ ਜਾਂ 1 ਕਟੋਰਾ ਚਾਵਲ',
                'ਗ੍ਰਿਲਡ ਚਿਕਨ ਕਰੀ (ਘੱਟ ਤੇਲ) + ਮਿਕਸ ਵੈਜ',
                'ਨਿੰਬੂ ਨਾਲ ਸਲਾਦ'
              ],
          snack: [
            isDiabetes ? 'ਭੁੰਨਿਆ ਚਣਾ ਜਾਂ ਮੂੰਗਫਲੀ' : 'ਭੁੰਨਿਆ ਮਖਾਨਾ ਜਾਂ ਮੂੰਗਫਲੀ',
            avoidDairy ? 'ਕਾਲੀ ਚਾਹ/ਗ੍ਰੀਨ ਟੀ ਨਿੰਬੂ ਨਾਲ (ਬਿਨਾਂ ਚੀਨੀ)' : 'ਘੱਟ ਚੀਨੀ ਨਾਲ ਮਸਾਲਾ ਚਾਹ'
          ],
          dinner: vegBase
            ? [
                'ਦਾਲ/ਰਾਜਮਾ (ਹਲਕਾ ਤੇਲ) ਨਾਲ 1-2 ਰੋਟੀ (ਜਾਂ ਬਾਜਰਾ ਰੋਟੀ)',
                'ਮੌਸਮੀ ਸਬਜ਼ੀ (ਲੌਕੀ/ਤੋਰੀ/ਭਿੰਡੀ)',
                'ਛੋਟਾ ਕਟੋਰਾ ਦਹੀਂ (ਲੈਕਟੋਜ਼ ਸਮੱਸਿਆ ਹੋਵੇ ਤਾਂ ਛੱਡੋ)'
              ]
            : [
                'ਗ੍ਰਿਲਡ ਮੱਛੀ ਜਾਂ ਅੰਡੇ ਦੀ ਕਰੀ (ਹਲਕਾ ਤੇਲ)',
                '1-2 ਰੋਟੀ ਜਾਂ ਛੋਟਾ ਚਾਵਲ ਦਾ ਹਿੱਸਾ',
                'ਹਲਕੀ ਤਲੀ ਹੋਈ ਸਬਜ਼ੀਆਂ'
              ]
        },
        or: {
          breakfast: vegBase
            ? [
                isDiabetes ? 'ପୁଦିନା ଚଟଣୀ ସହିତ ସବୁଜ ବେସନ ଚିଲ୍ଲା' : 'ବାଦାମ ସହିତ ସବୁଜ ଉପମା',
                avoidDairy ? 'ଭିଜାଯାଇଥିବା ବାଦାମ + ମୌସୁମୀ ଫଳ (କ୍ଷୀର ନାହିଁ)' : 'ଏକ ଗ୍ଲାସ ଟୋନ୍ଡ ମିଲ୍କ କିମ୍ବା ଦହି (ଯଦି ସହ୍ୟ ହୁଏ)',
                '୧ ଛୋଟ ପାତ୍ର ଅଙ୍କୁରିତ ସାଲାଡ୍'
              ]
            : [
                'ପୂର୍ଣ୍ଣ ଗହମ ଟୋଷ୍ଟ ସହିତ ୨ ଟି ସିଝାଯାଇଥିବା ଅଣ୍ଡା',
                'ଟମାଟୋ-କାକୁଡି ସାଲାଡ୍',
                '୧ ଟି ମୌସୁମୀ ଫଳ'
              ],
          lunch: vegBase
            ? [
                '୧-୨ ମଲ୍ଟିଗ୍ରେନ୍ ରୋଟି କିମ୍ବା ୁ୧ ପାତ୍ର ବ୍ରାଉନ୍ ଚାଉଳ',
                isDiabetes ? 'ମିଶ୍ର ଡାଲି (କ୍ରିମ୍ ବିନା) + ପତ୍ରଯୁକ୍ତ ତରକାରୀ' : 'ଡାଲ ମଖନୀ (ହାଲୁକା) କିମ୍ବା ଚଣା ଡାଲି + ମୌସୁମୀ ତରକାରୀ',
                'ଲେମ୍ବୁ ସହିତ ସାଲାଡ୍'
              ]
            : [
                '୧-୨ ରੋଟି କିମ୍ବା ୧ ପାତ୍ର ଚାଉଳ',
                'ଗ୍ରିଲ୍ଡ ଚିକେନ୍ କରୀ (କମ୍ ତେਲ) + ମିଶ୍ର ଭେଜ୍',
                'ଲେମ୍ବୁ ସହିତ ସାଲାଡ୍'
              ],
          snack: [
            isDiabetes ? 'ଭଜା ଚଣା କିମ୍ବା ବାଦାମ' : 'ଭଜା ମଖାନା କିମ୍ବା ବାଦାମ',
            avoidDairy ? 'କଳା ଚା/ଗ୍ରୀନ୍ ଟି ଲେମ୍ବୁ ସହିତ (ଚିନି ନାହିଁ)' : 'କମ୍ ଚିନି ସହିତ ମସଲା ଚା'
          ],
          dinner: vegBase
            ? [
                'ଡାଲି/ରାଜମା (ହାଲୁକା ତେଲ) ସହିତ ୧-୨ ରୋଟି (କିମ୍ବା ମିଲେଟ୍ ରୋଟି)',
                'ମୌସୁମୀ ତରକାରୀ (ଲାଉ/ତୋରି/ଭେଣ୍ଡି)',
                'ଛୋଟ ପାତ୍ର ଦହି (ଲ୍ୟାକ୍ଟੋଜ୍ ସମସ୍ୟା ଥିଲେ ଛାଡନ୍ତୁ)'
              ]
            : [
                'ଗ୍ରିଲ୍ଡ ମାଛ କିମ୍ବା ଅଣ୍ଡା କରୀ (ହାଲୁକା ତେਲ)',
                '୧-୨ ରୋଟି କିମ୍ବା ଛୋଟ ଚାଉଳ ଅଂଶ',
                'ହାଲୁକା ଭଜା ତରକାରୀ'
              ]
        }
      };

      const currentMeals = meals[language] || meals.en;
      const allNotes = [currentNotes.spiceNote, currentNotes.sugarNote, currentNotes.saltNote, currentNotes.proteinHint, currentNotes.ironHint, currentNotes.kidneyNote, currentNotes.thyroidNote, currentNotes.bgNote]
        .filter(Boolean)
        .map(n => `- ${n}`)
        .join('\n');

      const headings = {
        en: { breakfast: 'Breakfast', lunch: 'Lunch', snack: 'Evening Snack', dinner: 'Dinner', notes: 'General Notes' },
        hi: { breakfast: 'नाश्ता', lunch: 'दोपहर का खाना', snack: 'शाम का नाश्ता', dinner: 'रात का खाना', notes: 'सामान्य सुझाव' },
        pa: { breakfast: 'ਨਾਸ਼ਤਾ', lunch: 'ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ', snack: 'ਸ਼ਾਮ ਦਾ ਨਾਸ਼ਤਾ', dinner: 'ਰਾਤ ਦਾ ਖਾਣਾ', notes: 'ਆਮ ਸੁਝਾਅ' },
        or: { breakfast: 'ନାସ୍ତା', lunch: 'ମଧ୍ୟାହ୍ନ ଭୋଜନ', snack: 'ସନ୍ଧ୍ୟା ନାସ୍ତା', dinner: 'ରାତ୍ରି ଭୋଜନ', notes: 'ସାଧାରଣ ପରାମର୍ଶ' }
      };

      const currentHeadings = headings[language] || headings.en;
      const plan = `### ${currentHeadings.breakfast}\n- ${currentMeals.breakfast.join('\n- ')}\n\n### ${currentHeadings.lunch}\n- ${currentMeals.lunch.join('\n- ')}\n\n### ${currentHeadings.snack}\n- ${currentMeals.snack.join('\n- ')}\n\n### ${currentHeadings.dinner}\n- ${currentMeals.dinner.join('\n- ')}\n\n### ${currentHeadings.notes}\n${allNotes}`;
      return plan;
    };

    const generateDietPlan = async () => {
      setIsLoading(true);
      setError(null);
      setDietPlan(null);
      const languageMap = { en: 'English', hi: 'Hindi', pa: 'Punjabi', or: 'Odia' };
      const systemPrompt = `You are an expert nutritionist creating a simple one-day diet plan for a user in rural India.
          User's Age: ${userProfile.age}
          User's Chronic Conditions: ${userProfile.conditions}
          User's Location Hint: Patiala, Punjab (Suggest locally available, affordable foods like whole grains, seasonal vegetables, lentils, dairy).
          Task: Create a simple, balanced one-day diet plan (Breakfast, Lunch, Dinner).
          Format: Use markdown headings for each meal (e.g., '### Breakfast'). For each meal, provide 2-3 simple food items.
          IMPORTANT: The entire response MUST be written in ${languageMap[language]}.`;

      try {
        const response = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: systemPrompt }) });
        const result = await response.json();
        const text = result?.text;
        if (text) setDietPlan(text); else throw new Error('Empty response');
      } catch (error) {
        console.error("Diet plan generation error:", error);
        // Provide a local dummy plan as fallback
        setDietPlan(buildDummyPlan());
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Salad className="h-8 w-8 mr-3 text-green-500" /> {t('dietPlannerTitle')}
            </h2>

            {!isProfileComplete ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 text-center">
                    <Info className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-yellow-800 dark:text-yellow-200 mb-4">{t('completeProfilePrompt')}</p>
                    <button
                        onClick={() => setCurrentView('profile')}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                    >
                        {t('goToProfile')}
                    </button>
                </div>
            ) : (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg p-6">
                    <div className="text-center">
                         <button
                            onClick={generateDietPlan}
                            disabled={isLoading}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center mx-auto"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    {t('generatingPlan')}
                                </>
                            ) : (
                                <>
                                 <Sparkles className="h-5 w-5 mr-2" />
                                 {t('generateDietPlan')}
                                </>
                            )}
                        </button>
                    </div>

                    {dietPlan && (
                        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6 animate-fade-in">
                            <div
                                className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: dietPlan.replace(/###/g, '<h3 class="font-semibold text-lg mb-2 mt-4">').replace(/\n/g, '<br />'),
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


export default HealthcareApp;
