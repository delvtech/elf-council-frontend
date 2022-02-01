export default async function generateHashSeed(): Promise<string | undefined> {
  if (typeof window !== "undefined") {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"],
    );
    const radix = 16;
    const buffer = await crypto.subtle.exportKey("raw", key);
    return `0x${Array.from(new Uint8Array(buffer))
      .map((int) => int.toString(radix).padStart(2, "0"))
      .join("")}`;
  }
}
