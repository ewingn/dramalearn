// src/utils/NavigationDebug.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NavigationDebug = ({ enabled = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (enabled) {
      console.log('🛣️ Navigation Debug:', {
        pathname: location.pathname,
        search: location.search,
        state: location.state,
        timestamp: new Date().toISOString()
      });
    }
  }, [location, enabled]);

  // Helper function to validate routes
  const validateRoutes = () => {
    const routes = [
      { path: '/', name: 'HomePage' },
      { path: '/learn', name: 'LearnPage' },
      { path: '/learn/romance', name: 'RomancePage' },
      { path: '/about', name: 'AboutPage' },
      { path: '/contact', name: 'ContactPage' }
    ];

    console.log('📋 Available Routes:');
    routes.forEach(route => {
      console.log(`  ${route.path} → ${route.name}`);
    });
  };

  if (enabled && process.env.NODE_ENV === 'development') {
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999
      }}>
        <div>Current: {location.pathname}</div>
        <button onClick={validateRoutes} style={{ fontSize: '10px', margin: '5px 0' }}>
          Log All Routes
        </button>
        <div>
          <button onClick={() => navigate('/learn')} style={{ fontSize: '10px', margin: '2px' }}>
            Go to Learn
          </button>
          <button onClick={() => navigate('/learn/romance')} style={{ fontSize: '10px', margin: '2px' }}>
            Go to Romance
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default NavigationDebug;