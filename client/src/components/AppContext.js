import { createContext,useReducer } from "react";  
import {CARDFUNC} from "./game/cardfunctions.js"; 
import { Navigate } from "react-router-dom";

import {CDAT,MainLands,shapeData} from "./utility/testdata.js";

const {TRIGGER} = CARDFUNC;

const boardSize = 8;
const numPlayers = 2;

const cardTriggers = {
  everyTurn: "every turn ",
  onPlay: "on play ",
  afterTimer: "after $ turns ",
  whenAdjacentPlayed: "when an adjacent land is added "
}

const templateNewCard = {...CDAT.landTemplate }

const templateReplaceLand = {
  ...CDAT.landTemplate,
}

const templateGreatLand = {
  ...CDAT.landTemplate,
}

const templatePack = {
  packName:"NEW PACK",
  defaultPack:false,
  basicReplaceLand: null,
  greatLand: null,
  packCards: [],
}

const _startGrid = [];
const emptyGrid = [];
for (let _i =0; _i < boardSize;_i++)
  {
    const _secondGrid = []; 
    const _thirdGrid = [];
    for (let _j =0; _j < boardSize; _j++)
    { 
        _secondGrid[_j] = {cardId:null,posX:_i,posY:_j};
        _thirdGrid[_j] = null;
    }
    emptyGrid[_i] = _thirdGrid;
    _startGrid[_i] = _secondGrid;
  } 
  const _targetGrid = emptyGrid.slice().map(_i=>_i.slice()); 

  _startGrid[3][3]= {...CDAT.MLAND[CDAT.MLANDI.desert], player:1,cardId:1,posX:3,posY:3, }
  _startGrid[3][4]= {...CDAT.MLAND[CDAT.MLANDI.desert], player:2,cardId:1,posX:3,posY:4, }
  _startGrid[4][3]= {...CDAT.MLAND[CDAT.MLANDI.desert], player:2,cardId:1,posX:4,posY:3, }
  _startGrid[4][4]= {...CDAT.MLAND[CDAT.MLANDI.desert], player:1,cardId:1,posX:4,posY:4, } 

   

 const newEditCard = {
    ...templateNewCard,
    requirements: [{...templateNewCard.requirements[0]}],
        patterns: [{...templateNewCard.patterns[0], shapes:[{...templateNewCard.patterns[0].shapes}]}], 
  }

const initialState = {   
    playerHand: [
      [],[]
    ],
    currentTurn: 1,
    maxTurns: 20,
    templateNewCard:templateNewCard,
    playerResources: [[10,0,0],[10,0,0]],
    resourcesPlus: [[0,0,0],[0,0,0]],
    boardSize: boardSize,
    boardGrid: _startGrid,
    targetGrid: _targetGrid,
    targetList: [],
    mouseOver: [0,0],
    mousingOver: false,
    currentCard: null,
    currentPlayer:1,
    localPlayer: 1,
    gamePhase: 0,
    gamePhaseStep: 0,
    playerColor: ["red","blue"],
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    cardWidth: window.innerHeight/6.92,
    cardHeight: window.innerHeight/10,
    boardWidth: window.innerHeight/6.92*8,
    boardHeight: window.innerHeight/10*8,
    mouseX: 0,
    mouseY: 0, 
    userInfo: {username:null}, 
    currentEditCardIndex: 0,
    currentEditPackIndex: 0,
     
    cardTriggers:cardTriggers,

    customPacks: [], 
    copyCard: null,
    currentEditCard: newEditCard, 
    currentEditPack: {
      name:"Basic Cards",
      basicReplaceLand: null,
      greatLand: null,
      packCards: [...CDAT.MainLands],
    },
  };

 
