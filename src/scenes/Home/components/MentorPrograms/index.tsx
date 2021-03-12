import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  notification,
  Result,
  Row,
  Spin,
  Typography,
} from 'antd';
import styles from '../../styles.css';
import axios, { AxiosResponse } from 'axios';
import { SavedProgram } from '../../../../interfaces';
import { SmileOutlined } from '@ant-design/icons';
import { API_URL } from '../../../../constants';

const { Paragraph, Title } = Typography;

function MentorPrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<SavedProgram[]>([]);
  const [mentorPrograms, setMentorPrograms] = useState<SavedProgram[]>([]);

  useEffect(() => {
    getMentorPrograms();
  }, []);

  const getMentorPrograms = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/me/programs/mentor`)
      .then((response: AxiosResponse<SavedProgram[]>) => {
        setPrograms(response.data);
        if (response.status == 204) {
          getMentorApplicationPrograms();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status != 401) {
          notification.error({
            message: 'Something went wrong when fetching the program',
            description: error.toString(),
          });
        }
      });
  };

  // Get the programs that in MENTOR_APPLICATION state to show if the user haven't apply as a mentor
  const getMentorApplicationPrograms = () => {
    const mentorApplicationPrograms: SavedProgram[] = [];
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs`)
      .then((response: AxiosResponse<SavedProgram[]>) => {
        response.data.map((program) => {
          if (program.state == 'MENTOR_APPLICATION') {
            mentorApplicationPrograms.push(program);
          }
        });
        setMentorPrograms(mentorApplicationPrograms);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status != 401) {
          notification.error({
            message: 'Something went wrong when fetching the program',
            description: error.toString(),
          });
        }
      });
  };

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      {programs.length == 0 ? (
        <Row className={styles.resultRow}>
          <Col>
            <Result
              icon={<SmileOutlined />}
              title="You haven't applied for any program as a mentor"
              subTitle={
                mentorPrograms.length != 0 ? (
                  <Paragraph>
                    You can apply for following programs
                    <ul>
                      {mentorPrograms.map((program) => (
                        <li key={program.id} className={styles.removeBullet}>
                          <a key={program.id} href={program.landingPageUrl}>
                            {program.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Paragraph>
                ) : (
                  ''
                )
              }
              extra={
                <Button href={'/home'} type="primary">
                  View available Programs
                </Button>
              }
            />
          </Col>
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {programs.map((program: SavedProgram) => (
            <Col md={6} key={program.id}>
              <Card
                className={styles.card}
                bordered={false}
                cover={<img alt={program.title} src={program.imageUrl} />}
              >
                <Row>
                  <Col span={18}>
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
                  <Col span={6} className={styles.programActionButton}>
                    <Button
                      type="primary"
                      href={`/mentor/program/${program.id}`}
                    >
                      Manage
                    </Button>
                  </Col>
                </Row>
                <Paragraph>{program.headline}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Spin>
  );
}

export default MentorPrograms;
