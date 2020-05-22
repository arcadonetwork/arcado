"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const socketcluster_server_1 = require("socketcluster-server");
const socketErrorStatusCodes = Object.assign({}, socketcluster_server_1.SCServerSocket.errorStatuses, { 1000: 'Intentionally disconnected' });
exports.EVENT_CLOSE_INBOUND = 'closeInbound';
exports.EVENT_INBOUND_SOCKET_ERROR = 'inboundSocketError';
exports.EVENT_PING = 'ping';
const DEFAULT_PING_INTERVAL_MAX = 60000;
const DEFAULT_PING_INTERVAL_MIN = 20000;
const getRandomPingDelay = () => Math.random() * (DEFAULT_PING_INTERVAL_MAX - DEFAULT_PING_INTERVAL_MIN) +
    DEFAULT_PING_INTERVAL_MIN;
class InboundPeer extends base_1.Peer {
    constructor(peerInfo, peerSocket, peerConfig) {
        super(peerInfo, peerConfig);
        this._handleInboundSocketError = (error) => {
            this.emit(exports.EVENT_INBOUND_SOCKET_ERROR, error);
        };
        this._handleInboundSocketClose = (code, reasonMessage) => {
            const reason = reasonMessage
                ? reasonMessage
                : socketErrorStatusCodes[code] || 'Unknown reason';
            if (this._pingTimeoutId) {
                clearTimeout(this._pingTimeoutId);
            }
            this.emit(exports.EVENT_CLOSE_INBOUND, {
                peerInfo,
                code,
                reason,
            });
        };
        this._sendPing = () => {
            const pingStart = Date.now();
            this._socket.emit(exports.EVENT_PING, undefined, (_, __) => {
                this._latency = Date.now() - pingStart;
                this._pingTimeoutId = setTimeout(this._sendPing, getRandomPingDelay());
            });
        };
        this._pingTimeoutId = setTimeout(this._sendPing, getRandomPingDelay());
        this._socket = peerSocket;
        this._bindHandlersToInboundSocket(this._socket);
    }
    set socket(scServerSocket) {
        this._unbindHandlersFromInboundSocket(this._socket);
        this._socket = scServerSocket;
        this._bindHandlersToInboundSocket(this._socket);
    }
    disconnect(code = 1000, reason) {
        super.disconnect(code, reason);
        this._unbindHandlersFromInboundSocket(this._socket);
    }
    _bindHandlersToInboundSocket(inboundSocket) {
        inboundSocket.on('close', this._handleInboundSocketClose);
        inboundSocket.on('error', this._handleInboundSocketError);
        inboundSocket.on('message', this._handleWSMessage);
        inboundSocket.on(base_1.REMOTE_EVENT_RPC_REQUEST, this._handleRawRPC);
        inboundSocket.on(base_1.REMOTE_EVENT_MESSAGE, this._handleRawMessage);
        inboundSocket.on('postBlock', this._handleRawLegacyMessagePostBlock);
        inboundSocket.on('postSignatures', this._handleRawLegacyMessagePostSignatures);
        inboundSocket.on('postTransactions', this._handleRawLegacyMessagePostTransactions);
    }
    _unbindHandlersFromInboundSocket(inboundSocket) {
        inboundSocket.off('close', this._handleInboundSocketClose);
        inboundSocket.off('message', this._handleWSMessage);
        inboundSocket.off(base_1.REMOTE_EVENT_RPC_REQUEST, this._handleRawRPC);
        inboundSocket.off(base_1.REMOTE_EVENT_MESSAGE, this._handleRawMessage);
        inboundSocket.off('postBlock', this._handleRawLegacyMessagePostBlock);
        inboundSocket.off('postSignatures', this._handleRawLegacyMessagePostSignatures);
        inboundSocket.off('postTransactions', this._handleRawLegacyMessagePostTransactions);
    }
}
exports.InboundPeer = InboundPeer;
//# sourceMappingURL=inbound.js.map