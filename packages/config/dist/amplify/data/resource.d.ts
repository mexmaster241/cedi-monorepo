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
                transactions: import("@aws-amplify/data-schema").ModelRelationshipField<import("@aws-amplify/data-schema").ModelRelationshipTypeArgFactory<"Transaction", import("@aws-amplify/data-schema").ModelRelationshipTypes.hasMany, true>, "Transaction", "required", undefined>;
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
        Transaction: import("@aws-amplify/data-schema").ModelType<import("@aws-amplify/data-schema-types").SetTypeSubArg<{
            fields: {
                userId: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                user: import("@aws-amplify/data-schema").ModelRelationshipField<import("@aws-amplify/data-schema").ModelRelationshipTypeArgFactory<"User", import("@aws-amplify/data-schema").ModelRelationshipTypes.belongsTo, false>, "User", "required" | "valueRequired", undefined>;
                type: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                status: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                amount: import("@aws-amplify/data-schema").ModelField<number, "required", undefined>;
                commission: import("@aws-amplify/data-schema").ModelField<number, "required", undefined>;
                finalAmount: import("@aws-amplify/data-schema").ModelField<number, "required", undefined>;
                paymentType: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                reference: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                beneficiaryName: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                beneficiaryBank: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                accountNumber: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                concept: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                concept2: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                receiptUrl: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                createdAt: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                updatedAt: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                balanceAfterTransaction: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<number>, never, undefined>;
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
        Contact: import("@aws-amplify/data-schema").ModelType<import("@aws-amplify/data-schema-types").SetTypeSubArg<{
            fields: {
                userId: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                name: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                type: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                accountNumber: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                bank: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
            };
            identifier: import("@aws-amplify/data-schema").ModelDefaultIdentifier;
            secondaryIndexes: [];
            authorization: [];
            disabledOperations: [];
        }, "authorization", Omit<import("@aws-amplify/data-schema").Authorization<"owner", "owner", false> & {
            to: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, operations: import("@aws-amplify/data-schema/dist/esm/Authorization").Operation[]) => Omit<SELF, "to">;
            identityClaim: <SELF extends import("@aws-amplify/data-schema").Authorization<any, any, any>>(this: SELF, property: string) => Omit<SELF, "identityClaim">;
        }, "to">[]>, "authorization">;
    };
    authorization: [];
    configuration: any;
}, never>;
export type Schema = ClientSchema<typeof schema>;
export declare const data: import("@aws-amplify/plugin-types").ConstructFactory<import("@aws-amplify/graphql-api-construct").AmplifyGraphqlApi>;
export {};
