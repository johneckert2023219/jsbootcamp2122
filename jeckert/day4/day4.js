//Import expressJS module
const express = require('express');

//Create an express application object
const app = express()

app.set("view engine", "ejs")

//Create character's object
class Character {
  constructor(name, race, profession) {
    this.id = characterList.length + 1000;
    this.name = name
    this.race = race
    this.profession = profession
    this.equipment = {
      head: {},
      chest: {},
      legs: {},
      arm_p: {},
      arm_s: {}
    }
    this.inventory = []
    this.abilities = []
    this.stats = {
      attack: 10,
      defense: 5,
      speed: 150,
      hp_current: 200,
      hp_max: 200
    }

    //This method searches for an item in the item list with this name and adds it to this character's inventory
    this.pickupItem = function(searchName) {
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
      this.unequipItem = function(slot) {
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
}

var characterList = []
characterList.push(character = new Character('Brook', 'Skeleton', 'Musician'))
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

characterList[0].pickupItem('Hidden Cane Sword');
characterList[0].unequipItem('arm_p');

//Create a GET endpoint
app.get('/profile/:characterid', (req, res) => {
  var foundProfile = characterList.find(character => character.id == req.params.characterid)

  if (foundProfile) {
    //Render a template called 'profile' from the 'views' folder
    //And send it a variable called "sendData"
    res.render('profile', {
        sendData: foundProfile
      })
    } else {
      res.redirect('/new')
    }
});

//This endpoint creates a new character
app.get('/new', (req, res) => {
  characterList.push(character = new Character('Franky', 'Cyborg', 'Shipwright'))
  res.redirect('/profile/' + characterList[characterList.length - 1].id)
});

//Start an HTTP listen server
app.listen(3000)
