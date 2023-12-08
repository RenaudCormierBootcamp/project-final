

const effectMath = (state,cardObj,result) =>
{
    let _total = 0; 
    switch (result.value[1])
    {
        case "none":
            return 0;
        break;
        case "land type":
            { 
                const _arr = [];
                switch (result.value[3])
                { 
                    case "on self":
                            _arr.push(cardObj);
                        break;
                    case "self and adjacent":
                            _arr.push(cardObj);
                    case "adjacent":
                            if (cardObj.posX > 0) {_arr.push(state.boardGrid[cardObj.posX-1][cardObj.posY]);}
                            if (cardObj.posX < state.boardSize-2) {_arr.push(state.boardGrid[cardObj.posX+1][cardObj.posY]);}
                            if (cardObj.posY > 0) {_arr.push(state.boardGrid[cardObj.posX][cardObj.posY-1]);}
                            if (cardObj.posY < state.boardSize-2) {_arr.push(state.boardGrid[cardObj.posX][cardObj.posY+1]);}
                    break;
                    case "self and around":
                        _arr.push(cardObj);
                    case "around":
                            if (cardObj.posX > 0) {_arr.push(state.boardGrid[cardObj.posX-1][cardObj.posY]);}
                            if (cardObj.posX < state.boardSize-2) {_arr.push(state.boardGrid[cardObj.posX+1][cardObj.posY]);}
                            if (cardObj.posY > 0) {_arr.push(state.boardGrid[cardObj.posX][cardObj.posY+-1]);}
                            if (cardObj.posY < state.boardSize-2) {_arr.push(state.boardGrid[cardObj.posX][cardObj.posY+1]);}
                            if (cardObj.posX > 0 && cardObj.posY > 0) {_arr.push(state.boardGrid[cardObj.posX-1][cardObj.posY-1]);}
                            if (cardObj.posX < state.boardSize-2 && cardObj.posY > 0) {_arr.push(state.boardGrid[cardObj.posX+1][cardObj.posY-1]);}
                            if (cardObj.posX  < state.boardSize-2 && cardObj.posY  < state.boardSize-2) {_arr.push(state.boardGrid[cardObj.posX+1][cardObj.posY+1]);}
                            if (cardObj.posX > 0 && cardObj.posY < state.boardSize-2) {_arr.push(state.boardGrid[cardObj.posX-1][cardObj.posY+1]);}
                    break;
                    case "anywhere":
                        for (let _i =0; _i < state.boardSize; _i++)
                        {
                            for (let _j =0; _j < state.boardSize; _j++)
                            {
                                _arr.push(state.boardGrid[_i][_j]);
                            }
                        }
                    break;
                }
                for (let _i =0; _i < _arr.length; _i++)
                {
                    const _cardCheck = _arr[_i]; 
                    if (_cardCheck.cardId != null)
                    {
                        for (let _j = 0; _j < _cardCheck["land types"].length; _j++ )
                        {
                            if (_cardCheck["land types"][_j] === result.value[2])
                            {
                                _total+=1;
                            }
                        }
                        if (_cardCheck.feature1)
                        {
                            for (let _j = 0; _j < _cardCheck.feature1["feature types"].length; _j++ )
                            {
                                if (_cardCheck.feature1["feature types"][_j] === result.value[2])
                                {
                                    _total+=1;
                                }
                            }
                        }
                        if (_cardCheck.feature2)
                        {
                            for (let _j = 0; _j < _cardCheck.feature2["feature types"].length; _j++ )
                            {
                                if (_cardCheck.feature2["feature types"][_j] === result.value[2])
                                {
                                    _total+=1;
                                }
                            }
                        }
                    }
                }
            }
        default: console.log("one day i'll do a single thing right "+result.value[4]);
    }
    console.log("totalo",_total);
    return _total;
}

const effectTriggered = (state,cardObj,effect) =>
{  
    const _newState = {};
    let _numbero = 0;
    _newState.resourcesPlus = [[...state.resourcesPlus[0]],[...state.resourcesPlus[1]]];
    _newState.name = cardObj.name;
    for (let _i =0; _i < effect.results.length; _i++)
    {
        const _result = effect.results[_i];  
        console.log("banana",cardObj.name, Number(_result.value[0]) * effectMath(state,cardObj,_result))
        switch (_result.type)
        {
            case "addSun":   
                _numbero = Number(_result.value[0]) * effectMath(state,cardObj,_result) + Number(_result.value[4]);
                state.resourcesPlus[cardObj.player-1][0] +=  _numbero;
                state.turnMessages.unshift({player:cardObj.player,message:cardObj.name + " "+String(cardObj.posX)+","+String(cardObj.posY)+" creates "+String(_numbero)+" sun!"});
            break;
            case "addMoon":  
                _numbero = Number(_result.value[0]) * effectMath(state,cardObj,_result) + Number(_result.value[4]);
                state.resourcesPlus[cardObj.player-1][1] += _numbero;
                state.turnMessages.unshift({player:cardObj.player,message:cardObj.name + " "+String(cardObj.posX)+","+String(cardObj.posY)+" creates "+String(_numbero)+" moon!"});
            break;
            case "addStars":  
              _numbero = Number(_result.value[0]) * effectMath(state,cardObj,_result) + Number(_result.value[4]);
              state.resourcesPlus[cardObj.player-1][2] +=  _numbero;
              state.turnMessages.unshift({player:cardObj.player,message:cardObj.name + " "+String(cardObj.posX)+","+String(cardObj.posY)+" creates "+String(_numbero)+" stars!"});
            break;
            



            default: console.log("big mondai");
        }
    }
    console.log("NEW STATE",_newState);
    return {_newState};
}

