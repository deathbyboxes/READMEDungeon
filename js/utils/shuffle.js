/*
 * This function will randomly shuffle any array using the Fisher-Yates method.
 * This mutates the array in place and returns the newly shuffled array.
 * @param arr - the array you wish to shuffle
 */

export default function shuffle(arr) {
  let m = arr.length, t, i;
  while (m) {
    i = Math.floor(rng() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}
