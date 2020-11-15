import React from 'react';
import { notification, Button, Modal } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { WarningOutlined } from '@ant-design/icons';
import { Mentor } from '../../interfaces';

const { confirm } = Modal;

function RemoveMentor(props: { id: number }) {
  const postRemoveMentor = () => {
    axios
      .put(
        `http://localhost:8080/api/scholarx/admin/mentors/${props.id}/state`,
        {
          enrolmentState: 'REMOVED',
        }
      )
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          notification.success({
            message: 'Updated!',
            description: 'Successfully updated the mentor state',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when updating state',
        });
      });
  };

  const removeMentor = () => {
    confirm({
      title: 'Do you want to remove this mentor?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        postRemoveMentor();
      },
    });
  };

  return (
    <>
      <Button key="remove" type="primary" onClick={() => removeMentor()} danger>
        Remove
      </Button>
    </>
  );
}

export default RemoveMentor;
