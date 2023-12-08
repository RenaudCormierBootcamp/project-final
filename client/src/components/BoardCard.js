import styled from "styled-components"
import { useContext,useEffect,useState } from "react"
import { AppContext } from "./AppContext"; 
import col from "./utility/colors"; 
import { GiOlive } from "react-icons/gi";
import { PiTreeDuotone } from "react-icons/pi";
import { GiCactus } from "react-icons/gi"; 
 

const BoardCard = ({cardObj,posX,posY}) => { 
    const {
        actions: { setCard, contextMouseOver,contextMouseStop },
        state: { CDAT, cardWidth, cardHeight, boardGrid, mouseOver },
    } = useContext(AppContext);

    const [bigPattern,setBigPattern] = useState([]);
    const [color,setColor] = useState(`rgba(255,255,255,0)`); 
    const [loadCard,setLoadCard] = useState(false);

    

    useEffect(
        ()=>{
            if (cardObj.cardId != null)
            {
                setBigPattern(cardPatternCreate());
            } 
        }
        ,[cardObj]
    )
 
        
    const createPattern = (name,offX,offY,width,height,skew,_array) => {
        return (
        <svg style={{position:"absolute",textAlign:"left"}} key={`cardPattern-${name}-`+String(posX)+`,`+String(posY)} id={`cardPattern-${name}-`+String(posX)+`,`+String(posY)}   width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id={`pattern-${name}-`+String(posX)+`,`+String(posY)}
                x={`${offX}`}
                y={`${offY}`}
                width={`${width}`}
                height={`${height}`}
                patternUnits="objectBoundingBox"
                patternContentUnits="objectBoundingBox"
                patternTransform={`skewX(${skew})`}>
                {_array} 
                 
        </pattern>
        
        <rect id={`rect`+String(posX)+`,`+String(posY)} x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${name}-${String(posX)+`,`+String(posY)})`} />
        </svg> )
    }
    
    const rectanglePattern = (name,color,shapeObj) =>{
        
        return (                    
            <rect fill={`${color}`} key={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} 
            id={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} 
            width={shapeObj.size[0]} height={shapeObj.size[1]} x={shapeObj.offX} y={shapeObj.offY}  />
        )
    }

    const circlePattern = (name,color,shapeObj) =>{
        
        return (                    
            <circle fill={`${color}`} key={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} id={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} 
            r={shapeObj.size[0]} cx={shapeObj.offX} cy={shapeObj.offY}   />
        )
    }

    const trianglePattern = (name,color,shapeObj) =>{
        
        return (                   
            <polygon points={`${shapeObj.size[0]},${shapeObj.size[1]} ${shapeObj.size[2]},${shapeObj.size[3]} ${shapeObj.size[4]},${shapeObj.size[5]}`} 
            x={shapeObj.offX} y={shapeObj.offY} 
            key={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} id={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} fill={`${color}`} />  
        )
    }

    const cardPatternCreate = () =>{
        
        const _arrayOfArrays = [];
        const _id = cardObj.cardId;  
        for (let _i = 0; _i < cardObj.patterns.length; _i++)
        {
            const _smallArray = []; 
            const _pattern = cardObj.patterns[_i];
            for (let _j = 0; _j < _pattern.shapes.length; _j++)
            {
                const _shape = _pattern.shapes[_j];
                switch(_shape.type)
                {
                    case "rectangle":
                        _smallArray.push( 
                            rectanglePattern(`-${_id}-shape${_i}-${_j}-`,_pattern.color,_shape));
                    break;
                    case "circle":
                        _smallArray.push(
                            circlePattern(`-${_id}-shape${_i}-${_j}-`,_pattern.color,_shape));
                    break;
                    case "triangle":
                        _smallArray.push(
                            trianglePattern(`-${_id}-shape${_i}-${_j}-`,_pattern.color,_shape));
                    break;
                }
            } 
            _arrayOfArrays.push(createPattern(`-${_id}-pattern-${_i}-`,_pattern.offX,_pattern.offY,_pattern.width,_pattern.height,_pattern.skew,_smallArray));
        } 

        return (
            <>
                {_arrayOfArrays}
            </>
        ) 
    }

    return (
        <>
        {(cardObj.cardId != null && cardObj.category === "feature") && (
                                    <IconDrawContainDiv style={{filter:`drop-shadow(1px 1px 0 ${cardObj.iconOutline}) drop-shadow(-1px -1px 0 ${cardObj.iconOutline}) drop-shadow(1px -1px 0 ${cardObj.iconOutline}) drop-shadow(-1px 1px 0 ${cardObj.iconOutline})  drop-shadow(1px 1px 0 black) drop-shadow(-1px 1px 0 black) drop-shadow(1px -1px 0 black) drop-shadow(-1px -1px 0 black)`}}>
                                    <IconDrawDiv 
                                    style={{ mask:`url(${CDAT.iconSources[cardObj.mainIconCat][cardObj.mainIcon].src}) no-repeat center/contain`
                                            ,WebkitMask:`url(${CDAT.iconSources[cardObj.mainIconCat][cardObj.mainIcon].src}) no-repeat center/contain`
                                            ,background:`linear-gradient(${cardObj.mainIconGradientDirection}deg, ${cardObj.mainIconColor} 0%, ${cardObj.mainIconGradient} 100%)` 
                                            }}
            
                                            
            
                                    ></IconDrawDiv> </IconDrawContainDiv> 

                                )}
            { (cardObj.cardId != null && cardObj.category != "feature") &&
            ( 
             <CardContain id="contain" style={{backgroundColor:`${cardObj.backColor}`}}>     
                 {bigPattern} 

                 {cardObj.category === "great land" && (
 
                        <IconDrawContainDiv style={{filter:`drop-shadow(1px 1px 0 ${cardObj.iconOutline}) drop-shadow(-1px -1px 0 ${cardObj.iconOutline}) drop-shadow(1px -1px 0 ${cardObj.iconOutline}) drop-shadow(-1px 1px 0 ${cardObj.iconOutline})  drop-shadow(1px 1px 0 black) drop-shadow(-1px 1px 0 black) drop-shadow(1px -1px 0 black) drop-shadow(-1px -1px 0 black)`}}>
                        <IconDrawDiv 
                        style={{ mask:`url(${CDAT.iconSources[cardObj.mainIconCat][cardObj.mainIcon].src}) no-repeat center/contain`
                                ,WebkitMask:`url(${CDAT.iconSources[cardObj.mainIconCat][cardObj.mainIcon].src}) no-repeat center/contain`
                                ,background:`linear-gradient(${cardObj.mainIconGradientDirection}deg, ${cardObj.mainIconColor} 0%, ${cardObj.mainIconGradient} 100%)` 
                                }}

                                

                        ></IconDrawDiv> </IconDrawContainDiv> 
                 )}

                 {cardObj.feature1 != null && (
                    <FeatureIconContainDiv style={{left:`${0}px`,top:`${cardHeight/8}px`,filter:`drop-shadow(1px 1px 0 ${cardObj.feature1.iconOutline}) drop-shadow(-1px -1px 0 ${cardObj.feature1.iconOutline}) drop-shadow(1px -1px 0 ${cardObj.feature1.iconOutline}) drop-shadow(-1px 1px 0 ${cardObj.feature1.iconOutline})  drop-shadow(1px 1px 0 black) drop-shadow(-1px 1px 0 black) drop-shadow(1px -1px 0 black) drop-shadow(-1px -1px 0 black)`}}>
                    <IconDrawDiv 
                    style={{ mask:`url(${CDAT.iconSources[cardObj.feature1.mainIconCat][cardObj.feature1.mainIcon].src}) no-repeat center/contain`
                            ,WebkitMask:`url(${CDAT.iconSources[cardObj.feature1.mainIconCat][cardObj.feature1.mainIcon].src}) no-repeat center/contain`
                            ,background:`linear-gradient(${cardObj.feature1.mainIconGradientDirection}deg, ${cardObj.feature1.mainIconColor} 0%, ${cardObj.feature1.mainIconGradient} 100%)` 
                            }}  
                    ></IconDrawDiv> </FeatureIconContainDiv>
                 )}
                {cardObj.feature2 != null && (
                    <FeatureIconContainDiv style={{right:`${0}px`,bottom:`${cardHeight/8}px`,filter:`drop-shadow(1px 1px 0 ${cardObj.feature2.iconOutline}) drop-shadow(-1px -1px 0 ${cardObj.feature2.iconOutline}) drop-shadow(1px -1px 0 ${cardObj.feature2.iconOutline}) drop-shadow(-1px 1px 0 ${cardObj.feature2.iconOutline})  drop-shadow(1px 1px 0 black) drop-shadow(-1px 1px 0 black) drop-shadow(1px -1px 0 black) drop-shadow(-1px -1px 0 black)`}}>
                    <IconDrawDiv 
                    style={{ mask:`url(${CDAT.iconSources[cardObj.feature2.mainIconCat][cardObj.feature2.mainIcon].src}) no-repeat center/contain`
                            ,WebkitMask:`url(${CDAT.iconSources[cardObj.feature2.mainIconCat][cardObj.feature2.mainIcon].src}) no-repeat center/contain`
                            ,background:`linear-gradient(${cardObj.feature2.mainIconGradientDirection}deg, ${cardObj.feature2.mainIconColor} 0%, ${cardObj.feature2.mainIconGradient} 100%)` 
                            }} 
                    ></IconDrawDiv> </FeatureIconContainDiv> )}
            </CardContain>
            )
            } 
      </>
    )

}


const CardContain = styled.div` 
 position: absolute;
 width:100%;
 height:100%;
 z-index: 5; 
  
` 
const CardSecondPattern = styled.div` 
 width:100%;
 height:100%; 
`
const FeatureIconContainDiv = styled.div`
position: absolute; 
width: 50%;
height:50%;
z-index: 20;
text-align: center;

`

const IconDrawContainDiv = styled.div`
position: absolute; 
width: 100%;
height:100%;
z-index: 20;
text-align: center;
`
const IconDrawDiv = styled.div` 
margin-left:4%;
margin-top:3%;
width: 92%;
height:92%;
z-index: 20;
`
const IconImage = styled.img`
width:100%;
height:100%;


-webkit-user-drag: none;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none; 
pointer-events: none;
`

const ColorAndIconDiv = styled.div`
flex:3;
`

const IconContainer = styled.div`
padding:10px;
margin:6px;
background-color: gray;
border:2px solid white;
border-radius: 100px;
width:300px;
height:200px;

`




export default BoardCard