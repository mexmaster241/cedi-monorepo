import { Amplify } from 'aws-amplify';
import { amplifyConfig } from 'config';
import { Slot } from 'expo-router';

Amplify.configure(amplifyConfig);

export default function App() {
  return <Slot />;
}