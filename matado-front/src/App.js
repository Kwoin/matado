import React from 'react';
import logo from './logo.svg';
import './App.scss';
import RecepeeCard from "./recepeecard/RecepeeCard";
import RecepeeList from "./recepeelist/RecepeeList";
import Header from "./header/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <RecepeeList/>
    </div>
  );
}

export default App;
