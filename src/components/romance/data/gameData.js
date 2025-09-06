// gameData.js - All static game data

export const characters = {
  male: {
    name: {
      'zh-tw': '柯景騰',
      'zh-cn': '柯景腾', 
      'en': 'Ko Ching-teng'
    },
    description: {
      'zh-tw': '調皮但溫柔的男生，喜歡惡作劇但內心很善良',
      'zh-cn': '调皮但温柔的男生，喜欢恶作剧但内心很善良',
      'en': 'Mischievous but gentle boy who loves pranks but has a kind heart'
    },
    personality: {
      'zh-tw': '幽默、執著、有點笨拙但很真誠',
      'zh-cn': '幽默、执着、有点笨拙但很真诚',
      'en': 'Humorous, persistent, a bit clumsy but very sincere'
    },
    emoji: '🏀'
  },
  female: {
    name: {
      'zh-tw': '沈佳宜',
      'zh-cn': '沈佳宜',
      'en': 'Shen Chia-yi'
    },
    description: {
      'zh-tw': '班上的模範生，聰明美麗但有點嚴肅',
      'zh-cn': '班上的模范生，聪明美丽但有点严肃',
      'en': 'Class model student, smart and beautiful but a bit serious'
    },
    personality: {
      'zh-tw': '認真、溫柔、有原則但偶爾會被逗笑',
      'zh-cn': '认真、温柔、有原则但偶尔会被逗笑',
      'en': 'Serious, gentle, principled but occasionally amused'
    },
    emoji: '📚'
  }
};

