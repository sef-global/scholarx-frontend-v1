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
