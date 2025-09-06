// src/components/romance/RomanceGame.jsx
import React, { useState, useEffect, useRef } from 'react';
import GameIntro from '.romance/phases/GameIntro.jsx';
import CharacterSelect from './phases/CharacterSelect';
import GameplayMain from './phases/GameplayMain';
import GameEnding from './phases/GameEnding';
import { characters, scenarios, allQuizQuestions } from './data/gameData';

const RomanceGame = () => {
  // Game State
  const [currentLanguage, setCurrentLanguage] = useState('zh-tw');
  const [gamePhase, setGamePhase] = useState('intro');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [crushAffection, setCrushAffection] = useState(50);
  const [playerScore, setPlayerScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [gameStats, setGameStats] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
    notesExchanged: 0,
    teacherTroubles: 0
  });

  const chatRef = useRef(null);
  const timerRef = useRef(null);

  // Translation function
  const t = (textMap) => {
    if (typeof textMap === 'string') return textMap;
    return textMap[currentLanguage] || textMap['zh-tw'] || textMap;
  };

  // Language toggle
  const toggleLanguage = () => {
    const languages = ['zh-tw', 'zh-cn', 'en'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
  };

  // Timer functionality
  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      handleTimeUp();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, gameActive]);

  const handleTimeUp = () => {
    setCrushAffection(prev => Math.max(0, prev - 10));
    alert(t({
      'zh-tw': '⏰ 時間到了！錯失良機...',
      'zh-cn': '⏰ 时间到了！错失良机...',
      'en': '⏰ Time\'s up! Missed opportunity...'
    }));
    
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
    } else {
      setGamePhase('ending');
    }
  };

  // Game reset
  const resetGame = () => {
    setCrushAffection(50);
    setPlayerScore(0);
    setCurrentScenario(0);
    setChatHistory([]);
    setTimeLeft(0);
    setGameActive(false);
    setGameStats({
      correctAnswers: 0,
      totalQuestions: 0,
      notesExchanged: 0,
      teacherTroubles: 0
    });
  };

  // Game props to pass to child components
  const gameProps = {
    currentLanguage,
    t,
    toggleLanguage,
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
    chatHistory,
    setChatHistory,
    userInput,
    setUserInput,
    showHints,
    setShowHints,
    timeLeft,
    setTimeLeft,
    gameActive,
    setGameActive,
    isRecording,
    setIsRecording,
    gameStats,
    setGameStats,
    characters,
    scenarios,
    allQuizQuestions,
    resetGame
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffebee, #f3e5f5)',
      paddingTop: '100px',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    },
    languageToggle: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#e91e63',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      zIndex: 1000,
      boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)'
    },
    header: {
      background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
      color: 'white',
      padding: '30px 20px',
      textAlign: 'center',
      marginBottom: '30px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Language Toggle Button */}
      <button onClick={toggleLanguage} style={styles.languageToggle}>
        {currentLanguage === 'zh-tw' ? '繁中' : 
         currentLanguage === 'zh-cn' ? '简中' : 'EN'} ⚙️
      </button>

      <div style={styles.header}>
        <h1 style={{ margin: '0', fontSize: '2.5rem' }}>
          {t({
            'zh-tw': '那些年，我們一起追的女孩',
            'zh-cn': '那些年，我们一起追的女孩',
            'en': 'You Are the Apple of My Eye'
          })}
        </h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.2rem', opacity: '0.9' }}>
          {t({
            'zh-tw': '校園戀愛互動遊戲 - 語音對話版',
            'zh-cn': '校园恋爱互动游戏 - 语音对话版',
            'en': 'School Romance Interactive Game - Voice Chat Edition'
          })}
        </p>
      </div>

      {gamePhase === 'intro' && <GameIntro {...gameProps} />}
      {gamePhase === 'character-select' && <CharacterSelect {...gameProps} />}
      {gamePhase === 'gameplay' && <GameplayMain {...gameProps} />}
      {gamePhase === 'ending' && <GameEnding {...gameProps} />}
    </div>
  );
};

export default RomanceGame;