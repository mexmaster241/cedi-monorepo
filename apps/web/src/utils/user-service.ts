import { generateNewClabe } from '@/utils/clabe';

import { generateClient } from 'aws-amplify/api';
import { updateUserAttributes } from 'aws-amplify/auth';
import {Schema} from "config/amplify/data/resource"


const client = generateClient<Schema>();

export async function assignClabeToUser(userId: string, email: string, firstName: string, lastName: string): Promise<string> {
  let sequence;
  try {
    // First create sequence if it doesn't exist
    try {
      await client.models.ClabeSequence.create({
        id: 'main',
        lastSequence: 0
      }, {
        authMode: 'apiKey'
      });
    } catch (e) {
      console.log("Sequence already exists");
    }

    // Then get the sequence
    const sequenceResult = await client.models.ClabeSequence.get({ 
      id: 'main' 
    }, {
      authMode: 'apiKey'
    });
    sequence = sequenceResult.data?.lastSequence ?? 0;
    console.log("Current sequence:", sequence);

    // Generate new CLABE
    const newClabe = generateNewClabe(sequence);
    console.log("Generated CLABE:", newClabe);

    // Create user record with CLABE using apiKey
    const createResult = await client.models.User.create({
      id: userId,
      email: email,
      clabe: newClabe,
      givenName: firstName,
      familyName: lastName,
      owner: userId,
    }, {
      authMode: 'apiKey'
    });
    console.log("Create result:", createResult);

    return newClabe;
  } catch (error) {
    console.error("Error in assignClabeToUser:", error);
    throw error;
  }
}