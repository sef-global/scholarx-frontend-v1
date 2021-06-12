import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Spin, Switch, notification } from 'antd';
import AddQuestions from './components/AddQuestions';
import EditQuestions from './components/EditQuestions';
import styles from '../styles.css';
import axios from 'axios';
import { API_URL } from '../../../../constants';
import { useParams } from 'react-router';

const { Title } = Typography;

function MentorQuestions() {
  const { programId } = useParams();
  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProgramStateValid, setIsProgramStateValid] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getProgramState();
  }, []);

  const getProgramState = () => {
    axios({
      method: 'get',
      url: `${API_URL}/programs/${programId}`,
      withCredentials: true,
    })
      .then((result) => {
        if (result.status == 200) {
          setIsProgramStateValid(result.data.state === 'CREATED');
          setIsLoading(false);
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
  };

  const onSwitch = (checked: boolean) => {
    setIsEditOn(checked);
  };

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Row>
        <Col span={23}>
          <Row>
            <Col span={20}>
              <Title>Mentor Questions</Title>
            </Col>
            {isProgramStateValid && (
              <Col offset={2} span={2} className={styles.switchWrapper}>
                <Switch
                  className={styles.switch}
                  checkedChildren="Edit"
                  unCheckedChildren="Add"
                  onChange={onSwitch}
                />
              </Col>
            )}
          </Row>
          <div className={styles.marginTop}>
            {isEditOn ? (
              <EditQuestions />
            ) : (
              <AddQuestions isProgramStateValid={isProgramStateValid} />
            )}
          </div>
        </Col>
      </Row>
    </Spin>
  );
}

export default MentorQuestions;
