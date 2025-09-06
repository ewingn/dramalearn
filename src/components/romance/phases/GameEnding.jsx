// GameEnding.jsx - Game ending component

import React from 'react';
import { gameStyles } from '../data/gameStyles';
import { calculateEndingType, getEndingMessage, getEndingEmoji } from '../utils/gameUtils';

const GameEnding = ({
  currentLanguage,
  t,
  crushAffection,
  playerScore,
  gameStats,
  setSelectedCharacter,
  resetGame,
  setGamePhase
}) => {
  const styles = gameStyles();
  const endingType = calculateEndingType(crushAffection);
  const endingMessage = getEndingMessage(endingType, currentLanguage);
  const endingEmoji = getEndingEmoji(endingType);

  const handlePlayAgain = () => {
    resetGame();
    setGamePhase('gameplay');
  };

  const handleChangeCharacter = () => {
    setSelectedCharacter(null);
    resetGame();
    setGamePhase('character-select');
  };

  const handleBackToMenu = () => {
    setSelectedCharacter(null);
    resetGame();
    setGamePhase('intro');
  };

  const getGradeFromScore = (score) => {
    if (score >= 800) return 'S';
    if (score >= 600) return 'A';
    if (score >= 400) return 'B';
    if (score >= 200) return 'C';
    return 'D';
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.minigameContainer}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          {t({
            'zh-tw': '遊戲結束',
            'zh-cn': '游戏结束',
            'en': 'Game Over'
          })}
        </h2>
        
        {/* Ending Result */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            fontSize: '6rem', 
            marginBottom: '20px',
            animation: 'bounce 1s ease-in-out'
          }}>
            {endingEmoji}
          </div>
          
          <p style={{ 
            fontSize: '18px', 
            lineHeight: '1.6', 
            marginBottom: '20px',
            color: '#333',
            maxWidth: '500px',
            margin: '0 auto 20px auto'
          }}>
            {endingMessage}
          </p>

          <div style={{
            background: endingType === 'perfect' ? '#e8f5e8' : 
                       endingType === 'good' ? '#e3f2fd' :
                       endingType === 'neutral' ? '#fff3e0' : '#ffebee',
            border: `2px solid ${endingType === 'perfect' ? '#4caf50' : 
                                  endingType === 'good' ? '#2196f3' :
                                  endingType === 'neutral' ? '#ff9800' : '#f44336'}`,
            borderRadius: '10px',
            padding: '15px',
            display: 'inline-block',
            marginBottom: '20px'
          }}>
            <strong style={{
              fontSize: '20px',
              color: endingType === 'perfect' ? '#2e7d32' : 
                     endingType === 'good' ? '#1976d2' :
                     endingType === 'neutral' ? '#f57c00' : '#d32f2f'
            }}>
              {t({
                'zh-tw': '結局評級: ',
                'zh-cn': '结局评级: ',
                'en': 'Ending Grade: '
              })} {getGradeFromScore(playerScore)}
            </strong>
          </div>
        </div>

        {/* Final Statistics */}
        <div style={{
          background: '#f5f5f5',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '25px',
            color: '#495057'
          }}>
            {t({
              'zh-tw': '最終統計',
              'zh-cn': '最终统计',
              'en': 'Final Statistics'
            })}
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #e91e63, #ad1457)',
                color: 'white',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                {crushAffection}%
              </div>
              <strong>{t({
                'zh-tw': '最終好感度',
                'zh-cn': '最终好感度',
                'en': 'Final Affection'
              })}</strong>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #2196F3, #1565C0)',
                color: 'white',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                {playerScore}
              </div>
              <strong>{t({
                'zh-tw': '總分數',
                'zh-cn': '总分数',
                'en': 'Total Score'
              })}</strong>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                color: 'white',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                {gameStats.totalQuestions > 0 ? 
                  Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100) : 0}%
              </div>
              <strong>{t({
                'zh-tw': '答題正確率',
                'zh-cn': '答题正确率',
                'en': 'Quiz Accuracy'
              })}</strong>
            </div>
          </div>

          {/* Detailed Stats */}
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            fontSize: '14px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div>
                <strong>{t({
                  'zh-tw': '答對題數:',
                  'zh-cn': '答对题数:',
                  'en': 'Correct Answers:'
                })}</strong> {gameStats.correctAnswers}/{gameStats.totalQuestions}
              </div>
              <div>
                <strong>{t({
                  'zh-tw': '傳紙條次數:',
                  'zh-cn': '传纸条次数:',
                  'en': 'Notes Exchanged:'
                })}</strong> {gameStats.notesExchanged}
              </div>
              <div>
                <strong>{t({
                  'zh-tw': '被老師發現:',
                  'zh-cn': '被老师发现:',
                  'en': 'Teacher Troubles:'
                })}</strong> {gameStats.teacherTroubles}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div style={{
          background: '#fff8e1',
          border: '2px solid #ffc107',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h4 style={{ 
            textAlign: 'center', 
            marginBottom: '15px',
            color: '#f57c00'
          }}>
            {t({
              'zh-tw': '🏆 成就解鎖',
              'zh-cn': '🏆 成就解锁',
              'en': '🏆 Achievements Unlocked'
            })}
          </h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '10px',
            fontSize: '14px'
          }}>
            {crushAffection >= 80 && (
              <div style={{ padding: '8px', background: '#4caf50', color: 'white', borderRadius: '5px', textAlign: 'center' }}>
                ❤️ {t({
                  'zh-tw': '完美戀人',
                  'zh-cn': '完美恋人',
                  'en': 'Perfect Romance'
                })}
              </div>
            )}
            
            {gameStats.correctAnswers >= 5 && (
              <div style={{ padding: '8px', background: '#2196f3', color: 'white', borderRadius: '5px', textAlign: 'center' }}>
                🧠 {t({
                  'zh-tw': '學霸稱號',
                  'zh-cn': '学霸称号',
                  'en': 'Academic Excellence'
                })}
              </div>
            )}
            
            {gameStats.notesExchanged >= 3 && (
              <div style={{ padding: '8px', background: '#ff9800', color: 'white', borderRadius: '5px', textAlign: 'center' }}>
                📝 {t({
                  'zh-tw': '紙條達人',
                  'zh-cn': '纸条达人',
                  'en': 'Note Master'
                })}
              </div>
            )}
            
            {playerScore >= 500 && (
              <div style={{ padding: '8px', background: '#9c27b0', color: 'white', borderRadius: '5px', textAlign: 'center' }}>
                🌟 {t({
                  'zh-tw': '高分玩家',
                  'zh-cn': '高分玩家',
                  'en': 'High Scorer'
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handlePlayAgain}
            style={{
              ...styles.submitButton,
              fontSize: '16px',
              padding: '12px 30px',
              marginRight: '15px',
              background: 'linear-gradient(135deg, #e91e63, #ad1457)'
            }}
          >
            {t({
              'zh-tw': '重新開始',
              'zh-cn': '重新开始',
              'en': 'Play Again'
            })}
          </button>
          
          <button
            onClick={handleChangeCharacter}
            style={{
              ...styles.warningButton,
              fontSize: '16px',
              padding: '12px 30px',
              marginRight: '15px'
            }}
          >
            {t({
              'zh-tw': '換角色',
              'zh-cn': '换角色',
              'en': 'Change Character'
            })}
          </button>
          
          <button
            onClick={handleBackToMenu}
            style={{
              ...styles.secondaryButton,
              fontSize: '16px',
              padding: '12px 30px',
              marginRight: '0px'
            }}
          >
            {t({
              'zh-tw': '回到主選單',
              'zh-cn': '回到主选单',
              'en': 'Back to Menu'
            })}
          </button>
        </div>

        {/* Inspirational Message */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          padding: '20px',
          background: 'linear-gradient(135deg, #ffebee, #f3e5f5)',
          borderRadius: '15px',
          border: '2px solid #e1bee7'
        }}>
          <h4 style={{ marginBottom: '15px', color: '#6a1b9a' }}>
            {t({
              'zh-tw': '💭 青春寄語',
              'zh-cn': '💭 青春寄语',
              'en': '💭 Youth Message'
            })}
          </h4>
          <p style={{ 
            fontStyle: 'italic', 
            fontSize: '14px', 
            lineHeight: '1.6',
            color: '#4a148c',
            margin: 0,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {endingType === 'perfect' ? t({
              'zh-tw': '"有些愛情，是歲月的沉澱，有些回憶，是時光的珍藏。感謝那些年，我們一起追過的夢想。"',
              'zh-cn': '"有些爱情，是岁月的沉淀，有些回忆，是时光的珍藏。感谢那些年，我们一起追过的梦想。"',
              'en': '"Some love is the precipitation of years, some memories are treasures of time. Thank you for those years when we chased dreams together."'
            }) : endingType === 'good' ? t({
              'zh-tw': '"青春就是這樣，有遺憾才完整，有眼淚才珍貴。每一次的努力都不會白費。"',
              'zh-cn': '"青春就是这样，有遗憾才完整，有眼泪才珍贵。每一次的努力都不会白费。"',
              'en': '"Youth is like this - regrets make it complete, tears make it precious. Every effort counts."'
            }) : endingType === 'neutral' ? t({
              'zh-tw': '"不是所有的故事都有完美的結局，但每一段經歷都是成長的養分。"',
              'zh-cn': '"不是所有的故事都有完美的结局，但每一段经历都是成长的养分。"',
              'en': '"Not all stories have perfect endings, but every experience is nourishment for growth."'
            }) : t({
              'zh-tw': '"失敗不是終點，而是另一個開始。勇敢地去愛，勇敢地去追求吧！"',
              'zh-cn': '"失败不是终点，而是另一个开始。勇敢地去爱，勇敢地去追求吧！"',
              'en': '"Failure is not the end, but another beginning. Be brave to love and pursue!"'
            })}
          </p>
        </div>

        {/* Movie Quote */}
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          color: '#666'
        }}>
          {t({
            'zh-tw': '「那些年，我們一起追的女孩，在我心中，永遠都是最美好的。」',
            'zh-cn': '「那些年，我们一起追的女孩，在我心中，永远都是最美好的。」',
            'en': '"Those years, the girl we chased together, will always be the most beautiful in my heart."'
          })}
          <br />
          <em style={{ fontSize: '11px', opacity: '0.7' }}>
            - {t({
              'zh-tw': '電影《那些年，我們一起追的女孩》',
              'zh-cn': '电影《那些年，我们一起追的女孩》',
              'en': 'Movie "You Are the Apple of My Eye"'
            })}
          </em>
        </div>
      </div>
    </div>
  );
};

export default GameEnding;