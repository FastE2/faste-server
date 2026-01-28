export declare class FlashSaleService {
    constructor();
    validateFlashSaleTime(startAt: Date, endAt: Date): void;
    determineInitialStatus(startAt: Date, endAt: Date): "SCHEDULED" | "LIVE" | "ENDED";
}
