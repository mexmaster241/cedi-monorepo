import { generateNewClabe, validateClabe } from '@/utils/clabe';
import { generateClient } from 'aws-amplify/api';
import { Schema } from "config/amplify/data/resource";

const client = generateClient<Schema>();

export async function assignClabeToUser(userId: string, email: string, firstName: string, lastName: string): Promise<string> {
  const MAX_ATTEMPTS = 10;
  
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      // Generate a new CLABE with our updated function
      const newClabe = generateNewClabe();
      
      // Verify this CLABE isn't already in use
      const existingUser = await client.models.User.list({
        filter: {
          clabe: {
            eq: newClabe
          }
        },
        authMode: 'apiKey'
      });

      if (existingUser.data.length > 0) {
        console.log(`CLABE collision detected, retrying... (attempt ${attempt + 1})`);
        continue;
      }

      // Create user record with the unique CLABE
      await client.models.User.create({
        id: userId,
        email: email,
        clabe: newClabe,
        givenName: firstName,
        familyName: lastName,
        owner: userId,
      }, {
        authMode: 'apiKey'
      });

      console.log("Created user with CLABE:", newClabe);
      return newClabe;

    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      if (attempt === MAX_ATTEMPTS - 1) {
        throw new Error('Failed to generate unique CLABE after maximum attempts');
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }

  throw new Error('Failed to assign CLABE');
}

// Optional: Add a validation function for existing CLABEs
export function isValidClabe(clabe: string): boolean {
  return validateClabe(clabe);
}