import React, { useContext, useEffect, useState } from 'react';

import { Form, Button, Input, Select, notification, Spin } from 'antd';
import { useHistory, useParams } from 'react-router';

import LogInModal from '../../../../../../components/LogInModal';
import MentorProfileCard from '../../../../../../components/MentorProfileCard';
import { UserContext } from '../../../../../../index';
import { Mentee, Mentor, Profile } from '../../../../../../types';
import {
  applyAsMentee,
  getMenteeApplication,
  updateMenteeApplication,
} from '../../../../../../util/mentee-services';
import { getApprovedMentors } from '../../../../../../util/mentor-services';
import { getProgramDetails } from '../../../../../../util/program-services';
import styles from './styles.css';

function MenteeApplication({ location }) {
  const { programId } = useParams<{ programId: string }>();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentor, setMentor] = useState<Mentor>(location.state);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    getMentors();
    getMentee();
    getProgram();
  }, []);

  const getProgram = async () => {
    setIsLoading(true);
    const program = await getProgramDetails(programId);
    if (program && program.state !== 'MENTEE_APPLICATION') {
      history.push('/');
      history.go(0);
    }
    setIsLoading(false);
  };

  const getMentors = async () => {
    setIsLoading(true);
    const response = await getApprovedMentors(programId);
    if (response.status === 200) {
      setMentors(response.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      notification.error({
        message: 'Something went wrong',
        description: 'Something went wrong when fetching the mentors',
      });
    }
  };

  const getMentee = async () => {
    const mentee = await getMenteeApplication(programId);
    if (mentee) {
      form.setFieldsValue({
        appliedMentor: mentee.appliedMentor.id,
        university: mentee.university,
        course: mentee.course,
        year: mentee.year,
        intent: mentee.intent,
        reasonForChoice: mentee.reasonForChoice,
        resumeUrl: mentee.resumeUrl,
        achievements: mentee.achievements,
      });
      if (location.state) {
        form.setFieldsValue({
          appliedMentor: location.state.id,
        });
        setMentor(location.state);
      } else {
        setMentor(mentee.appliedMentor);
      }

      setIsApplied(true);
    }
    setIsLoading(false);
  };

  const requestMentor = async (values: any) => {
    const mentor: Mentor = {
      id: values.appliedMentor,
    };
    const mentee: Mentee = {
      appliedMentor: mentor,
      university: values.university,
      course: values.course,
      year: values.year,
      intent: values.intent,
      reasonForChoice: values.reasonForChoice,
      resumeUrl: values.resumeUrl,
      achievements: values.achievements,
    };
    if (isApplied) {
      const response = await updateMenteeApplication(programId, mentee);
      setIsLoading(true);
      if (response.status === 200) {
        setIsLoading(false);
        history.push(`/program/${programId}`);
        history.go(0);
      } else {
        setIsLoading(false);
        notification.error({
          message: 'Something went wrong',
          description:
            'Something went wrong when updating the mentee application',
        });
      }
    } else {
      const response = await applyAsMentee(values.appliedMentor, mentee);
      setIsLoading(true);
      if (response.status === 201) {
        setIsLoading(false);
        history.push(`/program/${programId}`);
        history.go(0);
      } else {
        setIsLoading(false);
        notification.error({
          message: 'Something went wrong',
          description: 'Something went wrong when applying as a mentee',
        });
      }
    }
  };

  const handleModalCancel = () => {
    history.push(`/program/${programId}`);
  };

  const handleMentorChange = (mentorId: number) => {
    setMentor(mentors.find((mentor: Mentor) => mentor.id === mentorId));
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={handleModalCancel} />
      <div className={styles.contentMargin}>
        <Spin tip="Loading..." spinning={isLoading}>
          <Form
            onFinish={requestMentor}
            form={form}
            layout="vertical"
            size="middle"
            initialValues={{ appliedMentor: mentor?.id }}
          >
            <Form.Item
              label="Primary Mentor"
              name="appliedMentor"
              rules={[
                {
                  required: !mentor,
                  message: 'Required',
                },
              ]}
            >
              <Select
                defaultValue={mentor?.id}
                options={mentors.map((mentor: Mentor) => ({
                  value: mentor.id,
                  label:
                    mentor.profile.firstName + ' ' + mentor.profile.lastName,
                }))}
                onChange={handleMentorChange}
              />
            </Form.Item>
            {mentor && <MentorProfileCard mentor={mentor} />}
            <br />
            <Form.Item
              label="University"
              name="university"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Course/Major"
              name="course"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Year of study"
              name="year"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Future Ambitions and Intentions (Minimum 1500 characters)"
              name="intent"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input.TextArea minLength={1500} showCount />
            </Form.Item>
            <Form.Item
              label="Reason for choosing this mentor (Minimum 1500 characters)"
              name="reasonForChoice"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input.TextArea minLength={1500} showCount />
            </Form.Item>
            <Form.Item
              label="Summary of your achievements"
              name="achievements"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Resume URL (Drive link or a personal website link)"
              name="resumeUrl"
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className={styles.button}
              >
                {!isApplied ? 'Apply' : 'Update'}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </>
  );
}

export default MenteeApplication;
