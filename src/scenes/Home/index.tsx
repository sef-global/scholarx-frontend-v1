import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import styles from './styles.css';
import logo from './../scholarx.png';
import { Button, Card, Col, Menu, Row } from 'antd';

const Home = () => {
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
          <Menu mode="horizontal">
            <Menu.Item>Ongoing Programs</Menu.Item>
            <Menu.Item>Past Programs</Menu.Item>
          </Menu>
          <div className={styles.cardWrapper}>
            <Row>
              <Col md={7}>
                <Card>
                  <Row>
                    <Col span={12}>
                      <h3>Program Name</h3>
                    </Col>
                    <Col span={12} className={styles.programActionButton}>
                      <Button type="primary">Action Button</Button>
                    </Col>
                  </Row>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum nec quam odio.
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
