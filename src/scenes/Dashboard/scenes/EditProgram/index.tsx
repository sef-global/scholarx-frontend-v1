import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { Form, Input, Button } from 'antd';

const { Title } = Typography;

function EditProgram() {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      title: 'ScholarX 2020',
      imgURL:
        'https://lh3.googleusercontent.com/proxy/D8J_-lvem5PudnTSWd5aEeRNsunZuaO3LsG8DT_441waCVhdmA7d3SYfBmhkbbEQBBIBQOHPyA29o1O3boDc9gsAd2KUcTnj3G4fZpVkpLmMlE9lf2dBmzbcj9NUvIjyxo18c2TfZNw',
      landingURL: '',
      description: 'Lorem Ipsum dolor sit amet',
    });
  }, []);

  return (
    <div>
      <Title>Edit Program</Title>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        size="large"
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="imgURL" label="Image URL">
          <Input />
        </Form.Item>
        <Form.Item name="landingURL" label="Landing Page URL">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditProgram;
