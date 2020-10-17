import React from 'react';
import { Typography, List, Skeleton, Avatar } from 'antd';
import PersonCard from './components/PersonCard';
import styles from './style.css';
import 'antd/dist/antd.css';

const { Title } = Typography;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: `${i}`,
    href: 'https://ant.design',
    title: `Mentee ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Brief Intro about the mentee.',
  });
}

function ManageMentees() {
  return (
    <div>
      <Title>Manage Mentees</Title>
      <List
        itemLayout="horizontal"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 8,
        }}
        dataSource={listData}
        renderItem={(item) => <PersonCard item={item} />}
      />
    </div>
  );
}

export default ManageMentees;
