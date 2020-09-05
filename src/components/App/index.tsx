import React, { createContext, useEffect, useState } from 'react';
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
import { Profile } from '../../interfaces';

export const UserContext = createContext<Partial<Profile>>({});

const App = () => {
  const [user, setUser] = useState<Profile>(null);
  useEffect(() => {
    const fetchedUser: Profile = {
      id: 1,
      headline: '',
      type: '',
      lastName: '',
      firstName: '',
      email: '',
      uid: '',
      imgUrl:
        'https://d38we5ntdyxyje.cloudfront.net/858987/profile/GJQSELLC_avatar_medium_square.jpg',
      programs: [
        {
          id: 1,
          title: 'ScholarX Jr',
          headline: 'Lorem Ipsum dolor sit amet',
          imageUrl:
            'https://lh3.googleusercontent.com/proxy/l518qLHxhWt_xfFrk8oKnQ-6uq4wUH98Dw8l5WPUbhWgoypMxy6I2VYCj6XgxfsJQnZmo5OXf-eeWdnVvcpZemsIzC1FvO7-skQKPIMD7kLqrp7vTKiZBjs3spa_gQi_7JkE1sFMGg',
          landingPageUrl: '',
          state: 'Created',
        },
        {
          id: 2,
          title: 'ScholarX Undergraduate',
          headline: 'Lorem Ipsum dolor sit amet',
          imageUrl:
            'https://lh3.googleusercontent.com/proxy/D8J_-lvem5PudnTSWd5aEeRNsunZuaO3LsG8DT_441waCVhdmA7d3SYfBmhkbbEQBBIBQOHPyA29o1O3boDc9gsAd2KUcTnj3G4fZpVkpLmMlE9lf2dBmzbcj9NUvIjyxo18c2TfZNw',
          landingPageUrl: '',
          state: 'Created',
        },
      ],
    };
    setUser(fetchedUser);
  }, []);
  return (
    <div className={styles.mainContent}>
      <UserContext.Provider value={user}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Route exact path="/sign-in" component={SignIn} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default hot(module)(App);
