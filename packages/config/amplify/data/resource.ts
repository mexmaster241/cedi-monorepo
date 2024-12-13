import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
      email: a.string().required(),
      givenName: a.string().required(),
      familyName: a.string().required(),
      clabe: a.string(),
      balance: a.float().default(0),
      lastLogin: a.datetime(),
      owner: a.string(),
      transactions: a.hasMany('Transaction', 'userId'),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'update']),
      allow.publicApiKey().to(['create'])
    ]),
    
  ClabeSequence: a
    .model({
      id: a.string().required(),
      lastSequence: a.integer().required().default(0),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'update']),
      allow.owner().to(['read', 'update']),
    ]),

  Transaction: a
    .model({
      userId: a.string().required(),
      user: a.belongsTo('User', 'userId'),
      type: a.string().required(),
      status: a.string().required(),
      
      amount: a.float().required(),
      commission: a.float().required(),
      finalAmount: a.float().required(),
      
      paymentType: a.string(),
      reference: a.string(),
      
      beneficiaryName: a.string(),
      beneficiaryBank: a.string(),
      accountNumber: a.string(),
      
      concept: a.string(),
      concept2: a.string(),
      
      receiptUrl: a.string(),
      
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      
      balanceAfterTransaction: a.float(),
    })
    .authorization((allow) => [
      allow.owner().to(['read']),
      allow.publicApiKey().to(['create', 'read'])
    ]),

  Contact: a
    .model({
      userId: a.string().required(),
      name: a.string().required(),
      type: a.string().required(),
      accountNumber: a.string().required(),
      bank: a.string().required(),
    })
    .authorization((allow) => [
      allow.owner().to(['create', 'read', 'update', 'delete'])
    ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: { 
      expiresInDays: 30 
    }
  }
});