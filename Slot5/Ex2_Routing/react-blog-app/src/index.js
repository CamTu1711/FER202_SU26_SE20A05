// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';  // <- Dòng quan trọng để kích hoạt giao diện Bootstrap
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);