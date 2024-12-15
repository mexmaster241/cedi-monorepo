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
        movements: backend_1.a.hasMany('Movement', 'userId'),
        contacts: backend_1.a.hasMany('Contact', 'userId'),
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
    Movement: backend_1.a
        .model({
        userId: backend_1.a.string().required(),
        user: backend_1.a.belongsTo('User', 'userId'),
        category: backend_1.a.string().required(),
        direction: backend_1.a.string().required(),
        status: backend_1.a.string().required(),
        amount: backend_1.a.float().required(),
        commission: backend_1.a.float().required(),
        finalAmount: backend_1.a.float().required(),
        trackingId: backend_1.a.string().required(),
        externalReference: backend_1.a.string(),
        internalReference: backend_1.a.string(),
        counterpartyName: backend_1.a.string().required(),
        counterpartyBank: backend_1.a.string().required(),
        counterpartyClabe: backend_1.a.string(),
        counterpartyEmail: backend_1.a.string(),
        concept: backend_1.a.string(),
        metadata: backend_1.a.string(),
        createdAt: backend_1.a.datetime(),
        updatedAt: backend_1.a.datetime(),
        completedAt: backend_1.a.datetime(),
    })
        .authorization(function (allow) { return [
        allow.owner().to(['read']),
        allow.publicApiKey().to(['create'])
    ]; }),
    Contact: backend_1.a
        .model({
        userId: backend_1.a.string().required(),
        user: backend_1.a.belongsTo('User', 'userId'),
        name: backend_1.a.string().required(),
        bank: backend_1.a.string().required(),
        clabe: backend_1.a.string().required(),
        alias: backend_1.a.string(),
        email: backend_1.a.string(),
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
