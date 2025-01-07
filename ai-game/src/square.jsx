import React from "react";
const Square=({value,onSquareClick})=>{

    
    return (

    <button className="h-24 border-solid border-8 bg-clip-border  bg-pink-100 border-black
    font-display ps-px text-black-500 text-6xl text-center justify-center" onClick={onSquareClick}>{value}</button>

    );

};
export default Square