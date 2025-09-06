import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

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
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
    transition: 'all 0.3s ease'
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
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  sendButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
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
      },
      {
        question: { 'zh-tw': '15 × 7 = ?', 'zh-cn': '15 × 7 = ?', 'en': '15 × 7 = ?' },
        options: ['95', '105', '115'],
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
  }, [currentMinigame, currentQuiz]);

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
        { 'zh-tw': '你覺得呢？', 'zh-cn': '你觉得呢？', 'en': 'What do you think?' },
        { 'zh-tw': '聽起來很有趣！', 'zh-cn': '听起来很有趣！', 'en': 'Sounds interesting!' }
      ],
      shy: [
        { 'zh-tw': '你...你幹嘛這樣說', 'zh-cn': '你...你干嘛这样说', 'en': 'Why... why do you say that' },
        { 'zh-tw': '臉紅了啦...', 'zh-cn': '脸红了啦...', 'en': 'I\'m blushing...' },
        { 'zh-tw': '你真的這麼覺得嗎？', 'zh-cn': '你真的这么觉得吗？', 'en': 'Do you really think so?' }
      ]
    };

    let responseType = 'neutral';
    if (userMessage.length > 20 && (userMessage.includes('喜歡') || userMessage.includes('漂亮') || userMessage.includes('可愛'))) {
      responseType = 'shy';
    } else if (userMessage.length > 15 && (userMessage.includes('?') || userMessage.includes('？'))) {
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
      const hasNoKeywords = !noteContent.includes('考試') && !noteContent.includes('老師') && 
                           !noteContent.includes('考试') && !noteContent.includes('老师') &&
                           !noteContent.includes('exam') && !noteContent.includes('teacher');
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
        <h3>{t({ 'zh-tw': '📝 寫紙條給心儀的人', 'zh-cn': '📝 写纸条给心仪的人', 'en': '📝 Write a Note to Your Crush' })}</h3>
        <div style={minigameStyles.hint}>
          {t({ 'zh-tw': '💡 提示：寫15-60字，避免提到考試或老師！要表達真誠的情感', 'zh-cn': '💡 提示：写15-60字，避免提到考试或老师！要表达真诚的情感', 'en': '💡 Hint: Write 15-60 characters, avoid mentioning exams or teachers! Express genuine feelings' })}
        </div>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder={t({ 'zh-tw': '寫下你想對她/他說的話...例如：你今天很漂亮，想和你一起吃午餐', 'zh-cn': '写下你想对她/他说的话...例如：你今天很漂亮，想和你一起吃午餐', 'en': 'Write what you want to say to her/him...e.g.: You look beautiful today, want to have lunch together?' })}
          disabled={!gameActive}
          style={minigameStyles.textarea}
        />
        <div style={minigameStyles.noteStats}>
          <span style={{color: noteContent.length < 15 ? '#f44336' : noteContent.length > 60 ? '#ff9800' : '#4caf50'}}>
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
      
      // Simulate AI response after delay
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
      
      // Success criteria: meaningful conversation
      const hasQuestion = messageValue.includes('?') || messageValue.includes('？') || 
                         messageValue.includes('嗎') || messageValue.includes('吗') ||
                         messageValue.includes('呢') || messageValue.includes('how') || 
                         messageValue.includes('what') || messageValue.includes('why');
      const goodLength = messageValue.length > 8 && messageValue.length < 80;
      const hasCompliment = messageValue.includes('漂亮') || messageValue.includes('可愛') || 
                           messageValue.includes('聰明') || messageValue.includes('beautiful') || 
                           messageValue.includes('cute') || messageValue.includes('smart');
      
      const success = (hasQuestion && goodLength) || hasCompliment;
      
      setTimeout(() => {
        onComplete(success, success ? 120 : 80, success ? 
          t({ 'zh-tw': '對話很愉快，你們越聊越投機！', 'zh-cn': '对话很愉快，你们越聊越投机！', 'en': 'Great conversation, you\'re getting along well!' }) :
          t({ 'zh-tw': '對話還不錯，但還能更好！試著問她問題或給予讚美', 'zh-cn': '对话还不错，但还能更好！试着问她问题或给予赞美', 'en': 'The conversation was okay, but could be better! Try asking questions or giving compliments' })
        );
      }, 3000);
    };

    return (
      <div style={minigameStyles.container}>
        <h3>{t({ 'zh-tw': '💬 對話時間', 'zh-cn': '💬 对话时间', 'en': '💬 Chat Time' })}</h3>
        <div style={minigameStyles.hint}>
          {t({ 'zh-tw': '💡 提示：問她問題或給予真誠的讚美來展開有趣的對話！', 'zh-cn': '💡 提示：问她问题或给予真诚的赞美来展开有趣的对话！', 'en': '💡 Hint: Ask questions or give sincere compliments to start interesting conversations!' })}
        </div>
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
          {chatHistory.length === 0 && (
            <div style={{textAlign: 'center', color: '#666', padding: '20px'}}>
              {t({ 'zh-tw': '開始你們的對話吧！', 'zh-cn': '开始你们的对话吧！', 'en': 'Start your conversation!' })}
            </div>
          )}
        </div>
        <div style={minigameStyles.chatInputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t({ 'zh-tw': '說些什麼... (試著問問題或讚美她！)', 'zh-cn': '说些什么... (试着问问题或赞美她！)', 'en': 'Say something... (Try asking questions or complimenting her!)' })}
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
        description: { 'zh-tw': '慢慢逛校園，享受輕鬆時光', 'zh-cn': '慢慢逛校园，享受轻松时光', 'en': 'Stroll around campus and enjoy relaxed time' },
        success: 70,
        points: 80
      },
      { 
        name: { 'zh-tw': '邀請吃章魚燒', 'zh-cn': '邀请吃章鱼烧', 'en': 'Invite to Eat Takoyaki' },
        description: { 'zh-tw': '主動邀請，展現紳士風度', 'zh-cn': '主动邀请，展现绅士风度', 'en': 'Take initiative and show gentleman behavior' },
        success: 80,
        points: 120
      },
      { 
        name: { 'zh-tw': '一起玩遊戲攤', 'zh-cn': '一起玩游戏摊', 'en': 'Play Games Together' },
        description: { 'zh-tw': '挑戰遊戲，為她贏取獎品', 'zh-cn': '挑战游戏，为她赢取奖品', 'en': 'Challenge games and win prizes for her' },
        success: 60,
        points: 100
      }
    ];

    const handleActivity = (activity) => {
      const success = Math.random() * 100 < activity.success;
      onComplete(success, activity.points, success ? 
        t({ 'zh-tw': `${t(activity.name)}很成功！她看起來很開心，你們的感情更進一步了`, 'zh-cn': `${t(activity.name)}很成功！她看起来很开心，你们的感情更进一步了`, 'en': `${t(activity.name)} was successful! She looks happy and your relationship got closer` }) :
        t({ 'zh-tw': '有點尷尬，但她還是很友善。也許下次可以嘗試不同的方法', 'zh-cn': '有点尴尬，但她还是很友善。也许下次可以尝试不同的方法', 'en': 'A bit awkward, but she\'s still friendly. Maybe try a different approach next time' })
      );
    };

    return (
      <div style={minigameStyles.container}>
        <h3>{t({ 'zh-tw': '🎪 選擇校慶活動', 'zh-cn': '🎪 选择校庆活动', 'en': '🎪 Choose Festival Activity' })}</h3>
        <div style={minigameStyles.hint}>
          {t({ 'zh-tw': '💡 提示：每個選擇都有不同的成功率和獎勵！', 'zh-cn': '💡 提示：每个选择都有不同的成功率和奖励！', 'en': '💡 Hint: Each choice has different success rates and rewards!' })}
        </div>
        <div style={minigameStyles.activitiesContainer}>
          {activities.map((activity, index) => (
            <button
              key={index}
              onClick={() => handleActivity(activity)}
              disabled={!gameActive}
              style={{
                ...minigameStyles.activityButton,
                border: `2px solid ${activity.success >= 70 ? '#4caf50' : activity.success >= 60 ? '#ff9800' : '#f44336'}`
              }}
            >
              <div style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '8px'}}>
                {t(activity.name)}
              </div>
              <div style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>
                {t(activity.description)}
              </div>
              <div style={minigameStyles.activityChance}>
                {t({ 'zh-tw': '成功率', 'zh-cn': '成功率', 'en': 'Success Rate' })}: {activity.success}% | 
                {t({ 'zh-tw': '獎勵', 'zh-cn': '奖励', 'en': 'Reward' })}: {activity.points} {t({ 'zh-tw': '分', 'zh-cn': '分', 'en': 'pts' })}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
// ConnectionsGame component from gameMinigames.jsx
const ConnectionsGame = ({ generateConnectionsGame, gameActive, onComplete, t }) => {
    const [grid, setGrid] = useState([]);
    const [selected, setSelected] = useState([]);
    const [foundGroups, setFoundGroups] = useState([]);
    const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [puzzleData, setPuzzleData] = useState([]);

    useEffect(() => {
        const fetchPuzzle = async () => {
            setLoading(true);
            try {
                const result = await generateConnectionsGame();
                if (result) {
                    setPuzzleData(result);
                    let allItems = result.flatMap(group => group.items);
                    allItems.sort(() => 0.5 - Math.random());
                    setGrid(allItems);
                }
            } catch (error) {
                console.error("Failed to fetch puzzle:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPuzzle();
    }, [generateConnectionsGame]);

    const handleSelect = (item) => {
        if (foundGroups.some(group => group.items.includes(item))) {
            return;
        }

        setSelected(prev => {
            if (prev.includes(item)) {
                return prev.filter(i => i !== item);
            } else if (prev.length < 4) {
                return [...prev, item];
            }
            return prev;
        });
    };

    const checkGroup = () => {
        if (selected.length !== 4) return;

        let isCorrect = false;
        let correctCategory = null;
        let foundGroup = null;

        const selectedSet = new Set(selected);

        for (const group of puzzleData) {
            const groupSet = new Set(group.items);
            // Check if selected items are an exact match for a group
            if (selectedSet.size === groupSet.size && [...selectedSet].every(item => groupSet.has(item))) {
                isCorrect = true;
                correctCategory = group.category;
                foundGroup = group;
                break;
            }
        }

        if (isCorrect) {
            setFoundGroups(prev => [...prev, foundGroup]);
            setSelected([]);
            if (foundGroups.length + 1 === 4) {
                onComplete(true, 400, t({
                    'zh-tw': `太棒了！你找到所有連線，你的中文很厲害！`,
                    'zh-cn': `太棒了！你找到所有连线，你的中文很厉害！`,
                    'en': `Awesome! You found all the connections, your Chinese is great!`
                }));
            }
        } else {
            setIncorrectAttempts(prev => {
                const newAttempts = prev + 1;
                if (newAttempts >= 5) {
                    onComplete(false, 0, t({
                        'zh-tw': `挑戰失敗！你用盡了所有錯誤嘗試。`,
                        'zh-cn': `挑战失败！你用尽了所有错误尝试。`,
                        'en': `Challenge failed! You've used all your attempts.`
                    }));
                }
                return newAttempts;
            });
            setSelected([]);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-xl text-gray-700">Loading new puzzle...</div>;
    }

    const remainingGrid = grid.filter(item => !foundGroups.some(group => group.items.includes(item)));

    return (
        <div className="connections-game-container p-4">
            <h3 className="text-center font-bold text-lg mb-2">{t({ 'zh-tw': '找出四個一組的字詞', 'zh-cn': '找出四个一组的字词', 'en': 'Find the four words that are a group' })}</h3>
            <div className="flex justify-between w-full max-w-lg mx-auto mb-4">
                <div className="font-bold text-gray-700">
                    {t({ 'zh-tw': '錯誤', 'zh-cn': '错误', 'en': 'Errors' })}: {incorrectAttempts}/5
                </div>
                <button
                    onClick={checkGroup}
                    disabled={selected.length !== 4 || !gameActive}
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400"
                >
                    {t({ 'zh-tw': '提交', 'zh-cn': '提交', 'en': 'Submit' })}
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-lg mx-auto">
                {remainingGrid.map((item, index) => (
                    <button
                        key={item}
                        className={`
                            flex items-center justify-center
                            h-20 p-2 rounded-lg font-semibold
                            transition-all duration-200
                            ${selected.includes(item) ? 'bg-purple-300 transform scale-105' : 'bg-gray-100 hover:bg-gray-200'}
                        `}
                        onClick={() => handleSelect(item)}
                        disabled={!gameActive}
                    >
                        {item}
                    </button>
                ))}
            </div>
            {foundGroups.length > 0 && (
                <div className="mt-6 w-full max-w-lg mx-auto border-t-2 border-dashed pt-4">
                    {foundGroups.map((group, index) => (
                        <div key={index} className="p-3 my-2 rounded-md bg-green-100 border-l-4 border-green-500 shadow-sm">
                            <div className="font-bold text-sm text-green-700">
                                {t(group.category)}
                            </div>
                            <div className="text-gray-800 text-lg">
                                {group.items.join(', ')}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


  // Render based on current minigame
  switch (currentMinigame) {
    case 'note_writing':
      return <NoteWritingGame />;
    case 'connections_game':
      return <ConnectionsGame />;
    case 'voice_chat':
      return <VoiceChatGame />;
    case 'festival_activities':
      return <FestivalActivitiesGame />;
    default:
      return (
        <div style={minigameStyles.container}>
          <h3>Minigame not found</h3>
          <p>Current minigame: {currentMinigame}</p>
        </div>
      );
  }
};

export default GameMinigames;
