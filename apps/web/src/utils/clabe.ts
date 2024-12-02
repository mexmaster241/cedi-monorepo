export function calculateVerificationDigit(clabeBase: string): number {
  // Vector de ponderación fijo
  const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7];
  
  // Multiplicar cada dígito por su peso y obtener módulo 10
  const moduloSum = clabeBase.split('')
    .map((digit, index) => (parseInt(digit) * weights[index]) % 10)
    .reduce((sum, value) => sum + value, 0);
  
  // Obtener el último dígito de la suma
  const lastDigit = moduloSum % 10;
  
  // Restar de 10 para obtener el dígito verificador
  return lastDigit === 0 ? 0 : 10 - lastDigit;
}

export function generateNewClabe(sequence: number): string {
  // Base fija CEDI
  const baseClabe = "64618052780000000";
  
  // Reemplazar el último dígito con el número secuencial
  const clabeWithSequence = baseClabe.slice(0, -1) + sequence.toString();
  
  // Calcular el dígito verificador
  const verificationDigit = calculateVerificationDigit(clabeWithSequence);
  
  // Retornar la CLABE completa
  return `${clabeWithSequence}${verificationDigit}`;
}