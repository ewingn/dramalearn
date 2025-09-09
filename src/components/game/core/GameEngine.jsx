// src/components/game/core/GameEngine.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Core game engine that handles universal game mechanics
const GameEngine = ({ 
  storyConfig, 
  onGameComplete, 
  initialState = {},
  children 
}) => {
  const navigate = useNavigate();
  
  // Core game state - universal across all drama types
  const [gameState, setGameState] = useState({
    // Story progression
    currentAct: 0,
    currentScene: 0,
    currentDialogue: 0,
    gamePhase: 'intro', // intro, gameplay, dialogue, minigame, ending
    
    // Character relationships (supports multiple characters)
    relationships: storyConfig.characters?.reduce((acc, char) => {
      acc[char.id] = { affection: 50, trustLevel: 50, ...char.initialStats };
      return acc;
    }, {}) || {},
    
    // Player progress
    playerScore: 0,
    playerStats: {
      charisma: 50,
      intelligence: 50,
      creativity: 50,
      empathy: 50,
      ...initialState.playerStats
    },
    
    // Game mechanics
    timeLeft: 0,
    isActive: false,
    currentMinigame: null,
    
    // Session tracking
    gameStats: {
      correctAnswers: 0,
      totalQuestions: 0,
      minigamesCompleted: 0,
      dialogueChoicesMade: 0,
      perfectScenes: 0,
      totalScenes: 0,
      startTime: Date.now(),
      ...initialState.gameStats
    },
    
    // UI state
    showHints: false,
    currentLanguage: 'zh-tw',
    messageQueue: [],
    
    // Story-specific data
    storyData: initialState.storyData || {},
    
    ...initialState
  });

  const timerRef = useRef(null);

  // Universal timer system
  const startTimer = useCallback((seconds, onComplete) => {
    setGameState(prev => ({ ...prev, timeLeft: seconds, isActive: true }));
    
    const tick = () => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        
        if (newTimeLeft <= 0) {
          if (onComplete) onComplete();
          return { ...prev, timeLeft: 0, isActive: false };
        }
        
        return { ...prev, timeLeft: newTimeLeft };
      });
    };
    
    timerRef.current = setInterval(tick, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setGameState(prev => ({ ...prev, isActive: false }));
  }, []);

  // Relationship management system
  const updateRelationship = useCallback((characterId, changes) => {
    setGameState(prev => ({
      ...prev,
      relationships: {
        ...prev.relationships,
        [characterId]: {
          ...prev.relationships[characterId],
          ...Object.keys(changes).reduce((acc, key) => {
            const currentValue = prev.relationships[characterId]?.[key] || 0;
            acc[key] = Math.max(0, Math.min(100, currentValue + changes[key]));
            return acc;
          }, {})
        }
      }
    }));
  }, []);

  // Player stat management
  const updatePlayerStats = useCallback((changes) => {
    setGameState(prev => ({
      ...prev,
      playerStats: {
        ...prev.playerStats,
        ...Object.keys(changes).reduce((acc, key) => {
          const currentValue = prev.playerStats[key] || 0;
          acc[key] = Math.max(0, Math.min(100, currentValue + changes[key]));
          return acc;
        }, {})
      }
    }));
  }, []);

  // Score and progress tracking
  const updateScore = useCallback((points, category = 'general') => {
    setGameState(prev => ({
      ...prev,
      playerScore: prev.playerScore + points,
      gameStats: {
        ...prev.gameStats,
        [`${category}Points`]: (prev.gameStats[`${category}Points`] || 0) + points
      }
    }));
  }, []);

  // Minigame completion handler
  const handleMinigameComplete = useCallback((result) => {
    const { success, score = 0, relationshipChanges = {}, playerStatChanges = {}, data = {} } = result;
    
    // Update score
    updateScore(score, 'minigame');
    
    // Update relationships
    Object.keys(relationshipChanges).forEach(characterId => {
      updateRelationship(characterId, relationshipChanges[characterId]);
    });
    
    // Update player stats
    if (Object.keys(playerStatChanges).length > 0) {
      updatePlayerStats(playerStatChanges);
    }
    
    // Update game stats
    setGameState(prev => ({
      ...prev,
      gameStats: {
        ...prev.gameStats,
        minigamesCompleted: prev.gameStats.minigamesCompleted + 1,
        correctAnswers: success ? prev.gameStats.correctAnswers + 1 : prev.gameStats.correctAnswers,
        totalQuestions: prev.gameStats.totalQuestions + 1
      },
      currentMinigame: null,
      gamePhase: 'dialogue',
      storyData: { ...prev.storyData, ...data }
    }));

    // Story-specific completion logic
    if (storyConfig.onMinigameComplete) {
      storyConfig.onMinigameComplete(result, gameState);
    }
  }, [updateScore, updateRelationship, updatePlayerStats, gameState, storyConfig]);

  // Story progression system
  const advanceStory = useCallback((direction = 'forward') => {
    const story = storyConfig.story;
    const currentActData = story.acts[gameState.currentAct];
    const currentSceneData = currentActData?.scenes[gameState.currentScene];
    
    if (direction === 'forward') {
      // Check if we can advance based on relationship requirements
      if (storyConfig.progressionRules) {
        const canAdvance = storyConfig.progressionRules(gameState);
        if (!canAdvance.allowed) {
          setGameState(prev => ({ 
            ...prev, 
            gamePhase: 'ending',
            endingType: canAdvance.endingType || 'insufficient_progress'
          }));
          return;
        }
      }
      
      // Advance dialogue first
      if (gameState.currentDialogue < (currentSceneData?.dialogue?.length - 1 || 0)) {
        setGameState(prev => ({ ...prev, currentDialogue: prev.currentDialogue + 1 }));
      }
      // Then advance scene
      else if (gameState.currentScene < (currentActData?.scenes?.length - 1 || 0)) {
        setGameState(prev => ({ 
          ...prev, 
          currentScene: prev.currentScene + 1, 
          currentDialogue: 0,
          gameStats: {
            ...prev.gameStats,
            totalScenes: prev.gameStats.totalScenes + 1
          }
        }));
      }
      // Finally advance act
      else if (gameState.currentAct < (story.acts?.length - 1 || 0)) {
        setGameState(prev => ({ 
          ...prev, 
          currentAct: prev.currentAct + 1, 
          currentScene: 0, 
          currentDialogue: 0 
        }));
      }
      // Story complete
      else {
        const finalStats = calculateFinalStats(gameState);
        setGameState(prev => ({ 
          ...prev, 
          gamePhase: 'ending',
          endingType: finalStats.endingType,
          finalScore: finalStats.totalScore
        }));
        
        if (onGameComplete) {
          onGameComplete(finalStats);
        }
      }
    }
  }, [gameState, storyConfig, onGameComplete]);

  // Calculate final game statistics
  const calculateFinalStats = useCallback((finalGameState) => {
    const relationships = Object.values(finalGameState.relationships);
    const avgAffection = relationships.reduce((sum, rel) => sum + rel.affection, 0) / relationships.length;
    const playerStatTotal = Object.values(finalGameState.playerStats).reduce((sum, stat) => sum + stat, 0);
    
    let endingType = 'neutral';
    if (avgAffection >= 80 && playerStatTotal >= 350) endingType = 'perfect';
    else if (avgAffection >= 60 && playerStatTotal >= 300) endingType = 'good';
    else if (avgAffection < 30 || playerStatTotal < 200) endingType = 'bad';
    
    return {
      endingType,
      totalScore: finalGameState.playerScore,
      averageAffection: Math.round(avgAffection),
      playerStatTotal,
      completionPercentage: Math.round(
        ((finalGameState.currentAct + 1) / storyConfig.story.acts.length) * 100
      ),
      playTime: Date.now() - finalGameState.gameStats.startTime,
      finalGameState
    };
  }, [storyConfig]);

  // Language management
  const toggleLanguage = useCallback(() => {
    const languages = ['zh-tw', 'zh-cn', 'en'];
    const currentIndex = languages.indexOf(gameState.currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setGameState(prev => ({ ...prev, currentLanguage: languages[nextIndex] }));
  }, [gameState.currentLanguage]);

  // Translation helper
  const t = useCallback((textMap) => {
    if (typeof textMap === 'string') return textMap;
    return textMap[gameState.currentLanguage] || textMap['zh-tw'] || textMap;
  }, [gameState.currentLanguage]);

  // Game reset
  const resetGame = useCallback(() => {
    stopTimer();
    setGameState({
      currentAct: 0,
      currentScene: 0,
      currentDialogue: 0,
      gamePhase: 'intro',
      relationships: storyConfig.characters?.reduce((acc, char) => {
        acc[char.id] = { affection: 50, trustLevel: 50, ...char.initialStats };
        return acc;
      }, {}) || {},
      playerScore: 0,
      playerStats: {
        charisma: 50,
        intelligence: 50,
        creativity: 50,
        empathy: 50,
        ...initialState.playerStats
      },
      timeLeft: 0,
      isActive: false,
      currentMinigame: null,
      gameStats: {
        correctAnswers: 0,
        totalQuestions: 0,
        minigamesCompleted: 0,
        dialogueChoicesMade: 0,
        perfectScenes: 0,
        totalScenes: 0,
        startTime: Date.now()
      },
      showHints: false,
      currentLanguage: gameState.currentLanguage,
      messageQueue: [],
      storyData: {},
      ...initialState
    });
  }, [storyConfig, initialState, gameState.currentLanguage, stopTimer]);

  // Navigation helper
  const goBackToLearn = useCallback(() => {
    navigate('/learn');
  }, [navigate]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Provide game context to children
  const gameContext = {
    // State
    gameState,
    setGameState,
    
    // Story progression
    advanceStory,
    resetGame,
    
    // Relationships & Stats
    updateRelationship,
    updatePlayerStats,
    updateScore,
    
    // Timer system
    startTimer,
    stopTimer,
    
    // Minigame handling
    handleMinigameComplete,
    
    // Utilities
    t,
    toggleLanguage,
    goBackToLearn,
    
    // Story config
    storyConfig
  };

  return React.cloneElement(children, { gameContext });
};

export default GameEngine;