# Modern Calculator Component

A beautiful, feature-rich calculator component built with React and modern CSS.

## Features

### 🎨 **Modern Design**
- Glassmorphism UI with backdrop blur effects
- Gradient backgrounds and smooth animations
- Responsive design that works on all devices
- Dark mode support (follows system preference)

### ⚡ **Functionality**
- Basic arithmetic operations (+, -, ×, ÷)
- Percentage calculations
- Sign toggle (±)
- Decimal point support
- Backspace functionality
- Clear (AC) function

### ⌨️ **Keyboard Support**
- Number keys (0-9)
- Operator keys (+, -, *, /)
- Enter or = for calculation
- Escape or C for clear
- Backspace for delete
- Period (.) for decimal

### 📊 **Additional Features**
- Calculation history (shows last 5 calculations)
- Real-time display formatting
- Error handling for invalid operations
- Smooth button animations and hover effects

## Usage

### Basic Import
```jsx
import ModernCalculator from './ModernCalculator.jsx';

function App() {
  return (
    <div>
      <ModernCalculator />
    </div>
  );
}
```

### With Demo Wrapper
```jsx
import CalculatorDemo from './CalculatorDemo.jsx';

function App() {
  return <CalculatorDemo />;
}
```

## File Structure

```
src/
├── ModernCalculator.jsx     # Main calculator component
├── ModernCalculator.css     # Styling and animations
└── CalculatorDemo.jsx       # Demo wrapper with features list
```

## Customization

### Colors
The calculator uses CSS custom properties and can be easily customized by modifying the gradient backgrounds and color schemes in the CSS file.

### Size
Adjust the calculator width by modifying the `.calculator` class width property.

### Animations
All animations use CSS transitions and can be customized by modifying the transition properties.

## Browser Support

- Modern browsers with CSS Grid support
- Backdrop-filter support for glassmorphism effects
- CSS custom properties support

## Dependencies

- React (hooks: useState, useEffect)
- No external libraries required

## Performance

- Lightweight component with minimal re-renders
- Efficient state management
- CSS-only animations for smooth performance