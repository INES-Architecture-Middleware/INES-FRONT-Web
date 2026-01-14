const colorType = (_type) => {
    let type = _type.toLowerCase()
    if(type == 'normal' || type == 'normal') return "#ada594"
    else if(type == 'fighting' || type == 'combat') return "#a55239"
    else if(type == 'flying' || type == 'vol') return "#9cadf7"
    else if(type == 'poison' || type == 'poison') return "#b55aa5"
    else if(type == 'ground' || type == 'sol') return "#d6b55a"
    else if(type == 'rock' || type == 'roche') return "#9cadf7"
    else if(type == 'bug' || type == 'insecte') return "#adbd21"
    else if(type == 'ghost' || type == 'spectre') return "#c763b5"
    else if(type == 'steel' || type == 'acier') return "#adadc6"
    else if(type == 'fire' || type == 'feu') return "#f75231"
    else if(type == 'water' || type == 'eau') return "#399cff"
    else if(type == 'grass' || type == 'plante') return "#7bce52"
    else if(type == 'electric' || type == 'électrik') return "#ffc631"
    else if(type == 'dragon' || type == 'dragon') return "#8858f6"
    else if(type == 'psychic' || type == 'psy') return "#ff73a5"
    else if(type == 'ice' || type == 'glace') return "#5acee7"
    else if(type == 'fairy' || type == 'fée') return "#e09ae3"
    else if(type == 'dark' || type == 'ténèbres') return "#735a4a"
}

const colorResistance = (_resistance) => {
    if(_resistance === 1) return "#F9F9F9"
    else if(_resistance === 0.5) return "#7BCA6C"
    else if(_resistance === 0.25) return "#1A9037"
    else if(_resistance === 2) return "#E45E5E"
    else if(_resistance === 4) return "#973f36ff"
    else if(_resistance === 0) return "#929292"
}

const fourDigitsString = (str) => {
    let baseStr = String(str)
    let res = ""
    for(let i = 0; i < 4 - baseStr.length; i++) res += "0"
    res += baseStr
    return res
}

const calculateSumStats = (stats) => {
    let sum = 0
    for(const stat in stats){
        sum += stats[stat]
    }
    return sum
}

const calculateAveStats = (stats) => {
    let sum = 0
    let count = 0
    for(const stat in stats){
        sum += stats[stat]
        count += 1
    }
    return (sum/count).toFixed(2)
}

export {colorType, colorResistance, fourDigitsString, calculateSumStats, calculateAveStats}