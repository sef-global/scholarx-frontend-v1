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
import { SavedProgram } from '../../../../types';
import { API_URL } from '../../../../constants';
import { SmileOutlined } from '@ant-design/icons';

const { Paragraph, Title } = Typography;

function CompletedPrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<SavedProgram[]>([]);

  useEffect(() => {
    getMentoredPrograms();
    getMenteePrograms();
  }, []);
  // Get the programs that user mentored as a mentor.
  const getMentoredPrograms = () => {
    const mentoredPrograms: SavedProgram[] = [];
    setIsLoading(true);
    axios
      .get(`${API_URL}/me/programs/mentor`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        response.data.map((program) => {
          if (program.state === 'COMPLETED') {
            mentoredPrograms.push(program);
          }
        });
        setPrograms(mentoredPrograms);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status != 401) {
          notification.error({
            message: 'Something went wrong when fetching the user',
            description: error.toString(),
          });
        }
      });
  };
  // Get the programs that user was a mentee.
  const getMenteePrograms = () => {
    const menteePrograms: SavedProgram[] = [];
    setIsLoading(true);
    axios
      .get(`${API_URL}/me/programs/mentee`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        response.data.map((program) => {
          if (program.state === 'COMPLETED') {
            menteePrograms.push(program);
          }
        });
        setPrograms(menteePrograms);
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
              title="You haven't completed any programs"
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
            <Col className={styles.col} md={6} key={program.id}>
              <Card
                className={styles.card}
                bordered={false}
                cover={
                  <img
                    className={styles.img}
                    alt={program.title}
                    src={program.imageUrl}
                  />
                }
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

export default CompletedPrograms;
