import { effectTypes } from "../classes/generateEffect.js";

export const weapons = [
  {
    name: "Basic Sword",
    hands: 1,
    weight: 5,
    stats: {
      atk: 3,
      spd: 2,
    },
  },
  {
    name: "Hammer of Fortitude",
    hands: 2,
    weight: 1,
    stats: {
      atk: 8,
      spd: -2,
      def: 2,
    },
  },
  {
    name: "Pristine Dagger",
    weight: 2,
    hands: 1,
    stats: {
      atk: 2,
      spd: 10,
    },
  },
  {
    name: "Nightshade Dagger",
    weight: 2,
    hands: 1,
    stats: {
      atk: 2,
      spd: 3,
    },
    effects: [
      {
        name: "Poison",
        type: effectTypes.poison,
        interval: 500,
        duration: 5000,
        action: (subject) => {
          subject.damage(1);
        }
      },
    ],
  },
];
