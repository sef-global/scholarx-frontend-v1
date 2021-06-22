import React from 'react';

import { Button, Card, Col, Row, Typography } from 'antd';

import styles from '../../../../styles.css';
import { MentorProgramCardProps } from './interfaces';

const { Paragraph, Title, Text } = Typography;

function MentorProgramCard(props: MentorProgramCardProps) {
  return (
    <Col className={styles.col} md={6} key={props.program.id}>
      <Card
        className={styles.card}
        bordered={false}
        cover={
          <img
            className={styles.img}
            alt={props.program.title}
            src={props.program.imageUrl}
          />
        }
      >
        <Row>
          <Col span={13}>
            <Title level={4}>
              <a
                target={'_blank'}
                rel={'noreferrer'}
                href={props.program.landingPageUrl}
              >
                {props.program.title}
              </a>
            </Title>
          </Col>
          <Col span={11} className={styles.programActionButton}>
            {props.isRejected ? (
              <Text type={'danger'}>Rejected</Text>
            ) : (
              <Button type="primary" href={props.href}>
                {props.buttonText}
              </Button>
            )}
          </Col>
        </Row>
        <Paragraph>{props.program.headline}</Paragraph>
      </Card>
    </Col>
  );
}

export default MentorProgramCard;
