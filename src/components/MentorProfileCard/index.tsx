import React from 'react';

import { Avatar, Badge, Card, Typography } from 'antd';

import { Mentor } from '../../types';
import styles from './styles.css';

const { Meta } = Card;
const { Text, Link } = Typography;

function MentorProfileCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className={styles.mentorProfileCard}>
      <Badge.Ribbon text={mentor.category.replace(/_/g, ' ')}>
        <Card
          actions={[
            <Text
              key={mentor.id}
              type={
                mentor.noOfAssignedMentees > mentor.slots ? 'danger' : 'warning'
              }
            >
              {mentor.noOfAssignedMentees}/{mentor.slots} Slots
            </Text>,
            <Text key={mentor.id}>{mentor.expertise}</Text>,
          ]}
        >
          <Meta
            title={
              <Link href={mentor.profile.linkedinUrl} target={'_blank'}>
                {mentor.name}
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
    </div>
  );
}

export default MentorProfileCard;
