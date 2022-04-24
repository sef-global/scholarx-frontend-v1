import React from 'react';

import { Typography, Row, Col, Input, Form, Select, Button } from 'antd';

const { Title } = Typography;

function SendMail() {
  return (
    <Row>
      <Col md={18}>
        <Title>Send Mail</Title>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="vertical"
          size="large"
        >
          <Form.Item name="subject" label="Subject">
            <Input />
          </Form.Item>
          <Form.Item name="mailingGroup" label="Mailing Group">
            <Select
              mode="multiple"
              allowClear
              placeholder="Select"
              defaultValue={['All mentors']}
            />
          </Form.Item>
          <Form.Item name="message" label="Message">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default SendMail;
