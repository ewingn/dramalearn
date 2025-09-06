import React from 'react';
import ConversationGame from '../minigames/ConversationGame'; // Import the mini-games
import QuizGame from '..romance/minigames/QuizGame';
import NoteWritingGame from '..romance/minigames/NoteWritingGame';
import DateSimulationGame from '../minigames/DateSimulationGame';

const GameplayMain = (props) => {
  const { scenarios, currentScenario } = props;
  const currentScenarioData = scenarios[currentScenario];

  const renderMinigame = () => {
    switch (currentScenarioData.minigame) {
      case 'conversation':
        return <ConversationGame {...props} />;
      case 'quiz_challenge':
        return <QuizGame {...props} />;
      case 'note_writing':
        return <NoteWritingGame {...props} />;
      case 'date_simulation':
        return <DateSimulationGame {...props} />;
      default:
        return <div>{props.t({
          'zh-tw': '找不到遊戲...',
          'zh-cn': '找不到游戏...',
          'en': 'Game not found...'
        })}</div>;
    }
  };

  return (
    <div>
      {/* Scenario Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '5px'
        }}>
          {props.t(currentScenarioData.title)}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#666'
        }}>
          {props.t(currentScenarioData.description)}
        </p>
      </div>

      {/* Render the selected minigame */}
      {renderMinigame()}
    </div>
  );
};

export default GameplayMain;