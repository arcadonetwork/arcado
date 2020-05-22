"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTransactionPropertyForValues = (values, propertyName) => (transaction) => values.includes(transaction[propertyName]);
exports.returnTrueUntilLimit = (limit) => {
    let current = 0;
    return _ => current++ < limit;
};
exports.checkTransactionForExpiry = () => {
    const timeNow = new Date();
    return (transaction) => transaction.isExpired(timeNow);
};
exports.checkTransactionForSenderPublicKey = (transactions) => {
    const senderProperty = 'senderPublicKey';
    const senderPublicKeys = transactions.map(transaction => transaction[senderProperty]);
    return exports.checkTransactionPropertyForValues(senderPublicKeys, senderProperty);
};
exports.checkTransactionForId = (transactions) => {
    const idProperty = 'id';
    const ids = transactions.map(transaction => transaction.id);
    return exports.checkTransactionPropertyForValues(ids, idProperty);
};
exports.checkTransactionForSenderIdWithRecipientIds = (transactions) => {
    const recipientProperty = 'recipientId';
    const senderId = 'senderId';
    const recipients = transactions.map(transaction => transaction[recipientProperty]);
    return exports.checkTransactionPropertyForValues(recipients, senderId);
};
exports.checkTransactionForTypes = (transactions) => {
    const typeProperty = 'type';
    const types = transactions.map((transaction) => transaction[typeProperty]);
    return exports.checkTransactionPropertyForValues(types, typeProperty);
};
//# sourceMappingURL=queue_checkers.js.map