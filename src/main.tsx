
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loading...');
console.log('Current location:', window.location.href);
console.log('Base URL:', import.meta.env.BASE_URL);

const rootElement = document.getElementById("root");
console.log('Root element found:', !!rootElement);

if (rootElement) {
  createRoot(rootElement).render(<App />);
  console.log('App rendered successfully');
} else {
  console.error('Root element not found!');
}
