import React from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popover, Typography } from 'antd';

import styles from './styles.css';

const { Paragraph, Title } = Typography;
const content = (
  <div>
    <Title level={4}>Mentor</Title>
    <Paragraph>
      <ul>
        <li>
          <a
            href="https://docs.google.com/document/d/1ZJeKxdAvHcPanXRoGP5rT-vkOTEfsYhrnqr1QVglS58/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Mentor Guide
          </a>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/13b0xg3HdZeQohefYMY9gP8_r_G11pGFA/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Mentor Video Guide
          </a>
        </li>
      </ul>
    </Paragraph>
    <Title level={4}>Mentee</Title>
    <Paragraph>
      <ul>
        <li>
          <a
            href="https://drive.google.com/file/d/1vnW1bhNzETtPtiGTsphzBT2GQ6K0LuX9/view"
            target="_blank"
            rel="noreferrer"
          >
            Mentee Video Guide
          </a>
        </li>
      </ul>
    </Paragraph>
  </div>
);

function HelpButton() {
  return (
    <div className={styles.helpPosition}>
      <Popover placement="leftBottom" content={content} trigger="click">
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<QuestionCircleOutlined />}
        >
          Watch Tutorial
        </Button>
      </Popover>
    </div>
  );
}

export default HelpButton;