const cardConditions = (state,targetGrid,card) =>{

    for (let _i = 0; _i < state.boardSize; _i++)
    {
        for (let _j = 0; _j < state.boardSize;_j++)
        {

        }
    }
}

const addResource = (state,resourceArray) =>
{
    state.cardActions.addResourcesPlus({
        player:state.currentPlayer,
        plus:resourceArray,
    });
}

const addSun = (state,_number) => { 
    state.cardActions.addResourcesPlus({
        player:state.currentPlayer,
        plus:[_number,0,0],
    })

}

const addMoon = (state,_number) => { 
    state.cardActions.addResourcesPlus({
        player:state.currentPlayer,
        plus:[0,_number,0],
    })

}

const addStars = (state,_number) => { 
    state.cardActions.addResourcesPlus({
        player:state.currentPlayer,
        plus:[0,0,_number],
    })

}


const returnAdjacentType = (state,checkTypeArray) =>{
    const _boardGrid = state.boardGrid;
    const _boardSize = _boardGrid.length;
    const _px = state.currentCard.posX;
    const _py = state.currentCard.posY;
    let _adj = 0;
    if (_px > 0)
    {
        const _checkCard = _boardGrid[_px-1][_py];
        if (_checkCard.cardId != null)
        {
            let _ok = true;
            for (let _i = 0; _i < checkTypeArray.length ; _i++)
            {
                const _checkType = checkTypeArray[_i]
                if ( _checkCard.types.indexOf(_checkType) === -1  )
                {
                    _ok = false;
                    break;
                }
            } 
            if (_ok){_adj += 1;}
        } 
    }
    if (_px < _boardSize-1)
    {
        const _checkCard = _boardGrid[_px+1][_py];
        if (_checkCard.cardId != null)
        {
            let _ok = true;
            for (let _i = 0; _i < checkTypeArray.length ; _i++)
            {
                const _checkType = checkTypeArray[_i]
                if ( _checkCard.types.indexOf(_checkType) === -1  )
                {
                    _ok = false;
                    break;
                }
            } 
            if (_ok){_adj += 1;}
        } 
    }
    if (_py > 0)
    {
        const _checkCard = _boardGrid[_px][_py-1];
        if (_checkCard.cardId != null)
        {
            let _ok = true;
            for (let _i = 0; _i < checkTypeArray.length ; _i++)
            {
                const _checkType = checkTypeArray[_i]
                if ( _checkCard.types.indexOf(_checkType) === -1  )
                {
                    _ok = false;
                    break;
                }
            } 
            if (_ok){_adj += 1;}
        } 
    }
    if (_py < _boardSize-1)
    {
        const _checkCard = _boardGrid[_px][_py+1];
        if (_checkCard.cardId != null)
        {
            let _ok = true;
            for (let _i = 0; _i < checkTypeArray.length ; _i++)
            {
                const _checkType = checkTypeArray[_i]
                if ( _checkCard.types.indexOf(_checkType) === -1  )
                {
                    _ok = false;
                    break;
                }
            } 
            if (_ok){_adj += 1;}
        } 
    } 

    return _adj;
}

const returnWithoutType = (boardGrid) =>{
    
} 


const checkAdjacentSpaces =(state,type="any",num=1,empty=true) => { 
      const _tempArray = []; 
      for (let _i =0; _i < state.boardSize; _i++)
      {
        for (let _j =0; _j < state.boardSize; _j++)
        {
          const _card = state.boardGrid[_i][_j];
          let _adj = 0;
          const _cX = _card.posX;
          const _cY = _card.posY; 
          console.log("bitches",_cX,_cY)
          if (_i > 0){ 
            if (state.boardGrid[_cX-1][_cY].cardId != null){
              _adj+= 1;
            }}
          if (_j > 0){  
            if (state.boardGrid[_cX][_cY-1].cardId != null){
              _adj+= 1;
            } 
          }
          if (_i < state.boardSize-1){  
            if (state.boardGrid[_cX+1][_cY].cardId != null){
              _adj+= 1;
            } 
          }
          if (_j < state.boardSize-1){ 
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




const CFUNC = {  
    addSun:addSun,
    addMoon:addMoon,
    addStars:addStars,
    returnAdjacentType: returnAdjacentType,
    returnWithoutType: returnWithoutType,  
    checkAdjacentSpaces:checkAdjacentSpaces,
    effectTriggered:effectTriggered,
    cardConditions:cardConditions,
}

 export {CFUNC};