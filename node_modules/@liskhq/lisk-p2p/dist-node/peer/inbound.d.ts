import { Peer, PeerConfig, SCServerSocketUpdated } from './base';
import { P2PDiscoveredPeerInfo } from '../p2p_types';
import { SCServerSocket } from 'socketcluster-server';
export declare const EVENT_CLOSE_INBOUND = "closeInbound";
export declare const EVENT_INBOUND_SOCKET_ERROR = "inboundSocketError";
export declare const EVENT_PING = "ping";
export declare class InboundPeer extends Peer {
    protected _socket: SCServerSocketUpdated;
    protected readonly _handleInboundSocketError: (error: Error) => void;
    protected readonly _handleInboundSocketClose: (code: number, reason: string | undefined) => void;
    private readonly _sendPing;
    private _pingTimeoutId;
    constructor(peerInfo: P2PDiscoveredPeerInfo, peerSocket: SCServerSocket, peerConfig: PeerConfig);
    socket: SCServerSocket;
    disconnect(code?: number, reason?: string): void;
    private _bindHandlersToInboundSocket;
    private _unbindHandlersFromInboundSocket;
}
