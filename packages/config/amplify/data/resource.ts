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
    movements: a.hasMany('Movement', 'userId'),
    contacts: a.hasMany('Contact', 'userId'),
  })
  .authorization((allow) => [
    allow.owner().to(['read', 'update']),
    allow.publicApiKey().to(['create', 'read', 'update']),
    allow.group('authenticated').to(['read', 'update', 'create']),
    
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

    Movement: a
    .model({
      userId: a.string().required(),
      user: a.belongsTo('User', 'userId'),
      
      // Movement classification
      category: a.string().required(), // Values: 'WIRE' | 'INTERNAL'
      direction: a.string().required(), // Values: 'INBOUND' | 'OUTBOUND'
      
      // Status tracking
      status: a.string().required(), // Values: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REVERSED'
      
      // Financial details
      amount: a.float().required(),
      commission: a.float().required(),
      finalAmount: a.float().required(),
      
      // Reference information
      claveRastreo: a.string().required(),
      externalReference: a.string(),
      internalReference: a.string(),
      
      // Counterparty information - since Gen 2 doesn't support nested models directly
      counterpartyName: a.string().required(),
      counterpartyBank: a.string().required(),
      counterpartyClabe: a.string(),
      counterpartyEmail: a.string(),
      concept2: a.string(),
      // Additional context
      concept: a.string(),

      metadata: a.string(), // We'll store JSON as a string since Gen 2 doesn't have direct JSON type
      
      // Timestamps
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      completedAt: a.datetime(),
      rfcCurpBeneficiario: a.string(),
      rfcCurpOrdenante: a.string(),
      tipoCuentaBeneficiario: a.string(),
      tipoCuentaOrdenante: a.string(),
      tipoPago: a.string(),
      institucionContraparte: a.string(),
      institucionOperante: a.string(),
      empresa: a.string(),
      referenciaNumerica: a.string(),
    })
    .authorization((allow) => [
      allow.owner().to(['read', 'create', 'update']),
      allow.publicApiKey().to(['create', 'read', 'update']),
      allow.group('authenticated').to(['create', 'read', 'update']),
    ]),

  Contact: a
    .model({
      userId: a.string().required(),
      user: a.belongsTo('User', 'userId'),
      name: a.string().required(),
      bank: a.string().required(),
      clabe: a.string().required(),
      alias: a.string(),
      email: a.string(),
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