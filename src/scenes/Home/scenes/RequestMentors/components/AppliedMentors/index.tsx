import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  Avatar,
  notification,
  Spin,
  Row,
  Col,
  Card,
} from 'antd';
import { Mentor } from '../../../../../../interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from '../styles.css';

const { Title, Paragraph } = Typography;

function AppliedMentors() {
  const { programId } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const match = useRouteMatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8080/api/scholarx/programs/${programId}/mentee/mentors`
      )
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setMentors(result.data);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        notification.error({
          message: error.toString(),
          description: 'Something went wrong when fetching the applied mentors',
        });
      });
  }, []);

  return (
    <div className={styles.container}>
      <Spin tip="Loading..." spinning={isLoading}>
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          itemLayout="horizontal"
          size="large"
          pagination={{
            pageSize: 8,
          }}
          dataSource={mentors}
          renderItem={(item: Mentor) => (
            <List.Item key={item.id}>
              <Link to={`${match.url}/mentor/${item.id}/application`}>
                <Card hoverable className={styles.mentorCardHeight}>
                  <Row justify="center">
                    <Col>
                      <Row justify="center">
                        <Avatar size={64} src={item.profile.imageUrl} />
                        <Title level={4} className={styles.cardTitle}>
                          {item.profile.firstName} {item.profile.lastName}
                        </Title>
                        <Paragraph>{item.profile.headline}</Paragraph>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
}

export default AppliedMentors;
