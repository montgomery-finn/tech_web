import React from 'react';
import './App.css';
import Routes from './routes';
import {ToastProvider} from './hooks/toast';

function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}

export default App;
