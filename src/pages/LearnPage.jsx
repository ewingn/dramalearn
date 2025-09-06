// in src/pages/LearnPage.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function LearnPage() {
  const location = useLocation();

  const categories = [
    {
      id: "romance",
      icon: "🌸",
      titleKey:
        "zh-tw:青春初戀|zh-cn:青春初恋|en:Youth Romance",
      subtitleKey:
        "zh-tw:那些年我們一起追的女孩 風格|zh-cn:那些年我们一起追的女孩 风格|en:You Are the Apple of My Eye Style",
      descriptionKey:
        "zh-tw:重溫青澀的校園時光，體驗純真的初戀情感。學習青少年的日常對話，掌握表達暗戀、友情和青春煩惱的中文表達方式。|zh-cn:重温青涩的校园时光，体验纯真的初恋情感。学习青少年的日常对话，掌握表达暗恋、友情和青春烦恼的中文表达方式。|en:Relive innocent campus moments and pure first love emotions. Learn teen daily conversations and express crushes, friendships, and youth troubles in Chinese.",
      path: "/learn/romance",
    },
    {
      id: "mystery",
      icon: "🔍",
      titleKey:
        "zh-tw:懸疑推理|zh-cn:悬疑推理|en:Mystery & Crime",
      subtitleKey:
        "zh-tw:誰是被害者 風格|zh-cn:谁是被害者 风格|en:The Victims Game Style",
      descriptionKey:
        "zh-tw:化身偵探，在撲朔迷離的案件中學習中文。掌握正式的詢問技巧、邏輯推理的表達方式，以及台灣警匪劇的專業術語。|zh-cn:化身侦探，在扑朔迷离的案件中学习中文。掌握正式的询问技巧、逻辑推理的表达方式，以及台湾警匪剧的专业术语。|en:Become a detective and learn Chinese through complex cases. Master formal questioning techniques, logical reasoning expressions, and professional terminology from Taiwanese crime dramas.",
      path: "/learn/mystery",
    },
    {
      id: "classics",
      icon: "⭐",
      titleKey:
        "zh-tw:經典重現|zh-cn:经典重现|en:Classic Dramas",
      subtitleKey:
        "zh-tw:流星花園 風格|zh-cn:流星花园 风格|en:Meteor Garden Style",
      descriptionKey:
        "zh-tw:重溫經典台劇的魅力時刻，體驗豪門世家的愛恨情仇。學習不同社會階層的語言差異，掌握優雅與霸氣並存的中文表達。|zh-cn:重温经典台剧的魅力时刻，体验豪门世家的爱恨情仇。学习不同社会阶层的语言差异，掌握优雅与霸气并存的中文表达。|en:Relive classic Taiwanese drama moments and experience wealthy family love-hate relationships. Learn language differences across social classes and master elegant yet assertive Chinese expressions.",
      path: "/learn/classics",
    },
    {
      id: "fate",
      icon: "💫",
      titleKey:
        "zh-tw:命中注定|zh-cn:命中注定|en:Destined Love",
      subtitleKey:
        "zh-tw:命中注定我愛你 風格|zh-cn:命中注定我爱你 风格|en:Fated to Love You Style",
      descriptionKey:
        "zh-tw:相信命運的安排，體驗意外邂逅帶來的浪漫愛情。學習表達驚喜、感動和深情的中文方式，掌握浪漫告白的藝術。|zh-cn:相信命运的安排，体验意外邂逅带来的浪漫爱情。学习表达惊喜、感動和深情的中文方式，掌握浪漫告白的艺术。|en:Believe in destiny and experience romantic love through unexpected encounters. Learn to express surprise, emotion, and deep feelings in Chinese, mastering the art of romantic confessions.",
      path: "/learn/fate",
    },
    {
      id: "modern",
      icon: "🥂",
      titleKey:
        "zh-tw:都會愛情|zh-cn:都会爱情|en:Modern Romance",
      subtitleKey:
        "zh-tw:不夠善良的我們 風格|zh-cn:不够善良的我们 风格|en:Us That Weren't Good Enough Style",
      descriptionKey:
        "zh-tw:探索職場、婚姻與自我成長的複雜課題。學習成年人之間細膩的對話，以及如何處理生活中的兩難。|zh-cn:探索职场、婚姻与自我成长的复杂课题。学习成年人之间细腻的对话，以及如何處理生活中的兩難。|en:Explore the complexities of work, marriage, and self-growth. Learn nuanced conversations between adults and how to navigate life's dilemmas.",
      path: "/learn/modern",
    },
    {
      id: "family",
      icon: "👨‍👩‍👧‍👦",
      titleKey:
        "zh-tw:家庭溫情|zh-cn:家庭温情|en:Family Dramas",
      subtitleKey:
        "zh-tw:用溫暖的日常對話，感受家人的愛|zh-cn:用温暖的日常对话，感受家人的爱|en:Feel family love through warm daily conversations",
      descriptionKey:
        "zh-tw:從溫馨的家庭日常中學習。掌握家人間的對話、長輩的叮嚀、與兄弟姊妹的互動，感受最道地的台灣家庭氛圍。|zh-cn:从温馨的家庭日常中学习。掌握家人间的对话、長輩的叮嚀、與兄弟姊妹的互動，感受最道地的台灣家庭氛圍。|en:Learn from heartwarming family life. Master family conversations, elders' advice, and sibling interactions to experience authentic Taiwanese family vibes.",
      path: "/learn/family",
    },
  ];

  const getTranslatedText = (key, currentLanguage) => {
    const textData = key;
    if (textData) {
      const translations = textData.split("|").reduce((acc, item) => {
        const [k, value] = item.split(":");
        acc[k] = value;
        return acc;
      }, {});
      return translations[currentLanguage] || translations["zh-tw"];
    }
    return key;
  };

  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("dramalearn-language") || "zh-tw"
  );

  return (
    <div className="page-container">
      {/* Page header */}
      <section
        className="hero"
        style={{ minHeight: "60vh", padding: "120px 0 40px 0" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div className="hero-text">
            <h1 style={{ fontSize: "3rem" }}>
              <span data-text="zh-tw:劇集分類|zh-cn:剧集分类|en:Drama Categories">
                劇集分類
              </span>
            </h1>
            <p
              className="subtitle"
              style={{
                fontSize: "1.2rem",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              <span data-text="zh-tw:選擇你最喜愛的台劇類型，開始沉浸式中文學習之旅|zh-cn:选择你最喜爱的台剧类型，开始沉浸式中文学习之旅|en:Choose your favorite Taiwanese drama genre and start your immersive Chinese learning journey">
                選擇你最喜愛的台劇類型，開始沉浸式中文學習之旅
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="drama-showcase">
        <div className="container">
          <div
            className="drama-carousel"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginTop: "40px",
            }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.path}
                state={{ backgroundLocation: location }} // <- modal route support
                className="drama-poster"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span
                  className="category-icon"
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "15px",
                    display: "block",
                  }}
                >
                  {category.icon}
                </span>
                <h4>
                  <span data-text={category.titleKey}>
                    {getTranslatedText(category.titleKey, currentLanguage)}
                  </span>
                </h4>
                <p className="drama-meta">
                  <span data-text={category.subtitleKey}>
                    {getTranslatedText(category.subtitleKey, currentLanguage)}
                  </span>
                </p>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                    color: "#666",
                  }}
                >
                  <span data-text={category.descriptionKey}>
                    {getTranslatedText(
                      category.descriptionKey,
                      currentLanguage
                    )}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon strip */}
      <div
        style={{
          marginTop: "80px",
          padding: "60px",
          background: "linear-gradient(135deg, #f8faff, #e8f0ff)",
          borderRadius: "24px",
          textAlign: "center",
          border: "2px solid rgba(102, 126, 234, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "20px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <span data-text="zh-tw:即將推出|zh-cn:即将推出|en:Coming Soon">
            即將推出
          </span>
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            marginBottom: "30px",
            maxWidth: "600px",
            margin: "0 auto 30px",
          }}
        >
          <span data-text="zh-tw:我們正在努力開發更多精彩內容！Beta 版本將於 2025 年夏天正式上線。|zh-cn:我们正在努力开发更多精彩内容！Beta 版本将于 2025 年夏天正式上线。|en:We're working hard to develop more exciting content! Beta version will launch in summer 2025.">
            我們正在努力開發更多精彩內容！Beta 版本將於 2025 年夏天正式上線。
          </span>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          <div>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🎮</div>
            <h4 style={{ marginBottom: "10px", color: "#333" }}>
              <span data-text="zh-tw:互動體驗|zh-cn:互动体验|en:Interactive Experience">
                互動體驗
              </span>
            </h4>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              <span data-text="zh-tw:沉浸式劇情選擇|zh-cn:沉浸式剧情选择|en:Immersive story choices">
                沉浸式劇情選擇
              </span>
            </p>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>📱</div>
            <h4 style={{ marginBottom: "10px", color: "#333" }}>
              <span data-text="zh-tw:行動應用|zh-cn:移动应用|en:Mobile App">
                行動應用
              </span>
            </h4>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              <span data-text="zh-tw:隨時隨地學習|zh-cn:随时随地学习|en:Learn anytime, anywhere">
                隨時隨地學習
              </span>
            </p>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🏆</div>
            <h4 style={{ marginBottom: "10px", color: "#333" }}>
              <span data-text="zh-tw:成就系統|zh-cn:成就系统|en:Achievement System">
                成就系統
              </span>
            </h4>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              <span data-text="zh-tw:追蹤學習進度|zh-cn:追踪学习进度|en:Track learning progress">
                追蹤學習進度
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
