import React, { useEffect, useState } from 'react';

import { Button, Input, Spin, notification, Form } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';

import { API_URL } from '../../../../../../constants';
import { Question } from '../../../../../../types';

function EditQuestions() {
  const { programId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true);
    getQuestions();
  }, []);

  const getQuestions = () => {
    axios
      .get(`${API_URL}/programs/${programId}/questions/MENTOR`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Question[]>) => {
        if (result.status == 200) {
          setIsLoading(false);
          setQuestions(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Error!',
          description: 'Something went wrong when fetching the questions',
        });
      });
  };

  const editQuestion = (values: any) => {
    setIsLoading(true);
    const editedQuestions: Question[] = [];
    for (var i in values) {
      const question: Question = {};
      question.id = i;
      question.question = values[i];
      editedQuestions.push(question);
    }

    setIsLoading(true);
    axios
      .put(`${API_URL}/admin/questions`, editedQuestions, {
        withCredentials: true,
      })

      .then((result: AxiosResponse<Question[]>) => {
        if (result.status == 200) {
          setIsLoading(false);
          getQuestions();
          notification.success({
            message: 'Success!!',
            description: 'Questions saved',
          });
        } else {
          throw new Error();
        }
      })

      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong while saving questions',
        });
      });
  };

  return (
    <>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form form={form} onFinish={editQuestion}>
          {questions.map((question) => (
            <Form.Item
              key={question.id}
              name={question.id}
              initialValue={question.question}
            >
              <Input type="text" />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}

export default EditQuestions;
