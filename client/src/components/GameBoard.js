import { useContext, useEffect } from "react";

import {styled,keyframes} from "styled-components"
import scrollUrl from '../assets/scroll_bg.jpg'; 

import { AppContext } from "./AppContext";  
import BoardCard from "./BoardCard";
import { FaRegSun } from "react-icons/fa"; 
import { GiMoon } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import CardTooltip from "./CardTooltip";
import PlayableCard from "./PlayableCard";
import HandTooltip from "./HandTooltip.js";
import {CARDFUNC} from "./game/cardfunctions.js";
 

const funnyArray = [];
for (let _i=0; _i < 64;_i++)
{
    funnyArray.push(_i);
}
const GameBoard = () => {

    const {
        actions: { contextDimensions, contextMouseOver, contextMouseStop, changeGamePhase,
        setTargets,  
        setCard,
        chooseCard, 
        endTurnTrigger,
        updatePoints,
        opponentTurn, nextTurn,
        
        },
        state: { playerResources, resourcesPlus, CDAT,
            boardGrid, targetGrid, windowWidth,windowHeight, 
            cardWidth, cardHeight, mouseOver, mousingOver,boardWidth,boardHeight, 
            localPlayer, currentPlayer,playerPacks,
            playerColor,
            gamePhase,
            gamePhaseStep,
            currentCard,  
            currentTurn, maxTurns, handMouseOver,
            turnMessages,
        },
    } = useContext(AppContext);


    useEffect(
        ()=>{
            if (gamePhase === 0 && currentCard != null)
            { 
              setTargets();
            }
            else
            {
                setTargets([]);
            }
        }
        ,[currentCard])


    useEffect( ///for end turn stuff
    ()=>{
        if (gamePhase === 1)
        { 
            if (gamePhaseStep === 0)
            {
                opponentTurn();
                const _updateScore = setTimeout(()=>{   
                    endTurnTrigger();

                    const _updateScore2 = setTimeout(()=>{ 
                        nextTurn();
                    },1000);

                }
                    ,1000);
                changeGamePhase([1,1]);
                
            }
        }
    }
    ,[gamePhase,gamePhaseStep])


    const HandlePlacement = (targetX,targetY) => { 
        if (gamePhase === 0 && gamePhaseStep === 1)
        {
            setCard({card:currentCard,posX:targetX,posY:targetY});
            chooseCard({card:null});
            changeGamePhase([1,0]);
        }
    }

    return (
        <MainGameDiv>
            <ResourceDisplay>
            {gamePhase === 5 && (<>
                <span>Game Over</span>
            </>) }
            {gamePhase < 5 && (<>
                <span>Turn {currentTurn}/{maxTurns}</span>
            </>) }
               <span style={{ filter:"drop-shadow(1px 0px 10px rgba(255,255,0,0.5)) drop-shadow(0px 0px 5px #ff7700)"}} ><span></span>
               <FaRegSun color={"yellow"}/>Sun : {playerResources[localPlayer-1][0]}
               { (gamePhase === 1 && gamePhaseStep === 1) && 
               ( <span> + {resourcesPlus[localPlayer-1][0]}</span>
               ) }</span>  
               <span  style={{filter:"drop-shadow(1px 0px 10px rgba(255,255,0,0.5)) drop-shadow(0px 0px 5px #00ffff)"}}>
                <GiMoon/>Moon:  {playerResources[localPlayer-1][1]}
                { (gamePhase === 1 && gamePhaseStep === 1) && 
               ( <span> + {resourcesPlus[localPlayer-1][1]}</span>
               ) }</span> 
                <span style={{filter:"drop-shadow(1px 0px 10px rgba(255,0,255,0.6)) drop-shadow(0px 0px 8px #ffffff)"}}>
              <BsStars color={"aqua"}/>Stars:  {playerResources[localPlayer-1][2]}
              { (gamePhase === 1 && gamePhaseStep === 1) && 
               ( <span> + {resourcesPlus[localPlayer-1][2]}</span>
               ) }</span>
            </ResourceDisplay>

            <Separator/>


                <BoardContain> 
                    
                 <Separator/>
                    {gamePhase === 5 && (
                        <TurnEnder>
                        <p>GAME OVER</p> 
                        {playerResources[0][2] > playerResources[1][2] && (
                            <>
                        <p>You win!</p><p> <span style={{filter:"drop-shadow(1px 0px 10px rgba(255,0,255,0.6)) drop-shadow(0px 0px 8px #ffffff)"}}>
                        <BsStars color={"aqua"}/>Stars:</span> {playerResources[0][2]} to {playerResources[1][2]}</p>  </>
                        )}
                        {playerResources[0][2] < playerResources[1][2] && (
                        <><p>You lose...</p> <p><span style={{filter:"drop-shadow(1px 0px 10px rgba(255,0,255,0.6)) drop-shadow(0px 0px 8px #ffffff)"}}>
                        <BsStars color={"aqua"}/>Stars</span>: {playerResources[0][2]} to {playerResources[1][2]}</p> </>
                        )}
                        {playerResources[0][2] === playerResources[1][2] && (
                        <><p>Wow a draw!!</p> <p><span style={{filter:"drop-shadow(1px 0px 10px rgba(255,0,255,0.6)) drop-shadow(0px 0px 8px #ffffff)"}}>
                        <BsStars color={"aqua"}/>Stars</span>: {playerResources[0][2]} to {playerResources[1][2]}</p></>
                        )}
                        </TurnEnder>
                    )}
                    {gamePhase === 1 && (
                        <>
                        <TurnEnder>TURN IS ENDING</TurnEnder>
                        </>
                    )}
                    <BoardGrid style={{minWidth:`${boardWidth}px`,maxWidth:`${boardWidth}px`,maxHeight:`${boardHeight}px`}}>
                    <BoardGridOutline style={{minWidth:`${boardWidth}px`,height:`${boardHeight-3}px`}} />
                    
                        {boardGrid.map((gridX,indexX)=>{
                            let _xArray = [];
                            for (let _y =0; _y < gridX.length;_y++)
                                {
                                    let _hidden = `visible`
                                    let _color = "none";
                                    if (boardGrid[indexX][_y].cardId === null)
                                    { 
                                        _hidden = `hidden`
                                    }
                                    else
                                    {
                                        _color = playerColor[boardGrid[indexX][_y].player-1]; 
                                    }
                                        
                                        _xArray.push(
                                            <div key={"divvy"+String(indexX)+"-"+String(_y)}> 
                                                {targetGrid[indexX][_y] != null &&( 
                                                <PlacementIndicator key={"placement"+String(indexX)+"-"+String(_y)} style={{width:`${cardWidth-1}px`,height:`${cardHeight-1}px`,left:`${indexX*cardWidth+2}px`,top:`${_y*cardHeight+4}px`}}
                                                onClick={
                                                    ()=>{HandlePlacement(indexX,_y)}
                                                }
                                                >
                                                   {/*<span style={{filter:"drop-shadow(1px 0 4px #000000)"}}>!! <GiMoon/> Moon:  <span style={{color:"yellow"}}>{playerResources[0][1]}</span></span>*/}
                                                </PlacementIndicator>  
                                                ) }

                                                <TempCard key={String(indexX)+"-"+String(_y)} 
                                                    onMouseOver={()=>{
                                                        contextMouseOver([indexX,_y]); 
                                                    }}
                                                    onMouseOut={()=>{ 
                                                        contextMouseStop();
                                                    }} 
                                                    style={{visibility:`${_hidden}`,
                                                    width:`${cardWidth}px`,
                                                    height:`${cardHeight}px`,
                                                    left:`${indexX*(cardWidth+1)-1}px`,
                                                    top:`${_y*(cardHeight+1)+4}px`,     
                                                }}>
                                                { (mouseOver[0] == indexX && mouseOver[1] === _y) &&( 
                                                    <CardTooltip key={`tt`+String(indexX)+"-"+String(_y)} cardObj={boardGrid[indexX][_y]}/> 
                                                )}
                                                    <BoardCard key={`card`+String(indexX)+"-"+String(_y)} cardObj={boardGrid[indexX][_y]} posX={indexX} posY={_y} />
                                                
                                                <Insetter key={`inset`+String(indexX)+"-"+String(_y)}
                                                style={{boxShadow:`${_color} 0px 0px 4px 4px inset`}}/> 
                                                </TempCard> 
                                            </div>
                                        );
                                }
                                return  _xArray;
                            })
                            

                        }
                         
                    </BoardGrid> 
                   
                  <Separator/>  
                 <Separator/>

                </BoardContain>

            <Separator/>

                <PlayerHand   {...( gamePhase === 1 ?{className:"hidehand"}:{})}  >  
                    <PlayerHandBG />
                    <PlayerHandTitle style={{fontSize:`${cardHeight}px`}}>  
                        Hand
                    </PlayerHandTitle>
                            
                            <HandCardSubtitle style={{fontSize:`${cardHeight/3.4}px`}}>BASIC LANDS</HandCardSubtitle>
                            <HandCardGrid>
                            {CDAT.MLAND.map((_card,_cardIndex)=>{
                                let _cardo = _card;
                                if (playerPacks[localPlayer][0].basicReplaceLand.replacing === _card.name.toLowerCase())
                                {_cardo = playerPacks[localPlayer][0].basicReplaceLand}
                                else if (playerPacks[localPlayer][1].basicReplaceLand.replacing === _card.name.toLowerCase())
                                {_cardo = playerPacks[localPlayer][1].basicReplaceLand}
                                return(
                                    <PlayableCard
                                    cardObj={{
                                        ..._cardo,
                                        player:currentPlayer, 
                                    }} /> )
                            })}  
                            </HandCardGrid>
                            <HandCardSubtitle style={{fontSize:`${cardHeight/3.4}px`}}>BASIC LANDMARKS</HandCardSubtitle>
                            <HandCardGrid>
                            {CDAT.MFEAT.map((_card,_cardIndex)=>{
                               
                                return(
                                    <PlayableCard
                                    cardObj={{
                                        ..._card,
                                        player:currentPlayer, 
                                    }} /> )
                            })}  
                            </HandCardGrid>
                            <HandCardSubtitle style={{fontSize:`${cardHeight/3.4}px`}}>{playerPacks[localPlayer][0].packName}</HandCardSubtitle>
                            <HandCardGrid>
                            <PlayableCard gridSpan={2} cardObj={{  ...playerPacks[localPlayer][0].greatLand,  player:currentPlayer,}} />
                            {playerPacks[localPlayer][0].packCards.map((_card,_cardIndex)=>{
                                if (_card.canCast)                                
                                {
                                return(
                                    <PlayableCard 
                                    cardObj={{
                                        ..._card,
                                        player:currentPlayer, 
                                    }} /> )}
                            })}   
 
                            </HandCardGrid>
                            <HandCardSubtitle style={{fontSize:`${cardHeight/3.4}px`}}>PACK 2</HandCardSubtitle>
                            <HandCardGrid>
                            <PlayableCard gridSpan={2} cardObj={{  ...playerPacks[localPlayer][1].greatLand,  player:currentPlayer,  }} />
                            {playerPacks[localPlayer][1].packCards.map((_card,_cardIndex)=>{
                                if (_card.canCast)                                
                                {
                                return(
                                    <PlayableCard 
                                    cardObj={{
                                        ..._card,
                                        player:currentPlayer, 
                                    }} /> )}
                            })}  
                            </HandCardGrid>
                            </PlayerHand>

                            <GameMessageDiv 
                            {...( (gamePhase === 1) ?{className:"activated"}:{className:""})} >
                                <> 
                                {turnMessages.map((_message,_messageIndex)=>{

                                    return(
                                        <p style={{textShadow:`2px 2px 2px ${playerColor[_message.player-1]}, -2px -2px 3px ${playerColor[_message.player-1]}`}}>P{_message.player}{_message.message}</p>
                                    )
                                })}
                                </>
                            </GameMessageDiv>
                             
                                {handMouseOver != null && (
                                <HandTooltip 
                                cardObj={handMouseOver}/>
                                    )}
        </MainGameDiv>
    )

}

