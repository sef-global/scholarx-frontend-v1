import React, { useEffect, useState } from 'react';

import { Typography, notification, Spin, Button, Select, Table } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';

import { API_URL } from '../../../../constants';
import { Mentee } from '../../../../types';
import styles from '../../styles.css';

const { Title } = Typography;
const { Option } = Select;

const columns = [
  {
    title: 'Mentee',
    dataIndex: 'name',
    filters: [],
  },
  {
    title: 'Primary Mentor',
    dataIndex: 'primaryMentor',
  },
  {
    title: 'Assigned To',
    filters: [],
    render: () => (
      <Select showSearch style={{ width: 200 }} placeholder="Select a person">
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [],
    render: () => (
      <Select showSearch style={{ width: 200 }} placeholder="Select a state">
        <Option value="PENDING">PENDING</Option>
        <Option value="ASSIGNED">ASSIGNED</Option>
        <Option value="POOL">POOL</Option>
        <Option value="DISCARDED">DISCARDED</Option>
      </Select>
    ),
  },
  {
    title: '',
    dataIndex: 'status',
    render: () => <Button type="link">View Application</Button>,
  },
];

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

  return (
    <div className={styles.container}>
      <Title>Manage Mentees</Title>
      <Spin tip="Loading..." spinning={isLoading}>
        <Table columns={columns} dataSource={mentees} />
      </Spin>
    </div>
  );
}

export default ManageMentees;
