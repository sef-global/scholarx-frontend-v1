import React from 'react';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popover, Typography } from 'antd';

const { Paragraph, Title } = Typography;
const content = (
  <div>
    <Title level={5}>Mentor</Title>
    <Paragraph>
      <a
        href="https://docs.google.com/document/d/1ZJeKxdAvHcPanXRoGP5rT-vkOTEfsYhrnqr1QVglS58/edit?usp=sharing"
        target="_blank"
        rel="noreferrer"
      >
        Mentor Guide
      </a>
    </Paragraph>
    <Title level={5}>Mentee</Title>
    <Paragraph>
      <a
        href="https://docs.google.com/document/d/1IbdbR-tukgLykP_1jgDcapYncTU3d7fTg2NP6xbo8PI/edit#heading=h.s76f76qd3wwq"
        target="_blank"
        rel="noreferrer"
      >
        Mentee Guide
      </a>
    </Paragraph>
    <Title level={5}>Need technical support?</Title>
    <a
      href="https://join.slack.com/t/sefheadquarters/shared_invite/zt-9w6v9rdu-uJGLrMKLTNFzQEVPC4sbOw"
      target="_blank"
      rel="noreferrer"
    >
      <Button type={'primary'} block>
        Join our Slack channel
      </Button>
    </a>
  </div>
);

function HelpButton() {
  return (
    <Popover placement="bottom" content={content} trigger="click">
      <Button>
        Help <QuestionCircleOutlined />
      </Button>
    </Popover>
  );
}

export default HelpButton;
