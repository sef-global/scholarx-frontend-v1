import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const result = (props) => {
  const { programId } = props;
  const history = useHistory();
  return (
    <>
      <Result
        status="success"
        title="Successfully Applied!"
        extra={[
          <Button
            type="primary"
            key="home"
            onClick={() => history.push('/home')}
          >
            Go Home
          </Button>,
          <Button
            key="edit"
            onClick={() => history.push(`/program/${programId}/mentor/edit`)}
          >
            Edit Application
          </Button>,
        ]}
      />
    </>
  );
};
export default result;
