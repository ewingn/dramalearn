// src/pages/RomancePageRefactored.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the new modular system
import GameEngine from '../components/game/core/GameEngine';
import MinigameContainer from '../components/game/minigames/MinigameContainer';
import { romanceStoryConfig } from '../components/game/story/StoryArcTemplate';
import {
  GameHeader,
  RelationshipPanel,
  PlayerStatsPanel,
  ProgressTracker,
  GameStatsPanel,
  DialogInterface
} from '../components/game/ui/SharedUIComponents';

const RomancePageRefactored = () => {
  const navigate = useNavigate();
  
  // Local state for UI-specific concerns
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [showMinigame, setShowMinigame] = useState(false);
  const [minigameConfig, setMinigameConfig] = useState(null);
  const [showEndingModal, setShowEndingModal] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // Game completion handler
  const handleGameComplete = (finalStats) => {
    setGameEnded(true);
    setShowEndingModal(true);
    console.log('Game completed with stats:', finalStats);
  };

  // Enhanced romance story configuration with specific minigames
  const enhancedRomanceConfig = {
    ...romanceStoryConfig,
    
    // Add more detailed minigame configurations
    acts: romanceStoryConfig.acts.map(act => ({
      ...act,
      scenes: act.scenes.map(scene => ({
        ...scene,
        dialogue: scene.dialogue?.map(dialogueItem => {
          if (dialogueItem.type === 'minigame_trigger') {
            // Enhanced minigame configurations for romance
            const minigameEnhancements = {
              note_passing: {
                ...dialogueItem.minigame.config,
                activities: [
                  {
                    name: { 'zh-tw': '寫甜蜜紙條', 'zh-cn': '写甜蜜纸条', 'en': 'Write Sweet Note' },
                    description: { 'zh-tw': '寫一張浪漫的紙條', 'zh-cn': '写一张浪漫的纸条', 'en': 'Write a romantic note' },
                    successRate: 0.8,
                    points: 80,
                    emoji: '💕'
                  }
                ]
              },
              connections: {
                ...dialogueItem.minigame.config,
                words: [
                  { 'zh-tw': '春天', 'zh-cn': '春天', 'en': 'spring' },
                  { 'zh-tw': '櫻花', 'zh-cn': '樱花', 'en': 'cherry blossoms' },
                  { 'zh-tw': '夏天', 'zh-cn': '夏天', 'en': 'summer' },
                  { 'zh-tw': '海邊', 'zh-cn': '海边', 'en': 'seaside' },
                  { 'zh-tw': '秋天', 'zh-cn': '秋天', 'en': 'autumn' },
                  { 'zh-tw': '楓葉', 'zh-cn': '枫叶', 'en': 'maple leaves' },
                  { 'zh-tw': '冬天', 'zh-cn': '冬天', 'en': 'winter' },
                  { 'zh-tw': '雪花', 'zh-cn': '雪花', 'en': 'snowflakes' }
                ],
                pairs: [
                  [{ 'zh-tw': '春天', 'zh-cn': '春天', 'en': 'spring' }, { 'zh-tw': '櫻花', 'zh-cn': '樱花', 'en': 'cherry blossoms' }],
                  [{ 'zh-tw': '夏天', 'zh-cn': '夏天', 'en': 'summer' }, { 'zh-tw': '海邊', 'zh-cn': '海边', 'en': 'seaside' }],
                  [{ 'zh-tw': '秋天', 'zh-cn': '秋天', 'en': 'autumn' }, { 'zh-tw': '楓葉', 'zh-cn': '枫叶', 'en': 'maple leaves' }],
                  [{ 'zh-tw': '冬天', 'zh-cn': '冬天', 'en': 'winter' }, { 'zh-tw': '雪花', 'zh-cn': '雪花', 'en': 'snowflakes' }]
                ]
              },
              quiz: {
                ...dialogueItem.minigame.config,
                questions: [
                  {
                    question: { 'zh-tw': '在台灣，情人節通常送什麼花？', 'zh-cn': '在台湾，情人节通常送什么花？', 'en': 'In Taiwan, what flowers are usually given on Valentine\'s Day?' },
                    options: [
                      { 'zh-tw': '玫瑰', 'zh-cn': '玫瑰', 'en': 'Roses' },
                      { 'zh-tw': '百合', 'zh-cn': '百合', 'en': 'Lilies' },
                      { 'zh-tw': '向日葵', 'zh-cn': '向日葵', 'en': 'Sunflowers' },
                      { 'zh-tw': '蘭花', 'zh-cn': '兰花', 'en': 'Orchids' }
                    ],
                    correct: 0
                  },
                  {
                    question: { 'zh-tw': '「我喜歡你」用台語怎麼說？', 'zh-cn': '「我喜欢你」用台语怎么说？', 'en': 'How do you say "I like you" in Taiwanese?' },
                    options: [
                      { 'zh-tw': '我佮意你', 'zh-cn': '我佮意你', 'en': 'Góa kah-ì lí' },
                      { 'zh-tw': '我愛你', 'zh-cn': '我爱你', 'en': 'Góa ài lí' },
                      { 'zh-tw': '我想你', 'zh-cn': '我想你', 'en': 'Góa siūnn lí' },
                      { 'zh-tw': '我疼你', 'zh-cn': '我疼你', 'en': 'Góa thiànn lí' }
                    ],
                    correct: 0
                  }
                ]
              },
              date_simulator: {
                ...dialogueItem.minigame.config,
                targetCharacter: 'shen_jiayi',
                activities: [
                  {
                    name: { 'zh-tw': '一起看電影', 'zh-cn': '一起看电影', 'en': 'Watch Movie Together' },
                    description: { 'zh-tw': '在電影院享受浪漫時光', 'zh-cn': '在电影院享受浪漫时光', 'en': 'Enjoy romantic time at the cinema' },
                    successRate: 0.75,
                    points: 60,
                    emoji: '🎬',
                    successMessage: { 'zh-tw': '電影很棒，你們聊了很多！', 'zh-cn': '电影很棒，你们聊了很多！', 'en': 'Great movie, you talked a lot!' },
                    failMessage: { 'zh-tw': '電影有點無聊...', 'zh-cn': '电影有点无聊...', 'en': 'The movie was a bit boring...' }
                  },
                  {
                    name: { 'zh-tw': '逛夜市', 'zh-cn': '逛夜市', 'en': 'Visit Night Market' },
                    description: { 'zh-tw': '品嚐台灣小吃，體驗在地文化', 'zh-cn': '品尝台湾小吃，体验在地文化', 'en': 'Taste Taiwanese snacks, experience local culture' },
                    successRate: 0.85,
                    points: 70,
                    emoji: '🍜',
                    successMessage: { 'zh-tw': '夜市美食讓你們更親近了！', 'zh-cn': '夜市美食让你们更亲近了！', 'en': 'Night market food brought you closer!' },
                    failMessage: { 'zh-tw': '人太多了，有點擠...', 'zh-cn': '人太多了，有点挤...', 'en': 'Too crowded, a bit cramped...' }
                  },
                  {
                    name: { 'zh-tw': '圖書館讀書', 'zh-cn': '图书馆读书', 'en': 'Study at Library' },
                    description: { 'zh-tw': '安靜的環境，專心學習', 'zh-cn': '安静的环境，专心学习', 'en': 'Quiet environment, focused studying' },
                    successRate: 0.9,
                    points: 80,
                    emoji: '📚',
                    successMessage: { 'zh-tw': '學習氣氛很棒，她很欣賞你的認真！', 'zh-cn': '学习气氛很棒，她很欣赏你的认真！', 'en': 'Great study atmosphere, she appreciates your seriousness!' },
                    failMessage: { 'zh-tw': '太安靜了，有點尷尬...', 'zh-cn': '太安静了，有点尴尬...', 'en': 'Too quiet, a bit awkward...' }
                  }
                ]
              },
              voice_chat: {
                ...dialogueItem.minigame.config,
                targetCharacter: 'shen_jiayi',
                initialMessage: { 'zh-tw': '今天的夕陽真美呢...', 'zh-cn': '今天的夕阳真美呢...', 'en': 'The sunset is really beautiful today...' },
                aiResponses: [
                  { 'zh-tw': '是啊，跟你一起看更美', 'zh-cn': '是啊，跟你一起看更美', 'en': 'Yes, it\'s even more beautiful watching it with you' },
                  { 'zh-tw': '你今天看起來很開心', 'zh-cn': '你今天看起来很开心', 'en': 'You look very happy today' },
                  { 'zh-tw': '謝謝你陪我', 'zh-cn': '谢谢你陪我', 'en': 'Thank you for being with me' },
                  { 'zh-tw': '我們明天還能再見面嗎？', 'zh-cn': '我们明天还能再见面吗？', 'en': 'Can we meet again tomorrow?' }
                ]
              }
            };

            return {
              ...dialogueItem,
              minigame: {
                ...dialogueItem.minigame,
                config: {
                  ...dialogueItem.minigame.config,
                  ...minigameEnhancements[dialogueItem.minigame.type]
                }
              }
            };
          }
          return dialogueItem;
        })
      }))
    }))
  };

  return (
    <GameEngine
      storyConfig={enhancedRomanceConfig}
      onGameComplete={handleGameComplete}
      initialState={{
        playerStats: {
          charisma: 45,
          intelligence: 55,
          creativity: 50,
          empathy: 60
        }
      }}
    >
      <RomanceGameContent
        currentDialogue={currentDialogue}
        setCurrentDialogue={setCurrentDialogue}
        showMinigame={showMinigame}
        setShowMinigame={setShowMinigame}
        minigameConfig={minigameConfig}
        setMinigameConfig={setMinigameConfig}
        showEndingModal={showEndingModal}
        setShowEndingModal={setShowEndingModal}
        gameEnded={gameEnded}
        navigate={navigate}
      />
    </GameEngine>
  );
};

