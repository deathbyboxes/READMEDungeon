## READMEDungeon

*live link will go here*

**READMEDungeon** is a text based, rogue-like, dungeon crawler built using vanilla javascript. Make your way through the procedurally generated dungeon to wield battle-axes, fight skeletons, collect treasures, and drink potions until you perish.

### Objective

Explore an infinite dungeon and hack your way through enemies as long as you can before your health reaches 0.

### How it works

Players will start out in a room within the dungeon. Text will display to depict the options you have available to you within the room. When you move to a new room, your **ROOM** counter is incremented by 1. This counter will act as your final score at the end of the game. 

Enemies can appear at random when entering a new room. Choosing to battle will enter a turn based fight sequence. Choosing to move to a new room without fighting will cause you to take automatic damage on your way out.

You cannot move back a room after you've left it. If you leave a room without opening a chest, the chest will be gone forever as you cannot move backwards.