import Starter from './components/Starter/Starter';
import './App.css';
import { useSelector } from 'react-redux';
import Game from './components/Game/Game';

function App() {

  const isInitialized = useSelector(state => state.initalization.isInitialized);

  return (
    <div className="App">
      {isInitialized
        ?
        <Game />
        :
        <Starter />
      }
    </div>
  );
}

export default App;
