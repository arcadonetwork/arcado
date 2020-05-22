import { TransactionJSON } from '../transaction_types';
export declare const prepareTransaction: (partialTransaction: Partial<TransactionJSON>, passphrase?: string | undefined, secondPassphrase?: string | undefined, timeOffset?: number | undefined) => TransactionJSON;
