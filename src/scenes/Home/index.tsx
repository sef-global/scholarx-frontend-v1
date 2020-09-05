import React, { useContext, useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import styles from './styles.css';
import logo from './../scholarx.png';
import { Button, Card, Col, Menu, Row } from 'antd';
import { Profile, Program } from '../../interfaces';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/App';

const Home = () => {
  const user: Partial<Profile> = useContext(UserContext);
  const [programs, setPrograms] = useState<Program[]>(null);
  const [programType] = useState<string>('ongoing');
  useEffect(() => {
    if (user) {
      setPrograms(user.programs);
    } else {
      const fetchedPrograms: Program[] = [
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
      ];
      setPrograms(fetchedPrograms);
    }
  });
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
          {/* TODO: Divide the programs into two and display in two tabs as ongoing and past*/}
          <Menu mode="horizontal" selectedKeys={[programType]}>
            <Menu.Item key="ongoing">Ongoing Programs</Menu.Item>
            <Menu.Item key="past">Past Programs</Menu.Item>
          </Menu>
          <div className={styles.cardWrapper}>
            <Row gutter={[16, 16]}>
              {programs?.map((program) => (
                <Col md={6} key={program.id}>
                  <Link to={program.landingPageUrl}>
                    <Card
                      className={styles.card}
                      bordered={false}
                      cover={<img alt={program.title} src={program.imageUrl} />}
                    >
                      <Row>
                        <Col span={18}>
                          <h3>{program.title}</h3>
                        </Col>
                        <Col span={6} className={styles.programActionButton}>
                          <Button type="primary">Apply</Button>
                        </Col>
                      </Row>
                      <p>{program.headline}</p>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
