// ui/ChatInterface.jsx
import React from 'react';

const ChatInterface = ({ 
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

export default ChatInterface;