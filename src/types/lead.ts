export interface Lead {
  // ...existing fields...
  fees?: number;
  totalFees?: number;
  feesCollected?: number;
  modifiedAt?: string; // ISO date string for last modification
}