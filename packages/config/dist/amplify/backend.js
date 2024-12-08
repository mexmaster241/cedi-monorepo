"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var backend_1 = require("@aws-amplify/backend");
var resource_1 = require("./auth/resource");
var resource_2 = require("./data/resource");
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
(0, backend_1.defineBackend)({
    auth: resource_1.auth,
    data: resource_2.data,
});
