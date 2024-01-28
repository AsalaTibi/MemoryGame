import './App.css';
import { BrowserRouter as Router, Navigate, Route ,Routes} from "react-router-dom";
import MemoryGame from './components/MemoryGame';
import Result from './components/Result';

function App() {
  return (
    <div className='app'>
      <h1>Memory Game</h1>
      <div style={{flex: 1, height: '1.5px', backgroundColor: 'black', marginTop:20 }} ></div>
      <Router>
         <Routes>
          <Route exact path='/' Component={MemoryGame}/>
          <Route path='/result' Component={Result}/>
         </Routes>
      </Router>
    </div>
  );
}

export default App;
