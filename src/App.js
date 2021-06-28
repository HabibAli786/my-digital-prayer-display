import { Route, Switch } from 'react-router';
import Home from './components/Home'
import PrayerTimes from './components/PrayerTimes/PrayerTimes';

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/prayertimes">
          <PrayerTimes />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
