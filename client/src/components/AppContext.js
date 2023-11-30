import { createContext,useReducer } from "react";  
import {CARDFUNC} from "./game/cardfunctions.js"; 

import {MainLands,MLAND} from "./utility/testdata.js";

const {TRIGGER} = CARDFUNC;

const boardSize = 8;
const numPlayers = 2;

const cardTriggers = {
  everyTurn: "every turn ",
  onPlay: "on play ",
  afterTimer: "after $ turns ",
  whenAdjacentPlayed: "when an adjacent land is added "
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

  _startGrid[3][3]= {...MainLands[MLAND.desert], player:1,cardId:1,posX:3,posY:3, }
  _startGrid[3][4]= {...MainLands[MLAND.desert], player:2,cardId:1,posX:3,posY:4, }
  _startGrid[4][3]= {...MainLands[MLAND.desert], player:2,cardId:1,posX:4,posY:3, }
  _startGrid[4][4]= {...MainLands[MLAND.desert], player:1,cardId:1,posX:4,posY:4, } 

  let newEditCard = {
    name:"new card",
    desc:"",
    types:[],
    effects:[],
    posX: -1,
    posY: -1,
    player: 0,
    backColor:"#ffffff",
    mainColor:"#000000",
    mainPattern:null,
    mainPatternShape: null,
    mainPatternSubShape:null,
    subColor: "#ffffff",
    subPattern: null,
    subPatternShape: "rectangle",
  };

  newEditCard = {
    ...MainLands[MLAND.desert], player:1,cardId:1,posX:3,posY:3,
  }

const initialState = {   
    playerHand: [
      [],[]
    ],
    currentTurn: 1,
    maxTurns: 20,

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
     
    cardTriggers:cardTriggers,

    customPacks: [],

    
    currentEditCard: newEditCard,
    currentEditPack: {
      name:"new pack",
      cards:[newEditCard],
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
      _tempGrid[action.data.posX][action.data.posY] = action.data.card
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
 
    case 'set-edit-card': {

      const _editedCard = {
        ...state.currentEditCard,
        ...action.data,
      };

      return {
        ...state,
        currentEditCard:_editedCard,
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


    default: throw new Error(`Unrecognized action: ${action.type}`); ;
  }

    
}
////REDUCERS END
////////////////------------------------------------------------------------------------------------
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
      console.log("HELLO");
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
    const setEditCard = (data) =>{

      dispatch({
        type:"set-edit-card",
        data:data,
      })

    }

    const opponentTurn = (data) => {
        const _possibleTargets = checkAdjacentSpaces();
        let _rando = Math.floor(Math.random()*_possibleTargets.length); 
        const _targetSpace = _possibleTargets[_rando];
        setCard({posX:_targetSpace.posX,posY:_targetSpace.posY,card:{
                        ...MainLands[MLAND.desert],
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
            console.log("HELLO")
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
                console.log("res",res);
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
              console.log(error);  
              })

    }

    const attemptLogin = async (data) => {
      console.log("HELLO")
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
        console.log(error);  
        })

    } 


    const attemptAutoCookieLogin = async (data) => {
      console.log("HELLO")
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
           
          if (_status < 300)
          { 
            dispatch({
              type: "attempt-login",
              data: res.body,
              }) 
          }
          else
          {
            alert(res.message);
          }
           
          
      
        })
      .catch((error)=>{
        console.log(error);  
        })

    } 


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

              setEditCard,

              //---- server etc -----
                  
              newRegister, 
              attemptLogin,
              attemptAutoCookieLogin,
                 
            },
          }}
        >
          {children}
        </AppContext.Provider>
      );
}



export const AppContext = createContext();