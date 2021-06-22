import React, { useEffect, useState } from 'react';

import { notification, Spin, Typography, Form, Input, Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';

import { API_URL } from '../../../../constants';
import { SavedProgram, UnsavedProgram } from '../../../../types';

const { Title } = Typography;

function EditProgram() {
  const [form] = Form.useForm();
  const { programId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs/${programId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setIsLoading(false);
          form.setFieldsValue({
            title: result.data.title,
            headline: result.data.headline,
            imageUrl: result.data.imageUrl,
            landingPageUrl: result.data.landingPageUrl,
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the program',
        });
      });
  }, []);

  const addProgram = (values: any) => {
    setIsLoading(true);
    const program: UnsavedProgram = {
      title: values.title,
      headline: values.headline,
      imageUrl: values.imageUrl,
      landingPageUrl: values.landingPageUrl,
    };
    axios
      .put(`${API_URL}/admin/programs/${programId}`, program, {
        withCredentials: true,
      })
      .then((res: AxiosResponse<SavedProgram>) => {
        if (res.status == 200) {
          setIsLoading(false);
          notification.success({
            message: 'Success!',
            description: 'Program saved!',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when editing the program',
        });
      });
  };

  return (
    <div>
      <Title>Edit Program</Title>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form
          onFinish={addProgram}
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
          <Form.Item name="headline" label="Heading">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="landingPageUrl" label="Landing Page URL">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Spin>
    </div>
  );
}

export default EditProgram;
