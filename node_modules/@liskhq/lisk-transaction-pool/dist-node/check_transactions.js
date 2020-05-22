"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
    Status[Status["FAIL"] = 0] = "FAIL";
    Status[Status["OK"] = 1] = "OK";
    Status[Status["PENDING"] = 2] = "PENDING";
})(Status = exports.Status || (exports.Status = {}));
const getTransactionByStatus = (transactions, responses, status) => {
    const transactionIdsByStatus = responses
        .filter(transactionResponse => transactionResponse.status === status)
        .map(transactionStatus => transactionStatus.id);
    const transactionsByStatus = transactions.filter(transaction => transactionIdsByStatus.includes(transaction.id));
    return transactionsByStatus;
};
exports.checkTransactionsWithPassAndFail = async (transactions, checkerFunction) => {
    const { transactionsResponses } = await checkerFunction(transactions);
    const failedTransactions = getTransactionByStatus(transactions, transactionsResponses, Status.FAIL);
    const passedTransactions = getTransactionByStatus(transactions, transactionsResponses, Status.OK);
    return {
        failedTransactions,
        passedTransactions,
    };
};
exports.checkTransactionsWithPassFailAndPending = async (transactions, checkerFunction) => {
    const { transactionsResponses } = await checkerFunction(transactions);
    const failedTransactions = getTransactionByStatus(transactions, transactionsResponses, Status.FAIL);
    const passedTransactions = getTransactionByStatus(transactions, transactionsResponses, Status.OK);
    const pendingTransactions = getTransactionByStatus(transactions, transactionsResponses, Status.PENDING);
    return {
        failedTransactions,
        passedTransactions,
        pendingTransactions,
    };
};
//# sourceMappingURL=check_transactions.js.map