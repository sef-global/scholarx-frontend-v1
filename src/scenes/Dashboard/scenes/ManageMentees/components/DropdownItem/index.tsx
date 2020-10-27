import React from 'react';
import { notification, Dropdown, Menu, Modal } from 'antd';
import { DownOutlined, WarningOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';

const { confirm } = Modal;

function DropdownItem(props) {
  function confirmDelete() {
    confirm({
      title: 'Do you want to delete this mentee?',
      icon: <WarningOutlined />,
      content: 'This action is not reversible. Please confirm below.',
      onOk() {
        axios
          .delete(`http://localhost:8080/api/scholarx/mentees/${props.id}`)
          .then((result: AxiosResponse) => {
            if (result.status == 200) {
              notification.success({
                message: 'Success!',
                description: 'Successfully deleted the mentee',
              });
            } else {
              notification.warning({
                message: 'Warning!',
                description: 'Something went wrong when deleting the mentee',
              });
              throw new Error();
            }
          })
          .catch(() => {
            notification.warning({
              message: 'Warning!',
              description: 'Something went wrong when deleting the mentee',
            });
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleDropdown = ({ key }) => {
    if (key == 'Approve') {
      // Approval code here
    } else if (key == 'Delete') {
      confirmDelete();
    }
  };

  return (
    <Dropdown
      overlay={
        <Menu onClick={handleDropdown}>
          <Menu.Item key="Approve">Approve</Menu.Item>
          <Menu.Item key="Delete">Delete</Menu.Item>
        </Menu>
      }
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        More <DownOutlined />
      </a>
    </Dropdown>
  );
}

export default DropdownItem;
