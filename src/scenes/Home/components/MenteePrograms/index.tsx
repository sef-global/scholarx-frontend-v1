import React, { useEffect, useState } from 'react';
import {
  Result,
  Button,
  Card,
  Col,
  notification,
  Row,
  Spin,
  Typography,
} from 'antd';
import styles from '../../styles.css';
import axios, { AxiosResponse } from 'axios';
import { SavedProgram } from '../../../../interfaces';
import { SmileOutlined } from '@ant-design/icons';

const { Paragraph, Title } = Typography;

function MenteePrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<SavedProgram[]>([]);
  const [menteePrograms, setMenteePrograms] = useState<SavedProgram[]>([]);

  useEffect(() => {
    getMenteePrograms();
  }, []);

  const getMenteePrograms = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/api/me/programs/mentee', {
        withCredentials: true,
      })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        setPrograms(response.data);
        if (response.status == 204) {
          getMenteeApplicationPrograms();
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

  // Get the programs that in MENTEE_APPLICATION state to show if the user haven't apply as a mentee
  const getMenteeApplicationPrograms = () => {
    const menteeApplicationPrograms: SavedProgram[] = [];
    setIsLoading(true);
    axios
      .get('http://localhost:8080/api/programs', {
        withCredentials: true,
      })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        response.data.map((program) => {
          if (program.state == 'MENTEE_APPLICATION') {
            menteeApplicationPrograms.push(program);
          }
        });
        setMenteePrograms(menteeApplicationPrograms);
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
              title="You haven't applied for any program as a mentee"
              subTitle={
                menteePrograms.length != 0 ? (
                  <Paragraph>
                    You can apply for following programs
                    <ul>
                      {menteePrograms.map((program) => (
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

export default MenteePrograms;
