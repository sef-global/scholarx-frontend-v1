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
}

export interface SavedProgram extends UnsavedProgram {
  id: number;
  state: string;
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
  prerequisites: string;
}

export interface Mentee {
  id: number;
  profile: Profile;
  state: string;
  submissionUrl: string;
}

export interface Application {
  application: string;
  prerequisites: string;
}
