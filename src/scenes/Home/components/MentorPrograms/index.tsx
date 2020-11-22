import React, { useEffect, useState } from 'react';
import { Button, Card, Col, notification, Row, Spin, Typography } from 'antd';
import styles from '../../styles.css';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { SavedProgram } from '../../../../interfaces';

const { Paragraph, Title } = Typography;

function MentorPrograms() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [programs, setPrograms] = useState<SavedProgram[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/me/programs/mentor', {
        withCredentials: true,
      })
      .then((response: AxiosResponse<SavedProgram[]>) => {
        setPrograms(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.reponse.status != 401) {
          notification.error({
            message: 'Something went wrong when fetching the program',
            description: error.toString(),
          });
        }
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
                <Col span={18}>
                  <Title level={4}>
                    <Link to={program.landingPageUrl}>{program.title}</Link>
                  </Title>
                </Col>
                <Col span={6} className={styles.programActionButton}>
                  <Button type="primary" href={`/program/${program.id}/mentor`}>
                    Manage
                  </Button>
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

export default MentorPrograms;