const reducer = (state, action) => { 
  switch(action.type) { 
    case 'context-dimensions': {  

      return {
        ...state,   
        windowWidth: action.data[0],
        windowHeight: action.data[1],   
        cardWidth: action.data[1]/6.92,
        cardHeight: action.data[1]/10,
        boardWidth: action.data[1]/6.92*8,
        boardHeight: action.data[1]/10*8,
      } 

    }
    case 'set-card': {  
      const _tempGrid = state.boardGrid.slice();
      action.data.card.posX = action.data.posX;
      action.data.card.posY = action.data.posY;
      _tempGrid[action.data.posX][action.data.posY] = action.data.card;

      return {
        ...state,    
        boardGrid:_tempGrid,
      } 

    } 



    case 'context-mouse-over': {   

      return {
        ...state,    
        mouseOver: action.data,
        mousingOver: true,
      } 

    }

    case 'set-mouse-pos': {   
 
      return {
        ...state,
        mouseX: action.data[0],
        mouseY: action.data[1],
      } 

    }

    case 'context-mouse-stop': {   

      return {
        ...state,     
        mousingOver: false,
      } 

    }

    case 'change-game-phase': {    


      return {
        ...state,     
        gamePhase: action.data[0],
        gamePhaseStep: action.data[1],
      } 

    }
    case 'next-turn': {
      let _gamePhaser = 0;
      if (state.currentTurn === state.maxTurns)
      {
        _gamePhaser = 5;
      }

      return{
        ...state,
        currentTurn: state.currentTurn+1,
        gamePhase: _gamePhaser,
        gameStep: 0,
      }

    }

    case 'choose-card': {

      return{
        ...state,
        currentCard: action.data.card,
        gamePhaseStep: 1,
      }
    }

    case 'set-targets': {
      const _tempGrid = emptyGrid.slice().map(_i=>_i.slice()); 
      for (let _i =0; _i < action.data.length; _i++)
      {
        const _card = action.data[_i];
        _tempGrid[_card.posX][_card.posY] = 1;
      } 
      return{ 
        ...state,
        targetGrid: _tempGrid,
      }

    }

    case 'add-resources-plus': {
      console.log("add plus",action.data);
        const _tempArray = state.resourcesPlus.slice().map(_i=>_i.slice()); 
        _tempArray[action.data.player-1][0] += action.data.plus[0];
        _tempArray[action.data.player-1][1] += action.data.plus[1];
        _tempArray[action.data.player-1][2] += action.data.plus[2];
        return {
          ...state,
          resourcesPlus:_tempArray,
        }
    }

    ///----------------------------------------  
    ///bookmarkeditcard bookmarkeditpack-------------------------------------
    ///----------------------------------------
 
    case 'new-edit-pack': {

      const _customPacks = [...state.customPacks];

      const _newPack = {
        ...templatePack,
      };
      let _check = true;
      let _index = 0;
      _newPack.packName = "NEW PACK"+String(_index);
      if (_customPacks.length > 0)
      {
        while (_check)
        {
          for (let _i = 0; _i < state.customPacks.length;_i++)
          {
            const _checkPack = state.customPacks[_i];
            if (_newPack.packName === _checkPack.packName)
            { 
              _newPack.packName = "NEW PACK"+String(_index);
              _index += 1;
            }
            else
            {
              _check = false;
            }
          }
        } 
      }
      _newPack.basicReplaceLand = {...templateReplaceLand, name:"new replace land", category:"basic replace",cardId:(_newPack.packName+"replace").replace(" ","0"),
      requirements: [{...templateReplaceLand.requirements[0]}],
      patterns: [{...templateReplaceLand.patterns[0], shapes:[{...templateReplaceLand.patterns[0].shapes[0]}]}], 
      };
      _newPack.greatLand = {...templateGreatLand, patterns:[], name:"new great land",category:"great land",cardId:(_newPack.packName+"great").replace(" ","0"),
        requirements: [{...templateGreatLand.requirements[0]}],
        patterns: [{...templateGreatLand.patterns[0], shapes:[{...templateGreatLand.patterns[0].shapes[0]}]}], 
    };
      _customPacks.push(_newPack) ; 
      console.log("cpack", state.customPacks.length);
      return {
        ...state,
        currentEditPackIndex: state.customPacks.length,
        customPacks: _customPacks,
        currentEditPack: _newPack,
      }
    }

    case 'change-edit-pack': {

      const _editPack = { 
        ...action.data,
      }; 

      return {
        ...state,
        currentEditPack:_editPack,
      }
    }

    case 'save-edit-pack': {
      const _customPacks = [...state.customPacks];
      _customPacks[state.currentEditPackIndex] = state.currentEditPack; 

      return {
        ...state,
        customPacks:_customPacks,
      }
    }

    case 'set-edit-pack': {
      const _editPack = { 
        ...state.currentEditPack,
        ...action.data,
      }; 

      return {
        ...state,
        currentEditPack:_editPack,
      }  
    }

    case 'set-edit-pack-index': {
      
      return {
        ...state,
        currentEditPackIndex:action.data,
      }
    }

    case 'new-edit-card': {

      const _editPack = state.currentEditPack;
      const _newCard = {...templateNewCard,
        cardId: (state.currentEditPack.packName+String(_editPack.packCards.length-1)).replace(" ","_"),
        requirements: [{...templateNewCard.requirements[0]}],
        patterns: [{...templateNewCard.patterns[0], shapes:[{...templateNewCard.patterns[0].shapes[0]}]}], 
        cost: [...templateNewCard.cost],
      }
      _editPack.packCards.push(
        _newCard,
      )
        
      return {
        ...state,
        currentEditCardIndex:_editPack.packCards.length-1,
        currentEditCard: {..._newCard,cardId: "-EDITED",},
        currentEditPack:_editPack,
      }
    }

    case 'delete-edit-card':{ 
      const _tempPack = {...state.currentEditPack};
      _tempPack.packCards.splice(action.data,1);

      return {
        currentEditPack: _tempPack,
        ...state, 
      } 
    }

    case 'load-edit-card': { 
      
      const _loadCard = {...action.data,
        requirements:[],
        effects:[],
        patterns:[],
        cost: [...action.data.cost],
        cardId:"-EDITED",
      }
 

      for (let _i =0; _i < action.data.requirements.length ;_i++)
      {
        _loadCard.requirements.push({...action.data.requirements[_i]});
      }

      for (let _i =0; _i < action.data.effects.length ;_i++)
      {
        const _resulty = [];
        for (let _j =0; _j < action.data.effects[_i].results.length;_j++)
        {
          _resulty.push(action.data.effects[_i].results[_j]) 
        }
        _loadCard.effects.push({...action.data.effects[_i],results:_resulty});
      }

      for (let _i =0; _i < action.data.patterns.length ;_i++)
      {
         const _shapey = []; 
        for (let _j =0; _j < action.data.patterns[_i].shapes.length;_j++)
        {
          _shapey.push({...action.data.patterns[_i].shapes[_j],size:[...action.data.patterns[_i].shapes[_j].size]});
        }
        _loadCard.patterns.push({...action.data.patterns[_i],shapes:_shapey});
      }

      return {
        ...state,
        currentEditCard:_loadCard,
      } 
    }

    case 'save-edit-card': {

      let _replaceCard = { }

      if (state.currentEditCardIndex == -2 )
      {
        _replaceCard = state.currentEditPack.basicReplaceLand;
      }
      else if ( state.currentEditCardIndex == -1 )
      {
        _replaceCard = state.currentEditPack.greatLand;
      }
      else
      {
        _replaceCard = state.currentEditPack.packCards[state.currentEditCardIndex];
      }

      const _saveCard = state.currentEditCard;

      const _tempCard = {...state.currentEditCard,
        cardId: _replaceCard.cardId,
        requirements: [],
        effects:[],
        patterns:[],
      };

      for (let _i =0; _i < _saveCard.requirements.length ;_i++)
      {
        _tempCard.requirements.push({..._saveCard.requirements[_i]});
      }

      for (let _i =0; _i < _saveCard.effects.length ;_i++)
      {
        const _resulty = [];
        for (let _j =0; _j < _saveCard.effects[_i].results.length;_j++)
        {
          _resulty.push(_saveCard.effects[_i].results[_j]) 
        }
        _tempCard.effects.push({..._saveCard.effects[_i],results:_resulty});
      }

      for (let _i =0; _i < _saveCard.patterns.length ;_i++)
      {
         const _shapey = []; 
        for (let _j =0; _j < _saveCard.patterns[_i].shapes.length;_j++)
        {
          _shapey.push({..._saveCard.patterns[_i].shapes[_j],size:[..._saveCard.patterns[_i].shapes[_j].size]});
        }
        _tempCard.patterns.push({..._saveCard.patterns[_i],shapes:_shapey});
      }

      const _packCopy = {...state.currentEditPack}

      if (state.currentEditCardIndex == -2 )
      {
        _packCopy.basicReplaceLand = _tempCard;
      }
      else if ( state.currentEditCardIndex == -1 )
      {
         _packCopy.greatLand = _tempCard;
      }
      else
      {
         _packCopy.packCards[state.currentEditCardIndex] = _tempCard;
      }

      console.log(_packCopy);
       return {
        ...state,
        currentEditPack:_packCopy,
      } 

    }

    case 'set-edit-card': {
       
      const _editedCard = {
        ...state.currentEditCard,
        ...action.data,
        cardId:"-EDITED",
      };
      console.log(_editedCard);
      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }

    case 'set-edit-card-index': {
  
      return {
        ...state,
        currentEditCardIndex:action.data,
      }
    }

    case 'set-copy-card': {

      return {
        ...state, 
        copyCard: {...state.currentEditCard},
      }
    }

    case 'paste-copy-card': {
      
      return {
          ...state, 
          currentEditCard: {...state.copyCard,cardId:"-EDITED"},
        }
    }

     ///bookmarkrequirement garbage
    case 'add-requirement': {

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };
      _editedCard.requirements.push({type:"none",value:[]});
      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }

    case 'delete-requirement': {

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };
      _editedCard.requirements.splice(action.data,1);
      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }

    case 'reset-requirements': {

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };
      _editedCard.requirements = [{type:"none"}]
      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }


    case 'set-requirement-type': {
      const _req = state.currentEditCard.requirements[action.data.req];
      _req.type = action.data.value;

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      }; 
      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }
    ///requirement garbage end
    ///effect garbage start
    case 'add-effect': { 

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      }; 
      
      _editedCard.effects.push({
                trigger:"none",
                results:[],
            });
      return {
        ...state,
        currentEditCard:_editedCard,
      }
    } 
    
    case 'add-result': {
        

        const _editedCard = {
          ...state.currentEditCard,
          cardId:"-EDITED",
        }; 
        _editedCard.effects[action.data].results.push({
                numberSet:"number",
                numberUse:"none", 
                numberValue:1,
                numberPlus:0,
              })
        return {
          ...state,
          currentEditCard:_editedCard,
        }
      }

      case 'remove-result': {
        

        const _editedCard = {
          ...state.currentEditCard,
          cardId:"-EDITED",
        }; 
        _editedCard.effects[action.data].results.pop();
        return {
          ...state,
          currentEditCard:_editedCard,
        }
      }



    case 'delete-effect': {
      const _effects = state.currentEditCard.effects;
      _effects.splice(action.data,1);

        const _editedCard = {
          ...state.currentEditCard,
          cardId:"-EDITED",
        };  

        return {
          ...state,
          currentEditCard:_editedCard,
        }
      }
    ///-----
    ///card creation visual garbo
    case 'set-pattern-stat': { 
     
      const _pattern = state.currentEditCard.patterns[action.data.pattern]; 
      _pattern[action.data.key] = action.data.value; 

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };

      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }

    case 'set-shape-stat': { 
     
      const _pattern = state.currentEditCard.patterns[action.data.pattern]; 
      const _shape = _pattern.shapes[action.data.shape]; 
      _shape[action.data.key] = action.data.value; 

      if (action.data.key === "type")
      {
        let _newArray = []
        while (_newArray.length < shapeData[action.data.value].sizes)
        {
          _newArray.push(0);
        }
        _shape.size =  _newArray;
      }
      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };

      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }

    case 'set-shape-size': { 
     
      const _pattern = state.currentEditCard.patterns[action.data.pattern]; 
      const _shape = _pattern.shapes[action.data.shape]; 
      _shape.size[action.data.size] = action.data.value; 

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };

      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }

    case 'add-pattern':{
      const _patterns = state.currentEditCard.patterns;
      _patterns.push({
        color:"#777777",
        offX: 0.00,
        offY: 0.00,
        width: 1.0,
        height: 1.0,
        skew:0, 
        shapes: []
      })

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };

      return {
        ...state,
        currentEditCard: _editedCard,
      }
    }

    case 'delete-pattern':{
      const _patterns = state.currentEditCard.patterns;
      _patterns.splice(action.data.pattern,1);

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };

      return {
        ...state,
        currentEditCard: _editedCard,
      }
    }

    case 'add-shape':{
      const _pattern = state.currentEditCard.patterns[action.data.pattern];
      const _keys = Object.keys(shapeData);
      let _sizeArray = [];
      for (let _i =0; _i < shapeData[_keys[0]].sizes; _i++)
      {
        _sizeArray.push(0.1);
      } 

      _pattern.shapes.push({
        type: shapeData[_keys[0]].name,
        size: _sizeArray,
        offX: 0,
        offY: 0,

      })
      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED"
      };

      return {
        ...state,
        currentEditCard: _editedCard,
      }
    }

    case 'delete-shape':{ 
      const _pattern = state.currentEditCard.patterns[action.data.pattern];
      _pattern.shapes.splice(action.data.shape, 1);
      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      };

      return {
        ...state,
        currentEditCard: _editedCard,
      }
    }

    case 'update-points': {

      const _tempArray = state.playerResources.slice().map(_i=>_i.slice()); 
       _tempArray[0][0] += state.resourcesPlus[0][0]; 
       _tempArray[0][1] += state.resourcesPlus[0][1]; 
       _tempArray[0][2] += state.resourcesPlus[0][2]; 
      
       _tempArray[1][0] += state.resourcesPlus[1][0];
       _tempArray[1][1] += state.resourcesPlus[1][1]; 
       _tempArray[1][2] += state.resourcesPlus[1][2]; 
       
      return {
        ...state,
        playerResources: _tempArray,
        resourcesPlus: [[0,0,0],[0,0,0]],
      }
    }

    ///-------------------------------server interaction reducers

    case 'new-register': {
      const _userInfo = {
        username: action.data.username,
      }
      return {
        ...state,
        userInfo:_userInfo,
      }
    }

    case 'attempt-login': {
      const _userInfo = {
        username: action.data.username,
      }
      return {
        ...state,
        userInfo:_userInfo,
      }
    }

    case 'logout': { 
      
      return {
        ...state,
        userInfo:{username:null},
      }
    }


    default: throw new Error(`Unrecognized action: ${action.type}`); ;
  }

    
}
////REDUCERS END
////////////////------------------------------------------------------------------------------------



