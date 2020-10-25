export interface Mentor {
  id: number;
  profile: {
    firstName: string,
    lastName: string,
    imageUrl: string,
    linkedinUrl: string,
    headline: string,
  };
  state: string;
}
