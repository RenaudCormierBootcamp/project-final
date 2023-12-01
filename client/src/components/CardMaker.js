import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { SketchPicker } from 'react-color';

import {CARDFUNC} from "./game/cardfunctions.js"; 

import {CDAT,shapeData} from "./utility/testdata.js";

import { AppContext } from "./AppContext.js";
import BoardCard from "./BoardCard.js"; 


const CardMaker = () => {
    const {
        actions: {  
            setEditCard, setPatternStat, setShapeStat,setShapeSize,
            addPattern,deletePattern,addShape,deleteShape,
            setRequirementType,setRequirementValue, addRequirement,deleteRequirement,resetRequirements,
        },
        state: { currentEditCard,
            cardWidth, cardHeight, windowHeight,boardWidth,boardHeight},
    } = useContext(AppContext);

    const [changeColor,setChangeColor] = useState(null);
    const [colorKey,setColorKey] = useState(null)
    const [loadingCard,setLoadingCard] = useState(true);
    const [shape1Params,setShape1Params] = useState(4); 

    useEffect(
        ()=>{
            setLoadingCard(false);
        }
        ,[])

    const sliderHandler = (key) => {

    }


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
                
            <SideGuy style={{minWidth:`${boardWidth/2.5}px`}}  >
                <CoolSticky >
                    <CardDisplay style={{width:`${cardWidth*2}px`,height:`${cardHeight*2}px`}}>
                        <BoardCard cardObj={currentEditCard} />
                    </CardDisplay>
                    <StatsScroll style={{minWidth:`${boardWidth/2.5}px`,maxHeight:`${boardHeight-cardHeight-80}px`}} >
                    <p> Current Card: {currentEditCard.name}</p>  
                    <p> Change Card name: <CardNameInput type="text" defaultValue={currentEditCard.name}
                        onChange={(event)=>{ 
                            setEditCard({name:event.target.value})}}
                        /> </p> 
                    <p> Card Category: 
                        
                        
                        {(currentEditCard.category != "basic replace" && currentEditCard.category != "great land") && (
                            <select
                            onChange={(event)=>{ 
                                    setEditCard({category:event.target.value})
                                    resetRequirements();
                                }} 
                            >
                                { 
                                    CDAT.CCAT.map((type,index) => {
                                        return (
                                            <option>{type}</option>
                                        )
                                    })
                                } 
                                </select>
                        ) || (<> {currentEditCard.category}</>)}
                         </p> 

                    <p>Card Cost: <span style={{color:"#CC7700"}}> <input defaultValue={currentEditCard.cost[0]} style={{width:"40px",padding:"2px"}} type="number" min="0" max="50"/> sun </span>
                    <span style={{color:"#33BBEE"}}><input defaultValue={currentEditCard.cost[1]} style={{width:"40px",padding:"2px"}} type="number" min="0" max="25"/> moon  </span>
                    <span style={{color:"#AA33DD"}}><input defaultValue={currentEditCard.cost[2]} style={{width:"40px",padding:"2px"}} type="number" min="0" max="20"/> stars  </span>
                    </p> 
                    <p>---</p>
                    {CDAT.CPROP[currentEditCard.category].map((_proprety,_propIndex)=>{

                        return (<p>{_proprety.name}</p>)
                    })}
                    <p>---</p>
                    {currentEditCard.requirements.map(
                        (_requirement,_index)=>{

                            console.log("req",_requirement); 
                            return(
                                <>
                                    <p> Card Requirement {_index}:  {_index > 0 && (
                                    <DeleteRequirementButton onClick={(event)=>{deleteRequirement(_index)}}
                                    >Delete</DeleteRequirementButton> 
                                )}
                                    <select
                                         onChange={(event)=>{ 
                                            setRequirementType({req:_index,value:event.target.value})}}
                                    > 
                                        {
                                        Object.keys(CDAT.CREQUIRE[currentEditCard.category]).map(
                                            (_rChoice,_rCIndex)=>{
                                                return (<option>
                                                    {_rChoice} 
                                                </option>)
                                            }
                                        )
                                        }
                                    </select> 
                                    </p>

                                    { _requirement.type != "none" && (
                                        <> 
                                            {CDAT.CREQUIRE[currentEditCard.category][_requirement.type].map(
                                                (_rParam,_rParamIndex) => {
                                                    
                                                    switch(typeof _rParam){
                                                        case "object":{
                                                            return( <select>
                                                                    
                                                                    {_rParam.map((_mParam,_mParamIndex)=>{
                                                                return (
                                                                   <option>{_mParam}</option>
                                                                )
                                                            })}
                                                            </select>)}
                                                        case "number":{
                                                            return(<ReqInput type ="number" min="0" max="50"/>)
                                                        }
                                                    }
                                                }
                                                
                                            )}
                                        </>
                                    )}  
                                </>
                            )
                        }
                    )//requirement map end
                    }
                    <p><AddRequirementButton
                    onClick={()=>{addRequirement()}}
                    >Add requirement</AddRequirementButton></p>
                    
                    
                    <p>----</p>
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

                    <p> --- </p>  

                    </StatsScroll>
                </CoolSticky>   
                </SideGuy> 
                <AppearanceGrid>
                <p>Background Color: </p>
                <p><ColorChangeButton 
                onClick={()=>{ setColorKey("backColor") }}
                style={{backgroundColor:`${currentEditCard.backColor}`}}>COLOR</ColorChangeButton></p>
 

                    
                    {currentEditCard.cardId && (
                        <>
                        {currentEditCard.patterns.map(
                            (_pattern,_patternIndex) => {
                                ////patterns map return
                                return(
                                    <>

                                    {_patternIndex >= 0 && (
                                                        <>
                                                            <p>--</p><DeletePatternButton
                                                             onClick={(event)=>{deletePattern({pattern:_patternIndex})}} 
                                                            >delete pattern {_patternIndex}</DeletePatternButton> 
                                                        </>
                                                    )}
                                    <p>Pattern {_patternIndex} Color: </p> 
                                    <p><ColorChangeButton style={{backgroundColor:`${currentEditCard.patterns[_patternIndex].color}`}}
                                    onClick={()=>{ setColorKey(_patternIndex) }}
                                    >COLOR</ColorChangeButton></p>

                                        <p>Pattern {_patternIndex} width: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].width).toFixed(3)}
                                        onChange={(event)=>{  
                                            setPatternStat({pattern:_patternIndex,key:"width",value:event.target.value})
                                        }}
                                        />
                                        <RangerInput type="range" min="1" max="400" 
                                            defaultValue={currentEditCard.patterns[_patternIndex].width*200}
                                            onChange={(event)=>{  
                                                setPatternStat({pattern:_patternIndex,key:"width",value:event.target.value/200})
                                            }}
                                            
                                            /></p> 
                                        <p>Pattern {_patternIndex} height: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].height).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"height",value:event.target.value})}}/>
                                        <RangerInput type="range" min="1" max="400" 
                                        defaultValue={currentEditCard.patterns[_patternIndex].height*200}
                                            onChange={(event)=>{  
                                                setPatternStat({pattern:_patternIndex,key:"height",value:event.target.value/200})
                                            }}
                                            /></p>
                                        <p>Pattern {_patternIndex} offsetX: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].offX).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"offX",value:event.target.value})}}/>
                                        <RangerInput type="range" min="-100" max="400" 
                                        defaultValue={currentEditCard.patterns[_patternIndex].offX*200}
                                            onChange={(event)=>{  
                                                setPatternStat({pattern:_patternIndex,key:"offX",value:event.target.value/200})
                                            }}
                                            /></p>
                                        <p>Pattern {_patternIndex} offsetY: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].offY).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"offY",value:event.target.value})}}/>
                                        <RangerInput type="range" min="-100" max="400" 
                                         defaultValue={currentEditCard.patterns[_patternIndex].offY*200} 
                                            onChange={(event)=>{  
                                                setPatternStat({pattern:_patternIndex,key:"offY",value:event.target.value/200})
                                            }}
                                            /></p>
                                        <p>Pattern {_patternIndex} skew: </p>  <p><TextoInput type="number" step="1" value={Number(currentEditCard.patterns[_patternIndex].skew).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"skew",value:event.target.value})}}/>
                                        <RangerInput type="range" min="-1000" max="1000" 
                                        defaultValue={currentEditCard.patterns[_patternIndex].skew*200} 
                                            onChange={(event)=>{  
                                                setPatternStat({pattern:_patternIndex,key:"skew",value:event.target.value*.25})
                                            }}
                                            /></p> 
                                            {currentEditCard.patterns[_patternIndex].shapes.map((_shape,_shapeIndex)=>{
                                                ////shapes map return
                                                return(
                                                    <>
                                                    {_shapeIndex >= 0 && (
                                                        <>
                                                            <p>--</p><DeleteShapeButton
                                                            onClick={(event)=>{deleteShape({pattern:_patternIndex,shape:_shapeIndex})}}
                                                            >delete shape {_shapeIndex}</DeleteShapeButton> 
                                                        </>
                                                    )}
                                                    <p style={{paddingLeft:"9%"}}>--P{_patternIndex}Shape{_shapeIndex} type</p>  <p><BigSelect
                                                        defaultValue={currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].type}
                                                        onChange={(event)=>{ 
                                                                console.log("how valuable ",event.target.value);
                                                                setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"type",value:event.target.value}) 
                                                            }
                                                            }>
                                                                {Object.keys(shapeData).map(
                                                                    (shapeType,_typeIndex)=>{
                                                                        return(
                                                                            <option className={shapeType}>{shapeType}</option>
                                                                        )
                                                                    }                                                                    
                                                                )} 
                                                                </BigSelect></p> 

                                                    <p style={{paddingLeft:"9%"}}>--P{_patternIndex}Shape{_shapeIndex} offsetX</p> <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].offX).toFixed(3)}
                                                 onChange={(event)=>{ setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"offX",value:event.target.value})}}/>
                                                    <RangerInput type="range" min="-100" max="400" 
                                                    onChange={(event)=>{  
                                                        setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"offX",value:event.target.value/200})
                                                    }}       
                                                    /></p>
                                                    <p style={{paddingLeft:"9%"}}>--P{_patternIndex}Shape{_shapeIndex} offsetY</p> <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].offY).toFixed(3)}
                                                 onChange={(event)=>{ setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"offY",value:event.target.value})}}/>
                                                    <RangerInput type="range" min="-100" max="400" 
                                                    onChange={(event)=>{  
                                                        setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"offY",value:event.target.value/200})
                                                    }}       
                                                    /></p>
                                                    {currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].size.map(
                                                        (_size,_sizeIndex)=>{
                                                           ////sizes map return
                                                            return (
                                                                <>
                                                                    <p style={{paddingLeft:"9%"}}>--P{_patternIndex}Shape{_shapeIndex} {`${shapeData[currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].type].sizeNames[_sizeIndex]}`}</p> 
                                                                    <p> 
                                                                    <TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].size[_sizeIndex]).toFixed(3)}
                                                 onChange={(event)=>{ setShapeSize({pattern:_patternIndex,shape:_shapeIndex,size:_sizeIndex,value:event.target.value})}}/>
                                                                    <RangerInput type="range" min="-100" max="400" 
                                                                    onChange={(event)=>{  
                                                                        setShapeSize({pattern:_patternIndex,shape:_shapeIndex,size:_sizeIndex,value:event.target.value/200});
                                                                    }}       
                                                                    /></p>
                                                                </>
                                                            )
                                                        }

                                                    )}


                                                    </>
                                                )
                                               
                                            ///// End of the shapes map woweee
                                            } 
                                            ) 
                                            } 
                                            <p></p><AddShapebutton
                                            onClick={(event)=>{addShape({pattern:_patternIndex})}}
                                            >+pattern{_patternIndex} new shape+</AddShapebutton>
     
                                        
                                    </>
                                )
                            }
                            ///end of the patterns map whoaaaaa
                        )}
                         <AddPatternButton
                          onClick={(event)=>{addPattern()}} 
                         >++Add pattern++</AddPatternButton>
                        </>
                    )}
                    
 

                </AppearanceGrid> 
                <SketchStyle> 
                    {colorKey != null
                     && (
                        <>
                            {colorKey === "backColor" && ( 
                                <ColorPickSticky> <SketchPicker  width={`${cardWidth*3}px`} color={currentEditCard[colorKey]} 
                                    onChange={(event)=>{ 
                                    setEditCard({backColor:event.hex})}}
                                />
                                <ColorChangeButton onClick={()=>{
                                    setColorKey(null);
                                }}>done</ColorChangeButton></ColorPickSticky>
                            )}

                            {colorKey != "backColor" && (
                                <ColorPickSticky> <SketchPicker  width={`${cardWidth*3}px`} color={currentEditCard.patterns[colorKey].color} 
                                     onChange={(event)=>{ 
                                    setPatternStat({pattern:colorKey,key:"color",value:event.hex})}}
                                />
                                <ColorChangeButton onClick={()=>{
                                    setColorKey(null);
                                }}>done</ColorChangeButton></ColorPickSticky> 
                            )}
                        </> 
                     )
                    }
                </SketchStyle>
            </CardDetails> 
        </CardMakeDiv>
    )

}

