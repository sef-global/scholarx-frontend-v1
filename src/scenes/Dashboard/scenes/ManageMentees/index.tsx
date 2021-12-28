import React, { useEffect, useState } from 'react';

import { Typography, notification, Spin, Table, Button, Drawer } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';

import { API_URL } from '../../../../constants';
import { Mentee, Mentor, Profile, SavedProgram } from '../../../../types';
import styles from '../../styles.css';
import MenteeApplication from './components/MenteeApplication';

const { Title } = Typography;
const { Column } = Table;

function ManageMentees() {
  const { programId } = useParams();
  const [program, setProgram] = useState<SavedProgram>(null);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [selectedMentee, setSelectedMentee] = useState<Mentee>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getProgram();
    getMenteeList();
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
          console.log('inside else throwing an error...');
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

  const showSelectedApplication = (mentee: Mentee) => {
    console.log(mentee);
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
          {program?.state === 'ADMIN_MENTEE_FILTRATION' && (
            <Column
              title="Status"
              dataIndex={'status'}
              render={() => 'this one thing'}
            />
          )}
          <Column
            title=""
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
