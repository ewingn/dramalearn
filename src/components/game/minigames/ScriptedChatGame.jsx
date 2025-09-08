import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';

// Inline styles since gameStyles.js might not exist
const minigameStyles = {
  container: {
    background: 'white',
    borderRadius: '15px',
    padding: '25px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  chatHistory: {
    height: '300px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    background: '#f9f9f9'
  },
  message: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '80%'
  },
  playerMessage: {
    background: '#e3f2fd',
    marginLeft: 'auto',
    textAlign: 'right'
  },
  crushMessage: {
    background: '#fff3e0',
    marginRight: 'auto'
  },
  hint: {
    background: '#f0f0f0',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '14px',
    fontStyle: 'italic'
  },
  voiceButton: {
    background: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '20px',
    cursor: 'pointer',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  submitButton: {
    background: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

const backButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(255,255,255,0.9)',
  border: '1px solid #ddd',
  borderRadius: '25px',
  padding: '8px 16px',
  fontSize: '14px',
  cursor: 'pointer',
  marginBottom: '20px'
};

// Inline scripted scenes data
const scriptedScenes = [
  {
    id: 'classroom_confession',
    title: { 'zh-tw': '教室告白', 'zh-cn': '教室告白', 'en': 'Classroom Confession' },
    script: [
      {
        speaker: 'ai',
        text: { 'zh-tw': '放學後的教室，只剩下我們兩個人...', 'zh-cn': '放学后的教室，只剩下我们两个人...', 'en': 'After school classroom, only the two of us remain...' }
      },
      {
        speaker: 'player',
        text: { 'zh-tw': '(緊張地說出心意)', 'zh-cn': '(紧张地说出心意)', 'en': '(Nervously express your feelings)' },
        targetPhrase: { 'zh-tw': '我喜歡你', 'zh-cn': '我喜欢你', 'en': 'I like you' }
      },
      {
        speaker: 'ai',
        text: { 'zh-tw': '謝謝你告訴我...讓我想想好嗎？', 'zh-cn': '谢谢你告诉我...让我想想好吗？', 'en': 'Thank you for telling me... let me think about it, okay?' }
      },
      {
        speaker: 'player',
        text: { 'zh-tw': '(回應她的請求)', 'zh-cn': '(回应她的请求)', 'en': '(Respond to her request)' },
        targetPhrase: { 'zh-tw': '當然可以', 'zh-cn': '当然可以', 'en': 'Of course' }
      },
      {
        speaker: 'ai',
        text: { 'zh-tw': '你真的很溫柔呢...', 'zh-cn': '你真的很温柔呢...', 'en': 'You\'re really gentle...' }
      }
    ]
  }
];

// Simple voice recording hook
const useVoiceRecording = (currentLanguage) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = currentLanguage === 'zh-tw' ? 'zh-TW' : 
                     currentLanguage === 'zh-cn' ? 'zh-CN' : 'en-US';
    recognition.interimResults = false;

    setIsRecording(true);
    setError(null);
    recognition.start();

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      setError('Recognition error: ' + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const clearTranscript = () => {
    setTranscript('');
    setError(null);
  };

  return { isRecording, transcript, error, startRecording, clearTranscript };
};

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
      clearTranscript();
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
    const hasTargetPhrase = currentLine.targetPhrase ? 
      userText.toLowerCase().includes(t(currentLine.targetPhrase).toLowerCase()) : true;
    
    // Determine score based on success
    const success = hasTargetPhrase;
    const points = success ? 100 : 20;
    const message = success
      ? t({ 'zh-tw': '太棒了！你完美演繹了這句台詞！', 'zh-cn': '太棒了！你完美演绎了这句台词！', 'en': 'Great! You perfectly delivered that line!' })
      : t({ 'zh-tw': `缺少關鍵詞：${t(currentLine.targetPhrase)}`, 'zh-cn': `缺少关键词：${t(currentLine.targetPhrase)}`, 'en': `Missing key phrase: ${t(currentLine.targetPhrase)}` });

    // Move to next line or show AI response
    setTimeout(() => {
      if (currentLineIndex + 1 < currentScene.script.length) {
        const nextLine = currentScene.script[currentLineIndex + 1];
        if (nextLine.speaker === 'ai') {
          setChatHistory(prev => [...prev, { speaker: 'ai', text: t(nextLine.text) }]);
        }
        setCurrentLineIndex(currentLineIndex + 1);
      } else {
        // End of scene
        onComplete(success, points, message);
      }
    }, 1000);
  };

  const handleSkip = () => {
    setChatHistory(prev => [...prev, { speaker: 'player', text: '... (Skipped)', isVoice: false }]);
    
    setTimeout(() => {
      if (currentLineIndex + 1 < currentScene.script.length) {
        const nextLine = currentScene.script[currentLineIndex + 1];
        if (nextLine.speaker === 'ai') {
          setChatHistory(prev => [...prev, { speaker: 'ai', text: t(nextLine.text) }]);
        }
        setCurrentLineIndex(currentLineIndex + 1);
      } else {
        onComplete(false, 10, t({ 'zh-tw': '場景結束', 'zh-cn': '场景结束', 'en': 'Scene completed' }));
      }
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
            {message.isVoice && <span style={{fontSize: '12px', opacity: 0.7}}> 🎤</span>}
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
          {error && <p style={{color: 'red', fontSize: '12px'}}>{error}</p>}
          <button onClick={handleSkip} style={{...minigameStyles.sendButton, marginTop: '10px'}}>
            {t({ 'zh-tw': '跳過此句', 'zh-cn': '跳过此句', 'en': 'Skip Line' })}
          </button>
        </div>
      )}
    </div>
  );
};

export default ScriptedChatGame;