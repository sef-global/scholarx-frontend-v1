import React from 'react';
import { notification, Button, Modal } from 'antd';
import { DownOutlined, WarningOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';

const { confirm } = Modal;

function ListAction(props) {
  const confirmRemoveMentee = () => {
    confirm({
      title: 'Do you want to remove this mentee?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        axios
          .delete(`http://localhost:8080/api/scholarx/mentees/${props.id}`)
          .then((result: AxiosResponse) => {
            if (result.status == 200) {
              notification.success({
                message: 'Success!',
                description: 'Successfully removed the mentee',
              });
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            notification.error({
              message: 'Error!',
              description: 'Something went wrong when deleting the mentee',
            });
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <Button key="remove" type="primary" onClick={confirmRemoveMentee} danger>
      Remove
    </Button>
  );
}

export default ListAction;
