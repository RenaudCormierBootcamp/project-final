import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components"
import BoardCard from "./BoardCard"
import woodUrl from '../assets/wood_bg.jpg';


import { FaRegSun } from "react-icons/fa"; 
import { GiMoon } from "react-icons/gi";
import { BsStars } from "react-icons/bs";


const EditTooltip = () => {

    const {
        actions: { contextDimensions, setMousePos, setHandMouseOver },
        state: { playerResources, boardGrid, targetGrid, windowWidth,windowHeight, 
            cardWidth, cardHeight, mouseOver, mousingOver, mouseX, boardWidth, boardSize,
            handMouseOver,
        },
    } = useContext(AppContext);
 
    
    return (
        <>
        <PositionDiv
             style={{top:`${cardHeight*1.5}px`,left:`${cardWidth*2.5}px`}}
            >
               
         <TooltipDiv  
            style={{minWidth:`${cardWidth*2.5}px`,maxWidth:`${cardWidth*2.5}px`, minHeight:`${cardHeight*6-40}px`, maxHeight:`${cardHeight}px`}}
             
            >
                 <Insetter/>
                    {handMouseOver != null && (  
                    <PaddedDiv>
                        <DescDiv>
                           
                            <p><span style={{ filter:"drop-shadow(1px 0px 10px rgba(255,255,0,0.9)) drop-shadow(0px 0px 5px #ff7700)"}}><FaRegSun color={"yellow"}/>{handMouseOver.cost[0]}</span>-
                            <span style={{filter:"drop-shadow(1px 0px 10px rgba(255,255,0,0.5)) drop-shadow(0px 0px 5px #00ffff)"}}><GiMoon/>{handMouseOver.cost[1]}</span>-
                            <span style={{filter:"drop-shadow(1px 0px 10px rgba(255,0,255,0.6)) drop-shadow(0px 0px 8px #ffffff)"}}><BsStars color={"aqua"}/>{handMouseOver.cost[2]}</span></p>
                                <p> <span style={{filter:"drop-shadow(1px 0 5px #000000) drop-shadow(-1px -1px 2px #000000)"}}>
                                    {handMouseOver.name}</span></p>
                        </DescDiv>
                        <CardContain style={{marginBottom:"7px",backgroundColor:"rgba(0,0,0,0.45)",width:`${cardWidth*1.75}px`,height:`${cardHeight*1.75}px`,filter:"drop-shadow(1px 0 3px #ffffff) drop-shadow(-1px -1px 8px #000000)"}}>
                            <BoardCard cardObj={handMouseOver} /> 
                        </CardContain> 
                        <DescDiv style={{fontSize:`${cardHeight/4}px`,filter:"drop-shadow(1px 0 3px #000000) drop-shadow(-1px -1px 8px #000000)"}}> 
                            {handMouseOver.category === "feature" && (
                                <>{handMouseOver["feature types"].map((_type,_typeIndex)=>{
                                    let _texto = _type;
                                    if (_typeIndex > 0) {_texto = "/"+_texto}
                                    if (_type != "none")
                                    {
                                        return(
                                            <>{_texto}</>
                                        )
                                    }
                                })}</> 
                            ) || (
                                <>{handMouseOver["land types"].map((_type,_typeIndex)=>{
                                    let _texto = _type;
                                    if (_typeIndex > 0) {_texto = "/"+_texto}
                                    if (_type != "none")
                                    {
                                        return(
                                            <>{_texto}</>
                                        )
                                    }
                                    
                                })}</>
                            )}
                            <DescPre>{handMouseOver.desc}</DescPre>
                            </DescDiv>
                    </PaddedDiv>)} 
                    </TooltipDiv> 
                    </PositionDiv>
        </>
    )

}

const DescPre = styled.pre`
    font-size: 20px;
    font-family: epicslap;

`


const CardContain = styled.div`  
text-align: left;
display: flex;
background-color: blue;
 width:100%;
 height:100%;
 padding: 0;
 margin:0; 
 right:0px;  
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
    transform: scale(1.4);
    position: absolute;
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
    z-index: 120;  
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

export default EditTooltip