import React from 'react';

import { Avatar, Card, Divider, Tooltip, Typography } from 'antd';

import MentorProfileCard from '../../../../../../components/MentorProfileCard';
import { Mentee } from '../../../../../../types';

const { Title, Text, Link } = Typography;
const { Meta } = Card;

function MenteeApplication({ mentee }: { mentee: Mentee }) {
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
      <Text strong>1. University and Course</Text>
      <br />
      <br />
      <Text>
        {mentee?.year}, {mentee?.course}
      </Text>
      <br />
      <Text>{mentee?.university}</Text>
      <br />
      <br />
      <Text strong>2. Applied Mentor</Text>
      <br />
      <br />
      <MentorProfileCard mentor={mentee?.appliedMentor} />
      <br />
      <br />
      <Text strong>3. Reason for choosing this mentor</Text>
      <br />
      <br />
      <Text>{mentee?.reasonForChoice}</Text>
      <br />
      <br />
      <Text strong>4. Future Ambitions and Intentions</Text>
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
    </>
  );
}

export default MenteeApplication;
