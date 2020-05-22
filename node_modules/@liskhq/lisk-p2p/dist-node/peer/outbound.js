"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const inbound_1 = require("./inbound");
const querystring = require("querystring");
const socketClusterClient = require("socketcluster-client");
exports.EVENT_DISCOVERED_PEER = 'discoveredPeer';
exports.EVENT_CONNECT_OUTBOUND = 'connectOutbound';
exports.EVENT_CONNECT_ABORT_OUTBOUND = 'connectAbortOutbound';
exports.EVENT_CLOSE_OUTBOUND = 'closeOutbound';
exports.EVENT_OUTBOUND_SOCKET_ERROR = 'outboundSocketError';
exports.RESPONSE_PONG = 'pong';
const socketErrorStatusCodes = Object.assign({}, socketClusterClient.SCClientSocket.errorStatuses, { 1000: 'Intentionally disconnected' });
class OutboundPeer extends base_1.Peer {
    constructor(peerInfo, peerConfig) {
        super(peerInfo, peerConfig);
    }
    set socket(scClientSocket) {
        if (this._socket) {
            this._unbindHandlersFromOutboundSocket(this._socket);
        }
        this._socket = scClientSocket;
        this._bindHandlersToOutboundSocket(this._socket);
    }
    send(packet) {
        if (!this._socket) {
            this._socket = this._createOutboundSocket();
        }
        super.send(packet);
    }
    async request(packet) {
        if (!this._socket) {
            this._socket = this._createOutboundSocket();
        }
        return super.request(packet);
    }
    _createOutboundSocket() {
        const legacyNodeInfo = this._nodeInfo
            ? base_1.convertNodeInfoToLegacyFormat(this._nodeInfo)
            : undefined;
        const connectTimeout = this._peerConfig.connectTimeout
            ? this._peerConfig.connectTimeout
            : base_1.DEFAULT_CONNECT_TIMEOUT;
        const ackTimeout = this._peerConfig.ackTimeout
            ? this._peerConfig.ackTimeout
            : base_1.DEFAULT_ACK_TIMEOUT;
        const clientOptions = {
            hostname: this._ipAddress,
            port: this._wsPort,
            query: querystring.stringify(Object.assign({}, legacyNodeInfo, { options: JSON.stringify(legacyNodeInfo) })),
            connectTimeout,
            ackTimeout,
            multiplex: false,
            autoConnect: false,
            autoReconnect: false,
            maxPayload: this._peerConfig.wsMaxPayload,
        };
        const outboundSocket = socketClusterClient.create(clientOptions);
        this._bindHandlersToOutboundSocket(outboundSocket);
        return outboundSocket;
    }
    connect() {
        if (!this._socket) {
            this._socket = this._createOutboundSocket();
        }
        this._socket.connect();
    }
    disconnect(code = 1000, reason) {
        super.disconnect(code, reason);
        if (this._socket) {
            this._unbindHandlersFromOutboundSocket(this._socket);
        }
    }
    _bindHandlersToOutboundSocket(outboundSocket) {
        outboundSocket.on('error', (error) => {
            this.emit(exports.EVENT_OUTBOUND_SOCKET_ERROR, error);
        });
        outboundSocket.on('connect', async () => {
            this.emit(exports.EVENT_CONNECT_OUTBOUND, this._peerInfo);
            try {
                await Promise.all([this.fetchStatus(), this.discoverPeers()]);
            }
            catch (error) {
                this.emit(base_1.EVENT_FAILED_TO_COLLECT_PEER_DETAILS_ON_CONNECT, error);
            }
        });
        outboundSocket.on('connectAbort', () => {
            this.emit(exports.EVENT_CONNECT_ABORT_OUTBOUND, this._peerInfo);
        });
        outboundSocket.on('close', (code, reasonMessage) => {
            const reason = reasonMessage
                ? reasonMessage
                : socketErrorStatusCodes[code] || 'Unknown reason';
            this.emit(exports.EVENT_CLOSE_OUTBOUND, {
                peerInfo: this._peerInfo,
                code,
                reason,
            });
        });
        outboundSocket.on('message', this._handleWSMessage);
        outboundSocket.on(inbound_1.EVENT_PING, (_, res) => {
            res(undefined, exports.RESPONSE_PONG);
        });
        outboundSocket.on(base_1.REMOTE_EVENT_RPC_REQUEST, this._handleRawRPC);
        outboundSocket.on(base_1.REMOTE_EVENT_MESSAGE, this._handleRawMessage);
        outboundSocket.on('postBlock', this._handleRawLegacyMessagePostBlock);
        outboundSocket.on('postSignatures', this._handleRawLegacyMessagePostSignatures);
        outboundSocket.on('postTransactions', this._handleRawLegacyMessagePostTransactions);
    }
    _unbindHandlersFromOutboundSocket(outboundSocket) {
        outboundSocket.off('connect');
        outboundSocket.off('connectAbort');
        outboundSocket.off('close');
        outboundSocket.off('message', this._handleWSMessage);
        outboundSocket.off(base_1.REMOTE_EVENT_RPC_REQUEST, this._handleRawRPC);
        outboundSocket.off(base_1.REMOTE_EVENT_MESSAGE, this._handleRawMessage);
        outboundSocket.off('postBlock', this._handleRawLegacyMessagePostBlock);
        outboundSocket.off('postSignatures', this._handleRawLegacyMessagePostSignatures);
        outboundSocket.off('postTransactions', this._handleRawLegacyMessagePostTransactions);
        outboundSocket.off(inbound_1.EVENT_PING);
    }
}
exports.OutboundPeer = OutboundPeer;
//# sourceMappingURL=outbound.js.map