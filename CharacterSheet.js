// Universal Lock/Unlock Function
function toggleContainerLock(containerId) {
    const container = document.getElementById(containerId);
    const lockButton = container.querySelector(".lock-btn");
    const elements = container.querySelectorAll("input, button:not(.lock-btn)");

    // Determine if the container is locked or unlocked
    const isLocked = lockButton.textContent.includes("🔒");

    // Toggle lock state
    lockButton.textContent = isLocked ? "🔓 Unlock" : "🔒 Lock";

    elements.forEach(el => {
        el.disabled = !isLocked; // Enable or disable elements
        el.style.opacity = isLocked ? "1" : "0.5"; // Visual feedback for lock state
        el.style.pointerEvents = isLocked ? "auto" : "none"; // Prevent interaction when locked
    });
}


// ----- Open Popup for Selections -----
function openPopup(type) {
    const popup = document.getElementById("popup");
    const title = document.getElementById("popup-title");
    const options = document.getElementById("popup-options");
    options.innerHTML = ""; // Clear previous options

    let data = [];
    switch (type) {
        case "race":
            title.textContent = "Choose Race";
            data = Races;
            break;
        case "upbringing":
            title.textContent = "Choose Upbringing";
            data = Upbringings;
            break;
        case "background":
            title.textContent = "Choose Background";
            data = Backgrounds;
            break;
    }

    // Populate the popup with options
    data.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        li.style.cursor = "pointer";
        li.onclick = () => selectOption(type, item);
        options.appendChild(li);
    });

    popup.style.display = "flex"; // Show the popup
}

// ----- Close Popup -----
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// ----- Update Selected Option -----
function selectOption(type, item) {
    let detailsBox;

    switch (type) {
        case "race":
            detailsBox = document.getElementById("race-details");
            detailsBox.innerHTML = `
                <strong>${item.name}</strong><br>
                <em>${item.description || "No description provided."}</em><br>
                ${item.baseHP ? `<strong>Base HP:</strong> ${item.baseHP}<br>` : ""}
                ${item.hpGrowth ? `<strong>HP Growth:</strong> ${item.hpGrowth}<br>` : ""}
                ${item.mpGrowth ? `<strong>MP Growth:</strong> ${item.mpGrowth}<br>` : ""}
                ${item.movementSpeed ? `<strong>Movement Speed:</strong> ${item.movementSpeed}<br>` : ""}
                ${item.abilities ? `<strong>Abilities:</strong> ${item.abilities}` : ""}
            `;
            if (item.movementSpeed) {
                document.getElementById("movement-speed").value = item.movementSpeed;
            }
            break;

        case "upbringing":
            detailsBox = document.getElementById("upbringing-details");
            detailsBox.innerHTML = `
                <strong>${item.name}</strong><br>
                <strong>Stat Increase:</strong> ${item.statIncrease || "None"}<br>
                <strong>Proficiency:</strong> ${item.proficiency || "None"}<br>
                <em>${item.description || "No description provided."}</em>
            `;
            break;

        case "background":
            detailsBox = document.getElementById("background-details");
            detailsBox.innerHTML = `
                <strong>${item.name}</strong><br>
                <strong>Stat Increase:</strong> ${item.statIncrease || "None"}<br>
                <strong>Proficiency:</strong> ${item.proficiency || "None"}<br>
                <em>${item.description || "No description provided."}</em>
            `;
            break;
    }

    closePopup();
}

// ----- Update Ability Modifiers -----
function updateAbilityModifiers() {
    const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

    abilities.forEach(ability => {
        const scoreInput = document.getElementById(`${ability}-score`);
        const modifierDisplay = document.getElementById(`${ability}-modifier`);

        const score = parseInt(scoreInput.value) || 8; // Default score starts at 8
        const modifier = Math.floor((score - 10) / 2); // D&D Modifier formula

        modifierDisplay.textContent = `Modifier: ${modifier >= 0 ? `+${modifier}` : modifier}`;
    });

    updateSkills(); // Refresh skills when ability modifiers update
}

