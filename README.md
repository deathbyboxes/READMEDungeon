## READMEDungeon

*live link will go here*

**READMEDungeon** is a web-based, rogue-like, dungeon crawler built using vanilla javascript ES6. Make your way through the procedurally generated dungeon to wield battle-axes, fight skeletons, collect treasures, and drink potions until you perish.

### Objective

Explore an infinite dungeon and hack your way through enemies as long as you can before your health reaches 0.

### How it works

Players will start out in a room within the dungeon. You will be given the option to interact with objects in a specific order. You must resolve the object at the front of the line before you can access any subsequent objects in the room. Stay in a room for too long and a poison gas will begin to fill the room, damaging your health by small increments. However You will always have the option to leave the room for the next at any point, if you're willing to leave behind potential loot. Leaving a room will restart the gas timer, giving you a few moments of fresh air before it starts again.

Players have the ability to *sense* what contents are in adjacent rooms. Doing this takes time, however, as you must wait a cool-down period before you can make another sense action. Players can only sense one item in one room at a time. Rooms can have up to 4 contents in it at any given time. Contents include: Enemies, Chests, Items, Weaponry, and Armor.

You cannot move back a room after you've left it. If you leave a room without opening a chest or picking up an item, they be gone forever as you cannot move backwards.