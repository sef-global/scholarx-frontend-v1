import React from 'react';
import { Avatar, Button, Card, Typography } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './styles.css';

type Prop = {
  name: string,
};

const { Title } = Typography;
function PersonCard({ name }: Prop) {
  return (
    <Card size="small" className={styles.card} bordered={false}>
      <div className={styles.cardWrapper}>
        <div className={styles.avatar}>
          <Avatar size={54} icon={<UserOutlined />} className={styles.title} />
          <Title level={4} className={styles.name}>
            {name}
          </Title>
        </div>
        <div>
          <Button
            type="primary"
            shape="round"
            className={styles.btn}
            icon={<CheckOutlined />}
          >
            Approve
          </Button>
          <Button danger type="default" shape="round" icon={<CloseOutlined />}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default PersonCard;
