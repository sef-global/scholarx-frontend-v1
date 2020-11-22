import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, notification, Row, Spin, Typography } from 'antd';
import styles from '../../styles.css';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Profile, SavedProgram } from '../../../../interfaces';
import AddProgram from '../AddProgram';
import { UserContext } from '../../../../index';

const { Paragraph, Title } = Typography;

function AllPrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<SavedProgram[]>([]);
  const user: Partial<Profile | null> = useContext(UserContext);
  const isUserAdmin: boolean = user != null && user.type == 'ADMIN';

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/programs', { withCredentials: true })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        setPrograms(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        notification.error({
          message: error.toString(),
          description: 'Something went wrong when fetching the program',
        });
      });
  }, []);

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Row gutter={[16, 16]}>
        {programs.map((program: SavedProgram) => (
          <Col md={6} key={program.id}>
            <Card
              className={styles.card}
              bordered={false}
              cover={<img alt={program.title} src={program.imageUrl} />}
            >
              <Row>
                <Col span={13}>
                  <Title level={4}>
                    <Link to={program.landingPageUrl}>{program.title}</Link>
                  </Title>
                </Col>
                <Col span={11} className={styles.programActionButton}>
                  <Button
                    hidden={!isUserAdmin}
                    type="primary"
                    href={`/dashboard/${program.id}`}
                  >
                    Manage
                  </Button>
                  {program.state == 'MENTOR_APPLICATION' && !isUserAdmin ? (
                    <Button
                      type="primary"
                      href={`/program/${program.id}/mentor/apply`}
                    >
                      Apply as a mentor
                    </Button>
                  ) : (
                    ''
                  )}
                  {program.state == 'MENTEE_APPLICATION' && !isUserAdmin ? (
                    <Button type="primary" href={`/program/${program.id}`}>
                      Apply as a mentee
                    </Button>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
              <Paragraph>{program.headline}</Paragraph>
            </Card>
          </Col>
        ))}
        <Col md={6} hidden={!isUserAdmin}>
          <AddProgram />
        </Col>
      </Row>
    </Spin>
  );
}

export default AllPrograms;