const ReqInput = styled.input`
color:black;
padding:0;
width:8%;
font-size: 20px;

`

const AddPatternButton = styled.button`
color:black;
padding:15px;
margin:5px;
grid-column-start: 1;
grid-column-end: 3; 
`
const AddShapebutton = styled.button`
color:black;
padding:10px;
margin:5px; 
width:70%; 
&:hover{
border: 4px solid yellow;
padding:6px;
font-weight: bold;

}
`

const DeleteRequirementButton = styled.button`
font-size: 18px;
color:red;  
padding:4px 30px 4px 30px;
&:hover{
border: 4px solid yellow;
padding:0px 26px 0px 26px;

}
`

const AddRequirementButton = styled.button`
color:black;  
padding:10px 60px 10px 60px;
&:hover{
border: 4px solid yellow;
padding:6px 45px 6px 46px;
font-weight: bold;

}
`




const DeletePatternButton = styled.button`
color:red;
background-color:#331111;
border: 2px solid black;
padding:15px;
margin:5px; 
border-radius: 10px;
&:hover{ 
    filter: brightness(1.4);
}
&:active{ 
    filter: brightness(0.8);
}
`
const DeleteShapeButton = styled.button`
color:red;
background-color:#331111;
border: 2px solid black;
padding:10px;
margin:5px 5px 5px 35px; 
width:70%;
border-radius: 15px;
&:hover{ 
    filter: brightness(1.4);
}
&:active{ 
    filter: brightness(0.8);
}
`

