// See: https://stackoverflow.com/questions/48039946/how-to-create-a-mapped-type-for-resolved-promises-in-typescript
/**
 * Gets the data type for the return value of a promise
 */
export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;
