import React, { useState } from 'react';
import { Typography, notification, Switch, Button, Modal } from 'antd';
import { useParams } from 'react-router';
import axios from 'axios';
import { WarningOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { confirm } = Modal;

function RemoveMentor(props) {
    const { programId } = useParams();
    const [mentorState, setMentorState] = useState(String);

    const removeMentee = (id) => {
        confirm({
            title: 'Do you want to remove this mentor?',
            icon: <WarningOutlined />,
            content: 'This action is not reversible. Please confirm below.',
            onOk() {
                axios
                    .put(`http://localhost:8080/api/scholarx/admin/mentors/${props.id}/state`, { enrolmentState: 'REMOVED' })
                    .then((result: any) => {
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
                console.log(`Removed ${props.id}`);
            },
        });
    };

    return (
        <>
            <Button
                key="remove"
                type="primary"
                onClick={() => removeMentee(props.id)}
                danger
            >
                Remove
                </Button>
        </>
    );
}

export default RemoveMentor;
