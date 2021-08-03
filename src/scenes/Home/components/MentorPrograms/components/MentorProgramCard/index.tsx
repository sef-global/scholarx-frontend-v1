import React from 'react';

import { Button, Card, Col, Row, Typography } from 'antd';
import { useHistory } from 'react-router-dom';

import styles from '../../../../styles.css';
import { MentorProgramCardProps } from './interfaces';

const { Paragraph, Title, Text } = Typography;

function MentorProgramCard({
  program,
  buttonText,
  state,
  isRejected,
  href,
}: MentorProgramCardProps) {
  const history = useHistory();

  return (
    <Col className={styles.col} md={6} key={program.id}>
      <Card
        className={styles.card}
        bordered={false}
        cover={
          <img
            className={styles.img}
            alt={program.title}
            src={program.imageUrl}
          />
        }
      >
        <Row>
          <Col span={13}>
            <Title level={4}>
              <a
                target={'_blank'}
                rel={'noreferrer'}
                href={program.landingPageUrl}
              >
                {program.title}
              </a>
            </Title>
          </Col>
          <Col span={11} className={styles.programActionButton}>
            {isRejected ? <Text type={'danger'}>Rejected</Text> : null}
            {state !== 'MENTEE_APPLICATION' && !isRejected ? (
              <Button type="primary" onClick={() => history.push(href)}>
                {buttonText}
              </Button>
            ) : null}
          </Col>
        </Row>
        <Paragraph>{program.headline}</Paragraph>
      </Card>
    </Col>
  );
}

export default MentorProgramCard;
