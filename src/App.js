import React, {useState} from "react";
import Board from './Components/Board';
import History from './Components/History';
import StatusMessage from './Components/StatusMessage';
import { calculateWinner } from "./helper";

import './Styles/root.scss';


const App = () =>{

  
  const [history, setHestory] = useState([{board: Array(9).fill(null), isXNext: true},
  ]);

  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const winner = calculateWinner(current.board);

 const  handleSquareClick = (position) =>{

  if(current.board[position]||winner){
      return;
  }



  setHestory( prev => {

    const last = prev[prev.length - 1];


      const newBoard = last.board.map( (square, pos) =>{
          if(pos === position){
              return last.isXNext ? 'x' : '0';
          }
          return square;
      });
      return prev.concat({board: newBoard, isXNext:!last.isXNext});

  });

  setCurrentMove(prev => prev+1);


};

const moveTo = (move) =>{
  setCurrentMove(move);
}

  return(
    <div className="app">
    <h1>TIC TAC TOE</h1>
    <StatusMessage winner={winner} current={current} />
    <Board board={current.board} handleSquareClick ={handleSquareClick}/>
    <History  history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
};

export default App;
