import { useState } from "react";

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'romance',
      icon: '🌸',
      titleKey: 'zh-tw:青春初戀|zh-cn:青春初恋|en:Youth Romance',
      subtitleKey: 'zh-tw:那些年我們一起追的女孩 風格|zh-cn:那些年我们一起追的女孩 风格|en:You Are the Apple of My Eye Style',
      descriptionKey: 'zh-tw:重溫青澀的校園時光，體驗純真的初戀情感。學習青少年的日常對話，掌握表達暗戀、友情和青春煩惱的中文表達方式。|zh-cn:重温青涩的校园时光，体验纯真的初恋情感。学习青少年的日常对话，掌握表达暗恋、友情和青春烦恼的中文表达方式。|en:Relive innocent campus moments and pure first love emotions. Learn teen daily conversations and express crushes, friendships, and youth troubles in Chinese.',
      episodes: [
        'zh-tw:校園告白場景 - 天台的勇氣|zh-cn:校园告白场景 - 天台的勇气|en:Campus Confession - Rooftop Courage',
        'zh-tw:青春回憶 - 那些年的約定|zh-cn:青春回忆 - 那些年的约定|en:Youth Memories - Promises of Those Years',
        'zh-tw:畢業季 - 不說再見的告別|zh-cn:毕业季 - 不说再见的告别|en:Graduation Season - Farewell Without Goodbyes',
        'zh-tw:同窗情深 - 最後的夏天|zh-cn:同窗情深 - 最后的夏天|en:Classmate Bond - Last Summer'
      ]
    },
    {
      id: 'mystery',
      icon: '🔍',
      titleKey: 'zh-tw:懸疑推理|zh-cn:悬疑推理|en:Mystery & Crime',
      subtitleKey: 'zh-tw:誰是被害者 風格|zh-cn:谁是被害者 风格|en:The Victims Game Style',
      descriptionKey: 'zh-tw:化身偵探，在撲朔迷離的案件中學習中文。掌握正式的詢問技巧、邏輯推理的表達方式，以及台灣警匪劇的專業術語。|zh-cn:化身侦探，在扑朔迷离的案件中学习中文。掌握正式的询问技巧、逻辑推理的表达方式，以及台湾警匪剧的专业术语。|en:Become a detective and learn Chinese through complex cases. Master formal questioning techniques, logical reasoning expressions, and professional terminology from Taiwanese crime dramas.',
      episodes: [
        'zh-tw:現場調查 - 尋找關鍵證據|zh-cn:现场调查 - 寻找关键证据|en:Crime Scene Investigation - Finding Key Evidence',
        'zh-tw:嫌疑人訊問 - 心理攻防戰|zh-cn:嫌疑人讯问 - 心理攻防战|en:Suspect Interrogation - Psychological Warfare',
        'zh-tw:真相大白 - 推理大揭密|zh-cn:真相大白 - 推理大揭密|en:Truth Revealed - The Great Deduction',
        'zh-tw:法庭對決 - 正義的聲音|zh-cn:法庭对决 - 正义的声音|en:Courtroom Battle - Voice of Justice'
      ]
    },
    {
      id: 'classics',
      icon: '⭐',
      titleKey: 'zh-tw:經典重現|zh-cn:经典重现|en:Classic Dramas',
      subtitleKey: 'zh-tw:流星花園 風格|zh-cn:流星花园 风格|en:Meteor Garden Style',
      descriptionKey: 'zh-tw:重溫經典台劇的魅力時刻，體驗豪門世家的愛恨情仇。學習不同社會階層的語言差異，掌握優雅與霸氣並存的中文表達。|zh-cn:重温经典台剧的魅力时刻，体验豪门世家的爱恨情仇。学习不同社会阶层的语言差异，掌握优雅与霸气并存的中文表达。|en:Relive classic Taiwanese drama moments and experience wealthy family love-hate relationships. Learn language differences across social classes and master elegant yet assertive Chinese expressions.',
      episodes: [
        'zh-tw:豪門初遇 - 命運的安排|zh-cn:豪门初遇 - 命运的安排|en:Elite First Meeting - Destiny\'s Arrangement',
        'zh-tw:階級對立 - 尊嚴的較量|zh-cn:阶级对立 - 尊严的较量|en:Class Conflict - Battle of Dignity',
        'zh-tw:真愛考驗 - 選擇的勇氣|zh-cn:真爱考验 - 选择的勇气|en:True Love Test - Courage to Choose',
        'zh-tw:完美結局 - 愛情的勝利|zh-cn:完美结局 - 爱情的胜利|en:Perfect Ending - Victory of Love'
      ]
    },
    {
      id: 'fate',
      icon: '💫',
      titleKey: 'zh-tw:命中注定|zh-cn:命中注定|en:Destined Love',
      subtitleKey: 'zh-tw:命中注定我愛你 風格|zh-cn:命中注定我爱你 风格|en:Fated to Love You Style',
      descriptionKey: 'zh-tw:相信命運的安排，體驗意外邂逅帶來的浪漫愛情。學習表達驚喜、感動和深情的中文方式，掌握浪漫告白的藝術。|zh-cn:相信命运的安排，体验意外邂逅带来的浪漫爱情。学习表达惊喜、感动和深情的中文方式，掌握浪漫告白的艺术。|en:Believe in destiny and experience romantic love through unexpected encounters. Learn to express surprise, emotion, and deep feelings in Chinese, mastering the art of romantic confessions.',
      episodes: [
        'zh-tw:意外邂逅 - 緣分的開始|zh-cn:意外邂逅 - 缘分的开始|en:Unexpected Encounter - Beginning of Fate',
        'zh-tw:假扮情侶 - 戲假情真|zh-cn:假扮情侣 - 戏假情真|en:Fake Couple - When Acting Becomes Real',
        'zh-tw:誤會重重 - 愛在心裡難開口|zh-cn:误会重重 - 爱在心里难开口|en:Misunderstandings - Love Hard to Express',
        'zh-tw:真情告白 - 命運的選擇|zh-cn:真情告白 - 命运的选择|en:True Confession - Destiny\'s Choice'
      ]
    }
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category.id ? null : category.id);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'white' }}>
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">
            <span data-text="zh-tw:劇集分類|zh-cn:剧集分类|en:Drama Categories">
              劇集分類
            </span>
          </h1>
          <p className="section-subtitle">
            <span data-text="zh-tw:選擇你最喜愛的台劇類型，開始沉浸式中文學習之旅|zh-cn:选择你最喜爱的台剧类型，开始沉浸式中文学习之旅|en:Choose your favorite Taiwanese drama genre and start your immersive Chinese learning journey">
              選擇你最喜愛的台劇類型，開始沉浸式中文學習之旅
            </span>
          </p>
        </div>

        <div className="categories-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginTop: '60px'
        }}>
          {categories.map((category) => (
            <div 
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
              style={{
                transform: selectedCategory === category.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                boxShadow: selectedCategory === category.id 
                  ? '0 20px 60px rgba(102, 126, 234, 0.3)' 
                  : '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="category-icon">{category.icon}</span>
              <h3>
                <span data-text={category.titleKey}>
                  {category.titleKey.split('|')[0].split(':')[1]}
                </span>
              </h3>
              <p className="category-subtitle">
                <span data-text={category.subtitleKey}>
                  {category.subtitleKey.split('|')[0].split(':')[1]}
                </span>
              </p>
              <p className="category-description">
                <span data-text={category.descriptionKey}>
                  {category.descriptionKey.split('|')[0].split(':')[1]}
                </span>
              </p>
              
              {selectedCategory === category.id && (
                <div style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f8faff, #e8f0ff)',
                  borderRadius: '12px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: '#333'
                  }}>
                    <span data-text="zh-tw:精選場景|zh-cn:精选场景|en:Featured Scenes">
                      精選場景
                    </span>
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {category.episodes.map((episode, index) => (
                      <li key={index} style={{
                        padding: '8px 0',
                        borderBottom: index < category.episodes.length - 1 ? '1px solid #e0e0e0' : 'none',
                        fontSize: '0.95rem',
                        color: '#555'
                      }}>
                        <span style={{ marginRight: '8px' }}>🎬</span>
                        <span data-text={episode}>
                          {episode.split('|')[0].split(':')[1]}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button style={{
                    marginTop: '20px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}>
                    <span data-text="zh-tw:開始學習|zh-cn:开始学习|en:Start Learning">
                      開始學習
                    </span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div style={{
          marginTop: '80px',
          padding: '60px',
          background: 'linear-gradient(135deg, #f8faff, #e8f0ff)',
          borderRadius: '24px',
          textAlign: 'center',
          border: '2px solid rgba(102, 126, 234, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <span data-text="zh-tw:即將推出|zh-cn:即将推出|en:Coming Soon">
              即將推出
            </span>
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            <span data-text="zh-tw:我們正在努力開發更多精彩內容！Beta 版本將於 2025 年夏天正式上線。|zh-cn:我们正在努力开发更多精彩内容！Beta 版本将于 2025 年夏天正式上线。|en:We're working hard to develop more exciting content! Beta version will launch in summer 2025.">
              我們正在努力開發更多精彩內容！Beta 版本將於 2025 年夏天正式上線。
            </span>
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎮</div>
              <h4 style={{ marginBottom: '10px', color: '#333' }}>
                <span data-text="zh-tw:互動體驗|zh-cn:互动体验|en:Interactive Experience">
                  互動體驗
                </span>
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                <span data-text="zh-tw:沉浸式劇情選擇|zh-cn:沉浸式剧情选择|en:Immersive story choices">
                  沉浸式劇情選擇
                </span>
              </p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📱</div>
              <h4 style={{ marginBottom: '10px', color: '#333' }}>
                <span data-text="zh-tw:行動應用|zh-cn:移动应用|en:Mobile App">
                  行動應用
                </span>
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                <span data-text="zh-tw:隨時隨地學習|zh-cn:随时随地学习|en:Learn anytime, anywhere">
                  隨時隨地學習
                </span>
              </p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏆</div>
              <h4 style={{ marginBottom: '10px', color: '#333' }}>
                <span data-text="zh-tw:成就系統|zh-cn:成就系统|en:Achievement System">
                  成就系統
                </span>
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                <span data-text="zh-tw:追蹤學習進度|zh-cn:追踪学习进度|en:Track learning progress">
                  追蹤學習進度
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}