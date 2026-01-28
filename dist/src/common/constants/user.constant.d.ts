export declare const GENDER: {
    MALE: string;
    FEMALE: string;
    OTHER: string;
};
export type TGender = (typeof GENDER)[keyof typeof GENDER];
