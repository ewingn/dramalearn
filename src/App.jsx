import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";
import FloatingButton from "./components/FloatingButton";
import LanguageToggle from "./components/LanguageToggle";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'zh-tw'
    return localStorage.getItem('dramalearn-language') || 'zh-tw';
  });

  // Language switching function
  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
    // Save to localStorage for persistence
    localStorage.setItem('dramalearn-language', lang);
    // Update all text elements with data-text attributes
    updatePageLanguage(lang);
  };

  const updatePageLanguage = (lang) => {
    const elements = document.querySelectorAll('[data-text]');
    elements.forEach(element => {
      const textData = element.getAttribute('data-text');
      if (textData) {
        const translations = textData.split('|').reduce((acc, item) => {
          const [key, value] = item.split(':');
          acc[key] = value;
          return acc;
        }, {});
        
        if (translations[lang]) {
          element.textContent = translations[lang];
        }
      }
    });
  };

  // Initialize language on component mount and when language changes
  useEffect(() => {
    updatePageLanguage(currentLanguage);
  }, [currentLanguage]);

  // Update language when navigating to new pages
  useEffect(() => {
    const timer = setTimeout(() => {
      updatePageLanguage(currentLanguage);
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LanguageToggle 
        currentLanguage={currentLanguage} 
        onLanguageChange={switchLanguage} 
      />
      <Header currentLanguage={currentLanguage} />
      <FloatingElements />
      <main style={{ flexGrow: 1, paddingTop: '80px' }}>
        <Outlet context={{ currentLanguage, switchLanguage }} />
      </main>
      <Footer currentLanguage={currentLanguage} />
      <FloatingButton currentLanguage={currentLanguage} />
    </div>
  );
}