// src/pages/EnhancedRomancePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Heart, Clock, Star, Target, ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import GameMinigames from "../components/game/minigames/gameMinigames.jsx";

const EnhancedRomancePage = () => {
  const navigate = useNavigate();
  
  // Game state
  const [currentLanguage, setCurrentLanguage] = useState('zh-tw');
  const [gamePhase, setGamePhase] = useState('story-intro');
  const [currentAct, setCurrentAct] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [affectionLevel, setAffectionLevel] = useState(50);
  const [playerScore, setPlayerScore] = useState(0);
  const [actingPerformance, setActingPerformance] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [sceneTimeLeft, setSceneTimeLeft] = useState(0);
  const [dialogueHistory, setDialogueHistory] = useState([]);
  const [storyComplete, setStoryComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [performanceFeedback, setPerformanceFeedback] = useState('');
  const [currentMinigame, setCurrentMinigame] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [gameStats, setGameStats] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
    notesExchanged: 0,
    teacherTroubles: 0,
    scenariosCompleted: 0
  });

  const timerRef = useRef(null);

  // Styles
  const gameStyles = {
    gameContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffebee, #f3e5f5, #e8f5e8)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    },
    introContent: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
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
      transition: 'all 0.3s ease'
    },
    endingCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
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
      boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
      transition: 'all 0.3s ease',
      marginBottom: '10px'
    },
    shareButton: {
      background: '#e91e63',
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      padding: '15px 40px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
      transition: 'all 0.3s ease'
    },
    minigameArea: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
    }
  };

  // Translation function
  const t = (textMap) => {
    if (typeof textMap === 'string') return textMap;
    return textMap[currentLanguage] || textMap['zh-tw'] || textMap;
  };

  // Movie Story Structure - Following the actual film arc
  const movieStory = {
    title: {
      'zh-tw': '那些年，我們一起追的女孩',
      'zh-cn': '那些年，我们一起追的女孩',
      'en': 'You Are the Apple of My Eye'
    },
    acts: [
      {
        title: {
          'zh-tw': '第一幕：初遇',
          'zh-cn': '第一幕：初遇',
          'en': 'Act I: First Encounter'
        },
        description: {
          'zh-tw': '高中時期，柯景騰第一次注意到沈佳宜',
          'zh-cn': '高中时期，柯景腾第一次注意到沈佳宜',
          'en': 'High school period, Ko Ching-teng first notices Shen Chia-yi'
        },
        affectionThreshold: 30,
        scenes: [
          {
            setting: {
              'zh-tw': '📚 數學課教室',
              'zh-cn': '📚 数学课教室',
              'en': '📚 Math Classroom'
            },
            stageDirection: {
              'zh-tw': '老師在黑板上寫著複雜的方程式。陽光從窗戶斜射進來，你坐在後排，視線不由自主地飄向前排的她...',
              'zh-cn': '老师在黑板上写着复杂的方程式。阳光从窗户斜射进来，你坐在后排，视线不由自主地飘向前排的她...',
              'en': 'The teacher writes complex equations on the blackboard. Sunlight slants through the window, you sit in the back row, your gaze unconsciously drifting to her in the front...'
            },
            timeLimit: 60,
            dialogue: [
              {
                speaker: 'narrator',
                text: {
                  'zh-tw': '【旁白】你想引起她的注意，決定傳一張紙條...',
                  'zh-cn': '【旁白】你想引起她的注意，决定传一张纸条...',
                  'en': '[Narrator] You want to get her attention and decide to pass a note...'
                }
              },
              {
                speaker: 'player',
                pattern: 'because_therefore',
                targetSentence: {
                  'zh-tw': '因為我想認識你，所以寫了這張紙條',
                  'zh-cn': '因为我想认识你，所以写了这张纸条',
                  'en': 'Because I want to get to know you, therefore I wrote this note'
                },
                hint: {
                  'zh-tw': '使用「因為...所以...」的句型',
                  'zh-cn': '使用「因为...所以...」的句型',
                  'en': 'Use "because...therefore..." pattern'
                },
                emotion: 'nervous_excitement'
              },
              {
                speaker: 'shen_jiayi',
                text: {
                  'zh-tw': '【沈佳宜】（看了看紙條，回頭微笑）你的數學需要幫助嗎？',
                  'zh-cn': '【沈佳宜】（看了看纸条，回头微笑）你的数学需要帮助吗？',
                  'en': '[Shen Chia-yi] (Looking at the note, turns back with a smile) Do you need help with math?'
                }
              },
              {
                speaker: 'minigame_trigger',
                type: 'note_writing',
                context: {
                  'zh-tw': '沈佳宜要你寫下自我介紹',
                  'zh-cn': '沈佳宜要你写下自我介绍',
                  'en': 'Shen Chia-yi wants you to write a self-introduction'
                },
                successText: {
                  'zh-tw': '【沈佳宜】哇！你寫得很有趣呢！',
                  'zh-cn': '【沈佳宜】哇！你写得很有趣呢！',
                  'en': '[Shen Chia-yi] Wow! You write very interestingly!'
                },
                failureText: {
                  'zh-tw': '【沈佳宜】嗯...還不錯啦',
                  'zh-cn': '【沈佳宜】嗯...还不错啦',
                  'en': '[Shen Chia-yi] Hmm... not bad'
                }
              }
            ]
          },
          {
            setting: {
              'zh-tw': '🏫 學校走廊',
              'zh-cn': '🏫 学校走廊',
              'en': '🏫 School Hallway'
            },
            stageDirection: {
              'zh-tw': '下課時間，走廊上人來人往。你鼓起勇氣走向她的教室...',
              'zh-cn': '下课时间，走廊上人来人往。你鼓起勇气走向她的教室...',
              'en': 'Break time, people coming and going in the hallway. You gather courage to walk toward her classroom...'
            },
            timeLimit: 45,
            dialogue: [
              {
                speaker: 'player',
                pattern: 'if_then',
                targetSentence: {
                  'zh-tw': '如果你不介意的話，我們一起讀書好嗎？',
                  'zh-cn': '如果你不介意的话，我们一起读书好吗？',
                  'en': 'If you don\'t mind, shall we study together?'
                },
                hint: {
                  'zh-tw': '使用「如果...的話」的句型',
                  'zh-cn': '使用「如果...的话」的句型',
                  'en': 'Use "if...then" pattern'
                },
                emotion: 'nervous_hope'
              },
              {
                speaker: 'shen_jiayi',
                text: {
                  'zh-tw': '【沈佳宜】好啊，不過你要認真學習喔！',
                  'zh-cn': '【沈佳宜】好啊，不过你要认真学习哦！',
                  'en': '[Shen Chia-yi] Sure, but you have to study seriously!'
                }
              },
              {
                speaker: 'minigame_trigger',
                type: 'connections_game',
                context: {
                  'zh-tw': '沈佳宜想測試你的中文程度，出了一個文字連線遊戲',
                  'zh-cn': '沈佳宜想测试你的中文程度，出了一个文字连线游戏',
                  'en': 'Shen Chia-yi wants to test your Chinese level with a word connections game'
                },
                successText: {
                  'zh-tw': '【沈佳宜】哇！你真的很聰明呢！',
                  'zh-cn': '【沈佳宜】哇！你真的很聪明呢！',
                  'en': '[Shen Chia-yi] Wow! You\'re really smart!'
                },
                failureText: {
                  'zh-tw': '【沈佳宜】沒關係，我們一起努力吧',
                  'zh-cn': '【沈佳宜】没关系，我们一起努力吧',
                  'en': '[Shen Chia-yi] It\'s okay, let\'s work hard together'
                }
              }
            ]
          }
        ]
      },
      {
        title: {
          'zh-tw': '第二幕：情感升溫',
          'zh-cn': '第二幕：情感升温',
          'en': 'Act II: Growing Feelings'
        },
        description: {
          'zh-tw': '兩人開始有更多互動，感情逐漸升溫',
          'zh-cn': '两人开始有更多互动，感情逐渐升温',
          'en': 'They begin to interact more, feelings gradually warming'
        },
        affectionThreshold: 50,
        scenes: [
          {
            setting: {
              'zh-tw': '📖 圖書館',
              'zh-cn': '📖 图书馆',
              'en': '📖 Library'
            },
            stageDirection: {
              'zh-tw': '期中考前，圖書館裡座無虛席。你們坐在靠窗的位置，她認真地翻著參考書...',
              'zh-cn': '期中考前，图书馆里座无虚席。你们坐在靠窗的位置，她认真地翻着参考书...',
              'en': 'Before midterms, the library is packed. You sit by the window, she seriously flips through reference books...'
            },
            timeLimit: 90,
            dialogue: [
              {
                speaker: 'player',
                pattern: 'not_only_but_also',
                targetSentence: {
                  'zh-tw': '你不只聰明，而且很溫柔',
                  'zh-cn': '你不只聪明，而且很温柔',
                  'en': 'You\'re not only smart, but also very gentle'
                },
                hint: {
                  'zh-tw': '使用「不只...而且...」的句型',
                  'zh-cn': '使用「不只...而且...」的句型',
                  'en': 'Use "not only...but also..." pattern'
                },
                emotion: 'admiration'
              },
              {
                speaker: 'minigame_trigger',
                type: 'quiz_battle',
                context: {
                  'zh-tw': '沈佳宜提議互相出題測驗，看誰比較厲害',
                  'zh-cn': '沈佳宜提议互相出题测验，看谁比较厉害',
                  'en': 'Shen Chia-yi suggests quizzing each other to see who\'s better'
                },
                successText: {
                  'zh-tw': '【沈佳宜】你進步好多！我們真的是很好的讀書夥伴',
                  'zh-cn': '【沈佳宜】你进步好多！我们真的是很好的读书伙伴',
                  'en': '[Shen Chia-yi] You\'ve improved so much! We\'re really good study partners'
                },
                failureText: {
                  'zh-tw': '【沈佳宜】還需要多練習，不過你已經很努力了',
                  'zh-cn': '【沈佳宜】还需要多练习，不过你已经很努力了',
                  'en': '[Shen Chia-yi] Need more practice, but you\'re already working hard'
                }
              }
            ]
          }
        ]
      },
      {
        title: {
          'zh-tw': '第三幕：告白時刻',
          'zh-cn': '第三幕：告白时刻',
          'en': 'Act III: Confession Moment'
        },
        description: {
          'zh-tw': '關鍵時刻到了，是時候表達真心了',
          'zh-cn': '关键时刻到了，是时候表达真心了',
          'en': 'The crucial moment has arrived, time to express true feelings'
        },
        affectionThreshold: 70,
        scenes: [
          {
            setting: {
              'zh-tw': '🌅 放學後的教室',
              'zh-cn': '🌅 放学后的教室',
              'en': '🌅 After-school Classroom'
            },
            stageDirection: {
              'zh-tw': '夕陽西下，橘紅色的光芒透過窗戶灑進空曠的教室。只剩下你們兩個人，這是最完美的時機...',
              'zh-cn': '夕阳西下，橘红色的光芒透过窗户洒进空旷的教室。只剩下你们两个人，这是最完美的时机...',
              'en': 'Sunset, orange-red light streams through the windows into the empty classroom. Only you two remain, this is the perfect moment...'
            },
            timeLimit: 120,
            dialogue: [
              {
                speaker: 'player',
                pattern: 'have_been',
                targetSentence: {
                  'zh-tw': '我一直都很喜歡你，從第一次見面開始',
                  'zh-cn': '我一直都很喜欢你，从第一次见面开始',
                  'en': 'I have always liked you, since the first time we met'
                },
                hint: {
                  'zh-tw': '使用「一直都...」的句型',
                  'zh-cn': '使用「一直都...」的句型',
                  'en': 'Use "have been..." pattern'
                },
                emotion: 'nervous_confession'
              }
            ]
          }
        ]
      }
    ]
  };

  // Sentence patterns for dialogue practice
  const sentencePatterns = {
    because_therefore: {
      structure: '因為...所以...',
      description: {
        'zh-tw': '表達因果關係',
        'zh-cn': '表达因果关系',
        'en': 'Express cause and effect'
      }
    },
    although_yet: {
      structure: '雖然...但是...',
      description: {
        'zh-tw': '表達轉折關係',
        'zh-cn': '表达转折关系',
        'en': 'Express contrast'
      }
    },
    if_then: {
      structure: '如果...的話',
      description: {
        'zh-tw': '表達假設條件',
        'zh-cn': '表达假设条件',
        'en': 'Express hypothetical conditions'
      }
    },
    not_only_but_also: {
      structure: '不只...而且...',
      description: {
        'zh-tw': '表達遞進關係',
        'zh-cn': '表达递进关系',
        'en': 'Express progressive relationship'
      }
    },
    have_been: {
      structure: '一直都...',
      description: {
        'zh-tw': '表達持續狀態',
        'zh-cn': '表达持续状态',
        'en': 'Express continuous state'
      }
    }
  };

  // Timer management
  useEffect(() => {
    if (sceneTimeLeft > 0 && gamePhase === 'dialogue') {
      timerRef.current = setTimeout(() => {
        setSceneTimeLeft(sceneTimeLeft - 1);
      }, 1000);
    } else if (sceneTimeLeft === 0 && gamePhase === 'dialogue') {
      handleSceneTimeout();
    }
    return () => clearTimeout(timerRef.current);
  }, [sceneTimeLeft, gamePhase]);

  const handleSceneTimeout = () => {
    setAffectionLevel(prev => Math.max(0, prev - 20));
    if (affectionLevel <= 20) {
      setGameOver(true);
      setGamePhase('bad-ending');
    } else {
      proceedToNextScene();
    }
  };

  // Story progression
  const startStory = () => {
    setGamePhase('dialogue');
    setCurrentAct(0);
    setCurrentScene(0);
    setCurrentLine(0);
    setSceneTimeLeft(movieStory.acts[0].scenes[0].timeLimit);
  };

  const proceedToNextScene = () => {
    const currentActData = movieStory.acts[currentAct];
    
    if (currentScene < currentActData.scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      setCurrentLine(0);
      setSceneTimeLeft(currentActData.scenes[currentScene + 1].timeLimit);
    } else if (currentAct < movieStory.acts.length - 1) {
      if (affectionLevel < movieStory.acts[currentAct + 1].affectionThreshold) {
        setGameOver(true);
        setGamePhase('insufficient-affection');
        return;
      }
      setCurrentAct(currentAct + 1);
      setCurrentScene(0);
      setCurrentLine(0);
      setSceneTimeLeft(movieStory.acts[currentAct + 1].scenes[0].timeLimit);
    } else {
      setStoryComplete(true);
      setGamePhase('ending');
    }
  };

  const handleDialogueComplete = (success, performanceScore) => {
    const affectionChange = success ? 8 : -3;
    const scoreChange = success ? 50 : 10;
    
    setAffectionLevel(prev => Math.max(0, Math.min(100, prev + affectionChange)));
    setPlayerScore(prev => prev + scoreChange);
    setActingPerformance(prev => prev + performanceScore);
    
    if (success) {
      setPerformanceFeedback(t({
        'zh-tw': '表演很棒！感情表達很到位！',
        'zh-cn': '表演很棒！感情表达很到位！',
        'en': 'Great performance! Emotion was well expressed!'
      }));
    } else {
      setPerformanceFeedback(t({
        'zh-tw': '還需要多練習，記得融入角色的情感',
        'zh-cn': '还需要多练习，记得融入角色的情感',
        'en': 'Need more practice, remember to immerse in the character\'s emotions'
      }));
    }
    
    setTimeout(() => {
      setPerformanceFeedback('');
      if (currentLine < getCurrentScene().dialogue.length - 1) {
        setCurrentLine(currentLine + 1);
      } else {
        proceedToNextScene();
      }
    }, 2000);
  };

  const handleMinigameComplete = (success, score, message) => {
    const affectionChange = success ? 15 : -5;
    setAffectionLevel(prev => Math.max(0, Math.min(100, prev + affectionChange)));
    setPlayerScore(prev => prev + score);
    
    const dialogueItem = getCurrentScene().dialogue.find(d => d.type === currentMinigame);
    const feedbackMessage = success ? dialogueItem?.successText : dialogueItem?.failureText;
    
    setPerformanceFeedback(t(feedbackMessage || message));
    
    setTimeout(() => {
      setPerformanceFeedback('');
      setGamePhase('dialogue');
      if (currentLine < getCurrentScene().dialogue.length - 1) {
        setCurrentLine(currentLine + 1);
      } else {
        proceedToNextScene();
      }
    }, 3000);
  };

  // Utility functions
  const getCurrentAct = () => movieStory.acts[currentAct];
  const getCurrentScene = () => getCurrentAct().scenes[currentScene];
  const getCurrentDialogue = () => getCurrentScene().dialogue[currentLine];

  const toggleLanguage = () => {
    const languages = ['zh-tw', 'zh-cn', 'en'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentLanguage(languages[nextIndex]);
  };

  const goBackToLearn = () => {
    navigate('/learn');
  };

  const resetGame = () => {
    setGamePhase('story-intro');
    setCurrentAct(0);
    setCurrentScene(0);
    setCurrentLine(0);
    setAffectionLevel(50);
    setPlayerScore(0);
    setActingPerformance(0);
    setDialogueHistory([]);
    setStoryComplete(false);
    setGameOver(false);
    setPerformanceFeedback('');
    setCurrentMinigame(null);
    clearTimeout(timerRef.current);
  };

  // Speech recognition for dialogue practice
  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(t({
        'zh-tw': '您的瀏覽器不支援語音輸入',
        'zh-cn': '您的浏览器不支持语音输入',
        'en': 'Your browser doesn\'t support voice input'
      }));
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
      evaluateDialoguePerformance(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert(t({
        'zh-tw': '語音輸入失敗',
        'zh-cn': '语音输入失败',
        'en': 'Voice input failed'
      }));
    };

    recognition.onend = () => setIsRecording(false);
  };

  const evaluateDialoguePerformance = (spokenText) => {
    const currentDialogue = getCurrentDialogue();
    if (!currentDialogue.targetSentence) return;
    
    const targetText = t(currentDialogue.targetSentence);
    const similarity = calculateSimilarity(spokenText, targetText);
    const hasPattern = checkSentencePattern(spokenText, currentDialogue.pattern);
    
    const success = similarity > 0.6 && hasPattern;
    const performanceScore = Math.round((similarity * 70) + (hasPattern ? 30 : 0));
    
    setDialogueHistory([...dialogueHistory, {
      line: targetText,
      spoken: spokenText,
      success: success,
      score: performanceScore
    }]);
    
    handleDialogueComplete(success, performanceScore);
  };

  const calculateSimilarity = (text1, text2) => {
    const words1 = text1.split('');
    const words2 = text2.split('');
    let matches = 0;
    
    words1.forEach(char => {
      if (words2.includes(char)) matches++;
    });
    
    return matches / Math.max(words1.length, words2.length);
  };

  const checkSentencePattern = (text, pattern) => {
    const patterns = {
      because_therefore: ['因為', '所以'],
      although_yet: ['雖然', '但是'],
      if_then: ['如果', '的話'],
      not_only_but_also: ['不只', '而且'],
      have_been: ['一直']
    };
    
    const requiredWords = patterns[pattern] || [];
    return requiredWords.every(word => text.includes(word));
  };

  // Render functions
  const renderStoryIntro = () => (
    <div style={gameStyles.gameContainer}>
      <button onClick={goBackToLearn} style={{
        position: 'absolute', top: '20px', left: '20px',
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(255,255,255,0.9)', border: '1px solid #ddd',
        borderRadius: '25px', padding: '8px 16px', fontSize: '14px',
        cursor: 'pointer', zIndex: 1000
      }}>
        <ArrowLeft size={16} />
        {t({ 'zh-tw': '返回劇集選擇', 'zh-cn': '返回剧集选择', 'en': 'Back to Drama Selection' })}
      </button>

      <div style={gameStyles.introContent}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎬</div>
        <h1 style={gameStyles.gameTitle}>
          {t(movieStory.title)}
        </h1>
        <p style={gameStyles.gameSubtitle}>
          {t({ 'zh-tw': '沉浸式劇本演出遊戲', 'zh-cn': '沉浸式剧本演出游戏', 'en': 'Immersive Script Acting Game' })}
        </p>
        
        <div style={{
          background: 'rgba(255,255,255,0.9)', borderRadius: '15px',
          padding: '25px', margin: '20px 0', textAlign: 'left'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#e91e63' }}>
            {t({ 'zh-tw': '🎭 演員體驗特色', 'zh-cn': '🎭 演员体验特色', 'en': '🎭 Actor Experience Features' })}
          </h3>
          <ul style={{ lineHeight: '1.8', color: '#333' }}>
            <li>{t({ 'zh-tw': '📚 學習中文句型：因為...所以、雖然...但是、如果...的話 等', 'zh-cn': '📚 学习中文句型：因为...所以、虽然...但是、如果...的话 等', 'en': '📚 Learn Chinese patterns: because...therefore, although...yet, if...then etc.' })}</li>
            <li>{t({ 'zh-tw': '🎬 按照電影劇本演出，體驗真實角色情感', 'zh-cn': '🎬 按照电影剧本演出，体验真实角色情感', 'en': '🎬 Act according to movie script, experience real character emotions' })}</li>
            <li>{t({ 'zh-tw': '🎤 語音演出評分，提升中文發音和表達', 'zh-cn': '🎤 语音演出评分，提升中文发音和表达', 'en': '🎤 Voice acting scoring, improve Chinese pronunciation and expression' })}</li>
            <li>{t({ 'zh-tw': '💕 好感度系統：表現不佳會導致故事提前結束', 'zh-cn': '💕 好感度系统：表现不佳会导致故事提前结束', 'en': '💕 Affection system: poor performance leads to early story end' })}</li>
            <li>{t({ 'zh-tw': '🎮 整合小遊戲：問答、連線、寫紙條等增加互動', 'zh-cn': '🎮 整合小游戏：问答、连线、写纸条等增加互动', 'en': '🎮 Integrated mini-games: quiz, connections, note writing for interaction' })}</li>
          </ul>
        </div>

        <button onClick={startStory} style={gameStyles.startButton}>
          {t({ 'zh-tw': '🎬 開始演出', 'zh-cn': '🎬 开始演出', 'en': '🎬 Start Acting' })}
        </button>
      </div>
    </div>
  );

  const renderDialogueScene = () => {
    const currentActData = getCurrentAct();
    const currentSceneData = getCurrentScene();
    const currentDialogueData = getCurrentDialogue();

    return (
      <div style={gameStyles.gameContainer}>
        {/* Scene Header */}
        <div style={{
          background: 'white', borderRadius: '15px', padding: '20px',
          marginBottom: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: '0 0 5px 0', color: '#e91e63' }}>
                {t(currentActData.title)}
              </h2>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                {t(currentSceneData.setting)}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: sceneTimeLeft <= 10 ? '#ffebee' : '#e8f5e8',
                padding: '8px 15px', borderRadius: '20px'
              }}>
                <Clock size={16} style={{
                  color: sceneTimeLeft <= 10 ? '#f44336' : '#4caf50'
                }} />
                <span style={{
                  fontWeight: 'bold',
                  color: sceneTimeLeft <= 10 ? '#f44336' : '#4caf50'
                }}>
                  {sceneTimeLeft}s
                </span>
              </div>
              <div style={{
                marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px'
              }}>
                <Heart size={16} style={{ color: '#e91e63' }} />
                <span style={{ fontWeight: 'bold' }}>{affectionLevel}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Direction */}
        <div style={{
          background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
          borderRadius: '15px', padding: '20px', marginBottom: '20px',
          border: '2px solid #ff9800'
        }}>
          <p style={{
            margin: 0, fontSize: '16px', fontStyle: 'italic',
            color: '#e65100', lineHeight: '1.6'
          }}>
            {t(currentSceneData.stageDirection)}
          </p>
        </div>

        {/* Dialogue Content */}
        {currentDialogueData.speaker === 'narrator' && (
          <div style={{
            background: '#f8f9fa', borderRadius: '15px', padding: '20px',
            marginBottom: '20px', textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '18px', color: '#495057' }}>
              {t(currentDialogueData.text)}
            </p>
            <button
              onClick={() => setCurrentLine(currentLine + 1)}
              style={{
                marginTop: '15px', background: '#6c757d', color: 'white',
                border: 'none', borderRadius: '25px', padding: '10px 25px',
                fontSize: '14px', cursor: 'pointer'
              }}
            >
              {t({ 'zh-tw': '繼續', 'zh-cn': '继续', 'en': 'Continue' })} →
            </button>
          </div>
        )}

        {currentDialogueData.speaker === 'player' && (
          <div style={{
            background: 'white', borderRadius: '15px', padding: '25px',
            marginBottom: '20px', border: '3px solid #e91e63'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#e91e63' }}>
              {t({ 'zh-tw': '你的台詞', 'zh-cn': '你的台词', 'en': 'Your Line' })}
            </h3>
            
            {/* Sentence Pattern Info */}
            <div style={{
              background: '#e3f2fd', borderRadius: '10px', padding: '15px',
              marginBottom: '20px', border: '2px solid #2196f3'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
                📝 {t({ 'zh-tw': '句型練習', 'zh-cn': '句型练习', 'en': 'Sentence Pattern Practice' })}
              </h4>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
                {sentencePatterns[currentDialogueData.pattern]?.structure}
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: '#1565c0' }}>
                {t(sentencePatterns[currentDialogueData.pattern]?.description)}
              </p>
            </div>

            {/* Target Sentence */}
            <div style={{
              background: '#f0f0f0', borderRadius: '10px', padding: '15px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 10px 0' }}>
                🎯 {t({ 'zh-tw': '目標台詞', 'zh-cn': '目标台词', 'en': 'Target Line' })}
              </h4>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                {t(currentDialogueData.targetSentence)}
              </p>
            </div>

            {/* Voice Recording Interface */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={startVoiceRecording}
                disabled={isRecording}
                style={{
                  background: isRecording ? '#f44336' : '#4caf50',
                  color: 'white', border: 'none', borderRadius: '50%',
                  width: '80px', height: '80px', fontSize: '30px',
                  cursor: 'pointer', marginBottom: '15px',
                  animation: isRecording ? 'pulse 1s infinite' : 'none'
                }}
              >
                {isRecording ? <MicOff /> : <Mic />}
              </button>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                {isRecording ? 
                  t({ 'zh-tw': '正在錄音...請說出台詞', 'zh-cn': '正在录音...请说出台词', 'en': 'Recording... Please speak your line' }) :
                  t({ 'zh-tw': '點擊開始演出', 'zh-cn': '点击开始演出', 'en': 'Click to start acting' })
                }
              </p>
            </div>

            {/* Manual Input Option */}
            <div style={{ marginTop: '20px' }}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={t({ 'zh-tw': '或者手動輸入台詞...', 'zh-cn': '或者手动输入台词...', 'en': 'Or manually input your line...' })}
                style={{
                  width: '100%', padding: '12px', borderRadius: '25px',
                  border: '2px solid #e0e0e0', fontSize: '16px'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && userInput.trim()) {
                    evaluateDialoguePerformance(userInput);
                  }
                }}
              />
              {userInput && (
                <button
                  onClick={() => evaluateDialoguePerformance(userInput)}
                  style={{
                    marginTop: '10px', background: '#2196f3', color: 'white',
                    border: 'none', borderRadius: '25px', padding: '10px 25px',
                    fontSize: '14px', cursor: 'pointer'
                  }}
                >
                  {t({ 'zh-tw': '提交台詞', 'zh-cn': '提交台词', 'en': 'Submit Line' })}
                </button>
              )}
            </div>
          </div>
        )}

        {currentDialogueData.speaker === 'shen_jiayi' && (
          <div style={{
            background: 'white', borderRadius: '15px', padding: '25px',
            marginBottom: '20px', border: '3px solid #2196f3'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#2196f3' }}>
              {t({ 'zh-tw': '沈佳宜', 'zh-cn': '沈佳宜', 'en': 'Shen Chia-yi' })}
            </h3>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: '1.6' }}>
              {t(currentDialogueData.text)}
            </p>
            <button
              onClick={() => {
                if (currentLine < getCurrentScene().dialogue.length - 1) {
                  setCurrentLine(currentLine + 1);
                } else {
                  proceedToNextScene();
                }
              }}
              style={{
                marginTop: '15px', background: '#2196f3', color: 'white',
                border: 'none', borderRadius: '25px', padding: '10px 25px',
                fontSize: '14px', cursor: 'pointer'
              }}
            >
              {t({ 'zh-tw': '繼續', 'zh-cn': '继续', 'en': 'Continue' })} →
            </button>
          </div>
        )}

        {currentDialogueData.speaker === 'minigame_trigger' && (
          <div style={{
            background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
            borderRadius: '15px', padding: '25px', marginBottom: '20px',
            border: '3px solid #4caf50', textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#2e7d32' }}>
              🎮 {t({ 'zh-tw': '互動挑戰', 'zh-cn': '互动挑战', 'en': 'Interactive Challenge' })}
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>
              {t(currentDialogueData.context)}
            </p>
            <button
              onClick={() => {
                setCurrentMinigame(currentDialogueData.type);
                setGamePhase('minigame');
              }}
              style={{
                background: '#4caf50', color: 'white', border: 'none',
                borderRadius: '25px', padding: '15px 30px', fontSize: '16px',
                cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              {t({ 'zh-tw': '開始挑戰', 'zh-cn': '开始挑战', 'en': 'Start Challenge' })}
            </button>
          </div>
        )}

        {/* Performance Feedback */}
        {performanceFeedback && (
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', background: 'white',
            borderRadius: '15px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            zIndex: 1000, textAlign: 'center', minWidth: '300px'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#e91e63' }}>
              {t({ 'zh-tw': '演出評價', 'zh-cn': '演出评价', 'en': 'Performance Review' })}
            </h3>
            <p style={{ margin: 0, fontSize: '16px' }}>
              {performanceFeedback}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderMinigame = () => {
    return (
      <div style={gameStyles.gameContainer}>
        <div style={{
          background: 'white', borderRadius: '15px', padding: '25px',
          marginBottom: '20px', textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#e91e63' }}>
            {t({ 'zh-tw': '小遊戲挑戰', 'zh-cn': '小游戏挑战', 'en': 'Mini-game Challenge' })}
          </h2>
          
          <div style={gameStyles.minigameArea}>
            <GameMinigames
              gameActive={true}
              timeLeft={sceneTimeLeft}
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
              onGoBack={() => setGamePhase('dialogue')}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderEnding = () => {
    let endingTitle, endingMessage, endingEmoji;
    
    if (affectionLevel >= 80) {
      endingTitle = { 'zh-tw': '💕 完美愛情結局', 'zh-cn': '💕 完美爱情结局', 'en': '💕 Perfect Love Ending' };
      endingMessage = { 'zh-tw': '你們的愛情就像電影一樣美好！表演非常出色！', 'zh-cn': '你们的爱情就像电影一样美好！表演非常出色！', 'en': 'Your love story is as beautiful as the movie! Excellent performance!' };
      endingEmoji = '🌟';
    } else if (affectionLevel >= 60) {
      endingTitle = { 'zh-tw': '😊 青春友誼結局', 'zh-cn': '😊 青春友谊结局', 'en': '😊 Youth Friendship Ending' };
      endingMessage = { 'zh-tw': '雖然沒有成為戀人，但青春的友誼也很珍貴', 'zh-cn': '虽然没有成为恋人，但青春的友谊也很珍贵', 'en': 'Though not lovers, youthful friendship is also precious' };
      endingEmoji = '🤝';
    } else {
      endingTitle = { 'zh-tw': '😔 遺憾結局', 'zh-cn': '😔 遗憾结局', 'en': '😔 Regretful Ending' };
      endingMessage = { 'zh-tw': '有些遺憾，但這也是青春的一部分', 'zh-cn': '有些遗憾，但这也是青春的一部分', 'en': 'Some regrets, but this is also part of youth' };
      endingEmoji = '💔';
    }

    return (
      <div style={gameStyles.gameContainer}>
        <div style={gameStyles.endingCard}>
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>{endingEmoji}</div>
          <h2 style={{ marginBottom: '15px', color: '#e91e63' }}>{t(endingTitle)}</h2>
          <p style={{ marginBottom: '30px', fontSize: '18px' }}>{t(endingMessage)}</p>
          
          <div style={{
            background: '#f8f9fa', borderRadius: '15px', padding: '20px',
            marginBottom: '30px'
          }}>
            <h3 style={{ marginBottom: '15px' }}>
              {t({ 'zh-tw': '表演統計', 'zh-cn': '表演统计', 'en': 'Performance Stats' })}
            </h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t({ 'zh-tw': '最終好感度', 'zh-cn': '最终好感度', 'en': 'Final Affection' })}:</span>
                <strong>{affectionLevel}%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t({ 'zh-tw': '總分數', 'zh-cn': '总分数', 'en': 'Total Score' })}:</span>
                <strong>{playerScore}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t({ 'zh-tw': '演技分數', 'zh-cn': '演技分数', 'en': 'Acting Score' })}:</span>
                <strong>{actingPerformance}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{t({ 'zh-tw': '完成幕數', 'zh-cn': '完成幕数', 'en': 'Acts Completed' })}:</span>
                <strong>{currentAct + 1}/{movieStory.acts.length}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={resetGame} style={gameStyles.playAgainButton}>
              {t({ 'zh-tw': '重新演出', 'zh-cn': '重新演出', 'en': 'Act Again' })}
            </button>
            <button onClick={goBackToLearn} style={gameStyles.shareButton}>
              {t({ 'zh-tw': '返回劇集選擇', 'zh-cn': '返回剧集选择', 'en': 'Back to Drama Selection' })}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderGameOver = () => (
    <div style={gameStyles.gameContainer}>
      <div style={gameStyles.endingCard}>
        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>😢</div>
        <h2 style={{ marginBottom: '15px', color: '#f44336' }}>
          {t({ 'zh-tw': '遊戲結束', 'zh-cn': '游戏结束', 'en': 'Game Over' })}
        </h2>
        <p style={{ marginBottom: '20px', fontSize: '16px' }}>
          {gamePhase === 'insufficient-affection' ? 
            t({ 'zh-tw': '好感度不足，無法進入下一幕...', 'zh-cn': '好感度不足，无法进入下一幕...', 'en': 'Insufficient affection, cannot proceed to next act...' }) :
            t({ 'zh-tw': '時間用完了，她對你失去了興趣...', 'zh-cn': '时间用完了，她对你失去了兴趣...', 'en': 'Time ran out, she lost interest in you...' })
          }
        </p>
        <p style={{ marginBottom: '30px', fontSize: '14px', color: '#666' }}>
          {t({ 'zh-tw': '記住：真誠的表演和正確的句型使用很重要！', 'zh-cn': '记住：真诚的表演和正确的句型使用很重要！', 'en': 'Remember: Sincere acting and correct sentence patterns are important!' })}
        </p>
        
        <button onClick={resetGame} style={gameStyles.playAgainButton}>
          {t({ 'zh-tw': '重新開始', 'zh-cn': '重新开始', 'en': 'Start Over' })}
        </button>
      </div>
    </div>
  );

  // Main render
  const renderContent = () => {
    switch (gamePhase) {
      case 'story-intro':
        return renderStoryIntro();
      case 'dialogue':
        return renderDialogueScene();
      case 'minigame':
        return renderMinigame();
      case 'ending':
        return renderEnding();
      case 'bad-ending':
      case 'insufficient-affection':
        return renderGameOver();
      default:
        return renderStoryIntro();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffebee, #f3e5f5)', position: 'relative' }}>
      {/* Language Toggle */}
      <button onClick={toggleLanguage} style={{
        position: 'fixed', top: '20px', right: '20px',
        background: '#e91e63', color: 'white', border: 'none',
        borderRadius: '25px', padding: '10px 15px', fontSize: '14px',
        fontWeight: 'bold', cursor: 'pointer', zIndex: 1000
      }}>
        {currentLanguage === 'zh-tw' ? '繁中' : 
         currentLanguage === 'zh-cn' ? '简中' : 'EN'} ⚙️
      </button>

      {renderContent()}
    </div>
  );
};

export default EnhancedRomancePage;