import { SavedProgram } from '../../../../../../interfaces';

export interface MentorProgramCardProps {
  program: SavedProgram;
  href?: string;
  buttonText?: string;
  isRejected: boolean;
}
