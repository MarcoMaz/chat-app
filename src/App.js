import React from 'react';
import './App.css';

import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <div className="Chat">
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
