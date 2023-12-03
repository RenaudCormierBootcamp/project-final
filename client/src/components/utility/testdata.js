
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

const featureTypes = [
    "other",
    "forest",
    "mountain",
    "lake",
    "river",
]

const cardCategories = [
    "land",
    "land upgrade",
    "feature",  
]

const uniqueCardCategories =[ 
    "basic land",
    "basic replace",
    "great land",
]



const cardProperties = {
    "land":[{name:"land types",choices:[...landTypes]},{name:"saltwater",choices:[0,1,2,3]},{name:"freshwater",choices:[0,1,2,3]},{name:"temperature",choices:["temperate","hot","cold"]}],
    "land upgrade":[{name:"land types",choices:[...landTypes]},{name:"saltwater",choices:[0,1,2,3]},{name:"freshwater",choices:[0,1,2,3]},{name:"temperature",choices:["temperate","hot","cold"]}],
    "feature":[{name:"feature types",choices:[...featureTypes]},{name:"saltwater",choices:[0,1,2,3]},{name:"freshwater",choices:[0,1,2,3]}],
    "basic land":[{name:"land types",choices:[...landTypes]},{name:"saltwater",choices:[0,1,2,3]},{name:"freshwater",choices:[0,1,2,3]},{name:"temperature",choices:["temperate","hot","cold"]}],
    "basic replace":[{name:"land types",choices:[...landTypes]},{name:"saltwater",choices:[0,1,2,3]},{name:"freshwater",choices:[0,1,2,3]},{name:"temperature",choices:["temperate","hot","cold"]}],
    "great land":[{name:"land types",choices:[...landTypes]},{name:"saltwater",choices:[0,1,2,3]},{name:"freshwater",choices:[0,1,2,3]},{name:"temperature",choices:["temperate","hot","cold"]}],
}

const landTemplate = {

    name: "NEW LAND",
        cardId: 0,
        desc: "temp",
        category: "land",
        cost: [0,0,0],
        "land types": ["none"],
        saltwater: 0,
        freshwater: 0,
        temperature: "temperate",
        posX: -1,
        posY: -1,
        player: 0,
        //functional
        requirements:[{type:"none",values:[]}],
        effects:[
            {
                trigger:"none",
                results:[{
                    numberSet:"number",
                    numberUse:"none", 
                    numberValue:1,
                    numberPlus:0,
                }]
                
            }
        ],

        //visual cosmetic etc
        backColor: "#FFFFFF",
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
                ]            
            },
        ], 

}
 


const MainLands = [ 
    {
        name: "Desert",
        cardId: 1,
        desc: "temp",
        category: "land",
        cost: [0,0,0],
        "land types": ["desert"],
        saltwater: 0,
        freshwater: 0,
        temperature: "hot",
        posX: -1,
        posY: -1,
        player: 0,
        //functional
        requirements:[{type:"none",values:[]}],
        effects:[
            {
                trigger:TRIGGER.everyTurn,
                results:[{
                    numberSet:"number",
                    numberUse:"none", 
                    numberValue:1,
                    numberPlus:0,
                }]
                
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
        name: "Plains",
        cardId: 2,
        desc: "temp",
        category: "land",
        cost: [0,0,0],
        "land types": ["desert"],

        saltwater: 0,
        freshwater: 0,
        temperature: "hot",
        posX: -1,
        posY: -1,
        player: 0,
        //functional
        requirements:[{type:"none",values:[]}],
        effects:[
            {
                trigger:TRIGGER.everyTurn,
                results:[{
                    numberSet:"number",
                    numberUse:"none", 
                    numberValue:1,
                    numberPlus:0,
                }]
                
            }
        ],

        //visual cosmetic etc
        backColor: "#D2EEAD",
        patterns: [
            {
                offX: 0.05,
                offY: 0.05,
                width: 0.6,
                height: 0.1,
                skew:0,
                color:"#CACAAB",
                shapes: [{
                    type: "circle",
                    offX: 0.2,
                    offY: 0,
                    size: [0.15],
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
    
]

const MLANDI = {
    "desert": 0,
    "plains": 1,
    "sea": 2,
    "hills": 3,
    "wetlands": 4,
    "tundra": 5,
}
const MIMPROV = {
    "forest": 0,
    "river" : 0,
    "lake" : 0,
}


const sandsPack = {
    packName: "The Sands",
    defaultPack: true,
    packIcon: 0,
    packId: 0,
    landReplace: 0, 
    mainColor: 0,

    basicReplaceLand: {
        name: "Dunes",
        type: "land",
        categories:["desert"],
        landReplace: MLANDI.desert,
        mainColor: "#FFFFFF",
        mainPattern: "circle",
        subColor: "#FFFFFF",
        subPattern: "circle",
        backColor: "#FFFFFF",  
    },

    greatLand: { 
        name: "Eye of the desert",
        type: "great", 
    }, 

    packCards: [

    ],

}

const BasicPacks = [
    sandsPack
 
]




const cardRequirements = {
    "land":{
            "none":[],
            "land types":[
             ["adjacent","nearby","anywhere"],landTypes,["equal","at least","less than"],0
            ], 
            "card categories":[
                ["adjacent","nearby","anywhere"],cardCategories.concat(uniqueCardCategories),["equal","at least","less than"],0
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
    },
    "great land":{
        "none":[],
    }
}

const CDAT = {
    CCAT:cardCategories, 
    UCAT:uniqueCardCategories,
    CREQUIRE:cardRequirements,
    CPROP:cardProperties,
    MLANDI:MLANDI,
    MLAND:MainLands,
    MIMPROV:MIMPROV,
    MainLands:MainLands,
    BasicPacks:BasicPacks,
    landTemplate:landTemplate,
}


export {CDAT}

export {patterns}
export {MainLands} 
export {shapeData}
export {cardCategories}
export {landTypes}