import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Heart, Clock, BookOpen, Users, Star, Play, Volume2 } from 'lucide-react';

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
      },
      {
        question: { 'zh-tw': '夜市最有名的小吃是？', 'zh-cn': '夜市最有名的小吃是？', 'en': 'What\'s the most famous night market snack?' },
        options: [
          { 'zh-tw': '珍珠奶茶', 'zh-cn': '珍珠奶茶', 'en': 'Bubble Tea' },
          { 'zh-tw': '臭豆腐', 'zh-cn': '臭豆腐', 'en': 'Stinky Tofu' },
          { 'zh-tw': '小籠包', 'zh-cn': '小笼包', 'en': 'Xiaolongbao' }
        ],
        correct: 1
      }
    ],
    movie_trivia: [
      {
        question: { 'zh-tw': '電影《那些年》的導演是？', 'zh-cn': '电影《那些年》的导演是？', 'en': 'Who directed "You Are the Apple of My Eye"?' },
        options: [
          { 'zh-tw': '九把刀', 'zh-cn': '九把刀', 'en': 'Giddens Ko' },
          { 'zh-tw': '魏德聖', 'zh-cn': '魏德圣', 'en': 'Wei Te-sheng' },
          { 'zh-tw': '李安', 'zh-cn': '李安', 'en': 'Ang Lee' }
        ],
        correct: 0
      },
      {
        question: { 'zh-tw': '電影中男主角的名字是？', 'zh-cn': '电影中男主角的名字是？', 'en': 'What\'s the male protagonist\'s name in the movie?' },
        options: [
          { 'zh-tw': '柯景騰', 'zh-cn': '柯景腾', 'en': 'Ko Ching-teng' },
          { 'zh-tw': '沈佳宜', 'zh-cn': '沈佳宜', 'en': 'Shen Chia-yi' },
          { 'zh-tw': '謝明和', 'zh-cn': '谢明和', 'en': 'Xie Ming-he' }
        ],
        correct: 0
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
    const crushCharacter = selectedCharacter === 'male' ? characters.female : characters.male;
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
    const [noteContent, setNoteContent] = useState('');
    
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
      <div style={styles.minigameContainer}>
        <h3>{t({ 'zh-tw': '寫紙條給心儀的人', 'zh-cn': '写纸条给心仪的人', 'en': 'Write a Note to Your Crush' })}</h3>
        <div style={styles.hint}>
          {t({ 'zh-tw': '💡 提示：寫15-60字，避免提到考試或老師！', 'zh-cn': '💡 提示：写15-60字，避免提到考试或老师！', 'en': '💡 Hint: Write 15-60 characters, avoid mentioning exams or teachers!' })}
        </div>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder={t({ 'zh-tw': '寫下你想對她/他說的話...', 'zh-cn': '写下你想对她/他说的话...', 'en': 'Write what you want to say to her/him...' })}
          disabled={!gameActive}
          style={styles.textarea}
        />
        <div style={styles.noteStats}>
          <span style={{color: noteContent.length < 15 ? '#f44336' : noteContent.length > 60 ? '#ff9800' : '#4caf50'}}>
            {t({ 'zh-tw': '字數', 'zh-cn': '字数', 'en': 'Characters' })}: {noteContent.length}/60
          </span>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={!gameActive || noteContent.length === 0}
          style={styles.submitButton}
        >
          {t({ 'zh-tw': '📝 偷偷傳紙條', 'zh-cn': '📝 偷偷传纸条', 'en': '📝 Pass Note Secretly' })}
        </button>
      </div>
    );
  };

  // Quiz Battle Minigame
  const QuizBattleGame = () => {
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [showResult, setShowResult] = useState(false);
    
    useEffect(() => {
      const allQuestions = [...quizSets.taiwan_culture, ...quizSets.movie_trivia, ...quizSets.math];
      const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      setCurrentQuiz(randomQuestion);
    }, []);

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
      <div style={minigameStyles.minigameContainer}>
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
      <div style={minigameStyles.minigameContainer}>
        <h3>{t({ 'zh-tw': '💬 對話時間', 'zh-cn': '💬 对话时间', 'en': '💬 Chat Time' })}</h3>
        <div style={minigameStyles.chatHistory}>
          {chatHistory.slice(-6).map(message => (
            <div key={message.id} style={{...minigameStyles.message, ...minigameStyles[message.sender]}}>
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
            style={{...minigameStyles.voiceButton, backgroundColor: isRecording ? '#ff5722' : '#2196f3'}}
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
      <div style={minigameStyles.minigameContainer}>
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
      emoji: '🏀',
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
      minigames: ['note_writing', 'voice_chat']
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
      minigames: ['quiz_battle', 'voice_chat']
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
      minigames: ['festival_activities', 'voice_chat']
    }
  ];

  // === Translation Function ===
  const t = (textMap) => {
    if (typeof textMap === 'string') return textMap;
    return textMap[currentLanguage] || textMap['zh-tw'] || textMap;
  };

  // === Language Toggle ===
  const toggleLanguage = () => {
    const languages = ['zh-tw', 'zh-cn', 'en'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
  };

  // === Timer Management ===
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

  // === Game Flow Functions ===
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
      if (gameStats.scenariosCompleted >= 2) {
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
  };

  // === Render Functions ===
  const renderIntro = () => (
    <div style={styles.gameContainer}>
      <div style={styles.introContent}>
        <div style={styles.moviePoster}>🎬</div>
        <h1 style={styles.gameTitle}>
          {t({ 'zh-tw': '那些年，我們一起追的女孩', 'zh-cn': '那些年，我们一起追的女孩', 'en': 'You Are the Apple of My Eye' })}
        </h1>
        <p style={styles.gameSubtitle}>
          {t({ 'zh-tw': '校園戀愛互動遊戲 - 語音對話版', 'zh-cn': '校园恋爱互动游戏 - 语音对话版', 'en': 'School Romance Interactive Game - Voice Chat Edition' })}
        </p>
        <div style={styles.introDescription}>
          {t({ 'zh-tw': '重溫那些青春歲月，體驗純真的校園戀愛。透過語音對話、傳紙條、問答挑戰等方式，和心儀的對象建立關係。每個選擇都會影響你們的故事結局！', 
               'zh-cn': '重温那些青春岁月，体验纯真的校园恋爱。通过语音对话、传纸条、问答挑战等方式，和心仪的对象建立关系。每个选择都会影响你们的故事结局！',
               'en': 'Relive those youthful years and experience pure school romance. Build relationships with your crush through voice chat, note passing, and quiz challenges. Every choice affects your story ending!' })}
        </div>
        <div style={styles.gameFeatures}>
          <div style={styles.feature}>
            <Mic style={styles.featureIcon} />
            <span>{t({ 'zh-tw': '語音對話', 'zh-cn': '语音对话', 'en': 'Voice Chat' })}</span>
          </div>
          <div style={styles.feature}>
            <Clock style={styles.featureIcon} />
            <span>{t({ 'zh-tw': '時間挑戰', 'zh-cn': '时间挑战', 'en': 'Time Challenge' })}</span>
          </div>
          <div style={styles.feature}>
            <Heart style={styles.featureIcon} />
            <span>{t({ 'zh-tw': '多重結局', 'zh-cn': '多重结局', 'en': 'Multiple Endings' })}</span>
          </div>
        </div>
        <button onClick={() => setGamePhase('character-select')} style={styles.startButton}>
          {t({ 'zh-tw': '🎮 開始遊戲', 'zh-cn': '🎮 开始游戏', 'en': '🎮 Start Game' })}
        </button>
      </div>
    </div>
  );

  const renderCharacterSelect = () => (
    <div style={styles.gameContainer}>
      <h2 style={styles.sectionTitle}>{t({ 'zh-tw': '選擇你的角色', 'zh-cn': '选择你的角色', 'en': 'Choose Your Character' })}</h2>
      <div style={styles.characterGrid}>
        {Object.entries(characters).map(([key, character]) => (
          <div
            key={key}
            onClick={() => setSelectedCharacter(key)}
            style={{
              ...styles.characterCard,
              border: selectedCharacter === key ? '3px solid #e91e63' : '3px solid transparent'
            }}
          >
            <div style={styles.characterEmoji}>{character.emoji}</div>
            <h3 style={styles.characterName}>{t(character.name)}</h3>
            <p style={styles.characterDescription}>{t(character.description)}</p>
            <p style={styles.characterPersonality}>{t(character.personality)}</p>
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div style={styles.scenarioSelection}>
          <h3>{t({ 'zh-tw': '選擇情境', 'zh-cn': '选择情境', 'en': 'Choose Scenario' })}</h3>
          <div style={styles.scenarioGrid}>
            {scenarios.map((scenario, index) => (
              <div
                key={scenario.id}
                onClick={() => startScenario(index)}
                style={styles.scenarioCard}
              >
                <h4>{t(scenario.title)}</h4>
                <p>{t(scenario.description)}</p>
                <div style={styles.scenarioInfo}>
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
      <div style={styles.gameContainer}>
        <div style={styles.scenarioIntroCard}>
          <h2>{t(scenario.title)}</h2>
          <div style={styles.scenarioBackground}>
            {t(scenario.background)}
          </div>
          <div style={styles.scenarioDetails}>
            <div style={styles.timeInfo}>
              <Clock size={20} />
              <span>{t({ 'zh-tw': '時間限制', 'zh-cn': '时间限制', 'en': 'Time Limit' })}: {scenario.timeLimit}{t({ 'zh-tw': '秒', 'zh-cn': '秒', 'en': 's' })}</span>
            </div>
          </div>
          <div style={styles.minigameOptions}>
            <h3>{t({ 'zh-tw': '選擇你的行動', 'zh-cn': '选择你的行动', 'en': 'Choose Your Action' })}</h3>
            <div style={styles.minigameButtons}>
              {scenario.minigames.map((minigame, index) => (
                <button
                  key={index}
                  onClick={() => startMinigame(minigame)}
                  style={styles.minigameButton}
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

  const getMinigameTitle = (minigame) => {
    const titles = {
      note_writing: { 'zh-tw': '📝 傳紙條', 'zh-cn': '📝 传纸条', 'en': '📝 Pass Note' },
      quiz_battle: { 'zh-tw': '📚 知識問答', 'zh-cn': '📚 知识问答', 'en': '📚 Quiz Battle' },
      voice_chat: { 'zh-tw': '💬 語音對話', 'zh-cn': '💬 语音对话', 'en': '💬 Voice Chat' },
      festival_activities: { 'zh-tw': '🎪 節慶活動', 'zh-cn': '🎪 节庆活动', 'en': '🎪 Festival Activities' }
    };
    return t(titles[minigame] || { 'zh-tw': '未知活動', 'zh-cn': '未知活动', 'en': 'Unknown Activity' });
  };

  const renderGameplay = () => {
    const crushCharacter = selectedCharacter === 'male' ? characters.female : characters.male;
    
    return (
      <div style={styles.gameContainer}>
        {/* Game Header with Stats */}
        <div style={styles.gameHeader}>
          <div style={styles.affectionContainer}>
            <h3>{t(crushCharacter.name)} {crushCharacter.emoji}</h3>
            <div style={styles.affectionMeter}>
              <div style={{
                ...styles.affectionFill,
                width: `${crushAffection}%`,
                backgroundColor: crushAffection >= 80 ? '#4caf50' : crushAffection >= 60 ? '#ff9800' : '#f44336'
              }}></div>
            </div>
            <div style={styles.affectionText}>
              <Heart size={16} /> {crushAffection}%
            </div>
          </div>
          
          <div style={styles.timerContainer}>
            <div style={{
              ...styles.timer,
              color: timeLeft <= 10 ? '#f44336' : timeLeft <= 20 ? '#ff9800' : '#4caf50'
            }}>
              <Clock size={20} />
              {timeLeft}s
            </div>
          </div>
          
          <div style={styles.scoreContainer}>
            <Star size={16} />
            <span>{playerScore} {t({ 'zh-tw': '分', 'zh-cn': '分', 'en': 'pts' })}</span>
          </div>
        </div>

        {/* Minigame Area */}
        <div style={styles.minigameArea}>
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
      <div style={styles.gameContainer}>
        <div style={styles.endingCard}>
          <div style={styles.endingEmoji}>{endingEmoji}</div>
          <h2 style={styles.endingTitle}>{t(endingType)}</h2>
          <h3 style={styles.endingMessage}>{t(endingMessage)}</h3>
          
          <div style={styles.finalStats}>
            <div style={styles.statItem}>
              <Heart size={20} />
              <span>{t({ 'zh-tw': '最終好感度', 'zh-cn': '最终好感度', 'en': 'Final Affection' })}: {crushAffection}%</span>
            </div>
            <div style={styles.statItem}>
              <Star size={20} />
              <span>{t({ 'zh-tw': '總分數', 'zh-cn': '总分数', 'en': 'Total Score' })}: {playerScore}</span>
            </div>
            <div style={styles.statItem}>
              <Users size={20} />
              <span>{t({ 'zh-tw': '完成情境', 'zh-cn': '完成情境', 'en': 'Scenarios Completed' })}: {gameStats.scenariosCompleted}</span>
            </div>
            <div style={styles.statItem}>
              <BookOpen size={20} />
              <span>{t({ 'zh-tw': '正確答案', 'zh-cn': '正确答案', 'en': 'Correct Answers' })}: {gameStats.correctAnswers}/{gameStats.totalQuestions}</span>
            </div>
          </div>
          
          <button onClick={resetGame} style={styles.playAgainButton}>
            {t({ 'zh-tw': '🔄 重新開始', 'zh-cn': '🔄 重新开始', 'en': '🔄 Play Again' })}
          </button>
        </div>
      </div>
    );
  };

  // === Message Box Component ===
  const MessageBox = () => {
    if (!messageBox.isVisible) return null;
    
    return (
      <div style={styles.messageBoxOverlay}>
        <div style={{
          ...styles.messageBoxContent,
          borderColor: messageBox.type === 'success' ? '#4caf50' : messageBox.type === 'error' ? '#f44336' : '#ff9800'
        }}>
          <h3 style={styles.messageBoxTitle}>{messageBox.title}</h3>
          <p style={styles.messageBoxMessage}>{messageBox.message}</p>
          <button 
            onClick={() => setMessageBox({ isVisible: false, title: '', message: '', type: 'info' })}
            style={styles.messageBoxButton}
          >
            {t({ 'zh-tw': '確定', 'zh-cn': '确定', 'en': 'OK' })}
          </button>
        </div>
      </div>
    );
  };

  // === Styles ===
  const styles = {
    gameContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffebee, #f3e5f5, #e8f5e8)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    },
    languageToggle: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#e91e63',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      padding: '10px 15px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    introContent: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    moviePoster: {
      fontSize: '4rem',
      marginBottom: '20px'
    },
    gameTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#e91e63',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    },
    gameSubtitle: {
      fontSize: '1.2rem',
      marginBottom: '30px',
      color: '#666',
      fontStyle: 'italic'
    },
    introDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '40px',
      color: '#444',
      background: 'rgba(255,255,255,0.8)',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    gameFeatures: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      marginBottom: '40px',
      flexWrap: 'wrap'
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'white',
      padding: '15px 20px',
      borderRadius: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      color: '#e91e63',
      fontWeight: 'bold'
    },
    featureIcon: {
      width: '20px',
      height: '20px'
    },
    startButton: {
      background: 'linear-gradient(45deg, #e91e63, #ff5722)',
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      padding: '15px 40px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)'
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '30px',
      color: '#e91e63'
    },
    characterGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      maxWidth: '800px',
      margin: '0 auto 40px'
    },
    characterCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      textAlign: 'center'
    },
    characterEmoji: {
      fontSize: '4rem',
      marginBottom: '15px'
    },
    characterName: {
      fontSize: '1.5rem',
      marginBottom: '10px',
      color: '#e91e63'
    },
    characterDescription: {
      fontSize: '1rem',
      marginBottom: '10px',
      color: '#666'
    },
    characterPersonality: {
      fontSize: '0.9rem',
      color: '#888',
      fontStyle: 'italic'
    },
    scenarioSelection: {
      maxWidth: '1000px',
      margin: '0 auto'
    },
    scenarioGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    scenarioCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      border: '2px solid transparent'
    },
    scenarioInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px',
      fontSize: '0.9rem',
      color: '#666'
    },
    scenarioIntroCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      textAlign: 'center'
    },
    scenarioBackground: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      margin: '20px 0',
      padding: '20px',
      background: '#f8f9fa',
      borderRadius: '15px',
      color: '#444',
      textAlign: 'left'
    },
    scenarioDetails: {
      margin: '20px 0'
    },
    timeInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      background: '#fff3e0',
      padding: '15px',
      borderRadius: '10px',
      color: '#f57c00',
      fontWeight: 'bold'
    },
    minigameOptions: {
      marginTop: '30px'
    },
    minigameButtons: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '20px'
    },
    minigameButton: {
      background: '#e91e63',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '12px 25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)'
    },
    gameHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'white',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      flexWrap: 'wrap',
      gap: '15px'
    },
    affectionContainer: {
      textAlign: 'center',
      flex: '1',
      minWidth: '200px'
    },
    affectionMeter: {
      width: '100%',
      height: '12px',
      background: '#f0f0f0',
      borderRadius: '6px',
      overflow: 'hidden',
      margin: '8px 0',
      maxWidth: '200px',
      margin: '8px auto'
    },
    affectionFill: {
      height: '100%',
      transition: 'all 0.5s ease',
      borderRadius: '6px'
    },
    affectionText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    timerContainer: {
      textAlign: 'center'
    },
    timer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '24px',
      fontWeight: 'bold',
      padding: '10px 20px',
      background: '#f5f5f5',
      borderRadius: '25px'
    },
    scoreContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ff9800'
    },
    minigameArea: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
    },
    minigameContainer: {
      textAlign: 'center'
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
      outline: 'none'
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
    player: {
      background: '#e91e63',
      color: 'white',
      marginLeft: 'auto',
      textAlign: 'right'
    },
    crush: {
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
      background: '#2196f3',
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
    },
    endingCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
    },
    endingEmoji: {
      fontSize: '5rem',
      marginBottom: '20px'
    },
    endingTitle: {
      fontSize: '2rem',
      marginBottom: '15px',
      color: '#e91e63'
    },
    endingMessage: {
      fontSize: '1.3rem',
      marginBottom: '30px',
      color: '#666'
    },
    finalStats: {
      display: 'grid',
      gap: '15px',
      marginBottom: '30px',
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '15px'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '16px',
      color: '#444'
    },
    playAgainButton: {
      background: 'linear-gradient(45deg, #e91e63, #ff5722)',
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      padding: '15px 40px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)'
    },
    messageBoxOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    },
    messageBoxContent: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      maxWidth: '400px',
      textAlign: 'center',
      border: '3px solid'
    },
    messageBoxTitle: {
      fontSize: '1.5rem',
      marginBottom: '15px',
      color: '#333'
    },
    messageBoxMessage: {
      fontSize: '1rem',
      marginBottom: '20px',
      color: '#666',
      lineHeight: '1.5'
    },
    messageBoxButton: {
      background: '#e91e63',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '12px 30px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  };

  // === Main Render ===
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
    <div style={styles.gameContainer}>
      {/* Language Toggle Button */}
      <button onClick={toggleLanguage} style={styles.languageToggle}>
        {currentLanguage === 'zh-tw' ? '繁中' : 
         currentLanguage === 'zh-cn' ? '简中' : 'EN'} ⚙️
      </button>

      {/* Main Content */}
      {renderContent()}

      {/* Message Box */}
      <MessageBox />
    </div>
  );
};

export default EnhancedRomanceGame;