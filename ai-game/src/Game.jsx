import axios from 'axios';
import { useState } from 'react';
import Board from './board';


// import './App.css'
let status;
function Game() {
  
  const [square,setSquare_Value]=useState(Array(9).fill(null));
  const [human,setnextPlayer]=useState(true);
  const [gameStatus, setgameStatus]=useState(null);
  const [Draw,setDraw]=useState(false);

  



  
const onTurnEvent=async(i)=>
    {
   
      const newBoard=[...square];
      newBoard[i]=human?"X":"O";
      
      
      
      setSquare_Value(newBoard);
      
      
    try{
      
        const gamestate=await axios.post('http://localhost:5000/nextMove',
          {
              
              currentBoard:newBoard,
              currentplayer:newBoard[i],
          }
        );
        console.log('test');
        await new Promise (complete=>setTimeout(complete,1000));
        console.log(gamestate.data.winner);      
        setSquare_Value(gamestate.data.currentBoard1);
        setgameStatus(gamestate.data.winner);
        setDraw(gamestate.data.Draw);
        console.log(Draw);
        
       
        
        
        
      

      }
    catch(error){
        console.log('Cant connect with AI!',error);
    }
    
    };
  const onboardClick=(i)=>
  {

            if(square[i] || (gameStatus==='X') || (gameStatus==='O'))      
                 {   
                
                   return;
                }

                    onTurnEvent(i)
   
    };

 
      
    
     

  let Status='Go, Player X!'
  if(gameStatus==='X')
  {
    Status='Winner is Player X';
  }
  if(gameStatus==='O')
  {
    Status='Winner is Player O';
  }
 if(Draw)
  {
  Status='Its a Draw';
  }
  
  
  

  return (
    <div className="h-full p-8  text-slate-800 bg-gradient-to-r from-blue-600 to-grey-450">
      <h1 className="text-center text-3xl mb-4 font-display text-black decoration-4	 ">Play Tic-Tac-Toe with AI!!!!</h1>
      
    <div class="flex box-decoration-slice h-24 border-solid border-3   border-slate-200 
    font-display text-green-500  text-center justify-between ">
  <span className=' box-decoration-slice text-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-black px-2 h-20 w-64 p-4 border-4'>Player: X</span>
  <span className=' box-decoration-slice text-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-black px-2 h-20 w-64 p-4 border-4'>{Status}</span>
  <span className=' box-decoration-slice text-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-black px-2 h-20 w-64 p-4 border-4'>AI Player: O</span>
  </div>  
  <div><Board square={square} onBoardclick={onboardClick}/></div>
      
      
      
      
     
      </div>
  )
}

export default Game
