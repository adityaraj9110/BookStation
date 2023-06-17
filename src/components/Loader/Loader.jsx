import React from 'react';
import LoaderImg from "../../img/loader.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className='loader'>
      <img src = {LoaderImg} alt = "loader" />
      <h2>Loading...</h2>
    </div>
  )
}

export default Loader