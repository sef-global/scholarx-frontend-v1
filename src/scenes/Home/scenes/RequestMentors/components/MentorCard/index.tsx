import React from 'react';

import { Avatar, Card, Col, Row, Typography } from 'antd';

import styles from '../styles.css';
import { MentorCardProps } from './interfaces';

const { Title, Paragraph } = Typography;

function MentorCard({ item }: MentorCardProps) {
  return (
    <Card hoverable className={styles.mentorCardHeight}>
      <Row justify="center">
        <Col>
          <Row justify="center">
            <Avatar size={64} src={item.profile.imageUrl} />
          </Row>
          <Row justify="center">
            <Title level={4} className={styles.cardTitle}>
              {item.profile.firstName} {item.profile.lastName}
            </Title>
          </Row>
          <Paragraph className={styles.profileHeadline}>
            {item.profile.headline}
          </Paragraph>
        </Col>
      </Row>
    </Card>
  );
}

export default MentorCard;
