export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
};

export type TGender = (typeof GENDER)[keyof typeof GENDER];
