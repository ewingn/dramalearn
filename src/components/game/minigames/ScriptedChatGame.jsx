import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';
import { minigameStyles, backButtonStyle } from "../styles/gameStyles.js";
import { scriptedScenes } from '../data/gameData.js';
import { useVoiceRecording, useChat } from '../utils/gameHooks.js';

const ScriptedChatGame = ({ gameActive, t, onComplete, currentLanguage, onGoBack }) => {
  const [currentScene] = useState(scriptedScenes.find(scene => scene.id === 'classroom_confession'));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const { isRecording, transcript, error, startRecording, clearTranscript } = useVoiceRecording(currentLanguage);
  const chatRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  
  const currentLine = currentScene.script[currentLineIndex];

  useEffect(() => {
    if (transcript) {
      handlePlayerResponse(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handlePlayerResponse = (userText) => {
    // Add user message to chat history
    setChatHistory(prev => [...prev, { speaker: 'player', text: userText, isVoice: true }]);

    // Check for target phrase
    const hasTargetPhrase = currentLine.targetPhrase ? userText.includes(t(currentLine.targetPhrase)) : true;
    
    // Determine score based on success
    const success = hasTargetPhrase;
    const points = success ? 100 : 20;
    const message = success
      ? t({ 'zh-tw': '太棒了！你完美演繹了這句台詞！', 'zh-cn': '太棒了！你完美演绎了这句台词！', 'en': 'Great! You perfectly delivered that line!' })
      : t({ 'zh-tw': `缺少關鍵詞：${t(currentLine.targetPhrase)}`, 'zh-cn': `缺少关键词：${t(currentLine.targetPhrase)}`, 'en': `Missing key phrase: ${t(currentLine.targetPhrase)}` });

    // Update game state
    if (success) {
      setTimeout(() => {
        setChatHistory(prev => [...prev, { speaker: 'ai', text: t(currentScene.script[currentLineIndex + 1].text) }]);
        setCurrentLineIndex(prev => prev + 2);
      }, 1000);
    }
    
    // End the game after the last line
    if (currentLineIndex + 1 >= currentScene.script.length) {
      onComplete(success, points, message);
    }
  };

  const handleSkip = () => {
    // Logic to skip the current line and move on
    setChatHistory(prev => [...prev, { speaker: 'player', text: '... (Skipped)', isVoice: false }]);
    const skippedLine = currentLine.text;
    const aiResponse = currentScene.script[currentLineIndex + 1].text;
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { speaker: 'ai', text: t(aiResponse) }]);
      setCurrentLineIndex(prev => prev + 2);
    }, 1000);
  };

  return (
    <div style={minigameStyles.container}>
      <button onClick={onGoBack} style={backButtonStyle}>
        <ArrowLeft size={20} />
        <span>{t({ 'zh-tw': '返回', 'zh-cn': '返回', 'en': 'Back' })}</span>
      </button>

      <div style={minigameStyles.chatHistory} ref={chatRef}>
        {chatHistory.map((message, index) => (
          <div key={index} style={{
            ...minigameStyles.message,
            ...(message.speaker === 'player' ? minigameStyles.playerMessage : minigameStyles.crushMessage)
          }}>
            {message.text}
          </div>
        ))}
      </div>

      {currentLine.speaker === 'ai' ? (
        <div style={{ textAlign: 'center' }}>
          <h3>{t(currentLine.text)}</h3>
          {currentLineIndex === 0 && (
            <button onClick={() => setCurrentLineIndex(1)} style={{...minigameStyles.submitButton, marginTop: '20px'}}>
              {t({ 'zh-tw': '開始對話', 'zh-cn': '开始对话', 'en': 'Start Dialogue' })}
            </button>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={minigameStyles.hint}>
            {t(currentLine.text)}
            <br />
            {currentLine.targetPhrase && (
              <span>{t({ 'zh-tw': '提示：包含「', 'zh-cn': '提示：包含「', 'en': 'Hint: Include "' })}{t(currentLine.targetPhrase)}{t({ 'zh-tw': '」', 'zh-cn': '」', 'en': '"' })}</span>
            )}
          </div>
          <button
            onClick={() => startRecording()}
            disabled={isRecording || !gameActive}
            style={{...minigameStyles.voiceButton, backgroundColor: isRecording ? '#ff5722' : '#2196f3'}}
          >
            {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <p>{isRecording ? t({'zh-tw':'正在聆聽...', 'zh-cn':'正在聆听...', 'en':'Listening...'}) : t({'zh-tw':'點擊說話', 'zh-cn':'点击说话', 'en':'Click to speak'})}</p>
          <button onClick={handleSkip} style={{...minigameStyles.sendButton, marginTop: '10px'}}>
            {t({ 'zh-tw': '跳過此句', 'zh-cn': '跳过此句', 'en': 'Skip Line' })}
          </button>
        </div>
      )}
    </div>
  );
};
export default ScriptedChatGame;