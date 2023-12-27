import { createContext,useReducer } from "react";   
import { Navigate } from "react-router-dom";

import {CDATA} from "./utility/testdata.js";
import {CFUNC} from "./game/cardfunctions.js"; 
 

const boardSize = 8;
const numPlayers = 2;
 

const templateNewCard = {...CDATA.landTemplate }

const templateReplaceLand = {
  ...CDATA.landTemplate,
}

const templateGreatLand = {
  ...CDATA.landTemplate,
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



  const makeCardDescription = (_card) =>{

    let _tempDesc = `Requirements: \n`;

    for (let _i = 0; _i < _card.requirements.length ; _i++)
    {
      console.log("bamboon");
      let _miniDesc = "";
      const _req = _card.requirements[_i];
      switch (_req.type)
      {
        case "none":
          _tempDesc = "";
        break;
        case "land types": 
        _miniDesc += _req.values[2] + " ";
        _miniDesc += _req.values[3] + " ";
        _miniDesc += _req.values[1] + " ";
        _miniDesc += "in " + _req.values[0] + ` \n`; 
          break;
        default: console.log("weird requirement type desc"); break;
      }
      _tempDesc += _miniDesc;
    }
    console.log("tempo desc",_tempDesc);

     if (_tempDesc != "") { 
      _tempDesc += " --- \n";}
     
    for (let _i = 0; _i < _card.effects.length ; _i++)
    { 
      let _miniDesc = "";
      const _effect = _card.effects[_i]; 

      switch (_effect.trigger.name)
      {
        case "every turn":
          _miniDesc += "-every turn,-"+` \n`; 
          break;

        default: console.log("weird _effect type desc"); break;
      }

      for (let _j =0; _j < _effect.results.length; _j++)
      { 
          const _result = _effect.results[_j];
          switch (_result.type)
          {
            case "addSun": _miniDesc += "+ ";  
            if (_result.value[1] === "none")
            {
              _miniDesc += String(_result.value[4]) +" Sun"
             }
             else
             {
              _miniDesc += String(_result.value[0]) + " Sun"+ " per "; 
             }
            if (_result.value[1] === "land type")
            {
              _miniDesc += _result.value[3] +" "+ _result.value[2];
            }  
            if (_result.value[1] > 0)
            { if (_miniDesc)
              _miniDesc += String(_result.value[4]); } 
              _miniDesc+= "\n";
            break;

            case "addMoon": _miniDesc += "+ "+""+" Moon \n"; break;
            case "addStars": _miniDesc += "+ "+""+" Stars \n"; break;
            default:console.log("weird _result type desc"); break;
          }
          
      }
      _tempDesc += _miniDesc;
      _tempDesc += `--- \n`;
    }

    _card.desc = _tempDesc; 
    return _tempDesc;
  }


   

 const newEditCard = {
    ...templateNewCard,
    requirements: [{...templateNewCard.requirements[0]}],
        patterns: [{...templateNewCard.patterns[0], shapes:[{...templateNewCard.patterns[0].shapes}]}], 
  }

const initialState = {   
    playerHand: [
      [],[]
    ],
    CDAT:{...CDATA,CFUNC:CFUNC},
    currentTurn: 1,
    turnMessages: [],
    maxTurns: 20,
    templateNewCard:templateNewCard,
    playerResources: [[10,0,0],[10,0,0]],
    resourcesPlus: [[0,0,0],[0,0,0]],
    boardSize: boardSize,
    boardGrid: _startGrid,
    targetGrid: _targetGrid,
    targetList: [],
    takenList: [],
    mouseOver: [0,0],
    mousingOver: false,
    currentCard: null,
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

    customPacks: [], 
    copyCard: null,
    currentEditCard: newEditCard, 
    currentEditPack: {
      name:"Basic Cards",
      basicReplaceLand: null,
      greatLand: null,
      packCards: [...CDATA.MainLands],
    },

    
    currentPlayer:1,
    localPlayer: 1,

    startGameSelectedPacks:[null,null],
    startGamePackCategory:"default",
    gameStarted:false,
    gameStatus:null,
    handMouseOver:null,

    playerPacks : [2,[null,null],[null,null]],
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
      const _targetCard = _tempGrid[action.data.posX][action.data.posY];
      const _card = {...action.data.card};
      if (action.data.card.category === "feature")
      {
        
        if (_targetCard.feature1 === null)
        {
          _targetCard.feature1 = _card;
        }
        else if (_targetCard.feature2 === null)
        {
          _targetCard.feature2 = _card;
        } 
      }
      else
      { 
        
        _card.posX = action.data.posX;
        _card.posY = action.data.posY;
        if (_targetCard.cardId === null || _card.category === "great land")
        {
          _card.feature1 = null;
          _card.feature2 = null;
        }
        else
        {
          _card.feature1 = _targetCard.feature1;
          _card.feature2 = _targetCard.feature2;
        }
        _tempGrid[action.data.posX][action.data.posY] = {..._card};
      } 
 
      let _stateUpdate = {...state};
      for (let _f= 0; _f < _card.effects.length; _f++)
      { 
        const _effect = _card.effects[_f] ;
        if (_effect.trigger.name === state.CDAT.CTRIGGER.onPlay.name)
        { 
          _stateUpdate=CFUNC.effectTriggered(state,_card,_effect);
        }
        else if(_effect.trigger.name  === state.CDAT.CTRIGGER.afterTimer.name)
        {
          _effect.trigger.timer = _effect.trigger.value;
        }
      }
      let _resource = [[...state.resourcesPlus[0]], [...state.resourcesPlus[1]]]; 
      console.log("!dumb resources",_resource)
      const _resPlus = _stateUpdate.resourcesPlus;
      if (_resPlus != undefined)
      { 
        _resource[0][0] += _resPlus[0][0];
        _resource[1][1] += _resPlus[1][1];
        _resource[0][2] += _resPlus[0][2];
        _resource[1][0] += _resPlus[1][0];
        _resource[0][1] += _resPlus[0][1];
        _resource[1][2] += _resPlus[1][2]; 
      }

      state.playerResources[_card.player-1][0] -= _card.cost[0];
      state.playerResources[_card.player-1][1] -= _card.cost[1];
      state.playerResources[_card.player-1][2] -= _card.cost[2];

      return {
        ...state,    
        boardGrid:_tempGrid,
      } 

    } 

    case 'hand-mouse-over': {   

      return {
        ...state,    
        handMouseOver:action.data,
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
      const _card = state.currentCard; 
      const _tempGrid = emptyGrid.slice().map(_i=>_i.slice()); 
      if (_card != null)
      { 
          const _adjGrid = state.CDAT.CFUNC.checkAdjacentSpaces(state)
          if (_card.category === "land" || _card.category === "basic land" || _card.category === "basic replace" || (_card.category === "great land" && _card["can be used on"][0] ) )
          {
            for (let _i =0; _i < _adjGrid.length; _i++)
            {
              const _card = _adjGrid[_i];
              _tempGrid[_card.posX][_card.posY] = 1;
            }  
          }
           if (_card.category === "feature" || _card.category === "land upgrade" || (_card.category === "great land" && ( _card["can be used on"][1] ||  _card["can be used on"][2] ||  _card["can be used on"][3] ||  _card["can be used on"][4] ||  _card["can be used on"][5] ||  _card["can be used on"][6] ) ) )  ///if it's a feature or upgrade
          {   
            for (let _i =0; _i < boardSize; _i++)
            {
              for (let _j=0; _j < boardSize; _j++)
              { 
                const _checkCard = state.boardGrid[_i][_j]
                if (_checkCard.cardId && _checkCard.player === state.localPlayer)
                { 
                  for (let _k = 1; _k < 7; _k++)
                  { 
                    if (_card["can be used on"][_k] && _checkCard["land types"].indexOf(state.CDAT.MLANDRI[_k-1]) != -1)
                    { 
                      if ((_card.category === "feature" && _checkCard.category != "great land" && (_checkCard.feature1 === null || _checkCard.feature2 === null))
                          || (_card.category === "land upgrade" && _checkCard.category != "great land" && _checkCard.category != "land upgrade"  )
                          || (_card.category === "great land" && _checkCard.category != "great land" && _checkCard.category != "land upgrade"  ))
                      {_tempGrid[_i][_j] = 1;}
                      
                    }
                  } 
                }
              }
            }
          } 
      }

      state.CDAT.CFUNC.cardConditions(state,_tempGrid,_card);

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
        packIndex: state.customPacks.length,
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
      _newPack.basicReplaceLand = {...templateReplaceLand, name:"new replace land", category:"basic replace",cardId:(_newPack.packName+"replace").replaceAll(" ","!"),
      requirements: [{...templateReplaceLand.requirements[0]}],
      patterns: [{...templateReplaceLand.patterns[0], shapes:[{...templateReplaceLand.patterns[0].shapes[0]}]}], 
      cost: [...templateReplaceLand.cost],
        "land types": [...templateReplaceLand["land types"]],
        "feature types": [...templateReplaceLand["feature types"]],
        "can be used on": [...templateReplaceLand["can be used on"]],
      };
      _newPack.greatLand = {...templateGreatLand, patterns:[], name:"new great land",category:"great land",cardId:(_newPack.packName+"great").replaceAll(" ","!"),
        requirements: [{...templateGreatLand.requirements[0]}],
        patterns: [{...templateGreatLand.patterns[0], shapes:[{...templateGreatLand.patterns[0].shapes[0]}]}], 
        cost: [...templateGreatLand.cost],
        "land types": [...templateGreatLand["land types"]],
        "feature types": [...templateGreatLand["feature types"]],
        "can be used on": [...templateGreatLand["can be used on"]],
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

    case 'get-basic-packs': {

      const _basicCards = action.data.CDAT;
      console.log("MLANDY",action.data.CDAT.MLAND);
      return {
        ...state,
        CDAT: {..._basicCards,CFUNC:CFUNC} 
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

    case 'load-edit-packs':{
      console.log(action.data.body);

      const _newPacks = [];  
      for (let _i =0; _i < action.data.body.packNumber; _i++)
      {
        _newPacks.push(action.data.body["pack"+String(_i)]);
      }
      console.log("pack",_newPacks);
      return {...state,
        customPacks:_newPacks,
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
        cardId: (state.currentEditPack.packName+String(_editPack.packCards.length-1)).replaceAll(" ","_"),
        requirements: [{...templateNewCard.requirements[0]}],
        patterns: [{...templateNewCard.patterns[0], shapes:[{...templateNewCard.patterns[0].shapes[0]}]}], 
        cost: [...templateNewCard.cost],
        effects: [...templateNewCard.effects],
        "land types": [...templateNewCard["land types"]],
        "feature types": [...templateNewCard["feature types"]],
        "can be used on": [...templateNewCard["can be used on"]],
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
        "land types": [...action.data["land types"]],
        "feature types": [...action.data["feature types"]],
        "can be used on": [...action.data["can be used on"]],
        cardId:"-EDITED",
      }
 

      for (let _i =0; _i < action.data.requirements.length ;_i++)
      {
        _loadCard.requirements.push({...action.data.requirements[_i]});
      }

      for (let _i =0; _i < action.data.effects.length ;_i++)
      {
        const _resulty = []; 
        const _trigger = {...action.data.effects[_i].trigger};
        for (let _j =0; _j < action.data.effects[_i].results.length;_j++)
        {
          _resulty.push({...action.data.effects[_i].results[_j],value:[...action.data.effects[_i].results[_j].value]});
        }
        _loadCard.effects.push({...action.data.effects[_i],results:_resulty,trigger:_trigger});
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
      let _tempName = _saveCard.name.replace(/[^a-zA-Z ]/g, "");
      while (_tempName[0] === " ")
      {
        _tempName = _tempName.slice(1);
      }

      while (_tempName[_tempName.length-1] === " ")
      {
        _tempName = _tempName.slice(0,_tempName.length-1);
      }

      const _tempCard = {...state.currentEditCard,
        name: _tempName,
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
        const _trigger = {..._saveCard.effects[_i].trigger}; 
        for (let _j =0; _j < _saveCard.effects[_i].results.length;_j++)
        {
          _resulty.push({..._saveCard.effects[_i].results[_j],value:[..._saveCard.effects[_i].results[_j].value]}) 
        }
        _tempCard.effects.push({..._saveCard.effects[_i],results:_resulty,trigger:_trigger});
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

      
      ////set card description????? ? ??
      makeCardDescription(_tempCard); 
      state.currentEditCard.desc = _tempCard.desc;



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
        currentEditCard:{...state.currentEditCard,name:_tempName},
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
          currentEditCard: {...state.copyCard, category:state.currentEditCard.category, cardId:"-EDITED"},
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

      const _propertiesList = state.CDAT.CREQUIRE[state.currentEditCard.category][action.data.value];
      const _newReqArray = []; 
      for (let _i = 0; _i < _propertiesList.length; _i++)
      {
        if (typeof _propertiesList[_i] === "object")
        {
          _newReqArray.push(_propertiesList[_i][0]); 
        }
        else if (typeof _propertiesList[_i] === "number")
        {
          _newReqArray.push(0); 
          
        }
      }
      _req.values = _newReqArray;

      const _editedCard = {
        ...state.currentEditCard,
        cardId:"-EDITED",
      }; 
      return {
        ...state,
        currentEditCard:_editedCard,
      }
    }

    case 'set-requirement-value': {
      const _req = state.currentEditCard.requirements[action.data.req]; 
      
      _req.values[action.data.param] = action.data.value;

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
                trigger:{name:"none",key:"none",value:0,location:"none"},
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
            type:"none",
            card:null,
            value:[0,"none","none","none",0],
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

    case 'set-edit-effect':{
      const _cardo = {...state.currentEditCard}
      const _effects = [..._cardo.effects]; 

      if (action.data.key === "trigger")
      {
        _effects[action.data.index].trigger = {...state.CDAT.CTRIGGER[action.data.value]}; 
      }
      else if (action.data.key === "triggervalue")
      {
        _effects[action.data.index].trigger.value = action.data.value;
      }
      else if (action.data.key === "resulttype")
      {
        _effects[action.data.index].results[action.data.resultIndex].type = action.data.value;
      } 
      else if (action.data.key === "resultcard")
      {
        _effects[action.data.index].results[action.data.resultIndex].card = action.data.value;
      } 
      else if (action.data.key === "resulttarget")
      {
        _effects[action.data.index].results[action.data.resultIndex].target = action.data.value;
      } 
      else if (action.data.key === "resultvalue")
      {
        _effects[action.data.index].results[action.data.resultIndex].value[action.data.resultValueIndex] = action.data.value;
      } 
      _cardo.effects = _effects;

      return {
          ...state,
          currentEditCard:_cardo,
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
        while (_newArray.length < state.CDAT.SHAPEDAT[action.data.value].sizes)
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
      const _keys = Object.keys(state.CDAT.SHAPEDAT);
      let _sizeArray = [];
      for (let _i =0; _i < state.CDAT.SHAPEDAT[_keys[0]].sizes; _i++)
      {
        _sizeArray.push(0.1);
      } 

      _pattern.shapes.push({
        type: state.CDAT.SHAPEDAT[_keys[0]].name,
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

    ////------game start stuff - -- 

    case 'set-pack-category': { 
      
      return {
        ...state, 
        startGamePackCategory:action.data,
      }
    }

    case 'set-game-packs': {
      const _select = [...state.startGameSelectedPacks];

      if (_select[0] === action.data)
      {
        _select[0]= null; 
      }
      else if (_select[1] === action.data)
      {
        _select[1]= null; 
      }
      else if (_select[0] === null)
      {
        _select[0]= action.data; 
      }
      else if (_select[1] === null)
      { 
        _select[1]= action.data; 
      }

      return {
        ...state,  
        startGameSelectedPacks:_select,
      }
      
    }

    case 'go-start-game': {

      const _playerPacks = [...state.playerPacks];
      _playerPacks[state.currentPlayer] = state.startGameSelectedPacks;

      _playerPacks[2] = state.startGameSelectedPacks;
 
      _startGrid[3][3]= {..._playerPacks[1][0].basicReplaceLand, player:1,cardId:1,posX:3,posY:3, feature1:null, feature2:null}
      _startGrid[3][4]= {..._playerPacks[2][1].basicReplaceLand, player:2,cardId:1,posX:3,posY:4, feature1:null, feature2:null}
      _startGrid[4][3]= {..._playerPacks[2][0].basicReplaceLand, player:2,cardId:1,posX:4,posY:3, feature1:null, feature2:null}
      _startGrid[4][4]= {..._playerPacks[1][1].basicReplaceLand, player:1,cardId:1,posX:4,posY:4, feature1:null, feature2:null} 

      return {
        ...state,  
        gameStarted:true,
        playerPacks:_playerPacks,
      }
    }
    case 'trigger-effect': { 
      let _resource = [[...state.resourcesPlus[0]], [...state.resourcesPlus[1]]]; 
      console.log("!dumb resources",_resource)
      const _resPlus = action.data._newState.resourcesPlus;
      _resource[0][0] += _resPlus[0][0];
      _resource[1][1] += _resPlus[1][1];
      _resource[0][2] += _resPlus[0][2];
      _resource[1][0] += _resPlus[1][0];
      _resource[0][1] += _resPlus[0][1];
      _resource[1][2] += _resPlus[1][2];

      return {
        ...state, 
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
    

    const setHandMouseOver = (data) =>{

      dispatch({
        type: "hand-mouse-over",
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
      let _stateUpdate = {...state};
      for (let _i = 0; _i < boardSize; _i++) ///TRIGGER every turn;
      {
        for (let _j=0; _j < boardSize; _j++)
        {
          const _card = state.boardGrid[_i][_j]; 
          if (_card.cardId != null) {
            for (let _f= 0; _f < _card.effects.length; _f++)
            {
              const _effect = _card.effects[_f] ;
              if (_effect.trigger.name === state.CDAT.CTRIGGER.everyTurn.name)
              { 
                _stateUpdate=CFUNC.effectTriggered(state,_card,_effect);
              }
              else if(_effect.trigger.name === state.CDAT.CTRIGGER.afterTimer.name)
              {
                _effect.trigger.timer -= 1;
                if (_effect.trigger.timer === 0)
                {
                  _stateUpdate=CFUNC.effectTriggered(state,_card,_effect);
                }
              }
            }
              if (_card.feature1 != null)
              {
                for (let _f= 0; _f < _card.feature1.effects.length; _f++)
                {
                  const _effect = _card.feature1.effects[_f] ;
                  if (_effect.trigger.name === state.CDAT.CTRIGGER.everyTurn.name)
                  { 
                    _stateUpdate=CFUNC.effectTriggered(state,_card,_effect);
                  }
                  else if(_effect.trigger.name === state.CDAT.CTRIGGER.afterTimer.name)
                  {
                    _effect.trigger.timer -= 1;
                    if (_effect.trigger.timer === 0)
                    {
                      _stateUpdate=CFUNC.effectTriggered(state,_card,_effect);
                    }
                  }
                }
              }
              if (_card.feature2 != null)
              {
                for (let _f= 0; _f < _card.feature2.effects.length; _f++)
                { 
                  const _effect = _card.feature2.effects[_f];
                  if (_effect.trigger.name === state.CDAT.CTRIGGER.everyTurn.name)
                  {  
                    _stateUpdate=CFUNC.effectTriggered(state,_card,_effect);
                  }
                  else if(_effect.trigger.name === state.CDAT.CTRIGGER.afterTimer.name)
                  {
                    _effect.trigger.timer -= 1;
                    if (_effect.trigger.timer === 0)
                    {
                      _stateUpdate=CFUNC.effectTriggered(state,_card,_effect);
                    }
                  }
                }
              }
          }
        }
      }
      dispatch({
        type:"trigger-effect",
        data:_stateUpdate,
      })
      


    }

    

    const newEditPack = (data) => {

      dispatch({
        type:"new-edit-pack",
        data:data,
      })
    }

    const saveEditPack = (data) =>{
            let _status = "";

            const _pack = {...data}

            const _replace = _pack.basicReplaceLand;
            _replace.cardId = (_pack.packName+"replace").replaceAll(" ","!");
            const _great = _pack.greatLand;
            _great.cardId = (_pack.packName+"great").replaceAll(" ","!");

            
            for (let _i =0; _i < _pack.packCards.length;_i++)
            {
              const _card = _pack.packCards[_i];
              _card.cardId = (_pack.packName+"card"+String(_i)).replaceAll(" ","!"); 
            }

              fetch('/uploadPack',
              {
                  method: "POST", 
                  body: JSON.stringify({...data}), 
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
                  alert(res.message);
                     dispatch({
                       type: "save-edit-pack",
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

    const loadEditPacks = (data) =>{
      let _status = "";

        fetch('/userPacks',
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
                 type: "load-edit-packs",
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
    
    const setEditPack = (data) =>{
      console.log("set edit ",data);
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

    const setEditEffect = (data) =>{

      dispatch({
        type:"set-edit-effect",
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

    const aiOpponentRandomCard = (data) =>{
      let _cardChoice = state.CDAT.MLAND[Math.floor(Math.random()*6)];
      if (state.playerPacks[1][0].basicReplaceLand.replacing === _cardChoice.name.toLowerCase())
      {
        _cardChoice = state.playerPacks[1][0].basicReplaceLand;
      }
      else if (state.playerPacks[1][1].basicReplaceLand.replacing === _cardChoice.name.toLowerCase())
      {
        _cardChoice = state.playerPacks[1][1].basicReplaceLand;
      } 

      

      
      
      return _cardChoice
    }

    const opponentTurn = (data) => {
        if (state.turnMessages.length > 12)
        {
          state.turnMessages = state.turnMessages.slice(0,12);
        }
        console.log("alert",state)
        const _possibleTargets = state.CDAT.CFUNC.checkAdjacentSpaces(state);
        let _rando = Math.floor(Math.random()*_possibleTargets.length); 
        const _targetSpace = _possibleTargets[_rando];
        const _card = aiOpponentRandomCard();


        setCard({posX:_targetSpace.posX,posY:_targetSpace.posY,card:{
                        ..._card,
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
              loadEditPacks();
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


    const getBasicPacks = async (data) =>{ 
      console.log("start")
      fetch('/basicPacks',
        {
            method: "GET",  
            headers: {
                "Content-Type":"application/json",
              },
        })
        .then((res)  =>{   
            return res.json(); 
        })
        .then((res) => {     
              dispatch({
                type: "get-basic-packs",
                data: res.body,
                });
        })
      .catch((error)=>{
        console.log("error ",error);  
        }) 

    }

    ///bookmarkStartGame
    /// ---------------------------- start game menu---------------------------------------------
    /// -----------------------------------------------------------------------------------------
    
    
    const setPackCategory =(data) =>{
      dispatch({
        type:"set-pack-category",
        data:data,
      })
    }

    const setGamePacks =(data) =>{ 
      dispatch({
        type:"set-game-packs",
        data:data,
      })
    }

    const goStartGame = (data) =>{
      console.log("cat magic")
      dispatch({
        type:"go-start-game",
        data:data,
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
              setHandMouseOver,

              changeGamePhase,

              setTargets, 

              tallyPoints,
              updatePoints,
              endTurnTrigger,
              opponentTurn,

              nextTurn,
              //---- card editor etc --
              setCopyCard,pasteCopyCard,
              newEditCard,loadEditCard,saveEditCard,setEditCard,setEditCardIndex,deleteEditCard,setEditEffect,
              changeEditPack,newEditPack,setEditPack,setEditPackIndex,
              saveEditPack,loadEditPacks,
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

              ///Game Menu
              setPackCategory, setGamePacks,
              goStartGame,
              //---- server etc -----
              getBasicPacks,
                  
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