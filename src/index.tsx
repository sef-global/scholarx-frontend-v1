import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './scenes/Home';
import SignIn from './scenes/SignIn';
import Dashboard from './scenes/Dashboard';
import { Profile } from './interfaces';
import MentorApplication from './scenes/Home/scenes/MentorApplication';
import EditMentorApplication from './scenes/Home/scenes/EditMentorApplication';
import RequestMentors from './scenes/Home/scenes/RequestMentors';
import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import ManageMentees from './scenes/Home/scenes/ManageMentees';
export const UserContext = createContext<Partial<Profile>>({});

function App() {
  const [user, setUser] = useState<Profile | null>(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get('http://localhost:8080/me', { withCredentials: true })
      .then((response: AxiosResponse<Profile>) => {
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response.status != 401) {
          notification.error({
            message: 'Something went wrong when fetching the user',
            description: error.toString(),
          });
        } else {
          setUser(null);
        }
      });
  };

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route path="/dashboard/:programId" component={Dashboard} />
          <Route
            path="/program/:programId/mentor/apply"
            component={MentorApplication}
          />
          <Route
            path="/program/:programId/mentor/edit"
            component={EditMentorApplication}
          />
          <Route path="/mentor/program/:programId" component={ManageMentees} />
          <Route path="/program/:programId" component={RequestMentors} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
