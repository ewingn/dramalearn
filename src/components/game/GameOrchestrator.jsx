// src/components/game/GameOrchestrator.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Import the modular system
import GameEngine from './core/GameEngine';
import MinigameContainer from './minigames/MinigameContainer';
import { getStoryConfig, storyRegistry } from './story/StoryArcTemplate';
import {
  GameHeader,
  RelationshipPanel,
  PlayerStatsPanel,
  ProgressTracker,
  GameStatsPanel,
  DialogInterface
} from './ui/SharedUIComponents';

// Import specific story configurations
import { romanceStoryConfig, mysteryStoryConfig } from './story/StoryArcTemplate';

/**
 * GameOrchestrator - Universal game loader that can handle any story arc
 * This component dynamically loads the appropriate story configuration
 * and renders the game using the modular system
 */
const GameOrchestrator = () => {
  const { storyType } = useParams(); // Get story type from URL params
  const navigate = useNavigate();
  const location = useLocation();
  
  const [storyConfig, setStoryConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameState, setGameState] = useState('loading'); // loading, ready, playing, ended

  // Load story configuration based on URL parameter
  useEffect(() => {
    const loadStoryConfig = async () => {
      try {
        setLoading(true);
        
        // Get story config from registry
        const config = getStoryConfig(storyType);
        
        if (!config) {
          throw new Error(`Story type "${storyType}" not found`);
        }
        
        // Apply any story-specific enhancements
        const enhancedConfig = await enhanceStoryConfig(config, storyType);
        
        setStoryConfig(enhancedConfig);
        setGameState('ready');
        setError(null);
      } catch (err) {
        console.error('Failed to load story config:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (storyType) {
      loadStoryConfig();
    }
  }, [storyType]);

  // Enhance story config with additional features based on story type
  const enhanceStoryConfig = async (baseConfig, type) => {
    const enhancements = {
      romance: enhanceRomanceStory,
      mystery: enhanceMysteryStory,
      family: enhanceFamilyStory,
      classics: enhanceClassicsStory
    };

    const enhancer = enhancements[type];
    return enhancer ? await enhancer(baseConfig) : baseConfig;
  };

  // Story-specific enhancement functions
  const enhanceRomanceStory = (config) => {
    return {
      ...config,
      // Add romance-specific minigame configurations
      enhancedMinigames: {
        note_passing: {
          romantic_themes: true,
          emotional_keywords: ['喜歡', '愛', '想念', '甜蜜', '浪漫'],
          success_multiplier: 1.2
        },
        date_simulator: {
          location_variety: true,
          seasonal_activities: true,
          cultural_elements: ['夜市', '電影院', '咖啡廳', '圖書館']
        }
      },
      // Add romance-specific progression rules
      customProgressionRules: (gameState) => {
        const mainRelationship = gameState.relationships[config.characters[0]?.id];
        const affection = mainRelationship?.affection || 0;
        
        // Romance-specific progression logic
        if (gameState.currentAct === 0 && affection < 25) {
          return {
            allowed: false,
            endingType: 'too_shy',
            message: {
              'zh-tw': '你太害羞了，機會就這樣溜走了...',
              'zh-cn': '你太害羞了，机会就这样溜走了...',
              'en': 'You were too shy, and the opportunity slipped away...'
            }
          };
        }
        
        if (gameState.currentAct === 1 && affection < 50) {
          return {
            allowed: false,
            endingType: 'friend_zone',
            message: {
              'zh-tw': '她說你是很好的朋友...',
              'zh-cn': '她说你是很好的朋友...',
              'en': 'She says you\'re a very good friend...'
            }
          };
        }
        
        return { allowed: true };
      }
    };
  };

  const enhanceMysteryStory = (config) => {
    return {
      ...config,
      enhancedMinigames: {
        quiz: {
          evidence_analysis: true,
          logical_reasoning: true,
          detective_terminology: true
        },
        connections: {
          clue_matching: true,
          suspect_profiling: true,
          timeline_reconstruction: true
        }
      },
      customProgressionRules: (gameState) => {
        const partnerRelationship = gameState.relationships.detective_fang;
        const respect = partnerRelationship?.respect || 0;
        
        if (respect < 30) {
          return {
            allowed: false,
            endingType: 'case_failed',
            message: {
              'zh-tw': '搭檔失去信心，案件調查失敗',
              'zh-cn': '搭档失去信心，案件调查失败',
              'en': 'Partner lost confidence, case investigation failed'
            }
          };
        }
        
        return { allowed: true };
      }
    };
  };

  const enhanceFamilyStory = (config) => {
    return {
      ...config,
      enhancedMinigames: {
        voice_chat: {
          family_conversations: true,
          generational_language: true,
          household_vocabulary: true
        }
      }
    };
  };

  const enhanceClassicsStory = (config) => {
    return {
      ...config,
      enhancedMinigames: {
        date_simulator: {
          luxury_settings: true,
          formal_language: true,
          social_etiquette: true
        }
      }
    };
  };

  // Handle game completion
  const handleGameComplete = (finalStats) => {
    setGameState('ended');
    
    // Save game completion data
    const completionData = {
      storyType,
      completedAt: new Date().toISOString(),
      finalStats,
      playTime: finalStats.playTime
    };
    
    // Store in localStorage for progress tracking
    const existingProgress = JSON.parse(localStorage.getItem('dramalearn-progress') || '{}');
    existingProgress[storyType] = completionData;
    localStorage.setItem('dramalearn-progress', JSON.stringify(existingProgress));
    
    console.log('Game completed:', completionData);
  };

  // Go back to learn page
  const goBackToLearn = () => {
    navigate('/learn');
  };

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '20px',
            animation: 'spin 2s linear infinite'
          }}>
            🎭
          </div>
          <h2 style={{ marginBottom: '10px', color: '#666' }}>
            載入中... / Loading...
          </h2>
          <p style={{ color: '#999', margin: 0 }}>
            正在準備你的戲劇體驗 / Preparing your drama experience
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ffebee, #ffcdd2)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>😔</div>
          <h2 style={{ marginBottom: '15px', color: '#d32f2f' }}>
            載入失敗 / Loading Failed
          </h2>
          <p style={{ marginBottom: '25px', color: '#666', lineHeight: '1.6' }}>
            {error}
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#e91e63',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 25px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              重新載入 / Reload
            </button>
            <button
              onClick={goBackToLearn}
              style={{
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 25px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              返回 / Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main game render
  return (
    <GameEngine
      storyConfig={storyConfig}
      onGameComplete={handleGameComplete}
      initialState={{
        // Story-specific initial states
        playerStats: getInitialPlayerStats(storyType),
        storyData: {
          storyType,
          startedAt: new Date().toISOString()
        }
      }}
    >
      <UniversalGameContent
        storyType={storyType}
        goBackToLearn={goBackToLearn}
      />
    </GameEngine>
  );
};

// Get initial player stats based on story type
const getInitialPlayerStats = (storyType) => {
  const statConfigs = {
    romance: {
      charisma: 45,
      intelligence: 55,
      creativity: 50,
      empathy: 60
    },
    mystery: {
      intelligence: 65,
      observation: 55,
      logic: 60,
      courage: 45
    },
    family: {
      empathy: 70,
      patience: 60,
      wisdom: 50,
      warmth: 65
    },
    classics: {
      charisma: 60,
      elegance: 55,
      intelligence: 60,
      confidence: 50
    }
  };

  return statConfigs[storyType] || {
    charisma: 50,
    intelligence: 50,
    creativity: 50,
    empathy: 50
  };
};

// Universal game content component
const UniversalGameContent = ({ gameContext, storyType, goBackToLearn }) => {
  const { 
    gameState, 
    storyConfig, 
    t,
    advanceStory,
    resetGame,
    handleMinigameComplete 
  } = gameContext;

  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [showMinigame, setShowMinigame] = useState(false);
  const [minigameConfig, setMinigameConfig] = useState(null);

  // Get current story elements
  const currentAct = storyConfig.story.acts[gameState.currentAct];
  const currentScene = currentAct?.scenes[gameState.currentScene];
  const currentDialogueItem = currentScene?.dialogue[gameState.currentDialogue];

  // Handle story progression
  useEffect(() => {
    if (currentDialogueItem && !showMinigame && gameState.gamePhase === 'dialogue') {
      setCurrentDialogue(currentDialogueItem);
    }
  }, [currentDialogueItem, showMinigame, gameState.gamePhase]);

  // Handle dialogue choices
  const handleDialogueChoice = (choice) => {
    if (choice.action === 'minigame') {
      setMinigameConfig({
        type: choice.minigame.type,
        config: choice.minigame.config
      });
      setShowMinigame(true);
    } else {
      // Apply immediate effects
      if (choice.relationshipChanges) {
        Object.keys(choice.relationshipChanges).forEach(characterId => {
          gameContext.updateRelationship(characterId, choice.relationshipChanges[characterId]);
        });
      }
      
      if (choice.playerStatChanges) {
        gameContext.updatePlayerStats(choice.playerStatChanges);
      }
      
      if (choice.scoreChange) {
        gameContext.updateScore(choice.scoreChange);
      }
      
      advanceStory();
    }
    setCurrentDialogue(null);
  };

  // Handle minigame completion
  const handleMinigameResult = (result) => {
    handleMinigameComplete(result);
    setShowMinigame(false);
    setMinigameConfig(null);
    
    setTimeout(() => {
      advanceStory();
    }, 1000);
  };

  // Continue dialogue
  const handleContinueDialogue = () => {
    advanceStory();
    setCurrentDialogue(null);
  };

  // Render different phases
  const renderGamePhase = () => {
    switch (gameState.gamePhase) {
      case 'intro':
        return <UniversalIntroScreen gameContext={gameContext} storyType={storyType} />;
      
      case 'gameplay':
      case 'dialogue':
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 1200 ? '2fr 1fr' : '1fr',
            gap: '20px',
            minHeight: '70vh'
          }}>
            {/* Main game area */}
            <div>
              {showMinigame ? (
                <MinigameContainer
                  minigameType={minigameConfig.type}
                  config={minigameConfig.config}
                  gameContext={gameContext}
                  onComplete={handleMinigameResult}
                  onBack={() => {
                    setShowMinigame(false);
                    setMinigameConfig(null);
                  }}
                />
              ) : (
                <>
                  {/* Scene setting */}
                  {currentScene && (
                    <SceneDisplay 
                      scene={currentScene} 
                      storyConfig={storyConfig} 
                      t={t} 
                    />
                  )}

                  {/* Current dialogue */}
                  {currentDialogue && (
                    <DialogInterface
                      dialogue={currentDialogue}
                      gameContext={gameContext}
                      onChoice={handleDialogueChoice}
                      onContinue={handleContinueDialogue}
                    />
                  )}
                </>
              )}
            </div>

            {/* Sidebar - only show on larger screens */}
            {window.innerWidth > 1200 && (
              <div>
                <RelationshipPanel gameContext={gameContext} storyConfig={storyConfig} />
                <PlayerStatsPanel gameContext={gameContext} storyConfig={storyConfig} />
                <ProgressTracker gameContext={gameContext} storyConfig={storyConfig} />
              </div>
            )}
          </div>
        );
      
      case 'ending':
        return <UniversalEndingScreen gameContext={gameContext} storyType={storyType} />;
      
      default:
        return <UniversalIntroScreen gameContext={gameContext} storyType={storyType} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: storyConfig.theme?.backgroundColor || 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
      padding: '20px'
    }}>
      {/* Game Header */}
      <GameHeader
        gameContext={gameContext}
        storyConfig={storyConfig}
        onBack={goBackToLearn}
        showTimer={gameState.gamePhase === 'gameplay' || gameState.gamePhase === 'dialogue'}
      />

      {/* Main content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        paddingTop: '20px'
      }}>
        {renderGamePhase()}
      </div>

      {/* Mobile stats panel */}
      {window.innerWidth <= 1200 && gameState.gamePhase !== 'intro' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '280px',
          zIndex: 1000
        }}>
          <GameStatsPanel gameContext={gameContext} />
        </div>
      )}
    </div>
  );
};

