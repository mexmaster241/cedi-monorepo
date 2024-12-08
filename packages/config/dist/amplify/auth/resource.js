"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var backend_1 = require("@aws-amplify/backend");
/**
 * Define and configure your auth resource
 * When used alongside the Amplify CLI, the resource name will be used for naming resources consistently across your backend
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
exports.auth = (0, backend_1.defineAuth)({
    loginWith: {
        email: true,
        // phone: false,
    },
    userAttributes: {
        givenName: {
            required: true,
            mutable: true,
        },
        familyName: {
            required: true,
            mutable: true,
        },
    },
});
