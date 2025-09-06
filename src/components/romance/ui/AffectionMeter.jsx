// ui/AffectionMeter.jsx
import React from 'react';
import { getAffectionDescription } from '../utils/gameUtils';

export const AffectionMeter = ({ crushCharacter, crushAffection, t, styles }) => (
  <div style={styles.statsContainer}>
    <div style={styles.affectionGrid}>
      <div>
        <h3 style={{ marginBottom: '10px' }}>
          {t(crushCharacter.name)} {t({
            'zh-tw': '的好感度',
            'zh-cn': '的好感度',
            'en': '\'s Affection'
          })}
        </h3>
        <div style={styles.affectionMeter}>
          <div style={styles.affectionFill}></div>
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          {crushAffection}% - {getAffectionDescription(crushAffection, styles.currentLanguage)}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
          {crushCharacter.emoji}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {t(crushCharacter.name)}
        </div>
      </div>
    </div>
  </div>
);

// ui/TimerDisplay.jsx
export const TimerDisplay = ({ timeLeft, styles }) => (
  <div style={styles.timerDisplay}>
    ⏰ {timeLeft}s
  </div>
);

// ui/GameStats.jsx
export const GameStats = ({ currentScenario, scenarios, playerScore, gameStats, t, styles }) => (
  <div style={styles.statsContainer}>
    <h3 style={{ marginBottom: '15px' }}>
      {t({
        'zh-tw': '遊戲進度',
        'zh-cn': '游戏进度',
        'en': 'Game Progress'
      })}
    </h3>
    <div style={styles.statsGrid}>
      <div>
        <strong>{t({
          'zh-tw': '場景進度:',
          'zh-cn': '场景进度:',
          'en': 'Scenario Progress:'
        })}</strong> {currentScenario + 1}/{scenarios.length}
      </div>
      <div>
        <strong>{t({
          'zh-tw': '分數:',
          'zh-cn': '分数:',
          'en': 'Score:'
        })}</strong> {playerScore}
      </div>
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
    </div>
  </div>
);

// ui/ChatInterface.jsx
export const ChatInterface = ({ 
  chatHistory, 
  userInput, 
  setUserInput, 
  handleChatSubmit, 
  startVoiceRecording, 
  isRecording,
  gameActive,
  t, 
  styles,
  chatRef 
}) => (
  <div style={styles.chatContainer}>
    <div ref={chatRef} style={styles.chatArea}>
      {chatHistory.length === 0 && (
        <div style={{ textAlign: 'center', color: '#999', fontStyle: 'italic' }}>
          {t({
            'zh-tw': '開始對話吧...',
            'zh-cn': '开始对话吧...',
            'en': 'Start the conversation...'
          })}
        </div>
      )}
      {chatHistory.map((message, index) => (
        <div
          key={index}
          style={{
            ...styles.message,
            ...(message.speaker === 'user' ? styles.userMessage : styles.aiMessage)
          }}
        >
          <div
            style={{
              ...styles.messageBubble,
              ...(message.speaker === 'user' ? styles.userBubble : styles.aiBubble)
            }}
          >
            {message.isVoice && '🎤 '}{message.text}
          </div>
        </div>
      ))}
    </div>
    <div style={styles.inputArea}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
          placeholder={t({
            'zh-tw': '輸入你想說的話...',
            'zh-cn': '输入你想说的话...',
            'en': 'Type what you want to say...'
          })}
          style={styles.textInput}
          disabled={!gameActive}
        />
        <button 
          onClick={startVoiceRecording} 
          style={styles.voiceButton}
          disabled={!gameActive}
          title={t({
            'zh-tw': '語音輸入',
            'zh-cn': '语音输入',
            'en': 'Voice Input'
          })}
        >
          {isRecording ? '⏹️' : '🎤'}
        </button>
        <button 
          onClick={() => handleChatSubmit()} 
          style={styles.sendButton} 
          disabled={!gameActive}
        >
          {t({
            'zh-tw': '發送',
            'zh-cn': '发送',
            'en': 'Send'
          })}
        </button>
      </div>
    </div>
  </div>
);

export default {
  AffectionMeter,
  TimerDisplay,
  GameStats,
  ChatInterface
};