import React, { useContext, useEffect, useState } from 'react';

import { Col, notification, Row, Tabs, Typography } from 'antd';
import axios, { AxiosResponse } from 'axios';

import EmailModal from '../../components/EmailModal';
import { API_URL } from '../../constants';
import { UserContext } from '../../index';
import { Profile } from '../../types';
import ActivePrograms from './components/ActivePrograms';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import PastPrograms from './components/PastPrograms';
import logo from './scholarx.png';
import styles from './styles.css';

const { TabPane } = Tabs;
const { Paragraph } = Typography;

const Home = () => {
  const user: Partial<Profile | null> = useContext(UserContext);

  // should be initialized to !user.hasUserDetailsConfirmed
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // send a request to verify the user email
  const handleEmailVerification = () => {
    axios
      .post(
        `${API_URL}/me`,
        {
          email: user?.email,
        },
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse) => {
        if (result.status == 200) {
          notification.success({
            message: 'Success!',
            description: 'Email successfully updated',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when updating the email',
        });
      });
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (user?.hasConfirmedUserDetails === false) {
      setIsModalVisible(true);
    }
  }, [user]);

  return (
    <>
      <div>
        {user && (
          <EmailModal
            isModalVisible={isModalVisible}
            userEmail={user?.email}
            onCancel={handleCancel}
            onConfirm={handleEmailVerification}
          />
        )}
        <NavigationBar />
        <Row justify="center">
          <Col md={24} lg={21}>
            <Row>
              <Col md={12}>
                <img src={logo} alt={'ScholarX logo'} className={styles.logo} />
                <Paragraph>
                  ScholarX is an exclusive program aimed at providing mentoring
                  support for talented undergraduate students in Sri Lanka. Our
                  mentors are engaged with some of the world’s top universities
                  and Fortune 500 companies and are carefully selected for their
                  expertise in academia and industry.
                </Paragraph>
                <Paragraph>
                  This free premium mentoring platform was created for Sri
                  Lankans who see the opportunity and positive change brought
                  about by a culture of knowledge and expertise sharing without
                  the limitations of geographical borders.
                </Paragraph>
              </Col>
            </Row>
            <Tabs defaultActiveKey="activePrograms">
              <TabPane tab="Active Programs" key="activePrograms">
                <div className={styles.cardWrapper}>
                  <ActivePrograms />
                </div>
              </TabPane>
              <TabPane tab="Past Programs" key="pastPrograms">
                <div className={styles.cardWrapper}>
                  <PastPrograms />
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <div className={styles.push} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
