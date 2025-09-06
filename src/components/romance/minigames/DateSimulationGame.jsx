// minigames/DateSimulationGame.jsx
import React, { useEffect } from 'react';
import { festivalActivities } from '../data/gameData';
import { calculateFestivalOutcome } from '../utils/gameUtils';

const DateSimulationGame = ({
  t,
  crushCharacter,
  currentScenario,
  setCurrentScenario,
  scenarios,
  setCrushAffection,
  setPlayerScore,
  setGamePhase,
  timeLeft,
  setTimeLeft,
  gameActive,
  setGameActive,
  styles
}) => {
  const currentScenarioData = scenarios[currentScenario];

  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      setTimeLeft(currentScenarioData.timeLimit);
      setGameActive(true);
    }
  }, []);

  const handleActivityChoice = (activity) => {
    setGameActive(false);
    const success = calculateFestivalOutcome(activity.success);
    
    if (success) {
      setCrushAffection(prev => Math.min(100, prev + currentScenarioData.affectionReward));
      setPlayerScore(prev => prev + 150);
      alert(t({
        'zh-tw': '太棒了！你們度過了愉快的時光！',
        'zh-cn': '太棒了！你们度过了愉快的时光！',
        'en': 'Great! You had a wonderful time together!'
      }));
    } else {
      setCrushAffection(prev => Math.max(0, prev + currentScenarioData.affectionPenalty));
      alert(t({
        'zh-tw': '有點尷尬...但還是很開心',
        'zh-cn': '有点尴尬...但还是很开心',
        'en': 'A bit awkward... but still happy'
      }));
    }
    
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
      } else {
        setGamePhase('ending');
      }
    }, 2000);
  };

  return (
    <div>
      {/* Festival atmosphere */}
      <div style={{
        background: 'linear-gradient(135deg, #fff3e0, #ffcc02)',
        border: '3px solid #ff9800',
        borderRadius: '15px',
        padding: '25px',
        marginBottom: '25px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          right: '-10px',
          bottom: '-10px',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,152,0,0.1) 10px, rgba(255,152,0,0.1) 20px)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ 
          fontSize: '3rem', 
          marginBottom: '15px',
          position: 'relative',
          zIndex: 1
        }}>
          🎪🎊🎭
        </div>
        
        <h3 style={{ 
          margin: '0 0 10px 0', 
          color: '#e65100',
          position: 'relative',
          zIndex: 1
        }}>
          {t({
            'zh-tw': '校園慶典正在進行中！',
            'zh-cn': '校园庆典正在进行中！',
            'en': 'School Festival is in Full Swing!'
          })}
        </h3>
        
        <p style={{ 
          margin: 0, 
          fontSize: '14px',
          color: '#bf360c',
          position: 'relative',
          zIndex: 1
        }}>
          {t({
            'zh-tw': '空氣中飄著香甜的味道，到處都是歡樂的笑聲...',
            'zh-cn': '空气中飘着香甜的味道，到处都是欢乐的笑声...',
            'en': 'Sweet aromas fill the air, joyful laughter everywhere...'
          })}
        </p>
      </div>

      {/* Activity selection */}
      <div style={styles.festivalContainer}>
        <h3 style={{ marginBottom: '20px' }}>
          {t({
            'zh-tw': '選擇你想和' + t(crushCharacter.name) + '一起做的活動：',
            'zh-cn': '选择你想和' + t(crushCharacter.name) + '一起做的活动：',
            'en': 'Choose what you want to do with ' + t(crushCharacter.name) + ':'
          })}
        </h3>
        
        <div style={styles.festivalGrid}>
          {festivalActivities.map((option, index) => (
            <button
              key={index}
              onClick={() => handleActivityChoice(option)}
              disabled={!gameActive}
              style={{
                ...styles.answerButton,
                padding: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #fff, #f8f9fa)',
                border: '3px solid #e0e0e0',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                opacity: !gameActive ? 0.5 : 1,
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (gameActive) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'linear-gradient(135deg, #e3f2fd, #bbdefb)';
                  e.target.style.borderColor = '#2196f3';
                }
              }}
              onMouseLeave={(e) => {
                if (gameActive) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'linear-gradient(135deg, #fff, #f8f9fa)';
                  e.target.style.borderColor = '#e0e0e0';
                }
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                {t(option.activity).split(' ')[0]}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {t(option.activity).substring(2)}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: option.success > 0.7 ? '#4caf50' : '#ff9800',
                marginTop: '5px',
                fontWeight: 'normal'
              }}>
                {t({
                  'zh-tw': '成功率: ' + Math.round(option.success * 100) + '%',
                  'zh-cn': '成功率: ' + Math.round(option.success * 100) + '%',
                  'en': 'Success: ' + Math.round(option.success * 100) + '%'
                })}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Activity descriptions */}
      <div style={{
        marginTop: '25px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '15px',
        border: '2px solid #e9ecef'
      }}>
        <h4 style={{ 
          textAlign: 'center', 
          marginBottom: '15px',
          color: '#495057'
        }}>
          {t({
            'zh-tw': '🎯 活動說明',
            'zh-cn': '🎯 活动说明',
            'en': '🎯 Activity Guide'
          })}
        </h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          fontSize: '13px'
        }}>
          <div>
            <strong>🎪 {t({
              'zh-tw': '遊戲攤位',
              'zh-cn': '游戏摊位',
              'en': 'Game Stalls'
            })}</strong>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              {t({
                'zh-tw': '一起挑戰射氣球、套圈圈等遊戲',
                'zh-cn': '一起挑战射气球、套圈圈等游戏',
                'en': 'Challenge balloon shooting, ring toss games together'
              })}
            </p>
          </div>
          
          <div>
            <strong>🍭 {t({
              'zh-tw': '小食攤位',
              'zh-cn': '小食摊位',
              'en': 'Food Stalls'
            })}</strong>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              {t({
                'zh-tw': '品嚐傳統小吃，分享美味時光',
                'zh-cn': '品尝传统小吃，分享美味时光',
                'en': 'Taste traditional snacks, share delicious moments'
              })}
            </p>
          </div>
          
          <div>
            <strong>🎵 {t({
              'zh-tw': '音樂表演',
              'zh-cn': '音乐表演',
              'en': 'Music Shows'
            })}</strong>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>
              {t({
                'zh-tw': '欣賞學生樂團的精彩演出',
                'zh-cn': '欣赏学生乐团的精彩演出',
                'en': 'Enjoy wonderful student band performances'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Choice hint */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666',
        fontStyle: 'italic'
      }}>
        {t({
          'zh-tw': '💡 提示：考慮對方的喜好和當下的氛圍來選擇活動',
          'zh-cn': '💡 提示：考虑对方的喜好和当下的氛围来选择活动',
          'en': '💡 Tip: Consider their preferences and the current mood when choosing'
        })}
      </div>
    </div>
  );
};

export default DateSimulationGame;