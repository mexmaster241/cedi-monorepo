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