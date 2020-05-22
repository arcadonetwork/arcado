import { P2PDiscoveredPeerInfo, P2PPeerInfo, P2PPeerSelectionForConnectionInput, P2PPeerSelectionForRequestInput, P2PPeerSelectionForSendInput } from './p2p_types';
export declare const getUniquePeersbyIp: (peerList: ReadonlyArray<P2PDiscoveredPeerInfo>) => ReadonlyArray<P2PDiscoveredPeerInfo>;
export declare const selectPeersForRequest: (input: P2PPeerSelectionForRequestInput) => ReadonlyArray<P2PDiscoveredPeerInfo>;
export declare const selectPeersForSend: (input: P2PPeerSelectionForSendInput) => ReadonlyArray<P2PDiscoveredPeerInfo>;
export declare const selectPeersForConnection: (input: P2PPeerSelectionForConnectionInput) => ReadonlyArray<P2PPeerInfo>;
