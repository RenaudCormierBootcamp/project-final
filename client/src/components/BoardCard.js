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


    const [color,setColor] = useState(`rgba(255,255,255,0)`); 

    useEffect(
        ()=>{ 
            setColor(cardObj.backColor);
            //setColor(`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`);
        }
        ,[])
 

    const rectanglePattern = (name,color,width=0.15,height=0.05,tileX=0,tileY=0) =>{
        
        return (                    
            <rect fill={`${color}`} id={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} width={width} height={height} x={tileX} y={tileY}  />
        )
    }

    const circlePattern = (name,color,radius=0.15,cx=0.2,cy=0.2,tileX=0,tileY=0) =>{
        
        return (                    
            <circle fill={`${color}`} id={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} r={radius} cx={cx} cy={cy} x={tileX} y={tileY}  />
        )
    }

    const trianglePattern = (name,color,pointA1,pointA2,pointB1,pointB2,pointC1,pointC2,tileX,tileY) =>{
        
        return (                   
            <polygon points={`${pointA1},${pointA2} ${pointB1},${pointB2} ${pointC1},${pointC2}`} x={tileX} y={tileY} id={`pattern-${name}-elem`+String(posX)+`,`+String(posY)} fill={`${color}`} />  
        )
    }

    const cardPatternCreate = (color="ffffff",name="main",shape="rectangle",patternX=0,patternY=0.05,patternW=0.6,patternH=0.1,) =>{

        const _array = [];
        const _subArray = [];
        switch(cardObj.mainPatternShape)
        {
            case "rectangle":
                _array.push( 
                    rectanglePattern("main",cardObj.mainColor,cardObj.mainPatternParam1,cardObj.mainPatternParam2,cardObj.mainPatternParam3,cardObj.mainPatternParam4)   )
            break;
            case "circle":
                _array.push(
                    circlePattern("main",cardObj.mainColor,cardObj.mainPatternParam1,cardObj.mainPatternParam2,cardObj.mainPatternParam3,cardObj.mainPatternParam4,cardObj.mainPatternParam5)   )
            break;
            case "triangle":
                _array.push(
                    trianglePattern("main",cardObj.mainColor,cardObj.mainPatternParam1,cardObj.mainPatternParam2,cardObj.mainPatternParam3,cardObj.mainPatternParam4,cardObj.mainPatternParam5,cardObj.mainPatternParam6,cardObj.mainPatternParam7,cardObj.mainPatternParam8)   )
            break;
                    
        }

        switch(cardObj.mainPatternSubShape)
        {
            case "rectangle":
                _array.push( 
                    rectanglePattern("mainsub",cardObj.mainColor,cardObj.mainPatternSubParam1,cardObj.mainPatternSubParam2,cardObj.mainPatternSubParam3,cardObj.mainPatternSubParam4)   )
                break;
                case "circle":
                    _array.push(circlePattern("mainsub",cardObj.mainColor,cardObj.mainPatternSubParam1,cardObj.mainPatternSubParam2,cardObj.mainPatternSubParam3,cardObj.mainPatternSubParam4)   )
                break; 
                case "triangle":
                _array.push(
                    trianglePattern("main",cardObj.mainColor,cardObj.mainPatternSubParam1,cardObj.mainPatternSubParam2,cardObj.mainPatternSubParam3,cardObj.mainPatternSubParam4,cardObj.mainPatternSubParam5,cardObj.mainPatternSubParam6,cardObj.mainPatternSubParam7,cardObj.mainPatternSubParam8)   )
            break;
                
                case "none": break;
        } 

        if (cardObj.subPatternShape != "none")
        {
                switch(cardObj.subPatternShape)
            {
                case "rectangle":
                    _subArray.push( 
                        rectanglePattern("sub",cardObj.subColor,cardObj.subPatternParam1,cardObj.subPatternParam2,cardObj.subPatternParam3,cardObj.subPatternParam4)   )
                break;
                case "circle":
                    _subArray.push(
                        circlePattern("sub",cardObj.subColor,cardObj.subPatternParam1,cardObj.subPatternParam2,cardObj.subPatternParam3,cardObj.subPatternParam4,cardObj.subPatternParam5)   )
                break;
                case "triangle":
                    _subArray.push(
                        trianglePattern("sub",cardObj.subColor,cardObj.subPatternParam1,cardObj.subPatternParam2,cardObj.subPatternParam3,cardObj.subPatternParam4,cardObj.subPatternParam5,cardObj.subPatternParam6,cardObj.subPatternParam7,cardObj.subPatternParam8)   )
                break;
                        
            }
        }
        if (cardObj.subPatternSubShape != "none")
        {
                switch(cardObj.subPatternShape)
            {
                case "rectangle":
                    _subArray.push( 
                        rectanglePattern("sub",cardObj.subColor,cardObj.subPatternSubParam1,cardObj.subPatternSubParam2,cardObj.subPatternSubParam3,cardObj.subPatternSubParam4)   )
                break;
                case "circle":
                    _subArray.push(
                        circlePattern("sub",cardObj.subColor,cardObj.subPatternSubParam1,cardObj.subPatternSubParam2,cardObj.subPatternSubParam3,cardObj.subPatternSubParam4,cardObj.subPatternSubParam5)   )
                break;
                case "triangle":
                    _subArray.push(
                        trianglePattern("sub",cardObj.subColor,cardObj.subPatternSubParam1,cardObj.subPatternSubParam2,cardObj.subPatternSubParam3,cardObj.subPatternSubParam4,cardObj.subPatternSubParam5,cardObj.subPatternSubParam6,cardObj.subPatternSubParam7,cardObj.subPatternSubParam8)   )
                break;
                        
            }
        }

        return (
        <>
        <svg style={{position:"absolute",textAlign:"left"}} id={`cardPattern-${name}-`+String(posX)+`,`+String(posY)}   width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id={`pattern-${name}-`+String(posX)+`,`+String(posY)}
                x={`${cardObj.mainPatternX}`}
                y={`${cardObj.mainPatternY}`}
                width={`${cardObj.mainPatternW}`}
                height={`${cardObj.mainPatternH}`}
                patternUnits="objectBoundingBox"
                patternContentUnits="objectBoundingBox"
                patternTransform=" 
                skewX(40) ">
                {_array} 
                 
        </pattern>
        
        <rect id={`rect`+String(posX)+`,`+String(posY)} x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${name}-${String(posX)+`,`+String(posY)})`} />
    </svg> 
            
     {cardObj.subPatternShape != "none" && (
                   <svg style={{position:"absolute",textAlign:"left"}} id={`cardPattern-${"second"}-`+String(posX)+`,`+String(posY)}   width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                   <pattern id={`pattern-${"second"}-`+String(posX)+`,`+String(posY)}
                           x={`${cardObj.subPatternX}`}
                           y={`${cardObj.subPatternY}`}
                           width={`${cardObj.subPatternW}`}
                           height={`${cardObj.subPatternH}`}
                           patternUnits="objectBoundingBox"
                           patternContentUnits="objectBoundingBox"
                           patternTransform="
                           skewX(30) ">
                            
                           
                           {_subArray} 
                            
                   </pattern>
                   
                   <rect id={`rect`+String(posX)+`,`+String(posY)} x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${"second"}-${String(posX)+`,`+String(posY)})`} />
               </svg> 
                )}
    
    </>
    ) 
    }

    return (
        <>
            { cardObj.cardId != null &&
            ( 
             <CardContain id="contain" style={{backgroundColor:`${cardObj.backColor}`}}>     
                {cardPatternCreate()}
                {cardObj.subPatternShape != "none" && (
                    <>
                    
                    </>
                )}
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