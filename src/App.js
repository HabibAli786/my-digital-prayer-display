import { Route, Switch } from 'react-router';
import Home from './components/Home'
import PrayerTimes from './components/PrayerTimes/PrayerTimes';
import Admin from './components/Admin/Admin'
import User from './components/User/User';

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
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/user">
          <Route path="/user" render={(props) => <User {...props}/>}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
