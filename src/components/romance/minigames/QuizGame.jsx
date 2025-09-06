// minigames/QuizGame.jsx
import React, { useState, useEffect } from 'react';
import { selectRandomQuestionSet } from '../utils/gameUtils';

const QuizGame = ({
  t,
  allQuizQuestions,
  currentScenario,
  setCurrentScenario,
  scenarios,
  setCrushAffection,
  setPlayerScore,
  setGameStats,
  setChatHistory,
  setGamePhase,
  timeLeft,
  setTimeLeft,
  gameActive,
  setGameActive,
  styles
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [questionSet] = useState(() => selectRandomQuestionSet(allQuizQuestions));
  const [score, setScore] = useState(0);

  const currentScenarioData = scenarios[currentScenario];

  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      setTimeLeft(currentScenarioData.timeLimit);
      setGameActive(true);
    }
  }, []);

  const question = questionSet[currentQuestion];

  const handleAnswerSubmit = () => {
    setGameActive(false);
    setAnswered(true);
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setCrushAffection(prev => Math.min(100, prev + 10));
      setPlayerScore(prev => prev + 50);
      setScore(prev => prev + 1);
      setGameStats(prev => ({ 
        ...prev, 
        correctAnswers: prev.correctAnswers + 1,
        totalQuestions: prev.totalQuestions + 1
      }));
    } else {
      setGameStats(prev => ({ 
        ...prev, 
        totalQuestions: prev.totalQuestions + 1
      }));
    }

    setTimeout(() => {
      if (currentQuestion < questionSet.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
        setTimeLeft(currentScenarioData.timeLimit);
        setGameActive(true);
      } else {
        // Move to chat interaction
        setChatHistory([{
          speaker: 'ai',
          text: score >= questionSet.length * 0.7 ? 
            t({
              'zh-tw': '哇！你好聰明，我們繼續讀書吧！',
              'zh-cn': '哇！你好聪明，我们继续读书吧！',
              'en': 'Wow! You\'re so smart, let\'s continue studying!'
            }) :
            t({
              'zh-tw': '沒關係，我來教你這些題目...',
              'zh-cn': '没关系，我来教你这些题目...',
              'en': 'It\'s okay, let me help you with these problems...'
            }),
          timestamp: Date.now()
        }]);
        
        setTimeout(() => {
          if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(prev => prev + 1);
          } else {
            setGamePhase('ending');
          }
        }, 3000);
      }
    }, 2000);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '10px'
      }}>
        <h3 style={{ margin: 0 }}>
          {t({
            'zh-tw': '問題 ' + (currentQuestion + 1) + '/' + questionSet.length,
            'zh-cn': '问题 ' + (currentQuestion + 1) + '/' + questionSet.length,
            'en': 'Question ' + (currentQuestion + 1) + '/' + questionSet.length
          })}
        </h3>
        
        <div style={{
          background: '#e3f2fd',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#1976d2'
        }}>
          {t({
            'zh-tw': '正確: ' + score + '/' + questionSet.length,
            'zh-cn': '正确: ' + score + '/' + questionSet.length,
            'en': 'Correct: ' + score + '/' + questionSet.length
          })}
        </div>
      </div>
      
      <div style={{
        ...styles.questionText,
        background: '#fff',
        padding: '25px',
        borderRadius: '15px',
        border: '2px solid #e0e0e0',
        marginBottom: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {t(question.question)}
      </div>
      
      <div style={styles.answerOptions}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            disabled={answered || !gameActive}
            style={{
              ...styles.answerButton,
              backgroundColor: answered ? 
                (index === question.correct ? '#4CAF50' : 
                 index === selectedAnswer ? '#f44336' : '#f0f0f0') :
                (selectedAnswer === index ? '#e3f2fd' : '#f9f9f9'),
              color: answered && (index === question.correct || index === selectedAnswer) ? 'white' : '#333',
              transform: selectedAnswer === index && !answered ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s ease',
              fontWeight: selectedAnswer === index ? 'bold' : 'normal'
            }}
          >
            <span style={{ 
              display: 'inline-block',
              marginRight: '10px',
              padding: '4px 8px',
              background: selectedAnswer === index ? '#fff' : '#e0e0e0',
              color: selectedAnswer === index ? '#1976d2' : '#666',
              borderRadius: '50%',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {String.fromCharCode(65 + index)}
            </span>
            {t(option)}
          </button>
        ))}
      </div>
      
      {selectedAnswer !== null && !answered && gameActive && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={handleAnswerSubmit} 
            style={{
              ...styles.submitButton,
              fontSize: '16px',
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
              animation: 'pulse 1s infinite'
            }}
          >
            {t({
              'zh-tw': '提交答案 ✓',
              'zh-cn': '提交答案 ✓',
              'en': 'Submit Answer ✓'
            })}
          </button>
        </div>
      )}

      {answered && (
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          padding: '20px',
          background: selectedAnswer === question.correct ? '#e8f5e8' : '#ffebee',
          border: `2px solid ${selectedAnswer === question.correct ? '#4caf50' : '#f44336'}`,
          borderRadius: '10px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
            {selectedAnswer === question.correct ? '🎉' : '😅'}
          </div>
          <p style={{ 
            margin: 0, 
            fontSize: '16px',
            fontWeight: 'bold',
            color: selectedAnswer === question.correct ? '#2e7d32' : '#d32f2f'
          }}>
            {selectedAnswer === question.correct ? 
              t({
                'zh-tw': '答對了！真厲害！',
                'zh-cn': '答对了！真厉害！',
                'en': 'Correct! Well done!'
              }) : 
              t({
                'zh-tw': '答錯了，正確答案是 ' + String.fromCharCode(65 + question.correct),
                'zh-cn': '答错了，正确答案是 ' + String.fromCharCode(65 + question.correct),
                'en': 'Incorrect, the right answer is ' + String.fromCharCode(65 + question.correct)
              })
            }
          </p>
        </div>
      )}

      {!gameActive && !answered && (
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          padding: '15px',
          background: '#fff3e0',
          border: '2px solid #ff9800',
          borderRadius: '10px'
        }}>
          <p style={{ margin: 0, color: '#f57c00' }}>
            {t({
              'zh-tw': '時間到了！請選擇答案。',
              'zh-cn': '时间到了！请选择答案。',
              'en': 'Time\'s up! Please select an answer.'
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizGame;