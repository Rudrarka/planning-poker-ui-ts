import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GameContextProvider, {  } from './context/GameContext';
import SocketContextProvider from './context/SocketContext';
import CreateGame from './components/CreateGame';
import Game from "./components/Game";
import Layout from "./common/Layout";

const App = () => {

  return (
    <SocketContextProvider>
      <GameContextProvider>
        <Layout>
          <Router>
            <Switch>
              <Route path="/" exact component={CreateGame} />
              <Route path="/:id" component={Game} />
            </Switch>
          </Router>
        </Layout>
      </GameContextProvider>
    </SocketContextProvider>
  );
}

export default App;
