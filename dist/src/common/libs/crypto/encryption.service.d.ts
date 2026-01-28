export declare class EncryptionService {
    private readonly algorithm;
    private readonly key;
    private readonly ivLength;
    encrypt(text: string): string;
    decrypt(encryptedText: string): string;
}
