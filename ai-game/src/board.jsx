import React from 'react';
import Square from './square';

const Board=({square,onBoardclick})=>{

    return (
<>
<div className="grid grid-cols-3 mx-auto w-80 ">
    <Square value={square[0]} onSquareClick={()=>onBoardclick(0)}/>
    <Square value={square[1]} onSquareClick={()=>onBoardclick(1)}/>
    <Square value={square[2]} onSquareClick={()=>onBoardclick(2)}/>
</div>
<div className="grid grid-cols-3 gap-0 mx-auto w-80">
    <Square value={square[3]} onSquareClick={()=>onBoardclick(3)}/>
    <Square value={square[4]} onSquareClick={()=>onBoardclick(4)}/>
    <Square value={square[5]} onSquareClick={()=>onBoardclick(5)}/>
</div>
<div className="grid grid-cols-3 mx-auto w-80">
    <Square value={square[6]} onSquareClick={()=>onBoardclick(6)}/>
    <Square value={square[7]} onSquareClick={()=>onBoardclick(7)}/>
    <Square value={square[8]} onSquareClick={()=>onBoardclick(8)}/>
</div>
</>
    );

};
export default Board    