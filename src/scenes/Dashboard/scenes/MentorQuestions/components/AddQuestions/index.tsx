import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import { Button, Table, Row, Col, Input, Spin, notification, Form } from 'antd';
import { API_URL } from '../../../../../../constants';
import { Question } from '../../../../../../types';
import { AddQuestionsProps } from './interfaces';
import styles from '../../../styles.css';

const columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
  },
];

function AddQuestions({ isProgramStateValid }: AddQuestionsProps) {
  const { programId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getMentorQuestions();
  }, []);

  const getMentorQuestions = () => {
    axios
      .get(`${API_URL}/programs/${programId}/questions/MENTOR`, {
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
        `${API_URL}/admin/programs/${programId}/questions/MENTOR`,
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
          getMentorQuestions();
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
      {isProgramStateValid && (
        <Row gutter={16} className={styles.marginBottom}>
          <Col span={24}>
            <Form onFinish={addQuestion}>
              <Form.Item name="question">
                <Input
                  allowClear={true}
                  placeholder="Ex: What is your highest level of education?"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form>
          </Col>
        </Row>
      )}
      <Table
        columns={columns}
        dataSource={questions}
        className={styles.marginBottom}
      />
    </Spin>
  );
}

export default AddQuestions;
