// GameIntro.jsx - Welcome screen component

import React from 'react';
import { gameStyles } from '../data/gameStyles';

const GameIntro = ({ currentLanguage, t, setGamePhase }) => {
  const styles = gameStyles();

  return (
    <div style={styles.mainContent}>
      <div style={styles.minigameContainer}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {t({
            'zh-tw': '歡迎來到《那些年》的世界',
            'zh-cn': '欢迎来到《那些年》的世界',
            'en': 'Welcome to the World of "You Are the Apple of My Eye"'
          })}
        </h2>
        
        <p style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          fontSize: '16px', 
          lineHeight: '1.6' 
        }}>
          {t({
            'zh-tw': '重溫那些青澀的校園時光，體驗純真的初戀情感。在這裡，你可以扮演電影中的角色，透過各種互動遊戲來贏得心儀對象的芳心。每個場景都有時間限制，考驗你的反應和真心！',
            'zh-cn': '重温那些青涩的校园时光，体验纯真的初恋情感。在这里，你可以扮演电影中的角色，通过各种互动游戏来赢得心仪对象的芳心。每个场景都有时间限制，考验你的反应和真心！',
            'en': 'Relive those innocent school days and experience pure first love. Here, you can play as characters from the movie and win your crush\'s heart through various interactive games. Each scenario has a time limit to test your reactions and sincerity!'
          })}
        </p>

        <div style={{
          background: '#f8f9fa',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '30px',
          border: '2px solid #e9ecef'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '15px',
            color: '#495057'
          }}>
            {t({
              'zh-tw': '🎮 遊戲特色',
              'zh-cn': '🎮 游戏特色',
              'en': '🎮 Game Features'
            })}
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            textAlign: 'left'
          }}>
            <div>
              <strong>⏰ {t({
                'zh-tw': '即時互動',
                'zh-cn': '即时互动',
                'en': 'Real-time Interaction'
              })}</strong>
              <br />
              {t({
                'zh-tw': '每個場景都有時間限制，考驗你的反應速度',
                'zh-cn': '每个场景都有时间限制，考验你的反应速度',
                'en': 'Each scene has time limits to test your reaction speed'
              })}
            </div>
            
            <div>
              <strong>🎤 {t({
                'zh-tw': '語音對話',
                'zh-cn': '语音对话',
                'en': 'Voice Chat'
              })}</strong>
              <br />
              {t({
                'zh-tw': '支援語音輸入，讓對話更自然真實',
                'zh-cn': '支持语音输入，让对话更自然真实',
                'en': 'Voice input support for more natural conversations'
              })}
            </div>
            
            <div>
              <strong>📚 {t({
                'zh-tw': '多元小遊戲',
                'zh-cn': '多元小游戏',
                'en': 'Diverse Mini-games'
              })}</strong>
              <br />
              {t({
                'zh-tw': '傳紙條、答題、聊天等豐富互動',
                'zh-cn': '传纸条、答题、聊天等丰富互动',
                'en': 'Note passing, quizzes, chats and rich interactions'
              })}
            </div>
            
            <div>
              <strong>❤️ {t({
                'zh-tw': '好感度系統',
                'zh-cn': '好感度系统',
                'en': 'Affection System'
              })}</strong>
              <br />
              {t({
                'zh-tw': '你的選擇將影響劇情發展和結局',
                'zh-cn': '你的选择将影响剧情发展和结局',
                'en': 'Your choices affect story development and endings'
              })}
            </div>
          </div>
        </div>

        <div style={{
          background: '#e3f2fd',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '30px',
          border: '2px solid #2196F3'
        }}>
          <h4 style={{ 
            textAlign: 'center', 
            marginBottom: '10px',
            color: '#1976D2'
          }}>
            {t({
              'zh-tw': '💡 遊戲提示',
              'zh-cn': '💡 游戏提示',
              'en': '💡 Game Tips'
            })}
          </h4>
          <ul style={{ 
            textAlign: 'left', 
            paddingLeft: '20px',
            margin: 0,
            fontSize: '14px'
          }}>
            <li>{t({
              'zh-tw': '注意時間限制，快速做出決定',
              'zh-cn': '注意时间限制，快速做出决定',
              'en': 'Watch time limits and make quick decisions'
            })}</li>
            <li>{t({
              'zh-tw': '真誠的回應比華麗的辭藻更重要',
              'zh-cn': '真诚的回应比华丽的辞藻更重要',
              'en': 'Sincere responses matter more than fancy words'
            })}</li>
            <li>{t({
              'zh-tw': '每個選擇都會影響好感度',
              'zh-cn': '每个选择都会影响好感度',
              'en': 'Every choice affects the affection level'
            })}</li>
            <li>{t({
              'zh-tw': '支援三種語言：繁體中文、簡體中文、英文',
              'zh-cn': '支持三种语言：繁体中文、简体中文、英文',
              'en': 'Supports three languages: Traditional Chinese, Simplified Chinese, English'
            })}</li>
          </ul>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => setGamePhase('character-select')}
            style={{
              ...styles.submitButton,
              fontSize: '18px',
              padding: '15px 40px',
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
              'zh-tw': '開始遊戲 ▶️',
              'zh-cn': '开始游戏 ▶️',
              'en': 'Start Game ▶️'
            })}
          </button>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          color: '#666'
        }}>
          {t({
            'zh-tw': '靈感來自電影《那些年，我們一起追的女孩》',
            'zh-cn': '灵感来自电影《那些年，我们一起追的女孩》',
            'en': 'Inspired by the movie "You Are the Apple of My Eye"'
          })}
        </div>
      </div>
    </div>
  );
};

export default GameIntro;