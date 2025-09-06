import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Heart, Clock, BookOpen, Users, Star, Play, Volume2 } from 'lucide-react';

// === MINIGAME STYLES ===
const minigameStyles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  hint: {
    background: '#e3f2fd',
    padding: '15px',
    borderRadius: '10px',
    margin: '15px 0',
    color: '#1976d2',
    fontWeight: 'bold'
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    resize: 'none',
    fontFamily: 'inherit',
    marginBottom: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  noteStats: {
    fontSize: '14px',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  submitButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
  },
  question: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: '20px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    color: '#333'
  },
  quizOptions: {
    display: 'grid',
    gap: '10px',
    marginTop: '20px'
  },
  quizOption: {
    background: '#f5f5f5',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    padding: '15px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  },
  chatHistory: {
    height: '200px',
    overflowY: 'auto',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    background: '#fafafa'
  },
  message: {
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '80%'
  },
  playerMessage: {
    background: '#e91e63',
    color: 'white',
    marginLeft: 'auto',
    textAlign: 'right'
  },
  crushMessage: {
    background: '#2196f3',
    color: 'white',
    marginRight: 'auto'
  },
  messageContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  voiceIcon: {
    width: '16px',
    height: '16px'
  },
  chatInputContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  chatInput: {
    flex: '1',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '16px',
    outline: 'none'
  },
  voiceButton: {
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  activitiesContainer: {
    display: 'grid',
    gap: '15px',
    marginTop: '20px'
  },
  activityButton: {
    background: 'white',
    border: '2px solid #e91e63',
    borderRadius: '15px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  activityChance: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px'
  }
};

// === MINIGAMES COMPONENT ===
const GameMinigames = ({
  gameActive,
  timeLeft,
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
  selectedCharacter,
  characters
}) => {
  const [noteContent, setNoteContent] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Quiz data
  const quizSets = {
    taiwan_culture: [
      {
        question: { 'zh-tw': '台灣最高的山是？', 'zh-cn': '台湾最高的山是？', 'en': 'What is the highest mountain in Taiwan?' },
        options: [
          { 'zh-tw': '玉山', 'zh-cn': '玉山', 'en': 'Yushan' },
          { 'zh-tw': '阿里山', 'zh-cn': '阿里山', 'en': 'Alishan' },
          { 'zh-tw': '合歡山', 'zh-cn': '合欢山', 'en': 'Hehuan Mountain' }
        ],
        correct: 0
      },
      {
        question: { 'zh-tw': '台灣的國花是？', 'zh-cn': '台湾的国花是？', 'en': 'What is Taiwan\'s national flower?' },
        options: [
          { 'zh-tw': '櫻花', 'zh-cn': '樱花', 'en': 'Cherry Blossom' },
          { 'zh-tw': '梅花', 'zh-cn': '梅花', 'en': 'Plum Blossom' },
          { 'zh-tw': '蘭花', 'zh-cn': '兰花', 'en': 'Orchid' }
        ],
        correct: 1
      }
    ],
    math: [
      {
        question: { 'zh-tw': '2x + 5 = 13，x = ?', 'zh-cn': '2x + 5 = 13，x = ?', 'en': '2x + 5 = 13, x = ?' },
        options: ['4', '8', '3'],
        correct: 0
      },
      {
        question: { 'zh-tw': '√64 = ?', 'zh-cn': '√64 = ?', 'en': '√64 = ?' },
        options: ['6', '8', '10'],
        correct: 1
      }
    ]
  };

  // Initialize quiz on mount
  useEffect(() => {
    if (currentMinigame === 'quiz_battle' && !currentQuiz) {
      const allQuestions = [...quizSets.taiwan_culture, ...quizSets.math];
      const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      setCurrentQuiz(randomQuestion);
    }
  }, [currentMinigame]);

  // Speech Recognition
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t({ 'zh-tw': '您的瀏覽器不支援語音輸入', 'zh-cn': '您的浏览器不支持语音输入', 'en': 'Your browser doesn\'t support voice input' }));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = currentLanguage === 'zh-tw' ? 'zh-TW' :
      currentLanguage === 'zh-cn' ? 'zh-CN' : 'en-US';
    recognition.interimResults = false;

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert(t({ 'zh-tw': '語音輸入失敗', 'zh-cn': '语音输入失败', 'en': 'Voice input failed' }));
    };

    recognition.onend = () => setIsRecording(false);
  };

  // AI Response Generator
  const generateAIResponse = (userMessage) => {
    const responses = {
      positive: [
        { 'zh-tw': '真的嗎？你好有趣呢！', 'zh-cn': '真的吗？你好有趣呢！', 'en': 'Really? You\'re so interesting!' },
        { 'zh-tw': '哈哈，你總是能讓我笑', 'zh-cn': '哈哈，你总是能让我笑', 'en': 'Haha, you always make me laugh' },
        { 'zh-tw': '你說話好幽默', 'zh-cn': '你说话好幽默', 'en': 'You\'re so funny when you talk' },
        { 'zh-tw': '我也這麼想！', 'zh-cn': '我也这么想！', 'en': 'I think so too!' }
      ],
      neutral: [
        { 'zh-tw': '這樣啊...', 'zh-cn': '这样啊...', 'en': 'I see...' },
        { 'zh-tw': '嗯嗯，然後呢？', 'zh-cn': '嗯嗯，然后呢？', 'en': 'Mm-hmm, and then?' },
        { 'zh-tw': '你覺得呢？', 'zh-cn': '你觉得呢？', 'en': 'What do you think?' }
      ],
      shy: [
        { 'zh-tw': '你...你幹嘛這樣說', 'zh-cn': '你...你干嘛这样说', 'en': 'Why... why do you say that' },
        { 'zh-tw': '臉紅了啦...', 'zh-cn': '脸红了啦...', 'en': 'I\'m blushing...' }
      ]
    };

    let responseType = 'neutral';
    if (userMessage.length > 20 && (userMessage.includes('喜歡') || userMessage.includes('漂亮') || userMessage.includes('可愛'))) {
      responseType = 'shy';
    } else if (userMessage.length > 15 && userMessage.includes('?')) {
      responseType = 'positive';
    }

    const responseArray = responses[responseType];
    const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
    return t(randomResponse);
  };

  // Note Writing Minigame
  const NoteWritingGame = () => {
    const handleSubmit = () => {
      const hasGoodLength = noteContent.length >= 15 && noteContent.length <= 60;
      const hasNoKeywords = !noteContent.includes('考試') && !noteContent.includes('老師');
      const success = hasGoodLength && hasNoKeywords;
      const points = success ? 100 : 20;

      setGameStats(prev => ({ ...prev, notesExchanged: prev.notesExchanged + 1 }));
      onComplete(success, points, success ?
        t({ 'zh-tw': '她偷偷笑了，看起來很開心！', 'zh-cn': '她偷偷笑了，看起来很开心！', 'en': 'She smiled secretly and looks happy!' }) :
        t({ 'zh-tw': '老師發現了，沒收了紙條...', 'zh-cn': '老师发现了，没收了纸条...', 'en': 'Teacher noticed and confiscated the note...' })
      );
    };

    return (
      <div style={minigameStyles.container}>
        <h3>{t({ 'zh-tw': '寫紙條給心儀的人', 'zh-cn': '写纸条给心仪的人', 'en': 'Write a Note to Your Crush' })}</h3>
        <div style={minigameStyles.hint}>
          {t({ 'zh-tw': '💡 提示：寫15-60字，避免提到考試或老師！', 'zh-cn': '💡 提示：写15-60字，避免提到考试或老师！', 'en': '💡 Hint: Write 15-60 characters, avoid mentioning exams or teachers!' })}
        </div>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder={t({ 'zh-tw': '寫下你想對她/他說的話...', 'zh-cn': '写下你想对她/他说的话...', 'en': 'Write what you want to say to her/him...' })}
          disabled={!gameActive}
          style={minigameStyles.textarea}
        />
        <div style={minigameStyles.noteStats}>
          <span style={{ color: noteContent.length < 15 ? '#f44336' : noteContent.length > 60 ? '#ff9800' : '#4caf50' }}>
            {t({ 'zh-tw': '字數', 'zh-cn': '字数', 'en': 'Characters' })}: {noteContent.length}/60
          </span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!gameActive || noteContent.length === 0}
          style={minigameStyles.submitButton}
        >
          {t({ 'zh-tw': '📝 偷偷傳紙條', 'zh-cn': '📝 偷偷传纸条', 'en': '📝 Pass Note Secretly' })}
        </button>
      </div>
    );
  };

  // Quiz Battle Minigame
  const QuizBattleGame = () => {
    const handleAnswer = (answerIndex) => {
      const correct = answerIndex === currentQuiz.correct;
      const points = correct ? 150 : 50;
      setShowResult(true);

      setTimeout(() => {
        onComplete(correct, points, correct ?
          t({ 'zh-tw': '她對你的知識感到佩服！', 'zh-cn': '她对你的知识感到佩服！', 'en': 'She\'s impressed by your knowledge!' }) :
          t({ 'zh-tw': '她溫柔地搖搖頭，但還是微笑了', 'zh-cn': '她温柔地摇摇头，但还是微笑了', 'en': 'She shakes her head gently but still smiles' })
        );
      }, 1500);
    };

    if (!currentQuiz) return <div>Loading...</div>;

    return (
      <div style={minigameStyles.container}>
        <h3>{t({ 'zh-tw': '📚 知識問答挑戰', 'zh-cn': '📚 知识问答挑战', 'en': '📚 Knowledge Quiz Challenge' })}</h3>
        <div style={minigameStyles.question}>
          {t(currentQuiz.question)}
        </div>
        <div style={minigameStyles.quizOptions}>
          {currentQuiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={!gameActive || showResult}
              style={minigameStyles.quizOption}
            >
              {String.fromCharCode(65 + index)}. {t(option)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Voice Chat Minigame
  const VoiceChatGame = () => {
    const handleSendMessage = () => {
      if (!userInput.trim()) return;

      const newMessage = {
        id: Date.now(),
        sender: 'player',
        content: userInput,
        isVoice: false,
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, newMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          sender: 'crush',
          content: generateAIResponse(userInput),
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }, 1000);

      const messageValue = userInput;
      setUserInput('');

      // Success based on message quality and length
      const hasQuestion = messageValue.includes('?') || messageValue.includes('嗎') || messageValue.includes('吗');
      const goodLength = messageValue.length > 10 && messageValue.length < 100;
      const success = hasQuestion && goodLength;

      setTimeout(() => {
        onComplete(success, success ? 120 : 80, success ?
          t({ 'zh-tw': '對話很愉快，你們越聊越投機！', 'zh-cn': '对话很愉快，你们越聊越投机！', 'en': 'Great conversation, you\'re getting along well!' }) :
          t({ 'zh-tw': '對話還不錯，但還能更好', 'zh-cn': '对话还不错，但还能更好', 'en': 'The conversation was okay, but could be better' })
        );
      }, 3000);
    };

    return (
      <div style={minigameStyles.container}>
        <h3>{t({ 'zh-tw': '💬 對話時間', 'zh-cn': '💬 对话时间', 'en': '💬 Chat Time' })}</h3>
        <div style={minigameStyles.chatHistory}>
          {chatHistory.slice(-6).map(message => (
            <div key={message.id} style={{
              ...minigameStyles.message,
              ...(message.sender === 'player' ? minigameStyles.playerMessage : minigameStyles.crushMessage)
            }}>
              <div style={minigameStyles.messageContent}>
                {message.isVoice && <Mic style={minigameStyles.voiceIcon} />}
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div style={minigameStyles.chatInputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t({ 'zh-tw': '說些什麼... (試著問問題！)', 'zh-cn': '说些什么... (试着问问题！)', 'en': 'Say something... (Try asking questions!)' })}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={!gameActive}
            style={minigameStyles.chatInput}
          />
          <button
            onClick={startVoiceInput}
            disabled={!gameActive || isRecording}
            style={{ ...minigameStyles.voiceButton, backgroundColor: isRecording ? '#ff5722' : '#2196f3' }}
          >
            {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!gameActive || !userInput.trim()}
            style={minigameStyles.sendButton}
          >
            {t({ 'zh-tw': '發送', 'zh-cn': '发送', 'en': 'Send' })}
          </button>
        </div>
      </div>
    );
  };

  // Festival Activities Minigame
  const FestivalActivitiesGame = () => {
    const activities = [
      {
        name: { 'zh-tw': '一起逛攤位', 'zh-cn': '一起逛摊位', 'en': 'Browse Stalls Together' },
        success: 70,
        points: 80
      },
      {
        name: { 'zh-tw': '邀請吃章魚燒', 'zh-cn': '邀请吃章鱼烧', 'en': 'Invite to Eat Takoyaki' },
        success: 80,
        points: 120
      },
      {
        name: { 'zh-tw': '一起玩遊戲攤', 'zh-cn': '一起玩游戏摊', 'en': 'Play Games Together' },
        success: 60,
        points: 100
      }
    ];

    const handleActivity = (activity) => {
      const success = Math.random() * 100 < activity.success;
      onComplete(success, activity.points, success ?
        t({ 'zh-tw': `${t(activity.name)}很成功！她看起來很開心`, 'zh-cn': `${t(activity.name)}很成功！她看起来很开心`, 'en': `${t(activity.name)} was successful! She looks happy` }) :
        t({ 'zh-tw': '有點尷尬，但她還是很友善', 'zh-cn': '有点尴尬，但她还是很友善', 'en': 'A bit awkward, but she\'s still friendly' })
      );
    };

    return (
      <div style={minigameStyles.container}>
        <h3>{t({ 'zh-tw': '🎪 選擇校慶活動', 'zh-cn': '🎪 选择校庆活动', 'en': '🎪 Choose Festival Activity' })}</h3>
        <div style={minigameStyles.activitiesContainer}>
          {activities.map((activity, index) => (
            <button
              key={index}
              onClick={() => handleActivity(activity)}
              disabled={!gameActive}
              style={minigameStyles.activityButton}
            >
              <div>{t(activity.name)}</div>
              <div style={minigameStyles.activityChance}>
                {t({ 'zh-tw': '成功率', 'zh-cn': '成功率', 'en': 'Success Rate' })}: {activity.success}%
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render based on current minigame
  switch (currentMinigame) {
    case 'note_writing':
      return <NoteWritingGame />;
    case 'quiz_battle':
      return <QuizBattleGame />;
    case 'voice_chat':
      return <VoiceChatGame />;
    case 'festival_activities':
      return <FestivalActivitiesGame />;
    default:
      return <div>Minigame not found</div>;
  }
};

// === MAIN GAME COMPONENT ===
const EnhancedRomanceGame = () => {
  // === Game State Management ===
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

  // === Refs ===
  const timerRef = useRef(null);

  // === Game Data ===
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
        'en': 'A week before midterms, the library is packed. You agreed to study together. She brought a stack of reference books, and you... well, you just wanted to see her more. In this quiet environment, every little action feels especially noticeable.'
      },
      timeLimit: 60,
      minigames: ['quiz_battle'],
      objective: { 'zh-tw': '目標：在問答挑戰中取得好成績', 'zh-cn': '目标：在问答挑战中取得好成绩', 'en': 'Objective: Do well in the quiz challenge' }
    },
    {
      id: 'school_festival',
      title: { 'zh-tw': '校慶園遊會', 'zh-cn': '校庆园游会', 'en': 'School Festival' },
      description: { 'zh-tw': '熱鬧的校慶日，難得的單獨相處時間', 'zh-cn': '热闹的校庆日，难得的单独相处时间', 'en': 'A lively school festival, rare alone time' },
      background: {
        'zh-tw': '今天是學校的園遊會，整個校園充滿了歡樂的氣氛。你們一起逛著攤位，耳邊傳來陣陣歡笑聲和廣播。這是個展現你魅力，讓你們感情升溫的好機會！',
        'zh-cn': '今天是学校的园游会，整个校园充满了欢乐的气氛。你们一起逛着摊位，耳边传来阵阵欢笑声和广播。这是个展现你魅力，让你们感情升温的好机会！',
        'en': 'It\'s the school festival today, and the campus is filled with a festive atmosphere. You are walking through the stalls together, surrounded by laughter and announcements. This is a great chance to show your charm and let your relationship heat up!'
      },
      timeLimit: 75,
      minigames: ['festival_activities', 'voice_chat'],
      objective: { 'zh-tw': '目標：和她一起完成活動，增加好感度', 'zh-cn': '目标：和她一起完成活动，增加好感度', 'en': 'Objective: Complete activities with her to increase affection' }
    }
  ];

  // === Translation Helper Function ===
  const t = (textObject) => {
    return textObject[currentLanguage] || textObject.en;
  };

  // === Timers and Game Flow ===
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      handleMinigameComplete(false, 0, t({
        'zh-tw': '時間到了，機會溜走了...',
        'zh-cn': '时间到了，机会溜走了...',
        'en': 'Time is up, the opportunity slipped away...'
      }));
    }
    return () => clearTimeout(timerRef.current);
  }, [gameActive, timeLeft]);

  // === Game Functions ===
  const handleCharacterSelect = (gender) => {
    setSelectedCharacter(characters[gender]);
    setGamePhase('story');
    setGameStats(prev => ({ ...prev, scenariosCompleted: 0 }));
    setCrushAffection(50);
    setPlayerScore(0);
    setCurrentScenario(0);
  };

  const startNextScenario = () => {
    if (currentScenario < scenarios.length) {
      const scenario = scenarios[currentScenario];
      setGamePhase('scenario_start');
      setCurrentMinigame(null);
      setGameActive(false);
      setTimeLeft(scenario.timeLimit);
    } else {
      setGamePhase('end');
    }
  };

  const startGameRound = () => {
    setGamePhase('minigame');
    const scenario = scenarios[currentScenario];
    const randomMinigame = scenario.minigames[Math.floor(Math.random() * scenario.minigames.length)];
    setCurrentMinigame(randomMinigame);
    setGameActive(true);
    setMessageBox({ isVisible: false, message: '' });
  };

  const handleMinigameComplete = (success, points, message) => {
    setGameActive(false);
    clearTimeout(timerRef.current);

    const scoreGain = success ? points : 0;
    const affectionChange = success ? points / 10 : -points / 20;

    setPlayerScore(prev => prev + scoreGain);
    setCrushAffection(prev => Math.max(0, Math.min(100, prev + affectionChange)));
    setGameStats(prev => ({ ...prev, scenariosCompleted: prev.scenariosCompleted + 1 }));

    setMessageBox({
      isVisible: true,
      title: success ? t({ 'zh-tw': '成功！', 'zh-cn': '成功！', 'en': 'Success!' }) : t({ 'zh-tw': '失敗...', 'zh-cn': '失败...', 'en': 'Failed...' }),
      message: message,
      type: success ? 'success' : 'error'
    });
  };

  const handleMessageBoxClose = () => {
    setMessageBox({ isVisible: false, message: '' });
    if (crushAffection >= 80) {
      setGamePhase('victory');
    } else if (crushAffection <= 20) {
      setGamePhase('defeat');
    } else {
      setCurrentScenario(prev => prev + 1);
      startNextScenario();
    }
  };

  // === JSX Rendering ===
  const renderGameContent = () => {
    switch (gamePhase) {
      case 'intro':
        return (
          <div style={containerStyle}>
            <h2>{t({ 'zh-tw': '選擇你的校園偶像', 'zh-cn': '选择你的校园偶像', 'en': 'Choose Your Campus Idol' })}</h2>
            <div style={flexContainerStyle}>
              <div style={characterCardStyle} onClick={() => handleCharacterSelect('female')}>
                <span style={emojiStyle}>{characters.female.emoji}</span>
                <h3>{t(characters.female.name)}</h3>
                <p>{t(characters.female.description)}</p>
              </div>
              <div style={characterCardStyle} onClick={() => handleCharacterSelect('male')}>
                <span style={emojiStyle}>{characters.male.emoji}</span>
                <h3>{t(characters.male.name)}</h3>
                <p>{t(characters.male.description)}</p>
              </div>
            </div>
            <div style={languageSelectorStyle}>
              <button style={languageButtonStyle} onClick={() => setCurrentLanguage('zh-tw')}>繁體中文</button>
              <button style={languageButtonStyle} onClick={() => setCurrentLanguage('zh-cn')}>简体中文</button>
              <button style={languageButtonStyle} onClick={() => setCurrentLanguage('en')}>English</button>
            </div>
          </div>
        );

      case 'story':
        const currentStoryScenario = scenarios[currentScenario];
        if (!currentStoryScenario) return <div>{t({ 'zh-tw': '遊戲結束', 'zh-cn': '游戏结束', 'en': 'Game Over' })}</div>;
        return (
          <div style={containerStyle}>
            <h2>{t(currentStoryScenario.title)}</h2>
            <div style={storyPanelStyle}>
              <p>{t(currentStoryScenario.background)}</p>
              <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{t(currentStoryScenario.objective)}</p>
            </div>
            <button style={actionButtonStyle} onClick={startGameRound}>
              {t({ 'zh-tw': '開始行動', 'zh-cn': '开始行动', 'en': 'Start Action' })}
            </button>
          </div>
        );

      case 'minigame':
        const scenario = scenarios[currentScenario];
        return (
          <div style={containerStyle}>
            <div style={headerStyle}>
              <div style={statItemStyle}>
                <Clock size={16} style={{ verticalAlign: 'middle' }} /> {t({ 'zh-tw': '剩餘時間', 'zh-cn': '剩余时间', 'en': 'Time Left' })}: {timeLeft}s
              </div>
              <div style={statItemStyle}>
                <Star size={16} style={{ verticalAlign: 'middle' }} /> {t({ 'zh-tw': '好感度', 'zh-cn': '好感度', 'en': 'Affection' })}: {crushAffection}
              </div>
            </div>
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
              onComplete={handleMinigameComplete}
              currentMinigame={currentMinigame}
              selectedCharacter={selectedCharacter}
              characters={characters}
            />
          </div>
        );

      case 'victory':
        return (
          <div style={containerStyle}>
            <div style={resultPanelStyle}>
              <span style={emojiStyle}>💖</span>
              <h2>{t({ 'zh-tw': '恭喜！你們的關係更進一步！', 'zh-cn': '恭喜！你们的关系更进一步！', 'en': 'Congratulations! Your relationship has progressed!' })}</h2>
              <p>{t({ 'zh-tw': '你們的努力得到了回報。好感度達到了80分！', 'zh-cn': '你们的努力得到了回报。好感度达到了80分！', 'en': 'Your efforts have paid off. Affection reached 80!' })}</p>
              <button style={actionButtonStyle} onClick={() => setGamePhase('end')}>
                {t({ 'zh-tw': '繼續下一天', 'zh-cn': '继续下一天', 'en': 'Continue to the next day' })}
              </button>
            </div>
          </div>
        );

      case 'defeat':
        return (
          <div style={containerStyle}>
            <div style={resultPanelStyle}>
              <span style={emojiStyle}>💔</span>
              <h2>{t({ 'zh-tw': '遺憾，你們的關係有些疏遠了...', 'zh-cn': '遗憾，你们的关系有些疏远了...', 'en': 'Unfortunately, your relationship has become distant...' })}</h2>
              <p>{t({ 'zh-tw': '好感度下降到20分。你需要更小心地應對。', 'zh-cn': '好感度下降到20分。你需要更小心地应对。', 'en': 'Affection dropped to 20. You need to be more careful.' })}</p>
              <button style={actionButtonStyle} onClick={() => setGamePhase('end')}>
                {t({ 'zh-tw': '結束這段故事', 'zh-cn': '结束这段故事', 'en': 'End this story' })}
              </button>
            </div>
          </div>
        );

      case 'end':
        return (
          <div style={containerStyle}>
            <div style={resultPanelStyle}>
              <h2>{t({ 'zh-tw': '故事完結', 'zh-cn': '故事完结', 'en': 'Story Concluded' })}</h2>
              <p style={{ marginTop: '20px' }}>
                {t({ 'zh-tw': '你與', 'zh-cn': '你与', 'en': 'Your journey with ' })}
                <span style={{ color: '#e91e63', fontWeight: 'bold' }}>{t(selectedCharacter.name)}</span>
                {t({ 'zh-tw': '的故事告一段落。', 'zh-cn': '的故事告一段落。', 'en': ' has come to an end.' })}
              </p>
              <div style={finalStatsStyle}>
                <div style={statItemStyle}><Heart size={16} /> {t({ 'zh-tw': '最終好感度', 'zh-cn': '最终好感度', 'en': 'Final Affection' })}: {crushAffection}</div>
                <div style={statItemStyle}><Star size={16} /> {t({ 'zh-tw': '最終分數', 'zh-cn': '最终分数', 'en': 'Final Score' })}: {playerScore}</div>
                <div style={statItemStyle}><BookOpen size={16} /> {t({ 'zh-tw': '完成場景', 'zh-cn': '完成场景', 'en': 'Scenarios Completed' })}: {gameStats.scenariosCompleted}/{scenarios.length}</div>
              </div>
              <button style={actionButtonStyle} onClick={() => setGamePhase('intro')}>
                {t({ 'zh-tw': '重新開始', 'zh-cn': '重新开始', 'en': 'Restart' })}
              </button>
            </div>
          </div>
        );

      default:
        return <div>{t({ 'zh-tw': '加載中...', 'zh-cn': '加载中...', 'en': 'Loading...' })}</div>;
    }
  };

  return (
    <div style={appContainerStyle}>
      {renderGameContent()}

      {/* Message Box */}
      {messageBox.isVisible && (
        <div style={messageBoxOverlayStyle}>
          <div style={messageBoxContentStyle}>
            <span style={messageBoxIconStyle}>{messageBox.type === 'success' ? '✅' : '❌'}</span>
            <h3>{messageBox.title}</h3>
            <p>{messageBox.message}</p>
            <button style={closeButton} onClick={handleMessageBoxClose}>
              {t({ 'zh-tw': '確定', 'zh-cn': '确定', 'en': 'OK' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// === STYLES ===
const appContainerStyle = {
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
  backgroundColor: '#f0f4f8',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#333'
};

const containerStyle = {
  maxWidth: '800px',
  width: '90%',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  margin: '20px'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '20px',
  fontSize: '1.2rem',
  color: '#555'
};

const statItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const flexContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '30px'
};

const characterCardStyle = {
  padding: '30px',
  border: '2px solid #e91e63',
  borderRadius: '15px',
  cursor: 'pointer',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(233, 30, 99, 0.2)'
  }
};

const emojiStyle = {
  fontSize: '3rem',
  marginBottom: '10px'
};

const languageSelectorStyle = {
  marginTop: '30px'
};

const languageButtonStyle = {
  background: '#e0e0e0',
  border: 'none',
  padding: '8px 15px',
  margin: '0 5px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background 0.3s',
  '&:hover': {
    background: '#d0d0d0'
  }
};

const actionButtonStyle = {
  background: '#e91e63',
  color: 'white',
  border: 'none',
  padding: '15px 30px',
  borderRadius: '25px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '30px',
  boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
  transition: 'transform 0.3s, box-shadow 0.3s'
};

const storyPanelStyle = {
  background: '#f8f9fa',
  padding: '25px',
  borderRadius: '15px',
  textAlign: 'left',
  lineHeight: '1.6'
};

const resultPanelStyle = {
  padding: '30px',
  backgroundColor: '#f8f9fa',
  borderRadius: '20px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
};

const finalStatsStyle = {
  marginTop: '25px',
  display: 'grid',
  gap: '10px',
  textAlign: 'left'
};

const messageBoxOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000'
};

const messageBoxContentStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '15px',
  textAlign: 'center',
  maxWidth: '400px',
  boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)'
};

const messageBoxIconStyle = {
  fontSize: '3rem',
  marginBottom: '15px'
};

const closeButton = {
  background: '#e91e63',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '20px',
  marginTop: '20px',
  cursor: 'pointer'
};

export default EnhancedRomanceGame;