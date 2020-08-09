import Rand from "./rng.js";

/*
 * takes an object of stats and a number of points to randomly delegate points to stats. any stat left at 0 gets +1.
 * @param stat {Object} - the object of stats to delegate points to
 * @param pts {number} - the amount of points to delegate
 * return {Object} - new stats with points
 */

export default function delegateStats(stats, pts) {
  let keys = Object.keys(stats);
  while (pts) {
    stats[keys[Rand.random(keys.length - 1)]]++;
    pts--;
  }
  for(let key in stats)
    if(stats[key] === 0) stats[key]++
  return stats;
}
