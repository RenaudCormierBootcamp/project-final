import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components"
import BoardCard from "./BoardCard"
import woodUrl from '../assets/wood_bg.jpg';



const CardTooltip = () => {

    const {
        actions: { contextDimensions, setMousePos },
        state: { playerResources, boardGrid, targetGrid, windowWidth,windowHeight, 
            cardWidth, cardHeight, mouseOver, mousingOver, mouseX, boardWidth, boardSize,
            playerColor,
            
        },
    } = useContext(AppContext);


   
    const _cardObj = boardGrid[mouseOver[0]][mouseOver[1]];

    return (
        <>
        <PositionDiv
            {...(mouseOver[0] < boardSize/2 ?
            {style:{left:`${cardWidth*1.2}px`}}:
            {style:{right:`${cardWidth*3.8}px`}})}
            >
               
         <TooltipDiv  {...(mousingOver === false ?{className: "hidetooltip"}:{}) }
            style={{minWidth:`${cardWidth*2.5}px`,maxWidth:`${cardWidth*2.5}px`, minHeight:`${cardHeight*6-40}px`, maxHeight:`${cardHeight}px`,top:`-${mouseOver[1]*cardHeight/1.4}px`}}
             
            >
                 <Insetter/>
                    {boardGrid[mouseOver[0]][mouseOver[1]] != null && (  
                    <PaddedDiv>
                        <DescDiv>
                            <span style={{float:"left",textShadow:`2px 2px 2px ${playerColor[_cardObj.player-1]}, -2px -2px 3px ${playerColor[_cardObj.player-1]}`,filter:`drop-shadow(6px 6px 9px ${playerColor[_cardObj.player-1]})`}}>{`P${_cardObj.player}`}</span> <span style={{filter:"drop-shadow(1px 0 5px #000000) drop-shadow(-1px -1px 2px #000000)"}}>
                                {boardGrid[mouseOver[0]][mouseOver[1]].name}</span>
                        </DescDiv>
                        <CardContain style={{backgroundColor:"red",width:`${cardWidth*2}px`,height:`${cardHeight*2}px`,filter:"drop-shadow(1px 0 3px #ffffff) drop-shadow(-1px -1px 8px #000000)"}}>
                            <BoardCard cardObj={boardGrid[mouseOver[0]][mouseOver[1]]} posX={mouseOver[0]} posY={mouseOver[1]} /> 
                        </CardContain> 
                        <DescDiv>
                            <span style={{fontSize:"20px",filter:"drop-shadow(1px 0 5px #000000) drop-shadow(-1px -1px 2px #000000)"}}>
                                {boardGrid[mouseOver[0]][mouseOver[1]].desc}</span>
                        </DescDiv>
                        <div> 
                        </div>
                        <div>
                            {_cardObj.feature1 != null && (
                                <>{_cardObj.feature1.name}</>
                            )}
                        </div>
                        <div> 
                        </div>
                        <div>
                        {_cardObj.feature2 != null && (
                                <>{_cardObj.feature1.name}</>
                            )}
                        </div>
                    </PaddedDiv>)} 
                    </TooltipDiv> 
                    </PositionDiv>
        </>
    )

}


const CardContain = styled.div`  
text-align: left;
display: flex;
background-color: blue;
 width:100%;
 height:100%;
 padding: 0;
 margin:0; 
 
`

const PositionDiv = styled.div`
position: absolute;
`

const DescDiv = styled.div`
padding:5px;
`

const PaddedDiv = styled.div`
position: absolute;
padding:20px 50px 20px 50px;
`
const TooltipDiv = styled.div`
    position: fixed;
    filter:drop-shadow(1px 0 15px rgba(0,0,0,0.5)) drop-shadow(-1px -1px 5px #000000);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px,
                     rgba(17, 17, 26, 0.5) 0px 1px 8px inset, rgba(17, 17, 26, 0.5) 0px 8px 48px inset, rgba(17, 17, 26, 0.5) 0px 16px 96px inset;
     
    color:white;
    font-size: 30px;
    font-family: epicslap;
    display: flex;
    flex-direction: column;
    text-align: center; 
    align-items: center;
    align-content: center;
    background-image: url(${woodUrl});
    background-size: cover;
    border-radius: 10px;
    pointer-events: none;  
    top:5%;  
    background-color: blue; 
    transition: all 400ms ease-out;
    z-index: 51;  
    &.hidetooltip{ 
        opacity: 0; 
        transition: none;
    }
`

const Insetter = styled.div`
    pointer-events: none;
    position: absolute; 
    height: 100%;
    width:100%; 
    z-index: 52;  
    opacity: 0.7;
    background-color: rgba(255,0,0,0);
    box-shadow: black 0px 0px 18px 18px inset;
`

export default CardTooltip