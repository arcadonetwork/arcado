"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const new_peers_1 = require("./new_peers");
const tried_peers_1 = require("./tried_peers");
class PeerBook {
    constructor({ newPeerConfig, triedPeerConfig, secret, }) {
        this._newPeers = new new_peers_1.NewPeers(newPeerConfig ? newPeerConfig : { secret });
        this._triedPeers = new tried_peers_1.TriedPeers(triedPeerConfig ? triedPeerConfig : { secret });
    }
    get newPeers() {
        return this._newPeers.newPeersList();
    }
    get triedPeers() {
        return this._triedPeers.triedPeersList();
    }
    getAllPeers() {
        return [...this.newPeers, ...this.triedPeers];
    }
    downgradePeer(peerInfo) {
        if (this._newPeers.getPeer(peerInfo)) {
            if (this._newPeers.failedConnectionAction(peerInfo)) {
                return true;
            }
        }
        if (this._triedPeers.getPeer(peerInfo)) {
            const failed = this._triedPeers.failedConnectionAction(peerInfo);
            if (failed) {
                this.addPeer(peerInfo);
            }
        }
        return false;
    }
    upgradePeer(peerInfo) {
        if (this._triedPeers.getPeer(peerInfo)) {
            return true;
        }
        if (this._newPeers.getPeer(peerInfo)) {
            this._newPeers.removePeer(peerInfo);
            this._triedPeers.addPeer(peerInfo);
            return true;
        }
        return false;
    }
    addPeer(peerInfo) {
        if (this._triedPeers.getPeer(peerInfo) ||
            this._newPeers.getPeer(peerInfo)) {
            throw new Error('Peer already exists');
        }
        return this._newPeers.addPeer(peerInfo).evictedPeer;
    }
    removePeer(peerInfo) {
        if (this._triedPeers.getPeer(peerInfo)) {
            return this._triedPeers.removePeer(peerInfo);
        }
        if (this._newPeers.getPeer(peerInfo)) {
            return this._newPeers.removePeer(peerInfo);
        }
        return false;
    }
    getPeer(peerInfo) {
        const triedPeer = this._triedPeers.getPeer(peerInfo);
        if (this._triedPeers.getPeer(peerInfo)) {
            return triedPeer;
        }
        return this._newPeers.getPeer(peerInfo);
    }
    updatePeer(peerInfo) {
        if (this._triedPeers.getPeer(peerInfo)) {
            return this._triedPeers.updatePeer(peerInfo);
        }
        if (this._newPeers.getPeer(peerInfo)) {
            return this._newPeers.updatePeer(peerInfo);
        }
        return false;
    }
}
exports.PeerBook = PeerBook;
//# sourceMappingURL=peer_book.js.map