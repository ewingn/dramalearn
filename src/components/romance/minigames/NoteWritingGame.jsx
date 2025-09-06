// minigames/NoteWritingGame.jsx
import React, { useState, useEffect } from 'react';
import { calculateNoteSuccess } from '../utils/gameUtils';

const NoteWritingGame = ({
  t,
  crushCharacter,
  currentScenario,
  setCurrentScenario,
  scenarios,
  setCrushAffection,
  setPlayerScore,
  setGameStats,
  setGamePhase,
  timeLeft,
  setTimeLeft,
  gameActive,
  setGameActive,
  styles
}) => {
  const [noteContent, setNoteContent] = useState('');
  const currentScenarioData = scenarios[currentScenario];

  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      setTimeLeft(currentScenarioData.timeLimit);
      setGameActive(true);
    }
  }, []);

  const handleNoteSubmit = () => {
    setGameActive(false);
    const { successChance } = calculateNoteSuccess(noteContent);
    const success = Math.random() < successChance;

    if (success) {
      setCrushAffection(prev => Math.min(100, prev + currentScenarioData.affectionReward));
      setPlayerScore(prev => prev + 100);
      setGameStats(prev => ({ ...prev, notesExchanged: prev.notesExchanged + 1 }));
      alert(t({
        'zh-tw': '成功！你的紙條讓對方臉紅了！',
        'zh-cn': '成功！你的纸条让对方脸红了！',
        'en': 'Success! Your note made them blush!'
      }));
    } else {
      setCrushAffection(prev => Math.max(0, prev + currentScenarioData.affectionPenalty));
      setGameStats(prev => ({ ...prev, teacherTroubles: prev.teacherTroubles + 1 }));
      alert(t({
        'zh-tw': '糟糕！老師發現了，你被罰站！',
        'zh-cn': '糟糕！老师发现了，你被罚站！',
        'en': 'Oh no! The teacher caught you and made you stand as punishment!'
      }));
    }

    // Move to next scenario or end game
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
      } else {
        setGamePhase('ending');
      }
    }, 2000);
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {t({
          'zh-tw': '寫紙條給 ' + t(crushCharacter.name),
          'zh-cn': '写纸条给 ' + t(crushCharacter.name),
          'en': 'Write a note to ' + t(crushCharacter.name)
        })}
      </h3>
      
      {/* Note writing area */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        border: '2px solid #e0e0e0',
        position: 'relative'
      }}>
        {/* Paper texture background */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, #e0e0e0 24px, #e0e0e0 25px)',
          borderRadius: '8px',
          opacity: '0.3',
          pointerEvents: 'none'
        }}></div>
        
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder={t({
            'zh-tw': '寫下你想說的話... (小心老師！)',
            'zh-cn': '写下你想说的话... (小心老师！)',
            'en': 'Write what you want to say... (Watch out for the teacher!)'
          })}
          style={{
            ...styles.noteTextarea,
            position: 'relative',
            zIndex: 1,
            background: 'transparent',
            fontFamily: 'cursive, sans-serif',
            fontSize: '16px',
            lineHeight: '25px',
            paddingTop: '8px'
          }}
          disabled={!gameActive}
          maxLength={100}
        />
      </div>
      
      {/* Note statistics */}
      <div style={{
        ...styles.noteStats,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <span style={{ 
          color: noteContent.length > 50 ? '#f44336' : 
                noteContent.length > 30 ? '#ff9800' : '#4caf50'
        }}>
          {t({
            'zh-tw': '字數: ' + noteContent.length + '/50',
            'zh-cn': '字数: ' + noteContent.length + '/50',
            'en': 'Characters: ' + noteContent.length + '/50'
          })}
        </span>
        
        <span style={{ fontSize: '12px', color: '#666' }}>
          {noteContent.length < 10 ? t({
            'zh-tw': '太短了',
            'zh-cn': '太短了',
            'en': 'Too short'
          }) : noteContent.length > 50 ? t({
            'zh-tw': '容易被發現！',
            'zh-cn': '容易被发现！',
            'en': 'Easy to get caught!'
          }) : t({
            'zh-tw': '長度剛好',
            'zh-cn': '长度刚好',
            'en': 'Perfect length'
          })}
        </span>
      </div>

      {/* Teacher warning */}
      {gameActive && (
        <div style={{
          background: timeLeft <= 10 ? '#ffebee' : '#fff3e0',
          border: `2px solid ${timeLeft <= 10 ? '#f44336' : '#ff9800'}`,
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>
            {timeLeft <= 10 ? '👀' : '📝'}
          </div>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
            {timeLeft <= 10 ? t({
              'zh-tw': '老師快轉過來了！',
              'zh-cn': '老师快转过来了！',
              'en': 'Teacher is about to turn around!'
            }) : t({
              'zh-tw': '老師正在寫黑板，趁現在！',
              'zh-cn': '老师正在写黑板，趁现在！',
              'en': 'Teacher is writing on board, now\'s your chance!'
            })}
          </p>
        </div>
      )}
      
      {/* Submit button */}
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={handleNoteSubmit} 
          style={{
            ...styles.submitButton,
            opacity: !gameActive || noteContent.length === 0 ? 0.5 : 1,
            transform: gameActive && noteContent.length > 0 ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.3s ease'
          }}
          disabled={!gameActive || noteContent.length === 0}
        >
          {t({
            'zh-tw': '偷偷傳紙條 📝',
            'zh-cn': '偷偷传纸条 📝',
            'en': 'Secretly Pass Note 📝'
          })}
        </button>
      </div>

      {/* Risk indicator */}
      <div style={{
        textAlign: 'center',
        marginTop: '15px',
        fontSize: '12px',
        color: '#666'
      }}>
        {t({
          'zh-tw': '成功機率: ',
          'zh-cn': '成功几率: ',
          'en': 'Success rate: '
        })}
        <span style={{
          color: calculateNoteSuccess(noteContent).successChance > 0.7 ? '#4caf50' : '#ff9800',
          fontWeight: 'bold'
        }}>
          {Math.round(calculateNoteSuccess(noteContent).successChance * 100)}%
        </span>
      </div>
    </div>
  );
};

export default NoteWritingGame;