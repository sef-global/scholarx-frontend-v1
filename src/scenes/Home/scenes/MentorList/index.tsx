import React, { useEffect, useState } from 'react';
import { Typography, notification, Spin, Row, Col, Button } from 'antd';
import { SavedProgram } from '../../../../interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import Mentors from './components/Mentors';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from '../../styles.css';
import { useHistory } from 'react-router';
import { ArrowLeftOutlined } from '@ant-design/icons';
import NavigationBar from '../../components/NavigationBar';
import Footer from '../../components/Footer';
import { API_URL } from '../../../../constants';

const { Title, Paragraph } = Typography;

function MentorList() {
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
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs/${programId}`, {
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
    <>
      <NavigationBar />
      <Row>
        <Col span={18} offset={3}>
          <div className={styles.container}>
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => {
                history.goBack();
              }}
            />
            <Spin tip="Loading..." spinning={isLoading}>
              <Title>{program.title}</Title>
              <Paragraph>{program.headline}</Paragraph>
            </Spin>
            <Router>
              <Switch>
                <Route exact path="/program/:programId">
                  <Mentors />
                </Route>
              </Switch>
            </Router>
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default MentorList;
