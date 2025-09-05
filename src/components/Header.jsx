import { Link } from "react-router-dom";

export default function Header({ currentLanguage }) {
  return (
    <header>
      <nav className="container">
        <Link to="/" className="logo">
          <span data-text="zh-tw:DramaLearn|zh-cn:DramaLearn|en:DramaLearn">
            DramaLearn
          </span>
          <span>🎭</span>
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link 
              to="/learn" 
              data-text="zh-tw:所有劇集|zh-cn:所有剧集|en:All Dramas"
            >
              所有劇集
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              data-text="zh-tw:為什麼做這個|zh-cn:为什么做这个|en:Why This Project"
            >
              為什麼做這個
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              data-text="zh-tw:一起聊聊|zh-cn:一起聊聊|en:Let's Chat"
            >
              一起聊聊
            </Link>
          </li>
        </ul>
        
        <Link
          to="/learn"
          className="cta-button"
          data-text="zh-tw:開始追劇|zh-cn:开始追剧|en:Start Watching"
        >
          開始追劇
        </Link>
      </nav>
    </header>
  );
}