# BedrockDB
*Not to be confused with [BedrockDB](https://bedrockdb.com/)*

A simple database for MCBE add-ons (scripts)

## Requirements

You will need this on your manifest's `dependency`

```json
{
    "module_name": "@minecraft/server",
    "version": "2.3.0"
}

```

## Usage

``` js
import { BedrockDB } from "./bedrockDB.js";

const db = new BedrockDB("myDatabase");

// Set and get values
db.set("key", "value");
const value = db.get("key");
console.log(value); // Outputs: value

// Update values
db.set("key", "newValue");
console.log(db.get("key")); // Outputs: newValue

// Check if the key exists
db.has("key"); // Outputs: true

// Delete values
db.delete("key");
console.log(db.get("key")); // Outputs: undefined

// Clear the database
db.clear(); // Outputs: void

```

## Features
- Simple key-value storage
- Persistent data storage (per world)
- Lightweight and easy to use
- Supports basic data types (string, number, boolean, object, array)

## Installation
1. Download the `bedrockDB.js` file from the repository.
2. Place it in your MCBE add-on `scripts/` folder.
3. Import and use it in your scripts as shown in the usage example.


