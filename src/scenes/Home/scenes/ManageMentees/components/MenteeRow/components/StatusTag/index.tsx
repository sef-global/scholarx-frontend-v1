import { Tag } from 'antd';
import React from 'react';

function StatusTag(props: { state: string }) {
  switch (props.state) {
    case 'PENDING':
      return <Tag color="blue">PENDING</Tag>;
    case 'APPROVED':
      return <Tag color="green">APPROVED</Tag>;
    case 'REJECTED':
      return <Tag color="orange">REJECTED</Tag>;
    default:
      return null;
  }
}

export default StatusTag;
