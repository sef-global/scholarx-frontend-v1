import React, { useContext } from 'react';
import NavigationBar from './components/NavigationBar';
import styles from './styles.css';
import logo from './scholarx.png';
import { Col, Row, Tabs } from 'antd';
import MentorPrograms from './components/MentorPrograms';
import MenteePrograms from './components/MenteePrograms';
import AllPrograms from './components/AllPrograms';
import { UserContext } from '../../index';
import { Profile } from '../../interfaces';

const { TabPane } = Tabs;

const Home = () => {
  const user: Partial<Profile | null> = useContext(UserContext);
  return (
    <div>
      <Row justify="center">
        <Col md={24} lg={21}>
          <NavigationBar />
          <Row>
            <Col md={12}>
              <img src={logo} alt={'ScholarX logo'} className={styles.logo} />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum nec quam odio. Nunc vitae eros ac arcu tempus ornare
                eu sit amet nulla. Aenean sollicitudin nunc nisi, vel ultricies
                lorem lacinia non. Duis convallis congue quam, id suscipit
                tortor dapibus non. Suspendisse justo dolor, commodo eu sapien
                vitae, fringilla tincidunt diam. Etiam tristique congue orci, et
                suscipit mauris vehicula a. Phasellus ac eros vitae sem
                imperdiet pharetra id sed urna. Fusce lorem risus, tempus vitae
                velit ultrices, consectetur ultrices mi. Sed et tristique felis.
              </p>
            </Col>
          </Row>
          <Tabs defaultActiveKey="allPrograms">
            <TabPane tab="All Programs" key="allPrograms">
              <div className={styles.cardWrapper}>
                <AllPrograms />
              </div>
            </TabPane>
            {user != null && user.type == 'ADMIN' ? (
              ''
            ) : (
              <>
                <TabPane tab="Programs I mentor" key="mentorPrograms">
                  <div className={styles.cardWrapper}>
                    <Row gutter={[16, 16]}>
                      <MentorPrograms />
                    </Row>
                  </div>
                </TabPane>
                <TabPane tab="Programs I get mentored" key="menteePrograms">
                  <div className={styles.cardWrapper}>
                    <Row gutter={[16, 16]}>
                      <MenteePrograms />
                    </Row>
                  </div>
                </TabPane>
              </>
            )}
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
