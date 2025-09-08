// src/pages/RomancePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mic, MicOff, Heart, Clock, BookOpen, Users, Star, Target, ArrowLeft } from 'lucide-react';
import GameMinigames from "../components/game/minigames/gameMinigames.jsx";
import { gameStyles } from "../components/game/styles/gameStyles.js";

const RomancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we came from LearnPage (proper navigation)
  const cameFromLearnPage = location.state?.backgroundLocation?.pathname === '/learn';
  
  // Game state
  const [currentLanguage, setCurrentLanguage] = useState('zh-tw');
  const [gamePhase, setGamePhase] = useState('intro');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [crushAffection, setCrushAffection] = useState(50);
  const [playerScore, setPlayerScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentMinigame, setCurrentMinigame] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [gameStats, setGameStats] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
    notesExchanged: 0,
    teacherTroubles: 0,
    scenariosCompleted: 0
  });
  const [messageBox, setMessageBox] = useState({
    isVisible: false,
    title: '',
    message: '',
    type: 'info'
  });

  const timerRef = useRef(null);

  // Game data
  const characters = {
    male: {
      name: { 'zh-tw': '柯景騰', 'zh-cn': '柯景腾', 'en': 'Ko Ching-teng' },
      description: { 'zh-tw': '調皮但溫柔的男生', 'zh-cn': '调皮但温柔的男生', 'en': 'Mischievous but gentle boy' },
      emoji: '🤓',
      personality: { 'zh-tw': '幽默、直率、有點笨拙但很真誠', 'zh-cn': '幽默、直率、有点笨拙但很真诚', 'en': 'Humorous, straightforward, a bit clumsy but sincere' }
    },
    female: {
      name: { 'zh-tw': '沈佳宜', 'zh-cn': '沈佳宜', 'en': 'Shen Chia-yi' },
      description: { 'zh-tw': '班上的模範生', 'zh-cn': '班上的模范生', 'en': 'Class model student' },
      emoji: '📚',
      personality: { 'zh-tw': '聰明、認真、有點害羞但很溫柔', 'zh-cn': '聪明、认真、有点害羞但很温柔', 'en': 'Smart, serious, a bit shy but very gentle' }
    }
  };

  const scenarios = [
    {
      id: 'note_passing',
      title: { 'zh-tw': '課堂傳紙條', 'zh-cn': '课堂传纸条', 'en': 'Passing Notes in Class' },
      description: { 'zh-tw': '在數學課上偷偷傳紙條...', 'zh-cn': '在数学课上偷偷传纸条...', 'en': 'Secretly passing notes in math class...' },
      background: {
        'zh-tw': '下午的數學課，陽光透過窗戶灑進教室。老師在黑板上寫著複雜的方程式，而你的心思卻完全不在數學上。坐在前排的她專心做筆記，你想要引起她的注意...',
        'zh-cn': '下午的数学课，阳光透过窗户洒进教室。老师在黑板上写着复杂的方程式，而你的心思却完全不在数学上。坐在前排的她专心做笔记，你想要引起她的注意...',
        'en': 'During afternoon math class, sunlight streams through the windows. The teacher writes complex equations on the blackboard, but your mind is not on math at all. She sits in the front row, taking notes seriously, and you want to get her attention...'
      },
      timeLimit: 45,
      minigames: ['note_writing', 'voice_chat'],
      objective: { 'zh-tw': '目標：成功傳遞紙條並開始對話', 'zh-cn': '目标：成功传递纸条并开始对话', 'en': 'Objective: Successfully pass a note and start a conversation' }
    },
    {
      id: 'library_study',
      title: { 'zh-tw': '圖書館唸書', 'zh-cn': '图书馆念书', 'en': 'Library Study Session' },
      description: { 'zh-tw': '期中考前的圖書館約會...', 'zh-cn': '期中考前的图书馆约会...', 'en': 'Library date before midterm exams...' },
      background: {
        'zh-tw': '期中考前一週，圖書館裡人潮洶湧。你們約好一起來複習，她帶了一堆參考書，而你...其實只是想多看她幾眼。安靜的環境讓每個小動作都顯得特別明顯。',
        'zh-cn': '期中考前一周，图书馆里人潮汹涌。你们约好一起来复习，她带了一堆参考书，而你...其实只是想多看她几眼。安静的环境让每个小动作都显得特别明显。',
        'en': 'One week before midterm exams, the library is crowded. You agreed to study together, she brought a pile of reference books, while you... actually just want to steal more glances at her. The quiet environment makes every small gesture particularly noticeable.'
      },
      timeLimit: 60,
      minigames: ['connections_game', 'voice_chat'],
      objective: { 'zh-tw': '目標：證明你的學習能力並加深友誼', 'zh-cn': '目标：证明你的学习能力并加深友谊', 'en': 'Objective: Prove your academic ability and deepen friendship' }
    },
    {
      id: 'school_festival',
      title: { 'zh-tw': '校慶園遊會', 'zh-cn': '校庆园游会', 'en': 'School Festival' },
      description: { 'zh-tw': '一年一度的校慶活動...', 'zh-cn': '一年一度的校庆活动...', 'en': 'Annual school festival activities...' },
      background: {
        'zh-tw': '校慶當天，整個校園充滿了歡樂的氣氛。各班都有攤位，你們班負責章魚燒攤位。她穿著可愛的圍裙幫忙，你負責招攬客人。這是個絕佳的機會，展現你的魅力！',
        'zh-cn': '校庆当天，整个校园充满了欢乐的气氛。各班都有摊位，你们班负责章鱼烧摊位。她穿着可爱的围裙帮忙，你负责招揽客人。这是个绝佳的机会，展现你的魅力！',
        'en': 'On the day of the school festival, the entire campus is filled with joyful atmosphere. Each class has a booth, and your class is in charge of the takoyaki stand. She helps out wearing a cute apron, while you\'re responsible for attracting customers. This is a perfect opportunity to show your charm!'
      },
      timeLimit: 50,
      minigames: ['festival_activities', 'voice_chat'],
      objective: { 'zh-tw': '目標：在校慶活動中創造美好回憶', 'zh-cn': '目标：在校庆活动中创造美好回忆', 'en': 'Objective: Create beautiful memories during the school festival' }
    }
  ];

  // Translation function
  const t = (textMap) => {
    if (typeof textMap === 'string') return textMap;
    return textMap[currentLanguage] || textMap['zh-tw'] || textMap;
  };

  // Navigation functions
  const goBackToLearn = () => {
    navigate('/learn');
  };

  const toggleLanguage = () => {
    const languages = ['zh-tw', 'zh-cn', 'en'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
  };

  // Timer management
  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      handleTimeUp();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, gameActive]);

  const handleTimeUp = () => {
    setGameActive(false);
    setCrushAffection(prev => Math.max(0, prev - 15));
    setMessageBox({
      isVisible: true,
      title: t({ 'zh-tw': '⏰ 時間到了！', 'zh-cn': '⏰ 时间到了！', 'en': '⏰ Time\'s Up!' }),
      message: t({ 'zh-tw': '你錯失了這次的機會，好感度下降了...', 'zh-cn': '你错失了这次的机会，好感度下降了...', 'en': 'You missed this opportunity, affection decreased...' }),
      type: 'warning'
    });
  };

  // Game flow functions
  const startScenario = (scenarioIndex) => {
    setCurrentScenario(scenarioIndex);
    setGamePhase('scenario-intro');
  };

  const startMinigame = (minigameType) => {
    setCurrentMinigame(minigameType);
    setGamePhase('gameplay');
    const scenario = scenarios[currentScenario];
    setTimeLeft(scenario.timeLimit);
    setGameActive(true);
  };

  const completeMinigame = (success, points = 0, resultMessage = '') => {
    setGameActive(false);
    clearTimeout(timerRef.current);
    
    const affectionChange = success ? 15 : -10;
    setCrushAffection(prev => Math.max(0, Math.min(100, prev + affectionChange)));
    setPlayerScore(prev => prev + points);
    setGameStats(prev => ({
      ...prev,
      scenariosCompleted: prev.scenariosCompleted + 1,
      correctAnswers: success ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalQuestions: prev.totalQuestions + 1
    }));

    setMessageBox({
      isVisible: true,
      title: success ? t({ 'zh-tw': '✨ 成功！', 'zh-cn': '✨ 成功！', 'en': '✨ Success!' }) : 
                     t({ 'zh-tw': '💔 失敗...', 'zh-cn': '💔 失败...', 'en': '💔 Failed...' }),
      message: resultMessage,
      type: success ? 'success' : 'error'
    });

    setTimeout(() => {
      setMessageBox({ isVisible: false, title: '', message: '', type: 'info' });
      if (gameStats.scenariosCompleted + 1 >= 2) {
        setGamePhase('ending');
      } else {
        setGamePhase('character-select');
      }
    }, 3000);
  };

  const resetGame = () => {
    setCrushAffection(50);
    setPlayerScore(0);
    setCurrentScenario(0);
    setChatHistory([]);
    setTimeLeft(0);
    setGameActive(false);
    setGameStats({
      correctAnswers: 0,
      totalQuestions: 0,
      notesExchanged: 0,
      teacherTroubles: 0,
      scenariosCompleted: 0
    });
    setMessageBox({ isVisible: false, title: '', message: '', type: 'info' });
    setGamePhase('intro');
    setSelectedCharacter(null);
    setCurrentMinigame(null);
  };

  const handleGoBack = () => {
    setGamePhase('scenario-intro');
    setCurrentMinigame(null);
    setGameActive(false);
    clearTimeout(timerRef.current);
  };

  const getMinigameTitle = (minigame) => {
    const titles = {
      note_writing: { 'zh-tw': '📝 傳紙條', 'zh-cn': '📝 传纸条', 'en': '📝 Pass Note' },
      connections_game: { 'zh-tw': '🧠 中文連線', 'zh-cn': '🧠 中文连线', 'en': '🧠 Chinese Connections' },
      voice_chat: { 'zh-tw': '💬 語音對話', 'zh-cn': '💬 语音对话', 'en': '💬 Voice Chat' },
      festival_activities: { 'zh-tw': '🎪 節慶活動', 'zh-cn': '🎪 节庆活动', 'en': '🎪 Festival Activities' },
      scripted_chat: { 'zh-tw': '🎬 劇本對話', 'zh-cn': '🎬 剧本对话', 'en': '🎬 Scripted Chat' }
    };
    return t(titles[minigame] || { 'zh-tw': '未知活動', 'zh-cn': '未知活动', 'en': 'Unknown Activity' });
  };

  // Render functions
  const renderIntro = () => (
    <div style={gameStyles.gameContainer}>
      {/* Back to Learn Page button */}
      <button 
        onClick={goBackToLearn} 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.9)',
          border: '1px solid #ddd',
          borderRadius: '25px',
          padding: '8px 16px',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        <ArrowLeft size={16} />
        {t({ 'zh-tw': '返回劇集選擇', 'zh-cn': '返回剧集选择', 'en': 'Back to Drama Selection' })}
      </button>

      <div style={gameStyles.introContent}>
        <div style={gameStyles.moviePoster}>🎬</div>
        <h1 style={gameStyles.gameTitle}>
          {t({ 'zh-tw': '那些年，我們一起追的女孩', 'zh-cn': '那些年，我们一起追的女孩', 'en': 'You Are the Apple of My Eye' })}
        </h1>
        <p style={gameStyles.gameSubtitle}>
          {t({ 'zh-tw': '校園戀愛互動遊戲 - 語音對話版', 'zh-cn': '校园恋爱互动游戏 - 语音对话版', 'en': 'School Romance Interactive Game - Voice Chat Edition' })}
        </p>
        <div style={gameStyles.introDescription}>
          {t({ 'zh-tw': '重溫那些青春歲月，體驗純真的校園戀愛。透過語音對話、傳紙條、問答挑戰等方式，和心儀的對象建立關係。每個選擇都會影響你們的故事結局！',
               'zh-cn': '重温那些青春岁月，体验纯真的校园恋爱。通过语音对话、传纸条、问答挑战等方式，和心仪的对象建立关系。每个选择都会影响你们的故事结局！',
               'en': 'Relive those youthful years and experience pure school romance. Build relationships with your crush through voice chat, note passing, and quiz challenges. Every choice affects your story ending!' })}
        </div>
        <div style={gameStyles.gameFeatures}>
          <div style={gameStyles.feature}>
            <Mic style={gameStyles.featureIcon} />
            <span>{t({ 'zh-tw': '語音對話', 'zh-cn': '语音对话', 'en': 'Voice Chat' })}</span>
          </div>
          <div style={gameStyles.feature}>
            <Clock style={gameStyles.featureIcon} />
            <span>{t({ 'zh-tw': '時間挑戰', 'zh-cn': '时间挑战', 'en': 'Time Challenge' })}</span>
          </div>
          <div style={gameStyles.feature}>
            <Heart style={gameStyles.featureIcon} />
            <span>{t({ 'zh-tw': '多重結局', 'zh-cn': '多重结局', 'en': 'Multiple Endings' })}</span>
          </div>
        </div>
        <button onClick={() => setGamePhase('character-select')} style={gameStyles.startButton}>
          {t({ 'zh-tw': '🎮 開始遊戲', 'zh-cn': '🎮 开始游戏', 'en': '🎮 Start Game' })}
        </button>
      </div>
    </div>
  );

  // ... (keep all other render functions the same as in your original file)
  // renderCharacterSelect, renderScenarioIntro, renderGameplay, renderEnding

  const renderCharacterSelect = () => (
    <div style={gameStyles.gameContainer}>
      <h2 style={gameStyles.sectionTitle}>{t({ 'zh-tw': '選擇你的角色', 'zh-cn': '选择你的角色', 'en': 'Choose Your Character' })}</h2>
      <div style={gameStyles.characterGrid}>
        {Object.entries(characters).map(([key, character]) => (
          <div
            key={key}
            onClick={() => setSelectedCharacter(key)}
            style={{
              ...gameStyles.characterCard,
              border: selectedCharacter === key ? '3px solid #e91e63' : '3px solid transparent'
            }}
          >
            <div style={gameStyles.characterEmoji}>{character.emoji}</div>
            <h3 style={gameStyles.characterName}>{t(character.name)}</h3>
            <p style={gameStyles.characterDescription}>{t(character.description)}</p>
            <p style={gameStyles.characterPersonality}>{t(character.personality)}</p>
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div style={gameStyles.scenarioSelection}>
          <h3>{t({ 'zh-tw': '選擇情境', 'zh-cn': '选择情境', 'en': 'Choose Scenario' })}</h3>
          <div style={gameStyles.scenarioGrid}>
            {scenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                onClick={() => startScenario(index)}
                style={gameStyles.scenarioCard}
              >
                <h4>{t(scenario.title)}</h4>
                <p>{t(scenario.description)}</p>
                <div style={gameStyles.scenarioInfo}>
                  <span><Clock size={16} /> {scenario.timeLimit}s</span>
                  <span><Star size={16} /> {scenario.minigames.length} {t({ 'zh-tw': '活動', 'zh-cn': '活动', 'en': 'activities' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderScenarioIntro = () => {
    const scenario = scenarios[currentScenario];
    return (
      <div style={gameStyles.gameContainer}>
        <div style={gameStyles.scenarioIntroCard}>
          <h2>{t(scenario.title)}</h2>
          <div style={gameStyles.scenarioBackground}>
            {t(scenario.background)}
          </div>
          <div style={gameStyles.scenarioDetails}>
            <div style={gameStyles.timeInfo}>
              <Clock size={20} />
              <span>{t({ 'zh-tw': '時間限制', 'zh-cn': '时间限制', 'en': 'Time Limit' })}: {scenario.timeLimit}{t({ 'zh-tw': '秒', 'zh-cn': '秒', 'en': 's' })}</span>
            </div>
            <div style={gameStyles.objectiveBox}>
              <Target size={20} />
              <span>{t(scenario.objective)}</span>
            </div>
          </div>
          <div style={gameStyles.minigameOptions}>
            <h3>{t({ 'zh-tw': '選擇你的行動', 'zh-cn': '选择你的行动', 'en': 'Choose Your Action' })}</h3>
            <div style={gameStyles.minigameButtons}>
              {scenario.minigames.map((minigame, index) => (
                <button
                  key={index}
                  onClick={() => startMinigame(minigame)}
                  style={gameStyles.minigameButton}
                >
                  {getMinigameTitle(minigame)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGameplay = () => {
    const crushCharacter = selectedCharacter === 'male' ? characters.female : characters.male;
    
    return (
      <div style={gameStyles.gameContainer}>
        <div style={gameStyles.gameHeader}>
          <div style={gameStyles.affectionContainer}>
            <h3>{t(crushCharacter.name)} {crushCharacter.emoji}</h3>
            <div style={gameStyles.affectionMeter}>
              <div style={{
                ...gameStyles.affectionFill,
                width: `${crushAffection}%`,
                backgroundColor: crushAffection >= 80 ? '#4caf50' : crushAffection >= 60 ? '#ff9800' : '#f44336'
              }}></div>
            </div>
            <div style={gameStyles.affectionText}>
              <Heart size={16} /> {crushAffection}%
            </div>
          </div>
          
          <div style={gameStyles.timerContainer}>
            <div style={{
              ...gameStyles.timer,
              color: timeLeft <= 10 ? '#f44336' : timeLeft <= 20 ? '#ff9800' : '#4caf50'
            }}>
              <Clock size={20} />
              {timeLeft}s
            </div>
          </div>
          
          <div style={gameStyles.scoreContainer}>
            <Star size={16} />
            <span>{playerScore} {t({ 'zh-tw': '分', 'zh-cn': '分', 'en': 'pts' })}</span>
          </div>
        </div>

        <div style={gameStyles.minigameArea}>
          <GameMinigames
            gameActive={gameActive}
            timeLeft={timeLeft}
            currentLanguage={currentLanguage}
            t={t}
            userInput={userInput}
            setUserInput={setUserInput}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            gameStats={gameStats}
            setGameStats={setGameStats}
            onComplete={completeMinigame}
            currentMinigame={currentMinigame}
            selectedCharacter={selectedCharacter}
            characters={characters}
            onGoBack={handleGoBack}
          />
        </div>
      </div>
    );
  };

  const renderEnding = () => {
    let endingType, endingMessage, endingEmoji;
    
    if (crushAffection >= 80) {
      endingType = { 'zh-tw': '💕 完美結局', 'zh-cn': '💕 完美结局', 'en': '💕 Perfect Ending' };
      endingMessage = { 'zh-tw': '你們成為了最佳情侶！', 'zh-cn': '你们成为了最佳情侣！', 'en': 'You became the perfect couple!' };
      endingEmoji = '🎉';
    } else if (crushAffection >= 60) {
      endingType = { 'zh-tw': '😊 好結局', 'zh-cn': '😊 好结局', 'en': '😊 Good Ending' };
      endingMessage = { 'zh-tw': '你們成為了好朋友！', 'zh-cn': '你们成为了好朋友！', 'en': 'You became good friends!' };
      endingEmoji = '🤝';
    } else {
      endingType = { 'zh-tw': '😔 普通結局', 'zh-cn': '😔 普通结局', 'en': '😔 Normal Ending' };
      endingMessage = { 'zh-tw': '還需要更多努力...', 'zh-cn': '还需要更多努力...', 'en': 'Need more effort...' };
      endingEmoji = '💪';
    }

    return (
      <div style={gameStyles.gameContainer}>
        <div style={gameStyles.endingCard}>
          <div style={gameStyles.endingEmoji}>{endingEmoji}</div>
          <h2 style={gameStyles.endingTitle}>{t(endingType)}</h2>
          <h3 style={gameStyles.endingMessage}>{t(endingMessage)}</h3>
          
          <div style={gameStyles.finalStats}>
            <div style={gameStyles.statItem}>
              <Heart size={20} />
              <span>{t({ 'zh-tw': '最終好感度', 'zh-cn': '最终好感度', 'en': 'Final Affection' })}: {crushAffection}%</span>
            </div>
            <div style={gameStyles.statItem}>
              <Star size={20} />
              <span>{t({ 'zh-tw': '總分數', 'zh-cn': '总分数', 'en': 'Total Score' })}: {playerScore}</span>
            </div>
            <div style={gameStyles.statItem}>
              <Users size={20} />
              <span>{t({ 'zh-tw': '完成情境', 'zh-cn': '完成情境', 'en': 'Scenarios Completed' })}: {gameStats.scenariosCompleted}</span>
            </div>
            <div style={gameStyles.statItem}>
              <BookOpen size={20} />
              <span>{t({ 'zh-tw': '正確答案', 'zh-cn': '正确答案', 'en': 'Correct Answers' })}: {gameStats.correctAnswers}/{gameStats.totalQuestions}</span>
            </div>
          </div>
          
          <button onClick={resetGame} style={gameStyles.playAgainButton}>
            {t({ 'zh-tw': '🔄 重新開始', 'zh-cn': '🔄 重新开始', 'en': '🔄 Play Again' })}
          </button>
          
          <button onClick={goBackToLearn} style={gameStyles.shareButton}>
            {t({ 'zh-tw': '返回劇集選擇', 'zh-cn': '返回剧集选择', 'en': 'Back to Drama Selection' })}
          </button>
        </div>
      </div>
    );
  };

  const MessageBox = () => {
    if (!messageBox.isVisible) return null;
    
    return (
      <div style={gameStyles.messageBoxOverlay}>
        <div style={{
          ...gameStyles.messageBoxContent,
          borderColor: messageBox.type === 'success' ? '#4caf50' : messageBox.type === 'error' ? '#f44336' : '#ff9800'
        }}>
          <h3 style={gameStyles.messageBoxTitle}>{messageBox.title}</h3>
          <p style={gameStyles.messageBoxMessage}>{messageBox.message}</p>
          <button 
            onClick={() => setMessageBox({ isVisible: false, title: '', message: '', type: 'info' })}
            style={gameStyles.messageBoxButton}
          >
            {t({ 'zh-tw': '確定', 'zh-cn': '确定', 'en': 'OK' })}
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (gamePhase) {
      case 'intro':
        return renderIntro();
      case 'character-select':
        return renderCharacterSelect();
      case 'scenario-intro':
        return renderScenarioIntro();
      case 'gameplay':
        return renderGameplay();
      case 'ending':
        return renderEnding();
      default:
        return renderIntro();
    }
  };

  return (
    <div style={gameStyles.gameContainer}>
      <button onClick={toggleLanguage} style={gameStyles.languageToggle}>
        {currentLanguage === 'zh-tw' ? '繁中' : 
         currentLanguage === 'zh-cn' ? '简中' : 'EN'} ⚙️
      </button>

      {renderContent()}

      <MessageBox />
    </div>
  );
};

export default RomancePage;