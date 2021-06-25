import React from 'react';

import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { ResultScreenProps } from './interfaces';

const result = ({ programId, type }: ResultScreenProps) => {
  const history = useHistory();
  return (
    <Result
      status="success"
      title={`Successfully ${type === 'edit' ? 'Edited' : 'Applied'}`}
      extra={[
        <Button type="primary" key="home" onClick={() => history.push('/home')}>
          Go Home
        </Button>,
        <>
          {type === 'apply' ? (
            <Button
              key="apply"
              onClick={() => history.push(`/program/${programId}/mentor/edit`)}
            >
              Edit Application
            </Button>
          ) : (
            <></>
          )}
        </>,
      ]}
    />
  );
};
export default result;
