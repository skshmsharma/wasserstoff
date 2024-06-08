import React from 'react';
import { createRoot } from 'react-dom/client';
import Chatbot from './components/Chatbot';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<Chatbot />);
