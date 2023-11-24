import { createContext,useReducer } from "react";  

const boardSize = 8;

const _startGrid = [];
for (let _i =0; _i < boardSize;_i++)
  {
    const _secondGrid = [];
    for (let _j =0; _j < boardSize; _j++)
    { 
        _secondGrid[_j] = null;
    }
    _startGrid[_i] = _secondGrid;
  }
  const _targetGrid = _startGrid.slice().map(_i=>_i.slice());
  _targetGrid[2][2] = 1;
  _startGrid[boardSize/2][boardSize/2]= {player:1,name:"desert",desc:"gains 1 sun per turn for each adjacent land with no water"}
  _startGrid[boardSize/2-1][boardSize/2]={player:2,name:"desert",desc:"gains 1 sun per turn for each adjacent land with no water"};
  _startGrid[boardSize/2][boardSize/2-1]={player:2,name:"desert",desc:"gains 1 sun per turn for each adjacent land with no water"};
  _startGrid[boardSize/2-1][boardSize/2-1]={player:1,name:"desert",desc:"gains 1 sun per turn for each adjacent land with no water"};
   

const initialState = {   
    playerHand: [
      [],[]
    ],
    playerResources: [[10,0,0],[10,0,0]],
    boardSize: boardSize,
    boardGrid: _startGrid,
    targetGrid: _targetGrid,
    mouseOver: [0,0],
    mousingOver: false,
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
    
    userInfo: {}, 
  
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
      _tempGrid[action.data.xPos][action.data.yPos] = action.data.card
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
        gamePhase: action.data,
      } 

    }




    default: throw new Error(`Unrecognized action: ${action.type}`); ;
  }

    
}

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

    const setCard = (data) =>{

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
      console.log(data)
      dispatch({
        type: "change-game-phase", 
        data:data,
        })
    }

    return (
        <AppContext.Provider
          value={{
            state,
            actions: {  
              contextDimensions,
              setCard,
              setMousePos,
              contextMouseOver,
              contextMouseStop,

              changeGamePhase,
            },
          }}
        >
          {children}
        </AppContext.Provider>
      );
}


export const AppContext = createContext();