
import { effectTypes } from "../classes/generateEffect.js";

export const potions = [
  {
    name: "Minor Health Vial",
    weight: 8,
    effects: [
      {
        name: "Heal",
        type: effectTypes.regenerate,
        interval: 1000,
        duration: 5000,
        action: (subject) => {
          subject.heal(2);
        },
      }
    ],
  },
  {
    name: "Major Health Vial",
    weight: 2,
    effects: [
      {
        name: "Heal",
        type: effectTypes.regenerate,
        interval: 1000,
        duration: 5000,
        action: (subject) => {
          subject.heal(10);
        },
      }
    ],
  },
];