// Main game content component that receives gameContext from GameEngine
const RomanceGameContent = ({ 
  gameContext,
  currentDialogue,
  setCurrentDialogue,
  showMinigame,
  setShowMinigame,
  minigameConfig,
  setMinigameConfig,
  showEndingModal,
  setShowEndingModal,
  gameEnded,
  navigate
}) => {
  const { 
    gameState, 
    storyConfig, 
    t, 
    advanceStory, 
    resetGame, 
    goBackToLearn,
    handleMinigameComplete 
  } = gameContext;

  // Get current story elements
  const currentAct = storyConfig.story.acts[gameState.currentAct];
  const currentScene = currentAct?.scenes[gameState.currentScene];
  const currentDialogueItem = currentScene?.dialogue[gameState.currentDialogue];

  // Handle story progression
  useEffect(() => {
    if (currentDialogueItem && !showMinigame) {
      setCurrentDialogue(currentDialogueItem);
    }
  }, [currentDialogueItem, showMinigame, setCurrentDialogue]);

  // Handle dialogue choices
  const handleDialogueChoice = (choice) => {
    if (choice.action === 'minigame') {
      setMinigameConfig({
        type: choice.minigame.type,
        config: choice.minigame.config
      });
      setShowMinigame(true);
    } else if (choice.action === 'dialogue') {
      // Apply immediate relationship changes
      if (choice.relationshipChanges) {
        Object.keys(choice.relationshipChanges).forEach(characterId => {
          gameContext.updateRelationship(characterId, choice.relationshipChanges[characterId]);
        });
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
    
    // Advance story after minigame
    setTimeout(() => {
      advanceStory();
    }, 1000);
  };

  // Handle continuing dialogue
  const handleContinueDialogue = () => {
    advanceStory();
    setCurrentDialogue(null);
  };

  // Render different game phases
  const renderGamePhase = () => {
    switch (gameState.gamePhase) {
      case 'intro':
        return <IntroScreen gameContext={gameContext} />;
      
      case 'gameplay':
      case 'dialogue':
        return (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
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
                        {t(currentScene.setting)}
                      </h3>
                      {currentScene.atmosphere && (
                        <p style={{
                          margin: 0,
                          fontSize: '16px',
                          fontStyle: 'italic',
                          color: '#bf360c',
                          lineHeight: '1.6'
                        }}>
                          {t(currentScene.atmosphere)}
                        </p>
                      )}
                      {currentScene.objective && (
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
                            {t(currentScene.objective)}
                          </span>
                        </div>
                      )}
                    </div>
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

            {/* Sidebar with stats */}
            <div>
              <RelationshipPanel gameContext={gameContext} storyConfig={storyConfig} />
              <PlayerStatsPanel gameContext={gameContext} storyConfig={storyConfig} />
              <ProgressTracker gameContext={gameContext} storyConfig={storyConfig} />
            </div>
          </div>
        );
      
      case 'ending':
        return <EndingScreen gameContext={gameContext} />;
      
      default:
        return <IntroScreen gameContext={gameContext} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: storyConfig.theme?.backgroundColor || 'linear-gradient(135deg, #ffebee, #f3e5f5)',
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

      {/* Game statistics panel (always visible) */}
      {gameState.gamePhase !== 'intro' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '300px',
          zIndex: 1000
        }}>
          <GameStatsPanel gameContext={gameContext} />
        </div>
      )}
    </div>
  );
};

