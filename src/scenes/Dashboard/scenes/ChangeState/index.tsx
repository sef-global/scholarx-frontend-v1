import React, { useState } from 'react';
import {
  Col,
  Row,
  Typography,
  Card,
  Steps,
  Button,
  Progress,
  Modal,
} from 'antd';
import { State } from './interfaces';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './styles.css';

const { Title, Text } = Typography;
const { Step } = Steps;
const programStates: State[] = [
  {
    stepNo: 0,
    name: 'Created',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet urna id diam suscipit ultricies eget in lorem.',
  },
  {
    stepNo: 1,
    name: 'Mentor Applicaiton Period',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet urna id diam suscipit ultricies eget in lorem. ',
  },
  {
    stepNo: 2,
    name: 'Mentor Approval Period',
    description:
      'Some descriptive text about this particular state of the program',
  },
  {
    stepNo: 3,
    name: 'Mentee Applicaiton Period',
    description:
      'Some descriptive text about this particular state of the program. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet urna id diam suscipit ultricies eget in lorem. Nulla at lorem a eros mattis iaculis et in dolor.',
  },
  {
    stepNo: 4,
    name: 'Mentee Approval Period',
    description:
      'Some descriptive text about this particular state of the program',
  },
  {
    stepNo: 5,
    name: 'Ongoing',
    description:
      'Some descriptive text about this particular state of the program',
  },
];

function ChangeState() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const handleStepChange = () => {
    setCurrentStep(currentStep + 1);
  };
  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      title: 'Warning! This action is irreversible. Do you wish to proceed?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <p>
          Changing state of the <b>ScholarX Jr 2020</b> from
          <b> {programStates[currentStep].name}</b> to{' '}
          <b>{programStates[currentStep + 1].name}</b>.
        </p>
      ),
      onOk() {
        handleStepChange();
      },
    });
  };
  return (
    <div className={styles.contentWrapper}>
      <Title>Change State</Title>
      <Row justify="center">
        <Col md={20}>
          <Card className={styles.cardWrapper}>
            {/* TODO: get the program id from the url param and the name of that program as the title */}
            <Title level={3}>ScholarX Jr. 2020</Title>
            <Progress
              className={styles.progress}
              type="circle"
              percent={Math.round((currentStep * 100) / programStates.length)}
            />
            <p>
              <Text type="warning">Current State: </Text>{' '}
              {programStates[currentStep].name}
            </p>
            <p>{programStates[currentStep].description}</p>
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
  );
}

export default ChangeState;
