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




// Function to display messages in the UI log area
function logMessage(message) {
    const logArea = document.getElementById('logArea');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    logArea.appendChild(newMessage);
    logArea.scrollTop = logArea.scrollHeight; // Scroll to the latest message
}