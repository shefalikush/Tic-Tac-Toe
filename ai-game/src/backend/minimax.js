const express = require('express');
const cors=require('cors');

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));

// app.use(express.static(path.join(__dirname, '../../dist'))); //serve static file from react
// app.get('*', (req,res) => {res.sendFile(path.resolve(__dirname,'../../dist','index.html'))});




const staticEvaluation=(currentBoard)=>
{
    const winner=declareWinner(currentBoard);
    if (winner==='X')
    {
        return -10;
    }
    if (winner==='O')
        {
            return 10;
        }
    
    return 0;
    
};

const isSquareFull=(currentBoard) =>
    {
        for(let square=0; square<currentBoard.length;square++)
        {
            if(currentBoard[square]===null)
            {
            return false;
            }
    
        }
        return true;
    };
const minimax=(currentBoard,minimaxPlayer)=>
{
    const winner = declareWinner(currentBoard);
    if(isSquareFull(currentBoard || winner))
        return staticEvaluation(currentBoard);

    

    if(minimaxPlayer)
    {
        let bestScore_opponent= Infinity;
        for(let i=0;i<currentBoard.length;i++)// / for each possible position by player X
        {
                if (currentBoard[i]===null) 
                {
                    currentBoard[i]='X' //  move by player at ith position
                    const score=minimax(currentBoard,false);
                    pushMinScore=Math.min(bestScore_opponent,score)
                    currentBoard[i]=null;
                }
                
        }
        return pushMinScore;
    }
    else
    {
        let bestScore_AI= -Infinity;
        for(let i=0;i<currentBoard.length;i++)// / for each possible position by AI
        {
                if (currentBoard[i]===null) 
                {
                    currentBoard[i]='O' //  move by AI at ith position
                    const score=minimax(currentBoard,true);
                    pushMaxScore=Math.max(bestScore_AI,score)
                    currentBoard[i]=null;
                }
                
        }
        return pushMaxScore;
    }
};
    
const findbestposition=(currentBoard)=>
{
    let bestScore=-Infinity;
    let bestPosition=-1;
    for(let i=0;i<currentBoard.length;i++) // for each possible position by AI
    {
        if(currentBoard[i]==null)
        {
            currentBoard[i]='O'; //  move by AI at ith position
            const score=minimax(currentBoard,true);// find nextPlayer's optimal move
            currentBoard[i]= null;

            if(score> bestScore)
            {
                bestScore=score;
                bestPosition=i;

            }
        }
        
    }
return bestPosition;
};
function declareWinner(currentBoard)
  {
    const rule_set=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
      
    ];
    for (let r=0; r<rule_set.length;r++)
    {
      const[i,j,k]=rule_set[r];
      if (currentBoard[i] && currentBoard[i]===currentBoard[j] && currentBoard[i]===currentBoard[k])
      {
        return currentBoard[i];
    }
  }
  return null;
  
  };

app.post('/nextMove', (req, res) => {
const { currentBoard, currentplayer } = req.body;


currentBoard1=currentBoard;
currentplayer1=currentplayer;
let Draw=false;
let winner=declareWinner(currentBoard1)
if(winner)
{   console.log(winner);
    console.log(Draw);
    return res.json({currentBoard1,winner:winner,Draw:Draw});
    
}
else
if(isSquareFull(currentBoard1))
{   console.log(winner);
    Draw=true;
    console.log(Draw);
    return res.json({currentBoard1,winner:winner,Draw:Draw});
    
}


const movebyAI=findbestposition(currentBoard1);
// console.log('test');

    if(movebyAI!==null)
     {  
        currentBoard[movebyAI]='O';
        currentplayer1=currentBoard[movebyAI];
    }
    
    winner=declareWinner(currentBoard1)
    console.log(winner);
    
    res.json({currentBoard1,winner:winner,currentplayer:currentplayer1,Draw:Draw});

}


);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));