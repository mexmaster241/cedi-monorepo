import { type ClientSchema } from '@aws-amplify/backend';

declare const schema: import("@aws-amplify/data-schema").ModelSchema<{
    types: {
        User: import("@aws-amplify/data-schema").ModelType<{
            fields: {
                email: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                givenName: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                familyName: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                clabe: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                balance: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<number>, "default", undefined>;
                lastLogin: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                owner: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                movements: import("@aws-amplify/data-schema").ModelRelationshipField<import("@aws-amplify/data-schema").ModelRelationshipTypeArgFactory<"Movement", import("@aws-amplify/data-schema").ModelRelationshipTypes.hasMany, true>, "Movement", "required", undefined>;
                contacts: import("@aws-amplify/data-schema").ModelRelationshipField<import("@aws-amplify/data-schema").ModelRelationshipTypeArgFactory<"Contact", import("@aws-amplify/data-schema").ModelRelationshipTypes.hasMany, true>, "Contact", "required", undefined>;
            };
        }>;
        ClabeSequence: import("@aws-amplify/data-schema").ModelType<{
            fields: {
                id: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                lastSequence: import("@aws-amplify/data-schema").ModelField<number, "required" | "default", undefined>;
            };
        }>;
        Movement: import("@aws-amplify/data-schema").ModelType<{
            fields: {
                userId: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                user: import("@aws-amplify/data-schema").ModelRelationshipField<import("@aws-amplify/data-schema").ModelRelationshipTypeArgFactory<"User", import("@aws-amplify/data-schema").ModelRelationshipTypes.belongsTo, false>, "User", "required" | "valueRequired", undefined>;
                category: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                direction: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                status: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                amount: import("@aws-amplify/data-schema").ModelField<number, "required", undefined>;
                commission: import("@aws-amplify/data-schema").ModelField<number, "required", undefined>;
                finalAmount: import("@aws-amplify/data-schema").ModelField<number, "required", undefined>;
                trackingId: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                externalReference: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                internalReference: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                counterpartyName: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                counterpartyBank: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                counterpartyClabe: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                counterpartyEmail: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                concept: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                metadata: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                createdAt: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                updatedAt: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                completedAt: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
            };
        }>;
        Contact: import("@aws-amplify/data-schema").ModelType<{
            fields: {
                userId: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                user: import("@aws-amplify/data-schema").ModelRelationshipField<import("@aws-amplify/data-schema").ModelRelationshipTypeArgFactory<"User", import("@aws-amplify/data-schema").ModelRelationshipTypes.belongsTo, false>, "User", "required" | "valueRequired", undefined>;
                name: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                bank: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                clabe: import("@aws-amplify/data-schema").ModelField<string, "required", undefined>;
                alias: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
                email: import("@aws-amplify/data-schema").ModelField<import("@aws-amplify/data-schema").Nullable<string>, never, undefined>;
            };
        }>;
    };
}>;

export type Schema = ClientSchema<typeof schema>;
export declare const data: import("@aws-amplify/plugin-types").ConstructFactory<import("@aws-amplify/graphql-api-construct").AmplifyGraphqlApi>;
export {};
