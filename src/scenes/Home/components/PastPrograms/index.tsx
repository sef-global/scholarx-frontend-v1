import React, { useEffect, useState } from 'react';
import { Card, Col, notification, Row, Spin, Typography } from 'antd';
import styles from '../../styles.css';
import axios, { AxiosResponse } from 'axios';
import { SavedProgram } from '../../../../interfaces';
import { API_URL } from '../../../../constants';

const { Paragraph, Title } = Typography;

function PastPrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<SavedProgram[]>([]);

  useEffect(() => {
    getPrograms();
  }, []);

  const getPrograms = () => {
    const pastPrograms: SavedProgram[] = [];
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs`, { withCredentials: true })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        response.data.map((program) => {
          if (program.state === 'COMPLETED') {
            pastPrograms.push(program);
          }
        });
        setPrograms(pastPrograms);
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
    </Spin>
  );
}

export default PastPrograms;
