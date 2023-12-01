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
        state: { boardGrid, mouseOver },
    } = useContext(AppContext);

    const [bigPattern,setBigPattern] = useState([]);
    const [color,setColor] = useState(`rgba(255,255,255,0)`); 
    const [loadCard,setLoadCard] = useState(false);

    useEffect(
        ()=>{ 
            setColor(cardObj.backColor);
            console.log("DOG");
            
            //setColor(`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`);
        }
        ,[])

    useEffect(
        ()=>{
            if (cardObj.cardId != null)
            {
                setBigPattern(cardPatternCreate()) 
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
                            rectanglePattern(`-shape${_i}-${_j}-`,_pattern.color,_shape));
                    break;
                    case "circle":
                        _smallArray.push(
                            circlePattern(`-shape${_i}-${_j}-`,_pattern.color,_shape));
                    break;
                    case "triangle":
                        _smallArray.push(
                            trianglePattern(`-shape${_i}-${_j}-`,_pattern.color,_shape));
                    break;
                }
            }
            console.log("pattern "+String(_i),"xoff "+String(_pattern.offX),"width "+String(_pattern.width));
            _arrayOfArrays.push(createPattern(`-pattern-${_i}-`,_pattern.offX,_pattern.offY,_pattern.width,_pattern.height,_pattern.skew,_smallArray));
        } 

        return (
            <>
                {_arrayOfArrays}
            </>
        ) 
    }

    return (
        <>
            { cardObj.cardId != null &&
            ( 
             <CardContain id="contain" style={{backgroundColor:`${cardObj.backColor}`}}>     
                 {bigPattern} 
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

export default BoardCard