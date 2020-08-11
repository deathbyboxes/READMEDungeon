import Rand from "./rng.js";

/*
 * takes an object of stats and a number of points to randomly delegate points to stats. any stat left at 0 gets +1.
 * @param stat {Object} - the object of stats to delegate points to
 * @param pts {number} - the amount of points to delegate
 * return {Object} - new stats with points
 */

export default function statGen(stats) {
  for(let key in stats) {
    let min = stats[key] - Rand.random(3);
    let max = stats[key] + Rand.random(3);
    min = min <= 0 ? 1 : min;
    max = max >= 100 ? 100 : max;
    console.log(max, min)
    stats[key] = Rand.random(max, min)
  }
  return stats;
}
