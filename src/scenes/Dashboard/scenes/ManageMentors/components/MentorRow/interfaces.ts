import { Mentor, Question } from '../../../../../../interfaces';

export interface Props {
  mentor: Mentor;
  programState: string;
}

export interface MentorResponse {
  id: ID;
  question: Question;
  mentor: Mentor;
  response: string;
}

export interface ID {
  questionId: number;
  mentorId: number;
}
