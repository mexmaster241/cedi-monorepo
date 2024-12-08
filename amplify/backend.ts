import { defineBackend } from '@aws-amplify/backend';
import { auth } from '../packages/config/amplify/auth/resource';
import { data } from '../packages/config/amplify/data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
});