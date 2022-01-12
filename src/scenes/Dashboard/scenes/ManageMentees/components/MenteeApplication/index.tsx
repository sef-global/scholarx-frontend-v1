import React, { useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Tooltip, Typography } from 'antd';

import CommentSection from '../../../../../../components/CommentSection';
import MentorProfileCard from '../../../../../../components/MentorProfileCard';
import { Mentee } from '../../../../../../types';

const { Title, Text, Link } = Typography;
const { Meta } = Card;

function MenteeApplication({ mentee }: { mentee: Mentee }) {
  const [
    isAppliedMentorExpanded,
    setIsAppliedMentorExpanded,
  ] = useState<boolean>(false);

  function expandAppliedMentor() {
    setIsAppliedMentorExpanded(true);
  }

  function shrinkAppliedMentor() {
    setIsAppliedMentorExpanded(false);
  }

  return (
    <>
      <Meta
        title={
          <>
            <Tooltip title={'linkedin'}>
              <Link href={mentee?.profile.linkedinUrl} target={'_blank'}>
                {mentee?.profile.firstName + ' ' + mentee?.profile.lastName}
              </Link>
            </Tooltip>
          </>
        }
        description={
          <>
            {' '}
            <Text copyable>{mentee?.profile.email}</Text>
          </>
        }
        avatar={<Avatar size={64} src={mentee?.profile.imageUrl} />}
      />
      <Divider />
      <Text strong>University and Course</Text>
      <br />
      <br />
      <Text>
        {mentee?.year}, {mentee?.course}
      </Text>
      <br />
      <Text>{mentee?.university}</Text>
      <br />
      <br />
      <Text strong>Applied Mentor</Text>
      <br />
      <br />
      {isAppliedMentorExpanded ? (
        <div>
          <Button type={'text'} onClick={shrinkAppliedMentor}>
            <CloseOutlined />
          </Button>
          <MentorProfileCard mentor={mentee?.appliedMentor} />
        </div>
      ) : (
        <Link onClick={expandAppliedMentor}>
          {mentee?.appliedMentor.profile.firstName}{' '}
          {mentee?.appliedMentor.profile.lastName}
        </Link>
      )}
      <br />
      <br />
      <Text strong>Reason for choosing this mentor</Text>
      <br />
      <br />
      <Text>{mentee?.reasonForChoice}</Text>
      <br />
      <br />
      <Text strong>Future ambitions and intentions</Text>
      <br />
      <br />
      <Text>{mentee?.intent}</Text>
      <Divider />
      <Title level={4}>Assigned To</Title>
      {mentee?.assignedMentor == null ? (
        <Card>
          <Text>Not yet assigned to a mentor</Text>
        </Card>
      ) : (
        <MentorProfileCard mentor={mentee?.assignedMentor} />
      )}
      <Divider />
      <Title level={4}>Rejected By</Title>
      {mentee?.rejectedBy == null ? (
        <Card>
          <Text>Not rejected by any mentor</Text>
        </Card>
      ) : (
        <MentorProfileCard mentor={mentee?.rejectedBy} />
      )}
      <Divider />
      <CommentSection mentee={mentee} />
    </>
  );
}

export default MenteeApplication;
