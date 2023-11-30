
import circleUrl from '../../svg/circle-pattern.svg'
import {CARDFUNC} from "../game/cardfunctions.js";
const {TRIGGER} = CARDFUNC;

const patterns = {
    circle: circleUrl,
    circleString: `<svg width="100%" height="100%"  xmlns="http://www.w3.org/2000/svg">
    <pattern id="pattern-circles" 
             x="0" 
             y="0" 
             width="20" 
             height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
       <circle id="pattern-circle" cx="10" cy="10" r="10" fill= "#f06d06" />
    </pattern>
    
    <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
  </svg>`,
}



const MainLands = [
    {
        name: "Sea",
        temp: "temperate",
        desc: "it's the sea wow",
        backColor: "0",
        mainColor: "0",
        mainPattern: "0",
        mainPatternShape: "0",
        mainPatternParam1: "0",
        mainPatternParam2: "0",
        mainPatternParam3: "0",
        mainPatternParam4: "0", 
        subColor: "0",
        subPattern: "0",
        subPatternShape: "0",
        subPatternParam1: "0",
        subPatternParam2: "0",
        subPatternParam3: "0",
        subPatternParam4: "0",
        effects: [],
    },
    {
        name: "Plains",
    },
    {
        name: "Desert",
        desc: "temp",
        temp: "hot",
        category: "land",
        cost: [0,0,0],
        types: ["basic","desert"],

        saltwater: 0,
        freshwater: 0,
        posX: -1,
        posY: -1,
        player: 0,
        effects:[
            {
                trigger:TRIGGER.everyTurn,
                numberSet:[CARDFUNC.returnAdjacentType,["desert"]],
                numberUse:[CARDFUNC.addSun,2], 
            }
        ],

        backColor: "#F9DCA0",

        mainColor: "#FF8F03",
        mainPattern: "0",
        mainPatternX: 0.05,
        mainPatternY: 0.05,
        mainPatternW: 0.6,
        mainPatternH: 0.1,
        mainPatternSkew: 0,
        mainPatternShape: "rectangle",
        mainPatternParam1:  0.15,
        mainPatternParam2: 0.04,
        mainPatternParam3: 0,
        mainPatternParam4: 0,  
        mainPatternParam5: 0,  
        mainPatternParam6: 0,  
        mainPatternParam7: 0,  
        mainPatternParam8: 0,  
        mainPatternSubShape: "circle",
        mainPatternSubParam1: 0.15,
        mainPatternSubParam2: 0.2,
        mainPatternSubParam3: 0.2,
        mainPatternSubParam4: 0.0, 
        mainPatternSubParam5: 0.0, 
        mainPatternSubParam6: 0.0, 
        mainPatternSubParam7: 0.0, 
        mainPatternSubParam8: 0.0, 

        subColor: "#ffffff",
        
        subPatternX: 0.05,
        subPatternY: 0.05,
        subPatternW: 0.6,
        subPatternH: 0.1,
        subPatternSkew: 0,
        subPattern: "none",
        subPatternShape: "none", 
        subPatternParam1: 0.15,
        subPatternParam2: 0.2,
        subPatternParam3: 0.2,
        subPatternParam4: 0.2,
        subPatternParam5: 0,
        subPatternParam6: 0,
        subPatternSubShape: "none",
        subPatternSubParam1: 0.15,
        subPatternSubParam2: 0.2,
        subPatternSubParam3: 0.2,
        subPatternSubParam4: 0.2,
        subPatternSubParam5: 0,
        subPatternSubParam6: 0,
        

    },
    {
        name: "Hills",
    },
    {
        name: "Wetlands",
    },
    {
        name: "Tundra",
    },
    
]

const MLAND = {
    "sea": 0,
    "plains": 1,
    "desert": 2,
    "hills": 3,
    "wetlands": 4,
    "tundra": 5,
}
const MIMPROV = {
    "forest": 0,
    "river" : 0,
    "lake" : 0,
}


const BasicPacks = [
    {
        packName: "The Sands",
        defaultPack: true,
        packIcon: 0,
        packId: 0,
        landReplace: 0,
        mainColor: 0,

        mainLandCard: {
            name: "Dunes",
            type: "Land",
            categories:["Desert"],
            landReplace: MLAND.desert,
            mainColor: "#FFFFFF",
            mainPattern: "circle",
            subColor: "#FFFFFF",
            subPattern: "circle",
            backColor: "#FFFFFF", 

        },

        finalCard: { 
            type: "Final",

        }, 

        packCards: [

        ],

    }
 
]

export {patterns}
export {MainLands}
export {MLAND}