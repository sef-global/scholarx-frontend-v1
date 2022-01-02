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
  bio: string;
  category: string;
  expertise: string;
  institution: string;
  position: string;
  slots: number;
  noOfAssignedMentees: number;
}

export interface Mentee {
  id: number;
  profile: Profile;
  state:
    | 'PENDING'
    | 'POOL'
    | 'DISCARDED'
    | 'FAILED_FROM_WILDCARD'
    | 'APPROVED'
    | 'REJECTED'
    | 'ASSIGNED';
  submissionUrl: string;
  appliedMentor: Mentor;
  assignedMentor: Mentor;
  rejectedBy: Mentor;
  reasonForChoice: string;
  intent: string;
  course: string;
  year: string;
  university: string;
}
