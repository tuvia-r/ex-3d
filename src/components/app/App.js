import React from 'react';
import * as THREE from 'three';
import ThreeScene from '../three try/three try'
import logo from './logo.svg';
import './App.css';
import MainView from '../main view/main view';
import SceneHandler from '../sceneHandler/sceneHandler';

function App() {
  return (
    <div className="App">
    <SceneHandler/>
      {/* <ThreeScene/> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
