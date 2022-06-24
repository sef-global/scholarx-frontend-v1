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
    | 'ADMIN_MENTEE_FILTRATION'
    | 'MENTEE_SELECTION'
    | 'WILDCARD'
    | 'ONGOING'
    | 'COMPLETED';
}
