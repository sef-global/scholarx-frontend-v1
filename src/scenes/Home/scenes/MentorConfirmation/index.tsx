import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  List,
  notification,
  Spin,
  Row,
  Col,
  Modal,
  Avatar,
  Button,
  Result,
  Radio,
} from 'antd';
import { Mentor, Profile } from '../../../../interfaces';
import { useHistory, useParams } from 'react-router';
import axios, { AxiosResponse } from 'axios';
import mainStyles from '../../styles.css';
import styles from './styles.css';
import {
  SmileOutlined,
  WarningOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import NavigationBar from '../../components/NavigationBar';
import { API_URL } from '../../../../constants';
import { UserContext } from '../../../../index';
import LogInModal from '../../../../components /LogInModal';

const { Title, Paragraph } = Typography;

function MentorConfirmation() {
  const { programId } = useParams();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUserApplied, setHasUserApplied] = useState<boolean>(false);
  const [selectedMentor, setSelectedMentor] = useState<number>(0);
  const user: Partial<Profile | null> = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    getAppliedMentors();
  }, []);

  // Gets the applied mentors of the user to check whether to check user hasn't selected or hasn't applied
  const getAppliedMentors = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/programs/${programId}/mentee/mentors`, {
        withCredentials: true,
      })
      .then((result: AxiosResponse<Mentor[]>) => {
        setIsLoading(false);
        if (result.status == 200) {
          getApprovedMentors();
        } else if (result.status == 204) {
          setHasUserApplied(false);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching the mentors',
        });
      });
  };

  // Gets the mentors that approved the user as a mentee
  const getApprovedMentors = () => {
    setIsLoading(true);
    axios
      .get(
        `${API_URL}/programs/${programId}/mentee/mentors?menteeStates=APPROVED`,
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse<Mentor[]>) => {
        setIsLoading(false);
        if (result.status == 200) {
          setMentors(result.data);
        } else if (result.status == 204) {
          setHasUserApplied(true);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when fetching the mentors',
        });
      });
  };

  const approveMentor = (mentorId: number) => {
    setIsLoading(true);
    axios
      .put(
        `${API_URL}/me/mentor/${mentorId}/confirmation`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((result: AxiosResponse<Mentor>) => {
        setIsLoading(false);
        if (result.status == 200) {
          getApprovedMentors();
          notification.success({
            message: 'Success!',
            description: 'Successfully confirmed the mentor',
          });
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Error!',
          description: 'Something went wrong when confirming the mentor',
        });
      });
  };

  const confirmApproval = () => {
    Modal.confirm({
      title: 'Do you want to approve this mentor as your mentor?',
      icon: <WarningOutlined />,
      content: "Please confirm below, This action can't be changed later.",
      onOk() {
        approveMentor(selectedMentor);
      },
    });
  };

  const handleMentorIdChange = (event: any) => {
    setSelectedMentor(event.target.value);
  };

  return (
    <>
      <LogInModal isModalVisible={user === null} onCancel={null} />
      <NavigationBar />
      <div className={mainStyles.container}>
        <Row>
          <Col md={3} />
          <Col md={21}>
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => {
                history.goBack();
              }}
            />
          </Col>
        </Row>
        <Spin tip="Loading..." spinning={isLoading}>
          <Row hidden={mentors.length == 0}>
            <Col md={3} />
            <Col md={21}>
              {/* Checks whether user has more than one mentor if it's yes that means the UI has to
              be changed to the selection UI*/}
              {mentors.length != 1 ? (
                <>
                  <Title>Approve a Mentor</Title>
                  <Paragraph>
                    You have been chosen by multiple mentors. Please select on
                    of them as your mentor for the program
                  </Paragraph>
                </>
              ) : (
                <>
                  <Title>My Mentor</Title>
                  <Paragraph>Your mentor for the program</Paragraph>
                </>
              )}
              <Radio.Group
                name="selectedMentor"
                onChange={handleMentorIdChange}
                className={styles.mentorMeta}
              >
                <List
                  itemLayout="horizontal"
                  size="large"
                  dataSource={mentors}
                  renderItem={(mentor: Mentor) => (
                    <List.Item key={mentor.id}>
                      <List.Item.Meta
                        avatar={<Avatar src={mentor.profile.imageUrl} />}
                        title={
                          <div>
                            <a
                              href={mentor.profile.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {mentor.profile.firstName}{' '}
                              {mentor.profile.lastName}
                            </a>
                          </div>
                        }
                        description={mentor.profile.headline}
                      />
                      <div hidden={mentors.length == 1}>
                        <Radio
                          className={styles.radioStyle}
                          value={mentor.id}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Radio.Group>
            </Col>
          </Row>
          <Row hidden={mentors.length <= 1}>
            <Col md={3} />
            <Col>
              <Button
                type="primary"
                className={mainStyles.backButton}
                disabled={selectedMentor == 0}
                onClick={confirmApproval}
              >
                Confirm
              </Button>
            </Col>
          </Row>
          {/* If there's no mentors in the array that means the user hasn't got selected or hasn't applied*/}
          {mentors.length == 0 && (
            <Result
              icon={<SmileOutlined />}
              title={
                hasUserApplied
                  ? 'Unfortunately, you were not selected as a mentee for this program'
                  : "You haven't applied for this program as a mentee"
              }
              extra={
                <Button href={'/home'} type="primary">
                  View available Programs
                </Button>
              }
            />
          )}
        </Spin>
      </div>
    </>
  );
}
export default MentorConfirmation;