const GameMessageDiv = styled.div`
pointer-events: none;
position: absolute;
font-size: 34px;
top:55px;
    opacity: 0;
background-color: rgba(0,0,0,0.7);
color:white;
transition: opacity 3000ms ease-in;
padding:50px;
z-index: 200;
&.activated {
    transition: opacity 0ms ease-in;
    opacity: 1; 
}

`

const PlacementAnim = keyframes`   
  50%{   
        box-shadow: rgba(255, 255, 255,0.4) 0px 0px 0px 12px, rgba(255, 0, 0,0.4) 0px 0px 0px 16px, rgba(255, 255, 255,0.4) 0px 0px 0px 22px;
   }`
const PlacementHoverAnim = keyframes`   
0%{
    background-color: rgba(255,0,0,0.1);}
 10%{
    background-color: rgba(255,110,0,0.1);}
20%{
    background-color: rgba(255,255,0,0.1);}
30%{
    background-color: rgba(120,255,0,0.1);}
40%{   
    background-color: rgba(0,255,0,0.1);
    box-shadow: rgba(85, 91, 255,0.7) 0px 0px 0px 3px, rgba(31, 193, 27,0.6) 0px 0px 0px 6px, rgba(255, 217, 19,0.5) 0px 0px 0px 9px, rgba(255, 156, 85,0.4) 0px 0px 0px 12px, rgba(255, 85, 85,0.3) 0px 0px 0px 15px;
  }
50%{
    background-color: rgba(0,255,120,0.1);}
    60%{
    background-color: rgba(0,255,255,0.1);}
    70%{
    background-color: rgba(0,120,255,0.1);}
    80%{
    background-color: rgba(0,0,255,0.1);} 
    90%{
    background-color: rgba(128,0,255,0.1);} 
  `

