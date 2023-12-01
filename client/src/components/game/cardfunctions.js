const cardTriggers = {
    everyTurn: "every turn ",
    onPlay: "on play ",
    afterTimer: "after $ turns ",
    whenAdjacentPlayed: "when an adjacent land is added "
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

const function2 = () =>{
    
}



const CARDFUNC = {
    TRIGGER:cardTriggers,

    addResource: addResource,
    addSun:addSun,
    addMoon:addMoon,
    addStars:addStars,
    returnAdjacentType: returnAdjacentType,
    returnWithoutType: returnWithoutType,  
}

 export {CARDFUNC};