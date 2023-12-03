import {styled,keyframes} from "styled-components"
import { useContext, useEffect, useState } from "react";
import { SketchPicker } from 'react-color'; 
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {CARDFUNC} from "./game/cardfunctions.js"; 
import {CDAT,shapeData} from "./utility/testdata.js";
import { Link } from "react-router-dom";

import { AppContext } from "./AppContext.js";
import BoardCard from "./BoardCard.js"; 


 
const CardMaker = () => {
    const navigate = useNavigate();


    const {
        actions: {  
            newEditPack, changeEditPack,setEditPack,saveEditPack,
            setEditCardIndex,setEditPackIndex,
            loadEditCard,saveEditCard,deleteEditCard,
            setCopyCard,pasteCopyCard,
            newEditCard, setEditCard, setPatternStat, setShapeStat,setShapeSize,
            addPattern,deletePattern,addShape,deleteShape,
            setRequirementType,setRequirementValue, addRequirement,deleteRequirement,resetRequirements,
            addEffect,deleteEffect,addResult,removeResult
        },
        state: { customPacks, currentEditCardIndex,currentEditPackIndex,
            currentEditPack, currentEditCard,
            cardWidth, cardHeight, windowHeight,boardWidth,boardHeight,
            copyCard,
        },
    } = useContext(AppContext);

    const [changeColor,setChangeColor] = useState(null);
    const [colorKey,setColorKey] = useState(null)
    const [loadingCard,setLoadingCard] = useState(true);
    const [cardModified,setCardModified] = useState(false); 
    const [packModified,setPackModified] = useState(false); 
    const [editablePack,setEditablePack] = useState(false);
    const [editPackChooser,setEditPackChooser] = useState("BASIC CARDS");
    const [newPacking,setNewPacking] = useState(false);
    
    const cardName = useRef("");

    useEffect(()=>{
        cardName.current.value = currentEditCard.name;
    },[currentEditCard])

    useEffect(()=>{
        if (customPacks.length > 0)
        {
            setEditPackChooser(customPacks[customPacks.length-1].packName);  
        }
        else
        {
            setEditPackChooser("BASIC CARDS");
            loadEditCard(CDAT.MainLands[0]);
            setEditCardIndex(0);
        }
    } , [])

    useEffect(()=>{
        if (newPacking)
        {
            loadEditCard(currentEditPack.basicReplaceLand);
            setEditCardIndex(-2);
            setEditPackChooser(currentEditPack.packName);
            setNewPacking(false);
            setPackModified(false);
            setEditablePack(true);
        }
    },[newPacking]);
     
  
    const handleChangePack = (event) =>{ 
        setEditPackChooser(event.target.value);
                if (event.target.selectedIndex === 0)
                {
                    changeEditPack({
                        name:"BASIC CARDS",
                        basicReplaceLand: null,
                        greatLand: null,
                        packCards: [...CDAT.MainLands],
                    });
                    loadEditCard(CDAT.MainLands[0]);
                    setEditCardIndex(0);
                    setEditPackChooser("BASIC CARDS");
                    setEditablePack(false);
                    setEditPackIndex(0); 
                }
                else if (event.target.selectedIndex < CDAT.BasicPacks.length+1)
                {
                    
                }
                else
                { 
                    changeEditPack({
                         ...customPacks[event.target.selectedIndex-CDAT.BasicPacks.length-1]
                    });
                    loadEditCard(customPacks[event.target.selectedIndex-CDAT.BasicPacks.length-1].basicReplaceLand);
                    setEditCardIndex(-2);
                    setEditablePack(true);
                    setEditPackIndex(event.target.selectedIndex-CDAT.BasicPacks.length-1); 
                    setEditPackChooser(customPacks[event.target.selectedIndex-CDAT.BasicPacks.length-1].packName);
                } 
    }

    return (
        <CardMakeDiv>
            <PackFrame> 
                <AbsPackDiv>
               <select style={{height:"40px",fontSize:"20px"}}
                value={editPackChooser}
               {...( editablePack && (cardModified || packModified) ?{disabled:true,className:"disabled"}:{})}
                 onChange={handleChangePack}  
                  
               >
                <option> Basic Cards</option>

               {CDAT.BasicPacks.map((_pack,_packIndex)=>{

                    return(<option>Default: {_pack.packName}</option>)
               })} 

                {customPacks.map((_pack,_packIndex)=>{

                return(<option>{_pack.packName}</option>)
                })} 

               </select>
               {editablePack && (<><p><Link to="../cardMake"><MiniAddRequirementButton
               onClick={()=>{ 
                let _checker = false;
                for (let _i =0; _i < customPacks.length;_i++)
                     { const _checkPack = customPacks[_i];
                        if (_i != currentEditPackIndex && currentEditPack.packName === _checkPack.packName)
                        {
                            alert("name already in use")
                            _checker = true;
                        }
                    }
                if (!_checker)
                {
                    saveEditPack(); 
                    setPackModified(false); 
                    setEditPackChooser(currentEditPack.packName);

                }
               }}
                {...( editablePack && (!packModified || cardModified) ?{disabled:true,className:"disabled"}:{})} 
               >Save</MiniAddRequirementButton>
               
               <MiniAddRequirementButton {...( editablePack && ( !packModified || cardModified) ?{disabled:true,className:"disabled"}:{})}>Discard</MiniAddRequirementButton>
              </Link> </p>
               <p>
               Change name<CardNameInput type="text" defaultValue={currentEditPack.packName}
                        onChange={(event)=>{  
                            setEditPack({packName:event.target.value}); 
                            setPackModified(true);
                            
                        }}
                        /> 
                </p>
               </>
               ) || (<p>cannot edit built-in packs</p>)}
               <p>--<button
               onClick={
                (event)=>{
                    newEditPack();  
                    setCardModified(false);
                    setPackModified(false);
                    setEditablePack(true);   
                    setNewPacking(true);
                }} 
                {...( editablePack && (packModified || cardModified) ?{disabled:true,className:"disabled"}:{})}  
                  >New Pack</button>--</p>
               <p>--</p>
               <p>
               <button
                    onClick={(event)=>{
                    setCopyCard();
                }}
               >Copy current card</button>
               </p>
               {editablePack && (
               <button
                onClick={(event)=>{
                    pasteCopyCard();
                    setCardModified(true);
                }}
                {...( !copyCard ?{disabled:true,className:"disabled"}:{})} 
               >Paste over current card</button> ) || (
                <span>cannot paste on built-in</span>
               )}
               </AbsPackDiv>
                <ScrollCardDiv>
               {currentEditPack.basicReplaceLand && (
                <>
                <p>Land replacement:</p><p><Link to="../cardMake">
                <PickCardButton 
                onClick={(event)=>{
                     loadEditCard(currentEditPack.basicReplaceLand); 
                     setEditCardIndex(-2);
                }}
                className={`${editablePack && cardModified ? " disabled" : ""}${currentEditCardIndex === -2 ? " fancyselect" : ""}`} 
                        {...( editablePack && cardModified   ?{disabled:true}:{})}
                >
                        <CardDisplay style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}>
                        {(currentEditCardIndex === -2 && cardModified) && (
                        <EditingCard style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}>EDITING <p>save/discard</p></EditingCard>
                        )}
                             <BoardCard cardObj={currentEditPack.basicReplaceLand} />
                        </CardDisplay>
                    <CardTitle style={{color:"yellow"}}>{currentEditPack.basicReplaceLand.name}</CardTitle>
                
                </PickCardButton>
                </Link></p></>
               )}

                {currentEditPack.greatLand && (
                    <>
                <p>Great Land:</p><p><Link to="../cardMake">
                <PickCardButton 
                onClick={(event)=>{
                    loadEditCard(currentEditPack.greatLand); 
                     setEditCardIndex(-1);
                }} 
                className={`${editablePack && cardModified ? " disabled" : ""}${currentEditCardIndex === -1 ? " fancyselect" : ""}`} 
                {...( editablePack && cardModified   ?{disabled:true}:{})}
                > 
                        <CardDisplay style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}>
                        {(currentEditCardIndex === -1 && cardModified) && (
                        <EditingCard style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}>EDITING <p>save/discard</p></EditingCard>
                        )}
                             <BoardCard cardObj={currentEditPack.greatLand} />
                        </CardDisplay>
                    <CardTitle style={{color:"yellow"}}>{currentEditPack.greatLand.name}</CardTitle>
                
                </PickCardButton>
                </Link></p></>
                
               )} 
               <p>Other cards:</p>
               {currentEditPack.packCards.map(
                (_card,_cardIndex) => { 
                    return(
                        <p>
                            <Link to="../cardMake">
                        <PickCardButton
                        className={`${editablePack && cardModified ? " disabled" : ""}${currentEditCardIndex === _cardIndex ? " fancyselect" : ""}`} 
                        {...(editablePack && cardModified   ?{disabled:true}:{})}
                        onClick={(event)=>{  
                             loadEditCard(_card);
                             setEditCardIndex(_cardIndex);
                        }}
                        >
                                <CardDisplay style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}>
                                    {(currentEditCardIndex === _cardIndex && cardModified) && (
                                     <EditingCard style={{width:`${cardWidth}px`,height:`${cardHeight}px`}}>
                                        {!editablePack && (<>viewing built-in</>) || (<><p>EDITING</p> <p>save/discard</p></>)} 
                                        </EditingCard>
                                    )}
                                     <BoardCard cardObj={_card} />
                                </CardDisplay>
                            <CardTitle style={{color:"yellow"}}>{_card.name}</CardTitle>
                        
                        </PickCardButton>
                        { editablePack && (
                            <DeleteRequirementButton
                            onClick={(event)=>{
                                deleteEditCard(_cardIndex);
                                }}
                            >Delete card {_cardIndex}</DeleteRequirementButton> 
                        )}
                        
                        </Link> 
                        </p>
                    )
                }
               )}
               {(editablePack  && currentEditPack.packCards.length < 16) &&
               (
                    <AddRequirementButton
                    onClick={(event)=>{
                        newEditCard();
                        navigate("../cardMake");
                        setPackModified(true);
                    }} 
                    {...( cardModified ?{disabled:true,className:"disabled"}:{})} 

                    >New Card</AddRequirementButton> )
               }
               </ScrollCardDiv> 



            </PackFrame>
            <CardDetails>
                
            <SideGuy style={{minWidth:`${boardWidth/2.5}px`}}  >
                <CoolSticky >
                    <CardDisplay style={{width:`${cardWidth*2}px`,height:`${cardHeight*2}px`}}>
                        <BoardCard cardObj={currentEditCard} />
                    </CardDisplay>

                    {editablePack && (
                        <>
                            <AddRequirementButton 
                            {...( (!cardModified) ?{disabled:true,className:"disabled"}:{})}
                            onClick={()=>{ 
                                 saveEditCard();
                                 setCardModified(false);
                                 setPackModified(true);
                            }}
                            >SAVE CHANGES</AddRequirementButton>
                            <AddRequirementButton 
                            {...( !cardModified  ?{disabled:true,className:"disabled"}:{})}
                            onClick={()=>{ 
                                 if (currentEditCardIndex === -2)
                                 {
                                    loadEditCard(currentEditPack.basicReplaceLand);
                                 }
                                 else if (currentEditCardIndex === -1)
                                 {
                                    loadEditCard(currentEditPack.greatLand);
                                 }
                                 else {
                                    loadEditCard(currentEditPack.packCards[currentEditCardIndex]);
                                 } 
                                 setCardModified(false); 
                            }}
                            >DISCARD</AddRequirementButton>
                        </>
                    ) || (
                        <>
                            <span style={{color:"grey"}}>Cannot save over built-in</span>
                        </>
                    )}
                    

                    <StatsScroll style={{minWidth:`${boardWidth/2.5}px`,maxHeight:`${boardHeight-cardHeight-80}px`}} >
                    <p> Current Card: {currentEditCard.name} :: {currentEditCard.cardId}</p>  
                    <p> Change Card name: <CardNameInput type="text" 
                    ref={cardName}
                    defaultValue={currentEditCard.name}
                        onChange={(event)=>{ 
                            setEditCard({name:event.target.value});
                            setCardModified(true);
                        }}    
                        /> </p> 
                    <p> Card Category: 
                        
                        
                        {(currentEditCard.category != "basic replace" && currentEditCard.category != "great land") && (
                            <select
                            onChange={(event)=>{  
                                     setCardModified(true);
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

                    <p>Card Cost: <span style={{color:"#CC7700"}}> <input value={currentEditCard.cost[0]} 
                        onChange={(event)=>{
                            currentEditCard.cost.splice(0,1,event.target.value); 
                            setEditCard({cost:currentEditCard.cost});
                            setCardModified(true);
                        }}
                    style={{width:"40px",padding:"2px"}} type="number" min="0" max="50"/> sun </span>
                    <span style={{color:"#33BBEE"}}><input value={currentEditCard.cost[1]} 
                        onChange={(event)=>{
                            currentEditCard.cost.splice(1,1,event.target.value); 
                            setEditCard({cost:currentEditCard.cost});
                            setCardModified(true);
                        }}
                        style={{width:"40px",padding:"2px"}} type="number" min="0" max="25"/> moon  </span>
                    <span style={{color:"#AA33DD"}}><input value={currentEditCard.cost[2]} 
                    onChange={(event)=>{
                        currentEditCard.cost.splice(2,1,event.target.value); 
                        setEditCard({cost:currentEditCard.cost});
                        setCardModified(true);
                    }}
                    style={{width:"40px",padding:"2px"}} type="number" min="0" max="20"/> stars  </span>
                    </p> 
                    <p>---</p>
                    
                    {CDAT.CPROP[currentEditCard.category].map((_property,_propIndex)=>{
                        //------------------------------------------------Requirement map start -----------------------------------------
                        return (<p>{_property.name}:  
                                <select>

                                {_property.choices.map((_choice,_choiceIndex)=>{
                                    return(
                                        <option >{_choice}</option>
                                    )
                                })
                                /////---------------property choices - land types get 2 extra choices below so that lands can have up to 3 types
                                } 

                                </select>
                                {_property.name === "land types" && ( 
                                    <select><option >{"none"}</option>{_property.choices.map((_choice,_choiceIndex)=>{
                                        
                                        return(
                                            <option >{_choice}</option>
                                        )
                                    })} </select>
                                 )}
                                  {_property.name === "land types" && ( 
                                    <select><option >{"none"}</option>{_property.choices.map((_choice,_choiceIndex)=>{
                                        return(
                                            <option >{_choice}</option>
                                        )
                                    })} </select>
                                 )}
                                </p>)}
                             )}  
                    <p>---</p>
                    {currentEditCard.requirements.map(
                        (_requirement,_index)=>{
 
                            return(
                                <>
                                    <p> Card Requirement {_index}:  {_index > 0 && (
                                    <DeleteRequirementButton onClick={(event)=>{deleteRequirement(_index)}}
                                    >Delete</DeleteRequirementButton> 
                                )}
                                    <select
                                         onChange={(event)=>{ 
                                            setRequirementType({req:_index,value:event.target.value});
                                            setCardModified(true);
                                        }}
                                            
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
                    )//requirement map end---------------------------------------------------
                    }
                    <p><AddRequirementButton
                    onClick={()=>{addRequirement()
                    setCardModified(true);
                    }}
                    >Add requirement</AddRequirementButton></p>
                    <p>---</p>
                    
                    {  //------------------------------------------------Effect map start -----------------------------------------
                        currentEditCard.effects.map(
                            (_effect,_effectIndex) =>{


                                return(
                                    <>
                                    <p>-</p>
                                    <p>---Card Effect {_effectIndex}---{_effectIndex>0 && (
                                        <DeleteRequirementButton
                                        onClick={()=>{
                                            setCardModified(true);
                                            deleteEffect(_effectIndex)}}
                                        >Delete Effect  {_effectIndex}</DeleteRequirementButton>
                                    )} </p>
                                        
                                        <p>--  Effect {_effectIndex} trigger: </p>
                                        {_effect.results.map((_result,_resultIndex)=>{
                                            //adding results
                                            return (
                                                <>
                                            <p>- Effect {_effectIndex},{_resultIndex} type:</p>
                                            <p>- Effect {_effectIndex},{_resultIndex} amount:</p>
                                                </>
                                            )

                                        })}
                                        <p><MiniAddRequirementButton
                                        onClick={()=>{
                                            setCardModified(true);
                                            addResult(_effectIndex)}}
                                        >Add Result</MiniAddRequirementButton>{_effect.results.length > 1 && (<DeleteRequirementButton
                                        onClick={()=>{
                                            setCardModified(true);
                                            removeResult(_effectIndex)}}
                                        >Remove last result</DeleteRequirementButton>)}
                                        </p> 
                                    </>
                                )

                            }
                        )
                    }
                    
                    <p>----</p> 
                         <p><AddRequirementButton
                    onClick={
                        ()=>{
                            setCardModified(true);
                            addEffect()}}
                    >Add Effect</AddRequirementButton></p>

                    <p> --- </p>  
 

                    </StatsScroll>
                </CoolSticky>   
                </SideGuy> 
                <AppearanceGrid>
                <p>Background Color: </p>
                <p><ColorChangeButton 
                onClick={()=>{
                    setCardModified(true);
                     setColorKey("backColor") }}
                style={{backgroundColor:`${currentEditCard.backColor}`}}>COLOR</ColorChangeButton></p>
 

                    
                    {currentEditCard.cardId && (
                        <>
                        {currentEditCard.patterns.map(
                            (_pattern,_patternIndex) => {
                                ////patterns map return --------------- bkmarkpattern
                                return(
                                    <>

                                    {_patternIndex >= 0 && (
                                                        <>
                                                            <p>--</p><DeletePatternButton
                                                             onClick={(event)=>{
                                                                setCardModified(true);
                                                                deletePattern({pattern:_patternIndex})}} 
                                                            >delete pattern {_patternIndex}</DeletePatternButton> 
                                                        </>
                                                    )}
                                    <p>Pattern {_patternIndex} Color: </p> 
                                    <p><ColorChangeButton style={{backgroundColor:`${currentEditCard.patterns[_patternIndex].color}`}}
                                    onClick={()=>{ 
                                        setCardModified(true);
                                        setColorKey(_patternIndex) }}
                                    >COLOR</ColorChangeButton></p>

                                        <p>Pattern {_patternIndex} width: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].width).toFixed(3)}
                                        onChange={(event)=>{  
                                            setPatternStat({pattern:_patternIndex,key:"width",value:event.target.value});
                                            setCardModified(true);
                                        }}
                                        />
                                        <RangerInput type="range" min="1" max="400" 
                                            value={currentEditCard.patterns[_patternIndex].width*200}
                                            onChange={(event)=>{  
                                                setCardModified(true);
                                                setPatternStat({pattern:_patternIndex,key:"width",value:event.target.value/200}); 
                                            }}
                                            
                                            /></p> 
                                        <p>Pattern {_patternIndex} height: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].height).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"height",value:event.target.value})}}/>
                                        <RangerInput type="range" min="1" max="400" 
                                        value={currentEditCard.patterns[_patternIndex].height*200}
                                            onChange={(event)=>{  
                                                setCardModified(true);
                                                setPatternStat({pattern:_patternIndex,key:"height",value:event.target.value/200})
                                            }}
                                            /></p>
                                        <p>Pattern {_patternIndex} offsetX: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].offX).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"offX",value:event.target.value})}}/>
                                        <RangerInput type="range" min="-100" max="400" 
                                        value={currentEditCard.patterns[_patternIndex].offX*200}
                                            onChange={(event)=>{  
                                                setCardModified(true);
                                                setPatternStat({pattern:_patternIndex,key:"offX",value:event.target.value/200})
                                            }}
                                            /></p>
                                        <p>Pattern {_patternIndex} offsetY: </p>  <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].offY).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"offY",value:event.target.value})}}/>
                                        <RangerInput type="range" min="-100" max="400" 
                                         value={currentEditCard.patterns[_patternIndex].offY*200} 
                                            onChange={(event)=>{  
                                                setCardModified(true);
                                                setPatternStat({pattern:_patternIndex,key:"offY",value:event.target.value/200})
                                            }}
                                            /></p>
                                        <p>Pattern {_patternIndex} skew: </p>  <p><TextoInput type="number" step="1" value={Number(currentEditCard.patterns[_patternIndex].skew).toFixed(3)}
                                        onChange={(event)=>{ setPatternStat({pattern:_patternIndex,key:"skew",value:event.target.value})}}/>
                                        <RangerInput type="range" min="-1000" max="1000" 
                                        value={currentEditCard.patterns[_patternIndex].skew/.25} 
                                            onChange={(event)=>{  
                                                setCardModified(true);
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
                                                            onClick={(event)=>{deleteShape({pattern:_patternIndex,shape:_shapeIndex});
                                                            setCardModified(true); 
                                                            }}
                                                            >delete shape {_shapeIndex}</DeleteShapeButton> 
                                                        </>
                                                    )}
                                                    <p style={{paddingLeft:"9%"}}>--P{_patternIndex}Shape{_shapeIndex} type</p>  <p><BigSelect
                                                        defaultValue={currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].type}
                                                        onChange={(event)=>{ 
                                                                 setCardModified(true);
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
                                                 onChange={(event)=>{ setCardModified(true); setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"offX",value:event.target.value})}}/>
                                                    <RangerInput type="range" min="-100" max="400" 
                                                    value={currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].offX*200}
                                                    onChange={(event)=>{  
                                                        setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"offX",value:event.target.value/200})
                                                    }}       
                                                    /></p>
                                                    <p style={{paddingLeft:"9%"}}>--P{_patternIndex}Shape{_shapeIndex} offsetY</p> <p><TextoInput type="number" step="0.01" value={Number(currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].offY).toFixed(3)}
                                                 onChange={(event)=>{ setCardModified(true); setShapeStat({pattern:_patternIndex,shape:_shapeIndex,key:"offY",value:event.target.value})}}/>
                                                    <RangerInput type="range" min="-100" max="400" 
                                                    value={currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].offY*200}
                                                    onChange={(event)=>{  
                                                        setCardModified(true);
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
                                                                         onChange={(event)=>{ setCardModified(true); setShapeSize({pattern:_patternIndex,shape:_shapeIndex,size:_sizeIndex,value:event.target.value})}}/>
                                                                    <RangerInput type="range" min="-100" max="400" 
                                                                         value={currentEditCard.patterns[_patternIndex].shapes[_shapeIndex].size[_sizeIndex]*200}
                                                                         onChange={(event)=>{  
                                                                            setCardModified(true);
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
                                            onClick={(event)=>{addShape({pattern:_patternIndex});
                                            setCardModified(true);
                                                }}
                                            >+pattern{_patternIndex} new shape+</AddShapebutton>
     
                                        
                                    </>
                                )
                            }
                            ///end of the patterns map whoaaaaa
                        )}
                         <AddPatternButton
                          onClick={(event)=>{addPattern();
                            setCardModified(true); 
                            }} 
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
                                    setEditCard({backColor:event.hex})
                                    setCardModified(true);
                                     }}
                                />
                                <ColorChangeButton onClick={()=>{
                                    setColorKey(null);
                                }}>done</ColorChangeButton></ColorPickSticky>
                            )}

                            {colorKey != "backColor" && (
                                <ColorPickSticky> <SketchPicker  width={`${cardWidth*3}px`} color={currentEditCard.patterns[colorKey].color} 
                                     onChange={(event)=>{ 
                                    setPatternStat({pattern:colorKey,key:"color",value:event.hex});
                                    setCardModified(true);
                                    }}
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

////bkmarkstyled
const EditingAnim = keyframes`   
50%{   
    background-color: rgba(150,70,22,0.6);
}`
const EditingCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: absolute;
text-align:center; 
background-color: rgba(100,55,0,0.35);
z-index: 99;
animation:${EditingAnim} 5s infinite;
`

const AbsPackDiv = styled.div` 
`

const ScrollCardDiv = styled.div` 
border-top:4px solid black;
min-width: 100%; 
overflow-y: scroll;  
`

const PackFrame = styled.div` 
display: block;
position: relative; 
padding:5px;
flex:1; 
max-height: 50%;
display: flex;
flex-direction: column; 
`

const PickCardButton = styled.button`
padding:4px;
border-radius: 5px;
text-align: left;
margin:3px;
&.fancyselect{
    border: 4px solid orange;
} 
&.disabled{
    filter: brightness(0.8);
    cursor: not-allowed;
} 
`

const CardTitle = styled.span`
    -webkit-text-stroke: 1px black;
    font-weight: bold;
`

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
padding:10px 40px 10px 40px;
border: 1px solid black;
&:hover{
border: 4px solid yellow;
padding:6px 45px 6px 46px;
font-weight: bold;
&.disabled, &.disabled:hover{
    color:black;  
    padding:10px 40px 10px 40px;
    border: 1px solid black;
    font-weight: normal;
}
}
`

const MiniAddRequirementButton = styled.button`
color:black;  
padding:4px 27px 4px 27px;
&:hover{
border: 4px solid yellow;
padding:0px 15px 0px 16px;
font-weight: bold; 
&.disabled{
        border:none;
        padding:4px 27px 4px 27px;
        font-weight:normal;
    }
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
width:50%;
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
min-height: calc(100% - 120px);
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