// Scene display component
const SceneDisplay = ({ scene, storyConfig, t }) => (
  <div style={{
    background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '20px',
    border: '2px solid #ff9800'
  }}>
    <h3 style={{ 
      margin: '0 0 10px 0', 
      color: '#e65100',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      {t(scene.setting)}
    </h3>
    {scene.atmosphere && (
      <p style={{
        margin: 0,
        fontSize: '16px',
        fontStyle: 'italic',
        color: '#bf360c',
        lineHeight: '1.6'
      }}>
        {t(scene.atmosphere)}
      </p>
    )}
    {scene.objective && (
      <div style={{
        marginTop: '15px',
        padding: '12px',
        background: 'rgba(255,152,0,0.1)',
        borderRadius: '8px',
        border: '1px solid #ff9800'
      }}>
        <strong style={{ color: '#e65100' }}>
          🎯 {t({ 'zh-tw': '目標', 'zh-cn': '目标', 'en': 'Objective' })}: 
        </strong>
        <span style={{ marginLeft: '8px', color: '#bf360c' }}>
          {t(scene.objective)}
        </span>
      </div>
    )}
  </div>
);

// Universal intro screen
const UniversalIntroScreen = ({ gameContext, storyType }) => {
  const { gameState, storyConfig, t, setGameState } = gameContext;

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'gameplay'
    }));
  };

  return (
    <div style={{
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <div style={{ 
        fontSize: '5rem', 
        marginBottom: '20px',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
      }}>
        {storyType === 'romance' ? '🎬' : 
         storyType === 'mystery' ? '🔍' : 
         storyType === 'family' ? '👨‍👩‍👧‍👦' : 
         storyType === 'classics' ? '⭐' : '🎭'}
      </div>
      
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: storyConfig.theme?.primaryColor || '#e91e63',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        {t(storyConfig.title)}
      </h1>
      
      <p style={{
        fontSize: '1.3rem',
        marginBottom: '30px',
        color: '#666',
        fontStyle: 'italic',
        lineHeight: '1.6'
      }}>
        {t(storyConfig.description)}
      </p>

      {/* Estimated play time and difficulty */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '20px',
          padding: '10px 20px',
          fontSize: '14px',
          color: '#666'
        }}>
          ⏱️ {storyConfig.estimatedPlayTime} {t({ 'zh-tw': '分鐘', 'zh-cn': '分钟', 'en': 'minutes' })}
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '20px',
          padding: '10px 20px',
          fontSize: '14px',
          color: '#666'
        }}>
          📊 {t({ 'zh-tw': storyConfig.difficulty, 'zh-cn': storyConfig.difficulty, 'en': storyConfig.difficulty })}
        </div>
      </div>

      {/* Learning objectives */}
      {storyConfig.learningObjectives && (
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            marginBottom: '20px', 
            color: storyConfig.theme?.primaryColor || '#e91e63',
            textAlign: 'center'
          }}>
            {t({ 'zh-tw': '🎯 學習目標', 'zh-cn': '🎯 学习目标', 'en': '🎯 Learning Objectives' })}
          </h3>
          <ul style={{ lineHeight: '1.8', color: '#333', paddingLeft: '20px' }}>
            {storyConfig.learningObjectives.map((objective, index) => (
              <li key={index}>{t(objective)}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={startGame}
        style={{
          background: `linear-gradient(45deg, ${storyConfig.theme?.primaryColor || '#e91e63'}, ${storyConfig.theme?.secondaryColor || '#f8bbd9'})`,
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          padding: '18px 40px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(233, 30, 99, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 6px 20px rgba(233, 30, 99, 0.4)';
        }}
      >
        {t({ 'zh-tw': '🎮 開始體驗', 'zh-cn': '🎮 开始体验', 'en': '🎮 Start Experience' })}
      </button>
    </div>
  );
};

// Universal ending screen
const UniversalEndingScreen = ({ gameContext, storyType }) => {
  const { gameState, storyConfig, t, resetGame, goBackToLearn } = gameContext;
  
  const relationships = Object.values(gameState.relationships);
  const averageAffection = relationships.reduce((sum, rel) => {
    const mainStat = rel.affection || rel.respect || rel.trust || 50;
    return sum + mainStat;
  }, 0) / relationships.length;

  const getEndingType = () => {
    if (averageAffection >= 80) return 'perfect';
    if (averageAffection >= 60) return 'good';
    if (averageAffection >= 30) return 'neutral';
    return 'bad';
  };

  const endingType = getEndingType();
  const ending = storyConfig.endings?.[endingType];

  return (
    <div style={{
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
          {endingType === 'perfect' ? '🌟' : 
           endingType === 'good' ? '😊' : 
           endingType === 'neutral' ? '😐' : '😔'}
        </div>
        
        <h2 style={{
          marginBottom: '15px',
          color: storyConfig.theme?.primaryColor || '#e91e63'
        }}>
          {t(ending?.title || { 'zh-tw': '故事結束', 'zh-cn': '故事结束', 'en': 'Story Complete' })}
        </h2>
        
        <p style={{
          marginBottom: '30px',
          fontSize: '18px',
          lineHeight: '1.6'
        }}>
          {t(ending?.description || { 'zh-tw': '感謝你的參與！', 'zh-cn': '感谢你的参与！', 'en': 'Thank you for participating!' })}
        </p>

        {/* Final stats display */}
        <div style={{
          background: '#f8f9fa',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>
            {t({ 'zh-tw': '最終統計', 'zh-cn': '最终统计', 'en': 'Final Statistics' })}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '15px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: storyConfig.theme?.primaryColor || '#e91e63' }}>
                {Math.round(averageAffection)}%
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {t({ 'zh-tw': '關係評分', 'zh-cn': '关系评分', 'en': 'Relationship Score' })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196f3' }}>
                {gameState.playerScore}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {t({ 'zh-tw': '總分', 'zh-cn': '总分', 'en': 'Total Score' })}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4caf50' }}>
                {gameState.gameStats.minigamesCompleted}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {t({ 'zh-tw': '完成活動', 'zh-cn': '完成活动', 'en': 'Activities Done' })}
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={resetGame}
            style={{
              background: storyConfig.theme?.primaryColor || '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {t({ 'zh-tw': '重新體驗', 'zh-cn': '重新体验', 'en': 'Experience Again' })}
          </button>
          
          <button
            onClick={goBackToLearn}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {t({ 'zh-tw': '返回選單', 'zh-cn': '返回选单', 'en': 'Back to Menu' })}
          </button>
        </div>
      </div>
    </div>
  );
};

// Add CSS animation for loading spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default GameOrchestrator;