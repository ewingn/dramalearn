import React, { useState } from 'react';
import { ChevronRight, Play, BookOpen, Users, Clock, Star } from 'lucide-react';

const LearnPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock navigation function
  const navigate = (path) => {
    alert(`Navigation to ${path} - This would redirect in a full app`);
  };

  const categories = [
    {
      id: 'romance',
      icon: '🌸',
      title: '青春初戀',
      subtitle: '那些年我們一起追的女孩 風格',
      description: '重溫青澀的校園時光，體驗純真的初戀情感。學習青少年的日常對話，掌握表達暗戀、友情和青春煩惱的中文表達方式。',
      difficulty: '中級',
      duration: '45-60分鐘',
      participants: '1-2人',
      rating: 4.8,
      episodes: [
        '校園告白場景 - 天台的勇氣',
        '青春回憶 - 那些年的約定', 
        '畢業季 - 不說再見的告別',
        '同窗情深 - 最後的夏天'
      ],
      skills: ['日常對話', '情感表達', '校園用語', '青春回憶'],
      available: true
    },
    {
      id: 'mystery',
      icon: '🔍',
      title: '懸疑推理',
      subtitle: '誰是被害者 風格',
      description: '化身偵探，在撲朔迷離的案件中學習中文。掌握正式的詢問技巧、邏輯推理的表達方式，以及台灣警匪劇的專業術語。',
      difficulty: '高級',
      duration: '60-90分鐘',
      participants: '2-4人',
      rating: 4.6,
      episodes: [
        '現場調查 - 尋找關鍵證據',
        '嫌疑人訊問 - 心理攻防戰',
        '真相大白 - 推理大揭密',
        '法庭對決 - 正義的聲音'
      ],
      skills: ['正式用語', '邏輯表達', '專業術語', '推理分析'],
      available: false
    },
    {
      id: 'classics',
      icon: '⭐',
      title: '經典重現',
      subtitle: '流星花園 風格',
      description: '重溫經典台劇的魅力時刻，體驗豪門世家的愛恨情仇。學習不同社會階層的語言差異，掌握優雅與霸氣並存的中文表達。',
      difficulty: '中高級',
      duration: '50-75分鐘',
      participants: '2-3人',
      rating: 4.9,
      episodes: [
        '豪門初遇 - 命運的安排',
        '階級對立 - 尊嚴的較量',
        '真愛考驗 - 選擇的勇氣',
        '完美結局 - 愛情的勝利'
      ],
      skills: ['正式敬語', '社交禮儀', '階層差異', '情感衝突'],
      available: false
    },
    {
      id: 'fate',
      icon: '💫',
      title: '命中注定',
      subtitle: '命中注定我愛你 風格',
      description: '相信命運的安排，體驗意外邂逅帶來的浪漫愛情。學習表達驚喜、感動和深情的中文方式，掌握浪漫告白的藝術。',
      difficulty: '中級',
      duration: '40-55分鐘',
      participants: '2人',
      rating: 4.7,
      episodes: [
        '意外邂逅 - 緣分的開始',
        '假扮情侶 - 戲假情真',
        '誤會重重 - 愛在心裡難開口',
        '真情告白 - 命運的選擇'
      ],
      skills: ['浪漫表達', '情感交流', '誤會解釋', '告白技巧'],
      available: false
    }
  ];

  const handleCategoryClick = (category) => {
    if (category.available) {
      navigate(`/learn/${category.id}`);
    } else {
      setSelectedCategory(selectedCategory === category.id ? null : category.id);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case '初級': return 'bg-green-100 text-green-700';
      case '中級': return 'bg-yellow-100 text-yellow-700';
      case '中高級': return 'bg-orange-100 text-orange-700';
      case '高級': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            劇集分類 📺
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            選擇你最喜愛的台劇類型，開始沉浸式中文學習之旅。每個類型都有不同的難度等級和學習重點，適合各種程度的學習者。
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedCategory === category.id 
                  ? 'border-blue-500 shadow-2xl transform scale-[1.02]' 
                  : 'border-gray-200 hover:border-blue-300'
              } ${!category.available ? 'opacity-75' : ''}`}
            >
              {/* Available Badge */}
              <div className="absolute top-4 right-4 z-10">
                {category.available ? (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    現已開放
                  </span>
                ) : (
                  <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    即將推出
                  </span>
                )}
              </div>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{category.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                    </div>
                    <p className="text-blue-600 font-medium">{category.subtitle}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{category.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{category.participants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">{category.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(category.difficulty)}`}>
                    {category.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">學習重點：</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Episodes Preview */}
                {selectedCategory === category.id && (
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      精選場景：
                    </h4>
                    <div className="space-y-3">
                      {category.episodes.map((episode, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 font-medium">{episode}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                  {category.available ? (
                    <button 
                      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/learn/${category.id}`);
                      }}
                    >
                      <Play className="w-4 h-4" />
                      開始學習
                    </button>
                  ) : (
                    <button 
                      className="flex items-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold cursor-not-allowed"
                      disabled
                    >
                      <Clock className="w-4 h-4" />
                      敬請期待
                    </button>
                  )}
                  
                  <button 
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(selectedCategory === category.id ? null : category.id);
                    }}
                  >
                    {selectedCategory === category.id ? '收起詳情' : '查看詳情'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedCategory === category.id ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 text-center border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            更多精彩內容即將推出 🚀
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            我們正在努力開發更多互動式學習體驗！Beta 版本將於 2025 年夏天正式上線。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="font-bold text-gray-900 mb-2">互動體驗</h3>
              <p className="text-gray-600">沉浸式劇情選擇與AI對話</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="font-bold text-gray-900 mb-2">行動應用</h3>
              <p className="text-gray-600">隨時隨地學習，離線也能用</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="font-bold text-gray-900 mb-2">成就系統</h3>
              <p className="text-gray-600">追蹤進度，解鎖新的挑戰</p>
            </div>
          </div>
          
          <button className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
            加入等候名單
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;