export interface Profile {
  id: number;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  headline: string;
  linkedinUrl: string;
  type: string;
  name: string;
  attributes: string;
  authorities: [
    {
      authority: string,
    }
  ];
}

export interface SavedProgram extends UnsavedProgram {
  id: number;
  state: string;
  imageUrl: string;
}

export interface UnsavedProgram {
  title: string;
  headline: string;
  imageUrl: string;
  landingPageUrl: string;
}

export interface Mentor {
  id: number;
  profile: Profile;
  state: string;
  program: SavedProgram;
  application: string;
}

export interface Mentee {
  id: number;
  profile: Profile;
  state: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REMOVED';
  submissionUrl: string;
  mentor: Mentor;
}

export interface Application {
  response: string;
  question: {
    id: number,
  };
}

export interface Question {
  id: number;
  question: string;
  category: string;
}

export interface MentorQuestion extends Question {
  program: SavedProgram;
}

export interface QuestionResponse {
  id: {
    questionId: number,
    mentorId: number,
  };
  question: MentorQuestion;
  mentor: Mentor;
  response: string;
}

export interface UpdateQuestion {
  id: {
    questionId: number,
    mentorId: number,
  };
  response: string;
}

export interface ApplicationFormData {
  key: number;
  value: string;
}

export interface MentorResponse {
  id: {
    questionId: number,
    mentorId: number,
  };
  question: Question;
  mentor: Mentor;
  response: string;
}