///--------------------------------

export const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
 

    const contextDimensions = (data) =>{

      dispatch({
        type: "context-dimensions",
        data: data,
        })
    }

    const contextMouseOver = (data) =>{

      dispatch({
        type: "context-mouse-over",
        data: data,
        })
    }
    const contextMouseStop = (data) =>{

      dispatch({
        type: "context-mouse-stop",
        data: data,
        })
    }

    const chooseCard = (data) =>{ //this one is for choosing which card you wanna play in your hand 

      dispatch({
        type: "choose-card",
        data: data,
        })
    }

    const setCard = (data) =>{ //this one sets a specific card on the map

      dispatch({
        type: "set-card",
        data: data,
        })
    }

    const setMousePos = (data) =>{

      dispatch({
        type: "set-mouse-pos",
        data: data,
        })
    }

    const changeGamePhase = (data) =>{ 
      dispatch({
        type: "change-game-phase", 
        data:data,
        })
    } 

    const setTargets =(data) =>{

      dispatch({
        type: "set-targets",
        data:data,
      })
    }
 
    const addResourcesPlus = (data) =>{ 
      dispatch({
        type: "add-resources-plus",
        data:data,
      })
    }
    state.cardActions = {addResourcesPlus:addResourcesPlus};

    const tallyPoints = (data) =>{ 

       for (let _i = 0; _i < boardSize; _i+=1)
       {
          for (let _j= 0; _j < boardSize; _j+=1)
          {
             const _card = state.boardGrid[_i][_j];
             if (_card.cardId != null)
             {
              addResourcesPlus({player:_card.player,plus:[1,0,0]});
             }
          }
       }  
    }

    const updatePoints = (data) => {


      dispatch({
        type: "update-points",
        data:data,
      })
    }
    const nextTurn = (data) => { 

      updatePoints();
      dispatch({
        type:"next-turn",
        data:data,
      })
    }

    const endTurnTrigger = (data) => {
      for (let _i = 0; _i < boardSize; _i++) ///TRIGGER every turn;
      {
        for (let _j=0; _j < boardSize; _j++)
        {
          const _card = state.boardGrid[_i][_j];
          if (_card.cardId != null) {
            for (let _f= 0; _f < _card.effects.length; _f++)
            {
              const _effect = _card.effects[_f]
              console.log("effect",_effect);
              if (_effect.trigger === TRIGGER.everyTurn)
              {
                let _number = 0;
                state.currentCard = _card;
                state.currentPlayer = _card.player;
                _number += _effect.numberSet[0](state,_effect.numberSet[1]);
                console.log("number",_number);
                _effect.numberUse[0](state,_number);
              }
            }
          }
        }
      }



    }

    const checkAdjacentSpaces =(boardCardArray=state.boardGrid,type="any",num=1,empty=true) => { 
      const _tempArray = []; 
      for (let _i =0; _i < boardSize; _i++)
      {
        for (let _j =0; _j < boardSize; _j++)
        {
          const _card = boardCardArray[_i][_j];
          let _adj = 0;
          const _cX = _card.posX;
          const _cY = _card.posY; 
          if (_i > 0){ 
            if (state.boardGrid[_cX-1][_cY].cardId != null){
              _adj+= 1;
            }}
          if (_j > 0){  
            if (state.boardGrid[_cX][_cY-1].cardId != null){
              _adj+= 1;
            } 
          }
          if (_i < boardSize-1){  
            if (state.boardGrid[_cX+1][_cY].cardId != null){
              _adj+= 1;
            } 
          }
          if (_j < boardSize-1){ 
            if (state.boardGrid[_cX][_cY+1].cardId != null){
              _adj+= 1;
            } 
          }
          if (_adj >= num)
          { 
            if (empty && _card.cardId === null)
            {
              _tempArray.push(_card); 
            }
            else if (!empty && _card.cardId != null)
            {
              _tempArray.push(_card);  
            }
          }
        }
      }

      return _tempArray;

    } 

    const newEditPack = (data) => {

      dispatch({
        type:"new-edit-pack",
        data:data,
      })
    }

    const saveEditPack = (data) =>{

      dispatch({
        type:"save-edit-pack",
        data:data
      }) 
    }
    
    const setEditPack = (data) =>{
      dispatch({
        type:"set-edit-pack",
        data:data
      })

    }

    const setEditPackIndex = (data) =>{

      dispatch({
        type:"set-edit-pack-index",
        data:data,
      })
    }

    const changeEditPack = (data) =>{

      dispatch({
        type:"change-edit-pack",
        data:data,
      })

    }

    const deleteEditCard = (data) =>{

      dispatch({
        type:"delete-edit-card",
        data:data,
      })
    }

    const newEditCard = (data) =>{

      dispatch({
        type:"new-edit-card",
        data:data,
      })
    }

    const saveEditCard = (data) =>{

      dispatch({
        type:"save-edit-card",
        data:data,
      })
    }

    const loadEditCard = (data) =>{ 

      dispatch({
        type:"load-edit-card",
        data:data,
      });
    }

    const setEditCard = (data) =>{

      dispatch({
        type:"set-edit-card",
        data:data,
      })

    }

    const setEditCardIndex = (data) =>{

      dispatch({
        type:"set-edit-card-index",
        data:data,
      })

    }

    const setCopyCard = (data) =>{

      dispatch({
        type:"set-copy-card",
        data:data,
      })

    }

    const pasteCopyCard = (data) =>{

      dispatch({
        type:"paste-copy-card",
        data:data,
      })

    }

    ///pattern etc

    const setPatternStat = (data) =>{

      dispatch({
        type:"set-pattern-stat",
        data:data,
      })

    }

    const setShapeStat = (data) =>{

      dispatch({
        type:"set-shape-stat",
        data:data,
      })

    }

    const setShapeSize = (data) =>{

      dispatch({
        type:"set-shape-size",
        data:data,
      })

    }

    const deleteShape = (data) =>{
      dispatch({
        type:"delete-shape",
        data:data,
      })

    }

    const addShape = (data) =>{
      dispatch({
        type:"add-shape",
        data:data,
      })

    }

    const deletePattern = (data) =>{
      dispatch({
        type:"delete-pattern",
        data:data,
      })

    }

    const addPattern = (data) =>{
      dispatch({
        type:"add-pattern",
        data:{},
      })

    } 

    ///card functionality design section

    const addEffect = (data) => {
      
      dispatch({
        type:"add-effect",
        data:data,
      })
    }

    const deleteEffect = (data) => {
      
      dispatch({
        type:"delete-effect",
        data:data,
      })
    }

    const addResult = (data) => {


      dispatch({
        type:"add-result",
        data:data,
      })
    }

    const removeResult = (data) => {


      dispatch({
        type:"remove-result",
        data:data,
      })
    }


    
    const addRequirement = (data) =>{
      dispatch({
        type:"add-requirement",
        data:data,
      })
    }

    const deleteRequirement = (data) =>{
      dispatch({
        type:"delete-requirement",
        data:data,
      })
    }

    const resetRequirements = (data) =>{
      dispatch({
        type:"reset-requirements",
        data:data,
      })
    }

    
    
    const setRequirementType =(data) =>{
      dispatch({
        type:"set-requirement-type",
        data:data,
      })
    }

    const setRequirementValue =(data) =>{
      dispatch({
        type:"set-requirement-value",
        data:data,
      })
    }

    const opponentTurn = (data) => {
        const _possibleTargets = checkAdjacentSpaces();
        let _rando = Math.floor(Math.random()*_possibleTargets.length); 
        const _targetSpace = _possibleTargets[_rando];
        setCard({posX:_targetSpace.posX,posY:_targetSpace.posY,card:{
                        ...CDAT.MLAND[CDAT.MLANDI.desert],
                        player:2,
                        cardId:1, 
        }})
    }


    ///-------------------------------------------------------------------------------------------////
    ///-------------------------------------------------------------------------------------------////
    ///-------------------------------------------------------------------------------------------//// 
    ///-------------------------------//// SERVER INTERACTION SECTION START ///-------------------------------////
    ///-------------------------------------------------------------------------------------------////
    ///-------------------------------------------------------------------------------------------////
    ///-------------------------------------------------------------------------------------------////

    const newRegister = async (data) => { 
            let _status = "";
              fetch('/register',
              {
              method: "POST", 
              body: JSON.stringify({"username":data.username,"email":data.email,"password":data.password}), 
              headers: {
                  "Content-Type":"application/json",
                },
              })
              .then((res)  =>{  
                _status = res.status;
                return res.json(); 
              })
              .then((res) => {   
                if (_status === 200)
                {
                  dispatch({
                    type: "new-register",
                    data: res,
                    }) 
                }
                else
                {
                  alert(res.message);
                }
                 
                
            
              })
            .catch((error)=>{
              console.log("error ",error);  
              })

    }

    const attemptLogin = async (data) => { 
      let _status = "";
        fetch('/login',
        {
        method: "POST", 
        body: JSON.stringify({"username":data.username,"password":data.password}), 
        headers: {
            "Content-Type":"application/json",
          },
        })
        .then((res)  =>{  
          _status = res.status;
          return res.json(); 
        })
        .then((res) => {  
           
          if (_status === 200)
          {
            dispatch({
              type: "new-register",
              data: res.body,
              })  
          }
          else
          {
            alert(res.message);
          }
           
          
      
        })
      .catch((error)=>{
        console.log("error ",error);  
        })

    } 


    const attemptAutoCookieLogin = async (data) => { 
      let _status = "";
        fetch('/autologin',
        {
        method: "GET",  
        headers: {
            "Content-Type":"application/json",
          },
        })
        .then((res)  =>{  
          _status = res.status;
          return res.json(); 
        })
        .then((res) => {  
           
          if (_status === 200)
          { 
            dispatch({
              type: "attempt-login",
              data: res.body,
              }) 
          }
          else if (_status >= 300)
          {
            alert(res.message);
          }
           
          
      
        })
      .catch((error)=>{
        console.log("error ",error);  
        })

    } 

    const logOut = async (data) =>{
      let _status = "";
      fetch('/logout',
        {
            method: "GET",  
            headers: {
                "Content-Type":"application/json",
              },
        })
        .then((res)  =>{  
            _status = res.status;
            return res.json(); 
        })
        .then((res) => {   
            if (_status === 200)
            {  

            }
            else if (_status >= 300)
            {
              console.log(res.message);
            } 
            dispatch({
              type: "logout",
              data: {},
              }) 
        })
      .catch((error)=>{
        console.log("error ",error);  
        })

      
    } 

    ///bookmarkReturn
    return (
        <AppContext.Provider
          value={{

            state, 
            
            actions: {  
              contextDimensions,
              setCard,
              chooseCard,
              setMousePos,
              contextMouseOver,
              contextMouseStop,

              changeGamePhase,

              setTargets,
              checkAdjacentSpaces,

              tallyPoints,
              updatePoints,
              endTurnTrigger,
              opponentTurn,

              nextTurn,
              //---- card editor etc --
              setCopyCard,pasteCopyCard,
              newEditCard,loadEditCard,saveEditCard,setEditCard,setEditCardIndex,deleteEditCard,
              changeEditPack,newEditPack,setEditPack,saveEditPack,setEditPackIndex,
              //functional
              addEffect,deleteEffect,addResult,removeResult,
              setRequirementType, setRequirementValue,addRequirement,deleteRequirement,resetRequirements,
              //visual
              setPatternStat,
              setShapeStat,
              setShapeSize,
              addPattern,
              deletePattern,
              addShape,
              deleteShape,

              //---- server etc -----
                  
              newRegister, 
              attemptLogin,
              attemptAutoCookieLogin,
              logOut,
                 
            },
          }}
        >
          {children}
        </AppContext.Provider>
      );
}



export const AppContext = createContext();