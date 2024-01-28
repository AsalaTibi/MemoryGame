import React from 'react'
import { useLocation } from 'react-router-dom'
import './Result.css'

export default function Result() {
   const location = useLocation();
   const items = location.state;
   const history = items.history;

  return (
    <div className='container'>
      <h2>Winner is player {items.winner} </h2>
      <h3>Number of correct cards</h3>
      <div style={{fontSize:"2rem" }}>{items.score}</div>
      <div>
      <h4>History:</h4>
      <div className='table-container'>
      <table>
      <tr>
         <th>Player name</th>
         <th>Cards number</th>
         <th>Success</th>
      </tr>
      {history.map((val, key) => {
         return (
            <tr >
               <td>player {val.player}</td>
               <td>opens card {val.cardsIndex[0]} and {val.cardsIndex[1]}</td>
               <td>{val.success}</td>
            </tr>
         )
      })}
      </table>
      </div>
      </div>
    </div>
  )
}
