import React from 'react';
import './App.css';

import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <div className="Chat">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
