
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('=== MAIN.TSX DEBUG START ===');
console.log('Main.tsx loading...');
console.log('Current location:', window.location.href);
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Environment:', import.meta.env.MODE);

const rootElement = document.getElementById("root");
console.log('Root element found:', !!rootElement);
console.log('Root element:', rootElement);

if (rootElement) {
  console.log('About to create React root...');
  try {
    const root = createRoot(rootElement);
    console.log('React root created successfully');
    
    console.log('About to render App component...');
    root.render(<App />);
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error during React root creation or rendering:', error);
  }
} else {
  console.error('Root element not found!');
  console.log('Available elements:', document.querySelectorAll('*'));
}

console.log('=== MAIN.TSX DEBUG END ===');
