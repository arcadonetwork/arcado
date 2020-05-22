"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shuffle = require("lodash.shuffle");
exports.getUniquePeersbyIp = (peerList) => {
    const peerMap = new Map();
    for (const peer of peerList) {
        const tempPeer = peerMap.get(peer.ipAddress);
        if (tempPeer) {
            if (peer.height > tempPeer.height) {
                peerMap.set(peer.ipAddress, peer);
            }
        }
        else {
            peerMap.set(peer.ipAddress, peer);
        }
    }
    return [...peerMap.values()];
};
exports.selectPeersForRequest = (input) => {
    const { peers } = input;
    const peerLimit = input.peerLimit;
    if (peers.length === 0) {
        return [];
    }
    if (peerLimit === undefined) {
        return shuffle(peers);
    }
    return shuffle(peers).slice(0, peerLimit);
};
exports.selectPeersForSend = (input) => {
    const shuffledPeers = shuffle(input.peers);
    const peerLimit = input.peerLimit;
    const halfPeerLimit = Math.round(peerLimit / 2);
    const outboundPeers = shuffledPeers.filter((peerInfo) => peerInfo.kind === 'outbound');
    const inboundPeers = shuffledPeers.filter((peerInfo) => peerInfo.kind === 'inbound');
    let shortestPeersList;
    let longestPeersList;
    if (outboundPeers.length < inboundPeers.length) {
        shortestPeersList = outboundPeers;
        longestPeersList = inboundPeers;
    }
    else {
        shortestPeersList = inboundPeers;
        longestPeersList = outboundPeers;
    }
    const selectedFirstKindPeers = shortestPeersList.slice(0, halfPeerLimit);
    const remainingPeerLimit = peerLimit - selectedFirstKindPeers.length;
    const selectedSecondKindPeers = longestPeersList.slice(0, remainingPeerLimit);
    return selectedFirstKindPeers.concat(selectedSecondKindPeers);
};
exports.selectPeersForConnection = (input) => {
    if (input.peerLimit && input.peerLimit < 0) {
        return [];
    }
    if (input.peerLimit === undefined ||
        input.peerLimit >= input.triedPeers.length + input.newPeers.length) {
        return [...input.newPeers, ...input.triedPeers];
    }
    if (input.triedPeers.length === 0 && input.newPeers.length === 0) {
        return [];
    }
    const x = input.triedPeers.length / (input.triedPeers.length + input.newPeers.length);
    const minimumProbability = 0.5;
    const r = Math.max(x, minimumProbability);
    const shuffledTriedPeers = shuffle(input.triedPeers);
    const shuffledNewPeers = shuffle(input.newPeers);
    return [...Array(input.peerLimit)].map(() => {
        if (shuffledTriedPeers.length !== 0) {
            if (Math.random() < r) {
                return shuffledTriedPeers.pop();
            }
        }
        if (shuffledNewPeers.length !== 0) {
            return shuffledNewPeers.pop();
        }
        return shuffledTriedPeers.pop();
    });
};
//# sourceMappingURL=peer_selection.js.map