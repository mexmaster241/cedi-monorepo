import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * When used alongside the Amplify CLI, the resource name will be used for naming resources consistently across your backend
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
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
  