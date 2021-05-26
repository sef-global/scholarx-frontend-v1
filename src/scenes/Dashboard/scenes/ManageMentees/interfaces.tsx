import { Profile } from '../../../../interfaces';

export interface Mentee {
  id: number;
  profile: Profile;
  state: string;
  submissionUrl: string;
}
