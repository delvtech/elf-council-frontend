// PLACEHOLDER
// TODO: integrate a16z lib
export default function generateHash(...inputs: string[] | number[]): string {
  let hash = "0x";
  const hexStringChars = "0123456789ABCDEFabcdef";
  while (hash.length < 42) {
    hash += hexStringChars.charAt(Math.random() * hexStringChars.length);
  }
  return hash;
}
