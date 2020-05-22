import { EventEmitter } from 'events';
import { P2PDiscoveredPeerInfo, P2PMessagePacket, P2PNodeInfo, P2PPeerInfo, P2PRequestPacket, P2PResponsePacket, ProtocolNodeInfo } from '../p2p_types';
import * as socketClusterClient from 'socketcluster-client';
import { SCServerSocket } from 'socketcluster-server';
export interface ClientOptionsUpdated {
    readonly hostname: string;
    readonly port: number;
    readonly query: string;
    readonly autoConnect: boolean;
    readonly autoReconnect: boolean;
    readonly multiplex: boolean;
    readonly ackTimeout?: number;
    readonly connectTimeout?: number;
    readonly maxPayload?: number;
}
export interface Productivity {
    readonly requestCounter: number;
    readonly responseCounter: number;
    readonly responseRate: number;
    readonly lastResponded: number;
}
export declare type SCServerSocketUpdated = {
    destroy(code?: number, data?: string | object): void;
    on(event: string | unknown, listener: (packet?: unknown) => void): void;
    on(event: string, listener: (packet: any, respond: any) => void): void;
} & SCServerSocket;
declare type SCClientSocket = socketClusterClient.SCClientSocket;
export declare const EVENT_REQUEST_RECEIVED = "requestReceived";
export declare const EVENT_INVALID_REQUEST_RECEIVED = "invalidRequestReceived";
export declare const EVENT_MESSAGE_RECEIVED = "messageReceived";
export declare const EVENT_INVALID_MESSAGE_RECEIVED = "invalidMessageReceived";
export declare const EVENT_BAN_PEER = "banPeer";
export declare const EVENT_DISCOVERED_PEER = "discoveredPeer";
export declare const EVENT_UNBAN_PEER = "unbanPeer";
export declare const EVENT_UPDATED_PEER_INFO = "updatedPeerInfo";
export declare const EVENT_FAILED_PEER_INFO_UPDATE = "failedPeerInfoUpdate";
export declare const EVENT_FAILED_TO_COLLECT_PEER_DETAILS_ON_CONNECT = "failedToCollectPeerDetailsOnConnect";
export declare const EVENT_FAILED_TO_FETCH_PEERS = "failedToFetchPeers";
export declare const EVENT_FAILED_TO_FETCH_PEER_INFO = "failedToFetchPeerInfo";
export declare const EVENT_FAILED_TO_PUSH_NODE_INFO = "failedToPushNodeInfo";
export declare const REMOTE_EVENT_RPC_REQUEST = "rpc-request";
export declare const REMOTE_EVENT_MESSAGE = "remote-message";
export declare const REMOTE_RPC_UPDATE_PEER_INFO = "updateMyself";
export declare const REMOTE_RPC_GET_NODE_INFO = "status";
export declare const REMOTE_RPC_GET_PEERS_LIST = "list";
export declare const DEFAULT_CONNECT_TIMEOUT = 2000;
export declare const DEFAULT_ACK_TIMEOUT = 2000;
export declare const DEFAULT_REPUTATION_SCORE = 100;
export declare const DEFAULT_PRODUCTIVITY_RESET_INTERVAL = 20000;
export declare const DEFAULT_PRODUCTIVITY: {
    requestCounter: number;
    responseCounter: number;
    responseRate: number;
    lastResponded: number;
};
export declare enum ConnectionState {
    CONNECTING = "connecting",
    OPEN = "open",
    CLOSED = "closed"
}
export declare const convertNodeInfoToLegacyFormat: (nodeInfo: P2PNodeInfo) => ProtocolNodeInfo;
export interface PeerConfig {
    readonly connectTimeout?: number;
    readonly ackTimeout?: number;
    readonly rateCalculationInterval: number;
    readonly wsMaxMessageRate: number;
    readonly wsMaxMessageRatePenalty: number;
    readonly wsMaxPayload?: number;
    readonly maxPeerInfoSize: number;
    readonly maxPeerDiscoveryResponseLength: number;
    readonly secret: number;
}
export declare class Peer extends EventEmitter {
    private readonly _id;
    protected readonly _ipAddress: string;
    protected readonly _wsPort: number;
    private readonly _height;
    protected _reputation: number;
    protected _netgroup: number;
    protected _latency: number;
    protected _connectTime: number;
    protected _productivity: {
        requestCounter: number;
        responseCounter: number;
        responseRate: number;
        lastResponded: number;
    };
    private _rpcCounter;
    private _rpcRates;
    private _messageCounter;
    private _messageRates;
    private readonly _counterResetInterval;
    protected _peerInfo: P2PPeerInfo;
    private readonly _productivityResetInterval;
    protected readonly _peerConfig: PeerConfig;
    protected _nodeInfo: P2PNodeInfo | undefined;
    protected _wsMessageCount: number;
    protected _wsMessageRate: number;
    protected _rateInterval: number;
    protected readonly _handleRawRPC: (packet: unknown, respond: (responseError?: Error, responseData?: unknown) => void) => void;
    protected readonly _handleWSMessage: (message: string) => void;
    protected readonly _handleRawMessage: (packet: unknown) => void;
    protected readonly _handleRawLegacyMessagePostBlock: (packet: unknown) => void;
    protected readonly _handleRawLegacyMessagePostTransactions: (packet: unknown) => void;
    protected readonly _handleRawLegacyMessagePostSignatures: (packet: unknown) => void;
    protected _socket: SCServerSocketUpdated | SCClientSocket | undefined;
    constructor(peerInfo: P2PPeerInfo, peerConfig: PeerConfig);
    readonly height: number;
    readonly id: string;
    readonly ipAddress: string;
    readonly reputation: number;
    readonly netgroup: number;
    readonly latency: number;
    readonly connectTime: number;
    readonly responseRate: number;
    readonly productivity: Productivity;
    readonly wsMessageRate: number;
    updatePeerInfo(newPeerInfo: P2PDiscoveredPeerInfo): void;
    readonly peerInfo: P2PPeerInfo;
    applyPenalty(penalty: number): void;
    readonly wsPort: number;
    readonly state: ConnectionState;
    applyNodeInfo(nodeInfo: P2PNodeInfo): Promise<void>;
    readonly nodeInfo: P2PNodeInfo | undefined;
    connect(): void;
    disconnect(code?: number, reason?: string): void;
    send(packet: P2PMessagePacket): void;
    request(packet: P2PRequestPacket): Promise<P2PResponsePacket>;
    fetchPeers(): Promise<ReadonlyArray<P2PPeerInfo>>;
    discoverPeers(): Promise<ReadonlyArray<P2PPeerInfo>>;
    fetchStatus(): Promise<P2PPeerInfo>;
    private _updateFromProtocolPeerInfo;
    private _handleUpdatePeerInfo;
    private _handleGetNodeInfo;
    private _banPeer;
    private _updateRPCCounter;
    private _getRPCRate;
    private _updateMessageCounter;
    private _getMessageRate;
}
export {};
