import React from 'react';

import { Avatar, Badge, Card, Divider, Tooltip, Typography } from 'antd';

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
      <Badge.Ribbon
        text={mentee.assignedMentor.category.replace('_', ' ').toLowerCase()}
      >
        <Card>
          <Meta
            title={
              mentee?.appliedMentor.profile.firstName +
              ' ' +
              mentee?.appliedMentor.profile.lastName
            }
            avatar={
              <Avatar
                size={'large'}
                src={mentee?.appliedMentor.profile.imageUrl}
              />
            }
            description={
              <>
                {/* TODO: Amend the backend object to send available slot details*/}
                <Text type={'secondary'}>
                  {mentee.appliedMentor.position}{' '}
                  {mentee.appliedMentor.institution}
                </Text>
                <br />
                <Text>2/{mentee?.appliedMentor.slots} Slots Available</Text>
              </>
            }
          />
        </Card>
      </Badge.Ribbon>
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
        <Badge.Ribbon
          text={mentee.assignedMentor.category.replace('_', ' ').toLowerCase()}
        >
          <Card>
            <Meta
              title={
                mentee?.assignedMentor.profile.firstName +
                ' ' +
                mentee?.assignedMentor.profile.lastName
              }
              avatar={<Avatar src={mentee?.assignedMentor.profile.imageUrl} />}
              description={
                <>
                  <Text type={'secondary'}>
                    {mentee.assignedMentor.position}{' '}
                    {mentee.assignedMentor.institution}
                  </Text>
                  <br />
                  <Text>2/{mentee?.assignedMentor.slots} Slots Available</Text>
                </>
              }
            />
          </Card>
        </Badge.Ribbon>
      )}
    </>
  );
}

export default MenteeApplication;
