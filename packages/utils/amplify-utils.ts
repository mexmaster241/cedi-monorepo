// utils/amplify-utils.ts
import { cookies } from "next/headers";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession } from "aws-amplify/auth/server";
import outputs from "config/amplify_outputs.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export async function AuthGetCurrentUserServer() {
  try {
    const cookieStore = await cookies();
    const session = await runWithAmplifyServerContext({
      nextServerContext: {
        cookies:  () => cookieStore,
      },
      operation: async (contextSpec) => await fetchAuthSession(contextSpec),
    });

    if (!session?.tokens?.accessToken) {
      return null;
    }

    return {
      username: session.tokens.accessToken.payload.username,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}