export const scenarios = [
  {
    id: 'note_passing',
    title: {
      'zh-tw': '課堂傳紙條',
      'zh-cn': '课堂传纸条',
      'en': 'Passing Notes in Class'
    },
    setting: {
      'zh-tw': '數學課教室',
      'zh-cn': '数学课教室',
      'en': 'Math Class'
    },
    background: {
      'zh-tw': '這是一個悶熱的下午，數學老師正在黑板上寫著複雜的公式。教室裡瀰漫著睡意，但你的心情卻很興奮，因為你坐在心儀對象的附近。你決定趁老師背對著大家的時候，偷偷寫一張紙條傳給對方。但要小心，如果被老師發現，你就慘了！',
      'zh-cn': '这是一个闷热的下午，数学老师正在黑板上写着复杂的公式。教室里弥漫着睡意，但你的心情却很兴奋，因为你坐在心仪对象的附近。你决定趁老师背对着大家的时候，偷偷写一张纸条传给对方。但要小心，如果被老师发现，你就惨了！',
      'en': 'It\'s a stuffy afternoon, and the math teacher is writing complex formulas on the blackboard. The classroom is filled with drowsiness, but you\'re excited because you\'re sitting near your crush. You decide to secretly write a note and pass it while the teacher\'s back is turned. But be careful - if the teacher catches you, you\'re in trouble!'
    },
    description: {
      'zh-tw': '老師在黑板上寫複雜的數學公式，你想趁機和心儀的人傳紙條...',
      'zh-cn': '老师在黑板上写复杂的数学公式，你想趁机和心仪的人传纸条...',
      'en': 'The teacher is writing complex math formulas on the board, you want to pass a note to your crush...'
    },
    minigame: 'note_writing',
    timeLimit: 30,
    riskLevel: 'medium',
    affectionReward: 15,
    affectionPenalty: -20
  },
  {
    id: 'study_session',
    title: {
      'zh-tw': '一起念書',
      'zh-cn': '一起念书',
      'en': 'Study Session Together'
    },
    setting: {
      'zh-tw': '圖書館',
      'zh-cn': '图书馆',
      'en': 'Library'
    },
    background: {
      'zh-tw': '期中考將近，整個學校都瀰漫著緊張的氣氛。圖書館裡坐滿了認真讀書的學生。你鼓起勇氣邀請暗戀對象一起來圖書館讀書，這是一個絕佳的機會可以展現你的學識，也能夠更加了解對方。但同時也有壓力，如果回答錯誤可能會讓對方對你的印象打折扣。',
      'zh-cn': '期中考将近，整个学校都弥漫着紧张的气氛。图书馆里坐满了认真读书的学生。你鼓起勇气邀请暗恋对象一起来图书馆读书，这是一个绝佳的机会可以展现你的学识，也能够更加了解对方。但同时也有压力，如果回答错误可能会让对方对你的印象打折扣。',
      'en': 'Midterm exams are approaching, and the whole school is filled with tension. The library is packed with students studying hard. You gather courage to invite your crush to study together in the library. This is a perfect opportunity to show your knowledge and get to know them better. But there\'s pressure too - wrong answers might hurt their impression of you.'
    },
    description: {
      'zh-tw': '期中考要到了，你鼓起勇氣邀請暗戀對象一起讀書...',
      'zh-cn': '期中考要到了，你鼓起勇气邀请暗恋对象一起读书...',
      'en': 'Midterm exams are coming, you gather courage to invite your crush to study together...'
    },
    minigame: 'quiz_challenge',
    timeLimit: 45,
    riskLevel: 'low',
    affectionReward: 20,
    affectionPenalty: -10
  },
  {
    id: 'classroom_confession',
    title: {
      'zh-tw': '教室告白',
      'zh-cn': '教室告白',
      'en': 'Classroom Confession'
    },
    setting: {
      'zh-tw': '放學後的教室',
      'zh-cn': '放学后的教室',
      'en': 'After-school Classroom'
    },
    background: {
      'zh-tw': '夕陽西下，橘紅色的光芒透過窗戶灑進教室。同學們都已經離開，只剩下你們兩個人。這是電影中最經典的場景，也是表達心意的最佳時機。你的心跳加速，手心冒汗，這可能是改變一切的關鍵時刻。選擇正確的話語，用真誠打動對方的心。',
      'zh-cn': '夕阳西下，橘红色的光芒透过窗户洒进教室。同学们都已经离开，只剩下你们两个人。这是电影中最经典的场景，也是表达心意的最佳时机。你的心跳加速，手心冒汗，这可能是改变一切的关键时刻。选择正确的话语，用真诚打动对方的心。',
      'en': 'The sun is setting, casting orange-red light through the classroom windows. All classmates have left, only you two remain. This is the most classic scene from the movie and the perfect moment to express your feelings. Your heart races, palms sweat - this could be the moment that changes everything. Choose the right words and touch their heart with sincerity.'
    },
    description: {
      'zh-tw': '夕陽西下，只剩你們兩個人在教室裡，這是表達心意的最佳時機...',
      'zh-cn': '夕阳西下，只剩你们两个人在教室里，这是表达心意的最佳时机...',
      'en': 'The sun is setting, only you two are left in the classroom, the perfect moment to express your feelings...'
    },
    minigame: 'conversation',
    timeLimit: 60,
    riskLevel: 'high',
    affectionReward: 30,
    affectionPenalty: -25
  },
  {
    id: 'school_festival',
    title: {
      'zh-tw': '校園活動',
      'zh-cn': '校园活动',
      'en': 'School Festival'
    },
    setting: {
      'zh-tw': '校園慶典',
      'zh-cn': '校园庆典',
      'en': 'School Festival'
    },
    background: {
      'zh-tw': '一年一度的校園慶典到了！整個校園裝飾得五彩繽紛，到處都是歡樂的笑聲和熱鬧的攤位。空氣中瀰漫著烤香腸和爆米花的香味。這是一個輕鬆愉快的環境，最適合和心儀的人一起度過美好時光。你們可以一起玩遊戲、吃小食、聽音樂表演，在這種歡樂的氛圍中，感情很容易升溫。',
      'zh-cn': '一年一度的校园庆典到了！整个校园装饰得五彩缤纷，到处都是欢乐的笑声和热闹的摊位。空气中弥漫着烤香肠和爆米花的香味。这是一个轻松愉快的环境，最适合和心仪的人一起度过美好时光。你们可以一起玩游戏、吃小食、听音乐表演，在这种欢乐的氛围中，感情很容易升温。',
      'en': 'The annual school festival has arrived! The entire campus is decorated colorfully, filled with joyful laughter and lively stalls everywhere. The air is filled with the aroma of grilled sausages and popcorn. This is a relaxed and happy environment, perfect for spending quality time with your crush. You can play games together, eat snacks, and listen to music performances. In this joyful atmosphere, feelings can easily grow stronger.'
    },
    description: {
      'zh-tw': '學校舉辦園遊會，到處都是歡樂的氣氛，你想邀請心儀的人一起逛攤位...',
      'zh-cn': '学校举办园游会，到处都是欢乐的气氛，你想邀请心仪的人一起逛摊位...',
      'en': 'The school is holding a festival, there\'s a joyful atmosphere everywhere, you want to invite your crush to visit stalls together...'
    },
    minigame: 'date_simulation',
    timeLimit: 40,
    riskLevel: 'low',
    affectionReward: 25,
    affectionPenalty: -5
  }
];

