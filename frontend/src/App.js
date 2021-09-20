import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Games from "./components/Games";
import NewGameForm from "./components/NewGameForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ="/games" component={Games} />
        <Route exact path ="/games/new" component={NewGameForm} />
      </Switch>
    </Router>
  );
}

export default App;
