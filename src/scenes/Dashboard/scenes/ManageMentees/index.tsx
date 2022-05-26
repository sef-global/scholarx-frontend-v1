import React, { useEffect, useRef, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import {
  Typography,
  notification,
  Spin,
  Table,
  Button,
  Drawer,
  Select,
  Row,
  Col,
  Input,
  Space } from 'antd';
import type { InputRef } from 'antd';
import { ColumnFilterItem } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/lib/table';
import type { FilterConfirmProps } from 'antd/lib/table/interface';
import axios, { AxiosResponse } from 'axios';
import Highlighter from 'react-highlight-words';
import { useParams } from 'react-router';

import { API_URL } from '../../../../constants';
import { Mentee, Mentor, SavedProgram } from '../../../../types';
import MentorList from '../../components/MentorList';
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
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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
          setIsLoading(false);
          setProgram(result.data);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
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
          const sortedMentees: Mentee[] = result.data.sort((a, b) =>
            a.profile.firstName.localeCompare(b.profile.firstName)
          );
          setMentees(sortedMentees);
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
      .get(`${API_URL}/admin/programs/${programId}/mentors?states=APPROVED`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor[]>) => {
        if (result.status == 200 || result.status == 204) {
          setIsLoading(false);
          result.data.sort(function (a, b) {
            return a.profile.name.localeCompare(b.profile.name);
          });
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
          getMentorList();
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

  function changeMenteeAssignedMentor(mentorId: number, menteeId: number) {
    let currentMentorId;
    mentees.map((mentee: Mentee) => {
      if (mentee.id == menteeId) {
        currentMentorId = mentee.assignedMentor?.id;
      }
    });
    if (mentorId == currentMentorId) {
      return;
    }
    const payload = { mentorId: mentorId };
    axios
      .put(`${API_URL}/admin/mentees/${menteeId}/assign`, payload, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentee>) => {
        if (result.status == 200) {
          getMenteeList();
          getMentorList();
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

  // eslint-disable-next-line prettier/prettier
  type DataIndex = keyof Mentee;

  const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Mentee> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                  setSearchText((selectedKeys as string[])[0]);
                  setSearchedColumn(dataIndex);
                }}
            >
              Filter
            </Button>
          </Space>
        </div>
    ),
    filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
        searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
  });

  return (
    <div className={styles.container}>
      <Row>
        <Col md={18}>
          <Title>Manage Mentees</Title>
          <Spin tip="Loading..." spinning={isLoading}>
            <Table dataSource={mentees} rowKey={'id'}>
              <Column
                title="Mentee"
                dataIndex={''}
                {...getColumnSearchProps('Mentee FirstName' as 'id' | 'profile' | 'state' | 'submissionUrl' | 'appliedMentor' | 'assignedMentor' | 'rejectedBy' | 'reasonForChoice' | 'intent' | 'course' | 'year' | 'university' | 'resumeUrl' | 'achievements')}
                render={(mentee: Mentee) => (
                  <Button
                    type={'link'}
                    onClick={() => {
                      showSelectedApplication(mentee);
                    }}
                  >
                    {mentee.profile.firstName} {mentee.profile.lastName}
                  </Button>
                )}
              />
              <Column
                title="Primary Mentor"
                dataIndex={'appliedMentor'}
                filters={mentors.map((mentor: Mentor) => {
                  const mentorFilter: ColumnFilterItem = {
                    text: `${mentor.profile.firstName} ${mentor.profile.lastName}`,
                    value: mentor.id,
                  };
                  return mentorFilter;
                })}
                onFilter={(value: number, record: Mentee) =>
                  record.appliedMentor.id === value
                }
                render={(mentor: Mentor) =>
                  `${mentor.profile.firstName} ${mentor.profile.lastName}`
                }
              />
              <Column
                title="Assigned To"
                dataIndex={''}
                filters={mentors.map((mentor: Mentor) => {
                  const mentorFilter: ColumnFilterItem = {
                    text: `${mentor.profile.firstName} ${mentor.profile.lastName}`,
                    value: mentor.id,
                  };
                  return mentorFilter;
                })}
                onFilter={(value: number, record: Mentee) =>
                  record.assignedMentor?.id === value
                }
                render={(mentee: Mentee) => {
                  return (
                    <Select
                      showSearch
                      style={{ width: 250 }}
                      placeholder="Select a Mentor"
                      optionFilterProp="children"
                      value={mentee.assignedMentor?.id}
                      onSelect={(mentorId: number) => {
                        changeMenteeAssignedMentor(mentorId, mentee.id);
                      }}
                      disabled={
                        program.state == 'WILDCARD' &&
                        mentee.state == 'APPROVED'
                      }
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {mentors?.map((mentor) => {
                        return (
                          <Option
                            key={mentor.id}
                            value={mentor.id}
                            disabled={
                              program.state != 'ADMIN_MENTEE_FILTRATION' &&
                              program.state != 'WILDCARD'
                            }
                          >
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
                    {
                      text: 'FAILED FROM WILDCARD',
                      value: 'FAILED_FROM_WILDCARD',
                    },
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
                        disabled={
                          program.state == 'WILDCARD' &&
                          mentee.state == 'APPROVED'
                        }
                      >
                        <Option
                          value="PENDING"
                          disabled={program.state !== 'ADMIN_MENTEE_FILTRATION'}
                        >
                          PENDING
                        </Option>
                        <Option value="ASSIGNED" disabled>
                          ASSIGNED
                        </Option>
                        <Option
                          value="POOL"
                          disabled={program.state !== 'ADMIN_MENTEE_FILTRATION'}
                        >
                          POOL
                        </Option>
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
                  filters={[
                    { text: 'PENDING', value: 'PENDING' },
                    { text: 'ASSIGNED', value: 'ASSIGNED' },
                    { text: 'POOL', value: 'POOL' },
                    { text: 'DISCARDED', value: 'DISCARDED' },
                    { text: 'APPROVED', value: 'APPROVED' },
                    { text: 'REJECTED', value: 'REJECTED' },
                    {
                      text: 'FAILED FROM WILDCARD',
                      value: 'FAILED_FROM_WILDCARD',
                    },
                  ]}
                  onFilter={(value: string, record: Mentee) =>
                    record.state.indexOf(value) === 0
                  }
                  render={(status: string) => {
                    return status;
                  }}
                />
              )}
              {(program?.state === 'WILDCARD' ||
                program?.state === 'ONGOING') && (
                <Column
                  title="Rejected By"
                  dataIndex={'rejectedBy'}
                  render={(rejectedBy: Mentor) => {
                    if (rejectedBy != null) {
                      return (
                        rejectedBy?.profile.firstName +
                        ' ' +
                        rejectedBy?.profile.lastName
                      );
                    }
                    return '';
                  }}
                />
              )}
            </Table>
          </Spin>
        </Col>
        <Col md={6}>
          <MentorList mentors={mentors} />
        </Col>
      </Row>
      <Drawer
        title={<Title level={4}>Mentee Application</Title>}
        width={640}
        placement="left"
        onClose={onClose}
        visible={isDrawerVisible}
      >
        <MenteeApplication mentee={selectedMentee} />
      </Drawer>
    </div>
  );
}

export default ManageMentees;
