// utils/gameHooks.js - Custom React hooks for the romance game

import { useState, useEffect, useRef, useCallback } from 'react';
import { createTranslationFunction, generateAIResponse, startVoiceRecording } from './gameUtils';

// Timer hook
export const useGameTimer = (onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && isActive) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onTimeUp();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isActive, onTimeUp]);

  const startTimer = useCallback((seconds) => {
    setTimeLeft(seconds);
    setIsActive(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const resetTimer = useCallback((seconds = 0) => {
    stopTimer();
    setTimeLeft(seconds);
  }, [stopTimer]);

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    resetTimer
  };
};

// Voice recording hook
export const useVoiceRecording = (currentLanguage) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const startRecording = useCallback(() => {
    startVoiceRecording(
      currentLanguage,
      (result) => {
        setTranscript(result);
        setIsRecording(false);
      },
      (err) => {
        setError(err);
        setIsRecording(false);
      },
      () => setIsRecording(true),
      () => setIsRecording(false)
    );
  }, [currentLanguage]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isRecording,
    transcript,
    error,
    startRecording,
    clearTranscript
  };
};

// Chat management hook
export const useChat = (currentLanguage, minigameType) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = useCallback(async (message, isVoice = false) => {
    if (!message.trim()) return;

    const userMessage = {
      speaker: 'user',
      text: message,
      timestamp: Date.now(),
      isVoice
    };

    setChatHistory(prev => [...prev, userMessage]);

    // Generate AI response
    try {
      const aiResponse = await generateAIResponse(minigameType, message, currentLanguage, isVoice);
      
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          speaker: 'ai',
          text: aiResponse,
          timestamp: Date.now()
        }]);
      }, 1000);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
    }

    setUserInput('');
  }, [currentLanguage, minigameType]);

  const clearChat = useCallback(() => {
    setChatHistory([]);
    setUserInput('');
  }, []);

  return {
    chatHistory,
    setChatHistory,
    userInput,
    setUserInput,
    chatRef,
    sendMessage,
    clearChat
  };
};

// Game state management hook
export const useGameState = () => {
  const [gamePhase, setGamePhase] = useState('intro');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [crushAffection, setCrushAffection] = useState(50);
  const [playerScore, setPlayerScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [gameStats, setGameStats] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
    notesExchanged: 0,
    teacherTroubles: 0
  });

  const resetGame = useCallback(() => {
    setCrushAffection(50);
    setPlayerScore(0);
    setCurrentScenario(0);
    setGameActive(false);
    setShowHints(false);
    setGameStats({
      correctAnswers: 0,
      totalQuestions: 0,
      notesExchanged: 0,
      teacherTroubles: 0
    });
  }, []);

  const updateAffection = useCallback((change) => {
    setCrushAffection(prev => Math.max(0, Math.min(100, prev + change)));
  }, []);

  const updateScore = useCallback((points) => {
    setPlayerScore(prev => prev + points);
  }, []);

  const nextScenario = useCallback((totalScenarios) => {
    if (currentScenario < totalScenarios - 1) {
      setCurrentScenario(prev => prev + 1);
    } else {
      setGamePhase('ending');
    }
  }, [currentScenario]);

  return {
    gamePhase,
    setGamePhase,
    selectedCharacter,
    setSelectedCharacter,
    crushAffection,
    setCrushAffection,
    playerScore,
    setPlayerScore,
    currentScenario,
    setCurrentScenario,
    gameActive,
    setGameActive,
    showHints,
    setShowHints,
    gameStats,
    setGameStats,
    resetGame,
    updateAffection,
    updateScore,
    nextScenario
  };
};

// Language management hook
export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('zh-tw');

  const toggleLanguage = useCallback(() => {
    const languages = ['zh-tw', 'zh-cn', 'en'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
  }, [currentLanguage]);

  const t = useCallback((textMap) => {
    return createTranslationFunction(currentLanguage)(textMap);
  }, [currentLanguage]);

  return {
    currentLanguage,
    setCurrentLanguage,
    toggleLanguage,
    t
  };
};

// Local storage hook for game progress
export const useGameProgress = () => {
  const saveProgress = useCallback((gameState) => {
    try {
      const progressData = {
        ...gameState,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('romanceGameProgress', JSON.stringify(progressData));
      return true;
    } catch (error) {
      console.error('Failed to save progress:', error);
      return false;
    }
  }, []);

  const loadProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem('romanceGameProgress');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }, []);

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem('romanceGameProgress');
      return true;
    } catch (error) {
      console.error('Failed to clear progress:', error);
      return false;
    }
  }, []);

  return {
    saveProgress,
    loadProgress,
    clearProgress
  };
};

// Quiz game hook
export const useQuizGame = (questionSet) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const submitAnswer = useCallback(() => {
    if (selectedAnswer === null || answered) return false;
    
    setAnswered(true);
    const isCorrect = selectedAnswer === questionSet[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    return isCorrect;
  }, [selectedAnswer, answered, questionSet, currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questionSet.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  }, [currentQuestion, questionSet.length]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setCompleted(false);
  }, []);

  return {
    currentQuestion,
    selectedAnswer,
    setSelectedAnswer,
    answered,
    score,
    completed,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    progress: {
      current: currentQuestion + 1,
      total: questionSet.length,
      percentage: Math.round(((currentQuestion + 1) / questionSet.length) * 100)
    }
  };
};

// Animation hook
export const useAnimation = () => {
  const [animations, setAnimations] = useState({});

  const triggerAnimation = useCallback((elementId, animationClass, duration = 1000) => {
    setAnimations(prev => ({
      ...prev,
      [elementId]: animationClass
    }));

    setTimeout(() => {
      setAnimations(prev => {
        const newAnimations = { ...prev };
        delete newAnimations[elementId];
        return newAnimations;
      });
    }, duration);
  }, []);

  const getAnimationClass = useCallback((elementId) => {
    return animations[elementId] || '';
  }, [animations]);

  return {
    triggerAnimation,
    getAnimationClass
  };
};

export default {
  useGameTimer,
  useVoiceRecording,
  useChat,
  useGameState,
  useLanguage,
  useGameProgress,
  useQuizGame,
  useAnimation
};