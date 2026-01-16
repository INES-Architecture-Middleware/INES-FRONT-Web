const types = {
    'normal': {
        resistances: [],
        faiblesses: ['fighting'],
        immunites: ['ghost']
    },
    'fire': {
        resistances: ['fire', 'grass', 'ice', 'bug', 'fairy', 'steel'],
        faiblesses: ['water', 'ground', 'rock'],
        immunites: []
    },
    'water': {
        resistances: ['water', 'fire', 'ice', 'steel'],
        faiblesses: ['electric', 'grass'],
        immunites: []
    },
    'electric': {
        resistances: ['electric', 'flying', 'steel'],
        faiblesses: ['ground'],
        immunites: []
    },
    'grass': {
        resistances: ['water', 'electric', 'grass', 'ground'],
        faiblesses: ['fire', 'ice', 'poison', 'flying', 'bug'],
        immunites: []
    },
    'ice': {
        resistances: ['ice'],
        faiblesses: ['fire', 'fighting', 'rock', 'steel'],
        immunites: []
    },
    'fighting': {
        resistances: ['bug', 'rock', 'dark'],
        faiblesses: ['flying', 'psychic', 'fairy'],
        immunites: []
    },
    'poison': {
        resistances: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
        faiblesses: ['ground', 'psychic'],
        immunites: []
    },
    'ground': {
        resistances: ['poison', 'rock'],
        faiblesses: ['water', 'grass', 'ice'],
        immunites: ['electric']
    },
    'flying': {
        resistances: ['grass', 'fighting', 'bug'],
        faiblesses: ['electric', 'ice', 'rock'],
        immunites: ['ground']
    },
    'psychic': {
        resistances: ['fighting', 'psychic'],
        faiblesses: ['bug', 'ghost', 'dark'],
        immunites: []
    },
    'bug': {
        resistances: ['grass', 'fighting', 'ground'],
        faiblesses: ['fire', 'flying', 'rock'],
        immunites: []
    },
    'rock': {
        resistances: ['normal', 'fire', 'poison', 'flying'],
        faiblesses: ['water', 'grass', 'fighting', 'ground', 'steel'],
        immunites: []
    },
    'ghost': {
        resistances: ['poison', 'bug'],
        faiblesses: ['ghost', 'dark'],
        immunites: ['normal', 'fighting']
    },
    'dragon': {
        resistances: ['fire', 'water', 'electric', 'grass'],
        faiblesses: ['ice', 'dragon', 'fairy'],
        immunites: []
    },
    'dark': {
        resistances: ['ghost', 'dark'],
        faiblesses: ['fighting', 'bug', 'fairy'],
        immunites: ['psychic']
    },
    'steel': {
        resistances: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
        faiblesses: ['fire', 'fighting', 'ground'],
        immunites: ['poison']
    },
    'fairy': {
        resistances: ['fighting', 'bug', 'dark'],
        faiblesses: ['poison', 'steel'],
        immunites: ['dragon']
    }
};

function calculateResistances(typesPokemon, typeAttack) {
    let resistance = 1;
    typesPokemon.forEach(type => {
        if (types[type].immunites.includes(typeAttack)) {
            resistance = 0;
        } else if (types[type].resistances.includes(typeAttack)) {
            resistance *= 0.5;
        } else if (types[type].faiblesses.includes(typeAttack)) {
            resistance *= 2;
        }
    });

    return resistance;
}

const calculateDefenses = (typesPokemon, typeAttack) => {
    let defense = 0
    let immunized = false
    typesPokemon.forEach(type => {
        if(!immunized){
            if (types[type].immunites.includes(typeAttack)) {
                immunized = true
            } else if (types[type].resistances.includes(typeAttack)) {
                defense += 1;
            } else if (types[type].faiblesses.includes(typeAttack)) {
                defense -= 1;
            }
        }
    });
    
    return immunized ? 1 : defense 
}

const isCovered = (typesPokemon, typeDefense) => {
    let weakness = 0
    let immunized = false
    typesPokemon.forEach(type => {
        if(!immunized){
            if (types[typeDefense].immunites.includes(type)) {
                immunized = true
            } else if (types[typeDefense].faiblesses.includes(type)) {
                weakness += 1;
            }
        }
    });
    
    return (!immunized && weakness > 0) 
}

export {types, calculateResistances, calculateDefenses, isCovered}