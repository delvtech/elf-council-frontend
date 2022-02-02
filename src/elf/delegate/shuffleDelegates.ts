import { Delegate } from "src/elf-council-delegates/delegates";

/**
 * Randomizes the order of a given Delegate[]
 * @param arr Delegate[] input
 * @returns new Delegate[] with elements randomly shuffled
 */
export function shuffleDelegates(arr: Array<Delegate>): Array<Delegate> {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}