// ----- Update Skills Based on Ability Modifiers -----
function updateSkills() {
    const proficiencyBonus = parseInt(document.getElementById("proficiency-bonus").value) || 2;

    const skills = [
        { id: "acrobatics", ability: "DEX" },
        { id: "animal-handling", ability: "WIS" },
        { id: "arcana", ability: "INT" },
        { id: "athletics", ability: "STR" },
        { id: "deception", ability: "CHA" },
        { id: "history", ability: "INT" },
        { id: "insight", ability: "WIS" },
        { id: "intimidation", ability: "CHA" },
        { id: "investigation", ability: "INT" },
        { id: "medicine", ability: "WIS" },
        { id: "nature", ability: "INT" },
        { id: "perception", ability: "WIS" },
        { id: "performance", ability: "CHA" },
        { id: "persuasion", ability: "CHA" },
        { id: "religion", ability: "INT" },
        { id: "sleight-of-hand", ability: "DEX" },
        { id: "stealth", ability: "DEX" },
        { id: "survival", ability: "WIS" }
    ];

    skills.forEach(skill => {
        const abilityScoreInput = document.getElementById(`${skill.ability}-score`);
        const skillInput = document.getElementById(skill.id);
        const skillButton = document.getElementById(`${skill.id}-button`);

        if (!abilityScoreInput || !skillInput || !skillButton) return;

        // Correct Ability Modifier Calculation
        const abilityMod = Math.floor((parseInt(abilityScoreInput.value || 8) - 10) / 2); // Modifier = (Score - 10) / 2
        let total = abilityMod;

        // Add Proficiency and Expertise Bonuses
        if (skillButton.classList.contains("proficient")) total += proficiencyBonus;
        if (skillButton.classList.contains("expertise")) total += proficiencyBonus * 2;

        skillInput.value = total; // Update skill input value
    });
}


// ----- Toggle Proficiency and Expertise for Skills -----
function toggleSkill(skillId) {
    const button = document.getElementById(`${skillId}-button`);
    const proficiencyBonus = parseInt(document.getElementById("proficiency-bonus").value) || 2;

    if (button.classList.contains("proficient")) {
        // Toggle to Expertise
        button.classList.remove("proficient");
        button.classList.add("expertise");
        button.style.backgroundColor = "#ffecb3"; // Yellow for Expertise
    } else if (button.classList.contains("expertise")) {
        // Remove Proficiency/Expertise
        button.classList.remove("expertise");
        button.style.backgroundColor = ""; // Reset
    } else {
        // Add Proficiency
        button.classList.add("proficient");
        button.style.backgroundColor = "#b2fab4"; // Green for Proficiency
    }

    updateSkills(); // Recalculate skill value dynamically
}



// ----- Update Proficiency Bonus Based on Level -----
function updateProficiencyBonus() {
    const level = parseInt(document.getElementById("level").value) || 1;
    const proficiencyBonus = Math.ceil(level / 4) + 1; // D&D Scaling formula
    document.getElementById("proficiency-bonus").value = proficiencyBonus;

    updateSkills(); // Refresh skills when proficiency bonus changes
}

// ----- Update Initiative -----
function updateInitiative() {
    const dexScore = parseInt(document.getElementById("DEX-score").value) || 8; // Default starts at 8
    const dexModifier = Math.floor((dexScore - 10) / 2);
    const initiativeInput = document.getElementById("initiative");

    // Sync only when Initiative is locked
    if (initiativeInput.disabled) {
        initiativeInput.value = dexModifier; // Direct sync with DEX Modifier
    }
}

// ----- Toggle Initiative Lock/Unlock -----
function toggleInitiativeLock() {
    const initiativeInput = document.getElementById("initiative");
    const lockButton = document.querySelector("#initiative + .lock-btn");

    const isLocked = initiativeInput.disabled;
    initiativeInput.disabled = !isLocked;
    lockButton.textContent = isLocked ? "🔒" : "🔓";

    if (!isLocked) {
        // Re-sync Initiative with DEX Modifier when re-locked
        updateInitiative();
    }
}

// ----- Initialize on Page Load -----
document.addEventListener("DOMContentLoaded", () => {
    // Initial updates for Proficiency, Ability Modifiers, and Initiative
    updateProficiencyBonus();
    updateAbilityModifiers();
    updateInitiative();

    // Event listener for dynamic DEX changes
    document.getElementById("DEX-score").addEventListener("input", () => {
        updateAbilityModifiers();
        updateInitiative();
    });

    // Event listener for Level changes to recalculate Proficiency Bonus
    document.getElementById("level").addEventListener("input", updateProficiencyBonus);
});


// ----- Update Proficiency Bonus Based on Level -----
function updateProficiencyBonus() {
    const level = parseInt(document.getElementById("level").value) || 1;
    const proficiencyBonus = Math.ceil(level / 4) + 1; // D&D Scaling formula
    document.getElementById("proficiency-bonus").value = proficiencyBonus;

    updateSkills(); // Refresh skills when proficiency bonus changes
}

