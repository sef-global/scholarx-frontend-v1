export interface Profile {
  id: number;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  imgUrl: string;
  headline: string;
  type: string;
  programs: Program[];
}

export interface Program {
  id: number;
  title: string;
  headline: string;
  imageUrl: string;
  landingPageUrl: string;
  state: string;
}
