import React from 'react';
import './App.css';
import Visualizer from './Visualizer';



function App() {
  return (
    <div className="App" style={{
      height: '100vh', 
      background: 'linear-gradient(90deg, rgba(53, 53, 130, 0.64) 0%, rgb(53, 53, 130) 0%, rgb(112, 128, 144) 89%)'
  }}>
      <Visualizer></Visualizer>
  </div>
  
  );
}

export default App;
