export default function LanguageToggle({ currentLanguage, onLanguageChange }) {
  const languages = [
    { code: 'zh-tw', label: '繁體' },
    { code: 'zh-cn', label: '简体' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className="language-toggle">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`lang-btn ${currentLanguage === lang.code ? 'active' : ''}`}
          onClick={() => onLanguageChange(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}