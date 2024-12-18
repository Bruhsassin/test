const Races = [
    // ===== Common Races =====
    {
        category: "Common",
        name: "Human",
        description: "Humans are versatile and adaptable, excelling in many areas.",
        baseHP: 12,
        hpGrowth: "1d8",
        mpGrowth: "1d6",
        abilities: "Versatile: Gain +1 to all ability scores and one extra skill proficiency.",
        movementSpeed: 30
    },
    {
        category: "Common",
        name: "Elf",
        description: "Elves are graceful and perceptive, with a natural affinity for magic and nature.",
        baseHP: 10,
        hpGrowth: "1d6",
        mpGrowth: "1d10",
        abilities: "Graceful: Advantage on Dexterity saving throws and proficiency in Perception.",
        movementSpeed: 35
    },
    {
        category: "Common",
        name: "Dwarf",
        description: "Dwarves are sturdy and resilient, known for their toughness and craftsmanship.",
        baseHP: 14,
        hpGrowth: "1d10",
        mpGrowth: "1d4",
        abilities: "Resilient: Resistance to poison damage and proficiency with axes.",
        movementSpeed: 25
    },

    // ===== Uncommon Races =====
    {
        category: "Uncommon",
        name: "Half-Orc",
        description: "Half-Orcs are strong and relentless, known for their tenacity in battle.",
        baseHP: 16,
        hpGrowth: "1d10",
        mpGrowth: "1d4",
        abilities: "Relentless: When reduced to 0 HP, drop to 1 HP once per long rest.",
        movementSpeed: 30
    },
    {
        category: "Uncommon",
        name: "Gnome",
        description: "Gnomes are clever and curious, excelling in intellect and magical arts.",
        baseHP: 8,
        hpGrowth: "1d4",
        mpGrowth: "1d12",
        abilities: "Clever: Advantage on Intelligence-based saving throws.",
        movementSpeed: 25
    },
    {
        category: "Uncommon",
        name: "Halfling",
        description: "Halflings are small and nimble, known for their luck and stealth.",
        baseHP: 10,
        hpGrowth: "1d6",
        mpGrowth: "1d8",
        abilities: "Lucky: Re-roll 1s on attack rolls, ability checks, or saving throws.",
        movementSpeed: 25
    },
    {
        category: "Uncommon",
        name: "Goliath",
        description: "Goliaths are strong and hardy, excelling in physical endurance.",
        baseHP: 16,
        hpGrowth: "1d10",
        mpGrowth: "1d4",
        abilities: "Stone's Endurance: Reduce incoming damage by 1d12 once per short rest.",
        movementSpeed: 30
    },

    // ===== Rare Races =====
    {
        category: "Rare",
        name: "Dragonborn",
        description: "Dragonborn are descendants of dragons, wielding elemental breath weapons.",
        baseHP: 15,
        hpGrowth: "1d8",
        mpGrowth: "1d6",
        abilities: "Draconic Ancestry: Gain a breath weapon (element based on ancestry).",
        movementSpeed: 30
    },
    {
        category: "Rare",
        name: "Tiefling",
        description: "Tieflings are touched by fiendish ancestry, with infernal powers and resilience.",
        baseHP: 11,
        hpGrowth: "1d6",
        mpGrowth: "1d10",
        abilities: "Infernal Legacy: Gain resistance to fire damage and innate spellcasting.",
        movementSpeed: 30
    },
    {
        category: "Rare",
        name: "Aasimar",
        description: "Aasimars are celestial beings, embodying radiant power and healing light.",
        baseHP: 12,
        hpGrowth: "1d8",
        mpGrowth: "1d10",
        abilities: "Divine Light: Once per day, unleash radiant damage and healing.",
        movementSpeed: 30
    }
];
