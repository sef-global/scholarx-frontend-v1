import React, { useEffect, useState } from 'react';

import { Button, Table, Row, Col, Input, Spin, notification, Form } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';

import { API_URL } from '../../../../../../constants';
import { Question } from '../../../../../../types';
import styles from '../../../styles.css';

const columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
  },
];

function AddQuestions() {
  const { programId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getMenteeQuestions();
  }, []);

  const getMenteeQuestions = () => {
    axios
      .get(`${API_URL}/programs/${programId}/questions/MENTEE`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse<Question[]>) => {
        if (response.status == 200) {
          setIsLoading(false);
          setQuestions(response.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching questions',
        });
      });
  };

  const addQuestion = (values: Question) => {
    setIsLoading(true);
    const questions = [
      {
        question: values.question,
      },
    ];
    axios
      .post(
        `${API_URL}/admin/programs/${programId}/questions/MENTEE`,
        questions,
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse<Question[]>) => {
        if (response.status == 200) {
          notification.success({
            message: 'Success!!',
            description: 'Question saved',
          });
          getMenteeQuestions();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong while adding questions',
        });
      });
  };

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Row gutter={16} className={styles.marginBottom}>
        <Col span={24}>
          <Form onFinish={addQuestion}>
            <Form.Item name="question">
              <Input
                allowClear={true}
                placeholder="Ex: Please let us know your top areas of interest (maximum 5 areas)"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={questions}
        className={styles.marginBottom}
      />
    </Spin>
  );
}

export default AddQuestions;
