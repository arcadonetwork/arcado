import { EventEmitter } from 'events';
import { SCServerSocket } from 'socketcluster-server';
import { P2PDiscoveredPeerInfo, P2PMessagePacket, P2PNodeInfo, P2PPeerInfo, P2PPeersCount, P2PPeerSelectionForConnectionFunction, P2PPeerSelectionForRequestFunction, P2PPeerSelectionForSendFunction, P2PPenalty, P2PRequestPacket, P2PResponsePacket, PeerLists } from './p2p_types';
import { EVENT_BAN_PEER, EVENT_CLOSE_INBOUND, EVENT_CLOSE_OUTBOUND, EVENT_CONNECT_ABORT_OUTBOUND, EVENT_CONNECT_OUTBOUND, EVENT_DISCOVERED_PEER, EVENT_FAILED_PEER_INFO_UPDATE, EVENT_FAILED_TO_COLLECT_PEER_DETAILS_ON_CONNECT, EVENT_FAILED_TO_FETCH_PEER_INFO, EVENT_FAILED_TO_FETCH_PEERS, EVENT_FAILED_TO_PUSH_NODE_INFO, EVENT_INBOUND_SOCKET_ERROR, EVENT_MESSAGE_RECEIVED, EVENT_OUTBOUND_SOCKET_ERROR, EVENT_REQUEST_RECEIVED, EVENT_UNBAN_PEER, EVENT_UPDATED_PEER_INFO, InboundPeer, OutboundPeer, Peer, PeerConfig } from './peer';
export { EVENT_CLOSE_INBOUND, EVENT_CLOSE_OUTBOUND, EVENT_CONNECT_OUTBOUND, EVENT_CONNECT_ABORT_OUTBOUND, EVENT_REQUEST_RECEIVED, EVENT_MESSAGE_RECEIVED, EVENT_OUTBOUND_SOCKET_ERROR, EVENT_INBOUND_SOCKET_ERROR, EVENT_UPDATED_PEER_INFO, EVENT_FAILED_TO_COLLECT_PEER_DETAILS_ON_CONNECT, EVENT_FAILED_TO_FETCH_PEER_INFO, EVENT_FAILED_TO_FETCH_PEERS, EVENT_BAN_PEER, EVENT_UNBAN_PEER, EVENT_FAILED_PEER_INFO_UPDATE, EVENT_FAILED_TO_PUSH_NODE_INFO, EVENT_DISCOVERED_PEER, };
interface PeerPoolConfig {
    readonly ackTimeout?: number;
    readonly connectTimeout?: number;
    readonly wsMaxPayload?: number;
    readonly maxPeerInfoSize: number;
    readonly peerSelectionForSend: P2PPeerSelectionForSendFunction;
    readonly peerSelectionForRequest: P2PPeerSelectionForRequestFunction;
    readonly peerSelectionForConnection: P2PPeerSelectionForConnectionFunction;
    readonly sendPeerLimit: number;
    readonly peerBanTime: number;
    readonly maxOutboundConnections: number;
    readonly maxInboundConnections: number;
    readonly maxPeerDiscoveryResponseLength: number;
    readonly outboundShuffleInterval: number;
    readonly netgroupProtectionRatio: number;
    readonly latencyProtectionRatio: number;
    readonly productivityProtectionRatio: number;
    readonly longevityProtectionRatio: number;
    readonly wsMaxMessageRate: number;
    readonly wsMaxMessageRatePenalty: number;
    readonly rateCalculationInterval: number;
    readonly secret: number;
    readonly peerLists: PeerLists;
}
export declare const MAX_PEER_LIST_BATCH_SIZE = 100;
export declare const MAX_PEER_DISCOVERY_PROBE_SAMPLE_SIZE = 100;
export declare const EVENT_REMOVE_PEER = "removePeer";
export declare const INTENTIONAL_DISCONNECT_STATUS_CODE = 1000;
export declare const EVENT_FAILED_TO_SEND_MESSAGE = "failedToSendMessage";
export declare const PEER_KIND_OUTBOUND = "outbound";
export declare const PEER_KIND_INBOUND = "inbound";
export declare enum PROTECTION_CATEGORY {
    NET_GROUP = "netgroup",
    LATENCY = "latency",
    RESPONSE_RATE = "responseRate",
    CONNECT_TIME = "connectTime"
}
export declare class PeerPool extends EventEmitter {
    private readonly _peerMap;
    private readonly _peerPoolConfig;
    private readonly _handlePeerRPC;
    private readonly _handlePeerMessage;
    private readonly _handleOutboundPeerConnect;
    private readonly _handleDiscoverPeer;
    private readonly _handleOutboundPeerConnectAbort;
    private readonly _handlePeerCloseOutbound;
    private readonly _handlePeerCloseInbound;
    private readonly _handlePeerOutboundSocketError;
    private readonly _handlePeerInboundSocketError;
    private readonly _handlePeerInfoUpdate;
    private readonly _handleFailedPeerInfoUpdate;
    private readonly _handleFailedToFetchPeerInfo;
    private readonly _handleFailedToFetchPeers;
    private readonly _handleFailedToCollectPeerDetails;
    private readonly _handleBanPeer;
    private readonly _handleUnbanPeer;
    private _nodeInfo;
    private readonly _maxOutboundConnections;
    private readonly _maxInboundConnections;
    private readonly _peerSelectForSend;
    private readonly _peerSelectForRequest;
    private readonly _peerSelectForConnection;
    private readonly _sendPeerLimit;
    private readonly _outboundShuffleIntervalId;
    private readonly _peerConfig;
    private readonly _peerLists;
    constructor(peerPoolConfig: PeerPoolConfig);
    applyNodeInfo(nodeInfo: P2PNodeInfo): void;
    readonly nodeInfo: P2PNodeInfo | undefined;
    readonly peerConfig: PeerConfig;
    request(packet: P2PRequestPacket): Promise<P2PResponsePacket>;
    send(message: P2PMessagePacket): void;
    requestFromPeer(packet: P2PRequestPacket, peerId: string): Promise<P2PResponsePacket>;
    sendToPeer(message: P2PMessagePacket, peerId: string): void;
    triggerNewConnections(newPeers: ReadonlyArray<P2PPeerInfo>, triedPeers: ReadonlyArray<P2PPeerInfo>, fixedPeers: ReadonlyArray<P2PPeerInfo>): void;
    addInboundPeer(peerInfo: P2PDiscoveredPeerInfo, socket: SCServerSocket): Peer;
    addOutboundPeer(peerId: string, peerInfo: P2PPeerInfo): Peer;
    getPeersCountPerKind(): P2PPeersCount;
    removeAllPeers(): void;
    getPeers(kind?: typeof OutboundPeer | typeof InboundPeer): ReadonlyArray<Peer>;
    getUniqueOutboundConnectedPeers(): ReadonlyArray<P2PDiscoveredPeerInfo>;
    getAllConnectedPeerInfos(kind?: typeof OutboundPeer | typeof InboundPeer): ReadonlyArray<P2PDiscoveredPeerInfo>;
    getConnectedPeers(kind?: typeof OutboundPeer | typeof InboundPeer): ReadonlyArray<Peer>;
    getPeer(peerId: string): Peer | undefined;
    hasPeer(peerId: string): boolean;
    removePeer(peerId: string, code: number, reason: string): boolean;
    applyPenalty(peerPenalty: P2PPenalty): void;
    private _applyNodeInfoOnPeer;
    private _selectPeersForEviction;
    private _evictPeer;
    private _bindHandlersToPeer;
    private _unbindHandlersFromPeer;
}
