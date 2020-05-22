export declare const BIG_ENDIAN = "big";
export declare const LITTLE_ENDIAN = "little";
export declare const intToBuffer: (value: string | number, byteLength: number, endianness?: string) => Buffer;
export declare const bufferToIntAsString: (buffer: Buffer) => string;
export declare const bigNumberToBuffer: (bignumber: string, size: number, endian?: string) => Buffer;
export declare const bufferToBigNumberString: (bigNumberBuffer: Buffer) => string;
export declare const bufferToHex: (buffer: Buffer) => string;
export declare const hexToBuffer: (hex: string, argumentName?: string) => Buffer;
