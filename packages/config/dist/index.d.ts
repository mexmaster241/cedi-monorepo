export declare const amplifyConfig: {
    auth: {
        user_pool_id: string;
        aws_region: string;
        user_pool_client_id: string;
        identity_pool_id: string;
        mfa_methods: never[];
        standard_required_attributes: string[];
        username_attributes: string[];
        user_verification_types: string[];
        mfa_configuration: string;
        password_policy: {
            min_length: number;
            require_lowercase: boolean;
            require_numbers: boolean;
            require_symbols: boolean;
            require_uppercase: boolean;
        };
        unauthenticated_identities_enabled: boolean;
    };
    data: {
        url: string;
        aws_region: string;
        api_key: string;
        default_authorization_type: string;
        authorization_types: string[];
        model_introspection: {
            version: number;
            models: {
                User: {
                    name: string;
                    fields: {
                        id: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        email: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        givenName: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        familyName: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        clabe: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        balance: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        lastLogin: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        owner: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        createdAt: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                            isReadOnly: boolean;
                        };
                        updatedAt: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                            isReadOnly: boolean;
                        };
                    };
                    syncable: boolean;
                    pluralName: string;
                    attributes: ({
                        type: string;
                        properties: {
                            rules?: undefined;
                        };
                    } | {
                        type: string;
                        properties: {
                            rules: ({
                                provider: string;
                                ownerField: string;
                                allow: string;
                                operations: string[];
                                identityClaim: string;
                            } | {
                                allow: string;
                                provider: string;
                                operations: string[];
                                ownerField?: undefined;
                                identityClaim?: undefined;
                            })[];
                        };
                    })[];
                    primaryKeyInfo: {
                        isCustomPrimaryKey: boolean;
                        primaryKeyFieldName: string;
                        sortKeyFieldNames: never[];
                    };
                };
                ClabeSequence: {
                    name: string;
                    fields: {
                        id: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        lastSequence: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        createdAt: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                            isReadOnly: boolean;
                        };
                        updatedAt: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                            isReadOnly: boolean;
                        };
                    };
                    syncable: boolean;
                    pluralName: string;
                    attributes: ({
                        type: string;
                        properties: {
                            fields?: undefined;
                            rules?: undefined;
                        };
                    } | {
                        type: string;
                        properties: {
                            fields: string[];
                            rules?: undefined;
                        };
                    } | {
                        type: string;
                        properties: {
                            rules: ({
                                allow: string;
                                provider: string;
                                operations: string[];
                                ownerField?: undefined;
                                identityClaim?: undefined;
                            } | {
                                provider: string;
                                ownerField: string;
                                allow: string;
                                operations: string[];
                                identityClaim: string;
                            })[];
                            fields?: undefined;
                        };
                    })[];
                    primaryKeyInfo: {
                        isCustomPrimaryKey: boolean;
                        primaryKeyFieldName: string;
                        sortKeyFieldNames: never[];
                    };
                };
            };
            enums: {};
            nonModels: {};
        };
    };
    version: string;
};