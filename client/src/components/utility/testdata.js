
import circleUrl from '../../svg/circle-pattern.svg'

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
        packIcon: 0,
        packId: 0,
        landReplace: 0,
        mainColor: 0,

        mainLandCard: {
            name: "Dunes",
            type: "Land",
            landReplace: "Desert",
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
export {testdata}