import React, { useState } from 'react';
import { Typography, Row, Col, Switch } from 'antd';
import AddQuestions from './components/AddQuestions';
import EditQuestions from './components/EditQuestions';
import styles from './styles.css';

const { Title } = Typography;

function MentorQuestions() {
  const [isEditOn, setIsEditOn] = useState<boolean>(false);

  const onSwitch = (checked: boolean) => {
    setIsEditOn(checked);
  };

  return (
    <Row>
      <Col span={23}>
        <Row>
          <Col span={20}>
            <Title>Mentor Questions</Title>
          </Col>
          <Col offset={2} span={2} className={styles.switchWrapper}>
            <Switch
              className={styles.switch}
              checkedChildren="Edit"
              unCheckedChildren="Add"
              onChange={onSwitch}
            />
          </Col>
        </Row>
        <div className={styles.marginTop}>
          {isEditOn ? <EditQuestions /> : <AddQuestions />}
        </div>
      </Col>
    </Row>
  );
}

export default MentorQuestions;
