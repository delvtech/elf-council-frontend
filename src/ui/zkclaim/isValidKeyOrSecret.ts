export default function isValidKeyOrSecret(
  keyOrSecret: string | undefined,
): boolean {
  return keyOrSecret ? /0x\d{64}/.test(keyOrSecret) : false;
}
