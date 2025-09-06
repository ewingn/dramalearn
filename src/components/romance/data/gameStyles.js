// gameStyles.js - All styling functions for the romance game

export const gameStyles = (timeLeft = 0, crushAffection = 50, isRecording = false) => ({
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffebee, #f3e5f5)',
    paddingTop: '100px',
    fontFamily: 'Inter, sans-serif',
    position: 'relative'
  },
  
  languageToggle: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    zIndex: 1000,
    boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)'
  },

  header: {
    background: 'linear-gradient(135deg, #e91e63, #9c27b0)',
    color: 'white',
    padding: '30px 20px',
    textAlign: 'center',
    marginBottom: '30px'
  },

  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },

  // Character Selection Styles
  characterCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '25px',
    margin: '15px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '3px solid transparent'
  },

  selectedCharacterCard: {
    borderColor: '#e91e63',
    transform: 'translateY(-5px)'
  },

  // Game UI Styles
  backgroundInfo: {
    background: '#fff3e0',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    border: '2px solid #ff9800',
    fontSize: '14px',
    lineHeight: '1.6'
  },

  timerDisplay: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: timeLeft <= 10 ? '#f44336' : '#e91e63',
    textAlign: 'center',
    marginBottom: '15px',
    padding: '10px',
    background: timeLeft <= 10 ? '#ffebee' : '#f3e5f5',
    borderRadius: '10px'
  },

  // Chat Styles
  chatContainer: {
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginTop: '20px'
  },

  chatArea: {
    height: '300px',
    overflowY: 'auto',
    padding: '20px',
    background: '#fafafa'
  },

  message: {
    marginBottom: '15px',
    display: 'flex'
  },

  userMessage: {
    justifyContent: 'flex-end'
  },

  aiMessage: {
    justifyContent: 'flex-start'
  },

  messageBubble: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '18px',
    fontSize: '14px',
    lineHeight: '1.4'
  },

  userBubble: {
    background: '#e91e63',
    color: 'white',
    borderBottomRightRadius: '4px'
  },

  aiBubble: {
    background: 'white',
    color: '#333',
    border: '1px solid #e0e0e0',
    borderBottomLeftRadius: '4px'
  },

  inputArea: {
    padding: '20px',
    borderTop: '1px solid #e0e0e0',
    background: 'white'
  },

  inputContainer: {
    display: 'flex',
    gap: '10px'
  },

  textInput: {
    flex: '1',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '25px',
    fontSize: '14px',
    outline: 'none'
  },

  voiceButton: {
    background: isRecording ? '#f44336' : '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  sendButton: {
    background: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },

  // Affection Meter Styles
  affectionMeter: {
    width: '100%',
    height: '20px',
    background: '#f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '20px'
  },

  affectionFill: {
    height: '100%',
    background: crushAffection > 70 ? '#4CAF50' : crushAffection > 40 ? '#FF9800' : '#f44336',
    width: `${crushAffection}%`,
    transition: 'all 0.5s ease'
  },

  // Minigame Container Styles
  minigameContainer: {
    background: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },

  // Note Writing Styles
  noteTextarea: {
    width: '100%',
    height: '100px',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
    marginBottom: '10px'
  },

  noteStats: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '15px'
  },

  // Button Styles
  submitButton: {
    background: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 30px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    opacity: 1,
    transition: 'opacity 0.3s ease'
  },

  secondaryButton: {
    background: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 30px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    marginRight: '10px'
  },

  warningButton: {
    background: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 30px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },

  // Quiz Styles
  quizContainer: {
    background: 'white',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },

  questionText: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333'
  },

  answerOptions: {
    display: 'grid',
    gap: '10px',
    marginBottom: '20px'
  },

  answerButton: {
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    background: '#f9f9f9',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'left',
    transition: 'all 0.3s ease'
  },

  // Stats Container Styles
  statsContainer: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },

  // Grid Layouts
  characterGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    maxWidth: '800px',
    margin: '0 auto'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },

  affectionGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    alignItems: 'center'
  },

  // Festival Date Styles
  festivalContainer: {
    textAlign: 'center'
  },

  festivalGrid: {
    display: 'grid',
    gap: '10px',
    maxWidth: '400px',
    margin: '0 auto'
  },

  // Hints Styles
  hintsContainer: {
    background: '#fff3e0',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
    border: '2px solid #ff9800'
  },

  hintsList: {
    textAlign: 'left',
    paddingLeft: '20px'
  },

  // Responsive breakpoints
  '@media (max-width: 768px)': {
    characterGrid: {
      gridTemplateColumns: '1fr',
      gap: '20px'
    },
    
    affectionGrid: {
      gridTemplateColumns: '1fr',
      gap: '15px'
    },

    mainContent: {
      padding: '0 15px'
    },

    minigameContainer: {
      padding: '20px'
    }
  },

  // Animation classes
  fadeIn: {
    animation: 'fadeIn 0.5s ease-in'
  },

  slideUp: {
    animation: 'slideUp 0.3s ease-out'
  },

  pulse: {
    animation: 'pulse 1s infinite'
  }
});