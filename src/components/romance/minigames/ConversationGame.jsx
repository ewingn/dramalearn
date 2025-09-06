// minigames/ConversationGame.jsx
import React, { useEffect, useRef } from 'react';
import { generateAIResponse, startVoiceRecording } from '../utils/gameUtils';
import ChatInterface from '../ui/ChatInterface';

const ConversationGame = ({
  t,
  currentLanguage,
  currentScenario,
  setCurrentScenario,
  scenarios,
  setCrushAffection,
  setPlayerScore,
  chatHistory,
  setChatHistory,
  userInput,
  setUserInput,
  isRecording,
  setIsRecording,
  setGamePhase,
  timeLeft,
  setTimeLeft,
  gameActive,
  setGameActive,
  styles
}) => {
  const chatRef = useRef(null);
  const currentScenarioData = scenarios[currentScenario];

  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      setTimeLeft(currentScenarioData.timeLimit);
      setGameActive(true);
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle chat submission
  const handleChatSubmit = async (isVoice = false) => {
    if (!userInput.trim()) return;

    const newUserMessage = {
      speaker: 'user',
      text: userInput,
      timestamp: Date.now(),
      isVoice: isVoice
    };

    setChatHistory(prev => [...prev, newUserMessage]);

    // Generate AI response
    const aiResponse = await generateAIResponse(
      currentScenarioData.minigame, 
      userInput, 
      currentLanguage,
      isVoice
    );
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        speaker: 'ai',
        text: aiResponse,
        timestamp: Date.now()
      }]);
    }, 1000);

    setUserInput('');
    
    // Add some affection for good conversation
    setCrushAffection(prev => Math.min(100, prev + 5));
    setPlayerScore(prev => prev + 10);
  };

  // Voice recording handler
  const handleVoiceRecording = () => {
    startVoiceRecording(
      currentLanguage,
      (transcript) => {
        setUserInput(transcript);
        setIsRecording(false);
      },
      (error) => {
        alert(error);
        setIsRecording(false);
      },
      () => setIsRecording(true),
      () => setIsRecording(false)
    );
  };

  // Handle time up
  useEffect(() => {
    if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setCrushAffection(prev => Math.max(0, prev - 10));
      
      setTimeout(() => {
        if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(prev => prev + 1);
        } else {
          setGamePhase('ending');
        }
      }, 2000);
    }
  }, [timeLeft, gameActive]);

  return (
    <div>
      {/* Conversation tips */}
      <div style={{
        background: '#e8f5e8',
        border: '2px solid #4caf50',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
          {t({
            'zh-tw': '💬 對話提示',
            'zh-cn': '💬 对话提示',
            'en': '💬 Conversation Tips'
          })}
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#2e7d32' }}>
          <li>{t({
            'zh-tw': '真誠比華麗的詞藻更重要',
            'zh-cn': '真诚比华丽的词藻更重要',
            'en': 'Sincerity matters more than fancy words'
          })}</li>
          <li>{t({
            'zh-tw': '可以談論共同的回憶和興趣',
            'zh-cn': '可以谈论共同的回忆和兴趣',
            'en': 'Talk about shared memories and interests'
          })}</li>
          <li>{t({
            'zh-tw': '試試語音輸入，更自然的表達',
            'zh-cn': '试试语音输入，更自然的表达',
            'en': 'Try voice input for more natural expression'
          })}</li>
        </ul>
      </div>

      {/* Conversation atmosphere */}
      <div style={{
        background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
        border: '2px solid #ff9800',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
          🌅
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: '14px', 
          fontStyle: 'italic',
          color: '#e65100'
        }}>
          {t({
            'zh-tw': '夕陽西下，橘紅色的光芒灑進教室，只剩下你們兩個人...',
            'zh-cn': '夕阳西下，橘红色的光芒洒进教室，只剩下你们两个人...',
            'en': 'The sun sets, orange light fills the classroom, only you two remain...'
          })}
        </p>
      </div>

      {/* Chat Interface */}
      <ChatInterface
        chatHistory={chatHistory}
        userInput={userInput}
        setUserInput={setUserInput}
        handleChatSubmit={handleChatSubmit}
        startVoiceRecording={handleVoiceRecording}
        isRecording={isRecording}
        gameActive={gameActive}
        t={t}
        styles={styles}
        chatRef={chatRef}
      />

      {/* Conversation suggestions */}
      {chatHistory.length === 0 && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f3e5f5',
          border: '2px solid #9c27b0',
          borderRadius: '10px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#6a1b9a' }}>
            {t({
              'zh-tw': '💡 開場建議',
              'zh-cn': '💡 开场建议',
              'en': '💡 Conversation Starters'
            })}
          </h4>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            fontSize: '14px'
          }}>
            <button
              onClick={() => setUserInput(t({
                'zh-tw': '今天的夕陽真美呢',
                'zh-cn': '今天的夕阳真美呢',
                'en': 'The sunset is really beautiful today'
              }))}
              style={{
                ...styles.answerButton,
                textAlign: 'left',
                fontSize: '12px'
              }}
            >
              {t({
                'zh-tw': '讚美夕陽',
                'zh-cn': '赞美夕阳',
                'en': 'Admire the sunset'
              })}
            </button>
            
            <button
              onClick={() => setUserInput(t({
                'zh-tw': '我有話想對你說',
                'zh-cn': '我有话想对你说',
                'en': 'I have something to tell you'
              }))}
              style={{
                ...styles.answerButton,
                textAlign: 'left',
                fontSize: '12px'
              }}
            >
              {t({
                'zh-tw': '直接表達',
                'zh-cn': '直接表达',
                'en': 'Direct approach'
              })}
            </button>
            
            <button
              onClick={() => setUserInput(t({
                'zh-tw': '還記得我們第一次見面嗎？',
                'zh-cn': '还记得我们第一次见面吗？',
                'en': 'Do you remember when we first met?'
              }))}
              style={{
                ...styles.answerButton,
                textAlign: 'left',
                fontSize: '12px'
              }}
            >
              {t({
                'zh-tw': '回憶過往',
                'zh-cn': '回忆过往',
                'en': 'Recall memories'
              })}
            </button>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        {t({
          'zh-tw': '對話次數: ' + chatHistory.filter(m => m.speaker === 'user').length,
          'zh-cn': '对话次数: ' + chatHistory.filter(m => m.speaker === 'user').length,
          'en': 'Messages sent: ' + chatHistory.filter(m => m.speaker === 'user').length
        })}
        {chatHistory.filter(m => m.speaker === 'user').length >= 3 && (
          <span style={{ marginLeft: '10px', color: '#4caf50' }}>
            {t({
              'zh-tw': '(良好互動！)',
              'zh-cn': '(良好互动！)',
              'en': '(Good interaction!)'
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ConversationGame;