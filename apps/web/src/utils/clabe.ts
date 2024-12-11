export function calculateVerificationDigit(clabeBase: string): number {
  const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7];
  
  const moduloSum = clabeBase.split('')
    .map((digit, index) => (parseInt(digit) * weights[index]) % 10)
    .reduce((sum, value) => sum + value, 0);
  
  const lastDigit = moduloSum % 10;
  return lastDigit === 0 ? 0 : 10 - lastDigit;
}

export function generateNewClabe(): string {
  // Fixed parts of the CLABE
  const institutionCode = "646";    // Institution code (3 digits)
  const plazaCode = "180";         // Plaza code (3 digits)
  const branchId = "5278";         // Branch identifier (4 digits)

  // Generate random 7 digits for the account number
  const randomAccount = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, '0');

  // Combine all parts except verification digit
  const clabeBase = `${institutionCode}${plazaCode}${branchId}${randomAccount}`;

  // Calculate and append verification digit
  const verificationDigit = calculateVerificationDigit(clabeBase);

  return `${clabeBase}${verificationDigit}`;
}

// Optional: Function to validate a CLABE
export function validateClabe(clabe: string): boolean {
  if (!/^\d{18}$/.test(clabe)) return false;
  
  // Verify the fixed part
  if (!clabe.startsWith('6461805278')) return false;
  
  const base = clabe.slice(0, -1);
  const providedDigit = parseInt(clabe.slice(-1));
  const calculatedDigit = calculateVerificationDigit(base);
  
  return providedDigit === calculatedDigit;
}