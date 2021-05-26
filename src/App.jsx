import './assets/styles/styles.scss';
import { Switch, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { StationPage } from './pages/StationPage';
import { StationsPage } from './pages/StationsPage';
import { Player } from './cmps/songPlayer/Player';
import { Login } from './pages/login/Login';
import { Signup } from './pages/login/Signup';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  return (
    <div className="App">
      <AppHeader/>
      <Switch>
        <Route component={ProfilePage} path="/profile" />
        <Route component={Signup} path="/signup" />
        <Route component={Login} path="/login" />
        <Route component={StationPage} path="/station/:stationId" />
        <Route component={StationsPage} path="/station" />
        <Route component={HomePage} path="/" />
      </Switch>
      <Player />
    </div>
  );
}

