import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  Button,
  Avatar,
  notification,
  Spin,
  Col,
  Row,
} from 'antd';
import { Mentee } from './interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import styles from './styles.css';

const { Title } = Typography;

function ManageMenteesOfMentor() {
  const { mentorId } = useParams();
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/scholarx/mentors/${mentorId}/mentees`)
      .then((result: AxiosResponse<Mentee[]>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setMentees(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description:
            'Something went wrong when fetching the mentees of a mentor',
        });
      });
  }, []);

  return (
    <div>
      <Row>
        <Col md={3} />
        <Col md={15}>
          <div className={styles.container}>
            <Title>Manage Mentees</Title>
            <Spin tip="Loading..." spinning={isLoading}>
              <List
                itemLayout="horizontal"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 8,
                }}
                dataSource={mentees}
                renderItem={(item: Mentee) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Button key="edit" type="primary">
                        Approve
                      </Button>,
                      <Button key="more" type="default">
                        Reject
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
    </div>
  );
}

export default ManageMenteesOfMentor;
