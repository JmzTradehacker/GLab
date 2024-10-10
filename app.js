// Part 1: Humble Beginnings 
// Creating the adventurer object with properties and nested objects
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"]
        }
    },
    // Adding a roll method for dice rolls
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result; // Returning the roll result for later use
    }
};

// Part 2: Character and Adventurer Classes
// Creating the Character class with static properties and methods
class Character {
    static MAX_HEALTH = 100; // Static property for maximum health

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH; // Initialize with full health
        this.inventory = [];
    }

    // Method for rolling a dice
    roll(mod = 0) {
        return Math.floor(Math.random() * 20) + 1 + mod; // Random roll between 1 and 20
    }
}

// Adventurer class extending Character
class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"]; // Static roles array

    constructor(name, role) {
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}. Choose from: ${Adventurer.ROLES.join(", ")}`);
        }
        super(name);
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
    }

    // Method for attacking the opponent
    attack(opponent, damage) {
        opponent.health -= damage;
        return `${this.name} attacks ${opponent.name} and deals ${damage} damage!`;
    }
}

// Global variables to keep track of the duel state
let player, opponent;
let duelInProgress = false;

// Function to start a new duel
function startDuel() {
    player = new Adventurer("Aragon", "Fighter");
    opponent = new Adventurer("Legolas", "Fighter");
    duelInProgress = true;
    logMessage(`A duel has started between ${player.name} and ${opponent.name}!`);
    logMessage(`Click "Roll Dice" to take your turn.`);
}

// Function to handle the player's dice roll
function rollDice() {
    if (!duelInProgress) {
        logMessage("Start a duel first!");
        return;
    }

    const playerRoll = player.roll();
    const opponentRoll = opponent.roll();

    logMessage(`You rolled a ${playerRoll}.`);
    logMessage(`${opponent.name} rolled a ${opponentRoll}.`);

    if (playerRoll > opponentRoll) {
        const attackMessage = player.attack(opponent, 10); // Player attacks if roll is higher
        logMessage(attackMessage);
    } else if (playerRoll < opponentRoll) {
        const attackMessage = opponent.attack(player, 10); // Opponent attacks if roll is higher
        logMessage(attackMessage);
    } else {
        logMessage(`It's a tie! Both attacks were blocked!`);
    }

    logMessage(`Your health: ${player.health}, ${opponent.name}'s health: ${opponent.health}`);

    checkDuelStatus(); // Check the status of the duel to see if anyone has won
}

// Function to check the status of the duel
function checkDuelStatus() {
    if (player.health <= 0) {
        logMessage(`Game over! ${opponent.name} wins the duel!`);
        duelInProgress = false;
    } else if (opponent.health <= 0) {
        logMessage(`Congratulations! You defeated ${opponent.name} and won the duel!`);
        duelInProgress = false;
    } else {
        logMessage(`Click "Roll Dice" to take your next turn.`);
    }
}




// Function to display messages in the UI log area
function logMessage(message) {
    const logArea = document.getElementById('logArea');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    logArea.appendChild(newMessage);
    logArea.scrollTop = logArea.scrollHeight; // Scroll to the latest message
}