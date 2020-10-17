import React from 'react';
import { Typography, Form, Input } from 'antd';
import styles from './style.css';

const { Title } = Typography;

function FormItemInput(props) {
  const _OnChange = (e) => {
    props.OnChange(e.target.value);
  };
  return (
    <Form.Item name={props.name} label={props.label}>
      <Input value={props.value} onChange={_OnChange} />
    </Form.Item>
  );
}

export default FormItemInput;
