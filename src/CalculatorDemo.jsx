import React from 'react';
import ModernCalculator from './ModernCalculator.jsx';

const CalculatorDemo = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        marginBottom: '30px', 
        color: '#333',
        fontSize: '2.5rem',
        fontWeight: '300'
      }}>
        Modern Calculator
      </h1>
      <p style={{ 
        marginBottom: '40px', 
        color: '#666',
        fontSize: '1.1rem',
        maxWidth: '600px',
        margin: '0 auto 40px'
      }}>
        A beautiful, responsive calculator with keyboard support, calculation history, 
        and smooth animations. Try using your keyboard or clicking the buttons!
      </p>
      
      <ModernCalculator />
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '12px',
        maxWidth: '500px',
        margin: '40px auto 0'
      }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>Features:</h3>
        <ul style={{ 
          textAlign: 'left', 
          color: '#666',
          lineHeight: '1.6'
        }}>
          <li>✨ Modern glassmorphism design</li>
          <li>⌨️ Full keyboard support</li>
          <li>📱 Responsive for mobile devices</li>
          <li>📊 Calculation history</li>
          <li>🎨 Smooth animations and transitions</li>
          <li>🌙 Dark mode support</li>
          <li>🔢 Standard arithmetic operations</li>
          <li>⚡ Percentage and sign toggle functions</li>
        </ul>
      </div>
    </div>
  );
};

export default CalculatorDemo;