// Intro screen component
const IntroScreen = ({ gameContext }) => {
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
      <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎬</div>
      
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

      {/* Learning objectives */}
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

      {/* Game features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎮</div>
          <h4>{t({ 'zh-tw': '互動小遊戲', 'zh-cn': '互动小游戏', 'en': 'Interactive Minigames' })}</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {t({ 'zh-tw': '多種有趣的學習活動', 'zh-cn': '多种有趣的学习活动', 'en': 'Various fun learning activities' })}
          </p>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💕</div>
          <h4>{t({ 'zh-tw': '角色關係', 'zh-cn': '角色关系', 'en': 'Character Relationships' })}</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {t({ 'zh-tw': '你的選擇影響故事發展', 'zh-cn': '你的选择影响故事发展', 'en': 'Your choices affect story development' })}
          </p>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌟</div>
          <h4>{t({ 'zh-tw': '多重結局', 'zh-cn': '多重结局', 'en': 'Multiple Endings' })}</h4>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {t({ 'zh-tw': '根據表現獲得不同結局', 'zh-cn': '根据表现获得不同结局', 'en': 'Different endings based on performance' })}
          </p>
        </div>
      </div>

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
        {t({ 'zh-tw': '🎬 開始青春戀愛之旅', 'zh-cn': '🎬 开始青春恋爱之旅', 'en': '🎬 Start Youth Romance Journey' })}
      </button>
    </div>
  );
};

// Ending screen component
const EndingScreen = ({ gameContext }) => {
  const { gameState, storyConfig, t, resetGame, goBackToLearn } = gameContext;
  
  const averageAffection = Object.values(gameState.relationships).reduce((sum, rel) => {
    return sum + (rel.affection || 0);
  }, 0) / Object.keys(gameState.relationships).length;

  const getEndingType = () => {
    if (averageAffection >= 80) return 'perfect';
    if (averageAffection >= 60) return 'good';
    if (averageAffection >= 30) return 'neutral';
    return 'bad';
  };

  const endingType = getEndingType();
  const ending = storyConfig.endings[endingType];

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
          {t(ending?.title || { 'zh-tw': '遊戲結束', 'zh-cn': '游戏结束', 'en': 'Game Over' })}
        </h2>
        
        <p style={{
          marginBottom: '30px',
          fontSize: '18px',
          lineHeight: '1.6'
        }}>
          {t(ending?.description || { 'zh-tw': '感謝你的參與！', 'zh-cn': '感谢你的参与！', 'en': 'Thank you for playing!' })}
        </p>

        {/* Final stats */}
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
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e91e63' }}>
                {Math.round(averageAffection)}%
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {t({ 'zh-tw': '平均好感度', 'zh-cn': '平均好感度', 'en': 'Avg Affection' })}
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
            {t({ 'zh-tw': '重新開始', 'zh-cn': '重新开始', 'en': 'Play Again' })}
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

export default RomancePageRefactored;