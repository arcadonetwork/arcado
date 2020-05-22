import { P2PDiscoveredPeerInfo, P2PPeerInfo } from '../p2p_types';
import { NewPeerConfig } from './new_peers';
import { TriedPeerConfig } from './tried_peers';
export interface PeerBookConfig {
    readonly newPeerConfig?: NewPeerConfig;
    readonly triedPeerConfig?: TriedPeerConfig;
    readonly secret: number;
}
export declare class PeerBook {
    private readonly _newPeers;
    private readonly _triedPeers;
    constructor({ newPeerConfig, triedPeerConfig, secret, }: PeerBookConfig);
    readonly newPeers: ReadonlyArray<P2PPeerInfo>;
    readonly triedPeers: ReadonlyArray<P2PDiscoveredPeerInfo>;
    getAllPeers(): ReadonlyArray<P2PPeerInfo>;
    downgradePeer(peerInfo: P2PPeerInfo): boolean;
    upgradePeer(peerInfo: P2PPeerInfo): boolean;
    addPeer(peerInfo: P2PPeerInfo): P2PPeerInfo | undefined;
    removePeer(peerInfo: P2PPeerInfo): boolean;
    getPeer(peerInfo: P2PPeerInfo): P2PPeerInfo | undefined;
    updatePeer(peerInfo: P2PPeerInfo): boolean;
}
