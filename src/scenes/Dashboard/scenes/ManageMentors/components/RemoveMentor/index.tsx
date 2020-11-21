import React from 'react';
import { notification, Button, Modal } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { WarningOutlined } from '@ant-design/icons';
import { Mentor } from '../../interfaces';

const { confirm } = Modal;

type Props = { id: number, onChange: () => void };

function RemoveMentor(props: Props) {
  const updateMentorState = () => {
    axios
      .put(`http://localhost:8080/admin/mentors/${props.id}/state`, {
        enrolmentState: 'REMOVED',
      })
      .then((result: AxiosResponse<Mentor>) => {
        if (result.status == 200) {
          notification.success({
            message: 'Updated!',
            description: 'Successfully updated the mentor state',
          });
          props.onChange();
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when updating mentor state',
        });
      });
  };

  const removeMentor = () => {
    confirm({
      title: 'Do you want to remove this mentor?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        updateMentorState();
      },
    });
  };

  return (
    <>
      <Button key="remove" type="primary" onClick={removeMentor} danger>
        Remove
      </Button>
    </>
  );
}

export default RemoveMentor;
