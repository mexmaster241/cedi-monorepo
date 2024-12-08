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
