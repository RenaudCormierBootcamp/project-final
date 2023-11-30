import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { SketchPicker } from 'react-color';

import {CARDFUNC} from "./game/cardfunctions.js"; 

import {MainLands,MLAND} from "./utility/testdata.js";

import { AppContext } from "./AppContext.js";
import BoardCard from "./BoardCard.js";

const CardMaker = () => {
    const {
        actions: {  
        setEditCard,
        },
        state: { currentEditCard,
            cardWidth, cardHeight, windowHeight,boardWidth,boardHeight},
    } = useContext(AppContext);

    const [changeColor,setChangeColor] = useState(null);
    const [colorKey,setColorKey] = useState(null)
    const [loadingCard,setLoadingCard] = useState(true);
    const [shape1Params,setShape1Params] = useState(4);
    const [shape2Params,setShape2Params] = useState(4);
    const [shape3Params,setShape3Params] = useState(4);
    const [shape4Params,setShape4Params] = useState(4);

    useEffect(
        ()=>{
            setLoadingCard(false);
        }
        ,[])


    return (
        <CardMakeDiv>
            <PackFrame>
                <AbsoluteDiv>
               <select style={{height:"40px",fontSize:"20px"}}>
                <option>Basic Cards</option>
                <option>Default: Sands</option>
                <option>Default: Oceans</option>
                <option>Default: Volcano</option>
                <option>Default: Swompe</option> 
                <option>Default: Orchards</option> 
                <option>Default: Snow</option> 
               </select>
               <p>
               <button>Copy current card</button>
               </p>
               <button>Paste</button>
               <p><button>New Pack</button></p>
               <p>Land replacement:</p>
               <p>Great Land:</p>
               <p>Other cards:</p>
               </AbsoluteDiv>
            </PackFrame>
            <CardDetails>
                
            <SideGuy style={{minWidth:`${boardWidth/2}px`}}  >
                <CoolSticky >
                    <CardDisplay style={{width:`${cardWidth*2}px`,height:`${cardHeight*2}px`}}>
                        <BoardCard cardObj={currentEditCard} />
                    </CardDisplay>
                    <StatsScroll style={{minWidth:`${boardWidth/2.5}px`,maxHeight:`${boardHeight-cardHeight-80}px`}} >
                    <p> Current Card: {currentEditCard.name}</p>  
                    <p> Change Card name: </p> 
                    <p> Card Category <select>
                            <option>Land</option>
                            <option>Land upgrade</option>
                            <option>Feature</option> 
                        </select></p> 
                    <p>Card Cost: <span style={{color:"#CC7700"}}> <input style={{width:"40px",padding:"2px"}} type="number" min="0" max="50"/> sun </span>
                    <span style={{color:"#33BBEE"}}><input style={{width:"40px",padding:"2px"}} type="number" min="0" max="25"/> moon  </span>
                    <span style={{color:"#AA33DD"}}><input style={{width:"40px",padding:"2px"}} type="number" min="0" max="20"/> stars  </span>
                    </p> 
                    <p>---</p>
                    <p> Card Requirements: </p> 
                    <p> Land Temperature: </p> 
                    <p> Land Types: </p>  
                    <p>--</p> 
                    <p> Land Temperature: </p> 
                    <p> Land Types: </p>  
                    <p>--</p>
                    <p> Effect trigger: 
                        
                        <select>
                            <option>every turn</option>
                            <option>once when played</option>
                            <option>after X turns</option>
                            <option>when another card is played</option> 
                        </select></p> 
                    <p> Effect type: <select>
                            <option>add resource</option>
                            <option>remove resource</option>
                            <option>add feature</option>
                            <option>create land</option>
                            <option>transform this land</option> 
                            <option>remove self</option> 
                        </select></p>   
                    <p> Effect amount: <select>
                            <option>number</option>
                            <option>lands by type</option>
                            <option>features by type</option>
                         </select></p>   
                    <ColorChangeButton>(ADD EFFECT) (up to 3?)</ColorChangeButton>
                    <p> Land Temperature: </p>  
                    </StatsScroll>
                </CoolSticky>   
                </SideGuy> 
                <AppearanceGrid>
                <p>Background Color: </p>
                <p><ColorChangeButton 
                onClick={()=>{ setColorKey("backColor") }}
                style={{backgroundColor:`${currentEditCard.backColor}`}}>COLOR</ColorChangeButton></p>

                    
                        <p>MainPattern Width: </p>  <p>{currentEditCard.mainPatternW.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternW:event.target.value/200})}} 
                        /></p> 
                        <p>MainPattern Height: </p>  <p>{currentEditCard.mainPatternH.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternH:event.target.value/200})}}
                        /></p> 
                        <p>MainPattern X: </p>  <p>{currentEditCard.mainPatternX.toFixed(3)}<input type="range" min="0" max="200"  
                        onChange={(event)=>{setEditCard({mainPatternX:event.target.value/200})}} /></p> 
                        <p>MainPattern Y: </p> <p>{currentEditCard.mainPatternY.toFixed(3)}<input type="range" min="0" max="200"  
                        onChange={(event)=>{setEditCard({mainPatternY:event.target.value/200})}} /></p> 

                    <p>Main Color: </p> 
                    <p><ColorChangeButton style={{backgroundColor:`${currentEditCard.mainColor}`}}
                    onClick={()=>{ setColorKey("mainColor") }}
                    >COLOR</ColorChangeButton></p>

                    <p>MainPattern Shape 1: </p> 
                     
                    <p><BigSelect onChange={
                    (event)=>{
                        console.log(event);
                        setEditCard({mainPatternShape:event.target.value})
                        setShape1Params(Number(event.target.selectedOptions[0].className));
                    }
                    }>
                         <option className="0">none</option>
                        <option className="4">rectangle</option>
                        <option className="3">circle</option> 
                        <option className="6">triangle</option> 
                        </BigSelect></p>
                        <p>MainPattern 1Param 1: </p>   <p>{currentEditCard.mainPatternParam1.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternParam1:event.target.value/200})}} 
                        /></p>  
                        <p>MainPattern 1Param 2: </p>   <p>{currentEditCard.mainPatternParam2.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternParam2:event.target.value/200})}} 
                        /></p>  
                        <p>MainPattern 1Param 3: </p>   <p>{currentEditCard.mainPatternParam3.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternParam3:event.target.value/200})}} 
                        /></p>  
                        {shape1Params >= 4 && (
                            <>
                            <p>MainPattern 1Param 4: </p>   <p>{currentEditCard.mainPatternParam4.toFixed(3)}<input type="range" min="1" max="200" 
                            onChange={(event)=>{setEditCard({mainPatternParam4:event.target.value/200})}} 
                            /></p>  </>
                        )}
                        {shape1Params >= 5 && (
                            <>
                        <p>MainPattern 1Param 5: </p>   <p>{currentEditCard.mainPatternParam5.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternParam5:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}
                        {shape1Params >= 6 && (
                            <>
                        <p>MainPattern 1Param 6: </p>   <p>{currentEditCard.mainPatternParam6.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternParam6:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}
                        {shape1Params >= 7 && (
                            <>
                        <p>MainPattern 1Param 7: </p>   <p>{currentEditCard.mainPatternParam7.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternParam7:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}

                    <p>MainPattern Shape 2: </p> 
                     
                     <p><BigSelect onChange={
                    (event)=>{
                        console.log(event);
                        setEditCard({mainPatternSubShape:event.target.value})
                        setShape2Params(Number(event.target.selectedOptions[0].className));
                    }
                    }>
                    <option className="0">none</option>
                     <option className="4">rectangle</option>
                        <option className="3">circle</option> 
                        <option className="6">triangle</option> 
                        </BigSelect></p>

                        <p>MainPattern 1Param 1: </p>   <p>{currentEditCard.mainPatternSubParam1.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternSubParam1:event.target.value/200})}} 
                        /></p>  
                        <p>MainPattern 1Param 2: </p>   <p>{currentEditCard.mainPatternSubParam2.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternSubParam2:event.target.value/200})}} 
                        /></p>  
                        <p>MainPattern 1Param 3: </p>   <p>{currentEditCard.mainPatternSubParam3.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternSubParam3:event.target.value/200})}} 
                        /></p>  
                        {shape2Params >= 4 && (
                            <>
                            <p>MainPattern 1Param 4: </p>   <p>{currentEditCard.mainPatternSubParam4.toFixed(3)}<input type="range" min="1" max="200" 
                            onChange={(event)=>{setEditCard({mainPatternSubParam4:event.target.value/200})}} 
                            /></p>  </>
                        )}
                        {shape2Params >= 5 && (
                            <>
                        <p>MainPattern 1Param 5: </p>   <p>{currentEditCard.mainPatternSubParam5.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternSubParam5:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}
                        {shape2Params >= 6 && (
                            <>
                        <p>MainPattern 1Param 6: </p>   <p>{currentEditCard.mainPatternSubParam6.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({mainPatternSubParam6:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}

                    <p>Second Color: </p> 
                    <p><ColorChangeButton style={{backgroundColor:`${currentEditCard.subColor}`}}
                    onClick={()=>{ setColorKey("subColor") }}
                    >COLOR</ColorChangeButton></p>

                        <p>SecondPattern Width: </p>  <p>{currentEditCard.subPatternW.toFixed(3)}<input type="range" min="1" max="200" 
                        onChange={(event)=>{setEditCard({subPatternW:event.target.value/200})}} 
                        /></p> 
                        <p>SecondPattern Height: </p>  <p>{currentEditCard.subPatternH.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternH:event.target.value/200})}}
                        /></p> 
                        <p>SecondPattern X: </p>  <p>{currentEditCard.subPatternX.toFixed(3)}<input type="range" min="0" max="200"  
                        onChange={(event)=>{setEditCard({subPatternX:event.target.value/200})}} /></p> 
                        <p>SecondPattern Y: </p> <p>{currentEditCard.subPatternY.toFixed(3)}<input type="range" min="0" max="200"  
                        onChange={(event)=>{setEditCard({subPatternY:event.target.value/200})}} /></p> 

                    <p>SubPattern Shape 1: </p> 
                     
                     <p><BigSelect onChange={
                    (event)=>{
                        console.log(event);
                        setEditCard({subPatternShape:event.target.value})
                        setShape3Params(Number(event.target.selectedOptions[0].className));
                    }
                    }>
                    <option className="0">none</option>
                     <option className="4">rectangle</option>
                        <option className="3">circle</option> 
                        <option className="6">triangle</option> 
                        </BigSelect></p> 

                        <p>SecondPattern 1Param 1: </p>   <p>{currentEditCard.subPatternParam1.toFixed(3)}<input type="range" min="0" max="300" 
                        onChange={(event)=>{setEditCard({subPatternParam1:event.target.value/200})}} 
                        /></p>  
                        <p>SecondPattern 1Param 2: </p>   <p>{currentEditCard.subPatternParam2.toFixed(3)}<input type="range" min="-100" max="300" 
                        onChange={(event)=>{setEditCard({subPatternParam2:event.target.value/200})}} 
                        /></p>  
                        <p>SecondPattern 1Param 3: </p>   <p>{currentEditCard.subPatternParam3.toFixed(3)}<input type="range" min="-100" max="300" 
                        onChange={(event)=>{setEditCard({subPatternParam3:event.target.value/200})}} 
                        /></p>  
                        {shape3Params >= 4 && (
                            <>
                            <p>SecondPattern 1Param 4: </p>   <p>{currentEditCard.subPatternParam4.toFixed(3)}<input type="range" min="0" max="200" 
                            onChange={(event)=>{setEditCard({subPatternParam4:event.target.value/200})}} 
                            /></p>  </>
                        )}
                        {shape3Params >= 5 && (
                            <>
                        <p>SecondPattern 1Param 5: </p>   <p>{currentEditCard.subPatternParam5.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternParam5:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}
                        {shape3Params >= 6 && (
                            <>
                        <p>SecondPattern 1Param 6: </p>   <p>{currentEditCard.subPatternParam6.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternParam6:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}

                    <p>SubPattern Shape 2: </p> 
                     
                     <p><BigSelect onChange={
                    (event)=>{
                        console.log(event);
                        setEditCard({subPatternSubShape:event.target.value})
                        setShape4Params(Number(event.target.selectedOptions[0].className));
                    }
                    }>
                    <option className="0">none</option>
                     <option className="4">rectangle</option>
                        <option className="3">circle</option> 
                        <option className="6">triangle</option> 
                        </BigSelect></p> 

                        <p>SecondPattern 2Param 1: </p>   <p>{currentEditCard.subPatternSubParam1.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternSubParam1:event.target.value/200})}} 
                        /></p>  
                        <p>SecondPattern 2Param 2: </p>   <p>{currentEditCard.subPatternSubParam2.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternSubParam2:event.target.value/200})}} 
                        /></p>  
                        <p>SecondPattern 2Param 3: </p>   <p>{currentEditCard.subPatternSubParam3.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternSubParam3:event.target.value/200})}} 
                        /></p>  
                        {shape4Params >= 4 && (
                            <>
                            <p>SecondPattern 2Param 4: </p>   <p>{currentEditCard.subPatternSubParam4.toFixed(3)}<input type="range" min="0" max="200" 
                            onChange={(event)=>{setEditCard({subPatternSubParam4:event.target.value/200})}} 
                            /></p>  </>
                        )}
                        {shape4Params >= 5 && (
                            <>
                        <p>SecondPattern 2Param 5: </p>   <p>{currentEditCard.subPatternSubParam5.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternSubParam5:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}
                        {shape4Params >= 6 && (
                            <>
                        <p>SecondPattern 2Param 6: </p>   <p>{currentEditCard.subPatternSubParam6.toFixed(3)}<input type="range" min="0" max="200" 
                        onChange={(event)=>{setEditCard({subPatternSubParam6:event.target.value/200})}} 
                        /></p>  
                        </>
                        )}





                </AppearanceGrid> 
                <SketchStyle> 
                    {colorKey != null
                     && (
                       <ColorPickSticky> <SketchPicker  width={`${cardWidth*3}px`} color={currentEditCard[colorKey]}
                       onChange={(event)=>{ 
                        setEditCard({[colorKey]:event.hex}) 
                       }}
                       />
                       <ColorChangeButton onClick={()=>{
                        setColorKey(null);
                       }}>done</ColorChangeButton></ColorPickSticky>
                     )
                    }
                </SketchStyle>
            </CardDetails> 
        </CardMakeDiv>
    )

}


