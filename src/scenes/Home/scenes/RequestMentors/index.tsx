import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  Button,
  Avatar,
  notification,
  Spin,
  Row,
  Col,
} from 'antd';
import { Mentor } from './interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import mainStyles from '../../styles.css';

const { Title } = Typography;

function RequestMentors() {
  const { programId } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/scholarx/programs/${programId}/mentors`)
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setMentors(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Warning!',
          description: 'Something went wrong when fetching the mentors',
        });
      });
  }, []);

  return (
    <Row>
      <Col span={18} offset={3}>
        <div className={mainStyles.container}>
          <Title>Request Mentors</Title>
          <Spin tip="Loading..." spinning={isLoading}>
            <List
              itemLayout="horizontal"
              size="large"
              pagination={{
                pageSize: 8,
              }}
              dataSource={mentors}
              renderItem={(item: Mentor) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button key="request" type="primary">
                      Request
                    </Button>,
                    <Button key="edit" type="default">
                      Edit
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.profile.imageUrl} />}
                    title={
                      <a href={item.profile.linkedinUrl}>
                        {item.profile.firstName} {item.profile.lastName}
                      </a>
                    }
                    description={item.profile.headline}
                  />
                </List.Item>
              )}
            />
          </Spin>
        </div>
      </Col>
    </Row>
  );
}

export default RequestMentors;
