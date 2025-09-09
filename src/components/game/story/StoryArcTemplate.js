// src/components/game/story/StoryArcTemplate.js

// Base story arc configuration template
export const createStoryArc = (config) => ({
  // Meta information
  id: config.id,
  title: config.title,
  description: config.description,
  genre: config.genre,
  difficulty: config.difficulty || 'medium',
  estimatedPlayTime: config.estimatedPlayTime || 30, // minutes
  
  // Characters involved in this story
  characters: config.characters || [],
  
  // Story structure
  story: {
    acts: config.acts || []
  },
  
  // Game mechanics
  progressionRules: config.progressionRules,
  onMinigameComplete: config.onMinigameComplete,
  
  // Endings configuration
  endings: config.endings || {},
  
  // UI customization
  theme: config.theme || 'default',
  
  // Learning objectives
  learningObjectives: config.learningObjectives || []
});

// Romance drama configuration (那些年 style)
export const romanceStoryConfig = createStoryArc({
  id: 'romance_school',
  title: {
    'zh-tw': '那些年，我們一起追的女孩',
    'zh-cn': '那些年，我们一起追的女孩',
    'en': 'You Are the Apple of My Eye'
  },
  description: {
    'zh-tw': '重溫青澀的校園時光，體驗純真的初戀',
    'zh-cn': '重温青涩的校园时光，体验纯真的初恋',
    'en': 'Relive innocent school days and experience pure first love'
  },
  genre: 'romance',
  difficulty: 'beginner',
  estimatedPlayTime: 25,
  
  characters: [
    {
      id: 'shen_jiayi',
      name: {
        'zh-tw': '沈佳宜',
        'zh-cn': '沈佳宜',
        'en': 'Shen Chia-yi'
      },
      role: 'love_interest',
      personality: {
        'zh-tw': '聰明、認真、溫柔',
        'zh-cn': '聪明、认真、温柔',
        'en': 'Smart, serious, gentle'
      },
      avatar: '📚',
      initialStats: {
        affection: 40,
        trustLevel: 30,
        curiosity: 60
      }
    },
    {
      id: 'teacher',
      name: {
        'zh-tw': '數學老師',
        'zh-cn': '数学老师',
        'en': 'Math Teacher'
      },
      role: 'antagonist',
      personality: {
        'zh-tw': '嚴格、觀察力強',
        'zh-cn': '严格、观察力强',
        'en': 'Strict, observant'
      },
      avatar: '👨‍🏫',
      initialStats: {
        suspicion: 0,
        attention: 50
      }
    }
  ],
  
  acts: [
    {
      id: 'first_encounter',
      title: {
        'zh-tw': '第一次相遇',
        'zh-cn': '第一次相遇',
        'en': 'First Encounter'
      },
      description: {
        'zh-tw': '數學課上的初次相遇',
        'zh-cn': '数学课上的初次相遇',
        'en': 'First meeting in math class'
      },
      requiredStats: {
        relationships: {
          shen_jiayi: { affection: 0 }
        }
      },
      scenes: [
        {
          id: 'math_class',
          setting: {
            'zh-tw': '📚 數學課教室',
            'zh-cn': '📚 数学课教室',
            'en': '📚 Math Classroom'
          },
          timeLimit: 90,
          atmosphere: {
            'zh-tw': '陽光透過窗戶灑進教室，你坐在後排，注意到前排認真聽課的她...',
            'zh-cn': '阳光透过窗户洒进教室，你坐在后排，注意到前排认真听课的她...',
            'en': 'Sunlight streams through classroom windows, you sit in the back and notice her listening attentively in front...'
          },
          objective: {
            'zh-tw': '成功引起沈佳宜的注意',
            'zh-cn': '成功引起沈佳宜的注意',
            'en': 'Successfully get Shen Chia-yi\'s attention'
          },
          dialogue: [
            {
              type: 'narration',
              content: {
                'zh-tw': '老師在黑板上寫著複雜的方程式，教室裡很安靜...',
                'zh-cn': '老师在黑板上写着复杂的方程式，教室里很安静...',
                'en': 'The teacher writes complex equations on the blackboard, the classroom is quiet...'
              }
            },
            {
              type: 'choice',
              content: {
                'zh-tw': '你想要引起她的注意，你決定...',
                'zh-cn': '你想要引起她的注意，你决定...',
                'en': 'You want to get her attention, you decide to...'
              },
              choices: [
                {
                  text: {
                    'zh-tw': '傳紙條給她',
                    'zh-cn': '传纸条给她',
                    'en': 'Pass her a note'
                  },
                  action: 'minigame',
                  minigame: {
                    type: 'note_passing',
                    config: {
                      title: {
                        'zh-tw': '傳紙條',
                        'zh-cn': '传纸条',
                        'en': 'Note Passing'
                      },
                      description: {
                        'zh-tw': '小心翼翼地寫一張紙條並傳給她',
                        'zh-cn': '小心翼翼地写一张纸条并传给她',
                        'en': 'Carefully write a note and pass it to her'
                      },
                      timeLimit: 45,
                      objective: {
                        'zh-tw': '在不被老師發現的情況下傳遞紙條',
                        'zh-cn': '在不被老师发现的情况下传递纸条',
                        'en': 'Pass the note without being caught by the teacher'
                      },
                      requiredWords: [
                        { 'zh-tw': '你好', 'zh-cn': '你好', 'en': 'hello' },
                        { 'zh-tw': '朋友', 'zh-cn': '朋友', 'en': 'friend' }
                      ],
                      hints: [
                        {
                          'zh-tw': '保持紙條簡短但有禮貌',
                          'zh-cn': '保持纸条简短但有礼貌',
                          'en': 'Keep the note short but polite'
                        },
                        {
                          'zh-tw': '注意老師的位置',
                          'zh-cn': '注意老师的位置',
                          'en': 'Watch the teacher\'s position'
                        }
                      ]
                    },
                    onSuccess: {
                      relationshipChanges: {
                        shen_jiayi: { affection: 15, curiosity: 10 }
                      },
                      nextDialogue: 'shen_response_positive'
                    },
                    onFailure: {
                      relationshipChanges: {
                        teacher: { suspicion: 20 }
                      },
                      nextDialogue: 'teacher_warning'
                    }
                  }
                },
                {
                  text: {
                    'zh-tw': '等下課再說',
                    'zh-cn': '等下课再说',
                    'en': 'Wait until after class'
                  },
                  action: 'dialogue',
                  relationshipChanges: {
                    shen_jiayi: { affection: 5 }
                  },
                  nextDialogue: 'patient_approach'
                }
              ]
            },
            {
              id: 'shen_response_positive',
              type: 'character_dialogue',
              speaker: 'shen_jiayi',
              content: {
                'zh-tw': '（回頭微笑）你的字寫得不錯呢！',
                'zh-cn': '（回头微笑）你的字写得不错呢！',
                'en': '(Turns back with a smile) Your handwriting is quite nice!'
              },
              choices: [
                {
                  text: {
                    'zh-tw': '謝謝！我們可以一起學習嗎？',
                    'zh-cn': '谢谢！我们可以一起学习吗？',
                    'en': 'Thank you! Can we study together?'
                  },
                  relationshipChanges: {
                    shen_jiayi: { affection: 10, trustLevel: 5 }
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'growing_closer',
      title: {
        'zh-tw': '感情升溫',
        'zh-cn': '感情升温',
        'en': 'Growing Closer'
      },
      requiredStats: {
        relationships: {
          shen_jiayi: { affection: 30 }
        }
      },
      scenes: [
        {
          id: 'library_study',
          setting: {
            'zh-tw': '📖 圖書館',
            'zh-cn': '📖 图书馆',
            'en': '📖 Library'
          },
          atmosphere: {
            'zh-tw': '期中考前的圖書館人潮擁擠，你們找到一個安靜的角落...',
            'zh-cn': '期中考前的图书馆人潮拥挤，你们找到一个安静的角落...',
            'en': 'The library is crowded before midterms, you find a quiet corner...'
          },
          dialogue: [
            {
              type: 'minigame_trigger',
              minigame: {
                type: 'connections',
                config: {
                  title: {
                    'zh-tw': '中文詞語配對',
                    'zh-cn': '中文词语配对',
                    'en': 'Chinese Word Matching'
                  },
                  description: {
                    'zh-tw': '沈佳宜想測試你的中文程度',
                    'zh-cn': '沈佳宜想测试你的中文程度',
                    'en': 'Shen Chia-yi wants to test your Chinese level'
                  },
                  words: [
                    { 'zh-tw': '春天', 'zh-cn': '春天', 'en': 'spring' },
                    { 'zh-tw': '櫻花', 'zh-cn': '樱花', 'en': 'cherry blossoms' },
                    { 'zh-tw': '夏天', 'zh-cn': '夏天', 'en': 'summer' },
                    { 'zh-tw': '海邊', 'zh-cn': '海边', 'en': 'seaside' },
                    { 'zh-tw': '秋天', 'zh-cn': '秋天', 'en': 'autumn' },
                    { 'zh-tw': '楓葉', 'zh-cn': '枫叶', 'en': 'maple leaves' },
                    { 'zh-tw': '冬天', 'zh-cn': '冬天', 'en': 'winter' },
                    { 'zh-tw': '雪花', 'zh-cn': '雪花', 'en': 'snowflakes' }
                  ],
                  pairs: [
                    ['春天', '櫻花'],
                    ['夏天', '海邊'],
                    ['秋天', '楓葉'],
                    ['冬天', '雪花']
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  ],
  
  progressionRules: (gameState) => {
    const shenAffection = gameState.relationships.shen_jiayi?.affection || 0;
    const currentAct = gameState.currentAct;
    
    // Check if player can advance to next act
    if (currentAct === 0 && shenAffection < 30) {
      return {
        allowed: false,
        endingType: 'too_shy',
        message: {
          'zh-tw': '你太害羞了，錯失了機會...',
          'zh-cn': '你太害羞了，错失了机会...',
          'en': 'You were too shy and missed the opportunity...'
        }
      };
    }
    
    if (currentAct === 1 && shenAffection < 60) {
      return {
        allowed: false,
        endingType: 'friend_zone',
        message: {
          'zh-tw': '你們只能做朋友...',
          'zh-cn': '你们只能做朋友...',
          'en': 'You can only be friends...'
        }
      };
    }
    
    return { allowed: true };
  },
  
  onMinigameComplete: (result, gameState) => {
    // Story-specific logic for minigame completion
    console.log('Romance story minigame completed:', result);
  },
  
  endings: {
    perfect: {
      title: {
        'zh-tw': '💕 完美愛情',
        'zh-cn': '💕 完美爱情',
        'en': '💕 Perfect Love'
      },
      description: {
        'zh-tw': '你們成為了最佳情侶，就像電影一樣美好！',
        'zh-cn': '你们成为了最佳情侣，就像电影一样美好！',
        'en': 'You became the perfect couple, beautiful like in the movies!'
      },
      requirements: {
        relationships: {
          shen_jiayi: { affection: 80 }
        },
        playerStats: {
          charisma: 60
        }
      }
    },
    good: {
      title: {
        'zh-tw': '😊 青春友誼',
        'zh-cn': '😊 青春友谊',
        'en': '😊 Youth Friendship'
      },
      description: {
        'zh-tw': '雖然沒有成為戀人，但建立了深厚的友誼',
        'zh-cn': '虽然没有成为恋人，但建立了深厚的友谊',
        'en': 'Though not lovers, you built a deep friendship'
      }
    },
    friend_zone: {
      title: {
        'zh-tw': '😔 朋友關係',
        'zh-cn': '😔 朋友关系',
        'en': '😔 Just Friends'
      },
      description: {
        'zh-tw': '她說你是個很好的朋友...',
        'zh-cn': '她说你是个很好的朋友...',
        'en': 'She says you\'re a very good friend...'
      }
    }
  },
  
  theme: {
    primaryColor: '#e91e63',
    secondaryColor: '#f8bbd9',
    backgroundColor: 'linear-gradient(135deg, #ffebee, #f3e5f5)',
    fonts: {
      primary: 'Inter, sans-serif',
      secondary: 'Georgia, serif'
    }
  },
  
  learningObjectives: [
    {
      'zh-tw': '學習校園生活相關詞彙',
      'zh-cn': '学习校园生活相关词汇',
      'en': 'Learn campus life vocabulary'
    },
    {
      'zh-tw': '掌握表達感情的中文方式',
      'zh-cn': '掌握表达感情的中文方式',
      'en': 'Master Chinese expressions of emotions'
    },
    {
      'zh-tw': '練習日常對話和社交技巧',
      'zh-cn': '练习日常对话和社交技巧',
      'en': 'Practice daily conversation and social skills'
    }
  ]
});

// Mystery drama configuration template
export const mysteryStoryConfig = createStoryArc({
  id: 'mystery_crime',
  title: {
    'zh-tw': '誰是被害者',
    'zh-cn': '谁是被害者',
    'en': 'The Victims Game'
  },
  description: {
    'zh-tw': '化身偵探，在撲朔迷離的案件中學習中文',
    'zh-cn': '化身侦探，在扑朔迷离的案件中学习中文',
    'en': 'Become a detective and learn Chinese through mysterious cases'
  },
  genre: 'mystery',
  difficulty: 'intermediate',
  estimatedPlayTime: 40,
  
  characters: [
    {
      id: 'detective_fang',
      name: {
        'zh-tw': '方毅任',
        'zh-cn': '方毅任',
        'en': 'Fang Yi-ren'
      },
      role: 'partner',
      personality: {
        'zh-tw': '經驗豐富、直覺敏銳',
        'zh-cn': '经验丰富、直觉敏锐',
        'en': 'Experienced, sharp intuition'
      },
      avatar: '🕵️',
      initialStats: {
        trust: 50,
        respect: 40
      }
    },
    {
      id: 'suspect_a',
      name: {
        'zh-tw': '嫌疑人甲',
        'zh-cn': '嫌疑人甲',
        'en': 'Suspect A'
      },
      role: 'suspect',
      personality: {
        'zh-tw': '神秘、防備心強',
        'zh-cn': '神秘、防备心强',
        'en': 'Mysterious, guarded'
      },
      avatar: '🎭',
      initialStats: {
        cooperation: 20,
        suspicion: 70
      }
    }
  ],
  
  acts: [
    {
      id: 'crime_scene',
      title: {
        'zh-tw': '案發現場',
        'zh-cn': '案发现场',
        'en': 'Crime Scene'
      },
      scenes: [
        {
          id: 'initial_investigation',
          setting: {
            'zh-tw': '🏢 辦公大樓',
            'zh-cn': '🏢 办公大楼',
            'en': '🏢 Office Building'
          },
          dialogue: [
            {
              type: 'minigame_trigger',
              minigame: {
                type: 'quiz',
                config: {
                  title: {
                    'zh-tw': '證據分析',
                    'zh-cn': '证据分析',
                    'en': 'Evidence Analysis'
                  },
                  questions: [
                    {
                      question: {
                        'zh-tw': '現場發現的證據中，哪一個最重要？',
                        'zh-cn': '现场发现的证据中，哪一个最重要？',
                        'en': 'Among the evidence found at the scene, which is most important?'
                      },
                      options: [
                        { 'zh-tw': '指紋', 'zh-cn': '指纹', 'en': 'Fingerprints' },
                        { 'zh-tw': '監視器錄影', 'zh-cn': '监视器录影', 'en': 'Security footage' },
                        { 'zh-tw': '證人證詞', 'zh-cn': '证人证词', 'en': 'Witness testimony' },
                        { 'zh-tw': '動機分析', 'zh-cn': '动机分析', 'en': 'Motive analysis' }
                      ],
                      correct: 1
                    }
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  ],
  
  progressionRules: (gameState) => {
    const detectiveRespect = gameState.relationships.detective_fang?.respect || 0;
    
    if (detectiveRespect < 40) {
      return {
        allowed: false,
        endingType: 'case_failed',
        message: {
          'zh-tw': '搭檔對你失去信心，案件調查失敗...',
          'zh-cn': '搭档对你失去信心，案件调查失败...',
          'en': 'Your partner lost confidence in you, case investigation failed...'
        }
      };
    }
    
    return { allowed: true };
  }
});

// Factory function to create custom story arcs
export const createCustomStoryArc = (baseTemplate, customizations) => {
  return {
    ...baseTemplate,
    ...customizations,
    characters: [
      ...(baseTemplate.characters || []),
      ...(customizations.characters || [])
    ],
    acts: customizations.acts || baseTemplate.acts,
    theme: {
      ...baseTemplate.theme,
      ...customizations.theme
    }
  };
};

// Story arc registry
export const storyRegistry = {
  romance: romanceStoryConfig,
  mystery: mysteryStoryConfig
};

// Helper function to get story config
export const getStoryConfig = (storyId) => {
  return storyRegistry[storyId] || null;
};