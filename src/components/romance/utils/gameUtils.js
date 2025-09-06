// gameUtils.js - Utility functions for the romance game

import { aiResponseTemplates } from '../data/gameData';

// Translation helper
export const createTranslationFunction = (currentLanguage) => {
  return (textMap) => {
    if (typeof textMap === 'string') return textMap;
    const translations = textMap;
    return translations[currentLanguage] || translations['zh-tw'] || textMap;
  };
};

// AI Response generation
export const generateAIResponse = async (context, userMessage, currentLanguage, isVoice = false) => {
  try {
    // For now, use mock responses. Replace with actual Gemini API later
    const t = createTranslationFunction(currentLanguage);
    const responses = aiResponseTemplates[context] || aiResponseTemplates.conversation;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return t(randomResponse);
  } catch (error) {
    console.error('AI Response error:', error);
    const t = createTranslationFunction(currentLanguage);
    return t({
      'zh-tw': '嗯...我在想該說什麼好',
      'zh-cn': '嗯...我在想该说什么好',
      'en': 'Hmm... I\'m thinking about what to say'
    });
  }
};

// Voice recording functionality
export const startVoiceRecording = async (currentLanguage, onResult, onError, onStart, onEnd) => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    const t = createTranslationFunction(currentLanguage);
    const errorMessage = t({
      'zh-tw': '您的瀏覽器不支援語音識別功能',
      'zh-cn': '您的浏览器不支持语音识别功能',
      'en': 'Your browser doesn\'t support speech recognition'
    });
    onError(errorMessage);
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.lang = currentLanguage === 'en' ? 'en-US' : 
                   currentLanguage === 'zh-cn' ? 'zh-CN' : 'zh-TW';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    onStart();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = () => {
    const t = createTranslationFunction(currentLanguage);
    const errorMessage = t({
      'zh-tw': '語音識別失敗，請重試',
      'zh-cn': '语音识别失败，请重试',
      'en': 'Speech recognition failed, please try again'
    });
    onError(errorMessage);
  };

  recognition.onend = () => {
    onEnd();
  };

  recognition.start();
  return recognition;
};

