// src/components/game/minigames/MinigameContainer.jsx
import React, { useState, useEffect } from 'react';
import { Clock, ArrowLeft, Target } from 'lucide-react';

// Individual minigame components
import ConnectionsGame from './ConnectionsGame';
import NotePassingGame from './NotePassingGame';
import QuizGame from './QuizGame';
import DateSimulatorGame from './DateSimulatorGame';
import VoiceChatGame from './VoiceChatGame';

const MinigameContainer = ({ 
  minigameType, 
  config, 
  gameContext, 
  onComplete, 
  onBack 
}) => {
  const { gameState, t, startTimer, stopTimer } = gameContext;
  const [minigameState, setMinigameState] = useState({
    isActive: false,
    timeLeft: config.timeLimit || 60,
    attempts: 0,
    maxAttempts: config.maxAttempts || 3,
    hints: config.hints || [],
    showHints: false
  });

  useEffect(() => {
    if (config.timeLimit) {
      startTimer(config.timeLimit, handleTimeUp);
      setMinigameState(prev => ({ ...prev, isActive: true }));
    }
    
    return () => stopTimer();
  }, [config.timeLimit, startTimer, stopTimer]);

  const handleTimeUp = () => {
    handleComplete({
      success: false,
      score: 0,
      message: t({
        'zh-tw': '時間到了！',
        'zh-cn': '时间到了！',
        'en': 'Time\'s up!'
      }),
      timeBonus: 0
    });
  };

  const handleComplete = (result) => {
    stopTimer();
    
    // Calculate time bonus
    const timeBonus = minigameState.timeLeft > 0 ? 
      Math.round((minigameState.timeLeft / (config.timeLimit || 60)) * 50) : 0;
    
    // Calculate attempt penalty
    const attemptPenalty = (minigameState.attempts - 1) * 10;
    
    const finalResult = {
      ...result,
      timeBonus,
      attemptPenalty,
      finalScore: Math.max(0, result.score + timeBonus - attemptPenalty),
      attempts: minigameState.attempts,
      timeUsed: (config.timeLimit || 60) - minigameState.timeLeft
    };
    
    onComplete(finalResult);
  };

  const renderMinigame = () => {
    const commonProps = {
      config,
      gameContext,
      minigameState,
      setMinigameState,
      onComplete: handleComplete,
      t: gameContext.t
    };

    switch (minigameType) {
      case 'connections':
        return <ConnectionsGame {...commonProps} />;
      case 'note_passing':
        return <NotePassingGame {...commonProps} />;
      case 'quiz':
        return <QuizGame {...commonProps} />;
      case 'date_simulator':
        return <DateSimulatorGame {...commonProps} />;
      case 'voice_chat':
        return <VoiceChatGame {...commonProps} />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>{t({ 'zh-tw': '找不到小遊戲', 'zh-cn': '找不到小游戏', 'en': 'Minigame not found' })}</h3>
          </div>
        );
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      position: 'relative',
      minHeight: '400px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={onBack}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: '#e91e63' }}>
              {t(config.title)}
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              {t(config.description)}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Timer */}
          {config.timeLimit && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: gameState.timeLeft <= 10 ? '#ffebee' : '#e8f5e8',
              padding: '8px 12px',
              borderRadius: '20px',
              border: `2px solid ${gameState.timeLeft <= 10 ? '#f44336' : '#4caf50'}`
            }}>
              <Clock size={16} style={{ 
                color: gameState.timeLeft <= 10 ? '#f44336' : '#4caf50' 
              }} />
              <span style={{
                fontWeight: 'bold',
                color: gameState.timeLeft <= 10 ? '#f44336' : '#4caf50'
              }}>
                {gameState.timeLeft}s
              </span>
            </div>
          )}

          {/* Attempts */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#e3f2fd',
            padding: '8px 12px',
            borderRadius: '20px',
            border: '2px solid #2196f3'
          }}>
            <Target size={16} style={{ color: '#2196f3' }} />
            <span style={{ fontWeight: 'bold', color: '#2196f3' }}>
              {minigameState.attempts}/{minigameState.maxAttempts}
            </span>
          </div>
        </div>
      </div>

      {/* Objective */}
      {config.objective && (
        <div style={{
          background: '#fff3e0',
          border: '2px solid #ff9800',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#e65100' }}>
            🎯 {t({ 'zh-tw': '目標', 'zh-cn': '目标', 'en': 'Objective' })}
          </h4>
          <p style={{ margin: 0, color: '#bf360c' }}>
            {t(config.objective)}
          </p>
        </div>
      )}

      {/* Hints button */}
      {minigameState.hints.length > 0 && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setMinigameState(prev => ({ 
              ...prev, 
              showHints: !prev.showHints 
            }))}
            style={{
              background: '#9c27b0',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            💡 {t({ 'zh-tw': '提示', 'zh-cn': '提示', 'en': 'Hints' })}
          </button>
          
          {minigameState.showHints && (
            <div style={{
              marginTop: '15px',
              background: '#f3e5f5',
              border: '2px solid #9c27b0',
              borderRadius: '10px',
              padding: '15px',
              textAlign: 'left'
            }}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {minigameState.hints.map((hint, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {t(hint)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Minigame content */}
      {renderMinigame()}
    </div>
  );
};

// Individual minigame components with standardized interfaces

// Connections Game
const ConnectionsGame = ({ config, gameContext, onComplete, t }) => {
  const [selections, setSelections] = useState([]);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  
  const words = config.words || [];
  const pairs = config.pairs || [];

  const handleWordClick = (word) => {
    if (selections.includes(word) || correctPairs.some(pair => pair.includes(word))) {
      return;
    }

    const newSelections = [...selections, word];
    
    if (newSelections.length === 2) {
      const isPair = pairs.some(pair => 
        pair.includes(newSelections[0]) && pair.includes(newSelections[1])
      );
      
      setAttempts(prev => prev + 1);
      
      if (isPair) {
        setCorrectPairs(prev => [...prev, newSelections]);
        setSelections([]);
        
        // Check if game complete
        if (correctPairs.length + 1 >= pairs.length) {
          onComplete({
            success: true,
            score: 100,
            message: t({
              'zh-tw': '完美！所有配對都正確！',
              'zh-cn': '完美！所有配对都正确！',
              'en': 'Perfect! All pairs matched correctly!'
            })
          });
        }
      } else {
        setTimeout(() => setSelections([]), 1000);
        
        if (attempts >= 5) {
          onComplete({
            success: false,
            score: correctPairs.length * 20,
            message: t({
              'zh-tw': '嘗試次數過多，遊戲結束',
              'zh-cn': '尝试次数过多，游戏结束',
              'en': 'Too many attempts, game over'
            })
          });
        }
      }
    }
  };

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {words.map((word, index) => (
          <button
            key={index}
            onClick={() => handleWordClick(word)}
            disabled={correctPairs.some(pair => pair.includes(word))}
            style={{
              padding: '15px 10px',
              borderRadius: '10px',
              border: '2px solid',
              borderColor: correctPairs.some(pair => pair.includes(word)) ? '#4caf50' :
                          selections.includes(word) ? '#e91e63' : '#e0e0e0',
              background: correctPairs.some(pair => pair.includes(word)) ? '#e8f5e8' :
                         selections.includes(word) ? '#fce4ec' : 'white',
              cursor: correctPairs.some(pair => pair.includes(word)) ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {t(word)}
          </button>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', color: '#666' }}>
        {t({ 'zh-tw': '已完成', 'zh-cn': '已完成', 'en': 'Completed' })}: {correctPairs.length}/{pairs.length}
      </div>
    </div>
  );
};

// Note Passing Game
const NotePassingGame = ({ config, gameContext, onComplete, t }) => {
  const [noteContent, setNoteContent] = useState('');
  const [teacherAlert, setTeacherAlert] = useState(false);
  
  // Simulate teacher attention every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setTeacherAlert(true);
        setTimeout(() => setTeacherAlert(false), 2000);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmitNote = () => {
    const length = noteContent.trim().length;
    const hasKeywords = config.requiredWords?.some(word => 
      noteContent.includes(t(word))
    ) || true;
    
    let success = false;
    let score = 0;
    
    if (length >= 10 && length <= 50 && hasKeywords && !teacherAlert) {
      success = true;
      score = 80 + (length > 20 ? 20 : 0);
    } else if (teacherAlert) {
      score = 0;
    } else {
      score = Math.max(20, length * 2);
    }
    
    onComplete({
      success,
      score,
      message: success 
        ? t({ 'zh-tw': '紙條成功傳遞！', 'zh-cn': '纸条成功传递！', 'en': 'Note passed successfully!' })
        : teacherAlert 
        ? t({ 'zh-tw': '被老師發現了！', 'zh-cn': '被老师发现了！', 'en': 'Caught by teacher!' })
        : t({ 'zh-tw': '紙條內容需要改進', 'zh-cn': '纸条内容需要改进', 'en': 'Note content needs improvement' })
    });
  };

  return (
    <div>
      {/* Teacher alert */}
      {teacherAlert && (
        <div style={{
          background: '#ffebee',
          border: '2px solid #f44336',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          textAlign: 'center',
          animation: 'shake 0.5s ease-in-out'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>👀</div>
          <p style={{ margin: 0, color: '#d32f2f', fontWeight: 'bold' }}>
            {t({ 'zh-tw': '小心！老師在看！', 'zh-cn': '小心！老师在看！', 'en': 'Careful! Teacher is watching!' })}
          </p>
        </div>
      )}

      {/* Note writing area */}
      <div style={{
        background: '#fafafa',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, #e0e0e0 24px, #e0e0e0 25px)'
      }}>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder={t({
            'zh-tw': '寫下你想說的話...',
            'zh-cn': '写下你想说的话...',
            'en': 'Write what you want to say...'
          })}
          style={{
            width: '100%',
            height: '120px',
            border: 'none',
            background: 'transparent',
            fontSize: '16px',
            lineHeight: '25px',
            resize: 'none',
            outline: 'none',
            fontFamily: 'cursive'
          }}
          maxLength={100}
        />
      </div>

      {/* Note stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#666'
      }}>
        <span>
          {t({ 'zh-tw': '字數', 'zh-cn': '字数', 'en': 'Length' })}: {noteContent.length}/100
        </span>
        <span style={{
          color: noteContent.length >= 10 && noteContent.length <= 50 ? '#4caf50' : '#ff9800'
        }}>
          {noteContent.length < 10 
            ? t({ 'zh-tw': '太短', 'zh-cn': '太短', 'en': 'Too short' })
            : noteContent.length > 50 
            ? t({ 'zh-tw': '太長，容易被發現', 'zh-cn': '太长，容易被发现', 'en': 'Too long, easy to get caught' })
            : t({ 'zh-tw': '長度剛好', 'zh-cn': '长度刚好', 'en': 'Perfect length' })
          }
        </span>
      </div>

      {/* Submit button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSubmitNote}
          disabled={noteContent.length === 0 || teacherAlert}
          style={{
            background: teacherAlert ? '#9e9e9e' : '#e91e63',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: teacherAlert ? 'not-allowed' : 'pointer',
            opacity: noteContent.length === 0 ? 0.5 : 1
          }}
        >
          {t({ 'zh-tw': '偷偷傳遞', 'zh-cn': '偷偷传递', 'en': 'Pass Secretly' })}
        </button>
      </div>
    </div>
  );
};

// Quiz Game (simplified version)
const QuizGame = ({ config, gameContext, onComplete, t }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  
  const questions = config.questions || [];
  const question = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    const isCorrect = answerIndex === question.correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        // Quiz complete
        const accuracy = (score + (isCorrect ? 1 : 0)) / questions.length;
        onComplete({
          success: accuracy >= 0.7,
          score: Math.round(accuracy * 100),
          message: accuracy >= 0.8 
            ? t({ 'zh-tw': '優秀！', 'zh-cn': '优秀！', 'en': 'Excellent!' })
            : accuracy >= 0.6
            ? t({ 'zh-tw': '不錯！', 'zh-cn': '不错！', 'en': 'Good job!' })
            : t({ 'zh-tw': '需要多練習', 'zh-cn': '需要多练习', 'en': 'Need more practice' })
        });
      }
    }, 2000);
  };

  if (!question) {
    return <div>{t({ 'zh-tw': '沒有題目', 'zh-cn': '没有题目', 'en': 'No questions available' })}</div>;
  }

  return (
    <div>
      {/* Progress */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <span style={{ fontWeight: 'bold' }}>
          {currentQuestion + 1} / {questions.length}
        </span>
        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>
          {t({ 'zh-tw': '正確', 'zh-cn': '正确', 'en': 'Correct' })}: {score}
        </span>
      </div>
      
      {/* Question */}
      <div style={{
        background: '#f8f9fa',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '25px',
        border: '2px solid #e9ecef'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>
          {t(question.question)}
        </h3>
      </div>
      
      {/* Answers */}
      <div style={{
        display: 'grid',
        gap: '15px'
      }}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={answered}
            style={{
              padding: '15px 20px',
              borderRadius: '10px',
              border: '2px solid',
              borderColor: answered 
                ? (index === question.correct ? '#4caf50' : 
                   index === selectedAnswer ? '#f44336' : '#e0e0e0')
                : (selectedAnswer === index ? '#e91e63' : '#e0e0e0'),
              background: answered 
                ? (index === question.correct ? '#e8f5e8' :
                   index === selectedAnswer ? '#ffebee' : 'white')
                : (selectedAnswer === index ? '#fce4ec' : 'white'),
              cursor: answered ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              fontSize: '16px',
              fontWeight: selectedAnswer === index ? 'bold' : 'normal'
            }}
          >
            <span style={{
              display: 'inline-block',
              marginRight: '12px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#e0e0e0',
              color: '#666',
              fontSize: '12px',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '24px'
            }}>
              {String.fromCharCode(65 + index)}
            </span>
            {t(option)}
          </button>
        ))}
      </div>
      
      {/* Result indicator */}
      {answered && (
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
          color: selectedAnswer === question.correct ? '#4caf50' : '#f44336'
        }}>
          {selectedAnswer === question.correct ? '✓' : '✗'}
        </div>
      )}
    </div>
  );
};

// Date Simulator Game
const DateSimulatorGame = ({ config, gameContext, onComplete, t }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  
  const activities = config.activities || [];

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
    
    // Simulate success based on activity difficulty
    const success = Math.random() < (activity.successRate || 0.7);
    const score = success ? activity.points || 50 : 20;
    
    setTimeout(() => {
      onComplete({
        success,
        score,
        message: success 
          ? t(activity.successMessage || { 'zh-tw': '活動很成功！', 'zh-cn': '活动很成功！', 'en': 'Activity was successful!' })
          : t(activity.failMessage || { 'zh-tw': '有點尷尬...', 'zh-cn': '有点尴尬...', 'en': 'A bit awkward...' }),
        relationshipChanges: {
          [config.targetCharacter]: {
            affection: success ? 15 : -5
          }
        }
      });
    }, 2000);
  };

  if (selectedActivity) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>{t(selectedActivity.name)}</h3>
        <div style={{ fontSize: '48px', margin: '20px 0' }}>
          {selectedActivity.emoji || '💕'}
        </div>
        <p>{t({ 'zh-tw': '活動進行中...', 'zh-cn': '活动进行中...', 'en': 'Activity in progress...' })}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>
        {t({ 'zh-tw': '選擇約會活動', 'zh-cn': '选择约会活动', 'en': 'Choose Date Activity' })}
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {activities.map((activity, index) => (
          <button
            key={index}
            onClick={() => handleActivitySelect(activity)}
            style={{
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid #e0e0e0',
              background: 'white',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#e91e63';
              e.target.style.background = '#fce4ec';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.background = 'white';
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>
              {activity.emoji || '🎉'}
            </div>
            <h4 style={{ margin: '0 0 8px 0' }}>
              {t(activity.name)}
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              {t(activity.description)}
            </p>
            {activity.successRate && (
              <div style={{
                marginTop: '8px',
                fontSize: '12px',
                color: activity.successRate > 0.7 ? '#4caf50' : '#ff9800'
              }}>
                {t({ 'zh-tw': '成功率', 'zh-cn': '成功率', 'en': 'Success rate' })}: {Math.round(activity.successRate * 100)}%
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Voice Chat Game
const VoiceChatGame = ({ config, gameContext, onComplete, t }) => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  // Add initial AI message
  useEffect(() => {
    if (conversation.length === 0 && config.initialMessage) {
      setConversation([{
        speaker: 'ai',
        message: t(config.initialMessage),
        timestamp: Date.now()
      }]);
    }
  }, [config.initialMessage, conversation.length, t]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const newConversation = [...conversation, {
      speaker: 'user',
      message: userInput,
      timestamp: Date.now()
    }];
    
    setConversation(newConversation);
    setUserInput('');
    
    // Simple AI response simulation
    setTimeout(() => {
      const responses = config.aiResponses || [
        { 'zh-tw': '嗯...有趣', 'zh-cn': '嗯...有趣', 'en': 'Hmm... interesting' },
        { 'zh-tw': '真的嗎？', 'zh-cn': '真的吗？', 'en': 'Really?' },
        { 'zh-tw': '我也這麼想', 'zh-cn': '我也这么想', 'en': 'I think so too' }
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversation(prev => [...prev, {
        speaker: 'ai',
        message: t(randomResponse),
        timestamp: Date.now()
      }]);
    }, 1000);
    
    // Check completion criteria
    if (newConversation.filter(msg => msg.speaker === 'user').length >= 3) {
      setTimeout(() => {
        onComplete({
          success: true,
          score: 70,
          message: t({ 'zh-tw': '對話很愉快！', 'zh-cn': '对话很愉快！', 'en': 'Great conversation!' }),
          relationshipChanges: {
            [config.targetCharacter]: {
              affection: 10
            }
          }
        });
      }, 2000);
    }
  };

  return (
    <div>
      {/* Chat history */}
      <div style={{
        height: '200px',
        overflowY: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px',
        background: '#fafafa'
      }}>
        {conversation.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '10px',
              textAlign: msg.speaker === 'user' ? 'right' : 'left'
            }}
          >
            <div
              style={{
                display: 'inline-block',
                maxWidth: '70%',
                padding: '8px 12px',
                borderRadius: '15px',
                background: msg.speaker === 'user' ? '#e91e63' : '#e0e0e0',
                color: msg.speaker === 'user' ? 'white' : 'black'
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={t({ 'zh-tw': '說些什麼...', 'zh-cn': '说些什么...', 'en': 'Say something...' })}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '25px',
            border: '1px solid #e0e0e0',
            fontSize: '16px'
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!userInput.trim()}
          style={{
            background: '#e91e63',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            cursor: 'pointer',
            fontSize: '16px',
            opacity: userInput.trim() ? 1 : 0.5
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default MinigameContainer;