import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

function AddProgramme() {
  const [componentSize, setComponentSize] = useState('large');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <Title>Create a new programme</Title>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
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

export default AddProgramme;
