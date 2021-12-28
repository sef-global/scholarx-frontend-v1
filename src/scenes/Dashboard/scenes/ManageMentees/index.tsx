import React, { useEffect, useState } from 'react';

import {
  Typography,
  notification,
  Spin,
  Table,
  Button,
  Drawer,
  Select,
} from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';

import { API_URL } from '../../../../constants';
import { Mentee, Mentor, Profile, SavedProgram } from '../../../../types';
import styles from '../../styles.css';
import MenteeApplication from './components/MenteeApplication';

const { Title } = Typography;
const { Column } = Table;
const { Option } = Select;

function ManageMentees() {
  const { programId } = useParams();
  const [program, setProgram] = useState<SavedProgram>(null);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [selectedMentee, setSelectedMentee] = useState<Mentee>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getProgram();
    getMenteeList();
    getMentorList();
  }, []);

  function getProgram() {
    axios
      .get(`${API_URL}/programs/${programId}`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<SavedProgram>) => {
        if (result.status == 200) {
          setProgram(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong fetching the program',
        });
      });
  }

  function getMenteeList() {
    axios
      .get(`${API_URL}/admin/programs/${programId}/mentees`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentee[]>) => {
        if (result.status == 200 || result.status == 204) {
          setIsLoading(false);
          setMentees(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the mentees',
        });
      });
  }

  function getMentorList() {
    axios
      .get(`${API_URL}/admin/programs/${programId}/mentors`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200 || result.status == 204) {
          setIsLoading(false);
          setMentors(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.warning({
          message: 'Warning!',
          description: 'Something went wrong when fetching the mentees',
        });
      });
  }

  function changeMenteeState(menteeId: number, state: string) {
    const payload = { state: state };
    axios
      .put(`${API_URL}/admin/mentees/${menteeId}/state`, payload, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentee>) => {
        if (result.status == 200) {
          getMenteeList();
        } else {
          throw new Error();
        }
        console.log(result);
      })
      .catch((reason) => {
        console.log(reason);
        notification.warning({
          message: 'Warning!',
          description: "Couldn't update the mentee state",
        });
      });
  }

  function changeMenteeAssignedMentor(mentorId: number, menteeId: number) {
    const payload = { mentorId: mentorId };
    axios
      .put(`${API_URL}/admin/mentees/${menteeId}/assign`, payload, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentee>) => {
        if (result.status == 200) {
          getMenteeList();
        } else {
          throw new Error();
        }
      })
      .catch((reason) => {
        console.log(reason);
        notification.warning({
          message: 'Warning!',
          description: "Couldn't update the mentee state",
        });
      });
  }

  const showSelectedApplication = (mentee: Mentee) => {
    setSelectedMentee(mentee);
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
  };

  return (
    <div className={styles.container}>
      <Title>Manage Mentees</Title>
      <Spin tip="Loading..." spinning={isLoading}>
        <Table dataSource={mentees} rowKey={'id'}>
          <Column
            title="Mentee"
            dataIndex={'profile'}
            render={(profile: Profile) =>
              `${profile.firstName} ${profile.lastName}`
            }
          />
          <Column
            title="Primary Mentor"
            dataIndex={'appliedMentor'}
            render={(mentor: Mentor) =>
              `${mentor.profile.firstName} ${mentor.profile.lastName}`
            }
          />
          <Column
            title="Assigned To"
            dataIndex={''}
            render={(mentee: Mentee) => {
              return (
                <Select
                  showSearch
                  style={{ width: 250 }}
                  placeholder="Select a Mentor"
                  value={mentee.assignedMentor?.id}
                  onSelect={(mentorId: number) => {
                    changeMenteeAssignedMentor(mentorId, mentee.id);
                  }}
                >
                  {mentors?.map((mentor) => {
                    return (
                      <Option key={mentor.id} value={mentor.id}>
                        {mentor.profile.firstName} {mentor.profile.lastName}
                      </Option>
                    );
                  })}
                </Select>
              );
            }}
          />
          {program?.state === 'ADMIN_MENTEE_FILTRATION' ||
          program?.state === 'WILDCARD' ? (
            <Column
              title="Status"
              dataIndex={''}
              filters={[
                { text: 'PENDING', value: 'PENDING' },
                { text: 'ASSIGNED', value: 'ASSIGNED' },
                { text: 'POOL', value: 'POOL' },
                { text: 'DISCARDED', value: 'DISCARDED' },
                { text: 'APPROVED', value: 'APPROVED' },
                { text: 'REJECTED', value: 'REJECTED' },
                { text: 'FAILED FROM WILDCARD', value: 'FAILED_FROM_WILDCARD' },
              ]}
              onFilter={(value: string, record: Mentee) =>
                record.state.indexOf(value) === 0
              }
              render={(mentee: Mentee) => {
                return (
                  <Select
                    showSearch
                    style={{ width: 150 }}
                    placeholder="Select a state"
                    value={mentee.state}
                    onSelect={(value: string) => {
                      changeMenteeState(mentee.id, value);
                    }}
                  >
                    <Option value="PENDING">PENDING</Option>
                    <Option value="ASSIGNED">ASSIGNED</Option>
                    <Option value="POOL">POOL</Option>
                    <Option
                      value="DISCARDED"
                      disabled={program.state != 'ADMIN_MENTEE_FILTRATION'}
                    >
                      DISCARDED
                    </Option>
                    <Option value="APPROVED" disabled>
                      APPROVED
                    </Option>
                    <Option value="REJECTED" disabled>
                      REJECTED
                    </Option>
                    <Option
                      value="FAILED_FROM_WILDCARD"
                      disabled={program.state !== 'WILDCARD'}
                    >
                      FAILED FROM WILDCARD
                    </Option>
                  </Select>
                );
              }}
            />
          ) : (
            <Column
              title="Status"
              dataIndex={'state'}
              render={(status: string) => {
                return status;
              }}
            />
          )}
          <Column
            title="Application"
            dataIndex={''}
            render={(mentee: Mentee) => (
              <Button
                onClick={() => {
                  showSelectedApplication(mentee);
                }}
                type="link"
              >
                View Application
              </Button>
            )}
          />
        </Table>
        <Drawer
          title={<Title level={4}>Mentee Application</Title>}
          width={500}
          placement="right"
          onClose={onClose}
          visible={isDrawerVisible}
        >
          <MenteeApplication mentee={selectedMentee} />
        </Drawer>
      </Spin>
    </div>
  );
}

export default ManageMentees;