const PlacementIndicator = styled.div` 
position: absolute;
padding:5px;
font-weight:bold;
color:white;
cursor:pointer;
font-family: Arial, Helvetica, sans-serif;
font-size:20px;
transform: scale(0.8);
width: 100%;
height:100%;
background-color: rgba(255,0,0,0.1);
z-index: 20;
transition: all 100ms ease-out;
box-shadow: rgba(255, 255, 255,0.8) 0px 0px 0px 3px;
border-radius: 10px;
animation: ${PlacementAnim} 5s infinite;
&:hover{
    z-index: 30;
    transition: all 100ms ease-out;
    transform: scale(1.2);
    animation: ${PlacementHoverAnim} 5s infinite; 
}
`

const TurnEnder = styled.div`
    background-color: rgba(20,20,60,0.5);
    border-radius: 50px;
    font-family: warlocks-ale;
    margin-top:10%;
    position: absolute;
    text-align: center;
    width:100%;
    font-size: 150px;
    line-height: 150px;
    color:white;
    z-index: 100;
`

const ResourceDisplay = styled.div` 
padding: 15px 15px 15px 15%;
font-family: Arial, Helvetica, sans-serif;
font-size:20px;
display: flex;
width:40%;
flex-direction: row;
justify-content: space-evenly;
position: absolute;
color:white;
z-index: 20;
background-color: rgba(50,0,0,0.4);
border-radius:  0px 0px 10px 0px;
`
const InsetAnim = keyframes`   
50%{box-shadow:none}
70%{box-shadow:none}

`
const Insetter = styled.div`
    pointer-events: none;
    position: absolute;
    height: 100%;
    width:100%;
    background-color: rgba(255,0,0,0);  
    z-index: 12;
    animation: ${InsetAnim} 7s infinite;
    transition: all 200ms ease-in;
`

