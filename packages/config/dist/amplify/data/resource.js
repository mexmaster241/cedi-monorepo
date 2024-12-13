"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var backend_1 = require("@aws-amplify/backend");
var schema = backend_1.a.schema({
    User: backend_1.a
        .model({
        email: backend_1.a.string().required(),
        givenName: backend_1.a.string().required(),
        familyName: backend_1.a.string().required(),
        clabe: backend_1.a.string(),
        balance: backend_1.a.float().default(0),
        lastLogin: backend_1.a.datetime(),
        owner: backend_1.a.string(),
        transactions: backend_1.a.hasMany('Transaction', 'userId'),
    })
        .authorization(function (allow) { return [
        allow.owner().to(['read', 'update']),
        allow.publicApiKey().to(['create'])
    ]; }),
    ClabeSequence: backend_1.a
        .model({
        id: backend_1.a.string().required(),
        lastSequence: backend_1.a.integer().required().default(0),
    })
        .authorization(function (allow) { return [
        allow.publicApiKey().to(['read', 'update']),
        allow.owner().to(['read', 'update']),
    ]; }),
    Transaction: backend_1.a
        .model({
        userId: backend_1.a.string().required(),
        user: backend_1.a.belongsTo('User', 'userId'),
        type: backend_1.a.string().required(),
        status: backend_1.a.string().required(),
        amount: backend_1.a.float().required(),
        commission: backend_1.a.float().required(),
        finalAmount: backend_1.a.float().required(),
        paymentType: backend_1.a.string(),
        reference: backend_1.a.string(),
        beneficiaryName: backend_1.a.string(),
        beneficiaryBank: backend_1.a.string(),
        accountNumber: backend_1.a.string(),
        concept: backend_1.a.string(),
        concept2: backend_1.a.string(),
        receiptUrl: backend_1.a.string(),
        createdAt: backend_1.a.datetime(),
        updatedAt: backend_1.a.datetime(),
        balanceAfterTransaction: backend_1.a.float(),
    })
        .authorization(function (allow) { return [
        allow.owner().to(['read']),
        allow.publicApiKey().to(['create', 'read'])
    ]; }),
    Contact: backend_1.a
        .model({
        userId: backend_1.a.string().required(),
        name: backend_1.a.string().required(),
        type: backend_1.a.string().required(),
        accountNumber: backend_1.a.string().required(),
        bank: backend_1.a.string().required(),
    })
        .authorization(function (allow) { return [
        allow.owner().to(['create', 'read', 'update', 'delete'])
    ]; })
});
exports.data = (0, backend_1.defineData)({
    schema: schema,
    authorizationModes: {
        defaultAuthorizationMode: 'userPool',
        apiKeyAuthorizationMode: {
            expiresInDays: 30
        }
    }
});