const TextoInput = styled.input`
width:20%;
color:black;
`
const RangerInput = styled.input`
color:red;
float: right;
`

const ShapesSection = styled.div`
margin-left:20px;
`

const BigSelect = styled.select`
font-size:20px;
padding:3px; 

`
const SketchStyle = styled.div` 
flex:3; 
color:black; 
`
const ColorPickSticky = styled.div`
position: absolute; 
right:0.5%;

`

const CardNameInput = styled.input`
color:black;
`

const SideGuy = styled.div`
flex:-1;   
`
const CoolSticky = styled.div` 
background-color: #222222;
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
-webkit-text-stroke: black 1px; 
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
grid-template-columns: repeat(2, 2fr, 2, 1fr);
flex:5;
gap:5px;
width:75%;  
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
overflow-y: auto;
display:flex;  
justify-content: space-around;
flex-direction: row;
gap:30px;
color: white;
padding:10px;
flex:7;
background-color:#333333;
`
const CardMakeDiv = styled.div`
font-family: Arial, Helvetica, sans-serif;
font-size:20px;
display: flex;
justify-content: space-around;
background-color: gray; 
min-height: calc(100% - 70px);
max-height: calc(100% - 70px);
width: 100%; 
`

const AbsoluteDiv = styled.div`
position: absolute; 
`

export default CardMaker