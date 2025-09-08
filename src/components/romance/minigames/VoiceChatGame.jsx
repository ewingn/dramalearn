// src/components/romance/minigames/VoiceChatGame.jsx
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { minigameStyles } from '../data/gameStyles.js';

const VoiceChatGame = ({
  gameActive,
  t,
  onComplete,
  currentLanguage,
  selectedCharacter,
  characters
}) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  // Function to generate a simple AI response
  const generateAIResponse = (userMessage) => {
    // Check for positive keywords or phrases
    if (userMessage.includes(t({ 'zh-tw': '喜歡', 'zh-cn': '喜欢', 'en': 'like' })) || 
        userMessage.includes(t({ 'zh-tw': '漂亮', 'zh-cn': '漂亮', 'en': 'pretty' })) || 
        userMessage.includes(t({ 'zh-tw': '可愛', 'zh-cn': '可爱', 'en': 'cute' }))) {
      return t(aiResponseTemplates.conversation[0]); // Return a shy/positive response
    }
    
    // Check for questions
    if (userMessage.includes('?') || userMessage.includes('嗎') || userMessage.includes('吗')) {
      return t(aiResponseTemplates.study_session[0]); // A conversational response
    }

    // Default neutral response
    return t(aiResponseTemplates.conversation[1]);
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t({ 'zh-tw': '您的瀏覽器不支援語音輸入', 'zh-cn': '您的浏览器不支持语音输入', 'en': 'Your browser doesn\'t support voice input' }));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = currentLanguage === 'zh-tw' ? 'zh-TW' : currentLanguage === 'zh-cn' ? 'zh-CN' : 'en-US';
    recognition.interimResults = false;

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsRecording(false);
      alert(t({ 'zh-tw': '語音輸入失敗', 'zh-cn': '语音输入失败', 'en': 'Voice input failed' }));
    };
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const playerMessage = userInput;
    const newChatHistory = [...chatHistory, {
      id: Date.now(),
      sender: 'player',
      content: playerMessage,
      isVoice: isRecording
    }];
    setChatHistory(newChatHistory);
    setUserInput('');
    setIsRecording(false);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(playerMessage);
      const updatedChatHistory = [...newChatHistory, {
        id: Date.now() + 1,
        sender: 'crush',
        content: aiResponse
      }];
      setChatHistory(updatedChatHistory);
    }, 1000);

    // End the minigame and calculate success
    const hasQuestion = playerMessage.includes('?') || playerMessage.includes('嗎') || playerMessage.includes('吗');
    const hasCompliment = playerMessage.includes(t({ 'zh-tw': '喜歡', 'zh-cn': '喜欢', 'en': 'like' })) || playerMessage.includes(t({ 'zh-tw': '漂亮', 'zh-cn': '漂亮', 'en': 'pretty' }));
    const goodLength = playerMessage.length > 5;
    const success = (hasQuestion || hasCompliment) && goodLength;

    onComplete(success, success ? 100 : 50, success ? 
      t({ 'zh-tw': '對話很愉快，你成功引起了她的注意！', 'zh-cn': '对话很愉快，你成功引起了她的注意！', 'en': 'The conversation was great, you successfully caught her attention!' }) :
      t({ 'zh-tw': '對話有些冷場...', 'zh-cn': '对话有些冷场...', 'en': 'The conversation got a bit awkward...' })
    );
  };
  
  return (
    <div style={minigameStyles.container}>
      <h3>{t({ 'zh-tw': '💬 語音對話', 'zh-cn': '💬 语音对话', 'en': '💬 Voice Chat' })}</h3>
      <div style={minigameStyles.chatWindow}>
        {chatHistory.map((message) => (
          <div
            key={message.id}
            style={{
              ...minigameStyles.chatMessage,
              ...minigameStyles[message.sender]
            }}
          >
            {message.sender === 'crush' && <Volume2 size={16} />}
            {message.content}
          </div>
        ))}
      </div>
      <div style={minigameStyles.inputArea}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={t({ 'zh-tw': '說些什麼...', 'zh-cn': '说些什么...', 'en': 'Say something...' })}
          style={minigameStyles.chatInput}
          disabled={!gameActive}
        />
        <button
          onClick={startVoiceInput}
          disabled={!gameActive || isRecording}
          style={minigameStyles.voiceButton}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button
          onClick={handleSendMessage}
          disabled={!gameActive || userInput.trim().length === 0}
          style={minigameStyles.sendButton}
        >
          {t({ 'zh-tw': '發送', 'zh-cn': '发送', 'en': 'Send' })}
        </button>
      </div>
    </div>
  );
};

export default VoiceChatGame;