export const allQuizQuestions = [
  // Set 1: Taiwan Culture
  [
    {
      question: {
        'zh-tw': '在台灣，哪個節日會放天燈？',
        'zh-cn': '在台湾，哪个节日会放天灯？',
        'en': 'In Taiwan, which festival involves releasing sky lanterns?'
      },
      options: [
        { 'zh-tw': '元宵節', 'zh-cn': '元宵节', 'en': 'Lantern Festival' },
        { 'zh-tw': '中秋節', 'zh-cn': '中秋节', 'en': 'Mid-Autumn Festival' },
        { 'zh-tw': '端午節', 'zh-cn': '端午节', 'en': 'Dragon Boat Festival' },
        { 'zh-tw': '春節', 'zh-cn': '春节', 'en': 'Spring Festival' }
      ],
      correct: 0
    },
    {
      question: {
        'zh-tw': '台灣最高的山是？',
        'zh-cn': '台湾最高的山是？',
        'en': 'What is the highest mountain in Taiwan?'
      },
      options: [
        { 'zh-tw': '玉山', 'zh-cn': '玉山', 'en': 'Yushan' },
        { 'zh-tw': '阿里山', 'zh-cn': '阿里山', 'en': 'Alishan' },
        { 'zh-tw': '合歡山', 'zh-cn': '合欢山', 'en': 'Hehuan Mountain' },
        { 'zh-tw': '雪山', 'zh-cn': '雪山', 'en': 'Snow Mountain' }
      ],
      correct: 0
    }
  ],
  // Set 2: Movie Knowledge
  [
    {
      question: {
        'zh-tw': '電影《那些年》的男主角名字是？',
        'zh-cn': '电影《那些年》的男主角名字是？',
        'en': 'What is the male lead\'s name in "You Are the Apple of My Eye"?'
      },
      options: [
        { 'zh-tw': '柯景騰', 'zh-cn': '柯景腾', 'en': 'Ko Ching-teng' },
        { 'zh-tw': '沈佳宜', 'zh-cn': '沈佳宜', 'en': 'Shen Chia-yi' },
        { 'zh-tw': '許博淳', 'zh-cn': '许博淳', 'en': 'Xu Bo-chun' },
        { 'zh-tw': '曹國勝', 'zh-cn': '曹国胜', 'en': 'Cao Guo-sheng' }
      ],
      correct: 0
    },
    {
      question: {
        'zh-tw': '電影中男主角最喜歡的運動是？',
        'zh-cn': '电影中男主角最喜欢的运动是？',
        'en': 'What is the male lead\'s favorite sport in the movie?'
      },
      options: [
        { 'zh-tw': '籃球', 'zh-cn': '篮球', 'en': 'Basketball' },
        { 'zh-tw': '棒球', 'zh-cn': '棒球', 'en': 'Baseball' },
        { 'zh-tw': '足球', 'zh-cn': '足球', 'en': 'Football' },
        { 'zh-tw': '網球', 'zh-cn': '网球', 'en': 'Tennis' }
      ],
      correct: 0
    }
  ],
  // Set 3: Math Problems
  [
    {
      question: {
        'zh-tw': '如果 x + 5 = 12，那麼 x 等於多少？',
        'zh-cn': '如果 x + 5 = 12，那么 x 等于多少？',
        'en': 'If x + 5 = 12, what does x equal?'
      },
      options: [
        { 'zh-tw': '7', 'zh-cn': '7', 'en': '7' },
        { 'zh-tw': '17', 'zh-cn': '17', 'en': '17' },
        { 'zh-tw': '5', 'zh-cn': '5', 'en': '5' },
        { 'zh-tw': '12', 'zh-cn': '12', 'en': '12' }
      ],
      correct: 0
    },
    {
      question: {
        'zh-tw': '一個三角形的內角和是多少度？',
        'zh-cn': '一个三角形的内角和是多少度？',
        'en': 'What is the sum of interior angles in a triangle?'
      },
      options: [
        { 'zh-tw': '180度', 'zh-cn': '180度', 'en': '180 degrees' },
        { 'zh-tw': '360度', 'zh-cn': '360度', 'en': '360 degrees' },
        { 'zh-tw': '90度', 'zh-cn': '90度', 'en': '90 degrees' },
        { 'zh-tw': '270度', 'zh-cn': '270度', 'en': '270 degrees' }
      ],
      correct: 0
    }
  ],
  // Set 4: Literature
  [
    {
      question: {
        'zh-tw': '《紅樓夢》的作者是誰？',
        'zh-cn': '《红楼梦》的作者是谁？',
        'en': 'Who is the author of "Dream of the Red Chamber"?'
      },
      options: [
        { 'zh-tw': '曹雪芹', 'zh-cn': '曹雪芹', 'en': 'Cao Xueqin' },
        { 'zh-tw': '吳承恩', 'zh-cn': '吴承恩', 'en': 'Wu Cheng\'en' },
        { 'zh-tw': '施耐庵', 'zh-cn': '施耐庵', 'en': 'Shi Nai\'an' },
        { 'zh-tw': '羅貫中', 'zh-cn': '罗贯中', 'en': 'Luo Guanzhong' }
      ],
      correct: 0
    },
    {
      question: {
        'zh-tw': '莎士比亞的著名悲劇《哈姆雷特》中，主角的經典台詞是？',
        'zh-cn': '莎士比亚的著名悲剧《哈姆雷特》中，主角的经典台词是？',
        'en': 'What is Hamlet\'s famous line in Shakespeare\'s tragedy?'
      },
      options: [
        { 'zh-tw': 'To be or not to be', 'zh-cn': 'To be or not to be', 'en': 'To be or not to be' },
        { 'zh-tw': 'All the world\'s a stage', 'zh-cn': 'All the world\'s a stage', 'en': 'All the world\'s a stage' },
        { 'zh-tw': 'Et tu, Brute?', 'zh-cn': 'Et tu, Brute?', 'en': 'Et tu, Brute?' },
        { 'zh-tw': 'Love looks not with the eyes', 'zh-cn': 'Love looks not with the eyes', 'en': 'Love looks not with the eyes' }
      ],
      correct: 0
    }
  ],
  // Set 5: Science
  [
    {
      question: {
        'zh-tw': '水的化學分子式是？',
        'zh-cn': '水的化学分子式是？',
        'en': 'What is the chemical formula for water?'
      },
      options: [
        { 'zh-tw': 'H2O', 'zh-cn': 'H2O', 'en': 'H2O' },
        { 'zh-tw': 'CO2', 'zh-cn': 'CO2', 'en': 'CO2' },
        { 'zh-tw': 'O2', 'zh-cn': 'O2', 'en': 'O2' },
        { 'zh-tw': 'H2SO4', 'zh-cn': 'H2SO4', 'en': 'H2SO4' }
      ],
      correct: 0
    }
  ]
];

