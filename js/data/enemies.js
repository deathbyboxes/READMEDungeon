import { effectTypes } from "../classes/generateEffect.js";

export const enemies = [
  {
    name: "Skeleton Soldier",
    weight: 16,
    stats: {
      hp: 20,
      atk: 5,
      spd: 20,
    },
  },
  {
    name: "Glib Glob",
    weight: 20,
    stats: {
      hp: 12,
      atk: 1,
      spd: 75,
    },
  },
  {
    name: "Ogre",
    weight: 10,
    stats: {
      hp: 50,
      atk: 15,
      spd: 5,
    },
  },
  {
    name: "Giant Rat",
    weight: 17,
    stats: {
      hp: 50,
      atk: 2,
      spd: 19,
    },
  },
  {
    name: "Salve Bug",
    weight: 8,
    stats: {
      hp: 10,
      atk: 5,
      spd: 75,
    },
    effects: {
      onDestroy: {
        name: "Salve",
        type: effectTypes.regenerate,
        duration: 1000,
        action: (subject) => {
          subject.heal(5);
        },
      }
    },
  },
];
