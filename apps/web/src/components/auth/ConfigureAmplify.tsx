"use client"
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json" // This will work because we added config as a dependency

Amplify.configure(outputs, { ssr: true });

export default function ConfigureAmplifyClientSide() {
    return null;
}