import React, { useEffect, useState } from 'react';
import { Typography, notification, Spin, Tabs, Row, Col } from 'antd';
import { SavedProgram } from '../../../../interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import Mentors from './components/Mentors';
import AppliedMentors from './components/AppliedMentors';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MenteeApplication from './scenes/MenteeApplication';
import styles from '../../styles.css';

const { Title } = Typography;
const { TabPane } = Tabs;

function RequestMentors() {
  const { programId } = useParams();
  const [program, setProgram] = useState<SavedProgram>({
    headline: '',
    id: 0,
    imageUrl: '',
    landingPageUrl: '',
    state: '',
    title: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/programs/${programId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setProgram(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Warning!',
          description: 'Something went wrong when fetching the program',
        });
      });
  }, []);

  return (
    <Row>
      <Col span={18} offset={3}>
        <div className={styles.container}>
          <Spin tip="Loading..." spinning={isLoading}>
            <Title>{program.title}</Title>
            <p>{program.headline}</p>
          </Spin>
          <Router>
            <Switch>
              <Route exact path="/program/:programId">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Mentors" key="1">
                    <Mentors />
                  </TabPane>
                  <TabPane tab="Applied Mentors" key="2">
                    <AppliedMentors />
                  </TabPane>
                </Tabs>
              </Route>
              <Route
                path="/program/:programId/mentor/:mentorId/application"
                component={MenteeApplication}
              />
            </Switch>
          </Router>
        </div>
      </Col>
    </Row>
  );
}

export default RequestMentors;