// ----- Update Initiative -----
function updateInitiative() {
    const dexScore = parseInt(document.getElementById("DEX-score").value) || 8; // Default starts at 8
    const dexModifier = Math.floor((dexScore - 10) / 2);

    // Always sync Initiative directly with DEX Modifier
    document.getElementById("initiative").value = dexModifier;
}

// ----- Initialize on Page Load -----
document.addEventListener("DOMContentLoaded", () => {
    // Initial updates for Proficiency, Ability Modifiers, and Initiative
    updateProficiencyBonus();
    updateAbilityModifiers();
    updateInitiative();

    // Event listener for dynamic DEX changes
    document.getElementById("DEX-score").addEventListener("input", () => {
        updateAbilityModifiers();
        updateInitiative();
    });

    // Event listener for Level changes to recalculate Proficiency Bonus
    document.getElementById("level").addEventListener("input", updateProficiencyBonus);
});


// ----- Add Items to List -----
function addItem(type) {
    const name = prompt(`Enter the name of the ${type}:`);
    const description = prompt(`Enter the description for "${name}":`);
    if (!name || !description) return;

    const list = document.getElementById(`${type}-list`);
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
        <span>${name}</span>
        <button class="delete-btn" onclick="deleteItem(this)">✕</button>
    `;
    li.title = description; // Tooltip for the description
    list.appendChild(li);
}

// ----- Delete Items from List -----
function deleteItem(button) {
    button.parentElement.remove();
}

// ----- Switch Between Tabs -----
function switchTab(tabId) {
    const tabs = ["actions", "bonus-actions", "reactions"];
    tabs.forEach(tab => {
        const container = document.getElementById(`${tab}-container`);
        const tabButton = document.getElementById(`${tab}-tab`);

        if (tab === tabId) {
            container.style.display = "block"; // Show selected tab
            tabButton.classList.add("active-tab");
        } else {
            container.style.display = "none"; // Hide others
            tabButton.classList.remove("active-tab");
        }
    });
}

// ----- Initialize Tabs -----
document.addEventListener("DOMContentLoaded", () => {
    // Default to Actions Tab
    switchTab("actions");
});


// ----- Initialize Lists -----
document.addEventListener("DOMContentLoaded", () => {
    const actionTypes = ["abilities", "actions", "bonus-actions", "reactions"];

    actionTypes.forEach(type => {
        const list = document.getElementById(`${type}-list`);
        list.addEventListener("click", event => {
            if (event.target.tagName === "LI") {
                alert(event.target.title); // Show description on click
            }
        });
    });
});

// ----- Save Character Data -----
function saveCharacter() {
    const data = {
        name: document.getElementById("character-name").value,
        pronouns: document.getElementById("character-pronouns").value,
        level: document.getElementById("level").value,
        race: document.getElementById("race-details").innerHTML,
        upbringing: document.getElementById("upbringing-details").innerHTML,
        background: document.getElementById("background-details").innerHTML,
        derivedStats: {
            armorClass: document.getElementById("armor-class").value,
            initiative: document.getElementById("initiative").value,
            proficiencyBonus: document.getElementById("proficiency-bonus").value
        },
        abilityScores: {
            STR: document.getElementById("STR-score").value,
            DEX: document.getElementById("DEX-score").value,
            CON: document.getElementById("CON-score").value,
            INT: document.getElementById("INT-score").value,
            WIS: document.getElementById("WIS-score").value,
            CHA: document.getElementById("CHA-score").value
        },
        skills: Array.from(document.querySelectorAll(".skill-item")).map(skill => ({
            id: skill.querySelector("input").id,
            value: skill.querySelector("input").value,
            proficiency: skill.querySelector("button").classList.contains("proficient"),
            expertise: skill.querySelector("button").classList.contains("expertise")
        })),
        abilities: Array.from(document.getElementById("abilities-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        })),
        actions: Array.from(document.getElementById("actions-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        })),
        bonusActions: Array.from(document.getElementById("bonus-actions-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        })),
        reactions: Array.from(document.getElementById("reactions-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        }))
    };

    localStorage.setItem("characterData", JSON.stringify(data));
    alert("Character saved!");
}

// ----- Load Character Data -----
function loadCharacter() {
    const data = JSON.parse(localStorage.getItem("characterData"));

    if (!data) {
        alert("No saved data found. Starting in reset state.");
        resetCharacter();
        return;
    }

    // Populate fields with saved data
    document.getElementById("character-name").value = data.name || "";
    document.getElementById("character-pronouns").value = data.pronouns || "";
    document.getElementById("level").value = data.level || 1;

    // Populate character details
    document.getElementById("race-details").innerHTML = data.race || "No race selected";
    document.getElementById("upbringing-details").innerHTML = data.upbringing || "No upbringing selected";
    document.getElementById("background-details").innerHTML = data.background || "No background selected";

    // Populate derived stats
    document.getElementById("armor-class").value = data.derivedStats.armorClass || 10;
    document.getElementById("initiative").value = data.derivedStats.initiative || 0;
    document.getElementById("proficiency-bonus").value = data.derivedStats.proficiencyBonus || 2;

    // Populate ability scores
    Object.entries(data.abilityScores).forEach(([ability, value]) => {
        document.getElementById(`${ability}-score`).value = value;
    });

    // Populate skills
    data.skills.forEach(skill => {
        const skillInput = document.getElementById(skill.id);
        const skillButton = document.getElementById(`${skill.id}-button`);
        if (skillInput) skillInput.value = skill.value;

        skillButton.classList.toggle("proficient", skill.proficiency);
        skillButton.classList.toggle("expertise", skill.expertise);
        skillButton.style.backgroundColor = skill.expertise
            ? "#ffecb3"
            : skill.proficiency
            ? "#b2fab4"
            : "";
    });

    // Populate abilities
    const abilitiesList = document.getElementById("abilities-list");
    abilitiesList.innerHTML = "";
    data.abilities.forEach(ability => {
        const li = document.createElement("li");
        li.className = "list-item";
        li.title = ability.description;
        li.innerHTML = `
            <span>${ability.name}</span>
            <button class="delete-btn" onclick="deleteItem(this)">✕</button>
        `;
        abilitiesList.appendChild(li);
    });

    // Populate actions, bonus actions, and reactions
    ["actions", "bonusActions", "reactions"].forEach(type => {
        const list = document.getElementById(`${type.replace(/([A-Z])/g, "-$1").toLowerCase()}-list`);
        list.innerHTML = "";
        data[type].forEach(item => {
            const li = document.createElement("li");
            li.className = "list-item";
            li.title = item.description;
            li.innerHTML = `
                <span>${item.name}</span>
                <button class="delete-btn" onclick="deleteItem(this)">✕</button>
            `;
            list.appendChild(li);
        });
    });

    alert("Character loaded!");
}

// ----- Save Character Data -----
function saveCharacter() {
    const data = {
        name: document.getElementById("character-name").value,
        pronouns: document.getElementById("character-pronouns").value,
        level: document.getElementById("level").value,
        race: document.getElementById("race-details").innerHTML,
        upbringing: document.getElementById("upbringing-details").innerHTML,
        background: document.getElementById("background-details").innerHTML,
        derivedStats: {
            armorClass: document.getElementById("armor-class").value,
            initiative: document.getElementById("initiative").value,
            proficiencyBonus: document.getElementById("proficiency-bonus").value,
            hp: document.getElementById("hp").value,
            maxHp: document.getElementById("max-hp").value,
            mp: document.getElementById("mp").value,
            maxMp: document.getElementById("max-mp").value
        },
        abilityScores: {
            STR: document.getElementById("STR-score").value,
            DEX: document.getElementById("DEX-score").value,
            CON: document.getElementById("CON-score").value,
            INT: document.getElementById("INT-score").value,
            WIS: document.getElementById("WIS-score").value,
            CHA: document.getElementById("CHA-score").value
        },
        skills: Array.from(document.querySelectorAll(".skill-item")).map(skill => ({
            id: skill.querySelector("input").id,
            value: skill.querySelector("input").value,
            proficiency: skill.querySelector("button").classList.contains("proficient"),
            expertise: skill.querySelector("button").classList.contains("expertise")
        })),
        abilities: Array.from(document.getElementById("abilities-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        })),
        actions: Array.from(document.getElementById("actions-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        })),
        bonusActions: Array.from(document.getElementById("bonus-actions-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        })),
        reactions: Array.from(document.getElementById("reactions-list").children).map(li => ({
            name: li.querySelector("span").textContent,
            description: li.title
        }))
    };

    localStorage.setItem("characterData", JSON.stringify(data));
    alert("Character saved!");
}

// ----- Load Character Data -----
function loadCharacter() {
    const data = JSON.parse(localStorage.getItem("characterData"));

    if (!data) {
        alert("No saved data found. Starting in reset state.");
        resetCharacter();
        return;
    }

    // Populate fields with saved data
    document.getElementById("character-name").value = data.name || "";
    document.getElementById("character-pronouns").value = data.pronouns || "";
    document.getElementById("level").value = data.level || 1;

    // Populate character details
    document.getElementById("race-details").innerHTML = data.race || "No race selected";
    document.getElementById("upbringing-details").innerHTML = data.upbringing || "No upbringing selected";
    document.getElementById("background-details").innerHTML = data.background || "No background selected";

    // Populate derived stats
    document.getElementById("armor-class").value = data.derivedStats.armorClass || 10;
    document.getElementById("initiative").value = data.derivedStats.initiative || 0;
    document.getElementById("proficiency-bonus").value = data.derivedStats.proficiencyBonus || 2;
    document.getElementById("hp").value = data.derivedStats.hp || 0;
    document.getElementById("max-hp").value = data.derivedStats.maxHp || 0;
    document.getElementById("mp").value = data.derivedStats.mp || 0;
    document.getElementById("max-mp").value = data.derivedStats.maxMp || 0;

    // Populate ability scores
    Object.entries(data.abilityScores).forEach(([ability, value]) => {
        document.getElementById(`${ability}-score`).value = value;
    });

    // Populate skills
    data.skills.forEach(skill => {
        const skillInput = document.getElementById(skill.id);
        const skillButton = document.getElementById(`${skill.id}-button`);
        if (skillInput) skillInput.value = skill.value;

        skillButton.classList.toggle("proficient", skill.proficiency);
        skillButton.classList.toggle("expertise", skill.expertise);
        skillButton.style.backgroundColor = skill.expertise
            ? "#ffecb3"
            : skill.proficiency
            ? "#b2fab4"
            : "";
    });

    // Populate abilities
    const abilitiesList = document.getElementById("abilities-list");
    abilitiesList.innerHTML = "";
    data.abilities.forEach(ability => {
        const li = document.createElement("li");
        li.className = "list-item";
        li.title = ability.description;
        li.innerHTML = `
            <span>${ability.name}</span>
            <button class="delete-btn" onclick="deleteItem(this)">✕</button>
        `;
        abilitiesList.appendChild(li);
    });

    // Populate actions, bonus actions, and reactions
    ["actions", "bonusActions", "reactions"].forEach(type => {
        const list = document.getElementById(`${type.replace(/([A-Z])/g, "-$1").toLowerCase()}-list`);
        list.innerHTML = "";
        data[type].forEach(item => {
            const li = document.createElement("li");
            li.className = "list-item";
            li.title = item.description;
            li.innerHTML = `
                <span>${item.name}</span>
                <button class="delete-btn" onclick="deleteItem(this)">✕</button>
            `;
            list.appendChild(li);
        });
    });

    alert("Character loaded!");
}

// ----- Reset Character Data -----
function resetCharacter() {
    // Reset fields to default values
    document.getElementById("character-name").value = "";
    document.getElementById("character-pronouns").value = "";
    document.getElementById("level").value = 1;

    // Reset character details
    document.getElementById("race-details").innerHTML = "No race selected";
    document.getElementById("upbringing-details").innerHTML = "No upbringing selected";
    document.getElementById("background-details").innerHTML = "No background selected";

    // Reset derived stats
    document.getElementById("armor-class").value = 10;
    document.getElementById("initiative").value = 0;
    document.getElementById("proficiency-bonus").value = 2;
    document.getElementById("hp").value = 0;
    document.getElementById("max-hp").value = 0;
    document.getElementById("mp").value = 0;
    document.getElementById("max-mp").value = 0;

    // Reset ability scores
    ["STR", "DEX", "CON", "INT", "WIS", "CHA"].forEach(ability => {
        document.getElementById(`${ability}-score`).value = 8;
    });

    // Clear skills
    document.querySelectorAll(".skill-item input").forEach(input => {
        input.value = 0;
    });
    document.querySelectorAll(".skill-item button").forEach(button => {
        button.classList.remove("proficient", "expertise");
        button.style.backgroundColor = "";
    });

    // Clear lists
    ["abilities-list", "actions-list", "bonus-actions-list", "reactions-list"].forEach(listId => {
        document.getElementById(listId).innerHTML = "";
    });

    alert("Character reset!");
}

// ----- Initialize Scores on Page Load -----
document.addEventListener("DOMContentLoaded", () => {
    resetCharacter(); // Always start in reset state
    document.getElementById("save-button").addEventListener("click", saveCharacter);
    document.getElementById("load-button").addEventListener("click", loadCharacter);
    document.getElementById("reset-button").addEventListener("click", resetCharacter);

    // Dynamic updates
    document.getElementById("DEX-score").addEventListener("input", updateInitiative);
    document.getElementById("level").addEventListener("input", updateProficiencyBonus);
});
