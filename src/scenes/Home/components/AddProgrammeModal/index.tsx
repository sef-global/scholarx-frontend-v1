import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { Modal, Form, Input } from 'antd';
import FormItemInput from './components/FormItemInput';
import FormItemTextArea from './components/FormItemTextArea';
import styles from './style.css';

const { Title } = Typography;

function AddProgrammeModal(props) {
  const [name, setName] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [landingURL, setLandingURL] = useState('');
  const [description, setDescription] = useState('');

  const AddProgramme = () => {
    // Add programme logic here. Everything saved in state, just call it
    // console.log(name);
    // console.log(imgURL);
    // console.log(landingURL);
    // console.log(description);
  };
  return (
    <>
      <Modal
        title="Add Programme"
        visible={props.visible}
        onOk={AddProgramme}
        onCancel={props.hideModal}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical" size="large">
          <FormItemInput name="name" label="Name" OnChange={setName} />
          <FormItemInput name="imgURL" label="Image URL" OnChange={setImgURL} />
          <FormItemInput
            name="landingURL"
            label="Landing Page URL"
            OnChange={setLandingURL}
          />
          <FormItemTextArea
            name="description"
            label="Description"
            OnChange={setDescription}
          />
        </Form>
      </Modal>
    </>
  );
}

export default AddProgrammeModal;