const TempCard = styled.div`
position: absolute; 
width:100px;
height:80px;
border-radius:4px;
background-color: rgba(0,0,0,0.5); 
z-index: 6;  
border: 2px solid black;
filter: grayscale(0.3) sepia(0.2);
&:hover{    
    box-shadow: rgba(240, 255, 255, 0.8) 1px 1px 5px 5px, rgba(240, 255, 0, 0.7) 1px 1px 5px 5px;
    border-radius:8px;
    transition: 200ms ease-out;
    transform:scale(1.4);
    z-index: 10;  
    border: 5px solid black; 
    filter: grayscale(0.2) sepia(0.1);
}
`

const MainGameDiv = styled.div`
position: absolute;
display: flex;
flex-direction: row;
justify-content: space-between;
min-width: 100%; 
min-height: 100%;
z-index: 5;

`

const BoardContain = styled.div`
position: relative;
display: flex;
flex-direction: column; 
flex:14;   
z-index: 9;   
`
const BoardGrid = styled.div`   
position: relative; 
align-self: center;
background-color: rgba(250,250,255,0.04); 
flex:60;      
z-index: 8;
`

const BoardGridOutline = styled.div`    
pointer-events: none;
position: fixed;
align-self: center; 
margin-left:-2.5px; 
margin-top:-1px;
border-color: white;
border-width: 5px; 
border-style: solid;  
opacity: 1;
z-index: 5;
` 

