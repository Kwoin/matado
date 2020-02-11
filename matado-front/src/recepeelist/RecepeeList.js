import React from "react";
import RecepeeCard from "../recepeecard/RecepeeCard";
import './RecepeeList.scss';

function RecepeeList(props) {
    return (
        <div className={'recepee-list'}>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
          <RecepeeCard/>
        </div>
    )
}

export default RecepeeList;