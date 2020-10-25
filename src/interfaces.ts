export interface Profile {
  id: number;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  imgUrl: string;
  headline: string;
  type: string;
  programs: SavedProgram[];
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
  profile: {
    id: number,
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
    imageUrl: string,
    linkedinUrl: string,
    headline: string,
    type: string,
  };
  state: string;
  program: SavedProgram;
  application: string;
  prerequisites: string;
}

export interface Application {
  application: string;
  prerequisites: string;
}
