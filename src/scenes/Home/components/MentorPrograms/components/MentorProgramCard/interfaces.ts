import { SavedProgram } from '../../../../../../types';

export interface MentorProgramCardProps {
  program: SavedProgram;
  href?: string;
  buttonText?: string;
  isRejected: boolean;
}
