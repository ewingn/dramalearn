export default function FloatingButton({ currentLanguage }) {
  const handleClick = () => {
    const messages = {
      'zh-tw': '準備好開始學習了嗎？🎭✨\n\n歡迎來到 DramaLearn！',
      'zh-cn': '准备好开始学习了吗？🎭✨\n\n欢迎来到 DramaLearn！',
      'en': 'Ready to start learning? 🎭✨\n\nWelcome to DramaLearn!'
    };
    
    alert(messages[currentLanguage] || messages['zh-tw']);
  };

  return (
    <button
      className="floating-btn"
      onClick={handleClick}
      aria-label="Start Learning"
    >
      🎭
    </button>
  );
}