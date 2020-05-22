import { Peer, PeerConfig } from './base';
import { P2PDiscoveredPeerInfo, P2PMessagePacket, P2PPeerInfo, P2PRequestPacket, P2PResponsePacket } from '../p2p_types';
import * as socketClusterClient from 'socketcluster-client';
declare type SCClientSocket = socketClusterClient.SCClientSocket;
export declare const EVENT_DISCOVERED_PEER = "discoveredPeer";
export declare const EVENT_CONNECT_OUTBOUND = "connectOutbound";
export declare const EVENT_CONNECT_ABORT_OUTBOUND = "connectAbortOutbound";
export declare const EVENT_CLOSE_OUTBOUND = "closeOutbound";
export declare const EVENT_OUTBOUND_SOCKET_ERROR = "outboundSocketError";
export declare const RESPONSE_PONG = "pong";
export interface PeerInfoAndOutboundConnection {
    readonly peerInfo: P2PDiscoveredPeerInfo;
    readonly socket: SCClientSocket;
}
export declare class OutboundPeer extends Peer {
    protected _socket: SCClientSocket | undefined;
    constructor(peerInfo: P2PPeerInfo, peerConfig: PeerConfig);
    socket: SCClientSocket;
    send(packet: P2PMessagePacket): void;
    request(packet: P2PRequestPacket): Promise<P2PResponsePacket>;
    private _createOutboundSocket;
    connect(): void;
    disconnect(code?: number, reason?: string): void;
    private _bindHandlersToOutboundSocket;
    private _unbindHandlersFromOutboundSocket;
}
export {};
