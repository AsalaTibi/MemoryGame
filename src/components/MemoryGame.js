import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './MemoryGame.css'
const cardNumbers = [
   {value:1},
   {value:2},
   {value:3},
   {value:4},
   {value:5},
   {value:6},
   {value:7},
   {value:8},
   {value:9},
]
export default function MemoryGame() {
   const [cards,setCards] = useState([]);
   const [player,setPlayer] = useState(1);
   const [flipped,setFlipped] = useState([]);
   const [matches ,setMatches] = useState([]);
   const [history,setHistory] = useState([]);
   const [player1Score,setPlayer1Score] = useState(0);
   const [player2Score,setPlayer2Score] = useState(0);
   
   const navigate = useNavigate();

   useEffect(() => {
      const shufflesCards = [...cardNumbers,...cardNumbers]
        .sort(() => Math.random() - 0.5)
        .map((card,index) => ({...card, id: index}))
      
      setCards(shufflesCards)
   },[]);
   useEffect(() => {
      if (matches.length === 18) {
         handleGameEnd();
      }
    }, [matches]);
   const handleClick = (index) => {
      
      if (flipped.includes(index) || matches.includes(index)) {
        return;
      }
      setFlipped([...flipped,index]);
      if(flipped.length === 2){
          return;
      }
      if (flipped.length === 1 && flipped[0] !== index) {
         const move = {
            player:player,
            cardsIndex:[flipped[0],index],
            success:"false"
          };
         if (cards[flipped[0]].value === cards[index].value) {
           setMatches([...matches, flipped[0], index]);
           if (player === 1) {
            setPlayer1Score(player1Score + 1);
          } else {
            setPlayer2Score(player2Score + 1);
          }
          move.success = "true";
         }
         setHistory([...history,move])
         setTimeout(() => {
            setFlipped([]);
            setPlayer(player === 1 ? 2 : 1);
          }, 500);
      }
   }
   const handleGameEnd = () => {
      let winner;
      if (player1Score > player2Score) {
        winner = 1;
      } else  {
        winner = 2;
      } 
       navigate('/result',{state:{winner:winner,history:history,score:player1Score > player2Score ? player1Score :player2Score}});
    } 
    
  return (
    <div>
      <div className='players'>
         <div className='player1' style={{backgroundColor:player === 1 ?'white':''}}>player 1</div>
         <div className='player2' style={{backgroundColor:player === 2 ?'white':''}}>player 2</div>
      </div>
      <div className='card-grid'>
         { cards.map((card,index) => (
               <div 
                 className={`card ${flipped.includes(index) ? "flipped" : ""} ${matches.includes(index) ? "solved" : ""}`}
                 onClick={() => handleClick(index)}
               > 
               {flipped.includes(index) || matches.includes(index) ? card.value : "?"}
               </div>
       
            ))
         }
      </div>
    </div>
  )
}
