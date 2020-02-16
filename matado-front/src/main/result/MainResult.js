import React from "react";
import "./MainResult.scss";
import Sidebar from "./Sidebar";
import RecepeeList from "../../recepeelist/RecepeeList";

function MainResult(props) {
  return (
      <div id="main">
        <Sidebar/>
        <RecepeeList/>
      </div>
  )
}

export default MainResult;