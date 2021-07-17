import React, { useEffect, useState } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Col,
  Row,
  Typography,
  Card,
  Steps,
  Button,
  Progress,
  Modal,
  notification,
  Spin,
} from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

import { API_URL } from '../../../../constants';
import { SavedProgram } from '../../../../types';
import { State } from './interfaces';
import styles from './styles.css';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const stateEnumVals: string[] = [
  'CREATED',
  'MENTOR_APPLICATION',
  'MENTOR_SELECTION',
  'MENTEE_APPLICATION',
  'MENTEE_SELECTION',
  'MENTOR_CONFIRMATION',
  'ONGOING',
  'COMPLETED',
  'REMOVED',
];
const programStates: State[] = [
  {
    stepNo: 0,
    name: 'Created',
    description: 'The program is in the created state.',
  },
  {
    stepNo: 1,
    name: 'Mentor Application Period',
    description: 'In this state mentors can start sending their applications.',
  },
  {
    stepNo: 2,
    name: 'Mentor Approval Period',
    description:
      'During this state, the admin can review the mentor application and approve or reject them.',
  },
  {
    stepNo: 3,
    name: 'Mentee Application Period',
    description: 'In this state mentees can start sending their applications.',
  },
  {
    stepNo: 4,
    name: 'Mentee Approval Period',
    description:
      'During this state, mentors can review the mentor application and approve or reject them.',
  },
  {
    stepNo: 5,
    name: 'Mentor Confirmation',
    description:
      'During this state, mentees can see their mentor and if they have been chosen by multiple mentors they can choose one of them as their mentor.',
  },
  {
    stepNo: 6,
    name: 'Ongoing',
    description: 'This state indicates that the program is currently running.',
  },
  {
    stepNo: 7,
    name: 'Completed',
    description: 'The program is completed.',
  },
];

function ChangeState() {
  const { programId } = useParams();
  const [programTitle, setProgramTitle] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get(`${API_URL}/programs/${programId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setCurrentStep(stateEnumVals.indexOf(result.data.state));
          setProgramTitle(result.data.title);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the program',
        });
      });
  });
  const handleStepChange = () => {
    setIsLoading(true);
    axios({
      method: 'put',
      url: `${API_URL}/admin/programs/${programId}/state`,
      withCredentials: true,
    })
      .then((result) => {
        setIsLoading(false);
        if (result.status == 200) {
          setCurrentStep(currentStep + 1);
          notification.success({
            message: 'Success!',
            description: 'Changed the state successfully!',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when changing the state',
        });
      });
  };
  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      title: 'Warning! This action is irreversible. Do you wish to proceed?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <Paragraph>
          Changing state of the <b>{programTitle}</b> from
          <b> {programStates[currentStep].name}</b> to{' '}
          <b>{programStates[currentStep + 1].name}</b>.
        </Paragraph>
      ),
      onOk() {
        handleStepChange();
      },
    });
  };
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <div className={styles.contentWrapper}>
        <Title>Change State</Title>
        <Row justify="center">
          <Col md={20}>
            <Card className={styles.cardWrapper}>
              <Title level={3}>{programTitle}</Title>
              <Progress
                className={styles.progress}
                type="circle"
                percent={Math.round(
                  ((currentStep + 1) * 100) / programStates.length
                )}
              />
              <Paragraph>
                <Text type="warning">Current State: </Text>{' '}
                {programStates[currentStep].name}
              </Paragraph>
              <Paragraph>{programStates[currentStep].description}</Paragraph>
              <Button
                type="primary"
                onClick={showConfirm}
                disabled={currentStep >= programStates.length - 1}
              >
                Change State
              </Button>
            </Card>
            <br />
          </Col>
        </Row>
        <div className={styles.bottomDoc}>
          <Steps progressDot current={currentStep}>
            {programStates.map((step: State) => {
              return (
                <Step
                  key={step.stepNo}
                  title={'Phase ' + (step.stepNo + 1)}
                  description={step.name}
                />
              );
            })}
          </Steps>
        </div>
      </div>
    </Spin>
  );
}

export default ChangeState;
