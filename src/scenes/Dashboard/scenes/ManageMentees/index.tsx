import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  Avatar,
  notification,
  Spin,
  Button,
  Modal,
} from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { Mentee } from './interfaces';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../../../constants';
import styles from '../../styles.css';

const { Title } = Typography;
const { confirm } = Modal;

function ManageMentees() {
  const { programId } = useParams();
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/admin/programs/${programId}/mentees`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentee[]>) => {
        if (result.status == 200 || result.status == 204) {
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

  const removeMentee = (id: number) => {
    confirm({
      title: 'Do you want to remove this mentee?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        axios
          .delete(`${API_URL}/mentees/${id}`, {
            withCredentials: true,
          })
          .then((result: AxiosResponse) => {
            if (result.status == 200) {
              notification.success({
                message: 'Success!',
                description: 'Successfully removed the mentee',
              });
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            notification.error({
              message: 'Error!',
              description: 'Something went wrong when deleting the mentee',
            });
          });
      },
    });
  };

  return (
    <div className={styles.container}>
      <Title>Manage Mentees</Title>
      <Spin tip="Loading..." spinning={isLoading}>
        <List
          itemLayout="horizontal"
          size="large"
          pagination={{
            pageSize: 8,
          }}
          dataSource={mentees}
          renderItem={(item: Mentee) => (
            <List.Item
              key={item.profile.id}
              actions={[
                <Button
                  key="remove"
                  type="primary"
                  onClick={() => removeMentee(item.profile.id)}
                  danger
                >
                  Remove
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
  );
}

export default ManageMentees;
