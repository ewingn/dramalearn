// CharacterSelect.jsx - Character selection component

import React from 'react';
import { gameStyles } from '../data/gameStyles';

const CharacterSelect = ({ 
  currentLanguage, 
  t, 
  characters, 
  selectedCharacter, 
  setSelectedCharacter, 
  setGamePhase 
}) => {
  const styles = gameStyles();

  return (
    <div style={styles.mainContent}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        {t({
          'zh-tw': '選擇你的角色',
          'zh-cn': '选择你的角色',
          'en': 'Choose Your Character'
        })}
      </h2>

      <p style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        fontSize: '16px',
        color: '#666'
      }}>
        {t({
          'zh-tw': '你將扮演誰來體驗這段青春校園戀愛故事？',
          'zh-cn': '你将扮演谁来体验这段青春校园恋爱故事？',
          'en': 'Who will you play to experience this youthful school romance story?'
        })}
      </p>
      
      <div style={styles.characterGrid}>
        {Object.entries(characters).map(([key, character]) => (
          <div
            key={key}
            onClick={() => setSelectedCharacter(key)}
            style={{
              ...styles.characterCard,
              ...(selectedCharacter === key ? styles.selectedCharacterCard : {}),
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedCharacter !== key) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCharacter !== key) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <div style={{ 
              fontSize: '4rem', 
              textAlign: 'center', 
              marginBottom: '15px',
              transition: 'transform 0.3s ease'
            }}>
              {character.emoji}
            </div>
            
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '10px', 
              fontSize: '1.5rem',
              color: selectedCharacter === key ? '#e91e63' : '#333'
            }}>
              {t(character.name)}
            </h3>
            
            <p style={{ 
              textAlign: 'center', 
              marginBottom: '15px', 
              color: '#666',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {t(character.description)}
            </p>
            
            <div style={{
              background: selectedCharacter === key ? '#fce4ec' : '#f8f9fa',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '15px'
            }}>
              <strong style={{ 
                fontSize: '12px', 
                color: selectedCharacter === key ? '#c2185b' : '#495057'
              }}>
                {t({
                  'zh-tw': '性格特點：',
                  'zh-cn': '性格特点：',
                  'en': 'Personality:'
                })}
              </strong>
              <p style={{ 
                textAlign: 'center', 
                fontSize: '12px', 
                color: selectedCharacter === key ? '#880e4f' : '#6c757d',
                margin: '5px 0 0 0',
                lineHeight: '1.4'
              }}>
                {t(character.personality)}
              </p>
            </div>

            {selectedCharacter === key && (
              <div style={{
                background: '#e91e63',
                color: 'white',
                borderRadius: '20px',
                padding: '8px 16px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '600',
                animation: 'pulse 1s infinite'
              }}>
                {t({
                  'zh-tw': '已選擇 ✓',
                  'zh-cn': '已选择 ✓',
                  'en': 'Selected ✓'
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Character comparison section */}
      <div style={{
        ...styles.minigameContainer,
        marginTop: '30px',
        background: '#f8f9fa'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#495057' }}>
          {t({
            'zh-tw': '角色對比',
            'zh-cn': '角色对比',
            'en': 'Character Comparison'
          })}
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          fontSize: '14px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#e91e63', marginBottom: '10px' }}>
              {t(characters.male.name)} 的故事線
            </h4>
            <ul style={{ textAlign: 'left', paddingLeft: '20px', color: '#666' }}>
              <li>{t({
                'zh-tw': '以男主角視角追求女主角',
                'zh-cn': '以男主角视角追求女主角',
                'en': 'Pursue the female lead from the male protagonist\'s perspective'
              })}</li>
              <li>{t({
                'zh-tw': '體驗調皮搗蛋的校園生活',
                'zh-cn': '体验调皮捣蛋的校园生活',
                'en': 'Experience mischievous school life'
              })}</li>
              <li>{t({
                'zh-tw': '透過惡作劇和真誠打動對方',
                'zh-cn': '通过恶作剧和真诚打动对方',
                'en': 'Win hearts through pranks and sincerity'
              })}</li>
            </ul>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#e91e63', marginBottom: '10px' }}>
              {t(characters.female.name)} 的故事線
            </h4>
            <ul style={{ textAlign: 'left', paddingLeft: '20px', color: '#666' }}>
              <li>{t({
                'zh-tw': '以女主角視角面對追求者',
                'zh-cn': '以女主角视角面对追求者',
                'en': 'Face suitors from the female protagonist\'s perspective'
              })}</li>
              <li>{t({
                'zh-tw': '平衡學業與感情的選擇',
                'zh-cn': '平衡学业与感情的选择',
                'en': 'Balance choices between studies and romance'
              })}</li>
              <li>{t({
                'zh-tw': '展現聰慧與溫柔的魅力',
                'zh-cn': '展现聪慧与温柔的魅力',
                'en': 'Show intelligent and gentle charm'
              })}</li>
            </ul>
          </div>
        </div>
      </div>

      {selectedCharacter && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={() => setGamePhase('gameplay')}
            style={{
              ...styles.submitButton,
              fontSize: '18px',
              padding: '15px 40px',
              background: 'linear-gradient(135deg, #e91e63, #ad1457)',
              boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
              transform: 'scale(1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px rgba(233, 30, 99, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.3)';
            }}
          >
            {t({
              'zh-tw': '開始校園戀愛 💕',
              'zh-cn': '开始校园恋爱 💕',
              'en': 'Start School Romance 💕'
            })}
          </button>
          
          <p style={{ 
            marginTop: '15px', 
            fontSize: '14px', 
            color: '#666',
            fontStyle: 'italic'
          }}>
            {t({
              'zh-tw': `準備好以 ${t(characters[selectedCharacter].name)} 的身份展開這段青春回憶了嗎？`,
              'zh-cn': `准备好以 ${t(characters[selectedCharacter].name)} 的身份展开这段青春回忆了吗？`,
              'en': `Ready to embark on this youthful memory as ${t(characters[selectedCharacter].name)}?`
            })}
          </p>
        </div>
      )}

      {!selectedCharacter && (
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          padding: '20px',
          background: '#fff3e0',
          borderRadius: '10px',
          border: '2px solid #ff9800'
        }}>
          <p style={{ margin: 0, color: '#e65100', fontWeight: '600' }}>
            {t({
              'zh-tw': '請選擇一個角色開始遊戲',
              'zh-cn': '请选择一个角色开始游戏',
              'en': 'Please select a character to start the game'
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default CharacterSelect;