const BoardBorderAnim = keyframes`   

` 
 


const PlayerHand = styled.div`  
position: relative;
font-size: 50px;
color:#FFFFFF;
background-color: #222222;
opacity: 1;
min-width:28%;
min-height:80%; 
box-shadow: rgb(23, 23, 23) 0px 0px 0px 3px, rgb(255, 255, 255) 0px 0px 0px 5px,  rgb(23, 23, 23) 0px 0px 0px 7px; 
right: 0;
transition: all 200ms ease-in;
&.hidehand{  
}
`
const handTitleAnim = keyframes`  
  70%{   
    filter: drop-shadow(2px 0 0 #ffffff) drop-shadow(-2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(0 -2px 0 #ffffff); 
        } 
  90%{   
    filter: drop-shadow(1px 0 5px rgba(255,100,0,0.5)) drop-shadow(-1px 0 5px rgba(255,100,0,0.5)) drop-shadow(0 1px 5px rgba(255,100,0,0.5)) drop-shadow(0 -1px 5px rgba(255,100,0,0.5))
            drop-shadow(1px 0 10px rgba(255,255,255,0.3)) drop-shadow(-1px 0 10px rgba(255,255,255,0.3)) drop-shadow(0 1px 10px rgba(255,255,255,0.3)) drop-shadow(0 -1px 10px rgba(255,255,255,0.3))
        } 
` 

const Separator = styled.div`
flex:1;
//background-color: yellow;
opacity: 0.1;
`

const HandCardSubtitle = styled.p`
text-shadow: 3px 3px black;
text-align: center;
font-size: 34px;
font-family: warlocks-ale;
opacity: 1;
`

const HandCardGrid = styled.div`   
margin:5px;
gap:2px;
display: grid; 

grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; 

`

const PlayerHandTitle = styled.div`
font-family: warlocks-ale;
pointer-events: none;
user-select: none;
color:black;

text-align: center; 
position: relative; 

font-size: 15vh;  
min-width: 100%;
z-index: 50; 
animation: ${handTitleAnim} 5s infinite;
filter: drop-shadow(2px 0 0 #ffffff) drop-shadow(-2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(0 -2px 0 #ffffff);  
`

const PlayerHandBG = styled.div` 
pointer-events: none;
position: fixed;
background-image: url(${scrollUrl});
background-size: length;
opacity: 0.4;
width:100%;
min-height: 100%;
background-size: 100% 100%;
background-repeat: no-repeat;
filter:sepia(90%);
z-index: 1;
`

const GridPiece = styled.div`
border: 2px solid black;
border-bottom:none;
width:50px;
height:50px;
`

export default GameBoard