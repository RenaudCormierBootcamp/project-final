
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

const shapeData = { 
    circle: {
        name:"circle",
        sizes:1,
        sizeNames:["radius"],
    },
    rectangle: {
        name:"rectangle",
        sizes:2,
        sizeNames:["width","height"],
    },
    triangle: {
        name:"triangle",
        sizes:6,
        sizeNames:["point1x","point1y","point2x","point2y","point3x","point3y"],
    },

}



const uniqueCardCategories =[ 
    "basic land",
    "basic replace",
    "great land",
]

const cardCategories = [
    "land",
    "land upgrade",
    "feature",  
]

const cardProperties = {
    "land":[{name:"land types"},{name:"saltwater"},{name:"freshwater"},{name:"temperature"}],
    "land upgrade":[],
    "feature":[],
    "basic land":[],
    "basic replace":[{name:"replacing"},{name:"land types"},{name:"saltwater"},{name:"freshwater"},{name:"temperature"}],
    "great land":[],
}

const landTypes = [
    "desert",
    "sea",
    "plains",
    "tundra",
    "hills", 
    "wetlands", 

    "forest",
    "mountain",
    "lake",
    "river", 
]
 


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
        category: "basic replace",
        cost: [0,0,0],
        types: ["basic","desert"],

        saltwater: 0,
        freshwater: 0,
        posX: -1,
        posY: -1,
        player: 0,
        //functional
        requirements:[{type:"none",values:[]}],
        effects:[
            {
                trigger:TRIGGER.everyTurn,
                numberSet:[CARDFUNC.returnAdjacentType,["desert"]],
                numberUse:[CARDFUNC.addSun,2], 
            }
        ],

        //visual cosmetic etc
        backColor: "#F9DCA0",
        patterns: [
            {
                offX: 0.05,
                offY: 0.05,
                width: 0.6,
                height: 0.1,
                skew:0,
                color:"#FF8F03",
                shapes: [{
                    type: "rectangle",
                    offX: 0,
                    offY: 0,
                    size: [0.15,0.04],
                },
                {
                    type:"circle",
                    offX: 0,
                    offY: 0,
                    size: [0.15],
                }
                ]            
            },

        ] 
        

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
            type: "land",
            categories:["desert"],
            landReplace: MLAND.desert,
            mainColor: "#FFFFFF",
            mainPattern: "circle",
            subColor: "#FFFFFF",
            subPattern: "circle",
            backColor: "#FFFFFF", 

        },

        finalCard: { 
            type: "great",

        }, 

        packCards: [

        ],

    }
 
]




const cardRequirements = {
    "land":{
            "none":[],
            "land types":[
             ["adjacent","nearby","anywhere"],landTypes,["equal","at least","less than"],0
            ], 
            "water":[
                ["adjacent","nearby","anywhere"],["saltwater","freshwater","any water"],["equal","at least","less than"],0
               ], 
    },
    "land upgrade":{
        "none":[],
        "land types":[
            ["targeted","adjacent","nearby","anywhere"],landTypes,["equal","at least","less than"],0
           ],
        "water":[
            ["adjacent","nearby","anywhere"],["saltwater","freshwater","any water"],["equal","at least","less than"],0
           ], 
    },
    "feature":{ 
            "none":[],
            "land types":[
                "targeted","adjacent","nearby","anywhere"    
               ],  
    },
    "basic replace":{
        "none":[],
    }
}

const CDAT = {
    CCAT:cardCategories, 
    UCAT:uniqueCardCategories,
    CREQUIRE:cardRequirements,
    CPROP:cardProperties,
    MLAND:MLAND,
    MIMPROV:MIMPROV,
    MainLands:MainLands,
    BasicPacks:BasicPacks,
}


export {CDAT}

export {patterns}
export {MainLands}
export {MLAND}
export {shapeData}
export {cardCategories}
export {landTypes}