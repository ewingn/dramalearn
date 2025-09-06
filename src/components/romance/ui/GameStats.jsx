// ui/GameStats.jsx
import React from 'react';

const GameStats = ({ currentScenario, scenarios, playerScore, gameStats, t, styles }) => (
  <div style={styles.statsContainer}>
    <h3 style={{ marginBottom: '15px' }}>
      {t({
        'zh-tw': '遊戲進度',
        'zh-cn': '游戏进度',
        'en': 'Game Progress'
      })}
    </h3>
    <div style={styles.statsGrid}>
      <div>
        <strong>{t({
          'zh-tw': '場景進度:',
          'zh-cn': '场景进度:',
          'en': 'Scenario Progress:'
        })}</strong> {currentScenario + 1}/{scenarios.length}
      </div>
      <div>
        <strong>{t({
          'zh-tw': '分數:',
          'zh-cn': '分数:',
          'en': 'Score:'
        })}</strong> {playerScore}
      </div>
      <div>
        <strong>{t({
          'zh-tw': '答對題數:',
          'zh-cn': '答对题数:',
          'en': 'Correct Answers:'
        })}</strong> {gameStats.correctAnswers}/{gameStats.totalQuestions}
      </div>
      <div>
        <strong>{t({
          'zh-tw': '傳紙條次數:',
          'zh-cn': '传纸条次数:',
          'en': 'Notes Exchanged:'
        })}</strong> {gameStats.notesExchanged}
      </div>
    </div>
  </div>
);

export default GameStats;