import { type ClientSchema } from '@aws-amplify/backend';
declare const schema: import("@aws-amplify/data-schema").ModelSchema<{
    types: {
        User: import("@aws-amplify/data-schema").ModelType<import("@aws-amplify/data-schema-types").SetTypeSubArg<{
            fields: {
                email: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                givenName: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                familyName: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                clabe: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                balance: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<number>, "default", undefined>;
                lastLogin: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                owner: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
            };
            identifier: import("@aws-amplify/data-schema").ModelDefaultIdentifier;
            secondaryIndexes: [];
            authorization: [];
            disabledOperations: [];
        }, "authorization", (Omit<import("@aws-amplify/data-schema").Authorization<"owner", "owner", false> & {
            to: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, operations: import("@aws-amplify/data-schema/dist/esm/Authorization").Operation[]) => Omit<SELF, "to">;
            identityClaim: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, property: string) => Omit<SELF, "identityClaim">;
        }, "to"> | Omit<import("@aws-amplify/data-schema").Authorization<"public", undefined, false> & {
            to: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, operations: import("@aws-amplify/data-schema/dist/esm/Authorization").Operation[]) => Omit<SELF, "to">;
        }, "to">)[]>, "authorization">;
        ClabeSequence: import("@aws-amplify/data-schema").ModelType<import("@aws-amplify/data-schema-types").SetTypeSubArg<{
            fields: {
                id: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                lastSequence: import("@aws-amplify/data-schema").ModelField<number, "required" | "default", undefined>;
            };
            identifier: import("@aws-amplify/data-schema").ModelDefaultIdentifier;
            secondaryIndexes: [];
            authorization: [];
            disabledOperations: [];
        }, "authorization", (Omit<import("@aws-amplify/data-schema").Authorization<"owner", "owner", false> & {
            to: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, operations: import("@aws-amplify/data-schema/dist/esm/Authorization").Operation[]) => Omit<SELF, "to">;
            identityClaim: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, property: string) => Omit<SELF, "identityClaim">;
        }, "to"> | Omit<import("@aws-amplify/data-schema").Authorization<"public", undefined, false> & {
            to: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, operations: import("@aws-amplify/data-schema/dist/esm/Authorization").Operation[]) => Omit<SELF, "to">;
        }, "to">)[]>, "authorization">;
    };
    authorization: [];
    configuration: any;
}, never>;
export type Schema = ClientSchema<typeof schema>;
export declare const data: import("@aws-amplify/plugin-types").ConstructFactory<import("@aws-amplify/graphql-api-construct").AmplifyGraphqlApi>;
export {};
