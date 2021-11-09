import React from 'react';
import './App.css';
import Routes from './routes';
import IndexProvider from './hooks';

function App() {
  return (
    <IndexProvider>
      <Routes />
    </IndexProvider>
  );
}

export default App;
