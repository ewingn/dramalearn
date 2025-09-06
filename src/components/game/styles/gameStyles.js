// === GAME STYLES ===
export const gameStyles = {
  gameContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffebee, #f3e5f5, #e8f5e8)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative'
  },
  languageToggle: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '10px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  },
  introContent: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  moviePoster: {
    fontSize: '4rem',
    marginBottom: '20px'
  },
  gameTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#e91e63',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
  },
  gameSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: '#666',
    fontStyle: 'italic'
  },
  introDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '40px',
    color: '#444',
    background: 'rgba(255,255,255,0.8)',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  gameFeatures: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '40px',
    flexWrap: 'wrap'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'white',
    padding: '15px 20px',
    borderRadius: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    color: '#e91e63',
    fontWeight: 'bold'
  },
  featureIcon: {
    width: '20px',
    height: '20px'
  },
  startButton: {
    background: 'linear-gradient(45deg, #e91e63, #ff5722)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '15px 40px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#e91e63'
  },
  characterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto 40px'
  },
  characterCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  characterEmoji: {
    fontSize: '4rem',
    marginBottom: '15px'
  },
  characterName: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#e91e63'
  },
  characterDescription: {
    fontSize: '1rem',
    marginBottom: '10px',
    color: '#666'
  },
  characterPersonality: {
    fontSize: '0.9rem',
    color: '#888',
    fontStyle: 'italic'
  },
  scenarioSelection: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  scenarioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  scenarioCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    border: '2px solid transparent'
  },
  scenarioInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    fontSize: '0.9rem',
    color: '#666'
  },
  scenarioIntroCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    textAlign: 'center'
  },
  scenarioBackground: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    margin: '20px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '15px',
    color: '#444',
    textAlign: 'left'
  },
  objectiveBox: {
    background: '#e3f2fd',
    padding: '15px',
    borderRadius: '10px',
    margin: '20px 0',
    color: '#1976d2',
    fontWeight: 'bold',
    border: '2px solid #2196f3'
  },
  scenarioDetails: {
    margin: '20px 0'
  },
  timeInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: '#fff3e0',
    padding: '15px',
    borderRadius: '10px',
    color: '#f57c00',
    fontWeight: 'bold'
  },
  minigameOptions: {
    marginTop: '30px'
  },
  minigameButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '20px'
  },
  minigameButton: {
    background: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 25px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
    transition: 'all 0.3s ease'
  },
  gameHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    flexWrap: 'wrap',
    gap: '15px'
  },
  affectionContainer: {
    textAlign: 'center',
    flex: '1',
    minWidth: '200px'
  },
  affectionMeter: {
    width: '100%',
    height: '12px',
    background: '#f0f0f0',
    borderRadius: '6px',
    overflow: 'hidden',
    margin: '8px 0',
    maxWidth: '200px',
    margin: '8px auto'
  },
  affectionFill: {
    height: '100%',
    transition: 'all 0.5s ease',
    borderRadius: '6px'
  },
  affectionText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  timerContainer: {
    textAlign: 'center'
  },
  timer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '10px 20px',
    background: '#f5f5f5',
    borderRadius: '25px'
  },
  scoreContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff9800'
  },
  minigameArea: {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
  },
  endingCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
  },
  endingEmoji: {
    fontSize: '5rem',
    marginBottom: '20px'
  },
  endingTitle: {
    fontSize: '2rem',
    marginBottom: '15px',
    color: '#e91e63'
  },
  endingMessage: {
    fontSize: '1.3rem',
    marginBottom: '30px',
    color: '#666'
  },
  finalStats: {
    display: 'grid',
    gap: '15px',
    marginBottom: '30px',
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '15px'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    color: '#444'
  },
  playAgainButton: {
    background: 'linear-gradient(45deg, #e91e63, #ff5722)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '15px 40px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)'
  },
  messageBoxOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  messageBoxContent: {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    maxWidth: '400px',
    textAlign: 'center',
    border: '3px solid'
  },
  messageBoxTitle: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: '#333'
  },
  messageBoxMessage: {
    fontSize: '1rem',
    marginBottom: '20px',
    color: '#666',
    lineHeight: '1.5'
  },
  messageBoxButton: {
    background: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

// === MINIGAME STYLES ===
export const minigameStyles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  hint: {
    background: '#e3f2fd',
    padding: '15px',
    borderRadius: '10px',
    margin: '15px 0',
    color: '#1976d2',
    fontWeight: 'bold'
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '16px',
    resize: 'none',
    fontFamily: 'inherit',
    marginBottom: '15px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  noteStats: {
    fontSize: '14px',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  submitButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
    transition: 'all 0.3s ease'
  },
  question: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: '20px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    color: '#333'
  },
  quizOptions: {
    display: 'grid',
    gap: '10px',
    marginTop: '20px'
  },
  quizOption: {
    background: '#f5f5f5',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    padding: '15px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  },
  chatHistory: {
    height: '200px',
    overflowY: 'auto',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    background: '#fafafa'
  },
  message: {
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '80%'
  },
  playerMessage: {
    background: '#e91e63',
    color: 'white',
    marginLeft: 'auto',
    textAlign: 'right'
  },
  crushMessage: {
    background: '#2196f3',
    color: 'white',
    marginRight: 'auto'
  },
  messageContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  voiceIcon: {
    width: '16px',
    height: '16px'
  },
  chatInputContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  chatInput: {
    flex: '1',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    fontSize: '16px',
    outline: 'none'
  },
  voiceButton: {
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  sendButton: {
    background: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  activitiesContainer: {
    display: 'grid',
    gap: '15px',
    marginTop: '20px'
  },
  activityButton: {
    background: 'white',
    border: '2px solid #e91e63',
    borderRadius: '15px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  activityChance: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px'
  },
  // Connections Game Styles
  connectionsContainer: {
    padding: '20px',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  connectionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '20px',
  },
  connectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    width: '100%',
    maxWidth: '500px',
  },
  connectionsItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '64px',
    padding: '8px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    textAlign: 'center',
  },
  connectionsItemSelected: {
    background: '#a5b4fc',
    transform: 'scale(1.05)',
  },
  connectionsItemCorrect: {
    background: '#86efac',
    color: 'white',
  },
  connectionsSubmitButton: {
    background: '#9333ea',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '9999px',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
  connectionsFoundGroup: {
    marginTop: '24px',
    width: '100%',
    maxWidth: '500px',
    borderTop: '2px dashed #e0e0e0',
    paddingTop: '16px',
  },
  connectionsGroupCard: {
    background: '#d1fae5',
    borderLeft: '4px solid #34d399',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
};