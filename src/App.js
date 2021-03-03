import React from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import {  configureStore } from './redux/configureStore';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
        <div className="App">
        <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;



