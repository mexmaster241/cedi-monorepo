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
        groups: never[];
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
                        movements: {
                            name: string;
                            isArray: boolean;
                            type: {
                                model: string;
                            };
                            isRequired: boolean;
                            attributes: never[];
                            isArrayNullable: boolean;
                            association: {
                                connectionType: string;
                                associatedWith: string[];
                            };
                        };
                        contacts: {
                            name: string;
                            isArray: boolean;
                            type: {
                                model: string;
                            };
                            isRequired: boolean;
                            attributes: never[];
                            isArrayNullable: boolean;
                            association: {
                                connectionType: string;
                                associatedWith: string[];
                            };
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
                    attributes: any[];
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
                Movement: {
                    name: string;
                    fields: {
                        id: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        userId: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        user: {
                            name: string;
                            isArray: boolean;
                            type: {
                                model: string;
                            };
                            isRequired: boolean;
                            attributes: never[];
                            association: {
                                connectionType: string;
                                targetNames: string[];
                            };
                        };
                        type: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        status: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        amount: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        commission: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        finalAmount: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        paymentType: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        reference: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        beneficiaryName: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        beneficiaryBank: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        accountNumber: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        concept: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        concept2: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        receiptUrl: {
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
                        };
                        updatedAt: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        balanceAfterTransaction: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
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
                Contact: {
                    name: string;
                    fields: {
                        id: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        userId: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        user: {
                            name: string;
                            isArray: boolean;
                            type: {
                                model: string;
                            };
                            isRequired: boolean;
                            attributes: never[];
                            association: {
                                connectionType: string;
                                targetNames: string[];
                            };
                        };
                        name: {
                            name: string;
                            isArray: boolean;
                            type: string;
                            isRequired: boolean;
                            attributes: never[];
                        };
                        bank: {
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
                        alias: {
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
                    attributes: any[];
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
