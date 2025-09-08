import React, { useState, useEffect } from 'react';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';
import { minigameStyles, backButtonStyle } from "../styles/gameStyles.js";
import NoteWritingGame from '../../romance/minigames/NoteWritingGame';
import VoiceChatGame from '../../romance/minigames/VoiceChatGame';
import ScriptedChatGame from './ScriptedChatGame';

// === Connections Game Component ===
const ConnectionsGame = ({ gameActive, onComplete, t }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [foundGroups, setFoundGroups] = useState([]);
  const [currentPuzzle] = useState(connectionsCorpus[0]); // Use first puzzle
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 4;

  const handleItemClick = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSubmit = () => {
    if (selectedItems.length !== 4) return;

    // Check if selection matches any category
    const matchingGroup = currentPuzzle.find(group => {
      return selectedItems.every(item => group.items.includes(item)) &&
             selectedItems.length === group.items.length;
    });

    if (matchingGroup) {
      setFoundGroups([...foundGroups, matchingGroup]);
      setSelectedItems([]);
      
      if (foundGroups.length + 1 === currentPuzzle.length) {
        onComplete(true, 100, t({ 'zh-tw': '恭喜完成！', 'zh-cn': '恭喜完成！', 'en': 'Congratulations!' }));
      }
    } else {
      setMistakes(mistakes + 1);
      setSelectedItems([]);
      
      if (mistakes + 1 >= maxMistakes) {
        onComplete(false, 20, t({ 'zh-tw': '遊戲結束', 'zh-cn': '游戏结束', 'en': 'Game Over' }));
      }
    }
  };

  const availableItems = currentPuzzle.flatMap(group => group.items)
    .filter(item => !foundGroups.some(group => group.items.includes(item)));

  return (
    <div style={minigameStyles.container}>
      <h3>{t({ 'zh-tw': '文字連線遊戲', 'zh-cn': '文字连线游戏', 'en': 'Word Connections Game' })}</h3>
      <p>{t({ 'zh-tw': '找出四個相關的詞語', 'zh-cn': '找出四个相关的词语', 'en': 'Find four related words' })}</p>
      
      <div style={{ margin: '20px 0' }}>
        <span>{t({ 'zh-tw': '錯誤次數', 'zh-cn': '错误次数', 'en': 'Mistakes' })}: {mistakes}/{maxMistakes}</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        marginBottom: '20px'
      }}>
        {availableItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item)}
            style={{
              padding: '15px',
              borderRadius: '8px',
              border: selectedItems.includes(item) ? '3px solid #2196f3' : '2px solid #ddd',
              background: selectedItems.includes(item) ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <button 
        onClick={handleSubmit}
        disabled={selectedItems.length !== 4}
        style={{
          ...minigameStyles.submitButton,
          opacity: selectedItems.length !== 4 ? 0.5 : 1
        }}
      >
        {t({ 'zh-tw': '提交答案', 'zh-cn': '提交答案', 'en': 'Submit Answer' })}
      </button>

      <div style={{ marginTop: '20px' }}>
        {foundGroups.map((group, index) => (
          <div key={index} style={{
            background: '#c8e6c9',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            <strong>{typeof group.category === 'string' ? group.category : t(group.category)}</strong>
            <div>{group.items.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// === Connections Game Corpus ===
const connectionsCorpus = [
    // Puzzle 1: Professions
    [
      { "category": { 'zh-tw': '職業', 'zh-cn': '职业', 'en': 'Professions' }, "items": ['醫生', '老師', '學生', '廚師'] },
      { "category": { 'zh-tw': '交通工具', 'zh-cn': '交通工具', 'en': 'Vehicles' }, "items": ['車', '船', '飛機', '火車'] },
      { "category": { 'zh-tw': '水果', 'zh-cn': '水果', 'en': 'Fruits' }, "items": ['蘋果', '香蕉', '橘子', '西瓜'] },
      { "category": { 'zh-tw': '動物', 'zh-cn': '动物', 'en': 'Animals' }, "items": ['狗', '貓', '鳥', '魚'] }
    ]
];

// Main GameMinigames component
const GameMinigames = ({
  gameActive,
  currentLanguage,
  t,
  userInput,
  setUserInput,
  isRecording,
  setIsRecording,
  chatHistory,
  setChatHistory,
  gameStats,
  setGameStats,
  onComplete,
  currentMinigame,
  onGoBack,
}) => {
  // Add console log to debug
  console.log('GameMinigames rendered with currentMinigame:', currentMinigame);

  return (
    <>
      <button onClick={onGoBack} style={backButtonStyle}>
          <ArrowLeft size={20} />
          <span>Back to All Games</span>
      </button>
      <div style={{ padding: '20px' }}>
          {(() => {
              switch (currentMinigame) {
                  case 'note_writing':
                      return <NoteWritingGame
                          gameActive={gameActive}
                          t={t}
                          onComplete={onComplete}
                          setGameStats={setGameStats}
                      />;
                  case 'connections_game':
                      return <ConnectionsGame
                          gameActive={gameActive}
                          onComplete={onComplete}
                          t={t}
                      />;
                  case 'voice_chat':
                      return <VoiceChatGame
                          gameActive={gameActive}
                          t={t}
                          userInput={userInput}
                          setUserInput={setUserInput}
                          isRecording={isRecording}
                          setIsRecording={setIsRecording}
                          chatHistory={chatHistory}
                          setChatHistory={setChatHistory}
                          onComplete={onComplete}
                          currentLanguage={currentLanguage}
                      />;
                  case 'scripted_chat':
                      return <ScriptedChatGame
                          gameActive={gameActive}
                          t={t}
                          onComplete={onComplete}
                          currentLanguage={currentLanguage}
                          onGoBack={onGoBack}
                      />;
                  default:
                      return (
                          <div style={minigameStyles.container}>
                              <h3>No minigame selected</h3>
                              <p>Current minigame: {currentMinigame || 'undefined'}</p>
                              <p>Available minigames:</p>
                              <ul>
                                <li>note_writing</li>
                                <li>connections_game</li>
                                <li>voice_chat</li>
                                <li>scripted_chat</li>
                              </ul>
                          </div>
                      );
              }
          })()}
      </div>
    </>
  );
};

export default GameMinigames;