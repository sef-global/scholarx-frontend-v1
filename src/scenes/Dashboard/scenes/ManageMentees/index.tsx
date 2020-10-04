import React from 'react';
import { Typography } from 'antd';
import Index from '../../components/PersonCard';
import styles from './styles.css';

const { Title } = Typography;
const mentees = [
  { name: 'Phil Dunphy' },
  { name: 'Haley Dunphy' },
  { name: 'Luke Dunphy' },
  { name: 'Alex Dunphy' },
  { name: 'Luke Dunphy' },
  { name: 'Alex Dunphy' },
];

function ManageMentees() {
  return (
    <div>
      <Title>Manage Mentees</Title>
      <p className={styles.menteeCards}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor dolorum
        ex, itaque maxime minima perferendis quae sit tempora? Asperiores
        dignissimos distinctio illo laudantium, quasi veniam?
      </p>
      {mentees.map((mentee, index) => (
        <Index key={index} name={mentee.name} />
      ))}
    </div>
  );
}

export default ManageMentees;
