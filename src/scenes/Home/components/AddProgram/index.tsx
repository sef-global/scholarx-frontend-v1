import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, notification, Spin, Row, Col, Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useHistory } from 'react-router';

import { API_URL } from '../../../../constants';
import { SavedProgram } from '../../../../types';
import styles from './styles.css';

function AddProgram() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const addProgram = (values: any) => {
    const program = {
      title: values.title,
      headline: values.heading,
      imageUrl: values.imgURL,
      landingPageUrl: values.landingURL,
    };
    setIsLoading(true);
    axios
      .post(`${API_URL}/admin/programs/`, program, {
        withCredentials: true,
      })
      .then((res: AxiosResponse<SavedProgram>) => {
        if (res.status == 201) {
          setIsLoading(false);
          notification.success({
            message: 'Success!',
            description: 'Program saved!',
          });
          // Updates the home component with the added program
          history.push('/');
          hideModal();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when creating the program',
        });
      });
  };

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    form.resetFields();
  };

  const resetFormfields = () => {
    hideModal();
  };

  return (
    <>
      <Button
        type="dashed"
        className={styles.programAddButton}
        onClick={showModal}
        block
      >
        <PlusOutlined /> Add Program
      </Button>
      <Modal
        title="Add Program"
        visible={isVisible}
        closable={true}
        footer={null}
      >
        <Spin tip="Loading..." spinning={isLoading}>
          <Form
            layout="vertical"
            size="large"
            onFinish={addProgram}
            form={form}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: 'Please provide a title for the program',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="heading"
              label="Heading"
              rules={[{ required: true, message: 'Please provide a heading' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imgURL"
              label="Image URL"
              rules={[
                {
                  required: true,
                  message: 'Please add a image URL for the program card',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="landingURL"
              label="Landing Page URL"
              rules={[
                {
                  required: true,
                  message: 'Please add the link for the static page',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Col span={10} offset={14}>
              <Row justify-end>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.modalFooterbtn}
                >
                  Save
                </Button>
                <Button htmlType="button" onClick={resetFormfields}>
                  Cancel
                </Button>
              </Row>
            </Col>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default AddProgram;
