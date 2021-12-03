//Import expressJS module
const express = require('express');

//Create an express application object
const app = express()

app.set("view engine", "ejs")

//Create character1's object
var character1 = {
  name: 'Brook',
  race: 'Skeleton',
  profession: 'Musician',
  equipment: {
    head: {},
    chest: {},
    legs: {},
    arm_p: {},
    arm_s: {}
  },
  inventory: [],
  abilities: [],
  stats: {
    attack: 10,
    magic_attack: 20,
    defense: 5,
    magic_defense: 20,
    speed: 150,
    hp_current: 200,
    hp_max: 200
  },
  //This method searches for an item in the item list with this name and adds it to this character's inventory
  pickupItem: function(searchName) {
    for (var item of item_list) {
      console.log(item.name);
      if (item.name == searchName) {
        console.log("Found a match!");
        this.inventory.push(item)
        break;
      }
    }
  },
  //This method searches for a given slot and overwrites it with an empty object.
  unequipItem: function (slot) {
    for (var slotName in this.equipment) {
      console.log(slotName)
      if (slotName == slot) {
        console.log("Found item slot. Removing.");
        this.equipment.slotName = {};
        break;
      }
    }
  }
}

//This holds all possible items
var item_list = [{
    name: 'Hidden Cane Sword',
    slot: 'arm_p',
    bonuses: {
      attack: 55
    }
  },
  {
    name: `Soul King's Guitar`,
    slot: 'arm_s',
    bonuses: {
      magic_defense: 20
    }
  }
];


//Create a GET endpoint
app.get('/', (req, res) => {
  character1.pickupItem('Hidden Cane Sword', character1)
  character1.unequipItem('arm_p')
  res.render('profile', {sendData: character1})
});

//Start an HTTP listen server
app.listen(3000)