// AI Response templates
export const aiResponseTemplates = {
  note_writing: [
    {
      'zh-tw': '你在寫什麼？看起來很神秘的樣子...',
      'zh-cn': '你在写什么？看起来很神秘的样子...',
      'en': 'What are you writing? It looks very mysterious...'
    },
    {
      'zh-tw': '小心老師看到喔！',
      'zh-cn': '小心老师看到哦！',
      'en': 'Be careful the teacher doesn\'t see!'
    }
  ],
  study_session: [
    {
      'zh-tw': '這題數學好難，你會嗎？',
      'zh-cn': '这题数学好难，你会吗？',
      'en': 'This math problem is so hard, do you know how to solve it?'
    },
    {
      'zh-tw': '謝謝你願意和我一起讀書',
      'zh-cn': '谢谢你愿意和我一起读书',
      'en': 'Thank you for being willing to study with me'
    }
  ],
  conversation: [
    {
      'zh-tw': '你找我有什麼事嗎？',
      'zh-cn': '你找我有什么事吗？',
      'en': 'Did you want to talk to me about something?'
    },
    {
      'zh-tw': '夕陽真美呢...',
      'zh-cn': '夕阳真美呢...',
      'en': 'The sunset is really beautiful...'
    }
  ],
  date_simulation: [
    {
      'zh-tw': '這個園遊會好熱鬧啊！',
      'zh-cn': '这个园游会好热闹啊！',
      'en': 'This festival is so lively!'
    },
    {
      'zh-tw': '謝謝你邀請我一起來',
      'zh-cn': '谢谢你邀请我一起来',
      'en': 'Thank you for inviting me to come together'
    }
  ]
};

// Festival date activities
export const festivalActivities = [
  { 
    activity: {
      'zh-tw': '🎪 逛遊戲攤位',
      'zh-cn': '🎪 逛游戏摊位',
      'en': '🎪 Visit game stalls'
    },
    success: 0.7
  },
  {
    activity: {
      'zh-tw': '🍭 買糖葫蘆',
      'zh-cn': '🍭 买糖葫芦',
      'en': '🍭 Buy candy apples'
    },
    success: 0.8
  },
  {
    activity: {
      'zh-tw': '🎵 聽音樂表演',
      'zh-cn': '🎵 听音乐表演',
      'en': '🎵 Listen to music performance'
    },
    success: 0.6
  },
  {
    activity: {
      'zh-tw': '🎯 射氣球遊戲',
      'zh-cn': '🎯 射气球游戏',
      'en': '🎯 Balloon shooting game'
    },
    success: 0.5
  },
  {
    activity: {
      'zh-tw': '🍜 一起吃小食',
      'zh-cn': '🍜 一起吃小食',
      'en': '🍜 Share snacks together'
    },
    success: 0.9
  }
];