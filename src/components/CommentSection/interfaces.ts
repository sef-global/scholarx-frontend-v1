import { Profile, Mentee } from '../../types';

export interface Comment {
  id: number;
  comment: string;
  // eslint-disable-next-line camelcase
  commented_by: Profile;
  mentee: Mentee;
  createdAt: Date;
  updatedAt: Date;
}
