// keith's test file

// * below tests out the equipping and unequipping of weapons and armor
// * just uncomment and run locally. view information in the console logs

const p = new Player("Keith", {hp: 100, atk: 2, spd: 2, def: 0});
const e = Enemy();
console.log(e)
// const sword = new Item("Sword", "weapon", {atk: 10, spd: 3});
// const helmet = new Item("Helmet", "armor", {def: 5});

e.startAttackTimer(p);
setInterval(() => {
  p.attack(e);
}, 5000 - (p._stats.spd * 500));