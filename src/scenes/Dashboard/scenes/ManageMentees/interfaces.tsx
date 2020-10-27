import { Profile } from '../../../../interfaces';

export interface Mentee {
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
