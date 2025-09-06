import { Link } from "react-router-dom";

export default function Footer({ currentLanguage }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>DramaLearn</h4>
            <p>
              <span data-text="zh-tw:透過台劇的魅力，重新愛上中文學習。在經典劇情中提升語言能力，在文化沉浸中找回學習的純真快樂。|zh-cn:通过台剧的魅力，重新爱上中文学习。在经典剧情中提升语言能力，在文化沉浸中找回学习的纯真快乐。|en:Rediscover your love for Chinese through the charm of Taiwanese dramas. Improve language skills through classic storylines and rediscover pure joy in cultural immersion.">
                透過台劇的魅力，重新愛上中文學習。在經典劇情中提升語言能力，在文化沉浸中找回學習的純真快樂。
              </span>
            </p>
            <div style={{ marginTop: '20px', fontSize: '20px' }}>
              🎭💕🌟📺
            </div>
          </div>
          
          <div className="footer-section">
            <h4>
              <span data-text="zh-tw:學習內容|zh-cn:学习内容|en:Learning Content">
                學習內容
              </span>
            </h4>
            <Link to="/learn">
              <span data-text="zh-tw:劇集分類|zh-cn:剧集分类|en:Drama Categories">
                劇集分類
              </span>
            </Link>
            <a href="#">
              <span data-text="zh-tw:互動劇情體驗|zh-cn:互动剧情体验|en:Interactive Drama Experience">
                互動劇情體驗
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:文化情境學習|zh-cn:文化情境学习|en:Cultural Context Learning">
                文化情境學習
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:進度追蹤系統|zh-cn:进度追踪系统|en:Progress Tracking">
                進度追蹤系統
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:個人化學習路徑|zh-cn:个性化学习路径|en:Personalized Learning Path">
                個人化學習路徑
              </span>
            </a>
          </div>
          
          <div className="footer-section">
            <h4>
              <span data-text="zh-tw:劇情類型|zh-cn:剧情类型|en:Drama Types">
                劇情類型
              </span>
            </h4>
            <a href="#">
              <span data-text="zh-tw:青春初戀劇 🌸|zh-cn:青春初恋剧 🌸|en:Youth Romance 🌸">
                青春初戀劇 🌸
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:懸疑推理劇 🔍|zh-cn:悬疑推理剧 🔍|en:Mystery Drama 🔍">
                懸疑推理劇 🔍
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:經典重現劇 ⭐|zh-cn:经典重现剧 ⭐|en:Classic Drama ⭐">
                經典重現劇 ⭐
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:命中注定劇 💫|zh-cn:命中注定剧 💫|en:Destined Love 💫">
                命中注定劇 💫
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:家庭溫情劇 👨‍👩‍👧‍👦|zh-cn:家庭温情剧 👨‍👩‍👧‍👦|en:Family Drama 👨‍👩‍👧‍👦">
                家庭溫情劇 👨‍👩‍👧‍👦
              </span>
            </a>
          </div>
          
          <div className="footer-section">
            <h4>
              <span data-text="zh-tw:社群連結|zh-cn:社群连结|en:Community">
                社群連結
              </span>
            </h4>
            <Link to="/contact">
              <span data-text="zh-tw:意見回饋|zh-cn:意见反馈|en:Feedback">
                意見回饋
              </span>
            </Link>
            <a href="https://www.youtube.com/@YouYong%E8%AF%B4">
              <span data-text="zh-tw:YouTube 頻道|zh-cn:YouTube 频道|en:YouTube Channel">
                YouTube 頻道
              </span>
            </a>
            <a href="#">
              <span data-text="zh-tw:Instagram|zh-cn:Instagram|en:Instagram">
                Instagram
              </span>
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            <span data-text="zh-tw:© 2025 DramaLearn. 用台劇的溫度，點亮中文學習的心|zh-cn:© 2025 DramaLearn. 用台剧的温度，点亮中文学习的心|en:© 2025 DramaLearn. Igniting passion for Chinese learning through Taiwanese dramas">
              © 2025 DramaLearn. 用台劇的溫度，點亮中文學習的心
            </span>
          </p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            <span data-text="zh-tw:「讓每個中文學習者，都能在台劇的世界裡找到屬於自己的故事」|zh-cn:「让每个中文学习者，都能在台剧的世界里找到属于自己的故事」|en:'Help every Chinese learner find their own story in the world of Taiwanese dramas'">
              「讓每個中文學習者，都能在台劇的世界裡找到屬於自己的故事」
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}