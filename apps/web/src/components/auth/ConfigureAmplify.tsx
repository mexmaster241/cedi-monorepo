// components/ConfigureAmplify.tsx
import { Amplify } from "aws-amplify";
import { amplifyConfig } from "config"; // This will work because we added config as a dependency

Amplify.configure(amplifyConfig, { ssr: true });

export default function ConfigureAmplifyClientSide() {
    return null;
}