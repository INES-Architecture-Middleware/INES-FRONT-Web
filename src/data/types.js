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

function calculerResistance(typesPokemon, typeAttaque) {
    let resistance = 1;
    typesPokemon.forEach(type => {
        if (types[type].immunites.includes(typeAttaque)) {
            resistance = 0;
        } else if (types[type].resistances.includes(typeAttaque)) {
            resistance *= 0.5;
        } else if (types[type].faiblesses.includes(typeAttaque)) {
            resistance *= 2;
        }
    });

    return resistance;
}

export {types, calculerResistance}