import { SavedProgram } from '../../../../../../types';

export interface MentorProgramCardProps {
  program: SavedProgram;
  href?: string;
  buttonText?: string;
  isRejected: boolean;
  state:
    | 'CREATED'
    | 'MENTOR_APPLICATION'
    | 'MENTOR_SELECTION'
    | 'MENTEE_APPLICATION'
    | 'MENTEE_SELECTION'
    | 'MENTOR_CONFIRMATION'
    | 'ONGOING'
    | 'COMPLETED';
}
