import React, { useEffect, useState } from 'react';

import { Form, Tabs, Button, Input, Select } from 'antd';
import { useHistory, useParams } from 'react-router';

import styles from './styles.css';

const { TabPane } = Tabs;

function MenteeApplication() {
  const { mentorId, programId } = useParams<{
    mentorId: string,
    programId: string,
  }>();
  const history = useHistory();
  const [form] = Form.useForm();

  const onBack = () => {
    history.push(`/program/${programId}`);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" onTabClick={onBack}>
        <TabPane tab="Mentors" key="1" />
      </Tabs>
      <br />
      <div className={styles.contentMargin}>
        <Form form={form} layout="vertical" size="middle">
          <Form.Item label="Primary Mentor">
            <Select defaultValue={'1'}>
              <Select.Option value="1">Ted Mosbey</Select.Option>
              <Select.Option value="2">Marshal Erikson</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="University">
            <Input />
          </Form.Item>
          <Form.Item label="Course/Major">
            <Input />
          </Form.Item>
          <Form.Item label="Year of study">
            <Input />
          </Form.Item>
          <Form.Item label="Intent for a mentor">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Reasoning for the choice">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" className={styles.button}>
              Apply
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default MenteeApplication;
