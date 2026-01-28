export declare class HashService {
    private readonly saltRounds;
    hash(value: string): Promise<string>;
    compare({ plainText, hashed, }: {
        plainText: string;
        hashed: string;
    }): Promise<boolean>;
}