const BigSelect = styled.select`
font-size:20px;
padding:3px; 

`
const SketchStyle = styled.div` 
flex:5; 
color:black; 
`
const ColorPickSticky = styled.div`
position: absolute; 
right:0.5%;

`

const SideGuy = styled.div`
flex:6;  
`
const CoolSticky = styled.div` 
padding: 7px;
position: absolute;
line-height: 30px;    
border: 2px black solid;
`
const StatsScroll = styled.div`
overflow-y: scroll; 
`



const SliderNumber = styled.p` 
`

const ColorChangeButton = styled.button`
position: relative;
padding:5px 25px 5px 25px;
border-radius: 10px;
border: 3px solid rgba(255,255,255,0);
-webkit-text-stroke: black 1.2px; 
&:hover{
    border: 3px solid white;
    filter: brightness(1.1);
}
&:active{
    color:black; 
    filter: brightness(0.8);
}
`



const AppearanceGrid = styled.div`
display:grid;
grid-template-columns: repeat(2, 2fr);
flex:5;
gap:5px;
width:75%;
height:80%;
`

const PackFrame = styled.div` 
padding:30px;
flex:1;
background-color: gray; 
height: 100%;
`
const CardDisplay = styled.div` 
margin:5px;
position: relative;
width:100%;
height:300px;
border: 4px solid black;
`
const CardDetails = styled.div`
height: fit-content;
display:flex; 
justify-content: space-around;
flex-direction: row;
gap:30px;
color: white;
padding:30px;
flex:7;
background-color:#333333;
`
const CardMakeDiv = styled.div`
overflow-y: scroll;
font-family: Arial, Helvetica, sans-serif;
font-size:20px;
display: flex;
justify-content: space-around;
background-color: gray; 
height: calc(100% - 80px);
width: 100%; 
`

const AbsoluteDiv = styled.div`
position: absolute; 
`

export default CardMaker