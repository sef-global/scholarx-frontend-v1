import React from 'react';

import { Avatar, Card, Col, Row, Typography } from 'antd';

import styles from '../styles.css';
import { MentorCardProps } from './interfaces';

const { Title, Paragraph } = Typography;

function MentorCard(props: MentorCardProps) {
  return (
    <Card hoverable className={styles.mentorCardHeight}>
      <Row justify="center">
        <Col>
          <Row justify="center">
            <Avatar size={64} src={props.item.profile.imageUrl} />
            <Title level={4} className={styles.cardTitle}>
              {props.item.profile.firstName} {props.item.profile.lastName}
            </Title>
            <Paragraph>{props.item.profile.headline}</Paragraph>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default MentorCard;
