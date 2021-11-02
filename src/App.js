import { Route, Switch } from 'react-router';

import Home from './components/Home';
import PrayerTimes from './components/PrayerTimes/PrayerTimes';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import UploadTimetable from './components/UploadTimetable/UploadTimetable';
import logo from './logo.svg';
import './App.css';
import EditTimetable from './components/EditTimetable/EditTimetable';
import UploadLogo from './components/UploadLogo/UploadLogo';
import EditNotifications from './components/EditNotifications/EditNotifications';

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
          <Route path="/user" render={(props) => <User {...props} />}/>
        </Route>
        <Route path="/uploadTimetable">
          <UploadTimetable />
        </Route>
        <Route path="/editTimetable">
          <EditTimetable />
        </Route>
        <Route path="/uploadLogo">
          <UploadLogo />
        </Route>
        <Route path="/editNotifications">
          <EditNotifications />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
