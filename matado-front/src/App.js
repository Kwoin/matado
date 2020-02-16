import React from 'react';
import logo from './logo.svg';
import './App.scss';
import RecepeeCard from "./recepeecard/RecepeeCard";
import RecepeeList from "./recepeelist/RecepeeList";
import Header from "./header/Header";
import MainResult from "./main/result/MainResult";

function App() {
  return (
    <div className="App">
      <Header/>
      <MainResult/>
    </div>
  );
}

export default App;
