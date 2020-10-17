import React, { useState } from 'react';
import { Typography } from 'antd';
import { Form, Input, Button } from 'antd';
import styles from './style.css';

const { Title } = Typography;

function EditDetails() {
  return (
    <div>
      <Title>Edit Programme</Title>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Image URL">
          <Input />
        </Form.Item>
        <Form.Item label="Landing Page URL">
          <Input />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditDetails;
