import React from 'react';

import { Avatar, Badge, Card, Typography } from 'antd';

import { Mentor } from '../../types';

const { Meta } = Card;
const { Text, Link } = Typography;

function MentorProfileCard({ mentor }: { mentor: Mentor }) {
  return (
    <Badge.Ribbon text={mentor.category.replace('_', ' ').toLowerCase()}>
      {/* TODO: Amend the backend object to send available slot details*/}
      <Card
        actions={[
          <Text key={mentor.id}>2/{mentor.slots} Slots</Text>,
          <Text key={mentor.id}>{mentor.expertise}</Text>,
        ]}
      >
        <Meta
          title={
            <Link href={mentor.profile.linkedinUrl} target={'_blank'}>
              {mentor.profile.firstName} {mentor.profile.lastName}
            </Link>
          }
          avatar={<Avatar size={48} src={mentor.profile.imageUrl} />}
          description={
            <div>
              <Text>
                {mentor.position} {mentor.institution}
              </Text>
              <br />
              <p>{mentor.bio}</p>
            </div>
          }
        />
      </Card>
    </Badge.Ribbon>
  );
}

export default MentorProfileCard;
