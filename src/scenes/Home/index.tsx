import React, { useEffect, useState } from 'react';
import NavigationBar from './components/NavigationBar';
import AddProgram from './components/AddProgram';
import styles from './styles.css';
import logo from './scholarx.png';
import { Button, Card, Col, Menu, Row } from 'antd';
import { Program } from '../../interfaces';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programType] = useState<string>('ongoing');

  useEffect(() => {
    // Load available programs from the backend
    axios
      .get('http://localhost:8080/programs')
      .then((response: AxiosResponse<Program[]>) => {
        setPrograms(response.data);
      });
  }, []);

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
              {programs.map((program) => (
                <Col md={6} key={program.id}>
                  <Card
                    className={styles.card}
                    bordered={false}
                    cover={<img alt={program.title} src={program.imageUrl} />}
                  >
                    <Row>
                      <Col span={18}>
                        <h3>
                          <Link to={program.landingPageUrl}>
                            {program.title}
                          </Link>
                        </h3>
                      </Col>
                      <Col span={6} className={styles.programActionButton}>
                        <Button
                          type="primary"
                          href={`/dashboard/${program.id}`}
                        >
                          Manage
                        </Button>
                      </Col>
                    </Row>
                    <p>{program.headline}</p>
                  </Card>
                </Col>
              ))}
              <Col md={6}>
                <AddProgram />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
