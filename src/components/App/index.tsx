import React from 'react';
import 'antd/dist/antd.less';
import { hot } from 'react-hot-loader';
import styles from './styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from '../../scenes/Home';
import SignIn from '../../scenes/SignIn';

const App = () => {
  return (
    <div className={styles.mainContent}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/sign-in" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
};

export default hot(module)(App);
