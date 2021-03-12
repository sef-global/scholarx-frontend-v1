import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, notification, Row, Spin, Typography } from 'antd';
import styles from '../../styles.css';
import axios, { AxiosResponse } from 'axios';
import { Profile, SavedProgram } from '../../../../interfaces';
import AddProgram from '../AddProgram';
import { UserContext } from '../../../../index';
import { API_URL } from '../../../../constants';

const { Paragraph, Title } = Typography;

function ActivePrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<SavedProgram[]>([]);
  const user: Partial<Profile | null> = useContext(UserContext);
  const isUserAdmin: boolean = user != null && user.type == 'ADMIN';

  useEffect(() => {
    getPrograms();
  }, []);

  const getPrograms = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs`, { withCredentials: true })
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
  };

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Row gutter={[16, 16]}>
        {programs.map((program: SavedProgram) => (
          <>
            {program.state !== 'COMPLETED' && program.state !== 'REMOVED' ? (
              <Col md={6} key={program.id}>
                <Card
                  className={styles.card}
                  bordered={false}
                  cover={<img alt={program.title} src={program.imageUrl} />}
                >
                  <Row>
                    <Col span={13}>
                      <Title level={4}>
                        <a
                          target={'_blank'}
                          rel={'noreferrer'}
                          href={program.landingPageUrl}
                        >
                          {program.title}
                        </a>
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
                          Apply as mentor
                        </Button>
                      ) : (
                        ''
                      )}
                      {program.state == 'MENTEE_APPLICATION' && !isUserAdmin ? (
                        <Button type="primary" href={`/program/${program.id}`}>
                          Apply as mentee
                        </Button>
                      ) : (
                        ''
                      )}
                      {program.state == 'MENTOR_CONFIRMATION' &&
                      !isUserAdmin &&
                      user != null ? (
                        <Button
                          type="primary"
                          href={`/program/${program.id}/mentor/confirmation`}
                        >
                          My mentor
                        </Button>
                      ) : (
                        ''
                      )}
                    </Col>
                  </Row>
                  <Paragraph>{program.headline}</Paragraph>
                </Card>
              </Col>
            ) : null}
          </>
        ))}
        {isUserAdmin ? (
          <Col md={6}>
            <AddProgram />
          </Col>
        ) : null}
      </Row>
    </Spin>
  );
}

export default ActivePrograms;
