import React from 'react';
import { Typography } from 'antd';
import { List, Skeleton, Avatar, Button } from 'antd';
import styles from './style.css';

function PersonCard(props) {
  return (
    <List.Item
      actions={[
        <Button type="primary">Edit</Button>,
        <Button type="default">More</Button>,
      ]}
    >
      <Skeleton avatar title={false} loading={props.item.loading} active>
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href="#">{props.item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </Skeleton>
    </List.Item>
  );
}

export default PersonCard;
