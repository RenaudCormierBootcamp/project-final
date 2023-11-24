import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components"
import CardObject from "./CardObject"
import woodUrl from '../assets/wood_bg.jpg';



const CardTooltip = () => {

    const {
        actions: { contextDimensions, setMousePos },
        state: { playerResources, boardGrid, targetGrid, windowWidth,windowHeight, 
            cardWidth, cardHeight, mouseOver, mousingOver, mouseX, boardWidth, boardSize },
    } = useContext(AppContext);


   


    return (
        <>
        <PositionDiv
            {...(mouseOver[0] < boardSize/2 ?
            {style:{left:`${cardWidth*1.2}px`}}:
            {style:{right:`${cardWidth*3.8}px`}})}
            >
         <TooltipDiv  {...(mousingOver === false ?{className: "hidetooltip"}:{}) }
            style={{width:`${cardWidth*2.5}px`, minHeight:`${cardHeight*6-40}px`, maxHeight:`${cardHeight}px`,top:`-${mouseOver[1]*cardHeight/1.4}px`}}
            
            
            >
                    {boardGrid[mouseOver[0]][mouseOver[1]] != null && (  
                    <>
                        <div>
                            <span style={{filter:"drop-shadow(1px 0 5px #000000) drop-shadow(-1px -1px 2px #000000)"}}>{boardGrid[mouseOver[0]][mouseOver[1]].name}</span>
                        </div>
                        <div style={{backgroundColor:"red",width:`${cardWidth*2}px`,height:`${cardHeight*2}px`,filter:"drop-shadow(1px 0 3px #ffffff) drop-shadow(-1px -1px 8px #000000)"}}>
                            <CardObject posX={mouseOver[0]} posY={mouseOver[1]} /> 
                        </div> 
                        <div>
                            <span style={{fontSize:"20px",filter:"drop-shadow(1px 0 5px #000000) drop-shadow(-1px -1px 2px #000000)"}}>{boardGrid[mouseOver[0]][mouseOver[1]].desc}</span>
                        </div>
                        <div> 
                        </div>
                        <div>
                            Feature 1
                        </div>
                        <div> 
                        </div>
                        <div>
                            Feature 1
                        </div>
                    </>)} 
                    </TooltipDiv> 
                    </PositionDiv>
        </>
    )

}

const PositionDiv = styled.div`
position: absolute;
`
const TooltipDiv = styled.div`
    position: fixed;
    filter:drop-shadow(1px 0 15px rgba(0,0,0,0.5)) drop-shadow(-1px -1px 5px #000000);
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px,
                     rgba(17, 17, 26, 0.5) 0px 1px 8px inset, rgba(17, 17, 26, 0.5) 0px 8px 48px inset, rgba(17, 17, 26, 0.5) 0px 16px 96px inset;
    padding:10px;
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
    z-index: 50;  
    &.hidetooltip{ 
        opacity: 0; 
        transition: none;
    }
`

export default CardTooltip