// Timer utilities
export const createTimer = (initialTime, onTick, onComplete) => {
  let timeLeft = initialTime;
  let isActive = false;
  let intervalId = null;

  const start = () => {
    if (isActive) return;
    isActive = true;
    
    intervalId = setInterval(() => {
      timeLeft -= 1;
      onTick(timeLeft);
      
      if (timeLeft <= 0) {
        stop();
        onComplete();
      }
    }, 1000);
  };

  const stop = () => {
    isActive = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const reset = (newTime = initialTime) => {
    stop();
    timeLeft = newTime;
    onTick(timeLeft);
  };

  const getTime = () => timeLeft;
  const isRunning = () => isActive;

  return {
    start,
    stop,
    reset,
    getTime,
    isRunning
  };
};

// Game state management helpers
export const calculateEndingType = (crushAffection) => {
  if (crushAffection >= 80) return 'perfect';
  if (crushAffection >= 60) return 'good';
  if (crushAffection >= 30) return 'neutral';
  return 'bad';
};

export const getEndingMessage = (endingType, currentLanguage) => {
  const t = createTranslationFunction(currentLanguage);
  
  const messages = {
    perfect: {
      'zh-tw': '🎉 完美結局！你們成為了最佳情侶，就像電影中的美好愛情故事！',
      'zh-cn': '🎉 完美结局！你们成为了最佳情侣，就像电影中的美好爱情故事！',
      'en': '🎉 Perfect Ending! You became the perfect couple, just like the beautiful love story in the movie!'
    },
    good: {
      'zh-tw': '😊 好結局！你們成為了很好的朋友，或許愛情就在不遠處...',
      'zh-cn': '😊 好结局！你们成为了很好的朋友，或许爱情就在不远处...',
      'en': '😊 Good Ending! You became good friends, maybe love is just around the corner...'
    },
    neutral: {
      'zh-tw': '😐 普通結局！雖然沒有特別的發展，但青春的回憶永遠珍貴',
      'zh-cn': '😐 普通结局！虽然没有特别的发展，但青春的回忆永远珍贵',
      'en': '😐 Neutral Ending! Though nothing special happened, youth memories are always precious'
    },
    bad: {
      'zh-tw': '😅 糟糕結局！看來你需要更多練習...但別放棄，愛情需要勇氣！',
      'zh-cn': '😅 糟糕结局！看来你需要更多练习...但别放弃，爱情需要勇气！',
      'en': '😅 Bad Ending! Looks like you need more practice... but don\'t give up, love requires courage!'
    }
  };

  return t(messages[endingType]);
};

export const getEndingEmoji = (endingType) => {
  const emojis = {
    perfect: '🌟',
    good: '😊',
    neutral: '😐',
    bad: '😅'
  };
  return emojis[endingType];
};

// Affection level descriptions
export const getAffectionDescription = (crushAffection, currentLanguage) => {
  const t = createTranslationFunction(currentLanguage);
  
  if (crushAffection > 80) {
    return t({
      'zh-tw': '❤️ 深深愛上你',
      'zh-cn': '❤️ 深深爱上你',
      'en': '❤️ Deeply in love'
    });
  } else if (crushAffection > 60) {
    return t({
      'zh-tw': '😊 很喜歡你',
      'zh-cn': '😊 很喜欢你',
      'en': '😊 Really likes you'
    });
  } else if (crushAffection > 40) {
    return t({
      'zh-tw': '😐 普通朋友',
      'zh-cn': '😐 普通朋友',
      'en': '😐 Just friends'
    });
  } else {
    return t({
      'zh-tw': '😤 有點生氣',
      'zh-cn': '😤 有点生气',
      'en': '😤 A bit upset'
    });
  }
};

// Note writing success calculation
export const calculateNoteSuccess = (noteContent) => {
  if (noteContent.length > 10 && noteContent.length < 50) {
    return { successChance: 0.8, isOptimal: true };
  }
  return { successChance: 0.4, isOptimal: false };
};

// Quiz accuracy calculation
export const calculateQuizAccuracy = (correctAnswers, totalQuestions) => {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
};

// Random question set selector
export const selectRandomQuestionSet = (allQuizQuestions) => {
  const randomIndex = Math.floor(Math.random() * allQuizQuestions.length);
  return allQuizQuestions[randomIndex];
};

// Festival activity outcome
export const calculateFestivalOutcome = (activitySuccessRate) => {
  return Math.random() < activitySuccessRate;
};

// Game progress validation
export const validateGameProgress = (currentScenario, totalScenarios) => {
  return {
    isLastScenario: currentScenario >= totalScenarios - 1,
    progressPercentage: Math.round(((currentScenario + 1) / totalScenarios) * 100),
    scenariosRemaining: Math.max(0, totalScenarios - currentScenario - 1)
  };
};

// Local storage helpers (for saving game progress)
export const saveGameProgress = (gameState) => {
  try {
    const gameData = {
      ...gameState,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('romanceGameProgress', JSON.stringify(gameData));
    return true;
  } catch (error) {
    console.error('Failed to save game progress:', error);
    return false;
  }
};

export const loadGameProgress = () => {
  try {
    const savedData = localStorage.getItem('romanceGameProgress');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  } catch (error) {
    console.error('Failed to load game progress:', error);
    return null;
  }
};

export const clearGameProgress = () => {
  try {
    localStorage.removeItem('romanceGameProgress');
    return true;
  } catch (error) {
    console.error('Failed to clear game progress:', error);
    return false;
  }
};

// Validation helpers
export const validateInput = (input, minLength = 1, maxLength = 100) => {
  if (!input || typeof input !== 'string') return false;
  const trimmed = input.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

// Animation helpers
export const addAnimationClass = (elementId, className, duration = 1000) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add(className);
    setTimeout(() => {
      element.classList.remove(className);
    }, duration);
  }
};

// Debounce utility for input handling
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format time display
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
};