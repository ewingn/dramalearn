// src/components/game/ui/SharedUIComponents.jsx
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Clock, 
  Star, 
  User, 
  Target, 
  TrendingUp, 
  Award,
  ArrowLeft,
  Settings,
  HelpCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

// Universal Game Header - works for all story types
export const GameHeader = ({ 
  gameContext, 
  storyConfig, 
  onBack, 
  onSettings,
  showTimer = true,
  showScore = true 
}) => {
  const { gameState, t, toggleLanguage } = gameContext;
  const currentAct = storyConfig.story.acts[gameState.currentAct];
  const currentScene = currentAct?.scenes[gameState.currentScene];

  return (
    <div style={{
      background: storyConfig.theme?.primaryColor || '#e91e63',
      color: 'white',
      padding: '15px 20px',
      borderRadius: '15px 15px 0 0',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
        opacity: 0.3
      }} />
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left side - Navigation and story info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>
              {t(storyConfig.title)}
            </h3>
            {currentAct && (
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                {t(currentAct.title)} {currentScene && `• ${t(currentScene.setting)}`}
              </p>
            )}
          </div>
        </div>

        {/* Right side - Game stats and controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {showTimer && gameState.timeLeft > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: gameState.timeLeft <= 10 ? 'rgba(244,67,54,0.3)' : 'rgba(255,255,255,0.2)',
              padding: '8px 12px',
              borderRadius: '20px',
              border: `2px solid ${gameState.timeLeft <= 10 ? '#f44336' : 'rgba(255,255,255,0.3)'}`
            }}>
              <Clock size={16} />
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {Math.floor(gameState.timeLeft / 60)}:{(gameState.timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          )}

          {showScore && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 12px',
              borderRadius: '20px'
            }}>
              <Star size={16} />
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {gameState.playerScore}
              </span>
            </div>
          )}

          <button
            onClick={toggleLanguage}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 12px',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {gameState.currentLanguage === 'zh-tw' ? '繁中' : 
             gameState.currentLanguage === 'zh-cn' ? '简中' : 'EN'}
          </button>

          {onSettings && (
            <button
              onClick={onSettings}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <Settings size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Universal Relationship Panel - works for all character types
export const RelationshipPanel = ({ gameContext, storyConfig }) => {
  const { gameState, t } = gameContext;
  const relationships = gameState.relationships || {};

  const getRelationshipColor = (value) => {
    if (value >= 80) return '#4caf50';
    if (value >= 60) return '#8bc34a';
    if (value >= 40) return '#ff9800';
    if (value >= 20) return '#ff5722';
    return '#f44336';
  };

  const getRelationshipLabel = (characterId, statName, value) => {
    // Different stat labels for different story types
    const labels = {
      romance: {
        affection: { 'zh-tw': '好感度', 'zh-cn': '好感度', 'en': 'Affection' },
        trustLevel: { 'zh-tw': '信任度', 'zh-cn': '信任度', 'en': 'Trust' }
      },
      mystery: {
        respect: { 'zh-tw': '尊重度', 'zh-cn': '尊重度', 'en': 'Respect' },
        cooperation: { 'zh-tw': '合作度', 'zh-cn': '合作度', 'en': 'Cooperation' },
        suspicion: { 'zh-tw': '懷疑度', 'zh-cn': '怀疑度', 'en': 'Suspicion' }
      }
    };

    const genreLabels = labels[storyConfig.genre] || labels.romance;
    return t(genreLabels[statName] || { 'zh-tw': statName, 'zh-cn': statName, 'en': statName });
  };

  const getRelationshipDescription = (characterId, stats) => {
    if (storyConfig.genre === 'romance') {
      const affection = stats.affection || 0;
      if (affection >= 80) return t({ 'zh-tw': '深深愛上你', 'zh-cn': '深深爱上你', 'en': 'Deeply in love' });
      if (affection >= 60) return t({ 'zh-tw': '很喜歡你', 'zh-cn': '很喜欢你', 'en': 'Really likes you' });
      if (affection >= 40) return t({ 'zh-tw': '普通朋友', 'zh-cn': '普通朋友', 'en': 'Just friends' });
      if (affection >= 20) return t({ 'zh-tw': '有點冷淡', 'zh-cn': '有点冷淡', 'en': 'A bit cold' });
      return t({ 'zh-tw': '很不開心', 'zh-cn': '很不开心', 'en': 'Very unhappy' });
    }
    
    if (storyConfig.genre === 'mystery') {
      const respect = stats.respect || 0;
      if (respect >= 80) return t({ 'zh-tw': '完全信任', 'zh-cn': '完全信任', 'en': 'Complete trust' });
      if (respect >= 60) return t({ 'zh-tw': '很尊重你', 'zh-cn': '很尊重你', 'en': 'Respects you' });
      if (respect >= 40) return t({ 'zh-tw': '普通同事', 'zh-cn': '普通同事', 'en': 'Regular colleague' });
      return t({ 'zh-tw': '不太信任', 'zh-cn': '不太信任', 'en': 'Doesn\'t trust much' });
    }

    return t({ 'zh-tw': '關係普通', 'zh-cn': '关系普通', 'en': 'Normal relationship' });
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h4 style={{
        margin: '0 0 20px 0',
        color: storyConfig.theme?.primaryColor || '#e91e63',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <User size={20} />
        {t({ 'zh-tw': '人際關係', 'zh-cn': '人际关系', 'en': 'Relationships' })}
      </h4>

      <div style={{
        display: 'grid',
        gap: '15px'
      }}>
        {storyConfig.characters.map(character => {
          const stats = relationships[character.id] || {};
          
          return (
            <div key={character.id} style={{
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{character.avatar}</span>
                  <div>
                    <h5 style={{ margin: '0 0 4px 0' }}>{t(character.name)}</h5>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '12px', 
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      {getRelationshipDescription(character.id, stats)}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gap: '8px'
              }}>
                {Object.entries(stats).map(([statName, value]) => (
                  <div key={statName}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                      fontSize: '13px'
                    }}>
                      <span>{getRelationshipLabel(character.id, statName, value)}</span>
                      <span style={{ 
                        fontWeight: 'bold',
                        color: getRelationshipColor(value)
                      }}>
                        {value}%
                      </span>
                    </div>
                    <div style={{
                      background: '#e0e0e0',
                      borderRadius: '10px',
                      height: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: getRelationshipColor(value),
                        width: `${value}%`,
                        height: '100%',
                        borderRadius: '10px',
                        transition: 'all 0.5s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Universal Player Stats Panel
export const PlayerStatsPanel = ({ gameContext, storyConfig }) => {
  const { gameState, t } = gameContext;
  const playerStats = gameState.playerStats || {};

  const getStatIcon = (statName) => {
    const icons = {
      charisma: '💫',
      intelligence: '🧠',
      creativity: '🎨',
      empathy: '❤️',
      detective_skills: '🔍',
      observation: '👁️',
      logic: '⚡',
      courage: '🦁'
    };
    return icons[statName] || '⭐';
  };

  const getStatColor = (value) => {
    if (value >= 80) return '#4caf50';
    if (value >= 60) return '#8bc34a';
    if (value >= 40) return '#ff9800';
    return '#f44336';
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h4 style={{
        margin: '0 0 20px 0',
        color: storyConfig.theme?.primaryColor || '#e91e63',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <TrendingUp size={20} />
        {t({ 'zh-tw': '個人能力', 'zh-cn': '个人能力', 'en': 'Personal Stats' })}
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px'
      }}>
        {Object.entries(playerStats).map(([statName, value]) => (
          <div key={statName} style={{
            textAlign: 'center',
            padding: '15px 10px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              {getStatIcon(statName)}
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: getStatColor(value),
              marginBottom: '4px'
            }}>
              {value}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666',
              textTransform: 'capitalize'
            }}>
              {t({ 
                'zh-tw': statName, 
                'zh-cn': statName, 
                'en': statName.replace('_', ' ') 
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Universal Progress Tracker
export const ProgressTracker = ({ gameContext, storyConfig }) => {
  const { gameState, t } = gameContext;
  const totalActs = storyConfig.story.acts.length;
  const currentActIndex = gameState.currentAct;
  const currentSceneIndex = gameState.currentScene;
  const currentAct = storyConfig.story.acts[currentActIndex];
  const totalScenesInCurrentAct = currentAct?.scenes.length || 1;

  const overallProgress = ((currentActIndex + (currentSceneIndex + 1) / totalScenesInCurrentAct) / totalActs) * 100;

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h4 style={{
        margin: '0 0 20px 0',
        color: storyConfig.theme?.primaryColor || '#e91e63',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Target size={20} />
        {t({ 'zh-tw': '劇情進度', 'zh-cn': '剧情进度', 'en': 'Story Progress' })}
      </h4>

      {/* Overall progress */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '14px'
        }}>
          <span>{t({ 'zh-tw': '總進度', 'zh-cn': '总进度', 'en': 'Overall Progress' })}</span>
          <span style={{ fontWeight: 'bold' }}>{Math.round(overallProgress)}%</span>
        </div>
        <div style={{
          background: '#e0e0e0',
          borderRadius: '10px',
          height: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${storyConfig.theme?.primaryColor || '#e91e63'}, ${storyConfig.theme?.secondaryColor || '#f8bbd9'})`,
            width: `${overallProgress}%`,
            height: '100%',
            borderRadius: '10px',
            transition: 'all 0.5s ease'
          }} />
        </div>
      </div>

      {/* Act breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${totalActs}, 1fr)`,
        gap: '10px'
      }}>
        {storyConfig.story.acts.map((act, index) => (
          <div
            key={index}
            style={{
              padding: '12px 8px',
              background: index === currentActIndex ? 
                storyConfig.theme?.primaryColor || '#e91e63' : 
                index < currentActIndex ? '#4caf50' : '#f5f5f5',
              color: index <= currentActIndex ? 'white' : '#666',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              border: `2px solid ${index === currentActIndex ? 
                storyConfig.theme?.primaryColor || '#e91e63' : 'transparent'}`
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              {index < currentActIndex ? '✓' : 
               index === currentActIndex ? '▶' : '○'}
            </div>
            <div>{t(act.title)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Universal Game Statistics
export const GameStatsPanel = ({ gameContext }) => {
  const { gameState, t } = gameContext;
  const stats = gameState.gameStats || {};
  const playTime = Date.now() - (stats.startTime || Date.now());

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <h4 style={{
        margin: '0 0 20px 0',
        color: '#e91e63',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Award size={20} />
        {t({ 'zh-tw': '遊戲統計', 'zh-cn': '游戏统计', 'en': 'Game Statistics' })}
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2196f3',
            marginBottom: '5px'
          }}>
            {gameState.playerScore}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {t({ 'zh-tw': '總分', 'zh-cn': '总分', 'en': 'Total Score' })}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4caf50',
            marginBottom: '5px'
          }}>
            {stats.correctAnswers || 0}/{stats.totalQuestions || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {t({ 'zh-tw': '答對率', 'zh-cn': '答对率', 'en': 'Accuracy' })}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ff9800',
            marginBottom: '5px'
          }}>
            {stats.minigamesCompleted || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {t({ 'zh-tw': '完成小遊戲', 'zh-cn': '完成小游戏', 'en': 'Minigames Done' })}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#9c27b0',
            marginBottom: '5px'
          }}>
            {formatTime(playTime)}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {t({ 'zh-tw': '遊戲時間', 'zh-cn': '游戏时间', 'en': 'Play Time' })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Universal Dialog Interface
export const DialogInterface = ({ 
  dialogue, 
  gameContext, 
  onChoice, 
  onContinue,
  showSpeaker = true 
}) => {
  const { t } = gameContext;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [dialogue]);

  if (!dialogue) return null;

  const handleChoice = (choice) => {
    setIsVisible(false);
    setTimeout(() => onChoice(choice), 300);
  };

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => onContinue(), 300);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      marginBottom: '20px',
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease'
    }}>
      {/* Speaker name */}
      {showSpeaker && dialogue.speaker && dialogue.speaker !== 'narration' && (
        <div style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#e91e63',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {dialogue.speaker}
        </div>
      )}

      {/* Dialogue content */}
      <div style={{
        fontSize: '16px',
        lineHeight: '1.6',
        marginBottom: dialogue.choices ? '25px' : '15px',
        color: '#333'
      }}>
        {t(dialogue.content)}
      </div>

      {/* Choices */}
      {dialogue.choices && (
        <div style={{
          display: 'grid',
          gap: '12px'
        }}>
          {dialogue.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              style={{
                padding: '15px 20px',
                borderRadius: '12px',
                border: '2px solid #e0e0e0',
                background: 'white',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#e91e63';
                e.target.style.background = '#fce4ec';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.background = 'white';
              }}
            >
              <span style={{
                display: 'inline-block',
                marginRight: '12px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#e0e0e0',
                color: '#666',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: '24px'
              }}>
                {String.fromCharCode(65 + index)}
              </span>
              {t(choice.text)}
            </button>
          ))}
        </div>
      )}

      {/* Continue button */}
      {!dialogue.choices && onContinue && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleContinue}
            style={{
              background: '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '10px 25px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {t({ 'zh-tw': '繼續', 'zh-cn': '继续', 'en': 'Continue' })} →
          </button>
        </div>
      )}
    </div>
  );
};

// Export all components
export default {
  GameHeader,
  RelationshipPanel,
  PlayerStatsPanel,
  ProgressTracker,
  GameStatsPanel,
  DialogInterface
};