/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React from 'react';
import './App.scss';
import ViewsRouter from './router';
import StoreProvider from './store/StoreProvider';
function App() {
  return (
    <div className="App">
      <header>
        <div>Hacker News</div>
      </header>
      <StoreProvider>
        <ViewsRouter />
      </StoreProvider>
    </div>
  );
}

export default App;
