import { useContext } from "react";

import {styled,keyframes} from "styled-components"
import scrollUrl from '../assets/scroll_bg.jpg';

import { AppContext } from "./AppContext";  
import CardObject from "./CardObject";
import { CiSun } from "react-icons/ci";
import { GiMoon } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import CardTooltip from "./CardTooltip";


const funnyArray = [];
for (let _i=0; _i < 64;_i++)
{
    funnyArray.push(_i);
}
const GameBoard = () => {

    const {
        actions: { contextDimensions, contextMouseOver, contextMouseStop, changeGamePhase},
        state: { playerResources, boardGrid, targetGrid, windowWidth,windowHeight, 
            cardWidth, cardHeight, mouseOver, mousingOver,boardWidth,boardHeight, 
            playerColor,
            gamePhase,
            gamePhaseStep,
        },
    } = useContext(AppContext);


    return (
        <MainGameDiv>
            <ResourceDisplay>
               <span style={{filter:"drop-shadow(1px 0px 10px rgba(255,255,0,0.5)) drop-shadow(0px 0px 5px #ff7700)"}} ><span></span><CiSun color={"yellow"}/>Sun : {playerResources[0][0]}</span> <span  style={{filter:"drop-shadow(1px 0px 10px rgba(255,255,0,0.5)) drop-shadow(0px 0px 5px #00ffff)"}}><GiMoon/>Moon:  {playerResources[0][1]}</span> <span style={{filter:"drop-shadow(1px 0px 10px rgba(255,0,255,0.6)) drop-shadow(0px 0px 8px #ffffff)"}}> <BsStars color={"aqua"}/>Stars:  {playerResources[0][2]}</span>
            </ResourceDisplay>

            <Separator/>


                <BoardContain> 
                    
                 <Separator/>
                    
                    <BoardGrid style={{minWidth:`${boardWidth}px`,maxWidth:`${boardWidth}px`,maxHeight:`${boardHeight}px`}}>
                    <BoardGridOutline style={{minWidth:`${boardWidth}px`,height:`${boardHeight-3}px`}} />
                    
                        {boardGrid.map((gridX,indexX)=>{
                            let _xArray = [];
                            for (let _y =0; _y < gridX.length;_y++)
                                {
                                    let _hidden = `visible`
                                    let _color = "none";
                                    if (boardGrid[indexX][_y] === null)
                                    { 
                                        _hidden = `hidden`
                                    }
                                    else
                                    {
                                        _color = playerColor[boardGrid[indexX][_y].player-1]; 
                                    }
                                        
                                        _xArray.push(
                                            <>
                                                {targetGrid[indexX][_y] != null &&( 
                                                <PlacementIndicator key={"placement"+String(indexX)+"-"+String(_y)} style={{width:`${cardWidth-1}px`,height:`${cardHeight-1}px`,left:`${indexX*cardWidth+2}px`,top:`${_y*cardHeight+4}px`}}>
                                                    <span style={{filter:"drop-shadow(1px 0 4px #000000)"}}>!! <GiMoon/> Moon:  <span style={{color:"yellow"}}>{playerResources[0][1]}</span></span>
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
                                                    <CardTooltip key={`tt`+String(indexX)+"-"+String(_y)}/> 
                                                )}
                                                    <CardObject key={`card`+String(indexX)+"-"+String(_y)}  posX={indexX} posY={_y} />
                                                
                                                <Insetter key={`inset`+String(indexX)+"-"+String(_y)}
                                                style={{boxShadow:`${_color} 0px 0px 4px 4px inset`}}/> 
                                                </TempCard>
                                            </>
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

                <PlayerHand 
            onClick={()=>{ changeGamePhase(1);  }}  {...( gamePhase === 1 ?{className:"hidehand"}:{})}  >  
                    <PlayerHandBG />
                    <PlayerHandTitle>  
                        Hand
                    </PlayerHandTitle>
                    <PlayableCard />

                </PlayerHand>
        </MainGameDiv>
    )

}

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
visibility: hidden;
padding:5px;
font-weight:bold;
color:white;
cursor:pointer;
font-family: Arial, Helvetica, sans-serif;
font-size:20px;
transform: scale(0.8);
position: absolute;
width: 100%;
height:100%;
background-color: rgba(255,0,0,0.1);
z-index: 10;
transition: all 100ms ease-out;
box-shadow: rgba(255, 255, 255,0.8) 0px 0px 0px 3px;
border-radius: 10px;
animation: ${PlacementAnim} 5s infinite;
&:hover{
    transition: all 100ms ease-out;
    transform: scale(1.2);
    animation: ${PlacementHoverAnim} 5s infinite; 
}
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

const PlayableCard = styled.div`


`


const PlayerHand = styled.div` 
position: relative;
font-size: 50px;
color:#FFFFFF;
background-color: #222222;
opacity: 1;
min-width:20%;
min-height:100%; 
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