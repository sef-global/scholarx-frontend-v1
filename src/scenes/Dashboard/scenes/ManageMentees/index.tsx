import React, { useEffect, useState } from 'react';
import { Typography, List, Button, Avatar, notification, Spin } from 'antd';

import { Mentee } from './interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import ListAction from './components/ListAction';

const { Title } = Typography;

function ManageMentees() {
  const { programId } = useParams();
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/scholarx/programs/${programId}/mentees`)
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
          description: 'Something went wrong when fetching the mentees',
        });
      });
  }, []);

  return (
    <div>
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
              key={item.profile.id}
              actions={[
                <ListAction key={item.profile.id} id={item.profile.id} />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.profile.imgUrl} />}
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
  );
}

export default ManageMentees;
