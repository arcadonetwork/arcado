import { P2PPeerInfo } from './p2p_types';
export declare enum NETWORK {
    NET_IPV4 = 0,
    NET_PRIVATE = 1,
    NET_LOCAL = 2,
    NET_OTHER = 3
}
export declare enum PEER_TYPE {
    NEW_PEER = "newPeer",
    TRIED_PEER = "triedPeer"
}
export declare const getIPGroup: (address: string, groupNumber: number) => number;
interface AddressBytes {
    readonly aBytes: Buffer;
    readonly bBytes: Buffer;
    readonly cBytes: Buffer;
    readonly dBytes: Buffer;
}
export declare const getIPBytes: (address: string) => AddressBytes;
export declare const isPrivate: (address: string) => boolean;
export declare const isLocal: (address: string) => boolean;
export declare const getNetwork: (address: string) => NETWORK;
export declare const getNetgroup: (address: string, secret: number) => number;
export declare const getBucket: (options: {
    readonly secret: number;
    readonly peerType: PEER_TYPE;
    readonly targetAddress: string;
}) => number;
export declare const constructPeerIdFromPeerInfo: (peerInfo: P2PPeerInfo) => string;
export {};
