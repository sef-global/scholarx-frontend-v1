import React, { useEffect, useState } from 'react';
import { Typography, List, Button, Avatar, notification, Spin } from 'antd';
import { Mentor } from './interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';

const { Title } = Typography;

function ManageMentors() {
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
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the mentors',
        });
      });
  }, []);

  return (
    <div>
      <Title>Manage Mentors</Title>
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
          dataSource={mentors}
          renderItem={(item: Mentor) => (
            <List.Item
              key={item.id}
              actions={[
                <Button key="edit" type="primary">
                  Edit
                </Button>,
                <Button key="more" type="default">
                  More
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.profile.imageUrl} />}
                title={
                  <a href="#">
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
  );
}

export default ManageMentors;
